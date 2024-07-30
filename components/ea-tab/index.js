// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `
.ea-tab_wrap {
  --border-radius-top-left: 0;
  --border-radius-top-right: 0;
  --border-right-width: 0;
  position: relative;
  box-sizing: border-box;
  padding: 0 1.25rem;
  height: 40px;
  line-height: 40px;
  min-width: 1rem;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s, width 0.3s, min-width 0.3s;
}
.ea-tab_wrap:hover {
  color: #409eff;
}
.ea-tab_wrap.ea-tab_wrap--normal.is-actived {
  color: #409eff;
}
.ea-tab_wrap.ea-tabs_wrap--card {
  border-bottom: 1px solid #e4e7ed;
}
.ea-tab_wrap.ea-tabs_wrap--card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
.ea-tab_wrap.ea-tab_wrap--card {
  border-top-left-radius: var(--border-radius-top-left);
  border-top-right-radius: var(--border-radius-top-right);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right-width: var(--border-right-width);
}
.ea-tab_wrap.ea-tab_wrap--card.is-actived {
  border-bottom-color: white;
  color: #409eff;
}
.ea-tab_wrap.ea-tab_wrap--border-card {
  border-top-left-radius: var(--border-radius-top-left);
  border-top-right-radius: var(--border-radius-top-right);
  border: 0px solid rgba(0, 0, 0, 0.1);
  border-right-width: var(--border-right-width);
}
.ea-tab_wrap.ea-tab_wrap--border-card.is-actived {
  border-bottom-color: white;
  color: #409eff;
  background-color: white;
}
.ea-tab_wrap.ea-tab_wrap--editable .ea-tab_wrap--editable-sign {
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 0;
  overflow: hidden;
  transition: width 0.3s;
}
.ea-tab_wrap.ea-tab_wrap--editable:hover .ea-tab_wrap--editable-sign {
  width: 14px;
}
`;

export class EaTab extends Base {
    #wrap;

    #slot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-tab_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;
        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
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

    #init() {
        const that = this;

        this.label = this.label;

        this.#handleSelectedEvent();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-tab')) {
    customElements.define('ea-tab', EaTab);
}