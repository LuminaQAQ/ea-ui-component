export default class EaUtils {
  static stringToLowerCamelCase(str) {
    return str
      .toString()
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
      .toLowerCase();
  }

  static arrayToLowerCamelCase(arr) {
    if (!Array.isArray(arr)) arr = Array.from(arr);

    return arr.map((item) => this.stringToLowerCamelCase(item));
  }
}
