const STORAGE_KEY = "ea-theme";
const DARK_CLASS = "dark";

const GlobalLocalStorage: globalThis.Storage =
  typeof globalThis.localStorage !== "undefined"
    ? globalThis.localStorage
    : (new (class {
        readonly length: number = 0;
        clear = () => undefined;
        getItem = () => undefined;
        key = () => undefined;
        removeItem = () => undefined;
        setItem = () => undefined;
        [key: string]: any;
      })() as unknown as Storage);

export type ThemeMode = "light" | "dark" | "auto";
export type ThemeValue = "light" | "dark";

function getSystemPreference(): boolean {
  return globalThis.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
}

function getStoredTheme(): ThemeMode | null {
  return GlobalLocalStorage.getItem(STORAGE_KEY) as ThemeMode | null;
}

function applyTheme(isDark: boolean): void {
  if (typeof globalThis.document === "undefined") return;

  document.documentElement.classList.toggle(DARK_CLASS, isDark);
}

function dispatchThemeChange(): void {
  if (typeof globalThis.document === "undefined") return;

  document.dispatchEvent(
    new CustomEvent("ea-theme-change", {
      detail: { mode: getCurrentTheme() },
    })
  );
}

/**
 * 初始化主题，应在应用启动时调用。
 * 优先级：用户手动选择 > 系统偏好
 */
export function initTheme(): void {
  const stored = getStoredTheme();
  const systemDark = getSystemPreference();

  const shouldBeDark = stored === "dark" || (stored !== "light" && systemDark);
  applyTheme(shouldBeDark);

  globalThis
    .matchMedia?.("(prefers-color-scheme: dark)")
    ?.addEventListener("change", e => {
      if (!getStoredTheme() || getStoredTheme() === "auto") {
        applyTheme(e.matches);
        dispatchThemeChange();
      }
    });
}

/**
 * 设置主题模式。
 * @param mode - 'light' | 'dark' | 'auto'（auto 跟随系统偏好）
 */
export function setTheme(mode: ThemeMode): void {
  if (mode === "auto") {
    GlobalLocalStorage.removeItem(STORAGE_KEY);
    applyTheme(getSystemPreference());
  } else {
    GlobalLocalStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode === "dark");
  }
  dispatchThemeChange();
}

/**
 * 获取当前实际主题值。
 * @returns 'light' 或 'dark'
 */
export function getCurrentTheme(): ThemeValue {
  if (typeof globalThis.document === "undefined") return "light";

  return document.documentElement.classList.contains(DARK_CLASS)
    ? "dark"
    : "light";
}

/**
 * 切换当前主题（light ↔ dark）。
 */
export function toggleTheme(): void {
  setTheme(getCurrentTheme() === "dark" ? "light" : "dark");
}
