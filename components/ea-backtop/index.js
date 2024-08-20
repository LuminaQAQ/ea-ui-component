// @ts-nocheck
import Base from '../Base.js';
import "../ea-icon/index.js"

import { stylesheet } from './src/style/stylesheet.js';

import { initScrollBtn } from './src/utils/initScrollBtn.js';

export class EaBacktop extends Base {
    #wrap;

    #iconSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-backtop_wrap" part='container' style='display: none'>
                <slot></slot>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-backtop_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- target 触发滚动的对象 -------
    // #region
    get target() {
        return this.getAttribute('target') || '';
    }

    set target(value) {
        this.setAttribute('target', value);
    }
    // #endregion
    // ------- end -------

    // ------- right 滚动按钮距离右边的距离 -------
    // #region
    get right() {
        return this.getAttribute('right') || '40px';
    }

    set right(value) {
        this.setAttribute('right', value);

        this.#wrap.style.right = value;
    }
    // #endregion
    // ------- end -------

    // ------- bottom 滚动按钮距离下边的距离 -------
    // #region
    get bottom() {
        return this.getAttribute('bottom') || '40px';
    }

    set bottom(value) {
        this.setAttribute('bottom', value);

        this.#wrap.style.bottom = value;
    }
    // #endregion
    // ------- end ------- 

    // ------- icon 图标类名 -------
    // #region
    get icon() {
        return this.getAttribute('icon') || "icon-angle-up";
    }

    set icon(value) {
        this.setAttribute('icon', value);

        this.#wrap.innerHTML = `
            <ea-icon icon="${value}" part='icon'></ea-icon>
        `;
    }
    // #endregion
    // ------- end -------

    // ------- visibility-height 滚动按钮显示和隐藏的触发条件 -------
    // #region
    get visibilityHeight() {
        return this.getAttribute('visibility-height') || 200;
    }

    set visibilityHeight(value) {
        this.setAttribute('visibility-height', value);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.target = this.target;
        this.right = this.right;
        this.bottom = this.bottom;
        this.visibilityHeight = this.visibilityHeight;
        this.icon = this.icon;

        initScrollBtn.call(this, this.#wrap, this.target, this.visibilityHeight);
    }
}

if (!customElements.get('ea-backtop')) {
    customElements.define('ea-backtop', EaBacktop);
}