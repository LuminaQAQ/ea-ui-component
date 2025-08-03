import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

const parseCSSMinValue = (value) => {
    if (value.endsWith('px')) {
        return parseInt(value.replace('px', ''));
    }

    if (value.endsWith('%')) {
        return Number(value.replace('%', '')) / 100
    }

    return parseInt(value);
};

export class EaSplitter extends Base {
    /** @type {HTMLElement} */
    #container;
    /** @type {AbortController} */
    #resizeController;

    static get observedAttributes() {
        return ['layout'];
    }

    state = this.properties({
        layout: {
            type: ['horizontal', 'vertical'],
            default: 'horizontal',
            observer: (newVal) => {
                this.#container.style.setProperty('--ea-splitter-direction', newVal === 'vertical' ? 'column' : 'row');
                this.#container.className = this.updateContainerClasslist();
            }
        },
    })

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
          <div class="ea-splitter" part="container">
            <slot></slot>
          </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-splitter');
    }

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-splitter', {
            ['--' + this.layout]: this.layout || this.layout === '' ? true : false,
        });
    }

    /**
     * 派发 resizeStart 事件
     * @param {string} eventName 事件名称
     */
    #dispatchResizeEvent = (eventName) => {
        this.dispatchEvent(new CustomEvent(eventName, {
            detail: {
                size: [...this.children].filter(child => child.tagName === 'EA-SPLITTER-PANEL').map(child => child.getBoundingClientRect()?.[this.layout === 'vertical' ? 'height' : 'width'])
            }
        }))
    }

    /**
     * panel resize 的公共逻辑
     * @param {MouseEvent} e 
     * @param {Boolean} isCol 
     */
    #setupResizeEvent = (e, isCol = true) => {
        e.preventDefault();
        e.stopPropagation();

        const controller = new AbortController();
        const index = Number(e.target.getAttribute('data-index'));

        const preChild = this.children[index - 1];
        const nextChild = this.children[index + 1];

        const startCoord = isCol ? e.clientX : e.clientY;

        const preRect = preChild.getBoundingClientRect();
        const nextRect = nextChild.getBoundingClientRect();
        const initialPreSize = isCol ? preRect.width : preRect.height;
        const initialNextSize = isCol ? nextRect.width : nextRect.height;

        this.#dispatchResizeEvent(`panel-resize-start`);

        const mousemoveHandler = (moveE) => {
            moveE.preventDefault();
            moveE.stopPropagation();

            const delta = (isCol ? moveE.clientX : moveE.clientY) - startCoord;
            const newPreSize = initialPreSize + delta;
            const newNextSize = initialNextSize - delta;

            let currentPreMin = 0;
            let currentNextMin = 0;
            const containerSize = isCol ? this.#container.clientWidth : this.#container.clientHeight;

            if (preChild.min.endsWith('%')) {
                currentPreMin = containerSize * parseCSSMinValue(preChild.min);
                currentNextMin = containerSize * parseCSSMinValue(nextChild.min);
            } else if (preChild.min.endsWith('px')) {
                currentPreMin = parseCSSMinValue(preChild.min);
                currentNextMin = parseCSSMinValue(nextChild.min);
            }

            if (newPreSize <= currentPreMin || newNextSize <= currentNextMin) return;

            preChild.size = newPreSize + 'px';
            nextChild.size = newNextSize + 'px';

            this.#dispatchResizeEvent(`panel-resize`);
        };

        const mouseupHandler = () => {
            controller.abort();
            this.#dispatchResizeEvent(`panel-resize-end`);
        };

        window.addEventListener('mousemove', mousemoveHandler, { signal: controller.signal });
        window.addEventListener('mouseup', mouseupHandler, { signal: controller.signal });
    };


    /**
     * `layout="horizontal"` 时的 `resize` 事件监听
     * @param {MouseEvent} e
     */
    #splitterColResizeEvent = (e) => {
        this.#setupResizeEvent(e, true);
    }

    /**
     * `layout="vertical"` 时的 `resize` 事件监听
     * @param {MouseEvent} e
     */
    #splitterRowResizeEvent = (e) => {
        this.#setupResizeEvent(e, true);
    }

    connectedCallback() {
        super.connectedCallback();
        this.#resizeController = new AbortController();

        this.layout = this.layout;

        queueMicrotask(() => {
            let children = [...this.children];
            [...this.children].forEach((child, index) => {
                if (child.tagName === 'EA-SPLITTER-PANEL') {
                    child.layout = this.layout;

                    child.setAttribute("data-panel-index", index);

                    if (index < children.length - 1) {
                        const splitterBar = document.createElement('ea-splitter-bar');
                        this.insertBefore(splitterBar, child.nextSibling);
                    }
                }
            });

            children = [...this.children];
            children.forEach((child, index) => {
                if (child.tagName === 'EA-SPLITTER-BAR') {
                    child.setAttribute("data-index", index);
                    child.layout = this.layout;
                    child.addEventListener('mousedown', this.layout === "horizontal" ? this.#splitterColResizeEvent : this.#splitterRowResizeEvent, { signal: this.#resizeController.signal });
                }
            });
        })
    }

    $beforeUnmounted() {
        this.#resizeController?.abort();
    }
}

if (!window.customElements.get('ea-splitter')) {
    window.customElements.define('ea-splitter', EaSplitter);
}