// @ts-nocheck
import { timeout } from '../../utils/timeout.js';
import { handleMenuItemEvent } from './src/utils/handleMenuItemEvent.js';

import { stylesheet } from './src/style/stylesheet.js';

import Base from '../Base.js';
import '../ea-icon/index.js'
import "../ea-menu-item/index.js"
import "../ea-submenu/index.js"
import "../ea-menu-item-group/index.js"

export class EaMenu extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-menu_wrap" part="container">
                <slot></slot>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-menu_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- mode 顶栏排列方式 -------
    // #region
    get mode() {
        return this.getAttribute('mode') || 'vertical';
    }

    set mode(value) {
        this.setAttribute('mode', value);

        this.#wrap.classList.toggle('is-vertical', value === 'vertical');
        this.querySelectorAll('ea-submenu').forEach((item) => {
            item.mode = value;
        });
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

        this.#wrap.style.backgroundColor = value;
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
    }
    // #endregion
    // ------- end -------

    // ------- collapse 是否折叠 -------
    // #region
    get collapse() {
        return this.getAttrBoolean('collapse');
    }

    set collapse(value) {
        this.toggleAttr('collapse', value);

        this.querySelectorAll('ea-menu-item-group').forEach((item) => {
            if (this.mode === 'vertical') item.collapse = !value;
        });
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.mode = this.mode;

        this.collapse = true;

        this.backgroundColor = this.backgroundColor;
        this.textColor = this.textColor;
        this.activeTextColor = this.activeTextColor;

        const menuItems = this.querySelectorAll('ea-menu-item');
        const subMenuItems = this.querySelectorAll('ea-submenu');
        const menuItemGroups = this.querySelectorAll('ea-menu-item-group');

        handleMenuItemEvent.call(this, menuItems, subMenuItems, menuItemGroups);

        const callback = (item, index) => {
            item.backgroundColor = this.backgroundColor;
            item.textColor = this.textColor;
            item.activeTextColor = this.activeTextColor;
        }
        menuItems.forEach(callback);

        subMenuItems.forEach(callback);

        menuItemGroups.forEach(callback);
    }
}

if (!customElements.get('ea-menu')) {
    customElements.define('ea-menu', EaMenu);
}