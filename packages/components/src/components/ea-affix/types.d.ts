import type { EaAffix } from "./index";

interface EaAffixProps {
  offset?: number;
  target?: string;
  position?: "top" | "bottom";
}

declare global {
  interface HTMLElementTagNameMap {
    "ea-affix": EaAffix;
  }
}

export type { EaAffixProps };
export { EaAffix };
