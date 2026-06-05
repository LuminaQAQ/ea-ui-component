import variable from "@themes/variables.scss?inline";
import type { EaElement } from "@/types/index";
import { createBEM } from "@utils/bem";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";

export { createBEM };

/**
 * EA UI 组件基类
 * 提供基础生命周期、事件系统、本地化支持
 */
@CustomElement("ea-base", { styles: [variable], autoDefine: false })
export default class EaBase extends HTMLElement implements EaElement {
  // ==================== 属性定义 ====================

  private _isRendered: Promise<void> | null = null;
  private _isInitialized: boolean = false;
  private _rendered!: (value: void | PromiseLike<void>) => void;

  /**
   * 语言设置
   * @default "en-US"
   */
  @attribute({
    type: String,
    default: "en-US",
    observer(this: EaBase, locale: string) {
      this.$updateLocalization(locale);
    },
  })
  locale: string = "en-US";

  // ==================== 构造函数 ====================

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._isInitialized = false;
    this._isRendered = new Promise<void>(resolve => {
      this._rendered = resolve;
    });
  }

  // ==================== 生命周期钩子 ====================

  connectedCallback(): void {
    if (this._isInitialized) return;

    const tabindexAttr = this.getAttribute("tabindex");
    if (tabindexAttr !== null) {
      this.tabIndex = Number(tabindexAttr);
    }

    requestAnimationFrame(() => {
      this.$mount();
      this._rendered?.();
      this.$mounted();

      this._isInitialized = true;
    });
  }

  disconnectedCallback(): void {
    this.$beforeUnmount?.();
    this.emit("beforeUnmount", { detail: this });

    this.$unmounted?.();
    this.emit("unmounted", { detail: this });

    this._isInitialized = false;
    this._isRendered = null;
  }

  async attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string | null
  ): Promise<void> {
    await this._isRendered;

    this.$updated({ key: name, newVal, oldVal });
  }

  // ==================== 子类可覆盖方法 ====================

  /**
   * 更新组件语言
   * @param locale 语言代码
   */
  $updateLocalization(_locale: string): void {}

  /**
   * 组件模板渲染
   * @returns HTML 模板字符串
   */
  html(): string {
    return "";
  }

  /**
   * 组件挂载时调用
   */
  $mount(): void {}

  /**
   * 组件挂载完成后调用
   */
  $mounted(): void {}

  /** 组件销毁前调用 */
  $beforeUnmount(): void {}

  /** 组件销毁后调用 */
  $unmounted(): void {}

  /**
   * 组件更新回调
   * @param data 更新数据
   */
  $updated(data: { key: string; newVal: any; oldVal?: any }): void {
    this.emit("updated", { detail: data });
  }

  // ==================== 事件系统 ====================

  /**
   * 触发自定义事件
   * @param eventName 事件名
   * @param options 事件选项
   */
  emit(eventName: string, options?: CustomEventInit): boolean {
    return this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        cancelable: false,
        ...options,
      })
    );
  }

  // ==================== 焦点管理 ====================

  /**
   * 获取可聚焦元素列表
   * @param scope 查询范围：'shadow' 仅 Shadow DOM，'light' 仅 Light DOM，'all' 两者
   * @returns 可聚焦的 HTMLElement 数组
   */
  $getFocusableElements(
    scope: "shadow" | "light" | "all" = "shadow"
  ): HTMLElement[] {
    const selector =
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const shadowFocusable = Array.from(
      this.shadowRoot?.querySelectorAll(selector) ?? []
    ) as HTMLElement[];
    if (scope === "shadow") return shadowFocusable;

    const lightFocusable = Array.from(
      this.querySelectorAll(selector)
    ) as HTMLElement[];
    if (scope === "light") return lightFocusable;

    return [...shadowFocusable, ...lightFocusable];
  }

  /**
   * 聚焦到第一个可聚焦元素
   * @param scope 查询范围
   */
  $focusFirst(scope: "shadow" | "light" | "all" = "shadow"): void {
    this.$getFocusableElements(scope)[0]?.focus();
  }

  /**
   * 聚焦到最后一个可聚焦元素
   * @param scope 查询范围
   */
  $focusLast(scope: "shadow" | "light" | "all" = "shadow"): void {
    const els = this.$getFocusableElements(scope);
    els[els.length - 1]?.focus();
  }
}
