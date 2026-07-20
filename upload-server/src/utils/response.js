function success(res, data = null, message = "success", statusCode = 200) {
  return res.status(statusCode).json({
    code: 0,
    message,
    data,
  });
}

function fail(res, message = "error", code = -1, statusCode = 400, details = null) {
  const body = { code, message };
  if (details) body.details = details;
  return res.status(statusCode).json(body);
}

module.exports = { success, fail };
