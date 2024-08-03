// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `
.ea-drawer_wrap {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  z-index: 2001;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap {
  position: absolute;
  top: 0;
  left: -100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  transition: left 0.3s;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_header-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 32px;
  padding: 20px 20px 0;
  color: #72767b;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_header-wrap .ea-drawer_icon {
  cursor: pointer;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_main-wrap {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
  overflow: auto;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_mask-wrap {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
  opacity: 0;
  scale: 0;
  transition: opacity 0.3s, left 0.3s;
}
.ea-drawer_wrap.is-open {
  left: 0;
}
.ea-drawer_wrap.is-open .ea-drawer_drawer-wrap {
  left: 0;
}
.ea-drawer_wrap.is-open .ea-drawer_mask-wrap {
  opacity: 1;
  scale: 1;
}
.ea-drawer_wrap.will-close .ea-drawer_drawer-wrap {
  left: -100%;
}
.ea-drawer_wrap.will-close .ea-drawer_mask-wrap {
  opacity: 0;
  scale: 0;
}
`;

export class EaDrawer extends Base {
    #wrap;

    #drawerWrap;
    #maskWrap;

    #headerWrap;
    #headerTitleWrap;
    #headerCloseIcon;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-drawer_wrap';
        wrap.part = 'wrap';

        const maskWrap = createElement('div', 'ea-drawer_mask-wrap');
        maskWrap.part = 'mask-wrap';

        const headerSlot = createSlotElement('title');
        const headerTitleWrap = createElement('span', 'ea-drawer_title', [headerSlot]);
        const headerCloseIcon = createElement('ea-icon', 'ea-drawer_icon');
        headerCloseIcon.icon = 'icon-cancel';
        const headerWrap = createElement('div', 'ea-drawer_header-wrap', [headerTitleWrap, headerCloseIcon]);
        headerWrap.part = 'header-wrap';

        const mainSlot = createSlotElement();
        const mainWrap = createElement('div', 'ea-drawer_main-wrap', [mainSlot]);
        mainWrap.part = 'main-wrap';
        const drawerWrap = createElement('div', 'ea-drawer_drawer-wrap', [headerWrap, mainWrap, maskWrap]);
        drawerWrap.part = 'drawer-wrap';
        wrap.appendChild(drawerWrap);

        this.#wrap = wrap;
        this.#drawerWrap = drawerWrap;
        this.#maskWrap = maskWrap;

        this.#headerTitleWrap = headerTitleWrap;
        this.#headerCloseIcon = headerCloseIcon;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    /**
     * 获取文本方向类型
     * 
     * @returns {Array} 文本方向类型的数组，包括左到右（ltr）、右到左（rtl）、顶到底（ttb）、底到顶（btt）
     */
    static get directionType() {
        return ['ltr', 'rtl', 'ttb', 'btt'];
    }

    // ------- direction 抽屉打开方向 -------
    // #region
    get direction() {
        const attr = this.getAttribute('direction');
        return this.directionType.includes(attr) ? attr : 'ltr';
    }

    set direction(value) {
        this.setAttrString('direction', value);
    }
    // #endregion
    // ------- end -------

    // ------- open 是否打开 -------
    // #region
    get open() {
        return this.getAttrBoolean('open') || false;
    }

    set open(value) {
        this.toggleAttr('open', value);
        this.#wrap.classList.toggle('is-open', value);
    }
    // #endregion
    // ------- end -------

    // ------- size 抽屉宽度 -------
    // #region
    get size() {
        return this.getAttribute('size') || '30%';
    }

    set size(value) {
        this.setAttribute('size', value);

        this.#drawerWrap.style.width = value;
    }
    // #endregion
    // ------- end -------

    // ------- title 标题 -------
    // #region
    get title() {
        return this.getAttribute('title');
    }

    set title(value) {
        this.setAttribute('title', value);

        if (value) {
            this.#headerTitleWrap.innerText = value;
        }
    }
    // #endregion
    // ------- end -------

    #handleDrawerClose() {
        const that = this;

        const callback = () => {
            that.open = false;
            this.#wrap.classList.remove('will-close');

            this.#maskWrap.removeEventListener('transitionend', callback);
        }

        const handleClose = () => {
            this.#wrap.classList.add('will-close');

            this.#maskWrap.addEventListener('transitionend', callback);

            this.dispatchEvent(new CustomEvent('close', {
                bubbles: true,
                composed: true,
            }));
        }

        this.#maskWrap.addEventListener('click', () => {
            handleClose();
        });

        this.#headerCloseIcon.addEventListener('click', () => {
            handleClose();
        });
    }

    #init() {
        const that = this;

        this.title = this.title;

        this.open = false;

        this.size = this.size;

        this.#handleDrawerClose();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-drawer')) {
    customElements.define('ea-drawer', EaDrawer);
}