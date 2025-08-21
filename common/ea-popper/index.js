import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaPopper extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return ['placement', 'show-arrow'];
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
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-popper', {
            ['--' + this.placement]: this.placement,
            ['--show-arrow']: this['show-arrow'],
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
    }

    connectedCallback() {
        super.connectedCallback();

        this.placement = this.placement;
    }
}

if (!window.customElements.get('ea-popper')) {
    window.customElements.define('ea-popper', EaPopper);
}