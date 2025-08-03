import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaSplitter extends Base {
    /** @type {HTMLElement} */
    #container;

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
     * 
     * @param {MouseEvent} e
     */
    #splitterColResizeEvent = (e) => {
        const controller = new AbortController();
        const index = Number(e.target.getAttribute('data-index'));

        const preChild = this.children[index - 1];
        const nextChild = this.children[index + 1];

        const startX = e.clientX;

        const preChildRect = preChild.getBoundingClientRect();
        const initialPreWidth = preChildRect.width;

        const nextChildRect = nextChild.getBoundingClientRect();
        const initialNextWidth = nextChildRect.width;

        const mousemoveHandler = (moveE) => {
            const deltaX = moveE.clientX - startX;

            const newPreWidth = initialPreWidth + deltaX;
            const newNextWidth = initialNextWidth - deltaX;

            preChild.size = newPreWidth + 'px';
            nextChild.size = newNextWidth + 'px';
        };

        const mouseupHandler = () => {
            controller.abort();
        };

        window.addEventListener('mousemove', mousemoveHandler, { signal: controller.signal });
        window.addEventListener('mouseup', mouseupHandler, { signal: controller.signal });
    }

    #splitterRowResizeEvent = (e) => {
        const controller = new AbortController();
        const index = Number(e.target.getAttribute('data-index'));

        const preChild = this.children[index - 1];
        const nextChild = this.children[index + 1];

        const startY = e.clientY;

        const preChildRect = preChild.getBoundingClientRect();
        const initialPreHeight = preChildRect.height;

        const nextChildRect = nextChild.getBoundingClientRect();
        const initialNextHeight = nextChildRect.height;

        const mousemoveHandler = (moveE) => {
            const deltaY = moveE.clientY - startY;

            const newPreHeight = initialPreHeight + deltaY;
            const newNextHeight = initialNextHeight - deltaY;

            preChild.size = newPreHeight + 'px';
            nextChild.size = newNextHeight + 'px';
        };

        const mouseupHandler = () => {
            controller.abort();
        };

        window.addEventListener('mousemove', mousemoveHandler, { signal: controller.signal });
        window.addEventListener('mouseup', mouseupHandler, { signal: controller.signal });
    }

    connectedCallback() {
        super.connectedCallback();

        this.layout = this.layout;

        queueMicrotask(() => {
            let children = [...this.children];
            [...this.children].forEach((child, index) => {
                if (child.tagName === 'EA-SPLITTER-PANEL' && index < children.length - 1) {
                    const splitterBar = document.createElement('ea-splitter-bar');
                    this.insertBefore(splitterBar, child.nextSibling);
                }
            });

            children = [...this.children];
            children.forEach((child, index) => {
                if (child.tagName === 'EA-SPLITTER-BAR') {
                    child.setAttribute("data-index", index);
                    child.addEventListener('mousedown', this.layout === "horizontal" ? this.#splitterColResizeEvent : this.#splitterRowResizeEvent);
                }
            });
        })
    }
}

if (!window.customElements.get('ea-splitter')) {
    window.customElements.define('ea-splitter', EaSplitter);
}