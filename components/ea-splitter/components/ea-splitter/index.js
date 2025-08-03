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
     * `layout="horizontal"` 时的 `resize` 事件监听
     * @param {MouseEvent} e
     */
    #splitterColResizeEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const controller = new AbortController();
        const index = Number(e.target.getAttribute('data-index'));

        const preChild = this.children[index - 1];
        const nextChild = this.children[index + 1];

        const startX = e.clientX;

        const preChildRect = preChild.getBoundingClientRect();
        const initialPreWidth = preChildRect.width;

        const nextChildRect = nextChild.getBoundingClientRect();
        const initialNextWidth = nextChildRect.width;

        this.#dispatchResizeEvent('panel-resize-start');

        const mousemoveHandler = (moveE) => {
            e.preventDefault();
            e.stopPropagation();

            const deltaX = moveE.clientX - startX;

            const newPreWidth = initialPreWidth + deltaX;
            const newNextWidth = initialNextWidth - deltaX;

            let currentPreWidth = 0;
            let currentNextWidth = 0;
            if (preChild.min.endsWith('%')) {
                currentPreWidth = this.#container.clientWidth * parseCSSMinValue(preChild.min);
                currentNextWidth = this.#container.clientWidth * parseCSSMinValue(nextChild.min);
            } else if (preChild.min.endsWith('px')) {
                currentPreWidth = parseCSSMinValue(preChild.min);
                currentNextWidth = parseCSSMinValue(nextChild.min);
            }

            if (newPreWidth <= currentPreWidth || newNextWidth <= currentNextWidth) return;

            preChild.size = newPreWidth + 'px';
            nextChild.size = newNextWidth + 'px';

            this.#dispatchResizeEvent("panel-resize");
        };

        const mouseupHandler = () => {
            controller.abort();

            this.#dispatchResizeEvent("panel-resize-end");
        };

        window.addEventListener('mousemove', mousemoveHandler, { signal: controller.signal });
        window.addEventListener('mouseup', mouseupHandler, { signal: controller.signal });
    }

    /**
     * `layout="vertical"` 时的 `resize` 事件监听
     * @param {MouseEvent} e
     */
    #splitterRowResizeEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const controller = new AbortController();
        const index = Number(e.target.getAttribute('data-index'));

        const preChild = this.children[index - 1];
        const nextChild = this.children[index + 1];

        const startY = e.clientY;

        const preChildRect = preChild.getBoundingClientRect();
        const initialPreHeight = preChildRect.height;

        const nextChildRect = nextChild.getBoundingClientRect();
        const initialNextHeight = nextChildRect.height;

        this.#dispatchResizeEvent('resize-start');

        const mousemoveHandler = (moveE) => {
            e.preventDefault();
            e.stopPropagation();

            const deltaY = moveE.clientY - startY;

            const newPreHeight = initialPreHeight + deltaY;
            const newNextHeight = initialNextHeight - deltaY;

            let currentPreHeight = 0;
            let currentNextHeight = 0;
            if (preChild.min.endsWith('%')) {
                currentPreHeight = this.#container.clientHeight * parseCSSMinValue(preChild.min);
                currentNextHeight = this.#container.clientHeight * parseCSSMinValue(nextChild.min);
            } else if (preChild.min.endsWith('px')) {
                currentPreHeight = parseCSSMinValue(preChild.min);
                currentNextHeight = parseCSSMinValue(nextChild.min);
            }

            if (newPreHeight <= currentPreHeight || newNextHeight <= currentNextHeight) return;

            preChild.size = newPreHeight + 'px';
            nextChild.size = newNextHeight + 'px';

            this.#dispatchResizeEvent("panel-resize");
        };

        const mouseupHandler = () => {
            controller.abort();

            this.#dispatchResizeEvent("panel-resize-end");
        };

        window.addEventListener('mousemove', mousemoveHandler, { signal: controller.signal });
        window.addEventListener('mouseup', mouseupHandler, { signal: controller.signal });
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