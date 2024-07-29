// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-tab/index.js"
import '../ea-pane/index.js'

const stylesheet = `

`;

export class EaTabs extends Base {
    #wrap;
    #tabBottomBar;
    #paneWrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-tabs_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        const tabWrap = createElement('div', 'ea-tabs_tab-wrap', [slot]);
        wrap.appendChild(tabWrap);

        const tabBottomBar = createElement('div', 'ea-tabs_tab-bottom-bar');
        wrap.appendChild(tabBottomBar);

        const paneSlot = createSlotElement('pane');
        const paneWrap = createElement('div', 'ea-tabs_pane-wrap', [paneSlot]);
        wrap.appendChild(paneWrap);

        this.#wrap = wrap;
        this.#tabBottomBar = tabBottomBar;
        this.#paneWrap = paneWrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- type 标签样式类型 -------
    // #region
    get type() {
        return this.getAttribute('type') || 'normal';
    }

    set type(value) {
        this.setAttribute('type', value);

        this.#wrap.classList.add('ea-tabs_wrap--' + value);

        const items = this.querySelectorAll(`ea-tab`);
        items.forEach(item => {
            item.type = value;
        });

        items[0].handleBorderRadius('--border-radius-top-left');
        items[items.length - 1].handleBorderRadius('--border-radius-top-right');
        items[items.length - 1].handleBorderRightWidth();
    }
    // #endregion
    // ------- end -------

    // ------- actived 标签是否被选中 -------
    // #region
    get actived() {
        return this.getAttribute('actived') || this.querySelectorAll('ea-tab')[0].name || 0;
    }

    set actived(value) {
        this.setAttribute('actived', value);

        this.querySelectorAll('ea-tab').forEach((item, index) => {
            item.actived = index === value;
        });
    }
    // #endregion
    // ------- end -------

    #handleBottomBarMove(e) {
        const items = this.querySelectorAll('ea-tab');
        const paneItems = this.querySelectorAll('ea-pane');

        const target = e;
        const { left, width, height } = target.getBoundingClientRect();

        items.forEach(item => {
            item.actived = false;
        });
        e.actived = true;

        paneItems.forEach(item => {
            item.actived = false;
        });
        this.querySelector(`ea-pane[name="${e.name}"]`).actived = true;

        this.#tabBottomBar.style.left = left - 8 + 'px';
        this.#tabBottomBar.style.width = width + 'px';
        this.#tabBottomBar.style.top = height + 'px';
    }

    #handleSubItemsName() {
        const items = this.querySelectorAll('ea-tab');

        items.forEach((item, index) => {
            item.index = index;

            if (!item.name) {
                item.name = index;
            }

            item.addEventListener('tab-click', (e) => {
                this.#handleBottomBarMove(e.detail.event);
                this.actived = e.detail.name;
                e.detail.event.actived = true;
            })
        })
    }

    #initBottomBarMove() {
        setTimeout(() => {
            const item = this.querySelector('ea-tab[name="' + this.actived + '"]');
            item.actived = true;
            this.#handleBottomBarMove(item);
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