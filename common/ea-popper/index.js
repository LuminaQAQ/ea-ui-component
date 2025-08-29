import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

/**
 * 检查视口可见
 * @param {HTMLElement} el 
 * @returns 
 */
const isIntersecting = (el, scale = 0) => {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= scale &&
        rect.left >= scale &&
        rect.bottom <= window.innerHeight - scale &&
        rect.right <= window.innerWidth - scale
    );
}

/**
 * 根据视口情况翻转 placement
 * @param {HTMLElement} el 
 * @param {string} placement
 * @returns {string}
 */
const flipPlacement = (el, placement) => {
    const antiPlacement = {
        left: 'right',
        right: 'left',
        top: 'bottom',
        bottom: 'top',
    }

    const rect = el.getBoundingClientRect();
    const strategies = {
        top: rect.top < 0 && placement.includes("top"),
        bottom: rect.bottom > window.innerHeight && placement.includes("bottom"),
        left: rect.left < 0 && placement.includes("left"),
        right: rect.right > window.innerWidth && placement.includes("right"),
    }


    if (isIntersecting(el)) return placement;

    for (const strategy in strategies) {
        if (strategies[strategy]) return placement.replace(strategy, antiPlacement[strategy]);
    }

    return placement;
}

export class EaPopper extends Base {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #originalPopper;
    /** @type {HTMLElement} */
    #referenceElement;
    /** @type {AbortController} */
    #statusAbortController;
    /** @type {Boolean} */
    #originPlacement;

    static get observedAttributes() {
        return ['width', 'placement', 'show-arrow', 'status', 'offset', 'filp'];
    }

    state = this.properties({
        width: {
            type: Number,
            default: '150',
            observer: (newVal) => {
                this.#originalPopper.style.setProperty('--ea-popper-width', `${newVal}px`);
            }
        },
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

                    if (this.flip) {
                        const popperRect = this.#originalPopper.getBoundingClientRect();
                        const isOverflow = isIntersecting(this, Math.max(popperRect.width, popperRect.height));

                        if (this.#originPlacement === this.placement) {
                            this.placement = flipPlacement(this.#originalPopper, this.placement);
                        } else if (isOverflow) {
                            this.placement = this.#originPlacement;
                        }
                    }

                    void this.#container.offsetWidth;

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
        flip: {
            type: Boolean,
            default: true,
            observer: (newVal) => { }
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
            <div class='ea-popper' part='container' tabindex='-1'>
                <div class='ea-popper__reference' part='reference' tabindex='-1'>
                    <div class='ea-popper__original' part='original' tabindex='0'>
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
        this.#originPlacement = this.placement;
    }
}

if (!window.customElements.get('ea-popper')) {
    window.customElements.define('ea-popper', EaPopper);
}