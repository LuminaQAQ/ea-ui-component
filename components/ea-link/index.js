import Base from '../Base.js'

import stylesheet from './index.scss?inline';

export class EaLink extends Base {
  static get observedAttributes() {
    return ["href", "type", "disabled", "underline", "icon"];
  }

  /** @type {HTMLAnchorElement} */
  #container;

  /** 
   * @typedef {Object} LinkState
   * @property {string} type
   * @property {Boolean} disabled
   * @property {Boolean} underline
   * @property {string} href
   * @property {string} icon
   */

  /** @type {LinkState} */
  state = this.properties({
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
    href: {
      type: String,
      default: '',
      observer: (newVal) => {
        this.#container.href = newVal;
      }
    },
    icon: {
      type: String,
      default: '',
      observer: (newVal) => {
        if (!value) return;

        const icon = document.createElement('ea-icon');
        icon.icon = value;
        this.#container.insertBefore(icon, this.#container.firstChild);
      }
    },
  })

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist('ea-link', {
      ['--' + this.type]: this.type,
      ['--underline-' + this.underline]: this.underline,
      '--disabled': this.disabled,
    });
  }

  constructor() {
    super();
  }

  $mounted() {
    this.adoptedStyle(stylesheet);

    this.shadowRoot.innerHTML = `
      <a class="ea-link" part="container" tabindex="-1">
        <slot></slot>
      </a>
    `;

    this.#container = this.shadowRoot.querySelector('.ea-link');

    // 设置链接
    this.href = this.href;

    // 设置类型
    this.type = this.type;

    // 禁用状态
    this.disabled = this.disabled;

    // // 设置下划线
    this.underline = this.underline;

    // // 图标
    this.icon = this.icon;
  }
}

if (!window.customElements.get("ea-link")) {
  window.customElements.define("ea-link", EaLink);
}