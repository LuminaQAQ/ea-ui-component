import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaMessageAlertBox extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return [];
    }

    state = this.properties({
        // type: {
        //     type: ,
        //     default: '',
        //     observer: (newVal) => { }
        // },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-message-alert-box', {
            // ['--' + this.type]: this.type,
        });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <div class='ea-message-alert-box' part='container'>
                <header class="ea-message-alert-box__header" part="header"></header>
                <main class="ea-message-alert-box__content" part="content"></main>
                <footer class="ea-message-alert-box__footer" part="footer"></footer>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-message-alert-box');
    }

    connectedCallback() {
        super.connectedCallback();
    }
}

if (!window.customElements.get('ea-message-alert-box')) {
    window.customElements.define('ea-message-alert-box', EaMessageAlertBox);
}