// @ts-nocheck
import setStyle from "../../utils/setStyle";

const styleSheet = `
.__ea-button {
  padding: 0.25rem 1rem;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1.25;
  font-weight: 500;
  transition: background-color 0.1s, color 0.1s;
  border-radius: 5px;
}
.__ea-button.normal {
  border: 1px solid #e6e6e6;
  color: black;
  background-color: transparent;
}
.__ea-button.normal.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: rgba(64, 64, 64, 0) !important;
  border-color: white !important;
  color: #404040 !important;
}
.__ea-button.normal:hover {
  border: 1px solid rgba(160, 207, 255, 0.4);
  color: #3a9bff;
  background-color: rgba(160, 207, 255, 0.05);
}
.__ea-button.primary {
  border: 1px solid #409eff;
  color: #ffffff;
  background-color: #409eff;
}
.__ea-button.primary.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #c0dfff !important;
  border-color: #c0dfff !important;
  color: white !important;
}
.__ea-button.primary:hover {
  border: 1px solid #a5d2ff;
  color: #ffffff;
  background-color: #a5d2ff;
}
`

export default class EaButton extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });


    const test = document.createElement('input');
    test.type = 'button';
    test.value = "click";
    test.className = "__ea-button";

    setStyle(shadowRoot, new URL('./index.css', import.meta.url).href);
    // const style = document.createElement('style');
    // style.textContent = styleSheet;
    // shadowRoot.appendChild(style);

    shadowRoot.appendChild(test);
  }

  get disabled() {
    return this.getAttribute('disabled') !== null;
  }

  get ariaDisabled() {
    return this.getAttribute('aria-disabled') !== null;
  }

  get checked() {
    return this.getAttribute('checked');
  }

  get circle() {
    return this.getAttribute('circle') !== null;
  }

  get type() {
    const attr = this.getAttribute('type');
    if (attr == null || attr == false) return 'normal';
    else return attr;
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector('.__ea-button');

    button.disabled = this.disabled;
    button.ariaDisabled = this.ariaDisabled;

    if (this.disabled || this.ariaDisabled) button.classList.add('disabled');
    button.classList.add(this.type);
  }
}