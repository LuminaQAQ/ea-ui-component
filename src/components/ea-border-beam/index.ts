import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, queryAll } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-border-beam" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 边框光束动画组件，用于为元素添加动态的边框光束扫描效果，支持多条光束和悬停触发。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，需要应用边框光束效果的内容。
 *
 * @csspart container - 容器元素。
 * @csspart indicator - 光束指示器元素。
 *
 * @cssproperty --ea-border-beam-indicator-size - 光束指示器尺寸，默认值 `100px`。
 * @cssproperty --ea-border-beam-indicator-color - 光束指示器颜色渐变，默认值 `transparent 50% → var(--blue-500)`。
 * @cssproperty --ea-border-beam-indicator-line-width - 光束指示器线条宽度，默认值 `1px`。
 * @cssproperty --ea-border-beam-duration - 光束动画持续时间，默认值 `10s`。
 * @cssproperty --ea-border-beam-start-delay - 光束动画开始延迟，默认值 `0s`。
 * @cssproperty --ea-border-beam-initial-distance - 光束初始偏移距离，默认值 `0%`。
 * @cssproperty --ea-border-beam-border-radius - 组件边框圆角，默认值 `var(--border-radius-sm)`。
 * @cssproperty --ea-border-beam-font-size - 组件字体大小，默认值 `var(--font-size-md)`。
 * @cssproperty --ea-border-beam-transition - 组件过渡动画，默认值 `var(--transition-normal)`。
 * @cssproperty --ea-border-beam-text - 文字颜色，默认值 `var(--grey-900)`。
 * @cssproperty --ea-border-beam-bg - 背景颜色，默认值 `var(--blue-500)`。
 * @cssproperty --ea-border-beam-border-color - 边框颜色，默认值 `var(--grey-300)`。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBorderBeam extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @queryAll(bem.ce("indicator"))
  private _indicators!: HTMLElement[];

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaBorderBeam, newVal: number) {
      this._updateIndicators(newVal);
    },
  })
  count: number = 1;

  @attribute({
    type: Enum(["", "hover"]),
    default: "",
    observer(this: EaBorderBeam, newVal: string) {
      this.updateContainerClasslist();
    },
  })
  trigger: string = "";

  @attribute({
    type: Number,
    default: 100,
    observer(this: EaBorderBeam, newVal: number) {
      this._container?.style.setProperty(
        `--${TAG_NAME}-indicator-size`,
        `${newVal || 100}px`
      );
    },
  })
  size: number = 100;

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaBorderBeam, newVal: number) {
      this._container?.style.setProperty(
        `--${TAG_NAME}-indicator-line-width`,
        `${newVal || 1}px`
      );
    },
  })
  lineWidth: number = 1;

  @attribute({
    type: Number,
    default: 10,
    observer(this: EaBorderBeam, newVal: number) {
      this._container?.style.setProperty(
        `--${TAG_NAME}-duration`,
        `${newVal || 10}s`
      );
    },
  })
  duration: number = 10;

  /** 光束动画开始延迟，单位 s */
  @attribute({
    type: Number,
    default: 0,
    observer(this: EaBorderBeam, newVal: number) {
      this._container?.style.setProperty(
        `--${TAG_NAME}-start-delay`,
        `${newVal || 0}s`
      );
    },
  })
  startDelay: number = 0;

  /**
   * 更新容器类名
   * @returns 更新后的类名字符串
   */
  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        [`trigger-${this.trigger}`]: this.trigger !== "",
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
        ${Array.from({ length: this.count })
          .map(
            (_, index) =>
              `<div class="${bem.e("indicator")}" part="indicator"></div>`
          )
          .join("")}
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  $mounted(): void {
    this._updateIndicators(this.count);
  }

  /**
   * 更新指示器数量及初始偏移距离
   * @param count - 指示器数量，至少为 1
   */
  private _updateIndicators(count: number = this.count): void {
    count = Math.max(count, 1);

    const indicators = this._indicators;

    for (let i = count; i < indicators.length; i++) {
      indicators[i].remove();
    }

    for (let i = indicators.length; i < count; i++) {
      const indicator = document.createElement("div");
      indicator.className = bem.e("indicator");
      indicator.setAttribute("part", "indicator");
      this._container?.appendChild(indicator);
    }

    const allIndicators = this._indicators ?? [];
    allIndicators.forEach((indicator, index) => {
      (indicator as HTMLElement).style.setProperty(
        `--${TAG_NAME}-initial-distance`,
        `${(100 / count) * index}%`
      );
    });
  }
}
