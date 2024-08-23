// @ts-nocheck
import Base from '../Base.js';
import "../ea-infinite-scroll-item/index.js"

import { createElement, createSlotElement } from '../../utils/createElement.js';
import { initBottomReachedObserver } from './src/utils/initBottomReachedObserver.js';

export class EaInfiniteScroll extends Base {
    #wrap;

    #loadingSlot;

    #noMoreSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-infinite_wrap' part='container'>
                <slot></slot>
            </div>
            <slot name='loading' style="display: none;"></slot>
            <slot name='noMore' style="display: none;"></slot>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-infinite_wrap');
        this.#loadingSlot = shadowRoot.querySelector('slot[name="loading"]');
        this.#noMoreSlot = shadowRoot.querySelector('slot[name="noMore"]');
    }

    // ------- delay 节流时延, 单位为ms -------
    // #region
    get delay() {
        return this.getAttrNumber('delay') || 200;
    }

    set delay(value) {
        this.setAttribute('delay', value);
    }
    // #endregion
    // ------- end -------

    // ------- loading 是否在加载时显示加载状态 -------
    // #region
    get loading() {
        return this.getAttrBoolean('loading');
    }

    set loading(value) {
        if (value === undefined) return;

        this.setAttribute('loading', value);
    }
    // #endregion
    // ------- end -------

    // ------- disabled 是否禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled') || false;
    }

    set disabled(value) {
        this.setAttribute('disabled', value);

        if (value) this.#noMoreSlot.style.display = 'block';
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.delay = this.delay;
        
        initBottomReachedObserver.call(this, this.#loadingSlot, this.delay);
    }
}

if (!customElements.get('ea-infinite')) {
    customElements.define('ea-infinite', EaInfiniteScroll);
}