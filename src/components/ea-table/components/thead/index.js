import { h } from "../../utils/h";

const sortIconRenderer = (text) => [
  h("span", null, {}, text),
  h("span", "ea-table__sort", {}, [
    h("ea-icon", "ea-table__sort-icon", {
      part: "asc-icon",
      icon: "icon-angle-up",
    }),
    h("ea-icon", "ea-table__sort-icon", {
      part: "desc-icon",
      icon: "icon-angle-down",
    }),
  ]),
];

/**
 * 获取 通过h函数创建的column的树结构
 * @param {import("../ea-table").ColumnOption[]} columns
 * @param {number} depth
 * @returns {String}
 */
const treeRenderer = (columns, depth) => {
  let template = "";

  for (let i = columns[0]?.depth; i <= depth; i++) {
    const currentDepthColumns = columns.filter((column) => column.depth === i);

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
          } ${column.sortable ? "is-sortable" : ""}`,
          {
            part: "thead-th",
            colspan: column.colspan,
            rowspan: column.rowspan,
            style: [
              column.width ? `--ea-table-cell-width: ${column.width}` : "",
            ],
            "data-prop": column.prop || "",
          },
          column.sortable
            ? sortIconRenderer(column.label || column.prop || "")
            : column.label || column.prop || ""
        )
      )
    );
  }

  return template;
};

/**
 *
 * @param {Array} columns
 * @param {number} depth
 * @returns
 */
export const theadRenderer = (columns, depth) => {
  return h(
    "thead",
    "ea-table__thead",
    {
      part: "thead",
    },
    treeRenderer(columns, depth)
  );
};
