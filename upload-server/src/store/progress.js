const { nanoid } = require("nanoid");

const progressMap = new Map();
const fileMetaMap = new Map();

function createProgressEntry(uploadId, total) {
  const entry = {
    uploadId,
    total,
    received: 0,
    percent: 0,
    status: "uploading",
    startedAt: Date.now(),
    finishedAt: null,
  };
  progressMap.set(uploadId, entry);
  return entry;
}

function updateProgress(uploadId, received) {
  const entry = progressMap.get(uploadId);
  if (!entry) return null;
  entry.received = received;
  entry.percent = entry.total > 0 ? Math.min(100, Math.round((received / entry.total) * 100)) : 0;
  return entry;
}

function finishProgress(uploadId, status = "completed") {
  const entry = progressMap.get(uploadId);
  if (!entry) return null;
  entry.status = status;
  entry.finishedAt = Date.now();
  return entry;
}

function getProgress(uploadId) {
  return progressMap.get(uploadId) || null;
}

function removeProgress(uploadId) {
  return progressMap.delete(uploadId);
}

function addFileMeta(meta) {
  const id = nanoid(12);
  const record = {
    id,
    originalName: meta.originalName,
    mimeType: meta.mimeType,
    size: meta.size,
    path: meta.path,
    uploadedAt: Date.now(),
  };
  fileMetaMap.set(id, record);
  return record;
}

function getFileMeta(id) {
  return fileMetaMap.get(id) || null;
}

function listFileMeta() {
  return Array.from(fileMetaMap.values());
}

function removeFileMeta(id) {
  const meta = fileMetaMap.get(id);
  if (!meta) return null;
  fileMetaMap.delete(id);
  return meta;
}

function clearAllFileMeta() {
  const all = Array.from(fileMetaMap.values());
  fileMetaMap.clear();
  return all;
}

module.exports = {
  createProgressEntry,
  updateProgress,
  finishProgress,
  getProgress,
  removeProgress,
  addFileMeta,
  getFileMeta,
  listFileMeta,
  removeFileMeta,
  clearAllFileMeta,
};
