// @ts-nocheck
import Base from "../Base.js";

import { stylesheet } from "./src/style/stylesheet.js";

export class EaTextarea extends Base {
    #wrap;
    #input;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-textarea_wrap" part="container">
                <textarea class="ea-textarea_inner" part="textarea" placeholder="请输入内容"></textarea>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-textarea_wrap');
        this.#input = shadowRoot.querySelector('.ea-textarea_inner');

        this.build(shadowRoot, stylesheet);
    }

    // ------- name 属性 -------
    // #region
    get name() {
        return this.getAttribute('name') || 'ea-textarea';
    }

    set name(value) {
        this.setAttribute('name', value);
    }
    // #endregion
    // ------- end -------

    // ------- value 输入框的值 -------
    // #region
    get value() {
        return this.#input.value;
    }

    set value(val) {
        this.#input.value = val;
    }
    // #endregion
    // ------- end -------

    // ------- disabled 是否禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(val) {
        this.toggleAttr('disabled', val);
        this.#input.disabled = val;
    }
    // #endregion
    // ------- end -------

    // ------- placeholder 提示 -------
    // #region
    get placeholder() {
        return this.getAttribute("placeholder") || '';
    }

    set placeholder(val) {
        if (!val) return;

        this.setAttribute("placeholder", val);
        this.#input.placeholder = val;
    }
    // #endregion
    // ------- end -------

    // ------- rows 默认行数 -------
    // #region
    get rows() {
        return this.getAttribute("rows") || 2;
    }

    set rows(val) {
        this.setAttribute("rows", val);
        this.#input.rows = val;
    }
    // #endregion
    // ------- end -------

    // ------- autosize 自动调整高度 -------
    // #region
    get autosize() {
        return this.getAttrBoolean("autosize");
    }

    set autosize(val) {
        if (!val) return;

        this.setAttribute("autosize", val);

        this.#input.addEventListener('input', (e) => {
            if (this.#input.style.height !== this.#input.scrollHeight + 'px') {
                this.#input.style.height = this.#input.scrollHeight + 'px';
                this.#input.style.minHeight = this.#input.scrollHeight + 'px';
            }

            if (e.target.type === 'textarea') {
                const cols = this.#input.cols;
                const chars = e.target.value.length;

                let rows = Math.ceil(chars / cols) <= Number(this.#input.rows) ? Number(this.#input.rows) : Math.ceil(chars / cols);
                if (chars % cols == 1) {
                    if (this.minRows > rows) this.#setTextareaHeight(this.minRows);
                    else if (this.maxRows < rows) this.#setTextareaHeight(this.maxRows);
                    else this.#setTextareaHeight(rows);
                }
            }
        })
    }
    // #endregion
    // ------- end -------

    // ------- min-rows 最小行数 -------
    // #region
    get minRows() {
        const val = this.getAttrNumber("min-rows");
        return val !== 0 && val > 0 ? val : 0;
    }

    set minRows(val) {
        if (!val) return;

        this.setAttribute("min-rows", val);
        this.#setTextareaHeight(Number(val));
    }
    // #endregion
    // ------- end -------

    // ------- max-rows 最大行数 -------
    // #region
    get maxRows() {
        const val = Number(this.getAttribute("max-rows"));
        return val !== 0 && val > 0 ? val : 0;
    }

    set maxRows(val) {
        if (!val) return;

        this.setAttribute("max-rows", val);
        this.#setTextareaHeight(Number(val));
    }

    // #endregion
    // ------- end -------

    // ------- max-length/min-length 最大/最小字符长度 -------
    // #region
    // 获取最大限制值
    get maxLength() {
        return this.getAttribute("max-length");
    }

    set maxLength(val) {
        if (!val) return;

        this.setAttribute("max-length", val);
        this.#input.maxLength = val;

        if (this.showWordLimit) this.showWordLimit = true;
    }

    // 获取最小限制值
    get minLength() {
        return this.getAttribute("min-length");
    }

    set minLength(val) {
        if (!val) return;

        this.setAttribute("min-length", val);
        this.#input.minLength = val;
    }
    // #endregion
    // ------- end -------

    // ------- show-word-limit 显示 当前文字长度 和 限制值 -------
    // #region
    get showWordLimit() {
        return this.getAttrBoolean("show-word-limit");
    }

    set showWordLimit(val) {
        if (!val) return;

        this.setAttribute("show-word-limit", val);

        // 加入显示的dom
        const wordLimit = document.createElement('span');
        wordLimit.part = 'word-limit';
        wordLimit.className = 'ea-input_word-limit';
        wordLimit.innerText = `${this.#input.value.length}/${this.maxLength}`;

        this.#input.addEventListener('input', (e) => {
            wordLimit.innerText = `${e.target.value.length}/${this.maxLength}`;
        });

        this.#wrap.appendChild(wordLimit);
        wordLimit.style.left = (this.#input.getBoundingClientRect().width - wordLimit.getBoundingClientRect().width - 5) + 'px';
    }
    // #endregion
    // ------- end -------

    #setTextareaHeight(rows) {
        rows = Number(rows);
        this.#input.rows = rows;
    }

    #handleDispatchEvent(eventName, e) {
        this.dispatchEvent(
            new CustomEvent(eventName, {
                detail: {
                    value: e.target.value
                }
            })
        );
    }

    connectedCallback() {
        this.setAttribute('data-ea-component', true);

        this.name = this.name;

        // 输入框提示
        this.placeholder = this.placeholder;

        // 输入框的值
        this.value = this.value;
        this.#input.value = this.getAttribute("value") || '';

        // 禁用
        this.disabled = this.disabled;

        // 自动调整高度
        this.autosize = this.autosize;

        // 最大最小行数
        if (this.maxRows) this.maxRows = this.maxRows;
        if (this.minRows) this.minRows = this.minRows;

        // 默认行数
        this.rows = this.rows;

        // 输入长度限制
        this.maxLength = this.maxLength;
        this.minLength = this.minLength;

        // 输入时
        this.#input.addEventListener("input", (e) => {
            this.#handleDispatchEvent("change", e);
        });

        // 聚焦时
        this.#input.addEventListener("focus", (e) => {
            this.#handleDispatchEvent("focus", e);
        });

        // 失焦时
        this.#input.addEventListener("blur", (e) => {
            this.#handleDispatchEvent("blur", e);
        });
    }
}

if (!window.customElements.get("ea-textarea")) {
    window.customElements.define("ea-textarea", EaTextarea);
}