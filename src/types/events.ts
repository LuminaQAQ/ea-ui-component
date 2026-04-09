/**
 * 全局事件类型声明
 */

import { EaClearEvent } from "../components/ea-input/events/EaClearEvent";
import { EaColorPickerClearEvent } from "../components/ea-color-picker/events/EaColorPickerClearEvent";
import { EaSelectClearEvent } from "../components/ea-select/events/EaSelectClearEvent";
import { EaPaginationCurrentChangeEvent } from "../components/ea-pagination/events/EaPaginationCurrentChangeEvent";
import { EaTableCurrentChangeEvent } from "../components/ea-table/events/EaTableCurrentChangeEvent";
import { EaTreeCurrentChangeEvent } from "../components/ea-tree/events/EaTreeCurrentChangeEvent";

declare global {
  interface GlobalEventHandlersEventMap {
    // Clear events
    "ea-clear": EaClearEvent | EaColorPickerClearEvent | EaSelectClearEvent;

    // Current change events
    "ea-current-change":
      | EaPaginationCurrentChangeEvent
      | EaTableCurrentChangeEvent
      | EaTreeCurrentChangeEvent;
  }
}

export {};
