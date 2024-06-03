// @ts-nocheck
import Base from "../Base";

const stylesheet = ``;

const inputDom = (type = "text") => {
    let input = null;

    if (type === "textarea") {
        input = document.createElement('textarea');
        input.className = "ea-textarea_inner";
    } else {
        input = document.createElement('input');
        input.className = "ea-input_inner";
        input.type = type;
        input.autocomplete = "off";
    }

    return input;
}

export default class EaInput extends Base {
    #wrap;
    #input;
    #clearIcon;
    #mounted = false;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = "ea-input_wrap";
        this.#wrap = wrap;

        const dom = inputDom(this.type);
        this.#input = dom;

        wrap.appendChild(dom);

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- type 标识是 input 还是 textarea  -------
    // #region
    get type() {
        return this.getAttribute("type") || "text";
    }

    set type(val) {
        this.setAttribute("type", val);
    }
    // #endregion
    // ------- end -------

    // ------- value 输入框的值 -------
    // #region
    get value() {
        if (!this.#mounted) {
            this.#input.value = this.getAttribute("value") || '';
        }

        return this.#input.value;
    }

    set value(val) {
        this.setAttribute("value", val);
        this.#input.value = val;
    }
    // #endregion
    // ------- end -------

    // ------- placeholder 提示 -------
    // #region
    get placeholder() {
        return this.getAttribute("placeholder") || '';
    }

    set placeholder(val) {
        this.setAttribute("placeholder", val);
        this.#input.placeholder = val;
    }
    // #endregion
    // ------- end -------

    // ------- disabled 输入框禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean("disabled");
    }

    set disabled(val) {
        this.setAttribute("disabled", val);
        this.#input.disabled = val;
        this.#input.classList.toggle("disabled", val);
    }
    // #endregion
    // ------- end -------

    // ------- clearable 可清除 -------
    // #region
    get clearable() {
        return this.getAttrBoolean("clearable");
    }

    set clearable(val) {
        this.setAttribute("clearable", val);
        this.#input.classList.toggle("ea-input_clear", val);
    }

    // 清除图标
    clearableEvent(e) {
        if (this.clearable && e.target.value !== '') {
            this.#clearIcon.style.display = 'block';
        } else {
            this.#clearIcon.style.display = 'none';
        }
    }

    // 清除图标初始化
    initClearableIcon() {
        const clearIcon = document.createElement('i');
        clearIcon.className = "icon-cancel-circled2"
        clearIcon.addEventListener('click', () => {
            this.value = '';
            this.#input.focus();
        })

        this.#clearIcon = clearIcon;

        if (this.value) {
            this.#clearIcon.style.display = 'block';
        } else {
            this.#clearIcon.style.display = 'none';
        }

        this.#wrap.classList.add('clearable');
        this.#wrap.appendChild(clearIcon);
    }
    // #endregion
    // ------- end -------


    init() {
        const that = this;

        // 按钮类型
        this.type = this.type;

        // 输入框提示
        this.placeholder = this.placeholder;

        // 输入框的值
        this.value = this.value;

        // 禁用
        this.disabled = this.disabled;

        // 可清除
        this.clearable = this.clearable;
        if (this.clearable) this.initClearableIcon();

        // 输入时
        this.#input.addEventListener("input", (e) => {
            this.dispatchEvent(
                new CustomEvent("change", {
                    detail: {
                        value: e.target.value
                    }
                })
            );

            this.clearableEvent(e);
        });

        // 聚焦时
        this.#input.addEventListener("focus", (e) => {
            this.dispatchEvent(
                new CustomEvent("focus", {
                    detail: {
                        value: e.target.value
                    }
                })
            );

            this.clearableEvent(e);
        });

        // 失焦时
        this.#input.addEventListener("blur", (e) => {
            this.dispatchEvent(
                new CustomEvent("blur", {
                    detail: {
                        value: e.target.value
                    }
                })
            );
        });
    }

    connectedCallback() {
        this.init();
        this.#mounted = true;
    }


}