import { EaNotificationElement } from "./components/ea-notification";
import { EaNotification } from "./utils/EaNotificationInstance";

(globalThis as any).$notify = EaNotification;

export { EaNotificationElement, EaNotification };
