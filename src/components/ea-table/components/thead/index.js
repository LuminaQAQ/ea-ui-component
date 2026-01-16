import EaUtils from "@/utils/Utils";

const sortIconRenderer = text => [
  EaUtils.EaElement.h("span", null, {}, text),
  EaUtils.EaElement.h("span", "ea-table__sort", {}, [
    EaUtils.EaElement.h("ea-icon", "ea-table__sort-icon", {
      part: "asc-icon",
      icon: "icon-angle-up",
    }),
    EaUtils.EaElement.h("ea-icon", "ea-table__sort-icon", {
      part: "desc-icon",
      icon: "icon-angle-down",
    }),
  ]),
];

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

/**
 * 获取 通过h函数创建的column的树结构
 * @param {import("../ea-table").ColumnOption[]} columns
 * @param {number} depth
 * @returns {String}
 */
const treeRenderer = (columns, depth) => {
  let template = "";

  for (let i = columns[0]?.depth; i <= depth; i++) {
    const currentDepthColumns = columns.filter(column => column.depth === i);

    /**
     * 获取column的默认内容
     * @param {import("../ea-table").ColumnOption} column
     */
    const getDefaultContent = column => column.label || column.prop || "";

    /**
     * 获取应渲染的 type 对应的 元素或内容
     * @param {'selection'} type
     * @returns {String | null}
     */
    const getColumnType = type => {
      if (type === "selection") {
        return selectionRenderer();
      }

      return null;
    };

    /**
     * 获取应渲染的 sortable 对应的 元素或内容
     * @param {import("../ea-table").ColumnOption} column
     * @returns {String | null}
     */
    const getColumnSortable = column => {
      if (column.sortable) {
        return sortIconRenderer(getDefaultContent(column));
      }

      return null;
    };

    template += EaUtils.EaElement.h(
      "tr",
      "ea-table__tr is-thead",
      {
        part: "thead-tr",
      },
      currentDepthColumns.map(column => {
        let content = null;

        const typeTemplate = getColumnType(column.type);
        const sortableTemplate = getColumnSortable(column);
        const defaultTemplate = getDefaultContent(column);

        if (typeTemplate) {
          content = typeTemplate;
        } else if (sortableTemplate) {
          content = sortableTemplate;
        } else {
          content = defaultTemplate;
        }

        return EaUtils.EaElement.h(
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
          content
        );
      })
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
  return EaUtils.EaElement.h(
    "thead",
    "ea-table__thead",
    {
      part: "thead",
    },
    treeRenderer(columns, depth)
  );
};
