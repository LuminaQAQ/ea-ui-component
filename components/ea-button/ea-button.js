// @ts-nocheck
import setStyle from "../../utils/setStyle";

export default class EaButton extends HTMLElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const test = document.createElement('input');
    test.type = 'button';
    test.value = "click";
    test.className = "__ea-button";


    setStyle(shadowRoot, new URL('./index.css', import.meta.url).href);
    shadowRoot.appendChild(test);
  }

  get BUTTON_STYLE() {
    return ['plain', 'round'];
  }

  // ------- 禁用 -------
  // #region
  get disabled() {
    return this.getAttribute('disabled') !== null;
  }

  get ariaDisabled() {
    return this.getAttribute('aria-disabled') !== null;
  }
  // #endregion
  // ------- end -------

  // ------- 按钮内容 -------
  // #region
  get value() {
    return this.getAttribute('value');
  }

  get innerHTMLValue() {
    return this.innerHTML;
  }

  get ariaValueText() {
    return this.getAttribute('aria-valuetext');
  }
  // #endregion
  // ------- end -------

  // ------- 按钮样式 -------
  // #region
  get plain() {
    return this.getAttribute('plain') !== undefined && this.getAttribute('plain') !== null;
  }
  get round() {
    return this.getAttribute('round') !== undefined && this.getAttribute('round') !== null;
  }
  // #endregion
  // ------- end -------

  get type() {
    const attr = this.getAttribute('type');
    if (attr == null || attr == false) return 'normal';
    else return attr;
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector('.__ea-button');

    // 禁用
    button.disabled = this.disabled;
    button.ariaDisabled = this.ariaDisabled;

    // 按钮内容
    button.ariaValueText = this.ariaValueText;
    button.value = this.value;
    button.value = this.innerHTMLValue;

    // 按钮样式
    for (let i = 0, style; style = this.BUTTON_STYLE[i++];) {
      if (this[style]) {
        button.classList.add(style);
        break;
      }
    }

    if (this.disabled || this.ariaDisabled) button.classList.add('disabled');
    button.classList.add(this.type);
  }
}