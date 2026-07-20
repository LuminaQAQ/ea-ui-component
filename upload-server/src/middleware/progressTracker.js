const { nanoid } = require("nanoid");
const {
  createProgressEntry,
  updateProgress,
  finishProgress,
  removeProgress,
} = require("../store/progress");

function parseSize(str) {
  if (typeof str === "number") return str;
  if (typeof str !== "string") return null;
  const match = str.trim().match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)?$/i);
  if (!match) return null;
  const num = parseFloat(match[1]);
  const unit = (match[2] || "b").toLowerCase();
  const multipliers = { b: 1, kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024 };
  return Math.round(num * multipliers[unit]);
}

function progressTracker(req, res, next) {
  const uploadId = req.headers["x-upload-id"] || nanoid(10);
  const contentLength = parseInt(req.headers["content-length"] || "0", 10);

  req.uploadId = uploadId;

  if (contentLength > 0 && req.method === "POST") {
    createProgressEntry(uploadId, contentLength);
    let received = 0;

    req.on("data", (chunk) => {
      received += chunk.length;
      updateProgress(uploadId, received);
    });

    req.on("aborted", () => {
      finishProgress(uploadId, "aborted");
    });

    req.on("error", () => {
      finishProgress(uploadId, "error");
    });

    res.on("finish", () => {
      const status = res.statusCode >= 400 ? "error" : "completed";
      finishProgress(uploadId, status);
      setTimeout(() => removeProgress(uploadId), 5 * 60 * 1000);
    });
  }

  next();
}

module.exports = { progressTracker, parseSize };
