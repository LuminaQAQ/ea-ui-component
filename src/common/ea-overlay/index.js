import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaOverlay extends Base {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #overlayMask;
    /** @type {HTMLElement} */
    #overlayContent;
    /** @type {AbortController} */
    #abortController

    static get observedAttributes() {
        return [
            'status', 'modal', 'before-close', 'close-on-click-modal',

            'z-index', 'background-color',
            'content-width', 'content-max-width', 'content-height',
            'content-left', 'content-top', 'content-translate-x', 'content-translate-y', 'content-transform',
        ];
    }

    state = this.properties({
        status: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                if (newVal) {
                    this.#container.className = this.updateContainerClasslist();
                    this.#dispatchBubblesEvent('open');

                    requestAnimationFrame(() => {
                        this.#container.classList.add('ea-overlay--is-show', newVal);
                        this.#container.addEventListener('transitionend', () => {
                            this.#dispatchBubblesEvent('opened');
                        }, { once: true })
                    })
                } else {
                    this.#container.classList.add('ea-overlay--before-close');
                    this.#dispatchBubblesEvent('close');

                    this.#container.addEventListener('transitionend', () => {
                        this.#container.className = this.updateContainerClasslist();
                        this.#dispatchBubblesEvent('closed')
                    }, { once: true })
                }
            }
        },
        modal: {
            type: Boolean,
            default: true,
            observer: (newVal) => {
                this.#container.className = this.updateContainerClasslist();
            }
        },
        'before-close': {
            type: Boolean,
            default: false,
            observer: (newVal) => { }
        },
        'close-on-click-modal': {
            type: Boolean,
            default: true,
            observer: (newVal) => { }
        },

        ...[
            'z-index', 'background-color',
            'content-width', 'content-max-width', 'content-height',
            'content-left', 'content-top', 'content-translate-x', 'content-translate-y', 'content-transform',
        ].reduce(
            (acc, name) => {
                acc[name] = {
                    type: String,
                    default: '',
                    observer: (newVal) => {
                        this.style.setProperty(`--ea-overlay-${name}`, newVal);
                    }
                }
                return acc;
            }, {}
        )
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-overlay', {
            ['--open']: this.status,
            ['--modal']: !this.modal
        });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    show() {
        this.status = true;
    }

    hide() {
        this.status = false;
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <div class='ea-overlay' part='container'>
                <div class='ea-overlay__mask' part='mask'></div>
                <div class='ea-overlay__content' part='content'>
                    <slot></slot>
                </div>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-overlay');
        this.#overlayMask = this.shadowRoot.querySelector('.ea-overlay__mask');
        this.#overlayContent = this.shadowRoot.querySelector('.ea-overlay__content');
    }

    #dispatchBubblesEvent = (customEventName, detail) => {
        this.dispatchEvent(new CustomEvent(customEventName, {
            detail,
            bubbles: true,
            composed: true,
        }));
    }

    #beforeCloseCallback = () => this.status = false;

    #maskCloseEvent = (e) => {
        const isContent = [...this.children].find(child => child === e.target || child.contains(e.target));
        if (isContent) return;

        if (this["before-close"]) {
            this.#dispatchBubblesEvent("before-close", {
                done: () => this.#beforeCloseCallback()
            });
        } else {
            this.#beforeCloseCallback();
        }
    }

    connectedCallback() {
        super.connectedCallback();

        this.#abortController = new AbortController();

        if (this["close-on-click-modal"]) this.addEventListener('click', this.#maskCloseEvent, { signal: this.#abortController.signal });
    }

    $beforeUnmounted() {
        this.#abortController.abort();
    }
}

if (!window.customElements.get('ea-overlay')) {
    window.customElements.define('ea-overlay', EaOverlay);
}