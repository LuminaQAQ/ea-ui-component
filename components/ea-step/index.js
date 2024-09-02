// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { timeout } from '../../utils/timeout.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaStep extends Base {
  #wrap;

  #headWrap;
  #stepIcon;
  #stepBar;

  #titleWrap;
  #descriptionWrap;

  #headSlot;
  #titleSlot;
  #descriptionSlot;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="ea-step_wrap" part="container">
        <div class="ea-step_head-wrap" part="head-wrap">
          <div class="ea-step_bar" part="step-bar"></div>
          <div class="ea-step_head-icon" part="icon"></div>
        </div>
        <div class="ea-step_main-wrap" part="main-wrap">
          <div class="ea-step_title-wrap" part="title-wrap">
            <slot name="title"></slot>
          </div>
          <div class="ea-step_description-wrap" part="description-wrap">
            <slot name="description"></slot>
          </div>
        </div>
      </div>
    `;

    this.#wrap = shadowRoot.querySelector('.ea-step_wrap');
    this.#headWrap = shadowRoot.querySelector('.ea-step_head-wrap');
    this.#stepIcon = shadowRoot.querySelector('.ea-step_head-icon');
    this.#stepBar = shadowRoot.querySelector('.ea-step_bar');

    this.#titleWrap = shadowRoot.querySelector('.ea-step_title-wrap');
    this.#titleSlot = shadowRoot.querySelector('slot[name="title"]');
    this.#descriptionWrap = shadowRoot.querySelector('.ea-step_description-wrap');
    this.#descriptionSlot = shadowRoot.querySelector('slot[name="description"]');

    this.build(shadowRoot, stylesheet);
  }

  // ------- title 步骤的标题(如:步骤一) -------
  // #region
  get title() {
    return this.getAttribute('title');
  }

  set title(value) {
    if (!value) return;

    const slot = this.querySelector('[slot="title"]');

    if (!slot) {
      this.#titleWrap.innerText = value;
    } else {
      value = slot.innerHTML;
      this.#titleSlot.innerHTML = value;
    }

    this.setAttribute('title', value);
  }
  // #endregion
  // ------- end -------

  // ------- description 步骤的描述 -------
  // #region
  get description() {
    return this.getAttribute('description');
  }

  set description(value) {
    if (!value) return;

    const slot = this.querySelector('[slot="description"]');

    if (!slot) {
      this.#descriptionWrap.innerText = value;
    } else {
      value = slot.innerHTML;
      this.#descriptionSlot.innerHTML = value;
    }

    this.setAttribute('description', value);
  }
  // #endregion
  // ------- end -------

  // ------- space 步骤之间的间距 -------
  // #region
  get space() {
    return this.getAttribute('space') || '50%';
  }

  set space(value) {
    this.setAttribute('space', value || '50%');

    this.style.flexBasis = value || '50%';
  }
  // #endregion
  // ------- end -------

  // ------- icon 步骤的图标 -------
  // #region
  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    if (!value) {
      this.#stepIcon.innerHTML = this.index + 1;
      this.#stepIcon.classList.add('is-text');
      value = this.index + 1;
    } else {
      this.#stepIcon.innerHTML = `
          <ea-icon icon="${value}" size="24"></ea-icon>
      `;
    }

    this.setAttribute('icon', value);
  }
  // #endregion
  // ------- end -------

  // ------- active 当前的步骤 -------
  // #region
  get active() {
    return this.getAttrBoolean('active') || false;
  }

  set active(value) {
    this.toggleAttr('active', value);
  }
  // #endregion
  // ------- end -------

  // ------- is-last 是否最后一个步骤 -------
  // #region
  get isLast() {
    return this.getAttrBoolean('is-last') || false;
  }

  set isLast(value) {
    this.toggleAttr('is-last', value);

    this.#headWrap.classList.toggle('is-last', value);
  }
  // #endregion
  // ------- end -------

  // ------- status 步骤的状态 -------
  // #region
  get status() {
    return this.getAttribute('status');
  }

  set status(value) {
    this.setAttribute('status', value);

    this.#wrap.classList.toggle('is-finish', value === 'finish');
    this.#wrap.classList.toggle('is-process', value === 'process');
    this.#wrap.classList.toggle('is-wait', value === 'wait');

    if (value === 'finish') {
      const isIcon = this.#stepIcon.querySelector('ea-icon');

      if (!isIcon) this.#stepIcon.innerHTML = `
          <ea-icon icon="icon-ok" color="#67c23a" style="font-size: 14px; line-height: 14px;"></ea-icon>
      `;
    } else {
      this.#stepIcon.innerHTML = this.index + 1;
    }
  }
  // #endregion
  // ------- end -------

  // ------- simple 简洁模式 -------
  // #region
  get simple() {
    return this.getAttrBoolean('simple') || false;
  }

  set simple(value) {
    this.toggleAttr('simple', value);

    this.#wrap.classList.toggle('is-simple', value);

    if (value && !this.isLast) {
      this.#stepBar.innerHTML = `
        <ea-icon icon="icon-angle-right" color="#c0c4cc" style="font-size: 24px; line-height: 24px;"></ea-icon>
      `;

      this.#stepBar.style.flex = "1";
      this.#stepBar.style.textAlign = "center";

      this.#descriptionWrap.remove();

      this.#wrap.appendChild(this.#stepBar);
    } else if (value && !this.isLast) {
      this.#stepBar.innerHTML = "";
    }
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    this.title = this.title;
    this.description = this.description;
    this.simple = this.simple;;

    timeout(() => {
      this.icon = this.icon;
    }, 20);
  }
}

if (!customElements.get('ea-step')) {
  customElements.define('ea-step', EaStep);
}