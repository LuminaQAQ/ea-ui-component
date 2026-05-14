import { h } from "../../utils/h";
import type { ColumnOption } from "../../types";

const sortIconRenderer = (text: string): string => {
  return h("span", "ea-table__sort-wrapper", {}, [
    h("span", null, {}, text),
    h(
      "span",
      "ea-table__sort",
      {},
      [
        h("ea-icon", "ea-table__sort-icon", {
          part: "asc-icon",
          name: "angle-up",
          size: "small",
        }, null),
        h("ea-icon", "ea-table__sort-icon", {
          part: "desc-icon",
          name: "angle-down",
          size: "small",
        }, null),
      ]
    ),
  ]);
};

const selectionRenderer = (): string =>
  h(
    "ea-checkbox",
    "ea-table__checkbox",
    {
      "data-type": "selection",
      part: "checkbox",
    },
    null
  );

const indexRenderer = (): string => "";

const renderThCell = (col: ColumnOption): string => {
  const getColumnType = (type?: string): string | null => {
    if (type === "selection") {
      return selectionRenderer();
    } else if (type === "index") {
      return indexRenderer();
    }

    return null;
  };

  const getColumnSortable = (sortable: boolean | undefined, text: string): string | null => {
    if (sortable) {
      return sortIconRenderer(text);
    }

    return null;
  };

  let content: string | null = null;

  const defaultContent = col.label || col.prop || "";
  const typeTemplate = getColumnType(col.type);
  const sortableTemplate = getColumnSortable(col.sortable, defaultContent);

  if (typeTemplate) {
    content = typeTemplate;
  } else if (sortableTemplate) {
    content = sortableTemplate;
  } else if (col.header) {
    content = col.header;
  } else {
    content = defaultContent;
  }

  return h(
    "th",
    `ea-table__th${
      col.fixed && col.fixed !== "false" ? ` is-fixed fixed-${col.fixed}` : ""
    }${col.sortable ? " is-sortable" : ""}${col.width ? " is-width" : ""}`.trim(),
    {
      part: "thead-th",
      colspan: col.colspan,
      rowspan: col.rowspan,
      style: [col.width ? `--ea-table-cell-width: ${col.width}` : ""],
      "data-scope": col.prop || "",
      "data-prop": col.prop || "",
      "data-order": "asc",
    },
    content
  );
};

const renderTheadRows = (struct: ColumnOption[][]): string[] =>
  struct.map(row =>
    h(
      "tr",
      "ea-table__tr is-thead",
      {
        part: "thead-tr",
      },
      row.map(renderThCell)
    )
  );

export const theadRenderer = (columns: ColumnOption[]): string => {
  const theadStruct: ColumnOption[][] = columns.reduce<ColumnOption[][]>((acc, col) => {
    if (!acc[col.depth]) acc[col.depth] = [];

    acc[col.depth].push(col);

    return acc;
  }, []);

  return h(
    "thead",
    "ea-table__thead",
    {
      part: "thead",
    },
    renderTheadRows(theadStruct)
  );
};