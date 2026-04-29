import { EaNotificationElement } from "./components/index";
import { EaNotification } from "./utils/EaNotificationInstance";

(window as any).$notify = EaNotification;

export { EaNotificationElement, EaNotification };
