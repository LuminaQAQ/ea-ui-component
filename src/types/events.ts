/**
 * 全局事件类型声明
 */

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

    "ea-close": EaAlertCloseEvent | EaTourCloseEvent;
  }
}

export {};
