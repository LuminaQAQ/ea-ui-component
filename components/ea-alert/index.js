// @ts-nocheck
import Base from '../Base';
import { createElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaAlert extends Base {
    #wrap;

    #alertContent;
    #alertTitle;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-alert_wrap';

        const alertTitle = createElement('span', 'ea-alert_title');
        const alertContent = createElement('div', 'ea-alert_content', alertTitle);
        wrap.appendChild(alertContent);

        this.#wrap = wrap;
        this.#alertContent = alertContent;
        this.#alertTitle = alertTitle;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- type 获取提示类型 -------
    // #region
    get type() {
        return this.getAttribute('type') || "info";
    }

    set type(value) {
        this.setAttribute('type', value);

        this.#wrap.classList.add(`ea-alert--${value}`);
    }
    // #endregion
    // ------- end -------

    // ------- title 获取提示标题 -------
    // #region
    get title() {
        return this.getAttribute('title') || "";
    }

    set title(value) {
        this.setAttribute('title', value);

        this.#alertTitle.innerText = value;
    }
    // #endregion
    // ------- end -------

    // ------- closable 是否可关闭 -------
    // #region
    get closable() {
        const flag = this.getAttribute('closable');

        if (flag === null || flag === "true" || flag === "") return true;
        if (flag === "false") return false;

        return flag;
    }

    set closable(value) {
        this.setAttribute('closable', value);
    }
    // #endregion
    // ------- end -------

    // ------- effect 亮色与暗色主题 -------
    // #region
    get effect() {
        return this.getAttribute('effect') || "light";
    }

    set effect(value) {
        this.setAttribute('effect', value);

        if (value === "dark") {
            this.#wrap.classList.add('ea-alert--dark');
        } else {
            this.#wrap.classList.remove('ea-alert--dark');
        }
    }
    // #endregion
    // ------- end -------

    initClosableElement(closable) {
        const that = this;

        const closeIcon = createElement('i', 'ea-alert_close-icon');
        closable === true ? closeIcon.classList.add('icon-cancel') : closeIcon.innerText = closable;
        this.#alertContent.appendChild(closeIcon);

        closeIcon.addEventListener('click', function () {
            that.#wrap.style.opacity = 0;

            that.dispatchEvent(new CustomEvent('close', { detail: { target: that } }));
        });

        this.#wrap.addEventListener('transitionend', function () {
            that.remove();
        });
    }

    init() {
        const that = this;

        this.type = this.type;

        this.title = this.title;

        this.closable = this.closable;

        this.effect = this.effect;

        if (this.closable) this.initClosableElement(this.closable);
    }

    connectedCallback() {
        this.init();
    }
}