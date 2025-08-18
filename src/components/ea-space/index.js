import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaSpace extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return ['wrap', 'direction', 'size', 'spacer', 'alignment', 'fill', 'fill-ratio'];
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
            observer: (newVal) => {
                if (!CSS.supports('align-items', newVal)) return console.warn(`[ea-space] Invalid alignment value ${newVal}`);

                this.style.setProperty('--ea-space-alignment', newVal);
            }
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
        spacer: {
            type: String,
            default: '',
            observer: (newVal) => {
                const children = [...this.children];
                children.forEach((child, i) => {
                    if (i < children.length - 1) {
                        const spacer = document.createElement('span');
                        spacer.innerText = newVal;
                        spacer.part = 'spacer';

                        this.insertBefore(spacer, child.nextSibling);
                    }
                });
            }
        },
        fill: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.#container.className = this.updateContainerClasslist();
            }
        },
        'fill-ratio': {
            type: Number,
            default: 100,
            observer: (newVal) => {
                this.style.setProperty('--ea-space-fill-ratio', `${newVal}%`);
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
            ['--fill']: this.fill,
        });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <div class="ea-space" part="container">
                <slot></slot>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-space');
    }

    connectedCallback() {
        super.connectedCallback();

        this.wrap = this.wrap;
        this.size = this.size;
        this.spacer = this.spacer;
        this.alignment = this.alignment;
        this.fill = this.fill;

        this['fill-ratio'] = this['fill-ratio'];
    }
}

if (!window.customElements.get('ea-space')) {
    window.customElements.define('ea-space', EaSpace);
}