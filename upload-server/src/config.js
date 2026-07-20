const path = require("path");

const config = {
  port: process.env.PORT || 3100,
  host: process.env.HOST || "0.0.0.0",

  upload: {
    dest: path.join(__dirname, "..", "uploads"),
    maxFileSize: 10 * 1024 * 1024,
    maxFiles: 10,
    allowedTypes: null,
  },

  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-upload-id"],
  },

  cleanup: {
    interval: 30 * 60 * 1000,
    maxAge: 60 * 60 * 1000,
  },

  isProduction: process.env.NODE_ENV === "production",
};

module.exports = config;
