import { EaTour } from "./components/ea-tour";
import { EaTourStep } from "./components/ea-tour-step";

export { EaTour, EaTourStep };
export default { EaTour, EaTourStep };

declare global {
  interface HTMLElementTagNameMap {
    "ea-tour": EaTour;
    "ea-tour-step": EaTourStep;
  }
}
