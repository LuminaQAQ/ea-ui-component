import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaRadio extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #label;
  /** @type {HTMLInputElement} */
  #radio;

  static get observedAttributes() {
    return ['checked', 'name', 'value', 'disabled', 'border'];
  }

  state = this.properties({
    checked: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#label.toggleAttribute('checked', newVal);
        this.#radio.checked = newVal;

        this.#container.className = this.updateContainerClasslist();
      }
    },
    name: {
      type: String,
      default: '',
      observer: (newVal) => {
        this.#radio.setAttribute('name', newVal);
      }
    },
    value: {
      type: String,
      default: '',
      observer: (newVal) => {
        this.#label.setAttribute('for', newVal);
        this.#radio.setAttribute('id', newVal);
        this.#radio.setAttribute('value', newVal);
      }
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#radio.disabled = newVal;
        this.#container.className = this.updateContainerClasslist();
      }
    },
    border: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      }
    },
  })

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist('ea-radio', {
      ['--checked']: this.checked,
      ['--disabled']: this.disabled,
      ['--border']: this.border,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <label class="ea-radio" part="container" role="radio">
        <span class="ea-radio__input" part="input-wrap">
          <span class="ea-radio__inner" part="input"></span>
          <input class="ea-radio__original" type="radio" />
        </span>
        <span class="ea-radio__label" part="label-wrap">
          <slot></slot>
        </span>
      </label>
    `;

    this.#container = this.shadowRoot.querySelector('.ea-radio');

    this.#label = this.shadowRoot.querySelector('.ea-radio__label');
    this.#radio = this.shadowRoot.querySelector('.ea-radio__original');
  }

  #changeEvent = (e) => {
    const sameGroupRadio = document.querySelectorAll(`ea-radio[name="${this.name}"]`);
    [...sameGroupRadio].forEach(btn => {
      btn.checked = btn === this;
    });

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: this.value,
        checked: this.checked
      }
    }))
  }

  connectedCallback() {
    super.connectedCallback();

    this.checked = this.checked;
    this.name = this.name;
    this.value = this.value;
    this.disabled = this.disabled;
    this.border = this.border;

    this.#radio.addEventListener('change', this.#changeEvent)
  }
}

if (!window.customElements.get('ea-radio')) {
  window.customElements.define('ea-radio', EaRadio);
}