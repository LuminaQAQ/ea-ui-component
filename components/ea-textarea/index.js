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

    // ------- textarea 文本域 -------
    // #region

    setTextareaHeight(rows) {
        rows = Number(rows);
        this.#input.rows = rows;
        // this.#input.style.height = `${rows * 0.66 + 1}rem`;
        // this.#input.style.minHeight = `${rows * 0.66 + 1}rem`;
    }

    get rows() {
        return this.getAttribute("rows") || 2;
    }

    set rows(val) {
        if (!val) return;

        this.setAttribute("rows", val);
        this.#input.rows = val;
    }

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

    get minRows() {
        return Number(this.getAttribute("min-rows")) || 2;
    }

    set minRows(val) {
        if (!val || this.#input.type !== 'textarea') return;

        this.setAttribute("min-rows", val);
        this.setTextareaHeight(Number(val));
    }

    get maxRows() {
        return this.getAttribute("max-rows") || 10;
    }

    set maxRows(val) {
        if (!val || this.#input.type !== 'textarea') return;

        this.setAttribute("max-rows", val);
        this.setTextareaHeight(Number(val));
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

        // 默认行数
        this.rows = this.rows;

        // 自动调整高度
        this.autosize = this.autosize;

        // 最大最小行数
        this.maxRows = this.maxRows;
        this.minRows = this.minRows;

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