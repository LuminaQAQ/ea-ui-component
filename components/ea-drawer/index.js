import Base from '../Base.js';
import '../ea-icon/index.js'

import { timeout } from '../../utils/timeout.js';
import { handleDefaultAttrIsTrue } from '../../utils/handleDefaultAttrIsTrue.js';

import { stylesheet } from './src/style/stylesheet.js';

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
    shadowRoot.innerHTML = `
      <div class="ea-drawer_wrap" part="container">
        <div class="ea-drawer_drawer-wrap" part="drawer-wrap">
          <div class="ea-drawer_header-wrap" part="header-wrap">
            <span class="ea-drawer_title" part="title-wrap">
              <slot name="title"></slot>
            </span>
            <ea-icon class="ea-drawer_icon" icon="icon-cancel" part="icon"></ea-icon>
          </div>
          <div class="ea-drawer_main-wrap" part="main-wrap">
            <slot></slot>
          </div>
          <div class="ea-drawer_mask-wrap" part="mask-wrap"></div>
        </div>
      </div>
    `;


    this.#wrap = shadowRoot.querySelector('.ea-drawer_wrap');
    this.#drawerWrap = shadowRoot.querySelector('.ea-drawer_drawer-wrap');
    this.#maskWrap = shadowRoot.querySelector('.ea-drawer_mask-wrap');

    this.#headerWrap = shadowRoot.querySelector('.ea-drawer_header-wrap');
    this.#headerTitleWrap = shadowRoot.querySelector('.ea-drawer_title');
    this.#headerCloseIcon = shadowRoot.querySelector('.ea-drawer_icon');

    this.build(shadowRoot, stylesheet);
  }

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

    timeout(() => {
      this.#wrap.classList.toggle('is-open', value);
    }, 20);
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

  #handleDirectionAndSizeChange(value) {

    const directionSize = this.direction === "ltr" || this.direction === "rtl" ? 'width' : 'height';

    this.#drawerWrap.style.height = 'inherit';
    this.#drawerWrap.style.width = 'inherit';

    this.#drawerWrap.style[directionSize] = value;
  }

  #initDrawerCloseEvent() {
    const callback = () => {
      this.open = false;
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

  connectedCallback() {
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

    this.#initDrawerCloseEvent();
  }
}

if (!customElements.get('ea-drawer')) {
  customElements.define('ea-drawer', EaDrawer);
}