// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from "../../utils/createElement"

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-carousel_wrap {
  position: relative;
}
.ea-carousel_wrap.ea-carousel--horizontal {
  overflow-x: hidden;
}
.ea-carousel_wrap .ea-carousel_container {
  position: relative;
  color: #fff;
  text-align: center;
  height: 300px;
  transition: transform 0.5s;
}
.ea-carousel_wrap .ea-carousel-item_arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(31, 45, 61, 0.11);
  color: #fff;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, transform 0.3s, opacity 0.3s;
}
.ea-carousel_wrap .ea-carousel-item_arrow.ea-carousel-item_arrow--left {
  left: 0;
  transform: translate(-100%, -50%);
}
.ea-carousel_wrap .ea-carousel-item_arrow.ea-carousel-item_arrow--right {
  right: 0;
  transform: translate(100%, -50%);
}
.ea-carousel_wrap .ea-carousel-item_arrow:hover {
  background-color: rgba(31, 45, 61, 0.3);
}
.ea-carousel_wrap .ea-carousel-indicator_wrap {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
}
.ea-carousel_wrap .ea-carousel-indicator_wrap .ea-carousel-item_indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0 0.25rem;
  transition: background-color 0.3s;
}
.ea-carousel_wrap .ea-carousel-indicator_wrap .ea-carousel-item_indicator.ea-carousel-item_indicator--active {
  background-color: #fff;
}

:host {
  --odd-bgc: #d3dce6;
}

.ea-carousel-item_wrap {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background-color: var(--odd-bgc);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ea-carousel-item_wrap ::slotted(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
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

    // ------- trigger 轮播图指示器触发方式 -------
    // #region
    get trigger() {
        const trigger = this.getAttribute('trigger') || "hover";
        return ["click", "hover"].includes(trigger) ? trigger : "click";
    }

    set trigger(value) {
        this.setAttribute('trigger', value);
    }
    // #endregion
    // ------- end -------

    // ------- interval 轮播图自动播放间隔时间 -------
    // #region
    get interval() {
        return this.getAttrNumber('interval') || 3;
    }

    set interval(value) {
        this.setAttribute('interval', value);
    }
    // #endregion
    // ------- end -------

    // ------- arrow 轮播图是否一直显示箭头 -------
    // #region
    get arrow() {
        const arrow = this.getAttribute('arrow') || "hover";
        return ["always", "hover", "never"].includes(arrow) ? arrow : "hover";
    }

    set arrow(value) {
        this.setAttribute('arrow', value);
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
        const length = this.querySelectorAll('ea-carousel-item').length - 1;

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
        const items = this.querySelectorAll('ea-carousel-item');

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

    /**
     * 初始化轮播指示器
     */
    #initIndicators() {
        const that = this;

        // 获取所有轮播项元素
        const items = this.querySelectorAll('ea-carousel-item');
        items.forEach((item, index) => {
            const indicator = createElement('div', 'ea-carousel-item_indicator');
            this.#indicatorWrap.appendChild(indicator);
        });

        // 遍历每个指示器
        const indicators = this.#indicatorWrap.querySelectorAll('.ea-carousel-item_indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener(this.trigger === 'click' ? 'click' : 'mouseenter', () => {
                that.index = index;

                indicators.forEach((item) => {
                    item.classList.remove('ea-carousel-item_active');
                })
                indicator.classList.add('ea-carousel-item_active');
            })
        });
    }


    /**
     * 创建箭头项
     * @param {string} arrow - 箭头方向，"left" 或 "right"
     * @param {string} show - 箭头显示的时机，"always"、"hover" 或 "never"
     * @returns {HTMLElement} - 创建的箭头元素
     * 
     * 该函数用于创建轮播图的左右箭头元素，并设置其初始状态和点击事件。
     * 箭头元素的样式和位置会在鼠标进入和离开时动态改变。
     */
    #createArrowItem(arrow, show) {
        // 保持当前对象的引用
        const that = this;
        // 创建箭头元素，并根据方向添加相应的类名
        const arrowItem = createElement('div', `ea-carousel-item_arrow ea-carousel-item_arrow--${arrow}`);
        // 根据箭头方向设置箭头的HTML内容
        arrowItem.innerHTML = arrow === "left" ? `&lt;` : `&gt;`;

        switch (show) {
            case "always":
                // 如果显示时机为“总是”，则设置箭头的初始位置和透明度
                arrowItem.style.transform = `translateY(-50%) translateX(${arrow === "left" ? 1 : -1}rem)`;
                arrowItem.style.opacity = 1;
                break;
            case "hover":
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
                break;
        }

        // 绑定点击事件，根据箭头方向改变轮播图的索引
        arrowItem.addEventListener('click', (e) => {
            that.index = arrow === "left" ? --that.index : ++that.index;
        })

        // 返回创建的箭头元素
        return arrowItem;
    }

    /**
     * 初始化箭头项
     * 该方法用于创建并添加左右两个箭头项到指定的包装元素中。
     * 这两个箭头项分别代表向左和向右的导航功能。
     * 
     * @private
     */
    #initArrowItem(show) {
        if (show === "never") return;

        // 创建一个向左的箭头项
        const leftArrowItem = this.#createArrowItem("left", show);
        // 创建一个向右的箭头项
        const rightArrowItem = this.#createArrowItem("right", show);

        // 将左箭头项添加到包装元素中
        this.#wrap.appendChild(leftArrowItem);
        // 将右箭头项添加到包装元素中
        this.#wrap.appendChild(rightArrowItem);
    }

    /**
     * 初始化轮播图自动播放功能。
     * @param {number} duration - 每张图片展示的时间间隔，单位为秒。
     */
    #initCarouselAutoPlay(duration) {
        // 保存当前上下文的引用
        const that = this;
        // 设置定时器，每隔一定时间自动切换到下一张图片
        this.#timer = setInterval(() => {
            this.index = this.index + 1;
        }, duration * 1000);

        // 当鼠标进入轮播图区域时，停止自动播放
        this.addEventListener('mouseenter', () => {
            clearInterval(this.#timer);
            that.#timer = null;
        });

        // 当鼠标离开轮播图区域时，恢复自动播放
        this.addEventListener('mouseleave', () => {
            that.#timer = setInterval(() => {
                this.index = this.index + 1;
            }, duration * 1000)
        });
    }

    init() {
        const that = this;

        this.direction = this.direction;

        this.trigger = this.trigger;

        this.interval = this.interval;;

        this.arrow = this.arrow;

        this.#initCarouselItem();
        this.#initArrowItem(this.arrow);
        this.#initIndicators(this.interval);
        this.#initCarouselAutoPlay(this.interval);

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