// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `

`;

export class EaTab extends Base {
    #wrap;

    #slot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-tab_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;
        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- name 唯一标识 -------
    // #region
    get name() {
        return this.getAttribute('name');
    }

    set name(value) {
        this.setAttribute('name', value);
    }
    // #endregion
    // ------- end -------

    // ------- type 标签样式类型 -------
    // #region
    get type() {
        return this.getAttrBoolean('type') || 'normal';
    }

    set type(value) {
        this.setAttribute('type', value);

        this.#wrap.classList.add(`ea-tab_wrap--${value}`);
    }
    // #endregion
    // ------- end -------

    // ------- actived 标签是否被选中 -------
    // #region
    get actived() {
        return this.getAttrBoolean('actived');
    }

    set actived(value) {
        this.toggleAttr('actived', value);

        this.#wrap.classList.toggle('is-actived', value);
    }
    // #endregion
    // ------- end -------

    #handleSelectedEvent() {
        this.addEventListener('click', (e) => {
            if (e.detail.value === this.getAttrBoolean('selected')) {
                this.toggleAttribute('actived', true);
            } else {
                this.toggleAttribute('actived', false);
            }

            this.dispatchEvent(new CustomEvent('tab-click', {
                detail: {
                    name: this.name,
                    event: this,
                },
                bubbles: true,
            }));
        });
    }

    handleBorderRadius(key) {
        this.#wrap.style.setProperty(key, '3px');
    }

    handleBorderRightWidth() {
        this.#wrap.style.setProperty('--border-right-width', '1px');
    }

    #init() {
        const that = this;

        this.label = this.label;

        this.#handleSelectedEvent();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-tab')) {
    customElements.define('ea-tab', EaTab);
}