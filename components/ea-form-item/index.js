// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';

const stylesheet = `

`;

export class EaFromItem extends Base {
    #container;

    #labelWrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-form-item_wrap' part='container'>
                <label class="ea-form-item_label-wrap" part='label'>
                    <slot name='label'></slot>
                </label>
                <slot></slot>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-form-item_wrap');

        this.#labelWrap = shadowRoot.querySelector('.ea-form-item_label-wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- label 标签 -------
    // #region
    get label() {
        return this.getAttribute('label');
    }

    set label(value) {
        this.setAttribute('label', value);

        const slot = this.#labelWrap.querySelector('slot');

        if (slot.assignedNodes().length === 0) {
            this.#labelWrap.innerHTML = value;
        }
    }
    // #endregion
    // ------- end -------

    #init() {
        this.label = this.label;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-form-item')) {
    customElements.define('ea-form-item', EaFromItem);
}