import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaSplitterPanel extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return [];
    }

    state = this.properties({
        size: {
            type: String,
            default: '',
            observer: (newVal) => { }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-splitter-panel',
            {
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
          
        `;

        this.#container = this.shadowRoot.querySelector('.ea-splitter-panel');
    }

    connectedCallback() {
        super.connectedCallback();
    }
}

if (!window.customElements.get('ea-splitter-panel')) {
    window.customElements.define('ea-splitter-panel', EaSplitterPanel);
}