// @ts-nocheck
import Base from '../Base.js';
import "../ea-icon/index.js";

import { stylesheet } from './src/style/stylesheet.js';


export class EaLoading extends Base {
    #wrap;

    #loadingWrap;

    #spinner;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <div class="ea-loading_wrap" part="container">
            <div class="ea-loading_mask" part="mask-mask">
                <ea-icon icon="icon-spin6 animate-spin" class="ea-loading_spinner" part="icon"></ea-icon>
            </div>
            <slot></slot>
        </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-loading_wrap');
        this.#loadingWrap = shadowRoot.querySelector('.ea-loading_mask');
        this.#spinner = shadowRoot.querySelector('.ea-loading_spinner');

        this.build(shadowRoot, stylesheet);
    }

    // ------- loading 加载状态 -------
    // #region
    get loading() {
        return this.getAttrBoolean('loading') || false;
    }

    set loading(flag) {
        this.setAttribute('loading', flag);

        this.#wrap.classList.toggle('ea-loading_wrap--loading', flag);

        this.#handleFullscreen(this.fullscreen, flag, this.lock);
    }
    // #endregion
    // ------- end -------

    // ------- spinner 加载图标 -------
    // #region
    get spinner() {
        return this.getAttribute('spinner') || "icon-spin6";
    }

    set spinner(val) {
        this.setAttribute('spinner', val);

        this.#spinner.icon = `${val} animate-spin`
    }
    // #endregion
    // ------- end -------

    // ------- spinner-size 加载图标大小 -------
    // #region
    get spinnerSize() {
        return this.getAttrNumber('spinner-size') || 16;
    }

    set spinnerSize(val) {
        this.setAttribute('spinner-size', val);

        this.#spinner.style.fontSize = `${val}px`;
    }
    // #endregion
    // ------- end -------

    // ------- background 背景颜色 -------
    // #region
    get background() {
        return this.getAttribute('background') || "hsla(0, 0%, 100%, 0.9)";
    }

    set background(val) {
        this.setAttribute('background', val);

        this.#loadingWrap.style.backgroundColor = val;
    }
    // #endregion
    // ------- end -------

    // ------- text 文本 -------
    // #region
    get text() {
        return this.getAttribute('text') || "";
    }

    set text(val) {
        if (!val) return;

        this.setAttribute('text', val);
    }
    // #endregion
    // ------- end -------

    // ------- fullscreen 全屏 -------
    // #region
    get fullscreen() {
        return this.getAttrBoolean('fullscreen') || false;
    }

    set fullscreen(val) {
        if (!val) return;

        this.setAttribute('fullscreen', val);
    }
    // #endregion
    // ------- end -------

    // ------- lock 全屏是否锁定 -------
    // #region
    get lock() {
        return this.getAttrBoolean('lock') || false;
    }

    set lock(val) {
        if (!val) return;

        this.setAttribute('lock', val);
    }
    // #endregion
    // ------- end -------

    #handleFullscreen(isFullscreen, isLoading, isLock) {
        if (isFullscreen) {
            this.#wrap.classList.toggle('ea-loading_wrap--fullscreen', isLoading);

            if (isLock) document.body.style.overflow = isLoading ? 'hidden' : 'auto';
        }
    }

    connectedCallback() {
        this.fullscreen = this.fullscreen;

        this.loading = this.loading;

        this.spinnerSize = this.spinnerSize;

        this.spinner = this.spinner;

        this.background = this.background;

        if (this.text) {
            const el = document.createElement('div');
            el.className = 'ea-loading_text';
            el.innerHTML = this.text;
            this.#loadingWrap.appendChild(el);
        }
    }
}

if (!customElements.get('ea-loading')) {
    customElements.define('ea-loading', EaLoading);
}