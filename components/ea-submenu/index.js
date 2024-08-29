// @ts-nocheck
import { timeout } from '../../utils/timeout.js';
import Base from '../Base.js';
import '../ea-icon/index.js'

import { stylesheet } from './src/style/stylesheet.js';

export class EaSubmenu extends Base {
    #wrap;
    #titleWrap;
    #subItemsWrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-submenu_wrap" part="container">
                <div class="ea-submenu_title_wrap" part="title">
                    <slot name="title"></slot>
                    <ea-icon class="ea-submenu_dropdown_icon" icon="icon-angle-down"></ea-icon>
                </div>
                <div class="ea-submenu_items_wrap" part="dropdown-wrap">
                    <slot></slot>
                </div>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-submenu_wrap');
        this.#titleWrap = shadowRoot.querySelector('.ea-submenu_title_wrap');
        this.#subItemsWrap = shadowRoot.querySelector('.ea-submenu_items_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- actived 菜单激活状态 -------
    // #region
    get actived() {
        return this.getAttrBoolean('actived');
    }

    set actived(value) {
        this.setAttribute('actived', value);

        this.#wrap.classList.toggle('is-actived', value);
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

    // ------- mode 菜单模式 -------
    // #region
    get mode() {
        return this.getAttribute('mode') || 'horizontal';
    }

    set mode(value) {
        this.setAttribute('mode', value);

        this.#wrap.classList.toggle('is-vertical', value === 'vertical');
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.disabled = this.disabled;

        const items = this.querySelectorAll('ea-menu-item');
        items.forEach((item, index) => {
            item.isSubItem = true;

            item.addEventListener('item-selected', (e) => {
                this.actived = true;
            });
        });

        timeout(() => {
            this.#subItemsWrap.style.display = "block";
        }, 20);
    }
}

if (!customElements.get('ea-submenu')) {
    customElements.define('ea-submenu', EaSubmenu);
}