import { h } from "../../utils/h";
import type { ColumnOption } from "../../types";

export const tfootRenderer = (columns: ColumnOption[]): string => {
  return h(
    "tfoot",
    "ea-table__tfoot",
    {
      part: "tfoot",
    },
    h(
      "tr",
      `ea-table__tr`,
      {
        part: "tfoot-tr",
      },
      columns.map(col =>
        h(
          "td",
          `ea-table__td ${col.fixed && col.fixed !== "false" ? ` is-fixed fixed-${col.fixed}` : ""}`,
          {
            part: "tfoot-td",
            "data-scope": col.prop,
          },
          null
        )
      )
    )
  );
};
