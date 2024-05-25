// @ts-nocheck
import setStyle from "../../utils/setStyle";
import Base from '../Base.js'

const stylesheet = ``;

export default class EaLink extends Base {
    constructor() {
        super();


        const shadowRoot = this.attachShadow({ mode: 'open' });
        let dom = document.createElement('a');;

        const slot = document.createElement('slot');
        dom.className = "__ea-link";
        dom.appendChild(slot);

        this.dom = dom;


        // ------- 打包 -------
        // #region
        // const styleNode = document.createElement('style');
        // styleNode.innerHTML = stylesheet;
        // this.shadowRoot.appendChild(styleNode);
        // #endregion
        // ------- end -------

        // ------- 本地调试 -------
        // #region
        setStyle(shadowRoot, new URL('./index.css', import.meta.url).href);
        // #endregion
        // ------- end -------


        shadowRoot.appendChild(dom);
    }

    static get observedAttributes() {
        return ['disabled'];
    }

    get LINK_TYPE() {
        return ['primary', 'success', 'info', 'warning', 'danger'];
    }

    // ------- href链接 -------
    // #region
    get href() {
        return this.getAttribute('href');
    }

    set href(value) {
        if (value !== null) this.dom.href = value;
    }
    // #endregion
    // ------- end -------

    // ------- type类型 -------
    // #region
    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        if (value === null) return;

        for (let i = 0; i < this.LINK_TYPE.length; i++) {
            if (value === this.LINK_TYPE[i]) {
                this.dom.classList.add(value);
                break;
            }
        }
    }
    // #endregion
    // ------- end -------

    // ------- disabled禁用状态 -------
    // #region
    get disabled() {
        return this.getAttribute('disabled') === "" || this.getAttribute('disabled') === 'true';
    }

    set disabled(value) {
        if (!value) return;

        if (value) {
            this.dom.classList.add('disabled');
        } else {
            this.dom.classList.remove('disabled');
        }
    }
    // #endregion
    // ------- end -------

    // ------- underline下划线 -------
    // #region
    get underline() {
        return this.getAttribute('underline') === "" || this.getAttribute('underline') === 'true';
    }

    set underline(value) {
        if (!value) return;

        if (value) {
            this.dom.classList.add('underline');
        } else {
            this.dom.classList.remove('underline');
        }
    }
    // #endregion
    // ------- end -------

    init() {
        // 设置链接
        this.href = this.href;

        // 设置类型
        this.type = this.type;

        // 禁用状态
        this.disabled = this.disabled;

        // 设置下划线
        this.underline = this.underline;
    }

    connectedCallback() {
        this.init();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case 'disabled':
                this.disabled = newVal === "" || newVal === 'true' || newVal === true;
                break;
            default: break;
        }
    }
}