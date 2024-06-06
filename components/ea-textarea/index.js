// @ts-nocheck
import Base from "../Base";

const stylesheet = `
@charset "UTF-8";
@import url('/ea_ui_component/icon/index.css');

.ea-textarea_wrap {
  position: relative;
  width: 100%;
}
.ea-textarea_wrap .ea-textarea_inner {
  box-sizing: border-box;
  box-shadow: none;
  resize: vertical;
  min-height: 1.75rem;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: border 0.2s;
  border-radius: 3px;
  padding: 0.5rem;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
}
.ea-textarea_wrap .ea-textarea_inner:focus {
  border-color: #409eff;
}
.ea-textarea_wrap .ea-textarea_inner::placeholder {
  color: #c0c4cc;
}
.ea-textarea_wrap .ea-textarea_inner.disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-textarea_wrap .ea-textarea_inner.invalid {
  border-color: #f56c6c;
}
.ea-textarea_wrap .ea-input_word-limit {
  position: absolute;
  font-size: 0.75rem;
  bottom: 0.5rem;
  right: 0.5rem;
}
`;

const inputDom = () => {
    let input = document.createElement('textarea');

    input.className = "ea-textarea_inner";

    return input;
}

export default class EaTextarea extends Base {
    #wrap;
    #input;
    #mounted = false;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = "ea-textarea_wrap";
        this.#wrap = wrap;

        const dom = inputDom();
        this.#input = dom;

        this.#wrap.appendChild(dom);

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- value 输入框的值 -------
    // #region
    get value() {
        if (!this.#mounted) {
            this.#input.value = this.getAttribute("value") || '';
        }

        return this.getAttribute('value');
    }

    set value(val) {
        if (!val) return;

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

    // ------- rows 默认行数 -------
    // #region
    get rows() {
        return this.getAttribute("rows") || 2;
    }

    set rows(val) {
        if (!val) return;

        this.setAttribute("rows", val);
        this.#input.rows = val;
        this.#input.setAttribute("rows", val);
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
            if (e.target.type === 'textarea') {
                const cols = this.#input.cols;
                const chars = e.target.value.length;

                let rows = Math.ceil(chars / cols) <= Number(this.#input.rows) ? Number(this.#input.rows) : Math.ceil(chars / cols);
                if (chars % cols == 1) {
                    if (this.minRows > rows) this.setTextareaHeight(this.minRows);
                    else if (this.maxRows < rows) this.setTextareaHeight(this.maxRows);
                    else this.setTextareaHeight(rows);
                }
            }
        })
    }
    // #endregion
    // ------- end -------

    // ------- min-rows/max-rows 最小/最大行数 -------
    // #region

    setTextareaHeight(rows) {
        rows = Number(rows);
        this.#input.rows = rows;
    }

    get minRows() {
        const val = Number(this.getAttribute("min-rows"));
        return val !== 0 && val > 0
            ? val
            : 1;
    }

    set minRows(val) {
        if (!val) return;

        this.setAttribute("min-rows", val);
        this.setTextareaHeight(Number(val));
    }

    get maxRows() {
        const val = Number(this.getAttribute("max-rows"));
        return val !== 0 && val > 0
            ? val
            : 10;
    }

    set maxRows(val) {
        if (!val) return;

        this.setAttribute("max-rows", val);
        this.setTextareaHeight(Number(val));
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

        this.#input.addEventListener('input', (e) => {
            if (e.target.value.length > val) {
                e.target.value = e.target.value.slice(0, val);
            }
        });

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

        this.#input.addEventListener('input', (e) => {
            if (e.target.value.length < val) {
                e.target.classList.add('invalid');
            } else {
                e.target.classList.remove('invalid');
            }
        });
    }
    // #endregion
    // ------- end -------

    // ------- 显示 当前文字长度 和 限制值 -------
    // #region

    get showWordLimit() {
        return this.getAttrBoolean("show-word-limit");
    }

    set showWordLimit(val) {
        if (!val) return;

        this.setAttribute("show-word-limit", val);

        // 加入显示的dom
        const wordLimit = document.createElement('span');
        this.#wrap.classList.toggle('word-limit', val);
        this.#wrap.classList.toggle('append-slot', val);
        wordLimit.className = 'ea-input_word-limit';
        wordLimit.innerText = `${this.#input.value.length}/${this.maxLength}`;

        this.#input.addEventListener('input', (e) => {
            wordLimit.innerText = `${e.target.value.length}/${this.maxLength}`;
        });


        // this.#appendSlot.appendChild(wordLimit);
        this.#wrap.appendChild(wordLimit);
    }
    // #endregion
    // ------- end -------


    init() {
        const that = this;

        // 输入框提示
        this.placeholder = this.placeholder;

        // 输入框的值
        this.value = this.value;

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
            this.dispatchEvent(
                new CustomEvent("change", {
                    detail: {
                        value: e.target.value
                    }
                })
            );
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