export interface ColumnOption {
  depth: number;
  type?: "selection" | "index";
  sortable?: boolean;
  colspan?: number;
  rowspan?: number;
  prop?: string | null;
  label?: string | null;
  width?: string | null;
  fixed?: boolean | string | null;
  align?: string;
  props?: Attr[];
  header?: string | null;
  template?: HTMLTemplateElement | ColumnOption[] | null;
}