import Base from '../Base.js';
import "../ea-icon/index.js"
import "../ea-infinite-scroll-item/index.js"

export class EaInfiniteScroll extends Base {
    #loadingSlot;

    #noMoreSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-infinite_wrap' part='container'>
                <slot></slot>
            </div>
            <div class='ea-infinite_loading-wrap' part='loading-wrap'>
                <slot name='loading' style="display: none;"></slot>
            </div>
            <div class='ea-infinite_noMore-wrap' part='noMore-wrap'>
                <slot name='noMore' style="display: none;"></slot>
            </div>
        `;

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

    #getLastChild() {
        const items = this.querySelectorAll('ea-infinite-item');
        return items[items.length - 1];
    }

    #initBottomReachedObserver() {
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

            }, this.delay || 200);
        }, { root: this.parentNode, rootMargin: '10px', threshold: 0.1 });

        // 初始观察
        observer.observe(item);
    }
    connectedCallback() {
        this.delay = this.delay;

        this.#initBottomReachedObserver();
    }
}

if (!customElements.get('ea-infinite')) {
    customElements.define('ea-infinite', EaInfiniteScroll);
}