import Base from "../Base.js";
import "../ea-icon/index.js"

import { stylesheet } from "./src/style/stylesheet.js";

import { createClearableFixIcon, createFixIcon, createShowPasswordIcon } from "./src/components/createFixIcon.js";
import { createWordLimitElement } from "./src/components/createWordLimitElement.js";
import { createSuggestionBoard } from "./src/components/createSuggestionBoard.js"

import { withTransitionTimeOut } from "../../utils/timeout.js";
import { dispatchEvent } from "./src/utils/dispatchEvent.js"
import { handleSearchResult } from "./src/utils/handleSearchResult.js";
import { initTriggerAfterInputEvent, initTriggerOnFocusEvent } from "./src/utils/handleSuggestionBoardTrigger.js";

export class EaInput extends Base {
    #wrap;
    #input;

    #suggestion = [];
    #suggestionBoard;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-input_container' part='container'>
                <div class="ea-input_wrap" part="input-wrap">
                    <div class="ea-input_prepend-slot" part="prepend-wrap">
                        <slot name="prepend"></slot>
                    </div>
                    <input class="ea-input_inner" type="text" part="input" autocomplete="off" />
                    <div class="ea-input_append-slot" part="append-wrap">
                        <slot name="append"></slot>
                    </div>
                </div>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-input_wrap');
        this.#input = shadowRoot.querySelector('.ea-input_inner');

        this.build(shadowRoot, stylesheet);

    }

    // ------- name 元素原生name属性 -------
    // #region
    get name() {
        return this.getAttribute("name") || '';
    }

    set name(val) {
        this.setAttribute("name", val);
    }
    // #endregion
    // ------- end -------

    // ------- type input原生属性  -------
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
        return this.getAttribute("value") || '';
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
        if (!val) return;

        this.setAttribute("clearable", val);

        const clearIcon = createClearableFixIcon.call(this, this.#wrap, this.#input, 'icon-cancel-circled2');
    }
    // #endregion
    // ------- end -------

    // ------- show-password 密码 -------
    // #region
    get showPassword() {
        return this.getAttrBoolean("show-password");
    }

    set showPassword(val) {
        if (!val) return;

        this.setAttribute("show-password", val);
        this.#input.type = "password";

        const showPasswordIcon = createShowPasswordIcon(this.#wrap, this.#input, 'icon-eye');
    }
    // #endregion
    // ------- end -------

    // ------- prefix/surfix 指定图标显示位置 -------
    // #region
    get prefixIcon() {
        return this.getAttribute("prefix-icon") || '';
    }

    set prefixIcon(val) {
        if (!val) return;

        this.setAttribute("prefix", val);

        createFixIcon(this.#wrap, val, 'prefix');
    }

    get surfixIcon() {
        return this.getAttribute("suffix-icon") || '';
    }

    set surfixIcon(val) {
        if (!val) return;

        this.setAttribute("suffix", val);

        createFixIcon(this.#wrap, val, 'surfix');
    }
    // #endregion
    // ------- end -------

    // ------- suggestion 建议 -------
    // #region

    // 建议列表
    get suggestion() {
        return this.#suggestion;
    }

    set suggestion(val) {
        if (!val || !(val instanceof Array)) return;

        this.#suggestion = val;

        const suggestionBoard = createSuggestionBoard.call(this, this.#wrap, val);

        // 匹配输入建议
        this.#input.addEventListener('input', (e) => {
            handleSearchResult(suggestionBoard, e.target.value);
        });

        if (this.triggerAfterInput) {
            initTriggerAfterInputEvent(this.#input, suggestionBoard);
        } else {
            initTriggerOnFocusEvent(suggestionBoard, this.#input);
        }

        handleSearchResult(suggestionBoard, this.#input.value);

        this.#wrap.appendChild(suggestionBoard);
        this.#suggestionBoard = suggestionBoard;
    }

    // 输入框激活时列出输入建议
    get triggerOnFocus() {
        return this.getAttrBoolean("trigger-on-focus");
    }

    set triggerOnFocus(val) {
        if (!val) return;

        this.setAttribute("trigger-on-focus", val);
    }

    // 输入框输入后匹配输入建议
    get triggerAfterInput() {
        return this.getAttrBoolean("trigger-after-input");
    }
    set triggerAfterInput(val) {
        if (!val) return;

        this.setAttribute("trigger-after-input", val);
    }

    // 数据为远程加载时, 显示加载中
    get remote() {
        return this.getAttrBoolean("remote");
    }

    set remote(val) {
        this.setAttribute("remote", val);

        const suggestionBoard = createSuggestionBoard.call(this, this.#wrap, this.#suggestion);
        suggestionBoard.classList.toggle('loading', val);

        this.#input.addEventListener('focus', () => {
            suggestionBoard.classList.add('is-open');
        });

        this.#suggestionBoard = suggestionBoard;
    }

    // #endregion
    // ------- end -------

    // ------- max-length 最大长度 -------
    // #region
    get maxLength() {
        return this.getAttribute("max-length");
    }

    set maxLength(val) {
        if (!val || this.#input.type !== "text") return;

        this.setAttribute("max-length", val);
        this.#input.maxLength = val;

        if (this.showWordLimit) this.showWordLimit = true;
    }

    // #endregion
    // ------- end -------

    // ------- min-length 最小长度 -------
    // #region
    get minLength() {
        return this.getAttribute("min-length");
    }

    set minLength(val) {
        if (!val || this.#input.type !== "text") return;

        this.setAttribute("min-length", val);
        this.#input.minLength = val;

        this.#input.addEventListener('input', (e) => {
            this.#input.classList.toggle('invalid', e.target.value.length < val);
        });
    }
    // #endregion
    // ------- end -------

    // ------- show-word-limit 显示字数限制 -------
    // #region
    get showWordLimit() {
        return this.getAttrBoolean("show-word-limit");
    }

    set showWordLimit(val) {
        if (!val || this.#input.type !== "text") return;

        this.setAttribute("show-word-limit", val);

        // 加入显示的dom
        const wordLimit = createWordLimitElement.call(this, this.#input);
        this.#wrap.classList.toggle('word-limit', val);
        this.#wrap.appendChild(wordLimit);
    }
    // #endregion
    // ------- end -------

    // ------- readonly 只读 -------
    // #region
    get readonly() {
        return this.getAttrBoolean("readonly");
    }

    set readonly(val) {
        if (!val) return;

        this.setAttribute("readonly", val);
        this.#input.readOnly = val;
    }
    // #endregion
    // ------- end -------

    focus() {
        this.#input.focus();
    }

    connectedCallback() {
        this.setAttribute("data-ea-component", true);

        this.name = this.name;

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

        // 密码
        if (!this.clearable) this.showPassword = this.showPassword;

        // 输入框图标
        this.prefixIcon = this.prefixIcon;
        if (!this.clearable && !this.showPassword) this.surfixIcon = this.surfixIcon;

        this.triggerOnFocus = this.triggerOnFocus;
        this.triggerAfterInput = this.triggerAfterInput;

        // 输入建议
        if (this.remote) this.remote = this.remote;

        // 输入长度限制
        this.maxLength = this.maxLength;
        this.minLength = this.minLength;

        this.readonly = this.readonly;

        // 输入时
        this.#input.addEventListener("input", (e) => {
            this.value = e.target.value;
            dispatchEvent.call(this, e, "change");
        });

        // 聚焦时
        this.#input.addEventListener("focus", (e) => {
            dispatchEvent.call(this, e, "focus");
        });

        // 失焦时
        this.#input.addEventListener("blur", (e) => {
            dispatchEvent.call(this, e, "blur");
        });

        withTransitionTimeOut(this.#wrap);
    }
}

if (!window.customElements.get("ea-input")) {
    window.customElements.define("ea-input", EaInput);
}