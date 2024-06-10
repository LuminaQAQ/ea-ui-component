// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

const closeDom = () => {
    const closeIcon = document.createElement('i');
    closeIcon.className = 'icon-cancel-circled2';
    closeIcon.style.cssText = `
        font-size: 1rem;
        margin-left: 0.5rem;
        cursor: pointer;
    `;

    return closeIcon;
}

export default class EaTag extends Base {
    #wrap;
    #closeSlot;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-tag_wrap';

        const textSlot = document.createElement('slot');
        wrap.appendChild(textSlot);

        const closeSlot = document.createElement('slot');
        closeSlot.name = 'close';
        wrap.appendChild(closeSlot);

        this.#wrap = wrap;
        this.#closeSlot = closeSlot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- type tag类型样式 -------
    // #region
    get type() {
        return this.getAttribute('type') || "default";
    }

    set type(value) {
        this.setAttribute('type', value);
        this.#wrap.classList.add(`ea-tag--${value}`);
    }
    // #endregion
    // ------- end -------

    // ------- closable 是否显示可关闭 -------
    // #region
    get closable() {
        return this.getAttrBoolean('closable');
    }

    set closable(value) {
        this.toggleAttr('closable', value);
    }
    // #endregion
    // ------- end -------

    // ------- effect 不同主题 -------
    // #region
    get effect() {
        return this.getAttribute('effect') || "light";
    }

    set effect(value) {
        if (value === "light") return;

        this.setAttribute('effect', value);
        this.#wrap.classList.add(`ea-tag--${value}`);
    }
    // #endregion
    // ------- end -------
    initCloseEvent() {
        const that = this;
        const closeIcon = closeDom();

        closeIcon.addEventListener('mouseenter', function (e) {
            closeIcon.className = 'icon-cancel-circled';
        });

        closeIcon.addEventListener('mouseleave', function (e) {
            closeIcon.className = 'icon-cancel-circled2';
        });

        closeIcon.addEventListener('click', function (e) {
            that.dispatchEvent(new CustomEvent('close', {
                detail: {
                    value: that.innerText
                },
                bubbles: true,
            }));
        });

        this.#closeSlot.appendChild(closeIcon);
    }

    init() {
        const that = this;

        // tag类型
        this.type = this.type;

        // 显示可关闭
        this.closable = this.closable;
        if (this.closable) this.initCloseEvent();

        // 主题
        this.effect = this.effect;
    }

    connectedCallback() {
        this.init();
    }
}