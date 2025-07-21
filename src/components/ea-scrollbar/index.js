import Base from '../Base.js'

import stylesheet from './index.scss?inline';

export class EaScrollbar extends Base {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #track;
    /** @type {HTMLElement} */
    #thumb;
    /** @type {HTMLElement} */
    #view

    static get observedAttributes() {
        return [];
    }

    /** 
     * @typedef {Object} State
     */
    /** @type {State} */
    state = this.properties({
        height: {
            type: String,
            default: '',
            observer: (newVal) => { }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-scrollbar',
            {
                // ['--' + this.state.type]: this.state.type,
            });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <div class="ea-scrollbar" part="container">
                <div class="ea-scrollbar__track" part="track">
                    <div class="ea-scrollbar__thumb" part="thumb"></div>
                </div>
                <div class="ea-scrollbar__view" part="view-container">
                    <slot></slot>
                </div>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-scrollbar');
        this.#track = this.shadowRoot.querySelector('.ea-scrollbar__track');
        this.#thumb = this.shadowRoot.querySelector('.ea-scrollbar__thumb');
        this.#view = this.shadowRoot.querySelector('.ea-scrollbar__view');
    }

    #scrollEvent = () => {
        this.#thumb.style.setProperty('--ea-scrollbar-top', `${this.#view.scrollTop / this.#view.scrollHeight * 100}%`);
    };

    #resizeEvent = () => {
        const thumbHeight = this.#view.clientHeight / this.#view.scrollHeight;
        this.#thumb.style.setProperty('--ea-scrollbar-thumb-height', `${thumbHeight * 100}%`);
        this.#track.classList.toggle('is-show', thumbHeight >= 1);
    }

    connectedCallback() {
        super.connectedCallback();

        this.evventController = new AbortController();
        const controller = this.evventController;

        this.#view.addEventListener('scroll', this.#scrollEvent, { signal: controller.signal });
        window.addEventListener('resize', this.#resizeEvent, { signal: controller.signal });

        window.addEventListener('load', this.#resizeEvent, { signal: controller.signal })
    }

    $beforeUnmounted() {
        this.evventController?.abort();
    }
}
if (!window.customElements.get('ea-scrollbar')) {
    window.customElements.define('ea-scrollbar', EaScrollbar);
}