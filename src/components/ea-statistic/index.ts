import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-statistic" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaStatistic extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("header"))
  private _header!: HTMLElement;

  @query(bem.ce("number"))
  private _number!: HTMLElement;

  @query(bem.ce("prefix"))
  private _prefix!: HTMLElement;

  @query(bem.ce("suffix"))
  private _suffix!: HTMLElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaStatistic, newVal: string) {
      this._header.textContent = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaStatistic, newVal: number) {
      this._number.textContent = newVal.toLocaleString();
    },
  })
  value: number = 0;

  updateContainerClasslist(): string {
    const className = bem();
    this._container.className = className;
    return className;
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <header class='${bem.e("header")}' part='title'>
          <slot name='title'></slot>
        </header>
        <main class='${bem.e("content")}' part='content'>
          <span class='${bem.e("prefix")}' part='prefix'>
            <slot name='prefix'></slot>
          </span>
          <span class='${bem.e("number")}' part='number'>
            <slot></slot>
          </span>
          <span class='${bem.e("suffix")}' part='suffix'>
            <slot name='suffix'></slot>
          </span>
        </main>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaStatistic;
