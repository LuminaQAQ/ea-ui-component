// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

import { createElement, createSlotElement } from "../../utils/createElement.js"

const stylesheet = `
.ea-container_wrap {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.ea-container_wrap.is-vertical {
  flex-direction: column;
}
`;

export class EaContainer extends Base {
    #wrap;

    #slot;

    get CONTAINER_TYPE() {
        return ['ea-header', 'ea-main', 'ea-footer', 'ea-container', 'ea-aside'];
    }

    // ------- direction 排列方向 -------
    // #region
    get direction() {
        return ['horizontal', 'vertical'].includes(this.getAttribute('direction')) || 'horizontal';
    }

    set direction(value) {
        this.setAttribute('direction', value);
        this.#wrap.classList.toggle('is-vertical', value === 'horizontal');
    }
    // #endregion
    // ------- end -------

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-container_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;
        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    #handleContainerChildren(containers) {
        const eachContainerTagName = containers.map(item => item.tagName.toLowerCase());

        containers.forEach(item => {
            if (!this.CONTAINER_TYPE.includes(item.tagName.toLowerCase())) {
                item.remove();
            }

            if (item.tagName.toLowerCase() === 'ea-container') {
                item.style.flex = '1';
            }
        });

        if (eachContainerTagName.includes('ea-header') || eachContainerTagName.includes('ea-footer')) {
            this.direction = 'horizontal';
        } else {
            this.direction = this.direction;
        }
    }

    #init() {
        const that = this;

        const containers = Array.from(this.children);

        this.#handleContainerChildren(containers);
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-container')) {
    customElements.define('ea-container', EaContainer);
}