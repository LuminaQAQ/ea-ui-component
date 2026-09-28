import type { EaInputClearEvent } from "../components/ea-input/events/EaClearEvent";
import type { EaColorPickerClearEvent } from "../components/ea-color-picker/events/EaColorPickerClearEvent";
import type { EaSelectClearEvent } from "../components/ea-select/events/EaSelectClearEvent";
import type { EaPaginationCurrentChangeEvent } from "../components/ea-pagination/events/EaPaginationCurrentChangeEvent";
import type { EaTableCurrentChangeEvent } from "../components/ea-table/events/EaTableCurrentChangeEvent";
import type { EaTreeCurrentChangeEvent } from "../components/ea-tree/events/EaTreeCurrentChangeEvent";
import type { EaCollapseChangeEvent } from "../components/ea-collapse/components/ea-collapse/events/EaCollapseChangeEvent";
import type { EaCountdownChangeEvent } from "../components/ea-countdown/events/EaCountdownChangeEvent";
import type { EaDatePickerChangeEvent } from "../components/ea-date-picker/events/EaDatePickerChangeEvent";
import type { EaInputNumberChangeEvent } from "../components/ea-input-number/events/EaInputNumberChangeEvent";
import type { EaAlertCloseEvent } from "../components/ea-alert/events/EaAlertCloseEvent";
import type { EaTourCloseEvent } from "../components/ea-tour/events/EaTourCloseEvent";
import type { EaOverlayCloseEvent } from "../common/ea-overlay/events/EaOverlayCloseEvent";
import type { EaMessageCloseEvent } from "../components/ea-message/events/EaMessageCloseEvent";
import type { EaOverlayOpenEvent } from "../common/ea-overlay/events/EaOverlayOpenEvent";
import type { EaAlertOpenEvent } from "../components/ea-alert/events/EaAlertOpenEvent";
import type { EaMessageBoxConfirmEvent } from "../components/ea-message-box/events/EaMessageBoxConfirmEvent";
import type { EaPopconfirmConfirmEvent } from "../components/ea-popconfirm/events/EaPopconfirmConfirmEvent";
import type { EaCalendarSelectEvent } from "../components/ea-calendar/events/EaCalendarSelectEvent";
import type { EaTableSelectEvent } from "../components/ea-table/events/EaTableSelectEvent";

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-clear": EaInputClearEvent | EaColorPickerClearEvent | EaSelectClearEvent;

    "ea-current-change":
      | EaPaginationCurrentChangeEvent
      | EaTableCurrentChangeEvent
      | EaTreeCurrentChangeEvent;

    "ea-change":
      | EaCollapseChangeEvent
      | EaCountdownChangeEvent
      | EaDatePickerChangeEvent
      | EaInputNumberChangeEvent;

    "ea-close": EaOverlayCloseEvent | EaAlertCloseEvent | EaTourCloseEvent | EaMessageCloseEvent;

    "ea-open": EaOverlayOpenEvent | EaAlertOpenEvent;

    "ea-confirm": EaMessageBoxConfirmEvent | EaPopconfirmConfirmEvent;

    "ea-select": EaCalendarSelectEvent | EaTableSelectEvent;
  }
}

export {};
