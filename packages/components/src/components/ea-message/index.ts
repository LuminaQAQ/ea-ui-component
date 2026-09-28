import { EaMessageElement } from "./components/index";
import { EaMessage } from "./utils/EaMessageInstance";

(window as any).$message = EaMessage;

export { EaMessageElement, EaMessage };
