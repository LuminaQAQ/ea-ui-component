const app = require("./app");
const config = require("./config");
const { startCleanupTimer, stopCleanupTimer, cleanupAll, ensureUploadDir } = require("./utils/cleanup");

ensureUploadDir();
startCleanupTimer();

const server = app.listen(config.port, config.host, () => {
  console.log(`\n  ┌─────────────────────────────────────────────┐`);
  console.log(`  │  ea-upload 测试服务器已启动                  │`);
  console.log(`  │  地址: http://${config.host}:${config.port}            │`);
  console.log(`  │  测试页面: http://localhost:${config.port}             │`);
  console.log(`  │  健康检查: http://localhost:${config.port}/health      │`);
  console.log(`  └─────────────────────────────────────────────┘\n`);
});

function gracefulShutdown(signal) {
  console.log(`\n[server] 收到 ${signal}，正在关闭服务器...`);
  stopCleanupTimer();
  cleanupAll();
  server.close(() => {
    console.log("[server] 服务器已关闭");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("[server] 强制关闭");
    process.exit(1);
  }, 5000);
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

module.exports = server;
