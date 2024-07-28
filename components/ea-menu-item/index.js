// @ts-nocheck
import { createElement, createSlotElement } from '../../utils/createElement.js';
import Base from '../Base.js';
import '../ea-icon/index.js'


const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-menu-item_wrap {
  --normal-bgc: #fff;
  --normal-text-color: #303133;
  --actived-text-color: #409eff;
  --actived-bgc: #fff;
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
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}
.ea-menu-item_wrap.is-actived {
  color: var(--actived-text-color);
  border-color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-actived ::slotted(a) {
  color: var(--actived-text-color) !important;
}
.ea-menu-item_wrap.is-sub-actived {
  color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-sub-actived ::slotted(a) {
  color: var(--actived-text-color) !important;
}
.ea-menu-item_wrap.is-disabled {
  color: #c0c4cc !important;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-menu-item_wrap.is-disabled ::slotted(a) {
  color: #c0c4cc !important;
}
.ea-menu-item_wrap ::slotted(a) {
  color: var(--normal-text-color) !important;
  text-decoration: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;


export class EaMenuItem extends Base {
    #wrap;
    #slot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-menu-item_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;
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

        if (this.isSubItem) {
            this.#wrap.classList.toggle('is-sub-actived', value);
        } else {
            this.#wrap.classList.toggle('is-actived', value);
        }
    }
    // #endregion
    // ------- end -------

    // ------- isSubItem 是否为子菜单 -------
    // #region
    get isSubItem() {
        return this.getAttrBoolean('is-sub-item');
    }
    set isSubItem(value) {
        this.setAttribute('is-sub-item', value);
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

    #handleSelectedEvent() {
        this.#wrap.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('item-selected', {
                detail: {
                    index: this.index,
                    title: this.textContent,
                },
            }));
        });
    }

    #init() {
        const that = this;

        this.actived = this.actived;

        this.disabled = this.disabled;

        this.#handleSelectedEvent();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-menu-item')) {
    customElements.define('ea-menu-item', EaMenuItem);
}