// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from "../../utils/createElement"

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaCarousel extends Base {
    #wrap;

    #container;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-carousel_wrap';

        const carouselSlot = createSlotElement('');
        const container = createElement('div', 'ea-carousel_container', [carouselSlot]);
        wrap.appendChild(container);

        this.#wrap = wrap;
        this.#container = container;

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

    #initCarouselItem() {
        const items = document.querySelectorAll('ea-carousel-item');

        items.forEach((item, index) => {
            setTimeout(() => {
                item.translate = index * this.#wrap.getBoundingClientRect().width;
            }, 20);
        });
    }

    #initIndicators() {
        
    }

    init() {
        const that = this;

        this.direction = this.direction;

        this.#initCarouselItem();
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

        console.log(value);

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