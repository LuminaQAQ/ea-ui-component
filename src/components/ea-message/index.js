import Base from '@components/Base.js'
import EaMessageInstance from './utils/EaMessageInstance';

import stylesheet from './index.scss?inline';

export class EaMessage extends Base {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #messageIcon;
    /** @type {HTMLElement} */
    #messageContent;
    /** @type {HTMLElement} */
    #messageCloseIcon;
    /** @type {AbortController} */
    #visibleAbortController;

    static get observedAttributes() {
        return ['type', 'visible', 'message', 'showClose'];
    }

    state = this.properties({
        type: {
            type: ['primary', 'success', 'warning', 'info', 'error'],
            default: 'info',
            observer: (newVal) => {
                const iconTypes = {
                    "success": "icon-ok-circled",
                    "error": "icon-cancel-circled",
                    "warning": "icon-attention-alt",
                    "info": "icon-info",
                    "primary": "icon-info",
                };

                this.#messageIcon.icon = iconTypes[newVal];
                this.#container.className = this.updateContainerClasslist();
            }
        },
        visible: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.#visibleAbortController?.abort();
                this.#visibleAbortController = new AbortController();

                if (newVal) {
                    this.#container.className = this.updateContainerClasslist();
                    this.#dispatchBubblesEvent('show');

                    void this.#container.offsetWidth;

                    this.#container.classList.add('ea-message--is-show');

                    this.#container.addEventListener('transitionend', () => {
                        this.#dispatchBubblesEvent('shown');
                    }, { once: true, signal: this.#visibleAbortController.signal })
                } else {
                    this.#container.classList.add('ea-message--before-hide');
                    this.#dispatchBubblesEvent('hide');

                    this.#container.addEventListener('transitionend', () => {
                        this.#container.className = this.updateContainerClasslist();
                        this.#dispatchBubblesEvent('hidden');
                    }, { once: true, signal: this.#visibleAbortController.signal })
                }
            }
        },
        message: {
            type: String,
            default: '',
            observer: (newVal) => {
                this.#messageContent.innerText = newVal;
            }
        },
        showClose: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.#container.className = this.updateContainerClasslist();
            }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-message', {
            ['--visible']: this.visible,
            ['--' + this.type]: this.type,
            ['--show-close']: this.showClose,
        });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <div class="ea-message" part="container">
                <ea-icon class="ea-message__icon" part="icon"></ea-icon>
                <div class="ea-message__content" part="content-wrap"></div>
                <ea-icon class="ea-message__icon-close" icon="icon-cancel"></ea-icon>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-message');
        this.#messageIcon = this.shadowRoot.querySelector('.ea-message__icon');
        this.#messageContent = this.shadowRoot.querySelector('.ea-message__content');
        this.#messageCloseIcon = this.shadowRoot.querySelector('.ea-message__icon-close');
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
    }
}

if (!window.customElements.get('ea-message')) {
    window.customElements.define('ea-message', EaMessage);
}

window.$message = EaMessageInstance