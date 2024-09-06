// @ts-nocheck
import Base from '../Base.js';

import { stylesheet } from './src/style/stylesheet.js';

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

if (!customElements.get('ea-carousel-item')) {
    customElements.define('ea-carousel-item', EaCarouselItem);
}