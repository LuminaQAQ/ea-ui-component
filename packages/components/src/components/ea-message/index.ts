import { EaMessageElement } from "./components/ea-message";
import { EaMessage } from "./utils/EaMessageInstance";

(globalThis as any).$message = EaMessage;

export { EaMessageElement, EaMessage };
