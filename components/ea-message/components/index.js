import Base from '@components/Base.js'
import { EaMessage } from '../utils/EaMessageInstance';

import stylesheet from './index.scss?inline';

export class EaMessageElement extends Base {
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
        return ['type', 'visible', 'message', 'showClose', 'dangerouslyUseHTMLString', 'placement'];
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
            observer: async (newVal) => {
                this.#visibleAbortController?.abort();
                this.#visibleAbortController = new AbortController();

                if (newVal) {
                    this.#initPosition();
                    this.#container.className = this.updateContainerClasslist();
                    this.#dispatchBubblesEvent('show');

                    void this.#container.offsetWidth;

                    this.#container.classList.add('ea-message--is-show');

                    this.#container.addEventListener('transitionend', () => {
                        this.#dispatchBubblesEvent('shown');
                    }, { once: true, signal: this.#visibleAbortController.signal })
                } else {
                    this.#handleHide();

                    this.#container.classList.add('ea-message--before-hide');
                    this.#dispatchBubblesEvent('hide');

                    this.#container.addEventListener('transitionend', () => {
                        this.#container.className = this.updateContainerClasslist();
                        this.#dispatchBubblesEvent('hidden');
                    }, { once: true, signal: this.#visibleAbortController.signal })
                }
            }
        },
        dangerouslyUseHTMLString: {
            type: Boolean,
            default: false,
            observer: (newVal) => { }
        },
        message: {
            type: String,
            default: '',
            observer: (newVal) => {
                if (this.dangerouslyUseHTMLString) {
                    this.#messageContent.innerHTML = newVal;
                } else {
                    this.#messageContent.innerText = newVal;
                }
            }
        },
        showClose: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.#container.className = this.updateContainerClasslist();
            }
        },
        placement: {
            type: ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'middle'],
            default: 'top',
            observer: (newVal) => {
                console.log(newVal);

                // this.style.setProperty('--ea-message-top', newVal === 'top' ? '8px' : '');
                // this.style.setProperty('--ea-message-bottom', newVal === 'bottom' ? '8px' : '');
                // this.style.setProperty('--ea-message-left', newVal === 'top-left' || newVal === 'bottom-left' ? '8px' : '');
                // this.style.setProperty('--ea-message-right', newVal === 'top-right' ||)
                this.className = this.updateContainerClasslist();
            }
        }
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
            ['--' + this.placement]: this.placement
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

    close = () => {
        this.visible = false;
        this.#dispatchBubblesEvent('close');
    }

    #initPosition = () => {
        /** @type {HTMLElement[]} */
        const eaMessageList = document.querySelectorAll('ea-message');
        if (eaMessageList.length === 1) return;

        const lastEl = eaMessageList[eaMessageList.length - 2];
        /** @type {string} */
        const lastPosition = lastEl.style.getPropertyValue('--ea-message-top');

        const lastEaMessage = lastEl.shadowRoot.querySelector('.ea-message');
        const lastEaMessageRect = lastEaMessage.getBoundingClientRect();

        this.style.setProperty("--ea-message-top", `${Number(lastPosition.replace('px', '')) + lastEaMessageRect.height + 8}px`)
    }

    #handleHide = () => {
        const eaMessageList = [...document.querySelectorAll('ea-message')];
        const thisIndex = eaMessageList.findIndex(el => el === this);
        const els = eaMessageList.slice(thisIndex + 1);
        const height = this.#container.getBoundingClientRect().height;

        els.forEach((message, i) => {
            const posi = Number(message.style.getPropertyValue('--ea-message-top').replace('px', ''));
            message.style.setProperty('--ea-message-top', `${(posi - height - 8)}px`);
        });
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.showClose) this.#messageCloseIcon.addEventListener('click', this.close);
    }

    $beforeUnmounted() {
        this.#visibleAbortController?.abort();
    }
}

if (!window.customElements.get('ea-message')) {
    window.customElements.define('ea-message', EaMessageElement);
}