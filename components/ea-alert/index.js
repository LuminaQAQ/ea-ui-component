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

    // ------- close-text 关闭按钮文字 -------
    // #region
    get closeText() {
        return this.getAttribute('close-text') || "";
    }

    set closeText(value) {
        this.setAttribute('close-text', value);

        if (value) {
            const closeIcon = createElement('ea-icon', 'ea-alert_close-icon', value);
            this.#alertContent.appendChild(closeIcon);
        } else {
            this.#alertContent.removeChild(this.#alertContent.lastChild);
        }
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

    // ------- show-icon 是否显示图标 -------
    // #region
    get showIcon() {
        return this.getAttrBoolean('show-icon') || false;
    }

    set showIcon(value) {
        this.setAttribute('show-icon', value);
    }
    // #endregion
    // ------- end -------

    // ------- center 是否居中 -------
    // #region
    get center() {
        return this.getAttrBoolean('center') || false;
    }

    set center(value) {
        this.setAttribute('center', value);

        this.#alertContent.classList.toggle('ea-alert--center', value);
    }
    // #endregion
    // ------- end -------

    // ------- description 提示描述 -------
    // #region
    get description() {
        return this.getAttribute('description') || "";
    }

    set description(value) {
        this.setAttribute('description', value);
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

    initShowIconElement(type) {
        const iconClass = {
            success: 'ok-circled',
            info: 'info',
            warning: 'attention-alt',
            error: 'cancel-circled'
        }

        const icon = createElement('i', `icon-${iconClass[type]}`);
        icon.classList.add(`ea-alert--${type}`);
        this.#alertTitle.insertBefore(icon, this.#alertTitle.firstChild);
    }

    initDescriptionElement(description) {
        const descriptionElement = createElement('p', 'ea-alert_description');
        this.#wrap.style.flexDirection = 'column';

        descriptionElement.innerText = description;
        this.#wrap.appendChild(descriptionElement);
    }

    init() {
        const that = this;

        this.type = this.type;

        this.title = this.title;

        this.closable = this.closable;

        this.effect = this.effect;

        this.center = this.center;

        if (this.closable) this.initClosableElement(this.closable);

        if (this.showIcon) this.initShowIconElement(this.type);

        if (this.description) this.initDescriptionElement(this.description);
    }

    connectedCallback() {
        this.init();
    }
}