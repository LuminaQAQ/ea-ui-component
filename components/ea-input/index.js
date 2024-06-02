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
    #input;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = "ea-input_wrap";

        const dom = inputDom(this.type);
        this.#input = dom;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(dom);
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

    init() {
        // 按钮类型
        this.type = this.type;

        // 输入框提示
        this.placeholder = this.placeholder;

        console.log(this);
    }

    connectedCallback() {
        this.init();
    }
}