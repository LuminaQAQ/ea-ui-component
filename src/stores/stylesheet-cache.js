class StylesheetCacheManager {
  /**
   * @private
   * @type {Map<string, CSSStyleSheet>}
   */
  cache = new Map();

  /**
   * @param {string} css
   * @returns {CSSStyleSheet}
   */
  getOrCreate(css) {
    let sheet = this.cache.get(css);

    if (!sheet) {
      sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      this.cache.set(css, sheet);
    }

    return sheet;
  }

  /**
   * @returns {number}
   */
  get size() {
    return this.cache.size;
  }

  clear() {
    this.cache.clear();
  }

  /**
   * @param {string} css
   * @returns {boolean}
   */
  has(css) {
    return this.cache.has(css);
  }
}

export const StylesheetCache = new StylesheetCacheManager();
export default StylesheetCache;
