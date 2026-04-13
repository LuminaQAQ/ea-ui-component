import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import type { EaCollapseItem } from "../ea-collapse-item/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-collapse" as const;
const bem = createBEM(TAG_NAME);

// ==================== 类型定义 ====================

export type ActiveValue = string | string[];

export interface CollapseChangeDetail {
  name: string;
  target: EaCollapseItem;
  active: ActiveValue;
}

export type BeforeCollapseCallback = (params: {
  name: string;
  target: EaCollapseItem;
}) => boolean | Promise<boolean>;

// ==================== 组件类 ====================

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCollapse extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-collapse")
  private _container!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Boolean,
    default: false,
  })
  accordion: boolean = false;

  @property({
    type: Array,
    default: [],
    observer(this: EaCollapse, newVal: ActiveValue) {

      this.setActiveNames(newVal);
    },
  })
  active: ActiveValue = [];

  @attribute({
    type: Enum(["left", "right"] as const),
    default: "right",
    observer(this: EaCollapse, newVal: "left" | "right") {
      this.querySelectorAll("ea-collapse-item").forEach(item => {
        (item as EaCollapseItem).expandIconPosition = newVal;
      });
    },
  })
  expandIconPosition: "left" | "right" = "right";

  @property({
    type: Function,
    default: null,
  })
  beforeCollapse: BeforeCollapseCallback | null = null;

  // ==================== 方法 ====================

  /**
   * 更新手风琴模式下的折叠状态
   */
  private _updateAccordionCollapse(
    activeName: string = this.active as string
  ): void {
    const els = [
      ...this.querySelectorAll("ea-collapse-item"),
    ] as EaCollapseItem[];

    els.forEach(el =>
      el.toggleAttribute("active", el.getAttribute("name") === activeName)
    );
  }

  /**
   * 更新普通模式下的折叠状态
   */
  private _updateNormalCollapse(
    activeNames: string[] = this.active as string[]
  ): void {
    const els = [
      ...this.querySelectorAll("ea-collapse-item"),
    ] as EaCollapseItem[];

    els.forEach(el =>
      el.toggleAttribute(
        "active",
        activeNames.includes(el.getAttribute("name") || "")
      )
    );
  }

  /**
   * 设置折叠项的展开状态
   */
  setActiveNames(newVal: ActiveValue): void {
    if (this.accordion) {
      this._updateAccordionCollapse(newVal as string);
    } else {
      this._updateNormalCollapse(newVal as string[]);
    }
  }

  /**
   * 初始化折叠项的唯一标识及折叠状态
   */
  private _initCollapseStatus(): void {
    const els = [
      ...this.querySelectorAll("ea-collapse-item"),
    ] as EaCollapseItem[];

    els.forEach((el, index) => {
      if (!el.getAttribute("name")) {
        el.setAttribute("name", String(index));
      }
    });
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("collapse-item-click")
  private async _handleCollapseItemClick(
    e: CustomEvent<{ name: string; target: EaCollapseItem }>
  ) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    const { name, target } = e.detail;

    // 执行 beforeCollapse 钩子
    if (typeof this.beforeCollapse === "function") {
      try {
        const isContinue = await this.beforeCollapse({ name, target });
        if (!isContinue) return;
      } catch {
        return;
      }
    }

    if (this.accordion) {
      this._updateAccordionCollapse(name);
      this.active = name;
    } else {
      try {
        const currentActive = this.active as string[];
        if (currentActive.includes(name)) {
          this.active = currentActive.filter(item => item !== name);
          target.toggleAttribute("active", false);
        } else {
          this.active = [...currentActive, name];
          target.toggleAttribute("active", true);
        }
      } catch {
        console.error(
          `${this.tagName}: When 'accordion' is false, 'active' should be an Array type.`,
          this
        );
      }
    }

    this.emit("change", {
      detail: {
        name,
        target,
        active: this.active,
      },
      bubbles: true,
    });
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this._initCollapseStatus();
  }
}
