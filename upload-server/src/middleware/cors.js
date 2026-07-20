const cors = require("cors");
const config = require("../config");

const corsMiddleware = cors({
  origin: config.cors.origin,
  methods: config.cors.methods,
  allowedHeaders: config.cors.allowedHeaders,
  credentials: false,
});

module.exports = corsMiddleware;
