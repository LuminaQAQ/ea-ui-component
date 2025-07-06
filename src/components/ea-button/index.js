import Base from "../Base.js";

import { ButtonComm } from "./src/components/ButtonComm.js";
import { HrefComm } from "./src/components/HrefComm.js";

import stylesheet from "./index.scss?inline"

export class EaButton extends Base {
  #buttonType = "button";

  /** @type {HTMLButtonElement | HTMLLinkElement} */
  #wrap;

  static observedProps = ["disabled", "type", 'text', 'plain', 'round', 'cicle', 'link', 'icon', 'loading'];

  computedClasslist = () => {
    return this.#wrap.className = [
      "ea-button",
      (this.type && `ea-button--${this.type}`) || '',
      ((this.disabled || this.loading) && "ea-button--disabled") || '',
      ((this.text || this.link) && "ea-button--text") || '',
      (this.plain && "ea-button--plain") || '',
      (this.round && "ea-button--round") || '',
      (this.circle && "ea-button--circle") || '',
      (this.size && `ea-button--${this.size}` || ''),
    ].join(" ");
  };

  /**
   * @typedef {Object} state
   * @property {boolean} disabled
   * @property {string} type
   * @property {string} text
   * @property {boolean} plain
   * @property {boolean} round
   * @property {boolean} circle
   * @property {boolean} link
   * @property {string} href
   * @property {string} size
   * @property {boolean} loading
   */

  /** @type {state} */
  state = this.properties({
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.computedClasslist()
      },
    },
    type: {
      type: ['normal', 'primary', 'success', 'warning', 'danger'],
      default: 'normal',
      observer: (newVal) => {
        this.computedClasslist()
      }
    },
    text: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.computedClasslist()
      }
    },
    plain: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.computedClasslist()
      }
    },
    round: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.computedClasslist()
      }
    },
    circle: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.computedClasslist()
      }
    },
    link: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.computedClasslist()
      }
    },
    href: {
      type: String,
      default: '',
      observer: (newVal) => {
        this.computedClasslist()

        this.#wrap.setAttribute('href', newVal)
      }
    },
    size: {
      type: ['small', 'medium', 'large'],
      default: 'medium',
      observer: (newVal) => {
        this.computedClasslist()
      }
    },
    loading: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        if (newVal) {
          const i = document.createElement('ea-icon');
          i.id = 'ea-loading-icon';
          i.icon = 'icon-spin6 animate-spin';
          i.size = this.state.size;

          this.#wrap.insertBefore(i, this.#wrap.firstChild)
        } else {
          const loadingIcon = this.#wrap?.querySelectorAll('#ea-loading-icon');
          if (loadingIcon?.length > 0) {
            loadingIcon?.forEach(item => item.remove());
          }
        }

        this.computedClasslist()
      }
    },
  })

  constructor() {
    super();

    this.stylesheet = stylesheet;

    const hrefAttr = this.getAttribute('href')
    if (hrefAttr) {
      this.shadowRoot.innerHTML = HrefComm;
      this.#buttonType = "a";
    } else {
      this.shadowRoot.innerHTML = ButtonComm;
      this.#buttonType = "button";
    }

    this.#wrap = this.shadowRoot.querySelector('.ea-button');
  }

  // ------- 禁用 -------
  // #region
  get disabled() {
    return this.state.disabled
  }

  set disabled(value) {
    this.state.disabled = value;
  }
  // #endregion
  // ------- end -------

  // ------- type属性 -------
  // #region
  get type() {
    return this.state.type;
  }

  set type(value) {
    this.state.type = value;
  }
  // #endregion
  // ------- end -------

  // ------- text 属性 -------
  // #region
  get text() {
    return this.state.text;
  }

  set text(value) {
    this.state.text = value;
  }
  // #endregion
  // ------- end -------

  // ------- plain 属性 -------
  // #region
  get plain() {
    return this.state.plain;
  }
  set plain(value) {
    this.state.plain = value;
  }
  // #endregion
  // ------- end -------

  // ------- round 属性 -------
  // #region
  get round() {
    return this.state.round;
  }
  set round(value) {
    this.state.round = value;
  }
  // #endregion
  // ------- end -------

  // ------- circle 属性 -------
  // #region
  get circle() {
    return this.state.circle;
  }
  set circle(value) {
    this.state.circle = value;
  }
  // #endregion
  // ------- end -------

  // ------- 图标按钮 -------
  // #region
  get icon() {
    return this.getAttribute('icon') || '';
  }

  set icon(value) {
    this.setAttribute('icon', value);

    if (value && !this.#wrap.querySelector('ea-icon')) {
      const eaIcon = document.createElement('ea-icon');
      eaIcon.size = this.size;
      eaIcon.icon = value;
      eaIcon.part = "icon";

      this.#wrap.insertBefore(eaIcon, this.#wrap.firstChild);
    }
  }
  // #endregion
  // ------- end -------

  // ------- 链接按钮 -------
  // #region
  get link() {
    return this.state.link;
  }

  set link(value) {
    this.state.link = value;
  }

  get href() {
    return this.state.href;
  }

  set href(value) {
    if (this.#buttonType === "button") return;

    this.state.href = value;
  }
  // #endregion
  // ------- end -------

  // ------- 按钮大小 -------
  // #region
  get size() {
    return this.state.size;
  }
  set size(value) {
    this.state.size = value;
  }
  // #endregion
  // ------- end -------

  // ------- 按钮加载 -------
  // #region
  get loading() {
    return this.state.loading;
  }

  set loading(value) {
    this.state.loading = value;
  }
  // #endregion
  // ------- end -------

  $mounted() {
    // 按钮样式
    this.plain = this.getAttribute('plain');
    this.round = this.getAttribute('round');
    this.text = this.getAttribute('text');
    this.circle = this.getAttribute('circle');

    // 按钮种类
    this.type = this.getAttribute('type');

    // 按钮大小
    this.size = this.getAttribute('size');

    // 图标
    if (this.icon) this.icon = this.icon;

    // 链接
    this.link = this.getAttribute('link');
    if (this.link) this.href = this.getAttribute('href');

    // 禁用
    this.disabled = this.getAttrBoolean("disabled")

    if (this.getAttrBoolean("loading")) this.loading = this.getAttribute('loading');
  }
}

if (!window.customElements.get("ea-button")) {
  window.customElements.define("ea-button", EaButton);
}