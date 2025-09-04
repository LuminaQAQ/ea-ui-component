import { EaOverlay } from '@/common/ea-overlay';
// import { EaMessageAlertBox } from "./ea-message-alert-box/index.js"

import stylesheet from './index.scss?inline';

export class EaMessageBoxElement extends EaOverlay {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #header;
    /** @type {HTMLElement} */
    #title;
    /** @type {HTMLElement} */
    #closeIcon;
    /** @type {HTMLElement} */
    #content;
    /** @type {HTMLElement} */
    #footer;
    /** @type {HTMLElement} */
    #confirmButton;
    /** @type {AbortController} */
    #abortController;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            'visible',
            'dangerouslyUseHTMLString', 'title', 'message',
            'type', 'icon', 'showClose', 'closeIcon',
            'cancelButtonText', 'confirmButtonText',
        ].map(s => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
            .toLowerCase());
    }

    state = this.properties({
        visible: {
            type: Boolean,
            default: false,
            observer: async (newVal) => {
                this.status = newVal;
            }
        },
        boxType: {
            type: ['alert' | 'confirm' | 'prompt'],
            default: 'alert',
            observer: async (newVal) => {
                // await import(`./ea-message-${newVal}-box/index.js`)

                // const attrs = EaMessageBoxElement.observedAttributes;
                // const el = document.createElement(`ea-message-${newVal}-box`);

                // attrs.forEach(k => {
                //     el[k] = this[k];
                // });

                // this.appendChild(el);
            }
        },

        dangerouslyUseHTMLString: {
            type: Boolean,
            default: false,
            observer: (newVal) => { }
        },
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
                if (this.dangerouslyUseHTMLString) {
                    this.#content.innerHTML = newVal;
                } else {
                    this.#content.textContent = newVal;
                }
            }
        },
        type: {
            type: ['normal', 'primary', 'success', 'warning', 'danger'],
            default: 'primary',
            observer: (newVal) => {
                this.#confirmButton.type = newVal;
            }
        },
        icon: {
            type: String,
            default: '',
            observer: (newVal) => {
            }
        },
        showClose: {
            type: Boolean,
            default: true,
            observer: (newVal) => {
                this.#closeIcon.style.display = newVal ? 'block' : 'none';
            }
        },
        confirmButtonText: {
            type: String,
            default: 'OK',
            observer: (newVal) => {
                this.#confirmButton.textContent = newVal;
            }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return `${super.updateContainerClasslist()} ${this.computedClasslist('ea-message-box', {
            ['--visible']: this.visible,
        })}`;
    }

    constructor() {
        super();

        const contentContainer = this.shadowRoot.querySelector('.ea-overlay__content');

        contentContainer.innerHTML = `
            <div class='ea-message-alert-box' part='container'>
                <header class="ea-message-alert-box__header" part="header">
                    <span class="ea-message-alert-box__title" part="title"></span>
                    <ea-icon class="ea-message-alert-box__icon-close" icon="icon-cancel" part='close-icon'></ea-icon>
                </header>
                <main class="ea-message-alert-box__content" part="content"></main>
                <footer class="ea-message-alert-box__footer" part="footer">
                    <ea-button class="ea-message-alert-box__button" type="primary">OK</ea-button>
                </footer>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-message-alert-box');
        this.#header = this.shadowRoot.querySelector('.ea-message-alert-box__header');
        this.#title = this.shadowRoot.querySelector('.ea-message-alert-box__title');
        this.#closeIcon = this.shadowRoot.querySelector('.ea-message-alert-box__icon-close');
        this.#content = this.shadowRoot.querySelector('.ea-message-alert-box__content');
        this.#footer = this.shadowRoot.querySelector('.ea-message-alert-box__footer');
        this.#confirmButton = this.shadowRoot.querySelector('.ea-message-alert-box__button');
    }

    dispatchBubblesEvent = (customEventName, detail) => {
        this.dispatchEvent(new CustomEvent(customEventName, {
            detail,
            bubbles: true,
            composed: true,
        }));
    }

    connectedCallback() {
        super.connectedCallback();

        this.setAttribute('role', 'dialog');
        this["content-width"] = "100%";
        this["content-max-width"] = "420px";
        this["content-height"] = "auto";
        this["close-on-click-modal"] = false;

        this.assignedStyle(stylesheet);

        this.#abortController = new AbortController();

        this.#confirmButton.addEventListener('click', () => {
            this.dispatchBubblesEvent('confirm');
        }, { once: true, signal: this.#abortController.signal });

        this.#closeIcon.addEventListener('click', () => {
            this.dispatchBubblesEvent('cancel');
        }, { once: true, signal: this.#abortController.signal });

        this.addEventListener('close', () => {
            this.dispatchBubblesEvent('cancel');
        }, { once: true, signal: this.#abortController.signal });
    }

    $beforeUnmounted() {
        this.#abortController?.abort();
    }
}

if (!window.customElements.get('ea-message-box')) {
    window.customElements.define('ea-message-box', EaMessageBoxElement);
}