import EaUtils from "@/utils/Utils";

/**
 * 排序图标渲染器
 * @param {string} text
 * @return {string}
 */
const sortIconRenderer = text => {
  return [
    EaUtils.EaElement.h("span", null, {}, text),
    EaUtils.EaElement.h(
      "span",
      "ea-table__sort",
      {},
      [
        EaUtils.EaElement.h("ea-icon", "ea-table__sort-icon", {
          part: "asc-icon",
          icon: "icon-angle-up",
        }),
        EaUtils.EaElement.h("ea-icon", "ea-table__sort-icon", {
          part: "desc-icon",
          icon: "icon-angle-down",
        }),
      ].join("")
    ),
  ].join("");
};

/**
 * 当前列是选择列时，返回渲染 ea-checkbox 结果
 * @returns {string}
 */
const selectionRenderer = () =>
  EaUtils.EaElement.h(
    "ea-checkbox",
    "ea-table__checkbox",
    {
      "data-type": "selection",
      part: "checkbox",
    },
    null
  );

const indexRenderer = () => "";

/**
 * 主要逻辑为 thead 行结构 下的 th 列结构
 * @param {import("../ea-table").ColumnOption} col
 * @returns {string}
 */
const renderThCell = col => {
  /**
   * 获取应渲染的 type 对应的 元素或内容
   * @param {'selection'} type
   * @returns {String | null}
   */
  const getColumnType = type => {
    if (type === "selection") {
      return selectionRenderer();
    } else if (type === "index") {
      return indexRenderer();
    }

    return null;
  };

  /**
   * 获取应渲染的 sortable 对应的 元素或内容
   * @param {Boolean} sortable
   * @param {String} text
   * @returns {String | null}
   */
  const getColumnSortable = (sortable, text) => {
    if (sortable) {
      return sortIconRenderer(text);
    }

    return null;
  };

  let content = null;

  const defaultContent = col.label || col.prop || "";
  const typeTemplate = getColumnType(col.type);
  const sortableTemplate = getColumnSortable(col.sortable, defaultContent);

  if (typeTemplate) {
    content = typeTemplate;
  } else if (sortableTemplate) {
    content = sortableTemplate;
  } else {
    content = defaultContent;
  }

  return EaUtils.EaElement.h(
    "th",
    `ea-table__th ${
      col.fixed ? `is-fixed fixed-${col.fixed}` : ""
    } ${col.sortable ? "is-sortable" : ""}`,
    {
      part: "thead-th",
      colspan: col.colspan,
      rowspan: col.rowspan,
      style: [col.width ? `--ea-table-cell-width: ${col.width}` : ""],
      "data-prop": col.prop || "",
    },
    content
  );
};

/**
 * 主要逻辑为 thead 行结构
 * @param {import("../ea-table").ColumnOption[][]} struct
 * @returns {string}
 */
const renderTheadRows = struct =>
  struct.map(row =>
    EaUtils.EaElement.h(
      "tr",
      "ea-table__tr is-thead",
      {
        part: "thead-tr",
      },
      row.map(renderThCell)
    )
  );

/**
 * 获取 表头 HTML
 * @param {import("../ea-table").ColumnOption[]} columns
 * @param {number} depth
 * @returns
 */
export const theadRenderer = columns => {
  /**
   * 将列结构转换成表头结构，按照视觉逻辑排数组列结构
   * @type {import("../ea-table").ColumnOption[][]}
   */
  const theadStruct = columns.reduce((acc, col) => {
    if (!acc[col.depth]) acc[col.depth] = [];

    acc[col.depth].push(col);

    return acc;
  }, []);

  return EaUtils.EaElement.h(
    "thead",
    "ea-table__thead",
    {
      part: "thead",
    },
    renderTheadRows(theadStruct)
  );
};
