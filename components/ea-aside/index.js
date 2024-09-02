import Base from '../Base.js';
import '../ea-icon/index.js'

const stylesheet = ``;

export class EaAside extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <aside class="ea-aside_wrap" part="container">
                <slot></slot>
            </aside>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-aside_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- width 侧边栏宽度 -------
    // #region
    get width() {
        return this.getAttrNumber('width') || 200;
    }

    set width(value) {
        this.setAttribute('width', value);

        this.#wrap.style.width = `${value}px`;
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.width = this.width;
    }
}

if (!customElements.get('ea-aside')) {
    customElements.define('ea-aside', EaAside);
}