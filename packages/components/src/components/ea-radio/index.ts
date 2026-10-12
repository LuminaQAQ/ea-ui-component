import { EaRadio } from "./components/ea-radio/index.js";
import { EaRadioGroup } from "./components/ea-radio-group/index.js";

export { EaRadio, EaRadioGroup };

declare global {
  interface HTMLElementTagNameMap {
    "ea-radio": EaRadio;
    "ea-radio-group": EaRadioGroup;
  }
}
