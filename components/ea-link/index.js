// @ts-nocheck
import setStyle from "../../utils/setStyle";
import Base from '../Base.js'

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.__ea-link {
  text-decoration: none;
  color: #606266;
  cursor: pointer;
}
.__ea-link:hover {
  color: #797b80;
}
.__ea-link.underline:hover {
  text-decoration: underline;
}
.__ea-link.primary {
  color: #409eff;
}
.__ea-link.primary:hover {
  color: #73b8ff;
}
.__ea-link.success {
  color: #67c23a;
}
.__ea-link.success:hover {
  color: #85cf60;
}
.__ea-link.info {
  color: #909399;
}
.__ea-link.info:hover {
  color: #abadb1;
}
.__ea-link.warning {
  color: #e6a23c;
}
.__ea-link.warning:hover {
  color: #ecb869;
}
.__ea-link.danger {
  color: #f56c6c;
}
.__ea-link.danger:hover {
  color: #f89c9c;
}
.__ea-link.disabled {
  color: #c0c4cc;
  pointer-events: none;
}
.__ea-link.disabled:hover {
  color: #dcdee3;
}
`;

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
        const styleNode = document.createElement('style');
        styleNode.innerHTML = stylesheet;
        this.shadowRoot.appendChild(styleNode);
        // #endregion
        // ------- end -------

        // ------- 本地调试 -------
        // #region
        // setStyle(shadowRoot, new URL('./index.css', import.meta.url).href);
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

    // ------- icon图标 -------
    // #region
    get icon() {
        return this.getAttribute('icon');
    }

    set icon(value) {
        if (value === null || value === "") return;

        const icon = document.createElement('i');
        icon.className = value;
        this.dom.insertBefore(icon, this.dom.firstChild);
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

        // 图标
        this.icon = this.icon;
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