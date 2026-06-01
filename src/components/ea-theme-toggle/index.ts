import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, listen } from "@decorator";
import { setTheme, getCurrentTheme } from "@themes/controller";
import type { ThemeMode, ThemeValue } from "@themes/controller";
import "@/components/ea-switch/index";
import "@/components/ea-icon/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-theme-toggle" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 主题切换组件，基于 ea-switch 封装，支持日间/夜间模式切换。
 * @status stable
 * @since 3.1
 *
 * @dependency ea-switch, ea-icon
 *
 * @event ea-theme-toggle-change - 主题切换时触发，detail: `{ mode: 'light' | 'dark' }`。
 *
 * @csspart switch - 内部 ea-switch 组件。
 *
 * @cssproperty --ea-theme-toggle-active-color - 暗色状态开关背景色。
 * @cssproperty --ea-theme-toggle-inactive-color - 浅色状态开关背景色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaThemeToggle extends EaBase {
  private _observer: MutationObserver | null = null;

  @attribute({
    type: String,
    default: "auto",
    observer(this: EaThemeToggle, newVal: string) {
      setTheme(newVal as ThemeMode);
      this._syncSwitchState();
    },
  })
  mode: string = "auto";

  /**
   * 同步内部 ea-switch 的选中状态与当前主题一致
   */
  private _syncSwitchState(): void {
    const switchEl = this.shadowRoot?.querySelector("ea-switch");
    if (switchEl) {
      (switchEl as any).value = String(getCurrentTheme() === "dark");
    }
  }

  /**
   * 处理内部 ea-switch 的 change 事件
   */
  @listen("change", "ea-switch")
  private _handleSwitchChange(e: Event): void {
    e.stopPropagation();

    const isDark = getCurrentTheme() !== "dark";
    setTheme(isDark ? "dark" : "light");
    this.mode = isDark ? "dark" : "light";
    this.emit("ea-theme-toggle-change", { detail: { mode: this.mode } });
  }

  html(): string {
    const isDark = getCurrentTheme() === "dark";
    return `
      <ea-switch
        class="${bem.e("switch")}"
        part="switch"
        value="${isDark}"
        active-color="var(--ea-theme-toggle-active-color, var(--blue-500))"
        inactive-color="var(--ea-theme-toggle-inactive-color, var(--grey-300))"
      >
        <ea-icon slot="active" name="fa-solid fa-moon"></ea-icon>
        <ea-icon slot="inactive" name="fa-solid fa-sun"></ea-icon>
      </ea-switch>
    `;
  }

  $mount(): void {
    this._syncSwitchState();

    this._observer = new MutationObserver(() => {
      this._syncSwitchState();
    });
    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  $beforeUnmount(): void {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
}
