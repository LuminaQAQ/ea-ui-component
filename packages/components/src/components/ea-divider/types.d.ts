import type { EaDivider } from "./index";

interface EaDividerProps {
  variant?: string;
  "content-position"?: "start" | "end" | "center";
  direction?: "horizontal" | "vertical";
}

declare global {
  interface HTMLElementTagNameMap {
    "ea-divider": EaDivider;
  }
}

export type { EaDividerProps };
export { EaDivider };