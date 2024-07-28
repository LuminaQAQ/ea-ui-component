// @ts-nocheck
import { createElement, createSlotElement } from '../../utils/createElement.js';
import Base from '../Base.js';
import '../ea-icon/index.js'


const stylesheet = `

`;



export class EaMenuItem extends Base {
    #wrap;
    #slot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-menu-item_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;
        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- actived 菜单激活状态 -------
    // #region
    get actived() {
        return this.getAttrBoolean('actived');
    }

    set actived(value) {
        this.setAttribute('actived', value);

        if (this.isSubItem) {
            this.#wrap.classList.toggle('is-sub-actived', value);
        } else {
            this.#wrap.classList.toggle('is-actived', value);
        }
    }
    // #endregion
    // ------- end -------

    // ------- isSubItem 是否为子菜单 -------
    // #region
    get isSubItem() {
        return this.getAttrBoolean('is-sub-item');
    }
    set isSubItem(value) {
        this.setAttribute('is-sub-item', value);
    }
    // #endregion
    // ------- end -------

    // ------- background-color 背景颜色 -------
    // #region
    get backgroundColor() {
        return this.getAttribute('background-color') || '#fff';
    }

    set backgroundColor(value) {
        this.setAttribute('background-color', value);

        this.#wrap.style.setProperty('--normal-bgc', value);
    }
    // #endregion
    // ------- end -------

    // ------- text-color 文字颜色 -------
    // #region
    get textColor() {
        return this.getAttribute('text-color') || '#303133';
    }

    set textColor(value) {
        this.setAttribute('text-color', value);

        this.#wrap.style.setProperty('--normal-text-color', value);
    }
    // #endregion
    // ------- end -------

    // ------- active-text-color 激活文字颜色 -------
    // #region
    get activeTextColor() {
        return this.getAttribute('active-text-color') || '#409eff';
    }

    set activeTextColor(value) {
        this.setAttribute('active-text-color', value);

        this.#wrap.style.setProperty('--actived-text-color', value);
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(value) {
        this.setAttribute('disabled', value);

        this.#wrap.classList.toggle('is-disabled', value);
    }
    // #endregion
    // ------- end -------

    #handleSelectedEvent() {
        this.#wrap.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('item-selected', {
                detail: {
                    index: this.index,
                },
            }));
        });
    }

    #init() {
        const that = this;

        this.actived = this.actived;

        this.disabled = this.disabled;

        this.#handleSelectedEvent();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-menu-item')) {
    customElements.define('ea-menu-item', EaMenuItem);
}