// @ts-nocheck
import Base from '../Base.js';
import { createElement, createSlotElement } from '../../utils/createElement.js';

const stylesheet = `

.ea-collapse-item_wrap .ea-collapse-item_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
  height: 48px;
  line-height: 48px;
  font-size: 13px;
  font-weight: 700;
  color: #303133;
  cursor: pointer;
}
.ea-collapse-item_wrap .ea-collapse-item_title .ea-collapse-item_title-icon {
  width: 0.35rem;
  height: 0.35rem;
  margin-right: 1rem;
  border: 3px solid #9ca0a5;
  border-left-color: transparent;
  border-top-color: transparent;
  rotate: -45deg;
  transition: rotate 0.3s;
}
.ea-collapse-item_wrap .ea-collapse-item_content {
  will-change: height;
  overflow: hidden;
  height: 0;
  padding-bottom: 0;
  transition: height 0.3s, padding-bottom 0.3s;
  font-size: 13px;
  color: #303133;
}
`;

export class EaCollapse extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const slot = createSlotElement('');
        const wrap = createElement('div', 'ea-collapse_wrap', [slot]);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- active 当前展开项 -------
    // #region
    get active() {
        return this.getAttribute('active') || 1;
    }

    set active(name) {
        this.setAttribute('active', name);

        setTimeout(() => {
            this.#handleCollapse(this.accordion, name);
        }, 20);
    }
    // #endregion
    // ------- end -------

    // ------- accordion 是否为手风琴模式 -------
    // #region
    get accordion() {
        return this.getAttrBoolean('accordion') || false;
    }

    set accordion(flag) {
        this.setAttribute('accordion', flag);

        setTimeout(() => {
            this.#handleCollapse(flag, this.active);
        }, 20);
    }
    // #endregion
    // ------- end -------

    /**
     * 处理折叠面板的展开/折叠状态。
     * 根据传入的标志位flag和激活项名称activeItemName，来决定哪些折叠项应该展开。
     * 当flag为true时，只允许一个折叠项展开，即单选模式；
     * 当flag为false时，可以允许多个折叠项展开，即多选模式。
     * 
     * @param {boolean} flag - 控制单选或多选模式的标志。true表示单选模式，false表示多选模式。
     * @param {string} activeItemName - 激活项的名称，用于决定哪些折叠项应该展开。
     */
    #handleCollapse(flag, activeItemName) {
        const that = this;
        // 将所有ea-collapse-item元素转换为数组
        const items = Array.from(this.querySelectorAll('ea-collapse-item'));
        // 初始化用于记录展开状态的变量
        let collapseItem = flag ? "" : [];

        // 遍历每个折叠项，绑定状态改变事件的监听器
        items.forEach(item => {
            item.addEventListener('collapseItemStatusChange', (e) => {
                // 在单选模式下，关闭所有其他折叠项
                if (flag) items.forEach(item => {
                    item.isOpen = false;
                });

                // 更新当前折叠项的展开状态
                item.isOpen = !e.detail.isOpen;

                // 触发change事件，通知外部当前折叠项的状态改变
                that.dispatchEvent(new CustomEvent("change", {
                    detail: {
                        name: item.name,
                        isOpen: item.isOpen,
                    },
                }))
            });
        });

        try {
            // 根据flag的值来处理折叠项的展开状态
            if (flag) {
                // 在单选模式下，根据activeItemName确定哪个折叠项应该展开
                collapseItem = activeItemName.toString().trim()[0];

                items.forEach(item => {
                    // 根据collapseItem的值，决定当前折叠项是否展开
                    if (item.name === collapseItem) {
                        item.isOpen = true;
                    } else {
                        item.isOpen = false;
                    }
                });
            } else {
                // 在多选模式下，将activeItemName解析为数组，并处理每个折叠项的展开状态
                collapseItem = activeItemName.split(',').map(item => {
                    return item.trim();
                }).concat();

                items.forEach(item => {
                    // 根据collapseItem数组中的值，决定当前折叠项是否展开
                    if (collapseItem.includes(item.name)) {
                        item.isOpen = true;
                    } else {
                        item.isOpen = false;
                    }
                });
            }

        } catch (error) { }
    }

    #handleChildrenItemName() {

    }

    init() {
        const that = this;

        this.accordion = this.accordion;

        this.active = this.active;
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-collapse')) {
    customElements.define('ea-collapse', EaCollapse);
}

export class EaCollapseItem extends Base {
    #wrap;

    #titleWrap;
    #titleContent;
    #titleIcon;

    #contentWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const titleContent = createElement('span', 'ea-collapse-item_title-content');
        const icon = createElement('span', 'ea-collapse-item_title-icon');
        const titleWrap = createElement('div', 'ea-collapse-item_title', [titleContent, icon]);
        const contentSlot = createSlotElement('');
        const contentWrap = createElement('div', 'ea-collapse-item_content', [contentSlot]);

        const wrap = createElement('div', 'ea-collapse-item_wrap', [titleWrap, contentWrap]);

        this.#wrap = wrap;
        this.#titleWrap = titleWrap;
        this.#titleContent = titleContent;
        this.#titleIcon = icon;
        this.#contentWrap = contentWrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
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

    #initCollapseChange() {
        const that = this;

        this.#titleWrap.addEventListener('click', () => {
            that.dispatchEvent(new CustomEvent('collapseItemStatusChange', {
                detail: {
                    name: that.name,
                    isOpen: that.isOpen,
                },
            }));
        });
    }

    init() {
        const that = this;

        this.title = this.title;
        this.name = this.name;

        this.#initCollapseChange();
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-collapse-item')) {
    customElements.define('ea-collapse-item', EaCollapseItem);
}