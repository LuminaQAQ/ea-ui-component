const express = require('express');
const { success } = require('../utils/response');

const router = express.Router();

router.get('/', (req, res) => {
  success(res, {
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime(),
  });
});

module.exports = router;
