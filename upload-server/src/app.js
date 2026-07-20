const express = require("express");
const path = require("path");
const corsMiddleware = require("./middleware/cors");
const { loggerMiddleware, consoleLogger } = require("./middleware/logger");
const { progressTracker } = require("./middleware/progressTracker");
const errorHandler = require("./middleware/errorHandler");
const healthRouter = require("./routes/health");
const uploadRouter = require("./routes/upload");
const { ensureUploadDir } = require("./utils/cleanup");

const app = express();

ensureUploadDir();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(consoleLogger);
app.use(loggerMiddleware);

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use(progressTracker);

app.use("/health", healthRouter);
app.use("/api/upload", uploadRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use((req, res) => {
  res.status(404).json({ code: 404, message: "接口不存在", data: null });
});

app.use(errorHandler);

module.exports = app;
