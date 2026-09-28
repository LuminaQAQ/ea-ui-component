type ColorFormat = "hex" | "hexa" | "rgb" | "rgba" | "hsl" | "hsla" | "hsv";

interface ColorValue {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface HslValue {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface HsvValue {
  h: number;
  s: number;
  v: number;
  a: number;
}

type ColorInput = string | Partial<ColorValue & HslValue & HsvValue>;

export class Color {
  #value: ColorValue;

  constructor(color?: ColorInput) {
    this.#value = this.parse(color);
  }

  parse(color?: ColorInput): ColorValue {
    if (!color) {
      return this.#getDefaultColor();
    }

    if (typeof color === "string") {
      const result = this.#parseString(color);
      return result || this.#getDefaultColor();
    }

    if (typeof color === "object") {
      return this.#validateColorObject(color);
    }

    return this.#getDefaultColor();
  }

  #parseStringStrict(colorStr: string): ColorValue | null {
    colorStr = colorStr.trim().toLowerCase();

    if (colorStr.startsWith("#")) {
      return this.#parseHex(colorStr);
    }

    if (colorStr.startsWith("rgb")) {
      return this.#parseRgb(colorStr);
    }

    if (colorStr.startsWith("hsl")) {
      return this.#parseHsl(colorStr);
    }

    if (colorStr.startsWith("hsv")) {
      return this.#parseHsv(colorStr);
    }

    return null;
  }

  static parseStringStrict(colorStr: string): ColorValue | null {
    if (!colorStr || typeof colorStr !== "string") {
      return null;
    }

    colorStr = colorStr.trim().toLowerCase();

    if (colorStr.startsWith("#")) {
      return Color.#parseHexStatic(colorStr);
    }

    if (colorStr.startsWith("rgb")) {
      return Color.#parseRgbStatic(colorStr);
    }

    if (colorStr.startsWith("hsl")) {
      return Color.#parseHslStatic(colorStr);
    }

    if (colorStr.startsWith("hsv")) {
      return Color.#parseHsvStatic(colorStr);
    }

    return null;
  }

  static #parseHexStatic(hex: string): ColorValue | null {
    hex = hex.replace("#", "");

    const validLengths = [3, 6, 8];
    if (!validLengths.includes(hex.length)) {
      return null;
    }

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(c => c + c)
        .join("");
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

    return null;
  }

  static #parseRgbStatic(rgbStr: string): ColorValue | null {
    const match = rgbStr.match(
      /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
    );
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      const a = match[4] ? parseFloat(match[4]) : 1;

      if (
        r < 0 ||
        r > 255 ||
        g < 0 ||
        g > 255 ||
        b < 0 ||
        b > 255 ||
        a < 0 ||
        a > 1
      ) {
        return null;
      }

      return { r, g, b, a };
    }
    return null;
  }

  static #parseHslStatic(hslStr: string): ColorValue | null {
    const match = hslStr.match(
      /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
    );
    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]) / 100;
      const l = parseInt(match[3]) / 100;
      const a = match[4] ? parseFloat(match[4]) : 1;

      if (
        h < 0 ||
        h > 360 ||
        s < 0 ||
        s > 1 ||
        l < 0 ||
        l > 1 ||
        a < 0 ||
        a > 1
      ) {
        return null;
      }

      return Color.#hslToRgbStatic({ h, s, l, a });
    }
    return null;
  }

  static #parseHsvStatic(hsvStr: string): ColorValue | null {
    const match = hsvStr.match(
      /hsv\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
    );

    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]) / 100;
      const v = parseInt(match[3]) / 100;
      const a = match[4] ? parseFloat(match[4]) : 1;

      if (
        h < 0 ||
        h > 360 ||
        s < 0 ||
        s > 1 ||
        v < 0 ||
        v > 1 ||
        a < 0 ||
        a > 1
      ) {
        return null;
      }

      return Color.#hsvToRgbStatic({ h, s, v, a });
    }

    return null;
  }

  static #hslToRgbStatic(hsl: HslValue): ColorValue {
    const { h, s, l, a = 1 } = hsl;

    if (s === 0) {
      const gray = Math.round(l * 255);
      return { r: gray, g: gray, b: gray, a };
    }

    const hueToRgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hk = h / 360;

    const r = Math.round(hueToRgb(p, q, hk + 1 / 3) * 255);
    const g = Math.round(hueToRgb(p, q, hk) * 255);
    const b = Math.round(hueToRgb(p, q, hk - 1 / 3) * 255);

    return { r, g, b, a };
  }

  static #hsvToRgbStatic(hsv: HsvValue): ColorValue {
    const { h, s, v, a = 1 } = hsv;

    const hi = Math.floor(h / 60) % 6;
    const f = h / 60 - hi;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r: number, g: number, b: number;

    switch (hi) {
      case 0:
        [r, g, b] = [v, t, p];
        break;
      case 1:
        [r, g, b] = [q, v, p];
        break;
      case 2:
        [r, g, b] = [p, v, t];
        break;
      case 3:
        [r, g, b] = [p, q, v];
        break;
      case 4:
        [r, g, b] = [t, p, v];
        break;
      case 5:
        [r, g, b] = [v, p, q];
        break;
    }

    return {
      r: Math.round(r! * 255),
      g: Math.round(g! * 255),
      b: Math.round(b! * 255),
      a,
    };
  }

  #parseString(colorStr: string): ColorValue | null {
    return this.#parseStringStrict(colorStr);
  }

  #parseHex(hex: string): ColorValue | null {
    hex = hex.replace("#", "");

    const validLengths = [3, 6, 8];
    if (!validLengths.includes(hex.length)) {
      return null;
    }

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(c => c + c)
        .join("");
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

    return null;
  }

  #parseRgb(rgbStr: string): ColorValue | null {
    const match = rgbStr.match(
      /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
    );
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      const a = match[4] ? parseFloat(match[4]) : 1;

      if (
        r < 0 ||
        r > 255 ||
        g < 0 ||
        g > 255 ||
        b < 0 ||
        b > 255 ||
        a < 0 ||
        a > 1
      ) {
        return null;
      }

      return { r, g, b, a };
    }
    return null;
  }

  #parseHsl(hslStr: string): ColorValue | null {
    const match = hslStr.match(
      /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
    );
    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]) / 100;
      const l = parseInt(match[3]) / 100;
      const a = match[4] ? parseFloat(match[4]) : 1;

      if (
        h < 0 ||
        h > 360 ||
        s < 0 ||
        s > 1 ||
        l < 0 ||
        l > 1 ||
        a < 0 ||
        a > 1
      ) {
        return null;
      }

      return this.#hslToRgb({ h, s, l, a });
    }
    return null;
  }

  hsvStrToHsvObject(hsvStr: string): HsvValue | null {
    const match = hsvStr.match(
      /hsv\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
    );

    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]) / 100;
      const v = parseInt(match[3]) / 100;
      const a = match[4] ? parseFloat(match[4]) : 1;

      return { h, s, v, a };
    }

    return null;
  }

  #parseHsv(hsvStr: string): ColorValue | null {
    const match = this.hsvStrToHsvObject(hsvStr);
    if (match) {
      const h = match.h;
      const s = match.s;
      const v = match.v;
      const a = match.a;

      if (
        h < 0 ||
        h > 360 ||
        s < 0 ||
        s > 1 ||
        v < 0 ||
        v > 1 ||
        a < 0 ||
        a > 1
      ) {
        return null;
      }

      return this.#hsvToRgb({ h, s, v, a });
    }
    return null;
  }

  #validateColorObject(colorObj: Partial<ColorValue & HslValue & HsvValue>): ColorValue {
    const { r, g, b, a = 1, h, s, l, v } = colorObj;

    if (r !== undefined && g !== undefined && b !== undefined) {
      return {
        r: Math.max(0, Math.min(255, r)),
        g: Math.max(0, Math.min(255, g)),
        b: Math.max(0, Math.min(255, b)),
        a: Math.max(0, Math.min(1, a)),
      };
    }

    if (h !== undefined && s !== undefined && l !== undefined) {
      return this.#hslToRgb({
        h: Math.max(0, Math.min(360, h)),
        s: Math.max(0, Math.min(1, s)),
        l: Math.max(0, Math.min(1, l)),
        a: Math.max(0, Math.min(1, a)),
      });
    }

    if (h !== undefined && s !== undefined && v !== undefined) {
      return this.#hsvToRgb({
        h: Math.max(0, Math.min(360, h)),
        s: Math.max(0, Math.min(1, s)),
        v: Math.max(0, Math.min(1, v)),
        a: Math.max(0, Math.min(1, a)),
      });
    }

    return this.#getDefaultColor();
  }

  #getDefaultColor(): ColorValue {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  #hslToRgb(hsl: HslValue): ColorValue {
    const { h, s, l, a = 1 } = hsl;

    if (s === 0) {
      const gray = Math.round(l * 255);
      return { r: gray, g: gray, b: gray, a };
    }

    const hueToRgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hk = h / 360;

    const r = Math.round(hueToRgb(p, q, hk + 1 / 3) * 255);
    const g = Math.round(hueToRgb(p, q, hk) * 255);
    const b = Math.round(hueToRgb(p, q, hk - 1 / 3) * 255);

    return { r, g, b, a };
  }

  #hsvToRgb(hsv: HsvValue): ColorValue {
    const { h, s, v, a = 1 } = hsv;

    const hi = Math.floor(h / 60) % 6;
    const f = h / 60 - hi;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r: number, g: number, b: number;

    switch (hi) {
      case 0:
        [r, g, b] = [v, t, p];
        break;
      case 1:
        [r, g, b] = [q, v, p];
        break;
      case 2:
        [r, g, b] = [p, v, t];
        break;
      case 3:
        [r, g, b] = [p, q, v];
        break;
      case 4:
        [r, g, b] = [t, p, v];
        break;
      case 5:
        [r, g, b] = [v, p, q];
        break;
    }

    return {
      r: Math.round(r! * 255),
      g: Math.round(g! * 255),
      b: Math.round(b! * 255),
      a,
    };
  }

  #rgbToHsl(): HslValue {
    const { r, g, b, a } = this.#value;

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
        case red:
          h = (green - blue) / delta + (green < blue ? 6 : 0);
          break;
        case green:
          h = (blue - red) / delta + 2;
          break;
        case blue:
          h = (red - green) / delta + 4;
          break;
      }

      h *= 60;
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
      a,
    };
  }

  #rgbToHsv(): HsvValue {
    const { r, g, b, a } = this.#value;

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
        case red:
          h = (green - blue) / delta + (green < blue ? 6 : 0);
          break;
        case green:
          h = (blue - red) / delta + 2;
          break;
        case blue:
          h = (red - green) / delta + 4;
          break;
      }
      h *= 60;
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
      a,
    };
  }

  toHex(withAlpha = false): string {
    const { r, g, b, a } = this.#value;

    const toHex = (num: number): string => {
      const hex = Math.round(num).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    if (withAlpha && a < 1) {
      hex += toHex(a * 255);
    }

    return hex;
  }

  toRgb(withAlpha = false): string {
    const { r, g, b, a } = this.#value;

    if (withAlpha && a < 1) {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  toHsl(withAlpha = false): string {
    const hsl = this.#rgbToHsl();

    if (withAlpha && hsl.a < 1) {
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`;
    }

    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  toHsv(withAlpha = false): string {
    const hsv = this.#rgbToHsv();

    if (withAlpha && hsv.a < 1) {
      return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%, ${hsv.a})`;
    }

    return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
  }

  toString(format: ColorFormat = "hex"): string {
    switch (format.toLowerCase()) {
      case "hex":
        return this.toHex();
      case "hexa":
        return this.toHex(true);
      case "rgb":
        return this.toRgb();
      case "rgba":
        return this.toRgb(true);
      case "hsl":
        return this.toHsl();
      case "hsla":
        return this.toHsl(true);
      case "hsv":
        return this.toHsv();
      default:
        return this.toHex();
    }
  }

  getValue(): ColorValue {
    return { ...this.#value };
  }

  setValue(color: ColorInput): void {
    this.#value = this.parse(color);
  }

  getBrightness(): number {
    const { r, g, b } = this.#value;
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  }

  isLight(): boolean {
    return this.getBrightness() > 0.5;
  }

  isDark(): boolean {
    return this.getBrightness() <= 0.5;
  }

  static isValidColor(colorValue: string): boolean {
    if (!colorValue || typeof colorValue !== "string") {
      return false;
    }

    const result = Color.parseStringStrict(colorValue);
    return result !== null;
  }
}

export type { ColorFormat, ColorValue, HslValue, HsvValue, ColorInput };
