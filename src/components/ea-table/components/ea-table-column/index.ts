import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query } from "@decorator";
import { Enum } from "@utils/Enum";
import { html } from "@utils/html";
import type { ColumnOption } from "../../types";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-table-column" as const;
const bem = createBEM(TAG_NAME);

export interface TableColumnCtx extends Omit<
  ColumnOption,
  "type" | "template"
> {
  label: string;
  prop: string;
  type: string;
  colspan: number;
  rowspan: number;
  align: string;
  width: string;
  sortable: boolean;
  fixed: string;
  depth: number;
  props: Attr[];
  header: string | null;
  template: TableColumnCtx[] | HTMLTemplateElement | null;
}

/**
 * @summary 表格列组件，用于定义表格的列配置，支持多级表头、排序和固定列。
 * @status stable
 * @since 3.0
 *
 * @slot header - 自定义表头内容。
 * @slot default - 默认插槽，用于列内容模板。
 *
 * @csspart container - 容器元素。
 * @csspart label - 标签元素。
 * @csspart content - 内容包裹元素。
 * @csspart default-slot - 默认插槽元素。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTableColumn extends EaBase {
  @query(bem.ce("label"))
  private _label!: HTMLElement;

  private _contentObserver: MutationObserver | null = null;

  @attribute({
    type: Enum(["selection", "index"]),
    default: "",
    observer(this: EaTableColumn, newVal: string) {
      if (newVal === "selection" && !customElements.get("ea-checkbox")) {
        import("@components/ea-checkbox/index.js");
      }
      this._notifyParent();
    },
  })
  type: string = "";

  @attribute({
    type: Enum(["left", "center", "right"]),
    default: "left",
    observer(this: EaTableColumn) {
      this._notifyParent();
    },
  })
  align: string = "left";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTableColumn) {
      if (this._label) this._label.textContent = `${this.label}[$${this.prop}]`;
      this._notifyParent();
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTableColumn) {
      if (this._label) this._label.textContent = `${this.label}[$${this.prop}]`;
      this._notifyParent();
    },
  })
  prop: string = "";

  @attribute({
    type: Number,
    default: undefined,
    observer(this: EaTableColumn) {
      this._notifyParent();
    },
  })
  colspan: number | undefined = undefined;

  @attribute({
    type: String,
    default: "",
    observer(this: EaTableColumn) {
      this._notifyParent();
    },
  })
  width: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTableColumn) {
      this._notifyParent();
    },
  })
  sortable: boolean = false;

  @attribute({
    type: Enum(["left", "right", "false", ""]),
    default: "false",
    observer(this: EaTableColumn) {
      this._notifyParent();
    },
  })
  fixed: string = "false";

  @property({
    type: Object,
    default: {},
    observer(this: EaTableColumn) {
      this._notifyParent();
    },
  })
  option: Record<string, unknown> = {};

  get getColumnTree(): TableColumnCtx {
    const table = this.closest("ea-table");
    const columns = [
      ...this.querySelectorAll(":scope > ea-table-column"),
    ] as EaTableColumn[];
    const headerSlot = this.shadowRoot!.querySelector(
      `slot[name="header"]`
    ) as HTMLSlotElement;
    const defaultSlot = this.shadowRoot!.querySelector(
      `#defaultSlot`
    ) as HTMLSlotElement;

    const exclude = ["prop", "label", "width", "fixed", "sortable"];
    let template: TableColumnCtx[] | HTMLTemplateElement | null = null;

    if (columns.length) {
      template = columns.map(col => col.getColumnTree);
    } else {
      const assignedNodes = Array.from(defaultSlot?.assignedElements() || [])
        .map(item => item.outerHTML?.trim())
        .join("");

      if (assignedNodes) {
        const tpl = document.createElement("template");
        tpl.innerHTML = html(assignedNodes);
        template = tpl;
      } else {
        template = null;
      }
    }

    const colspanValue =
      this.colspan ?? (this.querySelectorAll("ea-table-column").length || 1);

    return {
      label: this.label,
      prop: this.prop,
      type: this.type,

      colspan: colspanValue,
      rowspan: template
        ? 1
        : this._getMaxDepth(table as unknown as HTMLElement) -
          this._getThisDepth(this, table as unknown as HTMLElement) +
          1,
      align: this.align,
      width: this.width,
      sortable: this.sortable,
      fixed: this.fixed === "" ? "left" : this.fixed,

      depth: this._getThisDepth(this, table as unknown as HTMLElement),

      props: [...this.attributes].filter(attr => !exclude.includes(attr.name)),

      header:
        headerSlot
          ?.assignedElements()
          .map(item => item.outerHTML?.trim())
          .join("") || null,
      template,
    };
  }

  html(): string {
    return `
      <div class='ea-table-column' part='container'>
        <header class='ea-table-column__label' part='label'>${this.label}[$${this.prop}]</header>
        <span class='ea-table-column__content' part='content'>
          <slot name="header"></slot>
          <slot id="defaultSlot" part="default-slot"></slot>
        </span>
      </div>
    `;
  }

  /** 获取元素相对于根节点的深度 */
  private _getThisDepth(el: EaTableColumn, root: HTMLElement | null): number {
    let depth = 0;
    let current: HTMLElement | null = el;

    while (current !== root && current) {
      current = current.parentElement;
      depth++;
    }

    return depth;
  }

  /** 获取表格列的最大深度 */
  private _getMaxDepth(root: HTMLElement | null): number {
    let depth = 0;

    root?.querySelectorAll("ea-table-column").forEach(el => {
      depth = Math.max(
        depth,
        this._getThisDepth(el as unknown as EaTableColumn, root)
      );
    });

    return depth;
  }

  /** 通知父组件列配置变更 */
  private _notifyParent(): void {
    this.emit("ea-table-column-change", {
      bubbles: true,
      composed: true,
    });
  }

  /** 设置内容变更观察器 */
  private _setupContentObserver(): void {
    this._contentObserver = new MutationObserver(() => {
      this._notifyParent();
    });

    this._contentObserver.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  $mount(): void {
    this.shadowRoot!.innerHTML = this.html();
  }

  $mounted(): void {
    this._setupContentObserver();
  }

  $beforeUnmount(): void {
    if (this._contentObserver) {
      this._contentObserver.disconnect();
      this._contentObserver = null;
    }
  }
}
