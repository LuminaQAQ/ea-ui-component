// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { stylesheet } from './src/style/style.js';

export class EaBreadcrumbItem extends Base {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <span class="ea-breadcrumb-item_wrap" part='container'>
                <slot></slot>
            </span>
        `;

        this.build(shadowRoot, stylesheet);
    }
}

if (!customElements.get('ea-breadcrumb-item')) {
    customElements.define('ea-breadcrumb-item', EaBreadcrumbItem);
}