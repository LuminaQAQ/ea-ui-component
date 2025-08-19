import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';
import { timeout } from '@/utils/timeout';

export class EaAlert extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #alertIcon
  /** @type {HTMLElement} */
  #alertContent;
  /** @type {HTMLElement} */
  #alertTitle;
  /** @type {HTMLElement} */
  #alertDescription;
  /** @type {HTMLElement} */
  #alertCloseBtn;


  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return ['title', 'description', 'type', 'effect', 'closable', 'close-text', 'show-icon', 'center', 'description', 'show-after', 'hide-after', 'auto-close'];
  }

  state = this.properties({
    title: {
      type: String,
      default: '',
      observer: (newVal) => {
        this.#alertTitle.innerHTML = newVal
          ? newVal
          : `<slot name="title"></slot>`
      }
    },
    description: {
      type: String,
      default: '',
      observer: (newVal) => {
        this.#alertDescription.innerHTML = newVal
          ? newVal
          : `<slot></slot>`
      }
    },
    type: {
      type: ['primary', 'info', 'success', 'warning', 'error'],
      default: 'info',
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist()
      }
    },
    effect: {
      type: ['light', 'dark'],
      default: 'light',
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist()
      }
    },
    "close-text": {
      type: String,
      default: '',
      observer: (newVal) => {
        try {
          this.#alertCloseBtn.textContent = newVal
        } catch (error) { }
      }
    },
    closable: {
      type: Boolean,
      default: true,
      observer: (newVal) => {
        this.#alertCloseBtn.innerHTML = newVal
          ? (this['close-text'] ? this['close-text'] : `<ea-icon class="ea-alert__close-icon" icon="icon-cancel" part="close-icon"></ea-icon>`)
          : ''
      }
    },
    "show-icon": {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        const iconType = {
          primary: 'info',
          success: 'ok-circled',
          info: 'info',
          warning: 'attention-alt',
          error: 'cancel-circled'
        }

        const hasSlot = this.querySelector("[slot=icon]");

        this.#alertIcon.innerHTML = newVal && !hasSlot
          ? `<ea-icon class="ea-alert__icon" icon="icon-${iconType[this.type]}" part="icon"></ea-icon>`
          : '<slot name="icon"></slot>'
      }
    },
    center: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#container.className = this.updateContainerClasslist()
      }
    },
    "show-after": {
      type: Number,
      default: 0,
      observer: (newVal) => {
        newVal = Math.abs(newVal)
        this.#container.classList.toggle('ea-alert--hide', newVal > 0);

        timeout(() => {
          this.dispatchEvent(new CustomEvent('open'));

          this.#container.classList.remove('ea-alert--hide');
        }, newVal)
      }
    },
    "hide-after": {
      type: Number,
      default: 300,
      observer: (newVal) => { }
    },
    "auto-close": {
      type: Number,
      default: 0,
      observer: (newVal) => {
        if (newVal && this.isMounted) timeout(() => this.#closeEvent(), this["auto-close"]);
      }
    }
  })

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist('ea-alert', {
      ['--' + this.type]: this.type,
      ['--' + this.effect]: this.effect,
      ['--center']: this.center,
    });
  }

  constructor() {
    super();

    this.isMounted = false;

    this.stylesheet = stylesheet;
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-alert' part='container'>
        <span class="ea-alert__icon-wrap" part='icon-wrap'>
          <slot name='icon'></slot>
        </span>
        <div class="ea-alert__content" part='content-wrap'>
          <span class="ea-alert__title" part='title'>
            <slot name="title"></slot>
          </span>
          <p class="ea-alert__description" part='description'>
            <slot></slot>
          </p>
          <span class="ea-alert__close-btn" part="close-btn"></span>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector('.ea-alert');
    this.#alertIcon = this.shadowRoot.querySelector('.ea-alert__icon-wrap');
    this.#alertContent = this.shadowRoot.querySelector('.ea-alert__content');
    this.#alertTitle = this.shadowRoot.querySelector('.ea-alert__title');
    this.#alertDescription = this.shadowRoot.querySelector('.ea-alert__description');
    this.#alertCloseBtn = this.shadowRoot.querySelector('.ea-alert__close-btn');

    this.isMounted = true;
  }

  #closeEvent = (e) => {
    timeout(() => {
      this.#abortController.abort();

      this.#container.classList.add('ea-alert--before-close');

      this.#container.addEventListener("transitionend", () => {
        this.dispatchEvent(new CustomEvent('close', {
          detail: {
            visible: false,
          }
        }));
        this.remove();
      }, { once: true })

    }, this["hide-after"]);
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController = new AbortController();

    this.$render();

    this.title = this.title;
    this.description = this.description;
    this.type = this.type;
    this.effect = this.effect;
    this["close-text"] = this["close-text"];
    this.closable = this.closable;
    this["show-icon"] = this["show-icon"];

    this["show-after"] = this["show-after"];
    this["hide-after"] = this["hide-after"];
    this["auto-close"] = this["auto-close"];

    if (this.closable) this.#alertCloseBtn.addEventListener('click', this.#closeEvent, { signal: this.#abortController.signal });
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get('ea-alert')) {
  window.customElements.define('ea-alert', EaAlert);
}