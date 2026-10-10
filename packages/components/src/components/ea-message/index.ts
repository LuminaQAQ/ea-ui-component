import { EaMessageElement } from "./components/ea-message";
import { EaMessage } from "./utils/EaMessageInstance";

(window as any).$message = EaMessage;

export { EaMessageElement, EaMessage };
