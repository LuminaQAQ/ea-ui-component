import { EaMessageBoxElement } from "./components/ea-message-box/index";
import { EaMessageBox } from "./utils/EaMessageBoxInstance.js";

declare global {
  interface Window {
    $alert: typeof EaMessageBox.alert;
    $confirm: typeof EaMessageBox.confirm;
    $prompt: typeof EaMessageBox.prompt;
    $msgbox: typeof EaMessageBox;
  }
}

(globalThis as any).$alert = EaMessageBox.alert;
(globalThis as any).$confirm = EaMessageBox.confirm;
(globalThis as any).$prompt = EaMessageBox.prompt;
(globalThis as any).$msgbox = EaMessageBox;

export { EaMessageBox, EaMessageBoxElement };
