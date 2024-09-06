// @ts-nocheck
import { timeout } from '../../utils/timeout.js';
import Base from '../Base.js';
import "../ea-collapse-item/index.js";

export class EaCollapse extends Base {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class="ea-collapse_wrap" part="container">
                <slot></slot>
            </div>
        `;
    }

    // ------- active 当前展开项 -------
    // #region
    get active() {
        return this.getAttribute('active') || 1;
    }

    set active(name) {
        this.setAttribute('active', name);

        timeout(() => {
            this.#handleCollapse(this.accordion, name);
        }, 20)
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

        timeout(() => {
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
        // 将所有ea-collapse-item元素转换为数组
        const items = Array.from(this.querySelectorAll('ea-collapse-item'));
        // 初始化用于记录展开状态的变量
        let collapseItem = flag ? "" : [];

        // 遍历每个折叠项，绑定状态改变事件的监听器
        items.forEach(item => {
            item.addEventListener('change', (e) => {
                // 在单选模式下，关闭所有其他折叠项
                if (flag) items.forEach(item => {
                    item.isOpen = false;
                });

                // 更新当前折叠项的展开状态
                item.isOpen = !e.detail.isOpen;
            });
        });

        // 根据flag的值来处理折叠项的展开状态
        if (flag) {
            // 在单选模式下，根据activeItemName确定哪个折叠项应该展开
            collapseItem = activeItemName.toString().trim()[0];

            items.forEach(item => {
                item.isOpen = item.name === collapseItem;
            });
        } else {
            // 在多选模式下，将activeItemName解析为数组，并处理每个折叠项的展开状态
            collapseItem = activeItemName.split(',').map(item => {
                return item.trim();
            }).concat();

            items.forEach(item => {
                // 根据collapseItem数组中的值，决定当前折叠项是否展开
                item.isOpen = collapseItem.includes(item.name);
            });
        }
    }

    connectedCallback() {
        this.accordion = this.accordion;

        this.active = this.active;
    }
}

if (!customElements.get('ea-collapse')) {
    customElements.define('ea-collapse', EaCollapse);
}