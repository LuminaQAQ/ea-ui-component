const { fail } = require("../utils/response");

const ERROR_MAP = {
  LIMIT_FILE_SIZE: { status: 413, message: "文件大小超过限制" },
  LIMIT_FILE_COUNT: { status: 400, message: "文件数量超过限制" },
  LIMIT_FIELD_KEY: { status: 400, message: "字段名过长" },
  LIMIT_FIELD_VALUE: { status: 400, message: "字段值过长" },
  LIMIT_FIELD_COUNT: { status: 400, message: "字段数量超过限制" },
  LIMIT_UNEXPECTED_FILE: { status: 400, message: "意外的文件字段" },
  LIMIT_FILE_TYPE: { status: 415, message: "不支持的文件类型" },
};

function errorHandler(err, req, res, next) {
  if (!err) return next();

  if (err.code && ERROR_MAP[err.code]) {
    const info = ERROR_MAP[err.code];
    return fail(res, info.message, err.code, info.status, {
      field: err.field,
      file: err.field,
    });
  }

  if (err.type === "entity.too.large") {
    return fail(res, "请求体过大", "ENTITY_TOO_LARGE", 413);
  }

  console.error("[error]", err);
  return fail(res, err.message || "服务器内部错误", "INTERNAL_ERROR", 500);
}

module.exports = errorHandler;
