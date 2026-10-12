import { EaStep } from "./components/ea-step";
import { EaSteps } from "./components/ea-steps";

export { EaStep, EaSteps };
export default { EaStep, EaSteps };

declare global {
  interface HTMLElementTagNameMap {
    "ea-steps": EaSteps;
    "ea-step": EaStep;
  }
}
