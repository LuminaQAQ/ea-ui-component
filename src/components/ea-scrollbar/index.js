import Base from '../Base.js'

import stylesheet from './index.scss?inline';

export class EaScrollbar extends Base {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #horizontalTrack;
    /** @type {HTMLElement} */
    #verticalTrack;
    /** @type {HTMLElement} */
    #verticalThumb;
    /** @type {HTMLElement} */
    #horizontalThumb;
    /** @type {HTMLElement} */
    #view

    static get observedAttributes() {
        return ['native', 'noresize', 'always'];
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
        native: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.#container.classList.toggle('ea-scrollbar--native', newVal);
            }
        },
        noresize: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.#container.classList.toggle('ea-scrollbar--noresize', newVal);
            }
        },
        always: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.#container.classList.toggle('ea-scrollbar--always', newVal);
            }
        }
    })

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <div class="ea-scrollbar" part="container">
                <div class="ea-scrollbar__track ea-scrollbar__track-horizontal" part="track-horizontal">
                    <div class="ea-scrollbar__thumb-horizontal" part="thumb"></div>
                </div>
                <div class="ea-scrollbar__track ea-scrollbar__track-vertical" part="track-vertical">
                    <div class="ea-scrollbar__thumb-vertical" part="thumb"></div>
                </div>
                <div class="ea-scrollbar__view" part="view-container">
                    <slot></slot>
                </div>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-scrollbar');
        this.#verticalTrack = this.shadowRoot.querySelector('.ea-scrollbar__track-vertical');
        this.#horizontalTrack = this.shadowRoot.querySelector('.ea-scrollbar__track-horizontal');
        this.#verticalThumb = this.shadowRoot.querySelector('.ea-scrollbar__thumb-vertical');
        this.#horizontalThumb = this.shadowRoot.querySelector('.ea-scrollbar__thumb-horizontal');
        this.#view = this.shadowRoot.querySelector('.ea-scrollbar__view');
    }

    /**
     * 滚动事件 - 修改滚动条样式 和 事件派发
     */
    #scrollEvent = () => {
        this.#verticalThumb.style.setProperty('--ea-scrollbar-top', `${this.#view.scrollTop / this.#view.scrollHeight * 100}%`);
        this.#horizontalThumb.style.setProperty('--ea-scrollbar-left', `${this.#view.scrollLeft / this.#view.scrollWidth * 100}%`);

        this.dispatchEvent(new CustomEvent('scroll', {
            detail: {
                scrollTop: this.#view.scrollTop,
                scrollLeft: this.#view.scrollLeft,
            }
        }))

        const directions = {
            left: this.#view.scrollTop / this.#view.scrollHeight <= 0,
            right: this.#view.scrollTop / this.#view.scrollHeight >= 1,
            top: this.#view.scrollLeft / this.#view.scrollWidth <= 0,
            bottom: this.#view.scrollLeft / this.#view.scrollWidth >= 1,
        }

        Object.keys(directions).forEach(direction => {
            if (directions[direction]) {
                this.dispatchEvent(new CustomEvent("end-reached", {
                    detail: {
                        direction,
                        scrollTop: this.#view.scrollTop,
                        scrollLeft: this.#view.scrollLeft,
                    }
                }))
            }
        })
    };

    /**
     * 页面尺寸改变后，调整滚动条样式
     */
    #resizeEvent = () => {
        queueMicrotask(() => {
            const verticalThumbHeight = this.#view.clientHeight / this.#view.scrollHeight;
            const horizontalThumbWidth = this.#view.clientWidth / this.#view.scrollWidth;

            this.#verticalThumb.style.setProperty('--ea-scrollbar-thumb-vertical-height', `${verticalThumbHeight * 100}%`);
            this.#horizontalThumb.style.setProperty('--ea-scrollbar-thumb-horizontal-width', `${horizontalThumbWidth * 100}%`);

            this.#verticalTrack.classList.toggle('is-show', verticalThumbHeight >= 1);
            this.#horizontalTrack.classList.toggle('is-show', horizontalThumbWidth >= 1);
        })
    }

    /**
     * 垂直滚动条拖动事件
     * @param {MouseEvent} e
     */
    #verticalMouseMoveEvent = (e) => {
        const thumbHeight = this.#verticalThumb.offsetHeight / 2;
        const initTop = e.clientY - thumbHeight + (this.#view.scrollTop / this.#view.scrollHeight)

        this.#view.scrollTo({
            top: initTop * this.#view.scrollHeight / this.#view.clientHeight,
            behavior: "instant"
        });

        this.#verticalThumb.classList.add('is-active');
    }

    /**
     * 水平滚动条拖动事件
     * @param {MouseEvent} e
     */
    #horizontalMouseMoveEvent = (e) => {
        const thumbWidth = this.#horizontalThumb.offsetWidth / 2;
        const initLeft = e.clientX - thumbWidth + (this.#view.scrollLeft / this.#view.scrollWidth)

        this.#view.scrollTo({
            left: initLeft * this.#view.scrollWidth / this.#view.clientWidth,
            behavior: "instant"
        });

        this.#horizontalThumb.classList.add('is-active');
    }

    /**
     * 鼠标按下事件
     * @param {MouseEvent} e 
     */
    #mouseDownEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const controller = new AbortController();

        const isHorizontal = e.target === this.#horizontalThumb;

        window.addEventListener('mousemove', isHorizontal ? this.#horizontalMouseMoveEvent : this.#verticalMouseMoveEvent, { signal: controller.signal });

        window.addEventListener('mouseup', () => {
            controller.abort();
            this.#horizontalThumb.classList.remove('is-active');
            this.#verticalThumb.classList.remove('is-active');
        }, { signal: controller.signal });
    }

    connectedCallback() {
        super.connectedCallback();

        this.native = this.native;
        this.noresize = this.noresize;
        this.always = this.always;

        this.eventController = new AbortController();
        const controller = this.eventController;

        this.#resizeEvent();
        this.#view.addEventListener('scroll', this.#scrollEvent, { signal: controller.signal });
        this.#horizontalThumb.addEventListener('mousedown', this.#mouseDownEvent, { signal: controller.signal });
        this.#verticalThumb.addEventListener('mousedown', this.#mouseDownEvent, { signal: controller.signal });

        if (!this.noresize) {
            this.#container.addEventListener('resize', this.#resizeEvent, { signal: controller.signal });
        }

        window.addEventListener('load', this.#resizeEvent, { signal: controller.signal })
    }

    /**
     * @exports scrollTo
     * @param {ScrollToOptions} options 
     */
    scrollTo(options) {
        this.#view.scrollTo(options)
    }

    $beforeUnmounted() {
        this.eventController?.abort();
    }
}
if (!window.customElements.get('ea-scrollbar')) {
    window.customElements.define('ea-scrollbar', EaScrollbar);
}