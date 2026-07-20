const fs = require("fs");
const config = require("../config");
const { listFileMeta, removeFileMeta, clearAllFileMeta } = require("../store/progress");

let cleanupTimer = null;

function deleteFileSafe(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (err) {
    console.error(`[cleanup] 删除文件失败: ${filePath}`, err.message);
  }
  return false;
}

function cleanExpiredFiles() {
  const now = Date.now();
  const maxAge = config.cleanup.maxAge;
  const allMeta = listFileMeta();
  let removed = 0;

  for (const meta of allMeta) {
    if (now - meta.uploadedAt > maxAge) {
      deleteFileSafe(meta.path);
      removeFileMeta(meta.id);
      removed++;
    }
  }

  if (removed > 0) {
    console.log(`[cleanup] 清理了 ${removed} 个过期文件`);
  }

  return removed;
}

function cleanupAll() {
  const allMeta = clearAllFileMeta();
  let removed = 0;
  for (const meta of allMeta) {
    if (deleteFileSafe(meta.path)) removed++;
  }
  console.log(`[cleanup] 清理了全部 ${removed} 个临时文件`);
  return removed;
}

function startCleanupTimer() {
  if (cleanupTimer) clearInterval(cleanupTimer);
  cleanupTimer = setInterval(cleanExpiredFiles, config.cleanup.interval);
  cleanupTimer.unref();
  console.log(`[cleanup] 定时清理已启动，间隔 ${config.cleanup.interval / 1000}s，文件最大保留 ${config.cleanup.maxAge / 1000}s`);
}

function stopCleanupTimer() {
  if (cleanupTimer) {
    clearInterval(cleanupTimer);
    cleanupTimer = null;
  }
}

function ensureUploadDir() {
  const dir = config.upload.dest;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

module.exports = {
  deleteFileSafe,
  cleanExpiredFiles,
  cleanupAll,
  startCleanupTimer,
  stopCleanupTimer,
  ensureUploadDir,
};
