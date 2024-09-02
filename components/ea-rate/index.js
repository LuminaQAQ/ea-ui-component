// @ts-nocheck
import { createElement } from '../../utils/createElement.js';
import Base from '../Base.js';
import "../ea-icon/index.js"

import { initRateTempalte } from './src/components/rateComm.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaRate extends Base {
    #wrap;
    #itemWrap;
    #textContent;

    #iconItems;
    #icons;

    #textList = ["极差", "失望", "一般", "满意", "惊喜"];

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-rate_wrap" part="container">
                <section class="ea-rate_item-wrap" part="item-wrap">
                </section>
                <span class="ea-rate_text" part="text-wrap"></span>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-rate_wrap');
        this.#itemWrap = shadowRoot.querySelector('.ea-rate_item-wrap');
        this.#textContent = shadowRoot.querySelector('.ea-rate_text');

        initRateTempalte(this.#itemWrap);

        this.#iconItems = shadowRoot.querySelectorAll('.ea-rate_item');
        this.#icons = shadowRoot.querySelectorAll('ea-icon');


        this.build(shadowRoot, stylesheet);
    }

    // ------- value rate值 -------
    // #region
    get value() {
        const value = this.getAttrNumber('value') || 0;

        if (value < 1 || value > 5 || !value) return 0;

        return value
    }

    set value(val) {
        if (!val || isNaN(Number(val))) return;

        this.setAttribute('value', val);

        this.#clearCheckedStatus();

        this.#setCheckedStatus(val);
    }
    // #endregion
    // ------- end -------

    // ------- color 图标颜色 -------
    // #region
    get color() {
        return this.getAttribute('color');
    }

    set color(val) {
        if (!val) return;

        this.setAttribute('color', val);
        this.#itemWrap.style.setProperty('--i-color', val);
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(val) {
        this.toggleAttr('disabled', val);

        this.#iconItems.forEach(item => {
            item.classList.toggle('disabled', val);
        })

        this.#wrap.style.cursor = val ? 'not-allowed' : 'pointer';
    }
    // #endregion
    // ------- end -------

    // ------- show-text 显示文本 -------
    // #region
    get showText() {
        return this.getAttrBoolean('show-text');
    }

    set showText(val) {
        this.toggleAttr('show-text', val);
    }

    get showTextList() {
        return this.#textList;
    }

    set showTextList(val) {
        if (typeof val === "object" && val.length === 5) this.#textList = val;
    }
    // #endregion
    // ------- end -------

    // ------- void-icon 未选中时展示的图标 -------
    // #region
    get voidIcon() {
        return this.getAttribute('void-icon') || 'icon-star-empty';
    }

    set voidIcon(val) {
        this.setAttribute('void-icon', val);

        this.#handleIcon(val);

    }
    // #endregion
    // ------- end -------

    // ------- active-icon 选中时展示的图标 -------
    // #region
    get activeIcon() {
        return this.getAttribute('active-icon') || 'icon-star';
    }

    set activeIcon(val) {
        this.setAttribute('active-icon', val);

        this.#handleIcon(val);
    }
    // #endregion
    // ------- end -------

    // 处理图标
    #handleIcon(val) {
        this.#icons.forEach(icon => {
            icon.icon = val;
        })
    }

    // 设置/显示选中状态
    #setCheckedStatus(index) {
        for (let i = 0; i < index; i++) {
            this.#iconItems[i].classList.add('active');
            this.#icons[i].icon = this.activeIcon;

            if (this.showText) {
                this.#textContent.innerText = this.showTextList[index - 1];
            }
        }
    }

    // 当未选中时, 清除选中状态
    #clearCheckedStatus() {
        this.#iconItems.forEach((item, index) => {
            item.classList.remove('active');
            this.#icons[index].icon = this.voidIcon;

            if (this.showText) {
                this.#textContent.innerText = "";
            }
        })
    }

    // 初始化鼠标事件
    #initRateEvent() {
        this.#iconItems.forEach(dom => {
            const { index } = dom;

            // 鼠标移入: 显示选中状态
            dom.addEventListener('mouseenter', () => {

                this.#clearCheckedStatus();
                this.#setCheckedStatus(index + 1);

                this.dispatchEvent(new CustomEvent("hover", {
                    detail: {
                        value: index + 1,
                        rateText: this.#textList[index]
                    }
                }));
            })

            // 鼠标移出: 清除选中状态
            dom.addEventListener('mouseleave', () => {
                this.#clearCheckedStatus();

                this.#setCheckedStatus(this.value);
            })

            // 点击: 设置选中状态
            dom.addEventListener('click', () => {
                this.value = index + 1;
                this.dispatchEvent(new CustomEvent("change", {
                    detail: {
                        value: index + 1,
                        rateText: this.#textList[index]
                    }
                }))
            })
        })
    }

    connectedCallback() {
        // icon-class 自定图标样式类初始化
        this.activeIconClass = this.activeIconClass;

        // void-icon-class 自定空图标样式类初始化
        this.voidIconClass = this.voidIconClass;

        // show-text 显示文本初始化
        this.showText = this.showText;

        // color 颜色初始化
        this.color = this.color;

        // value 星级初始化
        this.value = this.value;

        // disabled 禁用初始化
        this.disabled = this.disabled;

        // 初始化鼠标事件
        if (!this.disabled) this.#initRateEvent();
    }
}

if (!customElements.get('ea-rate')) {
    customElements.define('ea-rate', EaRate);
}