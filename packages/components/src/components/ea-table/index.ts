import { EaTable } from "./components/ea-table";
import { EaTableColumn } from "./components/ea-table-column";

export { EaTable, EaTableColumn };
export default { EaTable, EaTableColumn };

declare global {
  interface HTMLElementTagNameMap {
    "ea-table": EaTable;
    "ea-table-column": EaTableColumn;
  }
}
