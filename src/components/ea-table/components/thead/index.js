import { h } from "../../utils/h";

/**
 * 获取 通过h函数创建的column的树结构
 * @param {Object} columns
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
          } `,
          {
            part: "thead-th",
            colspan: column.colspan,
            rowspan: column.rowspan,
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
