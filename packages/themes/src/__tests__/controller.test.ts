import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { initTheme, setTheme, getCurrentTheme, toggleTheme } from "../controller";

const STORAGE_KEY = "ea-theme";
const DARK_CLASS = "dark";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as any);
}

describe("controller", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove(DARK_CLASS);
    vi.restoreAllMocks();
  });

  describe("initTheme", () => {
    it("无存储 + 系统浅色 → html 无 .dark 类", () => {
      mockMatchMedia(false);

      initTheme();
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(false);
    });

    it("无存储 + 系统暗色 → html 有 .dark 类", () => {
      mockMatchMedia(true);

      initTheme();
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(true);
    });

    it("存储 light + 系统暗色 → html 无 .dark 类（手动优先）", () => {
      localStorage.setItem(STORAGE_KEY, "light");
      mockMatchMedia(true);

      initTheme();
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(false);
    });

    it("存储 dark + 系统浅色 → html 有 .dark 类（手动优先）", () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      mockMatchMedia(false);

      initTheme();
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(true);
    });
  });

  describe("setTheme", () => {
    it("setTheme('dark') → localStorage 存 dark，html 有 .dark", () => {
      setTheme("dark");
      expect(localStorage.getItem(STORAGE_KEY)).toBe("dark");
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(true);
    });

    it("setTheme('light') → localStorage 存 light，html 无 .dark", () => {
      setTheme("light");
      expect(localStorage.getItem(STORAGE_KEY)).toBe("light");
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(false);
    });

    it("setTheme('auto') → localStorage 清除，跟随系统", () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      mockMatchMedia(false);

      setTheme("auto");
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(false);
    });
  });

  describe("getCurrentTheme", () => {
    it("html 无 .dark → 返回 'light'", () => {
      expect(getCurrentTheme()).toBe("light");
    });

    it("html 有 .dark → 返回 'dark'", () => {
      document.documentElement.classList.add(DARK_CLASS);
      expect(getCurrentTheme()).toBe("dark");
    });
  });

  describe("toggleTheme", () => {
    it("浅色 → 暗色", () => {
      toggleTheme();
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(true);
      expect(localStorage.getItem(STORAGE_KEY)).toBe("dark");
    });

    it("暗色 → 浅色", () => {
      document.documentElement.classList.add(DARK_CLASS);
      toggleTheme();
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(false);
      expect(localStorage.getItem(STORAGE_KEY)).toBe("light");
    });
  });
});
