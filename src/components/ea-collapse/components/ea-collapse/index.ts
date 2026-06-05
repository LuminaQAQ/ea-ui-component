import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import type { EaCollapseItem } from "../ea-collapse-item/index";
import { EaCollapseChangeEvent } from "./events/EaCollapseChangeEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-collapse" as const;
const bem = createBEM(TAG_NAME);

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

/**
 * @summary 折叠面板组件，通过折叠面板收纳内容区域，支持手风琴模式和普通模式。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-collapse-item
 *
 * @slot default - 默认插槽，用于放置 ea-collapse-item 子组件。
 *
 * @event ea-change - 面板切换时触发，detail: `{ name: string, target: EaCollapseItem, active: string | string[] }`。
 *
 * @csspart container - 外层容器。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCollapse extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
  })
  accordion: boolean = false;

  @property({
    type: Array,
    default: [],
    observer(this: EaCollapse, newVal: ActiveValue) {
      if (!this._isSettingActiveNames) {
        this.setActiveNames(newVal);
      }
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

  private _isSettingActiveNames: boolean = false;

  /** 更新手风琴模式下的折叠状态 */
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

  /** 更新普通模式下的折叠状态 */
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

  /** 设置折叠项的展开状态 */
  setActiveNames(newVal: ActiveValue): void {
    this._isSettingActiveNames = true;
    this.active = newVal;
    this._isSettingActiveNames = false;

    if (this.accordion) {
      this._updateAccordionCollapse(newVal as string);
    } else {
      this._updateNormalCollapse(newVal as string[]);
    }
  }

  /** 初始化折叠项的唯一标识及折叠状态 */
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

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  @listen("ea-collapse-item-click")
  private async _handleCollapseItemClick(
    e: CustomEvent<{ name: string; target: EaCollapseItem }>
  ) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    const { name, target } = e.detail;

    if (typeof this.beforeCollapse === "function") {
      try {
        const isContinue = await this.beforeCollapse({ name, target });
        if (!isContinue) return;
      } catch {
        return;
      }
    }

    if (this.accordion) {
      if (this.active === name) {
        this.setActiveNames("");
      } else {
        this.setActiveNames(name);
      }
    } else {
      try {
        const currentActive = this.active as string[];
        if (currentActive.includes(name)) {
          this.setActiveNames(currentActive.filter(item => item !== name));
        } else {
          this.setActiveNames([...currentActive, name]);
        }
      } catch {
        console.error(
          `${this.tagName}: When 'accordion' is false, 'active' should be an Array type.`,
          this
        );
      }
    }

    this.dispatchEvent(
      new EaCollapseChangeEvent({
        name,
        target,
        active: this.active,
      })
    );
  }

  /** 获取所有非禁用的折叠面板项 */
  private _getEnabledItems(): EaCollapseItem[] {
    return Array.from(this.querySelectorAll("ea-collapse-item")).filter(
      item => !item.hasAttribute("disabled")
    ) as EaCollapseItem[];
  }

  /** 处理面板间键盘导航：ArrowUp/ArrowDown/Home/End */
  @listen("keydown")
  private _handleKeydown(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    const collapseItem = target.closest?.("ea-collapse-item");
    if (!collapseItem || collapseItem.hasAttribute("disabled")) return;

    const items = this._getEnabledItems();
    if (items.length === 0) return;

    const currentIndex = items.indexOf(collapseItem as EaCollapseItem);
    if (currentIndex < 0) return;

    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case "ArrowUp":
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      items[newIndex].focus();
    }
  }

  $mount(): void {
    this._initCollapseStatus();
  }
}
