import Base from '../Base.js';
import '../ea-icon/index.js'
import { timeout } from '../../utils/timeout.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaMenuItemGroup extends Base {
    #wrap;
    #titleWrap;
    #subItemsWrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-menu-item-group_wrap" part="container">
                <div class="ea-submenu_title_wrap" part="title-wrap">
                    <slot name="title"></slot>
                    <ea-icon class="ea-submenu_dropdown_icon" icon="icon-angle-down" part="dropdown-icon"></ea-icon>
                </div>
                <div class="ea-submenu_items_wrap" part="dropdown-wrap">
                    <slot></slot>
                </div>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-menu-item-group_wrap');
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

    // ------- collapse 是否折叠 -------
    // #region
    get collapse() {
        return this.getAttrBoolean('collapse') || false;
    }

    set collapse(value) {
        this.setAttribute('collapse', value);

        this.#subItemsWrap.style.height = value ? this.#subItemsWrap.scrollHeight + 'px' : '0';
        this.#wrap.classList.toggle('is-open', value)
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.style.width = "100%";

        const items = this.querySelectorAll('ea-menu-item');
        items.forEach((item) => {
            item.isSubItem = true;

            item.addEventListener('item-selected', (e) => {
                timeout(() => {
                    this.actived = true;
                }, 20);
            });
        });

        this.#titleWrap.addEventListener('click', (e) => {
            this.collapse = !this.collapse;
        });
    }
}

if (!customElements.get('ea-menu-item-group')) {
    customElements.define('ea-menu-item-group', EaMenuItemGroup);
}