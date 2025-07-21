import Base from '../Base.js'

import stylesheet from './index.scss?inline';

export class EaScrollbar extends Base {
    #container;

    static get observedAttributes() {
        return [];
    }

    /** 
     * @typedef {Object} State
     */
    /** @type {State} */
    state = this.properties({
        height: {
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
        return this.computedClasslist('ea-scrollbar',
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

        this.#container = this.shadowRoot.querySelector('.ea-scrollbar');
    }

    connectedCallback() {
        super.connectedCallback();
    }
}
if (!window.customElements.get('ea-scrollbar')) {
    window.customElements.define('ea-scrollbar', EaScrollbar);
}