import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaSplitter extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return [];
    }

    state = this.properties({
        layout: {
            type: ['horizontal', 'vertical'],
            default: '',
            observer: (newVal) => {
                this.#container.style.setProperty('--ea-splitter-direction', newVal === 'vertical' ? 'column' : 'row');
            }
        },
    })

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
          <div class="ea-splitter">
            <slot></slot>
          </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-splitter');
    }

    connectedCallback() {
        super.connectedCallback();

        this.layout = this.layout;
    }
}

if (!window.customElements.get('ea-splitter')) {
    window.customElements.define('ea-splitter', EaSplitter);
}