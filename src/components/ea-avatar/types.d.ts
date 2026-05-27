declare global {
  interface HTMLElementTagNameMap {
    "ea-avatar": EaAvatarElement;
  }
}

export interface EaAvatarElement extends HTMLElement {
  /** 图标类名 */
  icon: string;
  /** 头像形状 */
  shape: "circle" | "square";
  /** 头像尺寸 */
  size: string;
  /** 图片源地址 */
  src: string;
  /** 响应式图片源 */
  srcSet: string;
  /** 图片替代文本 */
  alt: string;
  /** 图片填充模式 */
  fit: "fill" | "contain" | "cover" | "none" | "scale-down";
  /** 更新容器类名 */
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaAvatarVueProps {
  icon?: string;
  shape?: "circle" | "square";
  size?: string;
  src?: string;
  srcSet?: string;
  alt?: string;
  fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
}

export interface EaAvatarVueEvents {
  /** 图片加载失败时触发 */
  error: (event: CustomEvent) => void;
}

export interface EaAvatarVueSlots {
  /** 默认插槽，用于自定义内容 */
  default?: () => any;
}

export type EaAvatarVueComponent = DefineComponent<
  EaAvatarVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaAvatarVueEvents,
  {},
  {},
  EaAvatarVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-avatar": EaAvatarVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaAvatarReactProps extends HTMLAttributes<HTMLElement> {
  icon?: string;
  shape?: "circle" | "square";
  size?: string;
  src?: string;
  srcSet?: string;
  alt?: string;
  fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  /** 图片加载失败时的回调 */
  onError?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-avatar": EaAvatarReactProps;
    }
  }
}

export {};
