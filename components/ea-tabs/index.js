// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-tab/index.js"
import '../ea-pane/index.js'

const stylesheet = `
.ea-tabs_wrap {
  position: relative;
}
.ea-tabs_wrap .ea-tabs_tab-wrap {
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: thin;
}
.ea-tabs_wrap .ea-tabs_pane-wrap {
  padding: 20px;
}
.ea-tabs_wrap .ea-tabs_tab-bottom-bar {
  position: absolute;
  height: 2px;
  width: 0;
  top: 40px;
  left: 0;
  border-radius: 999px;
  background-color: #409eff;
  transition: left 0.3s;
}
.ea-tabs_wrap.ea-tabs_wrap--normal .ea-tabs_tab-wrap {
  border-bottom: 2px solid #e4e7ed;
}
.ea-tabs_wrap.ea-tabs_wrap--card .ea-tabs_tab-wrap {
  border-bottom: 1px solid #e4e7ed;
}
.ea-tabs_wrap.ea-tabs_wrap--card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
.ea-tabs_wrap.ea-tabs_wrap--border-card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.ea-tabs_wrap.ea-tabs_wrap--border-card .ea-tabs_tab-wrap {
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}
.ea-tabs_wrap.ea-tabs_wrap--border-card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
`;

export class EaTabs extends Base {
    #wrap;
    #tabBottomBar;
    #paneWrap;

    #tabSlot;

    #previousNodesLen = 0;

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
        this.#tabSlot = slot;

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

        if (value !== 'border-card') {
            items[0].handleBorderRadius('--border-radius-top-left');
            items[items.length - 1].handleBorderRadius('--border-radius-top-right');
            items[items.length - 1].handleBorderRightWidth();
        }
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
            item.actived = item.name === value;
        });
    }
    // #endregion
    // ------- end -------

    // ------- editable 标签是否可编辑 -------
    // #region
    get editable() {
        return this.getAttrBoolean('editable') || false;
    }

    set editable(value) {
        this.setAttribute('editable', value);

        this.#handleEditable(value);
    }
    // #endregion
    // ------- end -------

    #handleBottomBarMove(e) {
        const items = this.querySelectorAll('ea-tab');
        const paneItems = this.querySelectorAll('ea-pane');

        const { width, height } = e.getBoundingClientRect();
        const arr = Array.from(items);
        const left = arr.reduce((pre, cur, index) => {
            if (index <= e.index) return pre + cur.offsetWidth;

            return pre;
        }, 0);

        const callback = (item, index) => {
            item.actived = false;
            item.index = index;
        }

        items.forEach(callback);
        paneItems.forEach(callback);
        e.actived = true;
        this.querySelector(`ea-pane[name="${e.name}"]`).actived = true;

        this.#tabBottomBar.style.left = left - width + 'px';
        this.#tabBottomBar.style.width = width + 'px';
        this.#tabBottomBar.style.top = height + 'px';
    }

    #handleSubItemsName() {
        const items = this.querySelectorAll('ea-tab');
        const paneItems = this.querySelectorAll('ea-pane');

        const eventListener = (e) => {
            this.#handleBottomBarMove(e.detail.event);
            this.actived = e.detail.name;
            e.detail.event.actived = true;
        }

        items.forEach((item, index) => {
            item.index = index;

            if (!item.name) {
                item.name = index;
            }

            item.removeEventListener('tab-click', eventListener);
            item.addEventListener('tab-click', eventListener);
        })

        paneItems.forEach((item, index) => {
            item.index = index;

            if (!item.name) {
                item.name = index;
            }
        })
    }

    #initBottomBarMove() {
        setTimeout(() => {
            const item = this.querySelector('ea-tab[name="' + this.actived + '"]');
            item.actived = true;
            this.#handleBottomBarMove(item);
        }, 20)
    }

    #handleTabCloseEventListener(e) {
        e.stopPropagation();

        const items = this.querySelectorAll('ea-tab');
        const { name, event, index } = e.detail;
        let willActivedIndex = index;

        if (items[index + 1]) {
            willActivedIndex = index + 1;
        } else if (items[index - 1]) {
            willActivedIndex = index - 1;
        }


        try {
            this.actived = items[willActivedIndex]?.name;

            event.remove();
            this.querySelector(`ea-pane[name="${name}"]`).remove();

            if (items.length <= 1) {
                this.#tabBottomBar.style.width = 0;
            } else {
                this.#initBottomBarMove();
                this.#handleSubItemsName();
            }
        } catch (error) { }
    }

    #handleEditable(value) {
        this.querySelectorAll('ea-tab').forEach(item => {
            item.editable = value;
        });

        this.removeEventListener('tab-close', this.#handleTabCloseEventListener);
        this.addEventListener('tab-close', this.#handleTabCloseEventListener);
    }

    #handleTabAdd() {
        setTimeout(() => {
            this.#previousNodesLen = this.#tabSlot.assignedNodes().length;

            this.#tabSlot.addEventListener('slotchange', (e) => {
                const currentNodesLen = e.target.assignedNodes().length;

                if (currentNodesLen > this.previousNodesLen) {
                    this.#handleSubItemsName();
                    this.#handleEditable(this.editable);
                    this.type = this.type;

                    this.#previousNodesLen = currentNodesLen;

                    this.dispatchEvent(new CustomEvent('tab-add', {
                        detail: {
                            event: e,
                            tabs: this.querySelectorAll('ea-tab'),
                            panes: this.querySelectorAll('ea-pane'),
                        },
                        bubbles: true,
                        composed: true,
                    }));

                }
            })
        }, 20)
    }

    #init() {
        const that = this;

        this.type = this.type;

        this.actived = this.actived;

        this.editable = this.editable;

        this.#initBottomBarMove();
        this.#handleSubItemsName();
        this.#handleTabAdd();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-tabs')) {
    customElements.define('ea-tabs', EaTabs);
}