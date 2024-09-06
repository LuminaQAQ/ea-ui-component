import Base from '../Base.js';
import "../ea-icon/index.js"
import { handleDefaultAttrIsTrue } from '../../utils/handleDefaultAttrIsTrue.js';

import { createElement } from '../../utils/createElement.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaAlert extends Base {
  #wrap;

  #alertContent;
  #alertTitle;
  #closeIcon;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class='ea-alert_wrap' part='container'>
        <div class="ea-alert_content" part='content-wrap'>
          <span class="ea-alert_title" part='title'></span>
          <ea-icon class="ea-alert_close-icon" part='icon'></ea-icon>
        </div>
      </div>
    `;

    this.#wrap = shadowRoot.querySelector('.ea-alert_wrap');
    this.#alertContent = shadowRoot.querySelector('.ea-alert_content');
    this.#alertTitle = shadowRoot.querySelector('.ea-alert_title');
    this.#closeIcon = shadowRoot.querySelector('.ea-alert_close-icon');

    this.build(shadowRoot, stylesheet);
  }

  // ------- type 获取提示类型 -------
  // #region
  get type() {
    return this.getAttribute('type') || "info";
  }

  set type(value) {
    this.setAttribute('type', value);

    this.#wrap.classList.add(`ea-alert--${value}`);
  }
  // #endregion
  // ------- end -------

  // ------- title 获取提示标题 -------
  // #region
  get title() {
    return this.getAttribute('title') || "";
  }

  set title(value) {
    this.setAttribute('title', value);

    this.#alertTitle.innerText = value;
  }
  // #endregion
  // ------- end -------

  // ------- closable 是否可关闭 -------
  // #region
  get closable() {
    return handleDefaultAttrIsTrue('closable');
  }

  set closable(value) {
    this.setAttribute('closable', value);

    this.#closeIcon.style.display = value ? 'block' : 'none';
  }
  // #endregion
  // ------- end -------

  // ------- close-text 关闭按钮文字 -------
  // #region
  get closeText() {
    return this.getAttribute('close-text') || "";
  }

  set closeText(value) {
    this.setAttribute('close-text', value);
  }
  // #endregion
  // ------- end -------

  // ------- effect 亮色与暗色主题 -------
  // #region
  get effect() {
    return this.getAttribute('effect') || "light";
  }

  set effect(value) {
    this.setAttribute('effect', value);

    this.#wrap.classList.toggle('ea-alert--dark', value === "dark");
  }
  // #endregion
  // ------- end -------

  // ------- show-icon 是否显示图标 -------
  // #region
  get showIcon() {
    return this.getAttrBoolean('show-icon') || false;
  }

  set showIcon(value) {
    this.setAttribute('show-icon', value);
  }
  // #endregion
  // ------- end -------

  // ------- center 是否居中 -------
  // #region
  get center() {
    return this.getAttrBoolean('center') || false;
  }

  set center(value) {
    this.setAttribute('center', value);

    this.#alertContent.classList.toggle('ea-alert--center', value);
  }
  // #endregion
  // ------- end -------

  // ------- description 提示描述 -------
  // #region
  get description() {
    return this.getAttribute('description') || "";
  }

  set description(value) {
    this.setAttribute('description', value);
  }
  // #endregion
  // ------- end -------

  #initClosableElement() {
    if (!this.closable) return;

    this.closable === true && this.closeText === "" ? this.#closeIcon.icon = 'icon-cancel' : this.#closeIcon.innerText = this.closeText;

    this.#closeIcon.addEventListener('click', () => {
      this.#wrap.style.opacity = 0;

      this.dispatchEvent(new CustomEvent('close', { detail: { target: this.#closeIcon } }));
    });

    this.#wrap.addEventListener('transitionend', () => {
      this.remove();
    });
  }

  get iconList() {
    return {
      success: 'ok-circled',
      info: 'info',
      warning: 'attention-alt',
      error: 'cancel-circled'
    }
  }

  #initShowIconElement() {
    if (!this.showIcon) return;

    const icon = createElement('ea-icon');
    icon.icon = `icon-${this.iconList[this.type]}`;
    icon.classList.add(`ea-alert--${this.type}`);

    this.#alertTitle.insertBefore(icon, this.#alertTitle.firstChild);
  }

  #initDescriptionElement() {
    if (!this.description) return;

    const descriptionElement = createElement('p', 'ea-alert_description');
    descriptionElement.part = 'description';
    this.#wrap.style.flexDirection = 'column';

    descriptionElement.innerText = this.description;
    this.#wrap.appendChild(descriptionElement);
  }

  connectedCallback() {
    this.type = this.type;

    this.title = this.title;

    this.closable = this.closable;

    this.closeText = this.closeText;

    this.effect = this.effect;

    this.center = this.center;

    this.#initClosableElement();
    this.#initShowIconElement();
    this.#initDescriptionElement();
  }
}

if (!customElements.get('ea-alert')) {
  customElements.define('ea-alert', EaAlert);
}