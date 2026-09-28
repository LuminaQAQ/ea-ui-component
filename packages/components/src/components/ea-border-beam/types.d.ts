import type { EaBorderBeam } from "./index";

interface EaBorderBeamProps {
  count?: number;
  trigger?: "" | "hover";
  size?: number;
  "line-width"?: number;
  duration?: number;
  "start-delay"?: number;
}

declare global {
  interface HTMLElementTagNameMap {
    "ea-border-beam": EaBorderBeam;
  }
}

export type { EaBorderBeamProps };
export { EaBorderBeam };