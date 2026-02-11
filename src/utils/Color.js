/**
 * 颜色处理工具类
 * 支持多种颜色格式转换和操作
 */
export class Color {
  /**
   * 构造函数
   * @param {string|Object} color - 颜色值，支持 hex、rgb、hsl、hsv 格式
   */
  constructor(color) {
    this._value = this.parse(color);
  }

  /**
   * 解析颜色值
   * @param {string|Object} color - 颜色值
   * @returns {Object} 颜色对象
   */
  parse(color) {
    if (!color) {
      return this._getDefaultColor();
    }

    if (typeof color === 'string') {
      return this._parseString(color);
    }

    if (typeof color === 'object') {
      return this._validateColorObject(color);
    }

    return this._getDefaultColor();
  }

  /**
   * 解析字符串颜色值
   * @param {string} colorStr - 颜色字符串
   * @returns {Object} 颜色对象
   */
  _parseString(colorStr) {
    colorStr = colorStr.trim().toLowerCase();

    // HEX 格式
    if (colorStr.startsWith('#')) {
      return this._parseHex(colorStr);
    }

    // RGB 格式
    if (colorStr.startsWith('rgb')) {
      return this._parseRgb(colorStr);
    }

    // HSL 格式
    if (colorStr.startsWith('hsl')) {
      return this._parseHsl(colorStr);
    }

    // HSV 格式
    if (colorStr.startsWith('hsv')) {
      return this._parseHsv(colorStr);
    }

    return this._getDefaultColor();
  }

  /**
   * 解析 HEX 颜色
   * @param {string} hex - HEX 颜色值
   * @returns {Object} 颜色对象
   */
  _parseHex(hex) {
    hex = hex.replace('#', '');
    
    // 处理简写格式
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }

    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return { r, g, b, a: 1 };
    }

    if (hex.length === 8) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const a = parseInt(hex.substring(6, 8), 16) / 255;
      
      return { r, g, b, a };
    }

    return this._getDefaultColor();
  }

  /**
   * 解析 RGB 颜色
   * @param {string} rgbStr - RGB 颜色字符串
   * @returns {Object} 颜色对象
   */
  _parseRgb(rgbStr) {
    const match = rgbStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?\)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
      };
    }
    return this._getDefaultColor();
  }

  /**
   * 解析 HSL 颜色
   * @param {string} hslStr - HSL 颜色字符串
   * @returns {Object} 颜色对象
   */
  _parseHsl(hslStr) {
    const match = hslStr.match(/hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/);
    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]) / 100;
      const l = parseInt(match[3]) / 100;
      const a = match[4] ? parseFloat(match[4]) : 1;
      
      return this._hslToRgb({ h, s, l, a });
    }
    return this._getDefaultColor();
  }

  /**
   * 解析 HSV 颜色
   * @param {string} hsvStr - HSV 颜色字符串
   * @returns {Object} 颜色对象
   */
  _parseHsv(hsvStr) {
    const match = hsvStr.match(/hsv\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/);
    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]) / 100;
      const v = parseInt(match[3]) / 100;
      const a = match[4] ? parseFloat(match[4]) : 1;
      
      return this._hsvToRgb({ h, s, v, a });
    }
    return this._getDefaultColor();
  }

  /**
   * 验证颜色对象
   * @param {Object} colorObj - 颜色对象
   * @returns {Object} 验证后的颜色对象
   */
  _validateColorObject(colorObj) {
    const { r, g, b, a = 1, h, s, l, v } = colorObj;
    
    if (r !== undefined && g !== undefined && b !== undefined) {
      return {
        r: Math.max(0, Math.min(255, r)),
        g: Math.max(0, Math.min(255, g)),
        b: Math.max(0, Math.min(255, b)),
        a: Math.max(0, Math.min(1, a))
      };
    }

    if (h !== undefined && s !== undefined && l !== undefined) {
      return this._hslToRgb({
        h: Math.max(0, Math.min(360, h)),
        s: Math.max(0, Math.min(1, s)),
        l: Math.max(0, Math.min(1, l)),
        a: Math.max(0, Math.min(1, a))
      });
    }

    if (h !== undefined && s !== undefined && v !== undefined) {
      return this._hsvToRgb({
        h: Math.max(0, Math.min(360, h)),
        s: Math.max(0, Math.min(1, s)),
        v: Math.max(0, Math.min(1, v)),
        a: Math.max(0, Math.min(1, a))
      });
    }

    return this._getDefaultColor();
  }

  /**
   * 获取默认颜色
   * @returns {Object} 默认颜色对象
   */
  _getDefaultColor() {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  /**
   * HSL 转 RGB
   * @param {Object} hsl - HSL 颜色对象
   * @returns {Object} RGB 颜色对象
   */
  _hslToRgb(hsl) {
    const { h, s, l, a = 1 } = hsl;
    
    if (s === 0) {
      const gray = Math.round(l * 255);
      return { r: gray, g: gray, b: gray, a };
    }

    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hk = h / 360;

    const r = Math.round(hueToRgb(p, q, hk + 1/3) * 255);
    const g = Math.round(hueToRgb(p, q, hk) * 255);
    const b = Math.round(hueToRgb(p, q, hk - 1/3) * 255);

    return { r, g, b, a };
  }

  /**
   * HSV 转 RGB
   * @param {Object} hsv - HSV 颜色对象
   * @returns {Object} RGB 颜色对象
   */
  _hsvToRgb(hsv) {
    const { h, s, v, a = 1 } = hsv;
    
    const hi = Math.floor(h / 60) % 6;
    const f = h / 60 - hi;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r, g, b;

    switch (hi) {
      case 0: [r, g, b] = [v, t, p]; break;
      case 1: [r, g, b] = [q, v, p]; break;
      case 2: [r, g, b] = [p, v, t]; break;
      case 3: [r, g, b] = [p, q, v]; break;
      case 4: [r, g, b] = [t, p, v]; break;
      case 5: [r, g, b] = [v, p, q]; break;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a
    };
  }

  /**
   * RGB 转 HSL
   * @returns {Object} HSL 颜色对象
   */
  _rgbToHsl() {
    const { r, g, b, a } = this._value;
    
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      
      switch (max) {
        case red: h = (green - blue) / delta + (green < blue ? 6 : 0); break;
        case green: h = (blue - red) / delta + 2; break;
        case blue: h = (red - green) / delta + 4; break;
      }
      
      h *= 60;
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100), a };
  }

  /**
   * RGB 转 HSV
   * @returns {Object} HSV 颜色对象
   */
  _rgbToHsv() {
    const { r, g, b, a } = this._value;
    
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;

    let h = 0;
    const s = max === 0 ? 0 : delta / max;
    const v = max;

    if (delta !== 0) {
      switch (max) {
        case red: h = (green - blue) / delta + (green < blue ? 6 : 0); break;
        case green: h = (blue - red) / delta + 2; break;
        case blue: h = (red - green) / delta + 4; break;
      }
      h *= 60;
    }

    return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100), a };
  }

  /**
   * 获取 HEX 格式颜色
   * @param {boolean} withAlpha - 是否包含透明度
   * @returns {string} HEX 颜色值
   */
  toHex(withAlpha = false) {
    const { r, g, b, a } = this._value;
    
    const toHex = (num) => {
      const hex = Math.round(num).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    
    if (withAlpha && a < 1) {
      hex += toHex(a * 255);
    }

    return hex;
  }

  /**
   * 获取 RGB 格式颜色
   * @param {boolean} withAlpha - 是否包含透明度
   * @returns {string} RGB 颜色值
   */
  toRgb(withAlpha = false) {
    const { r, g, b, a } = this._value;
    
    if (withAlpha && a < 1) {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * 获取 HSL 格式颜色
   * @param {boolean} withAlpha - 是否包含透明度
   * @returns {string} HSL 颜色值
   */
  toHsl(withAlpha = false) {
    const hsl = this._rgbToHsl();
    
    if (withAlpha && hsl.a < 1) {
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`;
    }
    
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  /**
   * 获取 HSV 格式颜色
   * @param {boolean} withAlpha - 是否包含透明度
   * @returns {string} HSV 颜色值
   */
  toHsv(withAlpha = false) {
    const hsv = this._rgbToHsv();
    
    if (withAlpha && hsv.a < 1) {
      return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%, ${hsv.a})`;
    }
    
    return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
  }

  /**
   * 获取指定格式的颜色值
   * @param {string} format - 颜色格式
   * @returns {string} 颜色值
   */
  toString(format = 'hex') {
    switch (format.toLowerCase()) {
      case 'hex': return this.toHex();
      case 'hexa': return this.toHex(true);
      case 'rgb': return this.toRgb();
      case 'rgba': return this.toRgb(true);
      case 'hsl': return this.toHsl();
      case 'hsla': return this.toHsl(true);
      case 'hsv': return this.toHsv();
      default: return this.toHex();
    }
  }

  /**
   * 获取颜色对象
   * @returns {Object} 颜色对象
   */
  getValue() {
    return { ...this._value };
  }

  /**
   * 设置颜色值
   * @param {string|Object} color - 颜色值
   */
  setValue(color) {
    this._value = this.parse(color);
  }

  /**
   * 获取亮度值
   * @returns {number} 亮度值 (0-1)
   */
  getBrightness() {
    const { r, g, b } = this._value;
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  }

  /**
   * 判断颜色是否为亮色
   * @returns {boolean} 是否为亮色
   */
  isLight() {
    return this.getBrightness() > 0.5;
  }

  /**
   * 判断颜色是否为暗色
   * @returns {boolean} 是否为暗色
   */
  isDark() {
    return this.getBrightness() <= 0.5;
  }
}