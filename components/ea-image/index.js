// @ts-nocheck
import Base from '../Base.js';
import { createElement, createSlotElement } from '../../utils/createElement.js';

import { errorImage } from './src/assets/errorImage.js';
import { stylesheet } from './src/style/stylesheet.js';
import { initImagePreview } from './src/utils/createPreviewTools.js';
import { initImageLoadEvent } from './src/utils/initImageLoadEvent.js';

export class EaImage extends Base {
    #wrap;

    #img;
    #imgSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-image_wrap' part='container'>
                <img part='image' class='ea-image' />
                <slot name='placeholder'></slot>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-image_wrap');
        this.#img = shadowRoot.querySelector('.ea-image');
        this.#imgSlot = shadowRoot.querySelector('slot[name="placeholder"]');

        this.build(shadowRoot, stylesheet);
    }

    // ------- src 图片的路径 -------
    // #region
    get src() {
        return this.getAttribute('src') || "";
    }

    set src(src) {
        this.setAttribute('src', src);
    }
    // #endregion
    // ------- end -------

    // ------- width 图片宽度 -------
    // #region
    get width() {
        return this.getAttribute('width') || "100px";
    }

    set width(value) {
        this.setAttribute('width', value);

        this.#wrap.style.width = value;
    }
    // #endregion
    // ------- end -------

    // ------- height 图片高度 -------
    // #region
    get height() {
        return this.getAttribute('height') || "100px";
    }

    set height(value) {
        this.setAttribute('height', value);

        this.#wrap.style.height = value;
    }
    // #endregion
    // ------- end -------

    // ------- alt 图片描述 -------
    // #region
    get alt() {
        return this.getAttribute('alt') || "";
    }

    set alt(value) {
        this.setAttribute('alt', value);

        this.#img.alt = value;
    }
    // #endregion
    // ------- end -------

    // ------- fit 图片缩放模式 -------
    // #region
    get fit() {
        return this.getAttribute('fit') || "cover";
    }

    set fit(value) {
        this.setAttribute('fit', value);

        this.#img.style.objectFit = value;
    }
    // #endregion
    // ------- end -------

    // ------- lazy 图片懒加载 -------
    // #region
    get lazy() {
        return this.getAttrBoolean('lazy');
    }

    set lazy(value) {
        this.setAttribute('lazy', value);
    }
    // #endregion
    // ------- end -------

    // ------- preview 大图预览 -------
    // #region
    get preview() {
        return this.getAttrBoolean('preview');
    }

    set preview(value) {
        this.setAttribute('preview', value);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.width = this.width;
        this.height = this.height;
        this.fit = this.fit;
        this.alt = this.alt;

        this.lazy = this.lazy;
        this.src = this.src;

        this.preview = this.preview;

        initImagePreview(this.#wrap, this.#img, this.preview);
        initImageLoadEvent.call(this, this.#wrap, this.#img, this.#imgSlot, this.src, this.lazy);
    }
}

if (!customElements.get('ea-image')) {
    customElements.define('ea-image', EaImage);
}