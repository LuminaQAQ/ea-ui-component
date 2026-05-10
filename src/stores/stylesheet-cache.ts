class StylesheetCacheManager {
  private cache: Map<string, CSSStyleSheet> = new Map();

  getOrCreate(css: string): CSSStyleSheet {
    let sheet = this.cache.get(css);

    if (!sheet) {
      sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      this.cache.set(css, sheet);
    }

    return sheet;
  }

  get size(): number {
    return this.cache.size;
  }

  clear(): void {
    this.cache.clear();
  }

  has(css: string): boolean {
    return this.cache.has(css);
  }
}

export const StylesheetCache = new StylesheetCacheManager();
export default StylesheetCache;
