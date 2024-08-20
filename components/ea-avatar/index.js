// @ts-nocheck
import Base from '../Base.js';

import "../ea-icon/index.js"

import { defaultAvatar } from './src/assets/defaultAvatar.js';
import { errorAvatar } from './src/assets/errorAvatar.js';
import { iconAvatar, textAvatar } from './src/assets/iconAndTextAvatar.js';

import { stylesheet } from "./src/style/stylesheet.js"


export class EaAvatar extends Base {
    #wrap;

    #textSlot;

    #avatar;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class="ea-avatar_wrap" part='container'>
                <span class="ea-avatar">
                    <slot></slot>
                </span>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-avatar_wrap');
        this.#textSlot = shadowRoot.querySelector('slot');
        this.#avatar = shadowRoot.querySelector('.ea-avatar');

        this.build(shadowRoot, stylesheet);
    }

    // ------- size 图片大小 -------
    // #region
    get size() {
        const sizeNumber = this.getAttrNumber('size');
        const sizeString = this.getAttribute('size');

        if (sizeNumber === 0 || !sizeNumber) {
            return ['large', 'medium', 'small'].includes(sizeString) ? sizeString : 'normal';
        }

        return this.getAttrNumber('size');
    }

    set size(value) {
        this.setAttribute('size', value);

        if (typeof value === "number") {
            this.#avatar.style.width = `${value}px`;
            this.#avatar.style.height = `${value}px`;
            this.#avatar.style.lineHeight = `${value}px`;
        } else if (typeof value === "string") {
            this.#avatar.classList.add(`ea-avatar--${value}`);
        }
    }
    // #endregion
    // ------- end -------

    // ------- shape 图片形状 -------
    // #region
    get shape() {
        const shape = this.getAttribute('shape');

        return ['circle', 'square'].includes(shape) ? shape : 'circle';
    }

    set shape(value) {
        this.setAttribute('shape', value);
        this.#avatar.classList.add(`ea-avatar--${this.shape}`);
    }
    // #endregion
    // ------- end -------

    // ------- src 图片链接 -------
    // #region
    get src() {
        return this.getAttribute('src');
    }

    set src(value) {
        if (!value) return;

        this.setAttribute('src', value);

        const image = new Image();
        image.src = value;

        image.onload = () => {
            this.#avatar.innerHTML = `<img class="ea-avatar--img" src="${value}" alt="头像">`;
        };

        image.onerror = (e) => {
            this.#avatar.innerHTML = errorAvatar;

            this.dispatchEvent(new CustomEvent('error', {
                detail: {
                    error: e,
                },
            }));
        };
    }
    // #endregion
    // ------- end -------

    // ------- icon 图标 -------
    // #region
    get icon() {
        return this.getAttribute('icon') || '';
    }

    set icon(value) {
        this.setAttribute('icon', value);

        this.#avatar.innerHTML = iconAvatar(value);
    }
    // #endregion
    // ------- end -------

    // ------- fit 图片容器适应 -------
    // #region
    get fit() {
        return this.getAttribute('fit') || 'cover';
    }

    set fit(value) {
        this.setAttribute('fit', value);

        this.#avatar.classList.add(`ea-avatar-fill--${value}`);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.size = this.size;

        this.shape = this.shape;

        this.src = this.src;

        if (this.src) {
            this.fit = this.fit;
        }

        if (!this.src && this.icon) {
            this.icon = this.icon;
        }

        if (this.innerHTML !== "" && !this.icon && !this.src) {
            this.#avatar.innerHTML = textAvatar(this.innerHTML);
        }
    }
}

if (!customElements.get('ea-avatar')) {
    customElements.define('ea-avatar', EaAvatar);
}