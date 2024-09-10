import Base from '../Base.js';
import '../ea-icon/index.js';

const stylesheet = `
.ea-footer_wrap {
  box-sizing: border-box;
  padding: 0 20px;

  height: 60px;

  color: #333;

  overflow: hidden;
}
`;

export class EaFooter extends Base {
    #wrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <footer class="ea-footer_wrap" part="container">
                <slot></slot>
            </footer>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-footer_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- height 底栏高度 -------
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

if (!customElements.get('ea-footer')) {
    customElements.define('ea-footer', EaFooter);
}
