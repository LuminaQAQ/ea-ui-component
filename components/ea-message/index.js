// @ts-nocheck
import Base from '../Base.js';
import { createElement } from '../../utils/createElement.js';
import "../ea-icon/index.js"

const stylesheet = `

.ea-message_wrap {
  position: fixed;
  left: 50%;
  z-index: 999;
  display: flex;
  align-items: center;
  padding: 15px 15px 15px 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  top: -100%;
  transform-origin: center;
  opacity: 0;
  transform: translate(-50%, 0);
  min-width: 380px;
  overflow: hidden;
  background-color: black;
  transition: opacity 0.3s, top 0.3s;
}
.ea-message_wrap .ea-icon-wrap {
  margin-right: 0.5rem;
  line-height: 1;
}
.ea-message_wrap .ea-text-content {
  line-height: 1;
  vertical-align: middle;
}
.ea-message_wrap .ea-close-icon {
  margin-left: auto;
}
.ea-message_wrap.ea-message--success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.ea-message_wrap.ea-message--info {
  background-color: #f4f4f5;
  color: #909399;
}
.ea-message_wrap.ea-message--warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}
.ea-message_wrap.ea-message--error {
  background-color: #fef0f0;
  color: #f56c6c;
}
`;

export class EaMessageElement extends Base {
    #wrap;

    #icon;

    #textContent;

    #closeWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-message_wrap';

        const icon = createElement('i', 'ea-icon-wrap');
        wrap.appendChild(icon);

        const textContent = createElement('div', 'ea-text-content');
        wrap.appendChild(textContent);

        const closeIcon = createElement('i', 'ea-close-icon icon-cancel');
        wrap.appendChild(closeIcon);
        closeIcon.style.display = 'none';

        this.#wrap = wrap;
        this.wrap = wrap;
        this.#icon = icon;
        this.#textContent = textContent;
        this.#closeWrap = closeIcon;
        this.closeWrap = closeIcon;

        this.build(shadowRoot, stylesheet);
        this.setIconFile(new URL('../ea-icon/index.css', import.meta.url).href);

        this.shadowRoot.appendChild(wrap);
    }

    get attrs() {
        return ["show", "text", "icon", "type", "showClose", "center"];
    }

    get iconList() {
        return {
            "success": "icon-ok-circled",
            "error": "icon-cancel-circled",
            "warning": "icon-attention-alt",
            "info": "icon-info"
        };
    }

    // ------- show 提示框的显示状态 -------
    // #region
    get show() {
        return this.getAttrBoolean('show');
    }

    set show(value) {
        this.setAttribute('show', value);

        const eaMessageList = document.querySelectorAll('ea-message');

        if (value) {
            const length = eaMessageList.length - 1;
            const elementHeight = this.#wrap.getBoundingClientRect().height;
            let gap = length <= 0 ? 10 : (length + 1) * 10;

            this.#wrap.style.top = `${length * elementHeight + gap}px`;
            this.#wrap.style.opacity = 1;
        } else {
            const that = this;

            this.#wrap.style.top = `-100%`;
            this.#wrap.style.opacity = 0;

            let event = this.#wrap.addEventListener('transitionend', function () {
                this.removeEventListener('transitionend', event);
                that.remove();
            });
        }

    }
    // #endregion
    // ------- end -------

    // ------- text 提示框的文字 -------
    // #region
    get text() {
        return this.getAttribute('text');
    }

    set text(value) {
        this.setAttribute('text', value);

        this.#textContent.innerText = value;
    }
    // #endregion
    // ------- end -------

    // ------- type 提示框的类型 -------
    // #region
    get type() {
        return this.getAttribute('type') || "info";
    }

    set type(value) {
        this.setAttribute('type', value);

        this.#wrap.classList.add(`ea-message--${value}`);
        this.#icon.classList.add(`${this.iconList[value]}`);
    }
    // #endregion
    // ------- end -------

    // ------- showClose 提示框的关闭按钮 -------
    // #region
    get showClose() {
        return this.getAttrBoolean('showClose') || false;
    }

    set showClose(value) {
        this.setAttribute('showClose', value);

        if (value) {
            this.#closeWrap.style.display = "block";
        } else {
            this.#closeWrap.style.display = "none";
        }
    }
    // #endregion
    // ------- end -------

    // ------- center 提示框是否居中 -------
    // #region
    get center() {
        return this.getAttrBoolean('center') || false;
    }

    set center(value) {
        this.setAttribute('center', value);

        if (value) {
            this.#icon.style.marginLeft = `auto`;
        } else {
            this.#icon.style.marginLeft = `0`;
        }
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;
    }

    connectedCallback() {
        this.init();

        this.#closeWrap.addEventListener('click', () => {
            this.show = false;
        });
    }

    disconnectedCallback() {
        const eaMessageList = document.querySelectorAll('ea-message');
        const length = eaMessageList.length;

        if (length > 0) {
            Array.from(eaMessageList).forEach((el, index) => {
                const elementHeight = el.wrap.getBoundingClientRect().height;
                el.wrap.style.top = `${index * elementHeight + (index * 10)}px`;
            });
        }
    }
}

if (!customElements.get('ea-message')) {
    customElements.define('ea-message', EaMessageElement);
}