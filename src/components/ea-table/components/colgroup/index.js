import EaUtils from "@/utils/Utils";

/**
 * 获取 colgroup HTML
 * @param {import("../ea-table").ColumnOption[]} columns
 * @returns
 */
export const colgroupRenderer = columns => {
  return EaUtils.EaElement.h(
    "colgroup",
    "ea-table__colgroup",
    {
      part: "colgroup",
    },
    columns.map(column =>
      EaUtils.EaElement.h("col", "ea-table__col", {
        width: column.width,
        part: "col",
      })
    )
  );
};
