// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-backtop_wrap {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  right: 40px;
  bottom: 40px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  color: #409eff;
  font-size: 14px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  opacity: 1;
  z-index: 5;
  transition: opacity 0.3s ease-in-out;
}
`;

export class EaBacktop extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-backtop_wrap';
        wrap.style.display = 'none';

        const slot = createSlotElement('');
        wrap.appendChild(slot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- target 触发滚动的对象 -------
    // #region
    get target() {
        return this.getAttribute('target');
    }

    set target(value) {
        this.setAttribute('target', value);
    }
    // #endregion
    // ------- end -------

    // ------- right 滚动按钮距离右边的距离 -------
    // #region
    get right() {
        return this.getAttribute('right') || 40;
    }

    set right(value) {
        this.setAttribute('right', value);

        this.#wrap.style.right = value + 'px';
    }
    // #endregion
    // ------- end -------

    // ------- bottom 滚动按钮距离下边的距离 -------
    // #region
    get bottom() {
        return this.getAttribute('bottom') || 40;
    }

    set bottom(value) {
        this.setAttribute('bottom', value);

        this.#wrap.style.bottom = value + 'px';
    }
    // #endregion
    // ------- end ------- 

    // ------- visibility-height 滚动按钮显示和隐藏的触发条件 -------
    // #region
    get visibilityHeight() {
        return this.getAttribute('visibility-height') || 200;
    }

    set visibilityHeight(value) {
        this.setAttribute('visibility-height', value);
    }
    // #endregion
    // ------- end -------

    /**
     * 根据滚动位置控制返回顶部按钮的显示和隐藏。
     * 
     * 当页面滚动超过200像素时，显示返回顶部按钮，并在过渡结束后设置按钮为完全可见。
     * 当页面滚动不超过200像素时，隐藏返回顶部按钮，并在过渡结束后将按钮的显示属性设置为none。
     * 
     * @param {*} scrollDom - 用于检测滚动位置的DOM元素。
     * @param {number} scrollFlag - 页面滚动到指定距离时触发。
     */
    #handleBackTopBtnShow(scrollDom, scrollFlag) {
        const that = this;

        // 当滚动距离超过200像素时，显示返回顶部按钮
        if (scrollDom.scrollTop > scrollFlag) {
            this.#wrap.style.display = 'flex';
            this.#wrap.ontransitionend = null;

            // 延迟10毫秒后设置按钮的透明度为1，使其完全可见
            setTimeout(() => {
                this.#wrap.style.opacity = 1;
            }, 10);
        } else {
            // 当滚动距离不超过200像素时，隐藏返回顶部按钮
            this.#wrap.style.opacity = 0;

            // 在过渡结束时，将按钮的显示属性设置为none
            this.#wrap.ontransitionend = function () {
                that.#wrap.style.display = 'none';
            };
        }
    }

    /**
     * 根据目标名称获取滚动事件相关DOM元素。
     * 
     * 此函数用于确定应该监听哪个DOM元素的滚动事件。它可以是特定的DOM元素，或者是整个文档。
     * 通过判断目标名称是否为空或未定义，来决定是获取整个文档还是指定的DOM元素。
     * 
     * @param {string} targetName - 目标元素的选择器字符串。如果为空或未定义，则监听整个文档。
     * @returns {Object} 返回一个对象，包含两个属性：dom和scrollDom，它们都指向同一个被选中的DOM元素，或者如果未指定目标名称，则指向document对象。
     */
    #handleScrollEvent(targetName) {
        // 保存当前上下文的引用
        const that = this;

        // 初始化dom和scrollDom变量为null
        let dom = null;
        let scrollDom = null;

        // 判断目标名称是否为空或未定义
        if (targetName === "null" || targetName === '' || targetName === null || targetName === undefined || targetName === 'undefined') {
            // 如果是，设置dom和scrollDom为document对象
            dom = document;
            scrollDom = document.documentElement;
        } else {
            // 如果不是，通过目标名称查询DOM元素，并设置dom和scrollDom
            dom = document.querySelector(targetName);
            scrollDom = document.querySelector(targetName);
        }

        // 返回包含dom和scrollDom的对象
        return { dom, scrollDom };
    }

    #initScrollBtn() {
        const that = this;
        const { dom, scrollDom } = this.#handleScrollEvent(this.target);

        this.#handleBackTopBtnShow(scrollDom, this.visibilityHeight);

        dom.addEventListener('scroll', function () {
            that.#handleBackTopBtnShow(scrollDom, that.visibilityHeight);
        });

        this.#wrap.addEventListener('click', function () {
            let step = 10;

            let timer = setInterval(() => {
                step += 5;
                scrollDom.scrollTop -= step;

                if (scrollDom.scrollTop <= 0) {
                    scrollDom.scrollTop = 0;
                    clearInterval(timer);
                    timer = null;
                }
            }, 12);

            this.dispatchEvent(new CustomEvent('backtop', {}));
        });
    }

    init() {
        const that = this;

        this.target = this.target;
        this.right = this.right;
        this.bottom = this.bottom;
        this.visibilityHeight = this.visibilityHeight;

        this.#initScrollBtn();
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-backtop')) {
    customElements.define('ea-backtop', EaBacktop);
}