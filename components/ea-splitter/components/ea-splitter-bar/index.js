import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaSplitterBar extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return [];
    }

    state = this.properties({
        type: {
            type: ['vertical', 'horizontal'],
            default: '',
            observer: (newVal) => { }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-splitter-bar', {
            // ['--' + this.state.type]: this.state.type,
        });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <div class="ea-splitter-bar" part="container"></div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-splitter-bar');
    }

    connectedCallback() {
        super.connectedCallback();
    }
}

if (!window.customElements.get('ea-splitter-bar')) {
    window.customElements.define('ea-splitter-bar', EaSplitterBar);
}