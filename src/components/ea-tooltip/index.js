import { EaPopper } from "@common/ea-popper/index.js"

import stylesheet from './index.scss?inline';

export class EaTooltip extends EaPopper {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #originalPopper;
    /** @type {HTMLElement} */
    #referenceElement;
    /** @type {HTMLElement} */
    #contentElement;
    /** @type {AbortController} */
    #abortController;

    #isMounted;

    static get observedAttributes() {
        return [...super.observedAttributes, 'trigger', 'content', 'visible', 'effect'];
    }

    state = this.properties({
        trigger: {
            type: ['click', 'focus', 'hover', 'contextmenu', 'customized'],
            default: 'hover',
            observer: (newVal) => { }
        },
        visible: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.status = newVal;
            }
        },
        effect: {
            type: ['dark', 'light', 'customized'],
            default: 'dark',
            observer: (newVal) => {
                if (newVal !== 'customized') this.#container.className = this.updateContainerClasslist();
            }
        },
        content: {
            type: String,
            default: '',
            observer: (newVal) => {
                if (!this.#contentElement) {
                    const contentElement = document.createElement('div');
                    const contentSlot = this.#originalPopper.querySelector('slot');
                    contentElement.classList.add('ea-tooltip__content');
                    contentElement.part = 'content';
                    contentElement.innerText = newVal;

                    this.#originalPopper.appendChild(contentElement);

                    this.#contentElement = contentElement;
                    contentSlot.remove();
                } else {
                    this.#contentElement.innerText = newVal;
                }
            }
        },
    })

    constructor() {
        super();

        this.#container = this.shadowRoot.querySelector('.ea-popper');
        this.#originalPopper = this.shadowRoot.querySelector('.ea-popper__original');
        this.#referenceElement = this.shadowRoot.querySelector('.ea-popper__reference');
    }

    #triggerEventStrategies = {
        'hover': () => {
            this.addEventListener('mouseover', (e) => {
                this.show();

                this.addEventListener('mouseout', (e) => {
                    this.hide();
                }, { once: true });
            }, { signal: this.#abortController.signal });
        },
        'click': () => {
            this.addEventListener('click', () => {
                this.toggle();
            }, { signal: this.#abortController.signal });
        },
        'focus': () => {
            this.addEventListener('focus', () => {
                this.show();

                this.addEventListener('blur', (e) => {
                    this.hide();
                }, { once: true })
            }, { signal: this.#abortController.signal });
        },
        'contextmenu': () => {
            this.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const abortController = new AbortController();
                this.show();

                window.addEventListener('click', (e) => {
                    const isThis = this.contains(e.target);

                    if (!isThis) {
                        abortController.abort();
                        this.hide();
                    }
                }, { signal: abortController.signal })
            }, { signal: this.#abortController.signal });
        },
    }

    updateContainerClasslist() {
        const originClasslist = super.updateContainerClasslist();

        return `${originClasslist} ${this.computedClasslist('ea-tooltip', {
            ['--' + this.effect]: this.effect && this.effect !== 'customized',
        })}`
    }

    #init = () => {
        const abortController = new AbortController();
        this.#abortController = abortController;

        this.assignedStyle(stylesheet);
    }

    #initTriggerEvent = () => {
        if (this.trigger === "customized") return;

        const isExist = Object.keys(this.#triggerEventStrategies).find(key => this.trigger === key);
        this.#triggerEventStrategies[isExist || 'hover']?.();

        if (!isExist) console.warn(`[EaPopper] trigger event ${this.trigger} is not exist`);
    }

    connectedCallback() {
        super.connectedCallback();

        this.#init();
        this.#initTriggerEvent();
    }

    $beforeUnmounted() {
        super.$beforeUnmounted();
        this.#abortController?.abort();
    }
}

if (!window.customElements.get('ea-tooltip')) {
    window.customElements.define('ea-tooltip', EaTooltip);
}