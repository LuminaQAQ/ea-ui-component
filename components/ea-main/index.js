import Base from '../Base.js';
import '../ea-icon/index.js'

const stylesheet = `
.ea-main_wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  overflow: auto;
  color: #333;
}
`;

export class EaMain extends Base {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <main class="ea-main_wrap" part="container">
                <slot></slot>
            </main>
        `;

        this.build(shadowRoot, stylesheet);
    }
}

if (!customElements.get('ea-main')) {
    customElements.define('ea-main', EaMain);
}