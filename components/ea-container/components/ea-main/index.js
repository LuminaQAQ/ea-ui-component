import Base from '../../../Base.js'

import stylesheet from './index.scss?inline';

export class EaMain extends Base {
    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <main class="ea-main" part="container">
                <slot></slot>
            </main>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
    }
}
if (!window.customElements.get('ea-main')) {
    window.customElements.define('ea-main', EaMain);
}