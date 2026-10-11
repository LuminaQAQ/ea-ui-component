import { Color } from "@/utils/Color";

export interface EaColorPickerChangeEventDetail {
  /** 变更后的颜色字符串值 */
  value: string;
  /** 变更后的颜色对象实例 */
  color: Color;
}

export class EaColorPickerChangeEvent extends Event {
  readonly detail: EaColorPickerChangeEventDetail;

  constructor(detail: EaColorPickerChangeEventDetail) {
    super("change", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}
