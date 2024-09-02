import Base from '../Base.js';

export class EaInfiniteScrollItem extends Base {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-infinite-item_wrap' part='container'>
                <slot></slot>
            </div>
        `;
    }
}

if (!customElements.get('ea-infinite-item')) {
    customElements.define('ea-infinite-item', EaInfiniteScrollItem);
}