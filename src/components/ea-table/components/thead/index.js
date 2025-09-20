import { h } from "../../utils/h";

/**
 * 递归获取所有子元素
 * @param {HTMLElement} el
 * @param {number} depth
 * @returns {Map}
 */
const tree = (el, depth = 0) => {
  if (!el) return;

  const columns = el.querySelectorAll("& > ea-table-column");
  const map = new Map();
  depth++;

  columns.forEach((column) => {
    const columnTree = tree(column, depth);
    map.set(column.getAttribute("prop") || column.getAttribute("label"), {
      depth,
      prop: column.getAttribute("prop"),
      label: column.getAttribute("label"),
      width: column.getAttribute("width"),
      fixed:
        column.getAttribute("fixed") ||
        typeof column.getAttribute("fixed") === "string"
          ? column.getAttribute("fixed") || "left"
          : null,
      props: [...column.attributes].filter(
        (attr) => !exclude.includes(attr.name)
      ),
      template: columnTree.size
        ? Object.fromEntries(columnTree.entries())
        : column?.template,
    });
  });

  return map;
};

/**
 * 获取 通过h函数创建的column的树结构
 * @param {Object} columns
 * @returns {String}
 */
const treeRenderer = (columns) => {
  let template = "";

  /**
   * 获取column的树结构
   * @param {Array} column
   */
  const flat = (column) => {
    if (!column) return column;

    let ary = [];
    Object.values(column).forEach((col) => {
      ary.push(col);
      if (col?.template) ary = [...ary, ...flat(col.template)];
    });

    return ary;
  };

  const flattenColumns = flat(columns).sort((a, b) => a.depth - b.depth);
  const depth = flattenColumns.reduce((acc, cur) => {
    return Math.max(acc, cur.depth);
  }, 0);

  for (let i = flattenColumns[0].depth; i <= depth; i++) {
    const currentDepthColumns = flattenColumns.filter(
      (column) => column.depth === i
    );

    template += h(
      "tr",
      "ea-table__tr is-thead",
      {
        part: "thead-tr",
      },
      currentDepthColumns.map((column) =>
        h(
          "th",
          `ea-table__th ${
            column.fixed ? `is-fixed fixed-${column.fixed}` : ""
          } `,
          {
            part: "thead-th",
            style: [
              column.width ? `--ea-table-cell-width: ${column.width}` : "",
            ],
          },
          column.label || column.prop || ""
        )
      )
    );
  }

  return template;
};

/**
 *
 * @param {HTMLElement} rootEl
 * @returns
 */
export const theadRenderer = (rootEl) => {
  const columnTree = Object.fromEntries(tree(this).entries());

  return h(
    "thead",
    "ea-table__thead",
    {
      part: "thead",
    },
    treeRenderer(columnTree)
  );
};
