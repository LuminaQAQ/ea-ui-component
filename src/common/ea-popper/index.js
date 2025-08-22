import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaPopper extends Base {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #originalPopper;
    /** @type {HTMLElement} */
    #referenceElement;
    /** @type {AbortController} */
    #statusAbortController;

    static get observedAttributes() {
        return ['placement', 'show-arrow', 'status', 'offset'];
    }

    state = this.properties({
        placement: {
            type: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
            default: 'top',
            observer: (newVal) => {
                this.#container.className = this.updateContainerClasslist();
            }
        },
        "show-arrow": {
            type: Boolean,
            default: true,
            observer: (newVal) => {
                this.#container.className = this.updateContainerClasslist();
            }
        },
        status: {
            type: Boolean,
            default: false,
            observer: async (newVal) => {
                this.#statusAbortController?.abort();
                this.#statusAbortController = new AbortController();

                if (newVal) {
                    this.#container.className = this.updateContainerClasslist();
                    this.#dispatchBubblesEvent('show');

                    this.#container.offsetWidth;
                    this.#container.classList.add('ea-popper--is-show');

                    this.#container.addEventListener('transitionend', () => {
                        this.#dispatchBubblesEvent('shown');
                    }, { once: true, signal: this.#statusAbortController.signal })
                } else {
                    this.#container.classList.add('ea-popper--before-hide');
                    this.#dispatchBubblesEvent('hide');

                    this.#container.addEventListener('transitionend', () => {
                        this.#container.className = this.updateContainerClasslist();
                        this.#dispatchBubblesEvent('hidden');
                    }, { once: true, signal: this.#statusAbortController.signal })
                }
            }
        },
        offset: {
            type: String,
            default: "0 0",
            observer: (newVal) => {
                try {
                    let [x, y] = newVal.split(" ").map(_ => Number(_.trim()));

                    if (x && typeof y === "undefined") {
                        y = x
                    } else if ((x && y) || `${x} ${y}` === `0 0`) {

                    } else {
                        throw new RangeError(`[ea-popper] Invalid offset value: ${newVal}, expected format: "x(Number) y(Number)"`);
                    }

                    this.#originalPopper.style.setProperty("--ea-popper-transform-x", `${x}px`);
                    this.#originalPopper.style.setProperty("--ea-popper-transform-y", `${y}px`);

                } catch (error) {
                    console.error(error);
                }
            }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-popper', {
            ['--' + this.placement]: this.placement,
            ['--show-arrow']: this['show-arrow'],
            ['--show']: this.status,
        });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <div class='ea-popper' part='container'>
                <div class='ea-popper__reference' part='reference'>
                    <div class='ea-popper__original' part='original'>
                        <slot></slot>
                    </div>
                    <slot name='reference'></slot>
                </div>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-popper');
        this.#originalPopper = this.shadowRoot.querySelector('.ea-popper__original');
        this.#referenceElement = this.shadowRoot.querySelector('.ea-popper__reference');
    }

    show() {
        this.status = true;
    }

    hide() {
        this.status = false;
    }

    toggle() {
        this.status = !this.status;
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

        this.placement = this.placement;
    }
}

if (!window.customElements.get('ea-popper')) {
    window.customElements.define('ea-popper', EaPopper);
}