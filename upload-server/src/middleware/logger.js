const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const logDir = path.join(__dirname, "..", "..", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(path.join(logDir, "access.log"), { flags: "a" });

morgan.token("upload-id", (req) => req.uploadId || "-");

const logFormat = ":method :url :status :res[content-length] - :response-time ms :upload-id";

const loggerMiddleware = morgan(logFormat, {
  stream: accessLogStream,
  skip: (req) => req.path === "/health",
});

const consoleLogger = morgan("dev", {
  skip: (req) => req.path === "/health",
});

module.exports = { loggerMiddleware, consoleLogger };
