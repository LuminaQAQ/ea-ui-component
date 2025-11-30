// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

import "../ea-step/index.js"

import { stylesheet } from './src/style/stylesheet.js';

export class EaSteps extends Base {
    #wrap;
    #stepChildren;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-steps_wrap" part="container">
                <slot></slot>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-steps_wrap');

        this.build(shadowRoot, stylesheet);
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

    connectedCallback() {
        const stepChildrens = this.querySelectorAll('ea-step');
        this.#stepChildren = stepChildrens;

        this.#stepChildren.forEach((item, index) => {
            item.setAttribute('index', index);
            item.index = index;
        });
        this.#stepChildren[this.#stepChildren.length - 1].isLast = true;

        this.simple = this.simple;

        this.active = this.active;
    }
}

if (!customElements.get('ea-steps')) {
    customElements.define('ea-steps', EaSteps);
}