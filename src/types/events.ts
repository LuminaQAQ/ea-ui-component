/**
 * 全局事件类型声明
 */

import { EaInputClearEvent } from "../components/ea-input/events/EaClearEvent";
import { EaColorPickerClearEvent } from "../components/ea-color-picker/events/EaColorPickerClearEvent";
import { EaSelectClearEvent } from "../components/ea-select/events/EaSelectClearEvent";
import { EaPaginationCurrentChangeEvent } from "../components/ea-pagination/events/EaPaginationCurrentChangeEvent";
import { EaTableCurrentChangeEvent } from "../components/ea-table/events/EaTableCurrentChangeEvent";
import { EaTreeCurrentChangeEvent } from "../components/ea-tree/events/EaTreeCurrentChangeEvent";
import { EaCollapseChangeEvent } from "../components/ea-collapse/components/ea-collapse/events/EaCollapseChangeEvent";
import { EaCountdownChangeEvent } from "../components/ea-countdown/events/EaCountdownChangeEvent";
import { EaDatePickerChangeEvent } from "../components/ea-date-picker/events/EaDatePickerChangeEvent";
import { EaInputNumberChangeEvent } from "../components/ea-input-number/events/EaInputNumberChangeEvent";
import { EaAlertCloseEvent } from "../components/ea-alert/events/EaAlertCloseEvent";
import { EaTourCloseEvent } from "../components/ea-tour/events/EaTourCloseEvent";

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
