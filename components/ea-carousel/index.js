// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from "../../utils/createElement"

function handleIndexOverflow(length, val) {
    if (val < 0) {
        val = length;
    } else if (val > length) {
        val = 0;
    }

    return val;
}

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-carousel_wrap {
  position: relative;
  overflow: hidden;
}
.ea-carousel_wrap .ea-carousel_content-container {
  position: relative;
  display: flex;
  color: #fff;
  text-align: center;
  height: 300px;
  transition: transform 0.5s;
}
.ea-carousel_wrap .ea-carousel_content-container ::slotted(ea-carousel-item) {
  flex: 0 0 100%;
  width: 100%;
}
.ea-carousel_wrap .ea-carousel-item_arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5;
  font-weight: 800;
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
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.ea-carousel_wrap .ea-carousel-indicator_wrap .ea-carousel-item_indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0.25rem;
  transition: background-color 0.3s;
}
.ea-carousel_wrap .ea-carousel-indicator_wrap .ea-carousel-item_indicator.ea-carousel-item_indicator--active {
  background-color: #fff;
}
.ea-carousel_wrap ::slotted(ea-carousel-item:nth-child(odd)) {
  --odd-bgc: #d3dce6;
}
.ea-carousel_wrap.hover-trigger:hover .ea-carousel-item_arrow.ea-carousel-item_arrow--left {
  left: 0;
  transform: translate(50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.hover-trigger:hover .ea-carousel-item_arrow.ea-carousel-item_arrow--right {
  right: 0;
  transform: translate(-50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.always-show-arrow .ea-carousel-item_arrow.ea-carousel-item_arrow--left {
  left: 0;
  transform: translate(50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.always-show-arrow .ea-carousel-item_arrow.ea-carousel-item_arrow--right {
  right: 0;
  transform: translate(-50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.ea-carousel--horizontal .ea-carousel_content-container {
  flex-direction: row;
}
.ea-carousel_wrap.ea-carousel--vertical .ea-carousel_content-container {
  flex-direction: column;
}
.ea-carousel_wrap.ea-carousel--vertical .ea-carousel-item_arrow {
  display: none;
}
.ea-carousel_wrap.ea-carousel--vertical .ea-carousel-indicator_wrap {
  left: 100%;
  bottom: 50%;
  flex-direction: column;
  transform: translate(-200%, 50%);
}

:host {
  --odd-bgc: #99a9bf;
}

.ea-carousel-item_wrap {
  display: inline-block;
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
    #container;

    #contentContainer;

    #indicatorWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-carousel_wrap' part='container'>
                <div class='ea-carousel_content-container' part='content-wrap'>
                    <slot></slot>
                </div>
                <div class='ea-carousel-indicator_wrap' part='indicator-wrap'></div>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-carousel_wrap');
        this.#contentContainer = shadowRoot.querySelector('.ea-carousel_content-container');
        this.#indicatorWrap = shadowRoot.querySelector('.ea-carousel-indicator_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- direction 轮播图方向 -------
    // #region
    get direction() {
        const direction = this.getAttribute('direction');
        return ["horizontal", "vertical"].includes(direction) ? direction : "horizontal";
    }

    set direction(value) {
        this.setAttribute('direction', value);

        this.#container.classList.add(`ea-carousel--${value}`);
    }
    // #endregion
    // ------- end -------

    // ------- index 轮播图索引 -------
    // #region
    get index() {
        return this.getAttrNumber('index') || 0;
    }

    set index(value) {
        const length = this.querySelectorAll('ea-carousel-item').length - 1;
        const index = handleIndexOverflow(length, value);

        this.setAttribute('index', index);

        const itemInfo = this.#container.getBoundingClientRect();
        const direction = this.direction === "horizontal" ? `X` : `Y`;
        const moveStep = this.direction === "horizontal" ? itemInfo.width : itemInfo.height;

        this.#contentContainer.style.transform = `translate${direction}(-${index * moveStep}px)`;

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

    #initIndicators() {
        const length = this.querySelectorAll('ea-carousel-item').length;

        for (let i = 0; i < length; i++) {
            const indicator = createElement('div', 'ea-carousel-item_indicator');
            indicator.part = 'indicator';
            this.#indicatorWrap.appendChild(indicator);
        }

        const indicators = this.#indicatorWrap.querySelectorAll('.ea-carousel-item_indicator');
        indicators[0].classList.add('ea-carousel-item_indicator--active');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener(this.trigger === 'click' ? 'click' : 'mouseenter', () => {
                this.index = index;

                indicators.forEach((item) => {
                    item.classList.remove('ea-carousel-item_active');
                })
                indicator.classList.add('ea-carousel-item_active');
            })
        });
    }

    #initCarouselAutoPlay() {
        let timer = setInterval(() => {
            this.index = this.index + 1;
        }, this.interval * 1000);

        // 当鼠标进入轮播图区域时，停止自动播放
        this.addEventListener('mouseenter', () => {
            clearInterval(timer);
            timer = null;
        });

        // 当鼠标离开轮播图区域时，恢复自动播放
        this.addEventListener('mouseleave', () => {
            timer = setInterval(() => {
                this.index = this.index + 1;
            }, this.interval * 1000)
        });
    }

    #createArrowItem(arrow) {
        let throttle = false;
        const arrowItem = createElement('div', `ea-carousel-item_arrow ea-carousel-item_arrow--${arrow}`);
        arrowItem.part = 'arrow';

        arrowItem.innerHTML = arrow === "left" ? `&lt;` : `&gt;`;

        switch (this.arrow) {
            case "always":
                this.#container.classList.add('always-show-arrow');
                break;
            case "hover":
                this.#container.classList.add('hover-trigger');
                break;
        }

        arrowItem.addEventListener('click', () => {
            if (throttle) return;
            this.index = arrow === "left" ? --this.index : ++this.index;
        })

        this.#contentContainer.addEventListener('transitionstart', () => {
            throttle = true;
        })
        this.#contentContainer.addEventListener('transitionend', () => {
            throttle = false;
        })

        return arrowItem;
    }

    connectedCallback() {
        this.direction = this.direction;

        this.trigger = this.trigger;

        this.interval = this.interval;;

        this.arrow = this.arrow;

        this.index = this.index;

        this.#initIndicators();
        this.#initCarouselAutoPlay();

        if (this.arrow !== "never" || this.direction !== "vertical") {
            const leftArrowItem = this.#createArrowItem("left");
            const rightArrowItem = this.#createArrowItem("right");

            this.#container.appendChild(leftArrowItem);
            this.#container.appendChild(rightArrowItem);
        }

        window.addEventListener('resize', () => {
            this.index = this.index;
        });
    }
}

export class EaCarouselItem extends Base {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-carousel-item_wrap' part='container'>
                <slot></slot>
            </div>
        `;

        this.build(shadowRoot, stylesheet);
    }
}

if (!customElements.get('ea-carousel')) {
    customElements.define('ea-carousel', EaCarousel);
}
if (!customElements.get('ea-carousel-item')) {
    customElements.define('ea-carousel-item', EaCarouselItem);
}