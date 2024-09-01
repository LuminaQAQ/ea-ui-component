// @ts-nocheck
import Base from '../Base.js';

import "../ea-skeleton-item/index.js"

import { handleDefaultAttrIsTrue } from '../../utils/handleDefaultAttrIsTrue.js';
import { createSkeletonElement } from './src/utils/createSkeletonElement.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaSkeleton extends Base {
    #wrap;

    #customizationSlot;
    #defaultSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-skeleton_wrap" part="container">
                <slot></slot>
                <slot name="template"></slot>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-skeleton_wrap');
        this.#defaultSlot = shadowRoot.querySelector('slot');
        this.#customizationSlot = shadowRoot.querySelector('slot[name="template"]');

        this.build(shadowRoot, stylesheet);
    }

    // ------- row 骨架屏的渲染行数 -------
    // #region
    get row() {
        return this.getAttrNumber('row') || 4;
    }

    set row(value) {
        this.setAttribute('row', value);
    }
    // #endregion
    // ------- end -------

    // ------- animated 骨架屏的动画效果 -------
    // #region
    get animated() {
        return this.getAttrBoolean('animated');
    }

    set animated(value) {
        if (!value) return;

        this.setAttribute('animated', value);
    }
    // #endregion
    // ------- end -------

    // ------- count 元素重复数 -------
    // #region
    get count() {
        return this.getAttrNumber('count') || 1;
    }

    set count(value) {
        this.setAttribute('count', value);

        // this.#wrap.innerHTML = '';
    }
    // #endregion
    // ------- end -------

    // ------- loading 是否显示骨架屏 -------
    // #region
    get loading() {
        const attr = this.getAttribute('loading');
        return handleDefaultAttrIsTrue(attr);
    }

    set loading(value) {
        this.setAttribute('loading', value);

        this.#customizationSlot.style.display = value ? 'block' : 'none';
        this.#defaultSlot.style.display = value ? 'none' : 'block';
    }
    // #endregion
    // ------- end -------

    // 默认骨架屏的初始化
    #initDefaultSkeleton(row) {
        row = Number(row) || 4;

        const defaultSlotNodeLen = this.#defaultSlot.assignedNodes();
        const customizationSlotLen = this.#customizationSlot.assignedNodes();


        if (this.children.length > 0) return;
        else this.#wrap.innerHTML = '';

        for (let i = 0; i < row; i++) {
            const paragraphSkeleton = createSkeletonElement('p', this.animated);
            this.#wrap.appendChild(paragraphSkeleton);
        }
    }

    // 渲染带动画的骨架屏
    #handleSkeletonItemAniamted(isAnimated) {
        if (!isAnimated) return;

        const items = this.querySelectorAll('ea-skeleton-item');
        items.forEach(item => {
            item.animated = true;
        })
    }

    // 渲染骨架屏的渲染个数
    #handleSkeletonItemCount(count) {
        if (this.children.length === 0 || count < 1) return;

        const item = this.querySelector('[slot="template"]');
        let template = ``;

        for (let i = 0; i < count; i++) {
            template += item.innerHTML;
        }

        item.innerHTML = template;
    }

    connectedCallback() {
        this.animated = this.animated;

        this.loading = this.loading;

        this.count = this.count;

        this.row = this.row;

        this.#initDefaultSkeleton(this.row);
        this.#handleSkeletonItemCount(this.count);
        this.#handleSkeletonItemAniamted(this.animated);
    }
}

if (!customElements.get('ea-skeleton')) {
    customElements.define('ea-skeleton', EaSkeleton);
}