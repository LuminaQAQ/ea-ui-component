import { timeout } from '../../utils/timeout.js';
import Base from '../Base.js';
import "../ea-icon/index.js"

import { stylesheet } from './src/style/stylesheet.js';

export class EaBacktop extends Base {
    #wrap;

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

    #handleScrollEvent(targetName) {
        let dom = null;
        let scrollDom = null;

        if (targetName === "null" || targetName === '' || targetName === null || targetName === undefined || targetName === 'undefined') {
            dom = document;
            scrollDom = document.documentElement;
        } else {
            dom = document.querySelector(targetName);
            scrollDom = document.querySelector(targetName);
        }

        return { dom, scrollDom };
    }

    #handleBackTopBtnShow(scrollDom) {
        if (scrollDom.scrollTop > this.visibilityHeight) {
            this.#wrap.style.display = 'flex';
            this.#wrap.ontransitionend = null;

            timeout(() => {
                this.#wrap.style.opacity = 1;
            }, 10);
        } else {
            this.#wrap.style.opacity = 0;

            this.#wrap.ontransitionend = () => {
                this.#wrap.style.display = 'none';
            };
        }
    }

    #initScrollBtn() {
        const { dom, scrollDom } = this.#handleScrollEvent(this.target);

        this.#handleBackTopBtnShow(scrollDom);

        dom.addEventListener('scroll', () => {
            this.#handleBackTopBtnShow(scrollDom);
        });

        this.#wrap.addEventListener('click', function () {
            let step = 10;

            let timer = setInterval(() => {
                step += 5;
                scrollDom.scrollTop -= step;

                if (scrollDom.scrollTop <= 0) {
                    scrollDom.scrollTop = 0;
                    clearInterval(timer);
                    timer = null;

                    this.dispatchEvent(new CustomEvent('reachedTop', {}));
                }
            }, 12);

            this.dispatchEvent(new CustomEvent('backtop', {}));
        });
    }

    connectedCallback() {
        this.target = this.target;
        this.right = this.right;
        this.bottom = this.bottom;
        this.visibilityHeight = this.visibilityHeight;
        this.icon = this.icon;
        
        this.#initScrollBtn();
    }
}

if (!customElements.get('ea-backtop')) {
    customElements.define('ea-backtop', EaBacktop);
}