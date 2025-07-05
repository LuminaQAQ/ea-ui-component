import Base from '../Base.js';

import { imageSVG } from './src/assets/imageSVG.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaSkeletonItem extends Base {
    #wrap;
    get variantOptions() {
        return ["text", "image", "p", "h1", "h2", "h3", "h4", "h5", "h6"];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-skeleton-item_wrap" part="container"></div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-skeleton-item_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- style html标签上的样式 -------
    // #region
    get elementStyle() {
        return this.getAttribute('style');
    }

    set elementStyle(value) {
        if (!value) return;

        this.#wrap.setAttribute('style', value);
    }
    // #endregion
    // ------- end -------

    // ------- variant html标签标识 -------
    // #region
    get variant() {
        return this.getAttribute('variant');
    }

    set variant(value) {
        this.variantOptions.includes(value) ? this.setAttribute('variant', value) : this.setAttribute('variant', 'text');

        if (value === "image") this.#wrap.innerHTML = imageSVG;

        this.#wrap.classList.add("ea-skeleton_" + this.variant);
    }
    // #endregion
    // ------- end -------

    // ------- animated 是否带有动画 -------
    // #region
    get animated() {
        return this.getAttrBoolean('animated');
    }

    set animated(value) {
        if (!value) return;
        this.setAttribute('animated', value);

        this.#wrap.classList.toggle("animated", value);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.style.display = "block";

        this.variant = this.variant;

        this.animated = this.animated;
    }
}

if (!customElements.get('ea-skeleton-item')) {
    customElements.define('ea-skeleton-item', EaSkeletonItem);
}