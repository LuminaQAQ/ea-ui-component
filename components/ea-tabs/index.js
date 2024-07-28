// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-tab-pane/index.js"

const stylesheet = `

`;

export class EaTabs extends Base {
    #wrap;
    #tabBottomBar;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-tabs_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        const tabBottomBar = createElement('div', 'ea-tabs_tab-bottom-bar');
        wrap.appendChild(tabBottomBar);

        this.#wrap = wrap;
        this.#tabBottomBar = tabBottomBar;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- type 标签样式类型 -------
    // #region
    get type() {
        return this.getAttribute('type') || 'border-card';
    }

    set type(value) {
        this.setAttribute('type', value);

        this.#wrap.classList.add('ea-tabs_wrap--' + value);
        this.querySelectorAll('ea-tab-pane').forEach(item => {
            item.type = value;
        });
    }
    // #endregion
    // ------- end -------

    // ------- actived 标签是否被选中 -------
    // #region
    get actived() {
        return this.getAttribute('actived') || this.querySelectorAll('ea-tab-pane')[0].name || 0;
    }

    set actived(value) {
        this.setAttribute('actived', value);

        this.querySelectorAll('ea-tab-pane').forEach((item, index) => {
            item.actived = index === value;
        });
    }
    // #endregion
    // ------- end -------

    #handleBottomBarMove(e) {
        const target = e;
        const { left, width } = target.getBoundingClientRect();

        this.#tabBottomBar.style.left = left - 8 + 'px';
        this.#tabBottomBar.style.width = width + 'px';
    }

    #handleSubItemsName() {
        const items = this.querySelectorAll('ea-tab-pane');

        items.forEach((item, index) => {
            item.index = index;

            if (!item.name) {
                item.name = index;
            }

            item.addEventListener('tab-click', (e) => {
                this.#handleBottomBarMove(e.detail.event);
            })
        })
    }

    #initBottomBarMove() {
        setTimeout(() => {
            const item = this.querySelector('ea-tab-pane[name="' + this.actived + '"]');
            this.#handleBottomBarMove(item)
        }, 20)
    }

    #init() {
        const that = this;

        this.type = this.type;

        this.actived = this.actived;

        this.#initBottomBarMove();
        this.#handleSubItemsName();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-tabs')) {
    customElements.define('ea-tabs', EaTabs);
}