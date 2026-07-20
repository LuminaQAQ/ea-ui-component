const multer = require("multer");
const path = require("path");
const fs = require("fs");
const config = require("../config");
const { parseSize } = require("./progressTracker");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = config.upload.dest;
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    cb(null, `${timestamp}-${random}-${base}${ext}`);
  },
});

function matchMime(mimeType, pattern) {
  if (pattern === "*/*" || pattern === "*") return true;
  if (pattern.endsWith("/*")) {
    const prefix = pattern.slice(0, -2);
    return mimeType.startsWith(prefix + "/");
  }
  return mimeType === pattern;
}

function createFileFilter(allowedTypes) {
  return (req, file, cb) => {
    if (!allowedTypes || allowedTypes.length === 0) {
      cb(null, true);
      return;
    }
    const types = allowedTypes.split(",").map((t) => t.trim());
    const matched = types.some((t) => matchMime(file.mimetype, t));
    if (matched) {
      cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_FILE_TYPE", file.originalname), false);
    }
  };
}

function getUploadOptions(req) {
  const queryMaxSize = req.query.maxSize ? parseSize(req.query.maxSize) : null;
  const maxFileSize = queryMaxSize || config.upload.maxFileSize;

  const allowedTypes = req.query.accept || config.upload.allowedTypes;
  const maxFiles = parseInt(req.query.maxFiles || String(config.upload.maxFiles), 10);

  return { maxFileSize, allowedTypes, maxFiles };
}

function createUploadMiddleware(fieldName, maxCount) {
  return (req, res, next) => {
    const { maxFileSize, allowedTypes, maxFiles } = getUploadOptions(req);
    const upload = multer({
      storage,
      limits: { fileSize: maxFileSize, files: maxCount || maxFiles },
      fileFilter: createFileFilter(allowedTypes),
    });
    const handler = maxCount > 1 ? upload.array(fieldName, maxCount) : upload.single(fieldName);
    handler(req, res, next);
  };
}

module.exports = {
  multer,
  storage,
  createUploadMiddleware,
  createFileFilter,
  getUploadOptions,
};
