// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

`;

export class EaInfiniteScroll extends Base {
    #wrap;

    #loadingSlot;

    #noMoreSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-infinite_wrap';
        wrap.part = "wrap";

        const slot = createSlotElement("");
        wrap.appendChild(slot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);

        const loadingSlot = createSlotElement("loading");
        loadingSlot.style.display = "none";
        this.shadowRoot.appendChild(loadingSlot);

        const noMoreSlot = createSlotElement("noMore");
        noMoreSlot.style.display = "none";
        this.shadowRoot.appendChild(noMoreSlot);

        this.#loadingSlot = loadingSlot;
        this.#noMoreSlot = noMoreSlot;
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

    #getLastChild() {
        const items = this.querySelectorAll('ea-infinite-item');
        return items[items.length - 1];
    }

    #initBottomReachedObserver(delay) {
        if (this.disabled) return;

        let item = this.#getLastChild();
        let timer = null;

        const observer = new IntersectionObserver((entries) => {
            const { isIntersecting } = entries[0];
            if (this.disabled) {
                observer.disconnect();
                return;
            }

            if (!isIntersecting || timer) return;

            if (this.loading) this.#loadingSlot.style.display = 'block';

            observer.unobserve(item);

            timer = setTimeout(() => {
                this.dispatchEvent(new CustomEvent('bottomReached'));

                clearTimeout(timer);
                timer = null;

                item = this.#getLastChild();
                observer.observe(item);
                this.#loadingSlot.style.display = 'none';

            }, delay || 200);
        }, { root: this.parentNode, rootMargin: '10px', threshold: 0.1 });

        // 初始观察
        observer.observe(item);
    }

    init() {
        const that = this;

        this.delay = this.delay;

        this.#initBottomReachedObserver(this.delay);
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-infinite')) {
    customElements.define('ea-infinite', EaInfiniteScroll);
}

export class EaInfiniteScrollItem extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-infinite-item_wrap';

        const slot = createSlotElement("");
        wrap.appendChild(slot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    init() {
        const that = this;
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-infinite-item')) {
    customElements.define('ea-infinite-item', EaInfiniteScrollItem);
}