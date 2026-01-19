import EaUtils from "@/utils/Utils";

/**
 * 获取 表尾 HTML
 * @param {import("../ea-table").ColumnOption[]} columns
 * @returns
 */
export const tfootRenderer = columns => {
  return EaUtils.EaElement.h(
    "tfoot",
    "ea-table__tfoot",
    {
      part: "tfoot",
    },
    EaUtils.EaElement.h(
      "tr",
      `ea-table__tr`,
      {
        part: "tfoot-tr",
      },
      columns.map(col =>
        EaUtils.EaElement.h(
          "td",
          `ea-table__td ${col.fixed ? ` is-fixed fixed-${col.fixed}` : ""}`,
          {
            part: "tfoot-td",
            "data-scope": col.prop,
          }
        )
      )
    )
  );
};
