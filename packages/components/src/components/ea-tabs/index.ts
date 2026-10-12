import { EaTab } from "./components/ea-tab/index";
import { EaTabs } from "./components/ea-tabs/index";
import { EaTabPanel } from "./components/ea-tab-panel/index";

export { EaTab, EaTabs, EaTabPanel };
export default { EaTab, EaTabs, EaTabPanel };

declare global {
  interface HTMLElementTagNameMap {
    "ea-tabs": EaTabs;
    "ea-tab": EaTab;
    "ea-tab-panel": EaTabPanel;
  }
}
