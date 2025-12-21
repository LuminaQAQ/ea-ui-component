import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaCard extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #footer;

  static get observedAttributes() {
    return [...super.observedAttributes, "shadow", "header", "footer"];
  }

  state = this.properties({
    shadow: {
      type: ['always', 'never', 'hover'],
      default: 'always',
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist()
      }
    },
    header: {
      type: String,
      default: '',
      observer: (newVal) => {
        this.#header.innerText = newVal;
      }
    },
    footer: {
      type: String,
      default: '',
      observer: (newVal) => {
        this.#footer.innerText = newVal;
      }
    }
  })

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist('ea-card', {
      [`--${this.shadow}-shadow`]: this.shadow,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class="ea-card" part="container">
        <div class="ea-card__header" part="header-wrap">
          <slot name="header"></slot>
        </div>
        <div class="ea-card__content" part="content-wrap">
          <slot></slot>
        </div>
        <div class="ea-card__footer" part="footer-wrap">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector('.ea-card');
    this.#header = this.shadowRoot.querySelector('.ea-card__header');
    this.#footer = this.shadowRoot.querySelector('.ea-card__footer');
  }

  connectedCallback() {
    super.connectedCallback();

    this.header = this.header;
    this.footer = this.footer;

    this.shadow = this.shadow;
  }
}

if (!window.customElements.get('ea-card')) {
  window.customElements.define('ea-card', EaCard);
}