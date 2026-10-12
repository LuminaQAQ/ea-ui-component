import { EaButton } from "./components/ea-button";
import { EaButtonGroup } from "./components/ea-button-group";

export { EaButton, EaButtonGroup };
export default { EaButton, EaButtonGroup };

declare global {
  interface HTMLElementTagNameMap {
    "ea-button": EaButton;
    "ea-button-group": EaButtonGroup;
  }
}
