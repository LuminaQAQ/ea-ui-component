import variable from "@themes/variables.scss?inline";
import type { EaElement } from "@/types/index";
import { createBEM } from "@utils/bem";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import "@components/ea-icon/index";

export { createBEM };

/**
 * EA UI 组件基类
 * 提供基础生命周期、事件系统、本地化支持
 */
@CustomElement("ea-base", { styles: [variable], autoDefine: false })
export default class EaBase extends HTMLElement implements EaElement {
  // ==================== 属性定义 ====================

  /**
   * 语言设置
   * @default "en-US"
   */
  @attribute({
    type: String,
    observer(this: EaBase, locale: string) {
      this.$updateLocalization(locale);
    },
  })
  locale: string = "en-US";

  // ==================== 构造函数 ====================

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // ==================== 生命周期钩子 ====================

  connectedCallback(): void {
    this.tabIndex = Number(this.getAttribute("tabindex")) || 0;
    this.$mount();
  }

  disconnectedCallback(): void {
    this.$beforeUnmount?.();
    this.emit("beforeUnmount", { detail: this });

    this.$unmounted?.();
    this.emit("unmounted", { detail: this });
  }

  attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string | null
  ): void {
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
}
