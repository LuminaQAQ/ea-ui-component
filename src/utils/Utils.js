export default class EaUtils {
  static Array = {};
  static String = {};
  static Object = {};
  static Number = {};
  static RegExp = {};
  static Boolean = {};
  static Enum = {};
}

EaUtils.Array.toLowerCamelCase = function (arr) {
  if (!Array.isArray(arr)) arr = Array.from(arr);

  return arr.map((item) => EaUtils.String.toLowerCamelCase(item));
};

EaUtils.String.toLowerCamelCase = function (str) {
  return str
    .toString()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
};

EaUtils.Boolean.isBoolean = function (value) {
  return (
    typeof value === "boolean" ||
    rawValue === "" ||
    rawValue === "true" ||
    rawValue === true
  );
};

EaUtils.Number.isNumber = function (value) {
  value = Number(value);
  return typeof value === "number" && !isNaN(value);
};

EaUtils.Enum.isEnum = function (value) {
  return Array.isArray(value);
};
