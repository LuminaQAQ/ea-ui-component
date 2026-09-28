import { EaMessageBoxElement } from "./component/index.js";
import { EaMessageBox } from "./utils/EaMessageBoxInstance.js";

declare global {
  interface Window {
    $alert: typeof EaMessageBox.alert;
    $confirm: typeof EaMessageBox.confirm;
    $prompt: typeof EaMessageBox.prompt;
    $msgbox: typeof EaMessageBox;
  }
}

window.$alert = EaMessageBox.alert;
window.$confirm = EaMessageBox.confirm;
window.$prompt = EaMessageBox.prompt;
window.$msgbox = EaMessageBox;

export { EaMessageBox, EaMessageBoxElement };
