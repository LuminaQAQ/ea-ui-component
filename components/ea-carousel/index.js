// @ts-nocheck
import Base from '../Base.js';
import "../ea-carousel-item/index.js"

import { createArrowItem } from './src/utils/createArrowItem.js';
import { handleIndexOverflow } from './src/utils/handleIndexOverflow.js';
import { initIndicators } from './src/utils/initIndicators.js';
import { initCarouselAutoPlay } from './src/utils/initCarouselAutoPlay.js';

import { stylesheet } from './src/style/stylesheet.js'

export class EaCarousel extends Base {
    #container;

    #contentContainer;

    #indicatorWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-carousel_wrap' part='container'>
                <div class='ea-carousel_content-container' part='content-container'>
                    <slot></slot>
                </div>
                <div class='ea-carousel-indicator_wrap' part='indicator-container'></div>
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

    connectedCallback() {
        this.direction = this.direction;

        this.trigger = this.trigger;

        this.interval = this.interval;;

        this.arrow = this.arrow;

        this.index = this.index;

        initIndicators.call(this, this.#indicatorWrap, this.querySelectorAll('ea-carousel-item').length);

        initCarouselAutoPlay.call(this, this.interval);

        if (this.arrow !== "never" || this.direction !== "vertical") {
            const leftArrowItem = createArrowItem.call(this, this.#container, this.#contentContainer, "left");
            const rightArrowItem = createArrowItem.call(this, this.#container, this.#contentContainer, "right");

            this.#container.appendChild(leftArrowItem);
            this.#container.appendChild(rightArrowItem);
        }

        window.addEventListener('resize', () => {
            this.index = this.index;
        });
    }
}

if (!customElements.get('ea-carousel')) {
    customElements.define('ea-carousel', EaCarousel);
}