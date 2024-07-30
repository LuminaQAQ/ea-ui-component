// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `
.ea-page-header_wrap {
  display: flex;
  align-items: center;
  line-height: 24px;
}
.ea-page-header_wrap .ea-page-header_title-wrap,
.ea-page-header_wrap .ea-page-header_divider,
.ea-page-header_wrap .ea-page-header_content-wrap {
  line-height: 24px;
}
.ea-page-header_wrap .ea-page-header_title-wrap {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
}
.ea-page-header_wrap .ea-page-header_divider {
  margin: 0 1rem;
  margin-bottom: 1px;
  font-size: 14px;
  height: 14px;
  overflow: hidden;
  color: #dcdfe6;
  line-height: 1;
  vertical-align: middle;
}
.ea-page-header_wrap .ea-page-header_content-wrap {
  font-size: 18px;
  color: #303133;
  line-height: 1;
}
`;

export class EaPageHeader extends Base {
    #wrap;

    #titleWrap;
    #contentWrap

    #titleSlot;
    #contentSlot;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-page-header_wrap';
        wrap.part = 'wrap';

        const titleSlot = createSlotElement('title');
        const backIcon = createElement('ea-icon', 'ea-page-header_back-icon');
        backIcon.icon = 'icon-angle-left';
        const titleWrap = createElement('div', 'ea-page-header_title-wrap', [backIcon, titleSlot]);
        titleWrap.part = 'title-wrap';
        wrap.appendChild(titleWrap);

        const divider = createElement('div', 'ea-page-header_divider');
        divider.innerText = '|';
        divider.part = 'divider';
        wrap.appendChild(divider);

        const contentSlot = createSlotElement('content');
        const contentWrap = createElement('div', 'ea-page-header_content-wrap', [contentSlot]);
        contentWrap.part = 'content-wrap';
        wrap.appendChild(contentWrap);

        this.#wrap = wrap;
        this.#titleWrap = titleWrap;
        this.#titleSlot = titleSlot;
        this.#contentWrap = contentWrap;
        this.#contentSlot = contentSlot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    #init() {
        const that = this;
    }

    // ------- title 返回区域的内容 -------
    // #region
    get title() {
        return this.getAttribute('title') || '';
    }

    set title(value) {
        if (value) {
            this.setAttribute('title', value);
            this.#titleSlot.innerText = value;
        } else {
            this.setAttribute('title', '返回');
            this.#titleSlot.innerText = '返回';
        }
    }
    // #endregion
    // ------- end -------

    // ------- content 页面标题 -------
    // #region
    get content() {
        return this.getAttribute('content') || '';
    }

    set content(value) {
        if (value) {
            this.setAttribute('content', value);
            this.#contentSlot.innerText = value;
        } else {
            this.setAttribute('content', '');
            this.#contentSlot.innerText = '';
        }
    }
    // #endregion
    // ------- end -------

    #initBackEvent() {
        this.#titleWrap.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('back'));
        });
    }

    connectedCallback() {
        this.#init();

        this.title = this.title;

        this.content = this.content;

        this.#initBackEvent();
    }
}

if (!customElements.get('ea-page-header')) {
    customElements.define('ea-page-header', EaPageHeader);
}