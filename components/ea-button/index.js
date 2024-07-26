// @ts-nocheck
import Base from "../Base.js";
import "../ea-icon/index.js"

const stylesheet = `
:host {
  --margin-right: 0rem;
  --border-radius: 6px;
  --border-size: 1px;
}

:host([href]) > a {
  text-decoration: none;
}

:host-context(ea-button-group) {
  --margin-right: 0;
  --border-size: 0;
}

.__ea-button {
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  margin-right: var(--margin-right);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 500;
  transition: background-color 0.1s, color 0.1s;
  border-radius: var(--border-radius);
}
.__ea-button.normal {
  border: var(--border-size) solid #dcdfe6;
  color: #606266;
  background-color: transparent;
}
.__ea-button.normal.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: rgba(64, 64, 64, 0) !important;
  border-color: white !important;
  color: white !important;
  pointer-events: none;
  border-color: #ebedf1 !important;
  color: #babcbe !important;
}
.__ea-button.normal.plain {
  background-color: rgba(92, 92, 92, 0);
  border: var(--border-size) solid white;
  color: transparent;
  background-color: transparent;
  border: var(--border-size) solid #dcdfe6;
  color: #606266;
}
.__ea-button.normal.plain:hover {
  background-color: transparent;
}
.__ea-button.normal.round {
  --border-radius: 999px;
}
.__ea-button.normal.medium {
  font-size: 14px;
}
.__ea-button.normal.small {
  font-size: 12px;
}
.__ea-button.normal.mini {
  font-size: 10px;
}
.__ea-button.normal:hover {
  border: var(--border-size) solid rgba(160, 207, 255, 0.4);
  color: #3a9bff;
  background-color: rgba(160, 207, 255, 0.05);
}
.__ea-button.normal:active {
  background-color: rgba(7, 130, 255, 0.05);
  border: var(--border-size) solid rgba(33, 143, 255, 0.4);
}
.__ea-button > i {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.__ea-button.primary {
  border: var(--border-size) solid #409eff;
  color: #fff;
  background-color: #409eff;
}
.__ea-button.primary.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #c0dfff !important;
  border-color: #c0dfff !important;
  color: white !important;
  pointer-events: none;
}
.__ea-button.primary.plain {
  background-color: #f8fbff;
  border: var(--border-size) solid #c0dfff;
  color: #409eff;
}
.__ea-button.primary.round {
  --border-radius: 999px;
}
.__ea-button.primary.medium {
  font-size: 14px;
}
.__ea-button.primary.small {
  font-size: 12px;
}
.__ea-button.primary.mini {
  font-size: 10px;
}
.__ea-button.primary:hover {
  border: var(--border-size) solid #73b8ff;
  color: white;
  background-color: #73b8ff;
}
.__ea-button.primary:active {
  background-color: #006bd9;
}
.__ea-button > i {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.__ea-button.success {
  border: var(--border-size) solid #67c23a;
  color: #fff;
  background-color: #67c23a;
}
.__ea-button.success.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #b2e19b !important;
  border-color: #b2e19b !important;
  color: white !important;
  pointer-events: none;
}
.__ea-button.success.plain {
  background-color: #d3eec6;
  border: var(--border-size) solid #b2e19b;
  color: #67c23a;
}
.__ea-button.success.round {
  --border-radius: 999px;
}
.__ea-button.success.medium {
  font-size: 14px;
}
.__ea-button.success.small {
  font-size: 12px;
}
.__ea-button.success.mini {
  font-size: 10px;
}
.__ea-button.success:hover {
  border: var(--border-size) solid #85cf60;
  color: white;
  background-color: #85cf60;
}
.__ea-button.success:active {
  background-color: #3d7323;
}
.__ea-button > i {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.__ea-button.info {
  border: var(--border-size) solid #909399;
  color: #fff;
  background-color: #909399;
}
.__ea-button.info.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #d2d4d6 !important;
  border-color: #d2d4d6 !important;
  color: white !important;
  pointer-events: none;
}
.__ea-button.info.plain {
  background-color: #f0f0f1;
  border: var(--border-size) solid #d2d4d6;
  color: #909399;
}
.__ea-button.info.round {
  --border-radius: 999px;
}
.__ea-button.info.medium {
  font-size: 14px;
}
.__ea-button.info.small {
  font-size: 12px;
}
.__ea-button.info.mini {
  font-size: 10px;
}
.__ea-button.info:hover {
  border: var(--border-size) solid #abadb1;
  color: white;
  background-color: #abadb1;
}
.__ea-button.info:active {
  background-color: #5d6066;
}
.__ea-button > i {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.__ea-button.warning {
  border: var(--border-size) solid #e6a23c;
  color: #fff;
  background-color: #e6a23c;
}
.__ea-button.warning.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #f4d8ad !important;
  border-color: #f4d8ad !important;
  color: white !important;
  pointer-events: none;
}
.__ea-button.warning.plain {
  background-color: #fbf0df;
  border: var(--border-size) solid #f4d8ad;
  color: #e6a23c;
}
.__ea-button.warning.round {
  --border-radius: 999px;
}
.__ea-button.warning.medium {
  font-size: 14px;
}
.__ea-button.warning.small {
  font-size: 12px;
}
.__ea-button.warning.mini {
  font-size: 10px;
}
.__ea-button.warning:hover {
  border: var(--border-size) solid #ecb869;
  color: white;
  background-color: #ecb869;
}
.__ea-button.warning:active {
  background-color: #a76d15;
}
.__ea-button > i {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.__ea-button.danger {
  border: var(--border-size) solid #f56c6c;
  color: #fff;
  background-color: #f56c6c;
}
.__ea-button.danger.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #fde3e3 !important;
  border-color: #fde3e3 !important;
  color: white !important;
  pointer-events: none;
}
.__ea-button.danger.plain {
  background-color: white;
  border: var(--border-size) solid #fde3e3;
  color: #f56c6c;
  background-color: #fde8e8;
}
.__ea-button.danger.round {
  --border-radius: 999px;
}
.__ea-button.danger.medium {
  font-size: 14px;
}
.__ea-button.danger.small {
  font-size: 12px;
}
.__ea-button.danger.mini {
  font-size: 10px;
}
.__ea-button.danger:hover {
  border: var(--border-size) solid #f89c9c;
  color: white;
  background-color: #f89c9c;
}
.__ea-button.danger:active {
  background-color: #eb1010;
}
.__ea-button > i {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.__ea-button.text {
  border: var(--border-size) solid transparent;
  color: #409eff;
  background-color: transparent;
}
.__ea-button.text.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: rgba(64, 64, 64, 0) !important;
  border-color: rgba(64, 64, 64, 0) !important;
  color: white !important;
  pointer-events: none;
  color: #c0c4cc !important;
}
.__ea-button.text.plain {
  background-color: rgba(92, 92, 92, 0);
  border: var(--border-size) solid rgba(64, 64, 64, 0);
  color: transparent;
}
.__ea-button.text.round {
  --border-radius: 999px;
}
.__ea-button.text.medium {
  font-size: 14px;
}
.__ea-button.text.small {
  font-size: 12px;
}
.__ea-button.text.mini {
  font-size: 10px;
}
.__ea-button.text:hover {
  border: var(--border-size) solid rgba(26, 26, 26, 0);
  color: #73b8ff;
  background-color: rgba(26, 26, 26, 0);
}
.__ea-button.text:active {
  background-color: rgba(0, 0, 0, 0);
}
.__ea-button > i {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.__ea-button.first-child {
  border-radius: 4px 0 0 4px;
}
.__ea-button.middle-child {
  border-radius: 0;
}
.__ea-button.last-child {
  border-radius: 0 4px 4px 0;
}
`;

export class EaButton extends Base {
  #mounted = false;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    let dom = null;

    if (this.getAttribute('href') !== null && this.getAttribute('href') !== '') dom = document.createElement('a');
    else dom = document.createElement('button');


    dom.part = "wrap";

    const slot = document.createElement('slot');
    dom.className = "__ea-button";
    dom.appendChild(slot);

    this.dom = dom;

    this.build(shadowRoot, stylesheet);

    shadowRoot.appendChild(dom);
  }

  static get observedAttributes() {
    return ['loading', 'disabled'];
  }

  get BUTTON_STYLE() {
    return ['plain', 'round'];
  }

  get BUTTON_TYPE() {
    return ['normal', 'primary', 'success', 'warning', 'danger', 'text'];
  }

  get BUTTON_SIZE() {
    return ['medium', 'small', 'mini'];
  }


  // ------- 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean('disabled');
  }

  set disabled(value) {
    if (!this.#mounted) {
      this.toggleAttribute('disabled', this.disabled, 'disabled');
    } else {
      this.toggleAttribute('disabled', value, 'disabled');
    }
  }

  get ariaDisabled() {
    return this.getAttribute('aria-disabled') !== null || this.getAttribute('aria-disabled') !== undefined;
  }

  set ariaDisabled(value) {
    this.toggleAttribute('aria-disabled', value, 'disabled');
  }
  // #endregion
  // ------- end -------

  // ------- 按钮样式 -------
  // #region
  get plain() {
    return this.getAttribute('plain') !== undefined && this.getAttribute('plain') !== null;
  }
  set plain(value) {
    this.toggleAttribute('plain', value, 'plain');
  }

  get round() {
    return this.getAttribute('round') !== undefined && this.getAttribute('round') !== null;
  }
  set round(value) {
    this.toggleAttribute('round', value, 'round');

    if (value) this.dom.style.setProperty('--border-radius', '999px');
  }
  // #endregion
  // ------- end -------

  // ------- type属性 -------
  // #region
  get type() {
    const attr = this.getAttribute('type');

    if (attr == null || attr == false) return 'normal';
    else return attr;
  }

  set type(value) {
    if (!this.BUTTON_TYPE.includes(value)) value = 'normal';

    this.toggleAttribute('type', value, value);
  }
  // #endregion
  // ------- end -------

  // ------- 按钮大小 -------
  // #region
  get size() {
    return this.getAttribute('size');
  }
  set size(value) {
    if (!this.BUTTON_SIZE.includes(value)) return;

    this.toggleAttribute('size', value, value);
  }
  // #endregion
  // ------- end -------

  // ------- 按钮加载 -------
  // #region
  get loading() {
    return this.hasAttribute('loading');
  }

  set loading(value) {
    value = value === "true" || value === "" || value === true ? true : false;
    this.toggleAttribute('loading', value, 'loading');
    this.disabled = value;

    if (value && !this.dom.querySelector('i')) {
      const i = document.createElement('i');
      i.className = "icon-spin6 animate-spin";

      this.dom.insertBefore(i, this.dom.firstChild)
    } else if (!value && this.dom.querySelector('i')) {
      this.dom.querySelector('i').remove();
    }
  }
  // #endregion
  // ------- end -------

  // ------- 图标按钮 -------
  // #region
  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    if (value) {
      this.setAttribute('icon', value);

      if (!this.dom.querySelector('i')) {
        const eaIcon = document.createElement('ea-icon');
        eaIcon.icon = value;

        this.dom.insertBefore(eaIcon, this.dom.firstChild)
      }
    } else {
      this.removeAttribute('icon');
      this.dom.querySelector('i')?.remove();
    }
  }
  // #endregion
  // ------- end -------

  // ------- 链接按钮 -------
  // #region
  get href() {
    return this.getAttribute('href');
  }

  set href(value) {
    if (this.shadowRoot.querySelector("button")) return;

    if (value == null && value == false) {
      this.removeAttribute('href');
      this.dom.removeAttribute('href');
    } else {
      this.setAttribute('href', value);
      this.dom.setAttribute('href', value);
    }
  }
  // #endregion
  // ------- end -------

  init() {
    // 禁用
    this.disabled = this.hasAttribute('disabled');

    // 加载
    this.loading = this.loading;

    // 按钮样式
    for (let i = 0, style; style = this.BUTTON_STYLE[i++];) {
      if (this[style]) {
        this[style] = this[style];
        break;
      }
    }

    // 按钮种类
    this.type = this.type;

    // 按钮大小
    this.size = this.size;

    // 链接
    this.href = this.href;

    // 图标
    this.icon = this.icon;
  }

  connectedCallback() {
    this.init();

    this.#mounted = true;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue == newValue) return;
    switch (name) {
      case "loading":
        if (newValue === "") newValue = true;
        this.loading = newValue;
        break;
      case "disabled":
        if (this.#mounted) {
          this.disabled = newValue === "true" || newValue === "";
          if (newValue === "true" || newValue === "") this.setAttribute("disabled", true);
        }
        break;
      default: break;
    }
  }
}

if (!window.customElements.get("ea-button")) {
  window.customElements.define("ea-button", EaButton);
}