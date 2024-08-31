// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

import "../ea-pane/index.js"

import { createElement } from '../../utils/createElement.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaTab extends Base {
    #wrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-tab_wrap" part="container">
                <slot></slot>
            </div>
        `;
        this.#wrap = shadowRoot.querySelector('.ea-tab_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- name 唯一标识 -------
    // #region
    get name() {
        return this.getAttribute('name');
    }

    set name(value) {
        this.setAttribute('name', value);
    }
    // #endregion
    // ------- end -------

    // ------- type 标签样式类型 -------
    // #region
    get type() {
        return this.getAttrBoolean('type') || 'normal';
    }

    set type(value) {
        this.setAttribute('type', value);

        this.#wrap.classList.add(`ea-tab_wrap--${value}`);
    }
    // #endregion
    // ------- end -------

    // ------- actived 标签是否被选中 -------
    // #region
    get actived() {
        return this.getAttrBoolean('actived');
    }

    set actived(value) {
        this.toggleAttr('actived', value);

        this.#wrap.classList.toggle('is-actived', value);
    }
    // #endregion
    // ------- end -------

    // ------- editable 是否可关闭 -------
    // #region
    get editable() {
        return this.getAttrBoolean('editable');
    }

    set editable(value) {
        this.setAttribute('editable', value);
        this.#wrap.classList.toggle('ea-tab_wrap--editable', value);

        if (value) {
            this.#handleTabCloasable();
        }
    }
    // #endregion
    // ------- end -------

    #handleSelectedEvent() {
        this.addEventListener('click', (e) => {
            const isSelected = e.detail.value === this.getAttrBoolean('selected');
            this.toggleAttr('selected', isSelected)

            this.dispatchEvent(new CustomEvent('tab-click', {
                detail: {
                    name: this.name,
                    event: this,
                },
                bubbles: true,
            }));
        });
    }

    #handleTabCloasable() {
        const span = createElement('span', 'ea-tab_wrap--editable-sign');
        span.innerText = 'x';
        this.#wrap.appendChild(span);

        span.addEventListener('click', (e) => {
            e.stopPropagation();

            this.dispatchEvent(new CustomEvent('tab-close', {
                detail: {
                    event: this,
                    name: this.name,
                    index: this.index,
                },
                bubbles: true,
            }));
        });
    }

    handleBorderRadius(key) {
        this.#wrap.style.setProperty(key, '3px');
    }

    handleBorderRightWidth() {
        this.#wrap.style.setProperty('--border-right-width', '1px');
    }

    connectedCallback() {
        this.label = this.label;

        this.#handleSelectedEvent();
    }
}

if (!customElements.get('ea-tab')) {
    customElements.define('ea-tab', EaTab);
}