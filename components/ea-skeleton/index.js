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


@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
}
.ea-skeleton_item,
.ea-skeleton-item_wrap {
  position: relative;
  display: inline-block;
  background-color: #f2f2f2;
  height: 16px;
  border-radius: 4px;
}

.ea-skeleton-item_wrap.animated {
  background-image: linear-gradient(90deg, #f6f6f6 25%, #e8e8e8 37%, #f6f6f6 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.ea-skeleton_wrap.animated .ea-skeleton_item {
  background-image: linear-gradient(90deg, #f6f6f6 25%, #e8e8e8 37%, #f6f6f6 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.ea-skeleton_wrap {
  width: 100%;
}
.ea-skeleton_wrap .ea-skeleton_item.el-skeleton_p {
  width: 100%;
}
.ea-skeleton_wrap .ea-skeleton_item.el-skeleton_p.el-skeleton_paragraph {
  width: 100%;
  margin-top: 16px;
}
.ea-skeleton_wrap .ea-skeleton_item.el-skeleton_p.is-first {
  width: 33%;
}
.ea-skeleton_wrap .ea-skeleton_item.el-skeleton_p.is-last {
  width: 61%;
}

.ea-skeleton-item_wrap .skeleton-image {
  width: 30%;
  height: 30%;
}
.ea-skeleton-item_wrap.ea-skeleton_p {
  width: 100%;
}
.ea-skeleton-item_wrap.ea-skeleton_image {
  width: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}
.ea-skeleton-item_wrap.ea-skeleton_text {
  width: 100%;
  height: 13px;
}
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
    #mounted = false;

    #wrap;

    #customizationSlot;
    #defaultSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-skeleton_wrap';

        const defaultSlot = document.createElement('slot');
        defaultSlot.style.display = 'none';

        const customizationSlot = document.createElement('slot');
        customizationSlot.name = 'template';

        this.#wrap = wrap;
        this.#defaultSlot = defaultSlot;
        this.#customizationSlot = customizationSlot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
        this.shadowRoot.appendChild(customizationSlot);
        this.shadowRoot.appendChild(defaultSlot);
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

    // ------- count 元素重复数 -------
    // #region
    get count() {
        return this.getAttrNumber('count') || 1;
    }

    set count(value) {
        this.setAttribute('count', value);

        this.#wrap.innerHTML = '';
    }
    // #endregion
    // ------- end -------

    // ------- loading 是否显示骨架屏 -------
    // #region
    get loading() {
        return this.getAttrBoolean('loading') || true;
    }

    set loading(value) {
        this.setAttribute('loading', value);

        if (value) {
            this.#customizationSlot.style.display = 'block';
            this.#defaultSlot.style.display = 'none';
        } else {
            this.#customizationSlot.style.display = 'none';
            this.#defaultSlot.style.display = 'block';
        }
    }
    // #endregion
    // ------- end -------

    // 默认骨架屏的初始化
    defaultSkeletonInit(row) {
        row = Number(row) || 4;

        const firstSkeleton = getSkeletonElement('is-first');
        this.#wrap.appendChild(firstSkeleton);

        for (let i = 0; i < row - 2; i++) {
            const paragraphSkeleton = getSkeletonElement('el-skeleton_paragraph');
            this.#wrap.appendChild(paragraphSkeleton);
        }

        const lastSkeleton = getSkeletonElement('el-skeleton_paragraph is-last');
        this.#wrap.appendChild(lastSkeleton);
    }

    // 渲染自定义骨架屏
    customizationSkeletonInit() {
        const item = this.querySelectorAll('ea-skeleton-item');

        if (item.length > 0) this.#wrap.innerHTML = "";
    }

    // 渲染带动画的骨架屏
    handleSkeletonItemAniamted(isAnimated) {
        if (!isAnimated) return;

        const items = this.querySelectorAll('ea-skeleton-item');
        items.forEach(item => {
            item.setAttribute("animated", true);
        })
    }

    // 渲染骨架屏的渲染个数
    handleSkeletonItemCount(count) {
        const item = this.querySelector('[slot="template"]');
        let template = ``;

        for (let i = 0; i < count; i++) {
            template += item.innerHTML;
        }

        item.innerHTML = template;
    }

    init() {
        const that = this;

        this.animated = this.animated;

        this.count = this.count;

        this.loading = this.loading;

        const items = this.querySelectorAll('ea-skeleton-item');
        if (items.length > 0) {
            this.#wrap.style.display = "none";

            this.handleSkeletonItemCount(this.count);

            this.handleSkeletonItemAniamted(this.animated);

            return;
        }



        this.row = this.row;
        this.defaultSkeletonInit(this.row);
    }

    connectedCallback() {
        this.init();

        this.#mounted = true;
    }
}

export class EaSkeletonItem extends Base {
    #wrap;

    static get observedAttributes() {
        return ['animated'];
    }
    get variantOptions() {
        return ["text", "image", "p"];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-skeleton-item_wrap';

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
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

    // ------- variant html标签标识 -------
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

    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case "animated":
                this.#wrap.classList.toggle("animated", this.getAttrBoolean(name));
                break;
        }
    }
}

if (!customElements.get('ea-skeleton')) {
    customElements.define('ea-skeleton', EaSkeleton);
}

if (!customElements.get('ea-skeleton-item')) {
    customElements.define('ea-skeleton-item', EaSkeletonItem);
}