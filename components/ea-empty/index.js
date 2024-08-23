// @ts-nocheck
import Base from '../Base.js';

import { emptyStatusSVG } from './src/assets/emptyStatusSVG.js';
import { stylesheet } from './src/style/stylesheet.js';

export class EaEmpty extends Base {
    #wrap;
    #imageWrap;
    #descriptionWrap;
    #slot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-empty_wrap" part="container">
                <div class="ea-empty_image" part="image">
                    ${emptyStatusSVG}
                </div>
                <div class="ea-empty_description" part="description">
                    暂无数据
                </div>
                <div class="ea-empty_bottom" part="bottom">
                    <slot></slot>
                </div>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-empty_wrap');
        this.#imageWrap = shadowRoot.querySelector('.ea-empty_image');
        this.#descriptionWrap = shadowRoot.querySelector('.ea-empty_description');
        this.#slot = shadowRoot.querySelector('slot');

        this.build(shadowRoot, stylesheet);
    }

    // ------- description 描述文字 -------
    // #region
    get description() {
        return this.getAttribute('description') || "暂无数据";
    }

    set description(value) {
        this.setAttribute('description', value);
        this.#descriptionWrap.innerHTML = value;
    }
    // #endregion
    // ------- end -------

    // ------- image 自定义图片 -------
    // #region
    get image() {
        return this.getAttribute('image') || "";
    }

    set image(value) {
        if (!value) return;

        this.setAttribute('image', value);

        const image = new Image();
        image.src = value;
        image.onload = () => {
            this.#imageWrap.innerHTML = `<img src="${value}" />`;
        }
    }
    // #endregion
    // ------- end -------

    // ------- image-size 自定义图片大小 -------
    // #region
    get imageSize() {
        return this.getAttribute('image-size') || "128";
    }

    set imageSize(value) {
        if (!value) return;

        this.setAttribute('image-size', value);
        this.#imageWrap.style.width = value + "px";
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.description = this.description;

        this.image = this.image;

        this.imageSize = this.imageSize;
    }
}

if (!customElements.get('ea-empty')) {
    customElements.define('ea-empty', EaEmpty);
}