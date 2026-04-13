import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { html } from "@utils/html";
import { h } from "@utils/h";
import stylesheet from "./index.scss?inline";
import { listen } from "@/decorator";

const TAG_NAME = "ea-descriptions" as const;
const bem = createBEM(TAG_NAME);

// ==================== 类型定义 ====================

interface DescriptionsItemOption {
  label: string;
  content: string;
  colspan: number;
  rowspan: number;
  align: string;
  "label-align": string;
  width: string;
  "label-width": string;
  "label-part": string;
  "content-part": string;
  placeholder?: boolean;
}

type VariantType = "normal" | "border" | "vertical";

// ==================== 组件类 ====================

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDescriptions extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-descriptions")
  private _container!: HTMLElement;

  @query(".ea-descriptions__title slot[name='header']")
  private _captionSlot!: HTMLElement;

  @query(".ea-descriptions__body")
  private _tbody!: HTMLElement;

  @query("#defaultSlot")
  private _defaultSlot!: HTMLSlotElement;

  private _abortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: Number,
    default: 3,
    observer(this: EaDescriptions) {
      this._render();
    },
  })
  column: number = 3;

  @attribute({
    type: String,
    default: "",
    observer(this: EaDescriptions, newVal: string) {
      if (this._captionSlot) this._captionSlot.textContent = newVal;
    },
  })
  caption: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDescriptions) {
      this.updateContainerClasslist();
    },
  })
  border: boolean = false;

  @attribute({
    type: ["horizontal", "vertical"] as const,
    default: "horizontal",
    observer(this: EaDescriptions) {
      this._render();
    },
  })
  direction: "horizontal" | "vertical" = "horizontal";

  @attribute({
    type: ["large", "default", "small"] as const,
    default: "default",
    observer(this: EaDescriptions) {
      this.updateContainerClasslist();
    },
  })
  size: "large" | "default" | "small" = "default";

  @attribute({
    type: String,
    default: "",
    observer(this: EaDescriptions, newVal: string) {
      this.style.setProperty("--ea-descriptions-label-width", newVal);
    },
  })
  labelWidth: string = "";

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.size]: true,
      },
      {
        border: this.border,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <slot id='defaultSlot' part='default-slot'></slot>
      <table class='${bem()}' part='container'>
        <caption class='${bem.e("caption")}' part='caption'>
          <section class='${bem.e("title")}' part='title'>
            <slot name='header'></slot>
          </section>
          <section class='${bem.e("extra")}' part='extra'>
            <slot name='extra'></slot>
          </section>
        </caption>
        <tbody class='${bem.e("body")}' part='body'>
        </tbody>
      </table>
    `;
  }

  /**
   * 处理子元素分割，将 HTML 描述转换为行列描述
   */
  private _handleChildrenDivide(
    children: EaDescriptionsItemElement[],
    column: number
  ): DescriptionsItemOption[][] {
    const ary: DescriptionsItemOption[][] = [];

    children.forEach(item => {
      const currentRow = ary.length;
      const currentCol = column % (ary[currentRow]?.length || 0) || 0;
      const option: DescriptionsItemOption = {
        label: item.label,
        content: item.innerHTML,
        colspan: item.colspan,
        rowspan: item.rowspan,
        align: item.align,
        "label-align": item.labelAlign,
        width: item.width,
        "label-width": item.labelWidth || this.labelWidth,
        "label-part": item.labelPart,
        "content-part": item.contentPart,
      };

      for (let i = currentRow; i < currentRow + option.rowspan; i++) {
        if (!ary[i]) ary[i] = [];

        if (option.rowspan > 1 && i !== currentRow) {
          ary[i][currentCol] = {
            colspan: 1,
            rowspan: 1,
            placeholder: true,
          } as DescriptionsItemOption;
        }

        for (let j = currentCol; j < currentCol + option.colspan; j++) {
          if (option.colspan > 1 && j !== currentCol) {
            ary[i][j] = {
              colspan: 1,
              rowspan: 1,
              placeholder: true,
            } as DescriptionsItemOption;
          }
        }
      }

      let row = ary.findIndex(item => item.length < column);
      row = row === -1 ? currentRow : row;

      if (!ary[row]) ary[row] = [];
      const col = ary[row].reduce((acc, cur) => {
        return acc + (cur?.colspan || 0);
      }, 0);

      if (col + option.colspan <= column) {
        ary[row].push(option);
      } else {
        ary[row][currentCol] = option;
      }
    });

    return ary
      .map(row => row.filter(col => !col.placeholder))
      .filter(row => row.length > 0);
  }

  /**
   * 获取 Descriptions 组件的样式类型
   */
  private _getVariant(): VariantType {
    if (this.direction === "vertical") {
      return "vertical";
    } else if (this.border) {
      return "border";
    } else {
      return "normal";
    }
  }

  // ==================== 渲染方法 ====================

  /**
   * 计算单元格样式
   */
  private _getCellStyle(
    item: DescriptionsItemOption,
    isLabel: boolean
  ): string {
    const styles: string[] = [];

    if (item.align) {
      styles.push(`--ea-descriptions-align: ${item.align};`);
    }

    if (isLabel && (item["label-align"] || item.align)) {
      styles.push(
        `--ea-descriptions-label-align: ${item["label-align"] || item.align};`
      );
    }

    if (item.width) {
      styles.push(`--ea-descriptions-item-width: ${item.width}`);
    }

    if (isLabel && item["label-width"]) {
      styles.push(`--ea-descriptions-label-width: ${item["label-width"]};`);
    }

    return styles.join(" ");
  }

  /**
   * 计算普通模式的 colspan
   */
  private _getNormalColspan(
    item: DescriptionsItemOption,
    index: number,
    row: DescriptionsItemOption[]
  ): number | undefined {
    const totalColspan = row.reduce((acc, cur) => acc + cur.colspan, 0);
    const isLastItem = index === row.length - 1;
    const needsExtraColspan =
      isLastItem && row.length < this.column && totalColspan < this.column;

    if (item.colspan > 1 || needsExtraColspan) {
      return needsExtraColspan
        ? this.column - totalColspan + (index < 1 ? 1 : index)
        : item.colspan;
    }
    return undefined;
  }

  /**
   * 渲染标签元素
   */
  private _renderLabelElement(
    item: DescriptionsItemOption,
    tag: string = "span",
    extraClass?: string
  ): string {
    const className = extraClass
      ? `${bem.e("label")} ${extraClass}`
      : bem.e("label");

    return h(
      tag,
      className,
      {
        part: `label cell ${item["label-part"] || ""}`,
        tabindex: 1,
        style: this._getCellStyle(item, true),
      },
      item.label
    );
  }

  /**
   * 渲染内容元素
   */
  private _renderContentElement(
    item: DescriptionsItemOption,
    tag: string = "span",
    extraClass?: string
  ): string {
    const className = extraClass
      ? `${bem.e("content")} ${extraClass}`
      : bem.e("content");

    return h(
      tag,
      className,
      {
        part: `content cell ${item["content-part"] || ""}`,
        tabindex: 1,
        style: this._getCellStyle(item, false),
      },
      html(item.content)
    );
  }

  /**
   * 渲染表格行
   */
  private _renderTableRow(cells: string[], extraPart?: string): string {
    return h(
      "tr",
      bem.e("tr"),
      { part: extraPart ? `row ${extraPart}` : "row" },
      cells
    );
  }

  // ==================== 渲染器 ====================

  /**
   * 普通模式渲染器
   */
  private _renderNormalRow(row: DescriptionsItemOption[]): string {
    const cells = row.map((item, index) => {
      const colspan = this._getNormalColspan(item, index, row);

      const props: Record<string, any> = {
        part: "col-cell",
        style: item.width ? `--ea-descriptions-item-width: ${item.width}` : "",
      };

      if (item.rowspan > 1) props.rowspan = item.rowspan;
      if (colspan) props.colspan = colspan;

      return h("td", bem.e("td"), props, [
        this._renderLabelElement(item),
        this._renderContentElement(item),
      ]);
    });

    return this._renderTableRow(cells);
  }

  /**
   * 边框模式渲染器
   */
  private _renderBorderRow(row: DescriptionsItemOption[]): string {
    const cells = row.flatMap((item, index) => {
      const isLastItem = index === row.length - 1;
      const needsExtraColspan = row.length < 3 && isLastItem;

      const labelCell = h(
        "td",
        bem.e("label"),
        {
          part: `label cell ${item["label-part"] || ""}`,
          tabindex: 1,
          colspan: 1,
          rowspan: item.rowspan,
          style: this._getCellStyle(item, true),
        },
        item.label
      );

      const contentCell = h(
        "td",
        bem.e("content"),
        {
          part: `content cell ${item["content-part"] || ""}`,
          tabindex: 1,
          rowspan: item.rowspan,
          colspan: needsExtraColspan ? 6 - (index + 1) : item.colspan || 1,
          style: this._getCellStyle(item, false),
        },
        html(item.content)
      );

      return [labelCell, contentCell];
    });

    return this._renderTableRow(cells);
  }

  /**
   * 垂直模式渲染器
   */
  private _renderVerticalRow(row: DescriptionsItemOption[]): string {
    const isLastItem = (index: number) => index === row.length - 1;
    const needsExtraColspan = (index: number) =>
      row.length < 3 && isLastItem(index);

    // 渲染标签行
    const labelCells = row.map((item, index) =>
      h(
        "th",
        `${bem.e("label")} ${bem.e("th")}`,
        {
          part: `label cell ${item["label-part"] || ""}`,
          tabindex: 1,
          rowspan: 1,
          colspan: needsExtraColspan(index)
            ? 6 - (index + 1)
            : item.colspan || 1,
          style: this._getCellStyle(item, true),
        },
        item.label
      )
    );

    // 渲染内容行
    const contentCells = row.map((item, index) =>
      h(
        "td",
        `${bem.e("content")} ${bem.e("td")}`,
        {
          part: `content cell ${item["content-part"] || ""}`,
          tabindex: 1,
          rowspan: item.rowspan * 2 - 1,
          colspan: needsExtraColspan(index)
            ? 6 - (index + 1)
            : item.colspan || 1,
          style: this._getCellStyle(item, false),
        },
        html(item.content)
      )
    );

    return (
      this._renderTableRow(labelCells, "row-label") +
      this._renderTableRow(contentCells, "row-content")
    );
  }

  /**
   * Descriptions 组件的样式类型渲染器
   */
  private _variantRenderer: Record<
    VariantType,
    (row: DescriptionsItemOption[]) => string
  > = {
    normal: row => this._renderNormalRow(row),
    border: row => this._renderBorderRow(row),
    vertical: row => this._renderVerticalRow(row),
  };

  /**
   * 渲染默认插槽内容
   */
  private _render(): void {
    const children = [
      ...this.querySelectorAll<EaDescriptionsItemElement>(
        "ea-descriptions-item"
      ),
    ];

    this._tbody.innerHTML = this._handleChildrenDivide(children, this.column)
      .map(this._variantRenderer[this._getVariant()].bind(this))
      .join("");
  }

  // ==================== 事件处理 ====================

  @listen("slotchange", "#defaultSlot")
  _handleSlotChange(): void {
    this._render();
  }

  @listen("ea-descriptions-item-change")
  _handleChildChange(e: Event): void {
    e.stopImmediatePropagation();
    this._render();
  }

  // ==================== 生命周期 ====================

  $beforeUnmount(): void {
    this._abortController?.abort();
  }
}

// ==================== 类型声明 ====================

export interface EaDescriptionsItemElement extends HTMLElement {
  label: string;
  colspan: number;
  rowspan: number;
  align: string;
  labelAlign: string;
  width: string;
  labelWidth: string;
  labelPart: string;
  contentPart: string;
  innerHTML: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "ea-descriptions": EaDescriptions;
    "ea-descriptions-item": EaDescriptionsItemElement;
  }
}
