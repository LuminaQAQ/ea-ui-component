// @ts-nocheck
import Base from '../Base.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaCollapseItem extends Base {
    #wrap;

    #titleWrap;
    #titleContent;
    #titleIcon;

    #contentWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-collapse-item_wrap" part="container">
                <div class="ea-collapse-item_title" part="title-wrap">
                    <span class="ea-collapse-item_title-content" part="title-content"></span>
                    <span class="ea-collapse-item_title-icon" part="title-icon"></span>
                </div>
                <div class="ea-collapse-item_content" part="content-wrap">
                    <slot></slot>
                </div>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-collapse-item_wrap');
        this.#titleWrap = shadowRoot.querySelector('.ea-collapse-item_title');
        this.#titleContent = shadowRoot.querySelector('.ea-collapse-item_title-content');
        this.#titleIcon = shadowRoot.querySelector('.ea-collapse-item_title-icon');
        this.#contentWrap = shadowRoot.querySelector('.ea-collapse-item_content');

        this.build(shadowRoot, stylesheet);
    }

    // ------- title 标题 -------
    // #region
    get title() {
        return this.getAttribute('title');
    }

    set title(title) {
        this.setAttribute('title', title);

        this.#titleContent.innerHTML = title;
    }
    // #endregion
    // ------- end -------

    // ------- name 唯一标识符 -------
    // #region
    get name() {
        return this.getAttribute('name');
    }

    set name(name) {
        this.setAttribute('name', name);
    }
    // #endregion
    // ------- end -------

    // ------- isOpen 是否展开 -------
    // #region
    get isOpen() {
        return this.getAttrBoolean('is-open') || false;
    }

    set isOpen(flag) {
        if (flag === this.isOpen) return;

        this.toggleAttr('is-open', flag);

        const height = this.#contentWrap.scrollHeight;

        if (this.isOpen) {
            this.#contentWrap.style.height = `${height}px`;
            this.#contentWrap.style.paddingBottom = '20px';
            this.#titleIcon.style.rotate = '45deg';
        } else {
            this.#contentWrap.style.height = '0px';
            this.#contentWrap.style.paddingBottom = '0px';
            this.#titleIcon.style.rotate = '-45deg';
        }
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.title = this.title;
        this.name = this.name;

        this.#titleWrap.addEventListener('click', (e) => {
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    name: this.name,
                    isOpen: this.isOpen,
                },
                bubbles: true,
                composed: true,
            }));
        });
    }
}

if (!customElements.get('ea-collapse-item')) {
    customElements.define('ea-collapse-item', EaCollapseItem);
}
