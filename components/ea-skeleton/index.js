// @ts-nocheck
import Base from '../Base';

const imageElement = `
<svg class="skeleton-image" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 20h70v60H15z" stroke="#c0c4cc" stroke-width="5px" fill="none" />
    <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
    <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
    <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
</svg>
`;

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

/**
 * 创建一个具有骨架屏样式的元素。
 * 
 * @param {string} item - 包含要添加到新元素的类名。
 * @param {boolean} isFirst - 指示生成的元素是否应该是列表中的第一个元素。
 * @param {boolean} isLast - 指示生成的元素是否应该是列表中的最后一个元素。
 * @returns {HTMLElement} - 返回一个新创建的div元素。
 */
const getSkeletonElement = (className) => {
    const el = document.createElement('div');
    el.className = `ea-skeleton_item el-skeleton_p ${className ? className : ''}`;

    return el;
};

export class EaSkeleton extends Base {
    #wrap;

    #customizationSlot;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-skeleton_wrap';

        const customizationSlot = document.createElement('slot');
        customizationSlot.name = 'template';

        this.#wrap = wrap;
        this.#customizationSlot = customizationSlot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
        this.shadowRoot.appendChild(customizationSlot);
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
        this.setAttribute('animated', value);

        this.#wrap.classList.toggle('animated', value);
    }
    // #endregion
    // ------- end -------

    // -------  -------
    // #region

    // #endregion
    // ------- end -------

    defaultSkeletonInit(row) {
        row = Number(row) || 4;

        const firstSkeleton = getSkeletonElement('is-first');
        this.#wrap.appendChild(firstSkeleton);

        for (let i = 0; i < row - 2; i++) {
            const paragraphSkeleton = getSkeletonElement('el-skeleton_paragraph');
            paragraphSkeleton.classList.toggle
            this.#wrap.appendChild(paragraphSkeleton);
        }

        const lastSkeleton = getSkeletonElement('el-skeleton_paragraph is-last');
        this.#wrap.appendChild(lastSkeleton);
    }

    customizationSkeletonInit() {
        const item = this.querySelectorAll('ea-skeleton-item');

        if (item.length > 0) this.#wrap.innerHTML = "";
    }

    init() {
        const that = this;

        const item = this.querySelectorAll('ea-skeleton-item');

        if (item.length > 0) {
            this.#wrap.style.display = "none";
            return;
        }

        this.animated = this.animated;

        this.row = this.row;
        this.defaultSkeletonInit(this.row);
    }

    connectedCallback() {
        this.init();
    }
}

const EaSkeletonItemStylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaSkeletonItem extends Base {
    #wrap;

    get variantOptions() {
        return ["text", "image", "p"];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-skeleton-item_wrap';

        this.#wrap = wrap;

        this.build(shadowRoot, EaSkeletonItemStylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- style html标签上的样式 -------
    // #region
    get elementStyle() {
        return this.getAttribute('style');
    }

    set elementStyle(value) {
        this.setAttribute('style', value);
        this.#wrap.setAttribute('style', value);
    }
    // #endregion
    // ------- end -------

    // ------- variant html标签上的样式 -------
    // #region
    get variant() {
        return this.getAttribute('variant');
    }

    set variant(value) {
        this.variantOptions.includes(value) ? this.setAttribute('variant', value) : this.setAttribute('variant', 'text');

        if (value === "image") this.#wrap.innerHTML = imageElement;

        this.#wrap.classList.add("ea-skeleton_" + this.variant);
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        this.variant = this.variant;

        this.elementStyle = this.elementStyle;
    }

    connectedCallback() {
        this.init();
    }
}