// @ts-nocheck
import { createElement, createSlotElement } from '../../utils/createElement.js';
import Base from '../Base.js';
import '../ea-icon/index.js'

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-submenu_wrap {
  --normal-bgc: #fff;
  --normal-text-color: #303133;
  --actived-text-color: #409eff;
  --actived-bgc: #fff;
  position: relative;
  box-sizing: border-box;
  padding: 0 20px;
  border-bottom: 2px solid;
  border-color: transparent;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: var(--normal-text-color);
  background-color: var(--normal-bgc);
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}
.ea-submenu_wrap .ea-submenu_title_wrap {
  display: flex;
  justify-content: space-between;
}
.ea-submenu_wrap .ea-submenu_title_wrap .ea-submenu_dropdown_icon {
  rotate: -90deg;
  transition: rotate 0.3s;
}
.ea-submenu_wrap .ea-submenu_items_wrap {
  display: none;
  position: absolute;
  left: 0;
  margin-top: 3px;
  border-radius: 8px;
  overflow: hidden;
  min-width: 200px;
  z-index: 100;
  opacity: 0;
  transform-origin: left top;
  transform: scale(0);
  transition: opacity 0.3s, transform 0.3s;
}
.ea-submenu_wrap:hover .ea-submenu_items_wrap {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.ea-submenu_wrap:hover .ea-submenu_title_wrap .ea-submenu_dropdown_icon {
  rotate: 0deg;
}
.ea-submenu_wrap.is-actived {
  color: var(--actived-text-color);
  border-color: var(--actived-text-color);
}
.ea-submenu_wrap.is-sub-actived {
  color: var(--actived-text-color);
}
.ea-submenu_wrap.is-disabled {
  color: #c0c4cc;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-submenu_wrap ::slotted(a) {
  color: var(--normal-text-color);
  text-decoration: none;
}
`;

export class EaSubmenu extends Base {
    #wrap;
    #titleWrap;
    #subItemsWrap;

    #slot;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-submenu_wrap';
        wrap.part = 'wrap';

        const titleSlot = createSlotElement('title');
        const dropdowpIcon = createElement('i', 'ea-submenu_dropdown_icon icon-angle-down');
        const titleWrap = createElement('div', 'ea-submenu_title_wrap', [titleSlot, dropdowpIcon]);
        wrap.appendChild(titleWrap);

        const slot = createSlotElement();
        const subItemsWrap = createElement('div', 'ea-submenu_items_wrap', [slot]);
        subItemsWrap.part = 'dropdown-wrap';
        wrap.appendChild(subItemsWrap);

        this.#wrap = wrap;
        this.#titleWrap = titleWrap;
        this.#subItemsWrap = subItemsWrap;

        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- actived 菜单激活状态 -------
    // #region
    get actived() {
        return this.getAttrBoolean('actived');
    }

    set actived(value) {
        this.setAttribute('actived', value);

        this.#wrap.classList.toggle('is-actived', value);
    }
    // #endregion
    // ------- end -------


    // ------- background-color 背景颜色 -------
    // #region
    get backgroundColor() {
        return this.getAttribute('background-color') || '#fff';
    }

    set backgroundColor(value) {
        this.setAttribute('background-color', value);

        this.#wrap.style.setProperty('--normal-bgc', value);
    }
    // #endregion
    // ------- end -------


    // ------- text-color 文字颜色 -------
    // #region
    get textColor() {
        return this.getAttribute('text-color') || '#303133';
    }

    set textColor(value) {
        this.setAttribute('text-color', value);

        this.#wrap.style.setProperty('--normal-text-color', value);
    }
    // #endregion
    // ------- end -------

    // ------- active-text-color 激活文字颜色 -------
    // #region
    get activeTextColor() {
        return this.getAttribute('active-text-color') || '#409eff';
    }

    set activeTextColor(value) {
        this.setAttribute('active-text-color', value);

        this.#wrap.style.setProperty('--actived-text-color', value);
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(value) {
        this.setAttribute('disabled', value);

        this.#wrap.classList.toggle('is-disabled', value);
    }
    // #endregion
    // ------- end -------

    // ------- mode 菜单模式 -------
    // #region
    get mode() {
        return this.getAttribute('mode') || 'horizontal';
    }

    set mode(value) {
        this.setAttribute('mode', value);

        this.#wrap.classList.toggle('is-vertical', value === 'vertical');
    }
    // #endregion
    // ------- end -------

    #handleSubMenuItemsEvent() {
        const items = this.querySelectorAll('ea-menu-item');

        items.forEach((item, index) => {
            item.isSubItem = true;

            item.addEventListener('item-selected', (e) => {
                this.actived = true;
            });
        });
    }

    #init() {
        const that = this;

        this.disabled = this.disabled;

        this.#handleSubMenuItemsEvent();

        let timer = setTimeout(() => {
            this.#subItemsWrap.style.display = "block";

            clearTimeout(timer);
            timer = null;
        }, 20);
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-submenu')) {
    customElements.define('ea-submenu', EaSubmenu);
}