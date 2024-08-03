// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { handleDefaultAttrIsTrue } from '../../utils/handleDefaultAttrIsTrue.js';

const stylesheet = `
.ea-drawer_wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2001;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  transition: left 0.3s, right 0.3s, top 0.3s, bottom 0.3s;
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
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
  opacity: 0;
  scale: 0;
  transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.3s, bottom 0.3s;
}
.ea-drawer_wrap.direction-ltr, .ea-drawer_wrap.direction-rtl {
  top: 0;
}
.ea-drawer_wrap.direction-ltr .ea-drawer_drawer-wrap, .ea-drawer_wrap.direction-rtl .ea-drawer_drawer-wrap {
  top: 0;
  height: 100%;
}
.ea-drawer_wrap.direction-ttb, .ea-drawer_wrap.direction-btt {
  left: 0;
}
.ea-drawer_wrap.direction-ttb .ea-drawer_drawer-wrap, .ea-drawer_wrap.direction-btt .ea-drawer_drawer-wrap {
  left: 0;
  width: 100%;
}
.ea-drawer_wrap.direction-ttb .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-btt .ea-drawer_mask-wrap {
  left: 0;
}
.ea-drawer_wrap.direction-ltr.is-open .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-rtl.is-open .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-ttb.is-open .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-btt.is-open .ea-drawer_mask-wrap {
  opacity: 1;
  scale: 1;
}
.ea-drawer_wrap.direction-ltr.will-close .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-rtl.will-close .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-ttb.will-close .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-btt.will-close .ea-drawer_mask-wrap {
  opacity: 0;
  scale: 0;
}
.ea-drawer_wrap.direction-ltr {
  left: -100%;
}
.ea-drawer_wrap.direction-ltr .ea-drawer_drawer-wrap {
  left: -100%;
}
.ea-drawer_wrap.direction-ltr .ea-drawer_mask-wrap {
  left: 0;
}
.ea-drawer_wrap.direction-ltr.is-open {
  left: 0;
}
.ea-drawer_wrap.direction-ltr.is-open .ea-drawer_drawer-wrap {
  left: 0;
}
.ea-drawer_wrap.direction-ltr.will-close .ea-drawer_drawer-wrap {
  left: -100%;
}
.ea-drawer_wrap.direction-rtl {
  right: -100%;
}
.ea-drawer_wrap.direction-rtl .ea-drawer_drawer-wrap {
  right: -100%;
}
.ea-drawer_wrap.direction-rtl .ea-drawer_mask-wrap {
  right: 0;
}
.ea-drawer_wrap.direction-rtl.is-open {
  right: 0;
}
.ea-drawer_wrap.direction-rtl.is-open .ea-drawer_drawer-wrap {
  right: 0;
}
.ea-drawer_wrap.direction-rtl.will-close .ea-drawer_drawer-wrap {
  right: -100%;
}
.ea-drawer_wrap.direction-ttb {
  bottom: -100%;
}
.ea-drawer_wrap.direction-ttb .ea-drawer_drawer-wrap {
  bottom: -100%;
}
.ea-drawer_wrap.direction-ttb .ea-drawer_mask-wrap {
  bottom: 0;
}
.ea-drawer_wrap.direction-ttb.is-open {
  bottom: 0;
}
.ea-drawer_wrap.direction-ttb.is-open .ea-drawer_drawer-wrap {
  bottom: 0;
}
.ea-drawer_wrap.direction-ttb.will-close .ea-drawer_drawer-wrap {
  bottom: -100%;
}
.ea-drawer_wrap.direction-btt {
  top: -100%;
}
.ea-drawer_wrap.direction-btt .ea-drawer_drawer-wrap {
  top: -100%;
}
.ea-drawer_wrap.direction-btt .ea-drawer_mask-wrap {
  top: 0;
}
.ea-drawer_wrap.direction-btt.is-open {
  top: 0;
}
.ea-drawer_wrap.direction-btt.is-open .ea-drawer_drawer-wrap {
  top: 0;
}
.ea-drawer_wrap.direction-btt.will-close .ea-drawer_drawer-wrap {
  top: -100%;
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

        this.#headerWrap = headerWrap;
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
    get directionType() {
        return ['ltr', 'rtl', 'ttb', 'btt'];
    }

    // ------- direction 抽屉打开方向 -------
    // #region
    get direction() {
        const attr = this.getAttribute('direction');

        return this.directionType.includes(attr) ? attr : 'ltr';
    }

    set direction(value) {
        this.setAttribute('direction', value);

        this.#wrap.classList.toggle('direction-ltr', value === 'ltr');
        this.#wrap.classList.toggle('direction-rtl', value === 'rtl');
        this.#wrap.classList.toggle('direction-ttb', value === 'ttb');
        this.#wrap.classList.toggle('direction-btt', value === 'btt');

        this.#handleDirectionAndSizeChange(this.size);
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

        setTimeout(() => {
            // this.#maskWrap.style.display = value ? 'block' : 'none';
            this.#wrap.classList.toggle('is-open', value);
        }, 20);
    }
    // #endregion
    // ------- end -------

    // ------- size 抽屉宽度 -------
    // #region
    #handleDirectionAndSizeChange(value) {

        const directionSize = this.direction === "ltr" || this.direction === "rtl" ? 'width' : 'height';

        this.#drawerWrap.style.height = 'inherit';
        this.#drawerWrap.style.width = 'inherit';

        this.#drawerWrap.style[directionSize] = value;
    }

    get size() {
        return this.getAttribute('size') || '30%';
    }

    set size(value) {
        this.setAttribute('size', value);

        this.#handleDirectionAndSizeChange(value);
    }
    // #endregion
    // ------- end -------

    // ------- withHeader 是否显示标题 -------
    // #region
    get withHeader() {
        let attr = handleDefaultAttrIsTrue(this.getAttribute('with-header'));

        return attr;
    }

    set withHeader(value) {
        this.toggleAttr('with-header', value);

        this.#headerWrap.style.display = value ? 'flex' : 'none';
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

    // ------- show-close 是否显示关闭按钮 -------
    // #region
    get showClose() {
        let attr = handleDefaultAttrIsTrue(this.getAttribute('show-close'));

        return attr;
    }

    set showClose(value) {
        this.toggleAttr('show-close', value);

        this.#headerCloseIcon.style.display = value ? 'block' : 'none';
    }
    // #endregion
    // ------- end -------

    // ------- modal 遮罩层 -------
    // #region
    get modal() {
        let attr = handleDefaultAttrIsTrue(this.getAttribute('modal'));

        return attr;
    }

    set modal(value) {
        this.toggleAttr('modal', value);

        this.#maskWrap.style.display = value ? 'block' : 'none';
    }
    // #endregion
    // ------- end -------

    // ------- wrapperClosable 点击遮罩层是否关闭 -------
    // #region
    get wrapperClosable() {
        let attr = handleDefaultAttrIsTrue(this.getAttribute('wrapper-closable'));

        return attr;
    }

    set wrapperClosable(value) {
        this.setAttribute('wrapper-closable', value);
    }
    // #endregion
    // ------- end -------

    #handleDrawerClose() {
        const that = this;

        const callback = () => {
            that.open = false;
            this.#wrap.classList.remove('will-close');

            this.#drawerWrap.removeEventListener('transitionend', callback);
        }

        const handleClose = () => {
            this.#wrap.classList.add('will-close');

            this.#drawerWrap.addEventListener('transitionend', callback);

            this.dispatchEvent(new CustomEvent('close', {
                bubbles: true,
                composed: true,
            }));
        }

        if (this.wrapperClosable && this.modal) {
            this.#maskWrap.addEventListener('click', () => {
                handleClose();
            });
        }

        if (this.showClose) {
            this.#headerCloseIcon.addEventListener('click', () => {
                handleClose();
            });
        }
    }

    #init() {
        const that = this;

        this.direction = this.direction;

        this.size = this.size;

        this.withHeader = this.withHeader;
        if (this.withHeader) {
            this.showClose = this.showClose;
            this.title = this.title;
        }

        this.modal = this.modal;

        this.wrapperClosable = this.wrapperClosable;

        this.open = false;

        this.#handleDrawerClose();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-drawer')) {
    customElements.define('ea-drawer', EaDrawer);
}