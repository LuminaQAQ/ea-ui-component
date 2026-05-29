import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { html } from "@utils/html";
import { h } from "@utils/h";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-descriptions" as const;
const bem = createBEM(TAG_NAME);

const DIRECTION_TYPES = ["horizontal", "vertical"] as const;
type DirectionType = (typeof DIRECTION_TYPES)[number];

const SIZE_TYPES = ["large", "default", "small"] as const;
type SizeType = (typeof SIZE_TYPES)[number];

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

/**
 * @summary 描述列表组件，以表格形式展示多个字段信息，支持边框、垂直布局和多种尺寸。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-descriptions-item
 *
 * @slot header - 标题插槽。
 * @slot extra - 右侧额外操作区插槽。
 * @slot default - 默认插槽，用于放置 ea-descriptions-item。
 *
 * @csspart container - 外层表格容器。
 * @csspart caption - 标题与额外操作区容器。
 * @csspart title - 标题区域。
 * @csspart extra - 右侧额外插槽区域。
 * @csspart body - 表格 body（tbody）。
 * @csspart row - 行（tr）。
 * @csspart col-cell - 单元格（td）。
 * @csspart label - 标签单元格。
 * @csspart content - 内容单元格。
 *
 * @cssproperty --ea-descriptions-label-width - 标签宽度。
 * @cssproperty --ea-descriptions-item-width - 单元格宽度。
 * @cssproperty --ea-descriptions-align - 内容对齐方式。
 * @cssproperty --ea-descriptions-label-align - 标签对齐方式。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDescriptions extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(`${bem.ce("title")} slot[name='header']`)
  private _captionSlot!: HTMLElement;

  @query(bem.ce("body"))
  private _tbody!: HTMLElement;

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
      this._render();
    },
  })
  border: boolean = false;

  @attribute({
    type: Enum(DIRECTION_TYPES),
    default: "horizontal",
    observer(this: EaDescriptions) {
      this.updateContainerClasslist();
      this._render();
    },
  })
  direction: DirectionType = "horizontal";

  @attribute({
    type: Enum(SIZE_TYPES),
    default: "default",
    observer(this: EaDescriptions) {
      this.updateContainerClasslist();
    },
  })
  size: SizeType = "default";

  @attribute({
    type: String,
    default: "",
    observer(this: EaDescriptions, newVal: string) {
      this.style.setProperty("--ea-descriptions-label-width", newVal);
    },
  })
  labelWidth: string = "";

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.size]: true },
      { border: this.border, vertical: this.direction === "vertical" }
    );

    if (this._container) this._container.className = className;

    return className;
  }

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
   * @param children - 子元素列表
   * @param column - 每行列数
   * @returns 行列描述二维数组
   */
  private _handleChildrenDivide(
    children: EaDescriptionsItemElement[],
    column: number
  ): DescriptionsItemOption[][] {
    const rows: DescriptionsItemOption[][] = [];

    children.forEach(item => {
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

      let targetRow = rows.findIndex(r => {
        const used = r.reduce((acc, cur) => acc + (cur?.colspan || 0), 0);
        return used + option.colspan <= column;
      });

      if (targetRow === -1) {
        rows.push([]);
        targetRow = rows.length - 1;
      }

      rows[targetRow].push(option);

      for (let i = 1; i < option.rowspan; i++) {
        const ri = targetRow + i;
        if (!rows[ri]) rows[ri] = [];
        for (let j = 0; j < option.colspan; j++) {
          rows[ri].splice(rows[targetRow].indexOf(option) + j, 0, {
            colspan: 1,
            rowspan: 1,
            placeholder: true,
          } as DescriptionsItemOption);
        }
      }
    });

    return rows
      .map(row => row.filter(col => !col.placeholder))
      .filter(row => row.length > 0);
  }

  /**
   * 获取 Descriptions 组件的样式类型
   * @returns 样式类型
   */
  private _getVariant(): VariantType {
    if (this.direction === "vertical") return "vertical";
    if (this.border) return "border";
    return "normal";
  }

  /**
   * 计算单元格样式
   * @param item - 描述项配置
   * @param isLabel - 是否为标签单元格
   * @returns CSS 样式字符串
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
   * @param item - 描述项配置
   * @param index - 当前项在行中的索引
   * @param row - 当前行
   * @returns colspan 值或 undefined
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
   * @param item - 描述项配置
   * @param tag - HTML 标签名
   * @param extraClass - 额外类名
   * @returns HTML 字符串
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
   * @param item - 描述项配置
   * @param tag - HTML 标签名
   * @param extraClass - 额外类名
   * @returns HTML 字符串
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
   * @param cells - 单元格 HTML 数组
   * @param extraPart - 额外 part 名称
   * @returns HTML 字符串
   */
  private _renderTableRow(cells: string[], extraPart?: string): string {
    return h(
      "tr",
      bem.e("row"),
      { part: extraPart ? `row ${extraPart}` : "row" },
      cells
    );
  }

  /** 普通模式渲染器 */
  private _renderNormalRow(row: DescriptionsItemOption[]): string {
    const cells = row.map((item, index) => {
      const colspan = this._getNormalColspan(item, index, row);

      const props: Record<string, any> = {
        part: "col-cell",
        style: item.width ? `--ea-descriptions-item-width: ${item.width}` : "",
      };

      if (item.rowspan > 1) props.rowspan = item.rowspan;
      if (colspan) props.colspan = colspan;

      return h("td", bem.e("cell"), props, [
        this._renderLabelElement(item),
        this._renderContentElement(item),
      ]);
    });

    return this._renderTableRow(cells);
  }

  /** 边框模式渲染器 */
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

  /** 垂直模式渲染器 */
  private _renderVerticalRow(row: DescriptionsItemOption[]): string {
    const needsExtraColspan = (index: number) =>
      row.length < 3 && index === row.length - 1;

    const labelCells = row.map((item, index) =>
      h(
        "th",
        `${bem.e("label")} ${bem.e("header")}`,
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

    const contentCells = row.map((item, index) =>
      h(
        "td",
        `${bem.e("content")} ${bem.e("cell")}`,
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

  private _variantRenderer: Record<
    VariantType,
    (row: DescriptionsItemOption[]) => string
  > = {
    normal: row => this._renderNormalRow(row),
    border: row => this._renderBorderRow(row),
    vertical: row => this._renderVerticalRow(row),
  };

  /** 渲染默认插槽内容 */
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

  @listen("slotchange", "#defaultSlot")
  private _handleSlotChange(): void {
    this._render();
  }

  @listen("ea-descriptions-item-change")
  private _handleChildChange(e: Event): void {
    e.stopImmediatePropagation();
    this._render();
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._render();
  }
}

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
