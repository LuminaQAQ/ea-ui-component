import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaSplitterPanel extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return ['size', 'min'];
    }

    state = this.properties({
        size: {
            type: String,
            default: '',
            observer: (newVal) => {
                if (!CSS.supports('width', newVal)) return;

                this.style.setProperty('--ea-splitter-panel-size', newVal)
            }
        },
        min: {
            type: String,
            default: '',
            observer: (newVal) => {
                if (!CSS.supports('width', newVal)) return;

                this.style.setProperty('--ea-splitter-panel-min-size', newVal)
            }
        }
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
            <div class="ea-splitter-panel" part="container">
                <slot></slot>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-splitter-panel');
    }

    connectedCallback() {
        super.connectedCallback();

        this.min = this.min;
        this.size = this.size;
    }
}

if (!window.customElements.get('ea-splitter-panel')) {
    window.customElements.define('ea-splitter-panel', EaSplitterPanel);
}