const express = require("express");
const { success, fail } = require("../utils/response");
const { createUploadMiddleware } = require("../middleware/upload");
const {
  addFileMeta,
  getFileMeta,
  listFileMeta,
  removeFileMeta,
  getProgress,
} = require("../store/progress");
const { deleteFileSafe, cleanupAll } = require("../utils/cleanup");

const router = express.Router();

function applyTestParams(req, res, next) {
  const forceError = parseInt(req.query.forceError || "0", 10);
  if (forceError > 0) {
    return fail(res, `强制错误（测试模式）: ${forceError}`, "FORCED_ERROR", forceError, {
      forced: true,
    });
  }

  const failRate = parseFloat(req.query.failRate || "0");
  if (failRate > 0 && Math.random() < failRate) {
    return fail(res, "随机失败（测试模式）", "RANDOM_FAIL", 500, {
      failRate,
    });
  }

  const delay = parseInt(req.query.delay || "0", 10);
  if (delay > 0) {
    return setTimeout(next, delay);
  }

  next();
}

router.post(
  "/single",
  applyTestParams,
  createUploadMiddleware("file", 1),
  (req, res) => {
    if (!req.file) {
      return fail(res, "未接收到文件", "NO_FILE", 400);
    }
    const meta = addFileMeta({
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    });
    success(res, { file: meta }, "文件上传成功");
  }
);

router.post(
  "/multiple",
  applyTestParams,
  createUploadMiddleware("files", 10),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return fail(res, "未接收到文件", "NO_FILE", 400);
    }
    const files = req.files.map((f) =>
      addFileMeta({
        originalName: f.originalname,
        mimeType: f.mimetype,
        size: f.size,
        path: f.path,
      })
    );
    success(res, { files, count: files.length }, "多文件上传成功");
  }
);

router.post(
  "/progress",
  applyTestParams,
  createUploadMiddleware("file", 1),
  (req, res) => {
    if (!req.file) {
      return fail(res, "未接收到文件", "NO_FILE", 400);
    }
    const meta = addFileMeta({
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    });
    success(res, { file: meta, uploadId: req.uploadId }, "文件上传成功");
  }
);

router.get("/progress/:id", (req, res) => {
  const progress = getProgress(req.params.id);
  if (!progress) {
    return fail(res, "上传进度记录不存在或已过期", "PROGRESS_NOT_FOUND", 404);
  }
  success(res, progress, "进度查询成功");
});

router.get("/files", (req, res) => {
  const files = listFileMeta();
  success(res, { files, count: files.length }, "文件列表查询成功");
});

router.get("/files/:id", (req, res) => {
  const meta = getFileMeta(req.params.id);
  if (!meta) {
    return fail(res, "文件不存在", "FILE_NOT_FOUND", 404);
  }
  success(res, { file: meta }, "文件查询成功");
});

router.delete("/files/:id", (req, res) => {
  const meta = removeFileMeta(req.params.id);
  if (!meta) {
    return fail(res, "文件不存在", "FILE_NOT_FOUND", 404);
  }
  deleteFileSafe(meta.path);
  success(res, { id: meta.id }, "文件删除成功");
});

router.post("/cleanup", (req, res) => {
  const removed = cleanupAll();
  success(res, { removed }, "清理完成");
});

module.exports = router;
