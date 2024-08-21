import { createElement } from "../../../../utils/createElement.js";

export function initIndicators(indicatorWrap, length) {
    for (let i = 0; i < length; i++) {
        const indicator = createElement('div', 'ea-carousel-item_indicator');
        indicatorWrap.appendChild(indicator);
    }
    
    const indicators = indicatorWrap.querySelectorAll('.ea-carousel-item_indicator');
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