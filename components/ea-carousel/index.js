// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from "../../utils/createElement"

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaCarousel extends Base {
    #wrap;

    #container;

    #indicatorWrap;

    #timer = null;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-carousel_wrap';

        const carouselSlot = createSlotElement('');
        const container = createElement('div', 'ea-carousel_container', [carouselSlot]);
        wrap.appendChild(container);

        const indicatorWrap = createElement('div', 'ea-carousel-indicator_wrap');
        wrap.appendChild(indicatorWrap);

        this.#wrap = wrap;
        this.#container = container;
        this.#indicatorWrap = indicatorWrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- direction 轮播图方向 -------
    // #region
    get direction() {
        const direction = this.getAttribute('direction');
        return ["horizontal", "vertical"].includes(direction) ? direction : "horizontal";
    }

    set direction(value) {
        this.setAttribute('direction', value);

        this.#wrap.classList.add(`ea-carousel--${value}`);
    }
    // #endregion
    // ------- end -------

    // ------- index 轮播图索引 -------
    // #region
    get index() {
        return this.getAttrNumber('index') || 0;
    }

    set index(value) {
        const index = this.#handleIndexOverflow(value);

        this.setAttribute('index', index);

        this.#container.style.transform = `translateX(-${index * this.#container.getBoundingClientRect().width}px)`;

        try {
            const indicators = this.#indicatorWrap.querySelectorAll(`.ea-carousel-item_indicator`);
            indicators.forEach(item => {
                item.classList.remove('ea-carousel-item_indicator--active');
            });
            indicators[index].classList.add('ea-carousel-item_indicator--active');
        } catch (e) { }
    }
    // #endregion
    // ------- end -------

    /**
     * 处理索引溢出问题
     * @param {number} val - 需要检查和调整的索引值
     * @returns {number} - 调整后的合法索引值
     */
    #handleIndexOverflow(val) {
        // 获取容器孩子的数量
        const length = document.querySelectorAll('ea-carousel-item').length - 1;

        // 如果索引值小于0，将其设置为最后一个索引
        if (val < 0) {
            val = length;
            // 如果索引值大于孩子数量，将其设置为第一个索引
        } else if (val > length) {
            val = 0;
        }

        // 返回调整后的索引值
        return val;
    }

    /**
     * 初始化轮播项的位置和样式。
     */
    #initCarouselItem() {
        // 获取所有轮播项元素
        const items = document.querySelectorAll('ea-carousel-item');

        // 遍历每个轮播项
        items.forEach((item, index) => {
            // 延迟执行，创建动画效果的延迟
            setTimeout(() => {
                // 如果是奇数索引，设置特殊的背景色
                if (index % 2 === 1) {
                    item.style.setProperty('--odd-bgc', '#99a9bf');
                }
                // 计算并设置轮播项的初始位置
                item.translate = index * this.#wrap.getBoundingClientRect().width;
            }, 20);
        });
    }

    #initIndicators(duration) {
        const that = this;

        // 获取所有轮播项元素
        const items = document.querySelectorAll('ea-carousel-item');
        items.forEach((item, index) => {
            const indicator = createElement('div', 'ea-carousel-item_indicator');
            this.#indicatorWrap.appendChild(indicator);
        });

        // 遍历每个指示器
        const indicators = this.#indicatorWrap.querySelectorAll('.ea-carousel-item_indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('mouseenter', () => {
                that.index = index;

                indicators.forEach((item, index) => {
                    item.classList.remove('ea-carousel-item_active');
                })
                indicator.classList.add('ea-carousel-item_active');
            })
        });
    }


    /**
     * 创建箭头项
     * @param {string} arrow - 箭头方向，"left" 或 "right"
     * @returns {HTMLElement} - 创建的箭头元素
     * 
     * 该函数用于创建轮播图的左右箭头元素，并设置其初始状态和点击事件。
     * 箭头元素的样式和位置会在鼠标进入和离开时动态改变。
     */
    #createArrowItem(arrow) {
        // 保持当前对象的引用
        const that = this;
        // 创建箭头元素，并根据方向添加相应的类名
        const arrowItem = createElement('div', `ea-carousel-item_arrow ea-carousel-item_arrow--${arrow}`);
        // 根据箭头方向设置箭头的HTML内容
        arrowItem.innerHTML = arrow === "left" ? `&lt;` : `&gt;`;

        // 绑定点击事件，根据箭头方向改变轮播图的索引
        arrowItem.addEventListener('click', (e) => {
            that.index = arrow === "left" ? --that.index : ++that.index;
        })

        // 当鼠标进入箭头元素时，改变其位置和透明度
        this.#wrap.addEventListener('mouseenter', (e) => {
            arrowItem.style.transform = `translateY(-50%) translateX(${arrow === "left" ? 1 : -1}rem)`;
            arrowItem.style.opacity = 1;
        })

        // 当鼠标离开箭头元素时，恢复其初始位置和透明度
        this.#wrap.addEventListener('mouseleave', (e) => {
            arrowItem.style.transform = `translateY(-50%) translateX(${arrow === "left" ? -100 : 100}%)`;
            arrowItem.style.opacity = 0;
        })

        // 返回创建的箭头元素
        return arrowItem;
    }

    #initArrowItem() {
        const leftArrowItem = this.#createArrowItem("left");
        const rightArrowItem = this.#createArrowItem("right");

        this.#wrap.appendChild(leftArrowItem);
        this.#wrap.appendChild(rightArrowItem);
    }

    #setTimer(duration) {
        return setInterval(() => {
            this.index = this.index + 1;
        }, duration * 1000);
    }

    #initCarouselAotuPlay(duration) {
        const that = this;
        this.#timer = setInterval(() => {
            this.index = this.index + 1;
        }, duration * 1000);;

        this.addEventListener('mouseenter', () => {
            clearInterval(this.#timer);
            that.#timer = null;
        });

        this.addEventListener('mouseleave', () => {
            that.#timer = setInterval(() => {
                this.index = this.index + 1;
            }, duration * 1000)
        });
    }

    init() {
        const that = this;

        this.direction = this.direction;

        this.#initCarouselItem();
        this.#initArrowItem();
        this.#initIndicators(3);
        this.#initCarouselAotuPlay(3);

        this.index = this.index;
    }

    connectedCallback() {
        this.init();
    }
}

export class EaCarouselItem extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-carousel-item_wrap';

        const carouselSlot = createSlotElement('');
        wrap.appendChild(carouselSlot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- translate 图片偏移 -------
    // #region
    get translate() {
        return this.getAttribute('translate') || 0;
    }

    set translate(value) {
        this.setAttribute('translate', value);

        this.#wrap.style.transform = `translateX(${value}px) scale(1)`;
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;
    }

    connectedCallback() {
        this.init();
    }
}