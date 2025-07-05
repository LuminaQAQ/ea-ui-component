// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

import { stylesheet } from './src/style/stylesheet.js';

export class EaMenuItem extends Base {
    #wrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-menu-item_wrap" part="container">
                <slot></slot>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-menu-item_wrap');

        this.build(shadowRoot, stylesheet);
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
        if (!value) return;

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

    connectedCallback() {
        this.actived = this.actived;

        this.disabled = this.disabled;

        this.#wrap.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('item-selected', {
                detail: {
                    index: this.index,
                    title: this.textContent,
                },
            }));
        });
    }
}

if (!customElements.get('ea-menu-item')) {
    customElements.define('ea-menu-item', EaMenuItem);
}