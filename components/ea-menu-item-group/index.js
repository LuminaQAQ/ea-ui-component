// @ts-nocheck
import { createElement, createSlotElement } from '../../utils/createElement.js';
import Base from '../Base.js';
import '../ea-icon/index.js'

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-menu-item-group_wrap {
  --normal-bgc: #fff;
  --normal-text-color: #303133;
  --actived-text-color: #409eff;
  --actived-bgc: #fff;
  width: 100%;
}
.ea-menu-item-group_wrap.is-actived .ea-submenu_title_wrap {
  color: var(--actived-text-color);
  border-color: var(--actived-text-color);
}
.ea-menu-item-group_wrap .ea-submenu_title_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
.ea-menu-item-group_wrap .ea-submenu_items_wrap {
  margin: 0 20px;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;
}
`;

export class EaMenuItemGroup extends Base {
    #wrap;
    #titleWrap;
    #subItemsWrap;
    #dropdowpIcon;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-menu-item-group_wrap';
        wrap.part = 'wrap';

        const titleSlot = createSlotElement('title');
        const dropdowpIcon = createElement('i', 'ea-submenu_dropdown_icon icon-angle-down');
        dropdowpIcon.part = 'dropdown-icon';
        dropdowpIcon.style.transition = 'transform 0.3s';
        dropdowpIcon.style.transform = 'rotate(-90deg)';
        const titleWrap = createElement('div', 'ea-submenu_title_wrap', [titleSlot, dropdowpIcon]);
        wrap.appendChild(titleWrap);

        const slot = createSlotElement();
        const subItemsWrap = createElement('div', 'ea-submenu_items_wrap', [slot]);
        subItemsWrap.part = 'dropdown-wrap';
        wrap.appendChild(subItemsWrap);

        this.#wrap = wrap;
        this.#titleWrap = titleWrap;
        this.#subItemsWrap = subItemsWrap;
        this.#dropdowpIcon = dropdowpIcon;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);

        this.style.width = '100%';
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

    // ------- collapse 是否折叠 -------
    // #region
    get collapse() {
        return this.getAttrBoolean('collapse') || false;
    }

    set collapse(value) {
        this.setAttribute('collapse', value);

        this.#subItemsWrap.style.height = value ? this.#subItemsWrap.scrollHeight + 'px' : '0';
        this.#dropdowpIcon.style.transform = value ? 'rotate(0deg)' : 'rotate(-90deg)';
    }
    // #endregion
    // ------- end -------

    #handleSubMenuItemsEvent() {
        const items = this.querySelectorAll('ea-menu-item');

        items.forEach((item, index) => {
            item.isSubItem = true;

            item.addEventListener('item-selected', (e) => {
                let timer = setTimeout(() => {
                    this.actived = true;
                    clearTimeout(timer);
                    timer = null;
                }, 20);
            });
        });

        this.#titleWrap.addEventListener('click', (e) => {
            this.collapse = !this.collapse;
        });
    }

    #init() {
        const that = this;

        this.#handleSubMenuItemsEvent();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-menu-item-group')) {
    customElements.define('ea-menu-item-group', EaMenuItemGroup);
}