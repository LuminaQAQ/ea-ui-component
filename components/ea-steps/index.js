// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-step/index.js"

const stylesheet = `
.ea-steps_wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.ea-steps_wrap ::slotted(ea-step) {
  flex-basis: 50%;
}
.ea-steps_wrap.is-simple {
  justify-content: unset;
}
`;

export class EaSteps extends Base {
    #wrap;
    #stepChildren;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-steps_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }


    // ------- active 当前的步骤 -------
    // #region
    get active() {
        return this.getAttrNumber('active') || 0;
    }

    set active(value) {
        this.setAttribute('active', value);

        this.#stepChildren.forEach((item, index) => {
            if (index < value) {
                item.status = 'finish';
            } else if (index > value) {
                item.status = 'wait';
            } else {
                item.status = 'process';
            }
        });
    }
    // #endregion
    // ------- end -------

    // ------- space 步骤之间的间距 -------
    // #region
    get space() {
        return this.getAttribute('space') || '50%';
    }

    set space(value) {
        this.setAttribute('space', value);

        this.#stepChildren.forEach((item, index) => {
            if (index < this.#stepChildren.length - 1) item.space = value;
        });
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

        this.#stepChildren.forEach((item, index) => {
            item.simple = value;
            this.#wrap.classList.toggle('is-simple', value);

            if (index < this.#stepChildren.length - 1) item.space = value ? 'auto' : this.space;
        });
    }
    // #endregion
    // ------- end -------

    #init() {
        const that = this;

        const stepChildrens = this.querySelectorAll('ea-step');
        this.#stepChildren = stepChildrens;

        this.#stepChildren.forEach((item, index) => {
            item.setAttribute('index', index);
            item.index = index;
        });
        this.#stepChildren[this.#stepChildren.length - 1].isLast = true;

        this.simple = this.simple;

        this.active = this.active;

        this.space = this.space;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-steps')) {
    customElements.define('ea-steps', EaSteps);
}