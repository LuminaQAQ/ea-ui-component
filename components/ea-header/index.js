import Base from '../Base.js';
import '../ea-icon/index.js'

const stylesheet = ``;

export class EaHeader extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <header class="ea-header_wrap" part="container">
                <slot></slot>
            </header>
        `;
        this.#wrap = shadowRoot.querySelector('.ea-header_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- height 顶栏高度 -------
    // #region
    get height() {
        return this.getAttrNumber('height') || 60;
    }

    set height(value) {
        this.setAttribute('height', value);

        this.#wrap.style.height = `${value}px`;
        this.#wrap.style.lineHeight = `${value}px`;
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.height = this.height;
    }
}

if (!customElements.get('ea-header')) {
    customElements.define('ea-header', EaHeader);
}