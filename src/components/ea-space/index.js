import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaSpace extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return ['wrap', 'direction', 'size'];
    }

    state = this.properties({
        wrap: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.style.setProperty('--ea-space-wrap', newVal ? 'wrap' : 'nowrap');
            }
        },
        alignment: {
            type: String,
            default: '',
            observer: (newVal) => { }
        },
        direction: {
            type: ['vertical', 'horizontal'],
            default: 'horizontal',
            observer: (newVal) => {
                this.#container.className = this.updateContainerClasslist();
            }
        },
        size: {
            type: String,
            default: 'default',
            observer: (newVal) => {
                if (['large', 'small', 'default'].includes(newVal)) {
                    this.#container.className = `${this.updateContainerClasslist()} ea-space--${newVal}`;
                } else {
                    if (!CSS.supports('gap', newVal)) return console.warn('[ea-space] Invalid size value');

                    this.style.setProperty('--ea-space-gap', newVal);
                }
            }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-space', {
            ['--' + this.direction]: this.direction,
        });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <div class="ea-space">
                <slot></slot>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-space');
    }

    connectedCallback() {
        super.connectedCallback();

        this.wrap = this.wrap;
        this.size = this.size;
    }
}

if (!window.customElements.get('ea-space')) {
    window.customElements.define('ea-space', EaSpace);
}