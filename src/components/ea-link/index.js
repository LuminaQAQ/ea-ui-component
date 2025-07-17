import Base from '../Base.js'

import stylesheet from './index.scss?inline';

export class EaLink extends Base {
  /** @type {HTMLAnchorElement} */
  #container;

  observedProps = ["href", "type", "disabled", "underline", "icon"];

  /** 
   * @typedef {Object} LinkState
   * @property {string} href
   * @property {string} type
   * @property {Boolean} disabled
   * @property {Boolean} underline
   */

  /** @type {LinkState} */
  state = this.properties({
    href: {
      type: String,
      default: '',
      observer: (newVal) => {
        this.#container.href = newVal;
      }
    },
    type: {
      type: ['normal', 'primary', 'success', 'info', 'warning', 'danger'],
      default: 'normal',
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist()
      }
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist()
      }
    },
    underline: {
      type: ['always', 'hover', 'never'],
      default: 'never',
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist()
      }
    },
  })

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist('ea-link', {
      ['--' + this.state.type]: this.state.type,
      ['--underline-' + this.state.underline]: this.state.underline,
      '--disabled': this.state.disabled,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.shadowRoot.innerHTML = `
      <a class="ea-link" part="container" tabindex="-1">
        <slot></slot>
      </a>
    `;

    this.#container = this.shadowRoot.querySelector('.ea-link');
  }

  get LINK_TYPE() {
    return ['primary', 'success', 'info', 'warning', 'danger'];
  }

  // ------- href链接 -------
  // #region
  get href() {
    return this.state.href;
  }

  set href(value) {
    this.state.href = value;
  }
  // #endregion
  // ------- end -------

  // ------- type类型 -------
  // #region
  get type() {
    return this.state.type;
  }

  set type(value) {
    this.state.type = value;
  }
  // #endregion
  // ------- end -------

  // ------- disabled禁用状态 -------
  // #region
  get disabled() {
    return this.state.disabled;
  }

  set disabled(value) {
    this.state.disabled = value;
  }
  // #endregion
  // ------- end -------

  // ------- underline下划线 -------
  // #region
  get underline() {
    return this.state.underline;
  }

  set underline(value) {
    this.state.underline = value;
  }
  // #endregion
  // ------- end -------

  // ------- icon图标 -------
  // #region
  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    if (!value) return;

    const icon = document.createElement('ea-icon');
    icon.icon = value;
    this.#container.insertBefore(icon, this.#container.firstChild);
  }
  // #endregion
  // ------- end -------

  $mounted() {
    // 设置链接
    this.href = this.getAttribute('href');

    // 设置类型
    this.type = this.getAttribute('type');

    // 禁用状态
    this.disabled = this.getAttrBoolean('disabled');

    // // 设置下划线
    this.underline = this.getAttrBoolean('underline');

    // // 图标
    this.icon = this.icon;
  }
}

if (!window.customElements.get("ea-link")) {
  window.customElements.define("ea-link", EaLink);
}