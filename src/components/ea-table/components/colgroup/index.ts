import { h } from "../../utils/h";
import type { ColumnOption } from "../../types";

export const colgroupRenderer = (columns: ColumnOption[]): string => {
  return h(
    "colgroup",
    "ea-table__colgroup",
    {
      part: "colgroup",
    },
    columns.map(column =>
      h(
        "col",
        "ea-table__col",
        {
          width: column.width,
          part: "col",
        },
        null
      )
    )
  );
};
