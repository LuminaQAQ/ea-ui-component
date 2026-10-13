import { EaNotificationElement } from "./components/ea-notification";
import { EaNotification } from "./utils/EaNotificationInstance";

(window as any).$notify = EaNotification;

export { EaNotificationElement, EaNotification };
