import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaMessageAlertBox extends Base {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #header;
    /** @type {HTMLElement} */
    #title;
    /** @type {HTMLElement} */
    #content;
    /** @type {HTMLElement} */
    #footer;
    /** @type {HTMLElement} */
    #confirmButton;

    static get observedAttributes() {
        return ['title', 'message'];
    }

    state = this.properties({
        title: {
            type: String,
            default: '',
            observer: (newVal) => {
                this.#title.textContent = newVal;
            }
        },
        message: {
            type: String,
            default: '',
            observer: (newVal) => {
                this.#content.textContent = newVal;
            }
        },
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
                <header class="ea-message-alert-box__header" part="header">
                    <span class="ea-message-alert-box__title" part="title"></span>
                    <ea-icon icon="icon-cancel" part='close-icon'></ea-icon>
                </header>
                <main class="ea-message-alert-box__content" part="content"></main>
                <footer class="ea-message-alert-box__footer" part="footer">
                    <ea-button class="ea-message-alert-box__button" type="primary">确定</ea-button>
                </footer>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-message-alert-box');
        this.#header = this.shadowRoot.querySelector('.ea-message-alert-box__header');
        this.#title = this.shadowRoot.querySelector('.ea-message-alert-box__title');
        this.#content = this.shadowRoot.querySelector('.ea-message-alert-box__content');
        this.#footer = this.shadowRoot.querySelector('.ea-message-alert-box__footer');
        this.#confirmButton = this.shadowRoot.querySelector('.ea-message-alert-box__button');
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    #dispatchBubblesEvent = (customEventName, detail) => {
        this.dispatchEvent(new CustomEvent(customEventName, {
            detail,
            bubbles: true,
            composed: true,
        }));
    }

    connectedCallback() {
        super.connectedCallback();

        this.#confirmButton.addEventListener('click', () => {
            this.#dispatchBubblesEvent('confirm');
            this
        });
    }
}

if (!window.customElements.get('ea-message-alert-box')) {
    window.customElements.define('ea-message-alert-box', EaMessageAlertBox);
}