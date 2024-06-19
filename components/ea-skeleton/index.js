// @ts-nocheck
import Base from '../Base';

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
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-skeleton_wrap';

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    defaultSkeletonInit(row = 2) {
        const firstSkeleton = getSkeletonElement('is-first');
        this.#wrap.appendChild(firstSkeleton);

        for (let i = 0; i < row; i++) {
            const paragraphSkeleton = getSkeletonElement('el-skeleton_paragraph');
            this.#wrap.appendChild(paragraphSkeleton);
        }

        const lastSkeleton = getSkeletonElement('el-skeleton_paragraph is-last');
        this.#wrap.appendChild(lastSkeleton);
    }

    init() {
        const that = this;

        this.defaultSkeletonInit();
    }

    connectedCallback() {
        this.init();
    }
}