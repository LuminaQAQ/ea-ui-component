// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-step/index.js"

const stylesheet = `

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

    #init() {
        const that = this;

        const stepChildrens = this.querySelectorAll('ea-step');
        this.#stepChildren = stepChildrens;

        this.#stepChildren.forEach((item, index) => {
            item.setAttribute('index', index);
            item.index = index;
        });
        this.#stepChildren[this.#stepChildren.length - 1].isLast = true;

        this.active = this.active;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-steps')) {
    customElements.define('ea-steps', EaSteps);
}