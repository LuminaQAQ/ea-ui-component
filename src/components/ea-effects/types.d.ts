export {};

declare global {
  interface HTMLElementTagNameMap {
    "ea-effects": EaEffects;
  }
}

export interface EaEffects {
  /** 动画效果名称 */
  effect: string;
  /** 是否可见 */
  visible: boolean;
  /** 动画持续时间 */
  duration: string;
  /** 动画延迟时间 */
  delay: string;
  /** 动画缓动函数 */
  timingFunction: string;
  /** 动画播放次数 */
  iteration: number;
  /** 触发方式 */
  trigger: "hover" | "click" | "manual" | "scroll";
  /** 滚动触发是否仅执行一次 */
  scrollOnce: boolean;
  /** 滚动触发目标元素选择器 */
  scrollTarget: string;

  /** 显示内容，触发进入动画 */
  show(): void;
  /** 隐藏内容，触发离开动画 */
  hide(): void;
  /** 切换可见状态 */
  toggle(): void;
  /** 重置动画状态 */
  reset(): void;
}