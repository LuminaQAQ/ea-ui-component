// @ts-nocheck
import { createElement, createSlotElement } from '../../utils/createElement.js';
import Base from '../Base.js';
import '../ea-icon/index.js'
import "../ea-menu-item/index.js"
import "../ea-submenu/index.js"
import "../ea-menu-item-group/index.js"

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-menu_wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
}
.ea-menu_wrap.is-vertical {
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid #e6e6e6;
  overflow: auto;
}
.ea-menu_wrap.is-vertical ::slotted(ea-menu-item),
.ea-menu_wrap.is-vertical ::slotted(ea-submenu) {
  width: 100%;
}
.ea-menu_wrap.is-vertical ::slotted(ea-submenu) {
  width: 100%;
}
`;

export class EaMenu extends Base {
    #wrap;
    #slot;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-menu_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;
        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- mode 顶栏排列方式 -------
    // #region
    get mode() {
        return this.getAttribute('mode') || 'vertical';
    }

    set mode(value) {
        this.setAttribute('mode', value);

        this.#wrap.classList.toggle('is-vertical', value === 'vertical');
        this.querySelectorAll('ea-submenu').forEach((item) => {
            item.mode = value;
        });
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

        this.#wrap.style.backgroundColor = value;
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
    }
    // #endregion
    // ------- end -------

    // ------- collapse 是否折叠 -------
    // #region
    get collapse() {
        return this.getAttrBoolean('collapse');
    }

    set collapse(value) {
        this.toggleAttr('collapse', value);

        this.querySelectorAll('ea-menu-item-group').forEach((item) => {
            if (this.mode === 'vertical') item.collapse = !value;
        });

        // if (this.mode === 'vertical') this.#wrap.style.width = '48px';
    }
    // #endregion
    // ------- end -------

    #handleMenuItemEvent() {
        const items = this.querySelectorAll('ea-menu-item');
        const subMenuItems = this.querySelectorAll('ea-submenu');
        const menuItemGroups = this.querySelectorAll('ea-menu-item-group');

        const callback = (item, index) => {
            item.actived = false;
        }


        items.forEach((item, index) => {
            item.itemIndex = index;

            item.addEventListener('item-selected', (e) => {
                const itemTitle = e.detail.title;

                items.forEach(callback);

                subMenuItems.forEach(callback);

                menuItemGroups.forEach(callback);

                item.actived = true;

                this.dispatchEvent(new CustomEvent('select', {
                    detail: {
                        index,
                        title: itemTitle,
                    },
                }));
            });
        });

    }

    #handleMenuColorStyle() {
        const normalItems = this.querySelectorAll('ea-menu-item');
        const subItems = this.querySelectorAll('ea-submenu');
        const menuItemGroups = this.querySelectorAll('ea-menu-item-group');

        const callback = (item, index) => {
            item.backgroundColor = this.backgroundColor;
            item.textColor = this.textColor;
            item.activeTextColor = this.activeTextColor;
        }

        normalItems.forEach(callback);

        subItems.forEach(callback);

        menuItemGroups.forEach(callback);
    }

    #init() {
        const that = this;

        this.mode = this.mode;

        this.collapse = true;

        this.backgroundColor = this.backgroundColor;
        this.textColor = this.textColor;
        this.activeTextColor = this.activeTextColor;

        this.#handleMenuItemEvent();

        let timer = setTimeout(() => {
            this.#handleMenuColorStyle();

            clearTimeout(timer);
            timer = null;
        }, 20)
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-menu')) {
    customElements.define('ea-menu', EaMenu);
}