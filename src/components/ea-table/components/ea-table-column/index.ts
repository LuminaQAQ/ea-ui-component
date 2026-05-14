import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import sanitizeHtml from "@utils/html";
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

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTableColumn extends EaBase {
  @query(bem.ce("label"))
  private _label!: HTMLElement;

  private _contentObserver: MutationObserver | null = null;

  // ==================== 属性定义 ====================

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

  // ==================== 计算属性 ====================

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
        tpl.innerHTML = sanitizeHtml(assignedNodes);
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

  // ==================== 模板 ====================

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

  // ==================== 私有方法 ====================

  private _getThisDepth(el: EaTableColumn, root: HTMLElement | null): number {
    let depth = 0;
    let current: HTMLElement | null = el;

    while (current !== root && current) {
      current = current.parentElement;
      depth++;
    }

    return depth;
  }

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

  private _notifyParent(): void {
    this.emit("ea-table-column-change", {
      bubbles: true,
      composed: true,
    });
  }

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

  // ==================== 生命周期 ====================

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
