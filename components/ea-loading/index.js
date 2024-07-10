// @ts-nocheck
import { createElement, createSlotElement } from '../../utils/createElement';
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-loading_wrap {
  position: relative;
}
.ea-loading_wrap i {
  opacity: 0;
  transition: opacity 0.2s;
  color: #409eff;
}
.ea-loading_wrap .ea-loading_text {
  color: #409eff;
  margin-left: 0.5rem;
}
.ea-loading_wrap.ea-loading_wrap--fullscreen {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ea-loading_wrap.ea-loading_wrap--loading .ea-loading_mask {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 100%, 0.9);
  z-index: 1;
  transition: background-color 0.2s;
}
.ea-loading_wrap.ea-loading_wrap--loading .ea-loading_mask i {
  opacity: 1;
  font-size: 2rem;
}
`;

export class EaLoading extends Base {
    #wrap;

    #loadingWrap;

    #spinner;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-loading_wrap';

        const spinner = createElement('i', 'ea-loading_spinner animate-spin');
        const loading = createElement('div', 'ea-loading', spinner);
        const loadingWrap = createElement('div', 'ea-loading_mask', loading);
        wrap.appendChild(loadingWrap);

        const slot = createSlotElement('')
        wrap.appendChild(slot);

        this.#wrap = wrap;
        this.#loadingWrap = loadingWrap;
        this.#spinner = spinner;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- loading 加载状态 -------
    // #region
    get loading() {
        return this.getAttrBoolean('loading') || false;
    }

    set loading(flag) {
        this.toggleAttr('loading', flag);

        if (flag) {
            this.#wrap.classList.add('ea-loading_wrap--loading');
            this.#loadingWrap.style.display = "flex";
        } else {
            this.#wrap.classList.remove('ea-loading_wrap--loading');
            this.#loadingWrap.style.display = "none";
        }

        this.handleFullscreen(this.fullscreen, flag, this.lock);
    }
    // #endregion
    // ------- end -------

    // ------- spinner 加载图标 -------
    // #region
    get spinner() {
        return this.getAttribute('spinner') || "icon-spin6";
    }

    set spinner(val) {
        this.setAttribute('spinner', val);

        this.#spinner.className = `ea-loading_spinner animate-spin ${val}`;
    }
    // #endregion
    // ------- end -------

    // ------- spinner-size 加载图标大小 -------
    // #region
    get spinnerSize() {
        return this.getAttrNumber('spinner-size') || 16;
    }

    set spinnerSize(val) {
        this.setAttribute('spinner-size', val);

        this.#spinner.style.fontSize = `${val}px`;
    }
    // #endregion
    // ------- end -------

    // ------- background 背景颜色 -------
    // #region
    get background() {
        return this.getAttribute('background') || "hsla(0, 0%, 100%, 0.9)";
    }

    set background(val) {
        this.setAttribute('background', val);

        this.#loadingWrap.style.backgroundColor = val;
    }
    // #endregion
    // ------- end -------

    // ------- text 文本 -------
    // #region
    get text() {
        return this.getAttribute('text') || "";
    }

    set text(val) {
        this.setAttribute('text', val);
    }
    // #endregion
    // ------- end -------

    // ------- fullscreen 全屏 -------
    // #region
    get fullscreen() {
        return this.getAttrBoolean('fullscreen') || false;
    }

    set fullscreen(val) {
        this.setAttribute('fullscreen', val);
    }
    // #endregion
    // ------- end -------

    // ------- lock 全屏是否锁定 -------
    // #region
    get lock() {
        return this.getAttrBoolean('lock') || false;
    }

    set lock(val) {
        this.setAttribute('lock', val);
    }
    // #endregion
    // ------- end -------

    initTextElement(text) {
        const el = createElement('div', 'ea-loading_text');
        el.innerHTML = text;
        this.#loadingWrap.appendChild(el);
    }

    handleFullscreen(isFullscreen, isLoading, isLock) {
        if (isFullscreen) {
            this.#wrap.classList.toggle('ea-loading_wrap--fullscreen', isLoading);
            this.#wrap.style.display = isLoading ? 'block' : 'none';

            if (isLock) document.body.style.overflow = isLoading ? 'hidden' : 'auto';
        }
    }

    init() {
        const that = this;

        this.fullscreen = this.fullscreen;



        this.loading = this.loading;

        this.spinnerSize = this.spinnerSize;

        this.spinner = this.spinner;

        this.background = this.background;

        if (this.text) this.initTextElement(this.text);
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-loading')) {
    customElements.define('ea-loading', EaLoading);
}