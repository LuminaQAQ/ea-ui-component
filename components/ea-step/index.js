// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-step_wrap {
  color: #c0c4cc;
  transition: color 0.3s;
}
.ea-step_wrap .ea-step_head-wrap {
  position: relative;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: #fff;
  font-size: 14px;
  z-index: 1;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon.is-text {
  border-radius: 50%;
  border: 2px solid;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_bar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 2px;
  width: 100%;
  height: 2px;
  background-color: #c0c4cc;
}
.ea-step_wrap .ea-step_head-wrap.is-last {
  flex-basis: auto;
}
.ea-step_wrap .ea-step_head-wrap.is-last .ea-step_bar {
  display: none;
}
.ea-step_wrap .ea-step_main-wrap {
  white-space: normal;
  text-align: left;
}
.ea-step_wrap .ea-step_main-wrap .ea-step_title-wrap {
  font-size: 16px;
  line-height: 38px;
}
.ea-step_wrap .ea-step_main-wrap .ea-step_description-wrap {
  margin-top: -5px;
  font-size: 12px;
  line-height: 20px;
}
.ea-step_wrap.is-process {
  color: #303133;
  border-color: #303133;
}
.ea-step_wrap.is-finish {
  color: #67c23a;
  border-color: #67c23a;
}
.ea-step_wrap.is-finish .ea-step_head-wrap .ea-step_bar {
  background-color: #67c23a;
}
.ea-step_wrap.is-simple {
  display: flex;
  align-items: center;
}
.ea-step_wrap.is-simple .ea-step_head-wrap {
  position: relative;
}
.ea-step_wrap.is-simple .ea-step_head-wrap .ea-step_bar {
  position: relative;
  width: auto;
  height: auto;
  transform: translateY(0%);
  margin-left: 2px;
  flex: 1;
}
.ea-step_wrap.is-simple .ea-step_main-wrap {
  margin-left: 16px;
  line-height: 24px;
  height: 24px;
}
.ea-step_wrap.is-simple .ea-step_main-wrap .ea-step_title-wrap {
  line-height: 24px;
}
`;

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
    const wrap = document.createElement('div');
    wrap.className = 'ea-step_wrap';
    wrap.part = 'wrap';

    const stepIcon = createElement('div', 'ea-step_head-icon');
    const stepBar = createElement('div', 'ea-step_bar');
    const headWrap = createElement('div', 'ea-step_head-wrap', [stepBar, stepIcon]);
    headWrap.part = 'head-wrap';
    wrap.appendChild(headWrap);

    const titleSlot = createSlotElement('title');
    const titleWrap = createElement('div', 'ea-step_title-wrap', [titleSlot]);
    titleWrap.part = 'title-wrap';
    const descriptionSlot = createSlotElement('description');
    const descriptionWrap = createElement('div', 'ea-step_description-wrap', [descriptionSlot]);
    descriptionWrap.part = 'description-wrap';
    const mainWrap = createElement('div', 'ea-step_main-wrap', [titleWrap, descriptionWrap]);
    mainWrap.part = 'main-wrap';
    wrap.appendChild(mainWrap);

    this.#wrap = wrap;
    this.#headWrap = headWrap;
    this.#stepIcon = stepIcon;
    this.#stepBar = stepBar;

    this.#titleWrap = titleWrap;
    this.#titleSlot = titleSlot;
    this.#descriptionWrap = descriptionWrap;
    this.#descriptionSlot = descriptionSlot;

    this.build(shadowRoot, stylesheet);
    this.shadowRoot.appendChild(wrap);
  }

  // ------- title 步骤的标题(如:步骤一) -------
  // #region
  get title() {
    return this.getAttribute('title');
  }

  set title(value) {
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
        <i class="${value}" style="font-size: 24px;"></i>
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
    this.style.cssText = `
            flex-basis: auto;
            flex-grow: 0;
            flex-shrink: 0;
        `;
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
      const isIcon = this.#stepIcon.querySelector('i');

      if (!isIcon) this.#stepIcon.innerHTML = `
        <i class="icon-ok" style="font-size: 14px; line-height: 14px; color: #67c23a;"></i>
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
        <i class="icon-angle-right" style="font-size: 24px; line-height: 24px; color: #c0c4cc;"></i>
      `;

      this.style.flex = "1";
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

  #init() {
    const that = this;

    this.title = this.title;
    this.description = this.description;
    this.simple = this.simple;;


    let timer = setTimeout(() => {
      this.icon = this.icon;

      clearTimeout(timer);
      timer = null;
    }, 20);

  }

  connectedCallback() {
    this.#init();
  }
}

if (!customElements.get('ea-step')) {
  customElements.define('ea-step', EaStep);
}