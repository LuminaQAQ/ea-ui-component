import { EaNotification } from "./utils/EaNotificationInstance.js";
import { EaNotificationElement } from "./component/index.js";

window.$notify = EaNotification;

export { EaNotificationElement, EaNotification };
