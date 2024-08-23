// @ts-nocheck
import Base from "../Base.js";
import "../ea-icon/index.js"
import { createFixIcon } from "./src/utils/createFixIcon.js";

const stylesheet = `
:host {
  --border-top-left-radius: 0;
  --border-top-right-radius: 0;
  --border-bottom-left-radius: 0;
  --border-bottom-right-radius: 0;
  --border-left-width: 0;
  --border-right-width: 0;
}

.ea-input_wrap {
  position: relative;
  width: 100%;
}
.ea-input_wrap .ea-input_inner {
  box-sizing: border-box;
  box-shadow: none;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: border 0.2s;
  border-radius: 3px;
  padding: 0.5rem;
  width: 100%;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
}
.ea-input_wrap .ea-input_inner:focus {
  border-color: #409eff;
}
.ea-input_wrap .ea-input_inner::placeholder {
  color: #c0c4cc;
}
.ea-input_wrap .ea-input_inner.invalid {
  border-color: #f56c6c;
}
.ea-input_wrap .ea-input_inner.disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-input_wrap .ea-input_inner.ea-input_clear ::before {
  content: "\e9c3";
  display: block;
}
.ea-input_wrap i {
  font-size: 0.9rem;
  line-height: 0.8;
}
.ea-input_wrap i[class=icon-cancel-circled2],
.ea-input_wrap i[class=icon-eye],
.ea-input_wrap i[class=icon-eye-off] {
  position: absolute;
  left: calc(100% - 1.75rem);
  top: 50%;
  color: #c0c4cc;
  transform: translate(calc(-100% - 0.25rem), -50%);
}
.ea-input_wrap.clearable .ea-input_inner, .ea-input_wrap.password .ea-input_inner {
  width: calc(100% - 1.75rem);
  padding-right: 1.75rem;
}
.ea-input_wrap.prefix i, .ea-input_wrap.suffix i {
  position: absolute;
  top: 50%;
  color: #c0c4cc;
}
.ea-input_wrap.prefix i {
  left: 0.875rem;
  transform: translate(-50%, -50%);
}
.ea-input_wrap.prefix .ea-input_inner {
  padding-left: 1.75rem;
}
.ea-input_wrap.suffix i {
  left: calc(100% - 1.75rem);
  transform: translate(calc(-100% - 0.25rem), -50%);
}
.ea-input_wrap.suffix .ea-input_inner {
  padding-right: 1.75rem;
}
.ea-input_wrap.prepend-slot, .ea-input_wrap.append-slot {
  display: flex;
  align-items: center;
  font-size: 0.925rem;
  line-height: 1;
}
.ea-input_wrap.prepend-slot ::slotted(div), .ea-input_wrap.append-slot ::slotted(div) {
  border: 1px solid #dcdfe6;
  border-left-width: var(--border-left-width);
  border-right-width: var(--border-right-width);
  border-top-right-radius: var(--border-top-right-radius);
  border-bottom-right-radius: var(--border-bottom-right-radius);
  border-top-left-radius: var(--border-top-left-radius);
  border-bottom-left-radius: var(--border-bottom-left-radius);
}
.ea-input_wrap.prepend-slot .ea-input_inner {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.ea-input_wrap.append-slot .ea-input_inner {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.ea-input_wrap .ea-input_suggestion-wrap {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  unicode-bidi: unset;
  display: none;
  position: absolute;
  box-sizing: border-box;
  z-index: 3;
  top: calc(100% + 5px);
  left: 0;
  padding: 0.5rem 0;
  width: 100%;
  max-height: 10rem;
  overflow-y: auto;
  scrollbar-width: thin;
  background-color: white;
  box-shadow: 0 1px 8px 1px rgba(0, 0, 0, 0.2);
}
.ea-input_wrap .ea-input_suggestion-wrap li {
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
}
.ea-input_wrap .ea-input_suggestion-wrap li:hover {
  background-color: #f5f7fa;
}
.ea-input_wrap .ea-input_suggestion-wrap.loading {
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ea-input_wrap .ea-input_suggestion-wrap.loading::after {
  font-family: "fontello";
  font-style: normal;
  font-weight: normal;
  speak: never;
  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: 0.2em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  margin-left: 0.2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\e839";
  font-size: 1.5rem;
  animation: spin 1s linear infinite;
  animation-play-state: running;
}
.ea-input_wrap.word-limit {
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}
.ea-input_wrap.word-limit .ea-input_inner {
  border: 0;
  width: calc(100% - 3rem);
}
.ea-input_wrap.word-limit .ea-input_word-limit {
  padding-right: 0.5rem;
  width: 2.5rem;
  font-size: 0.75rem;
  text-align: center;
}
`;

const suggestionBoardDom = () => {
    const suggestionBoard = document.createElement('ul');
    suggestionBoard.className = "ea-input_suggestion-wrap";

    return suggestionBoard;
}

export class EaInput extends Base {
    #wrap;
    #input;
    #clearIcon;
    #showPasswordIcon;
    #mounted = false;

    #suggestion = [];
    #suggestionBoard;

    #prependSlot;
    #appendSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-input_wrap' part='container'>
                <div class="ea-input_wrap">
                    <div class="ea-input_prepend-slot" part="prepend-container">
                        <slot name="prepend"></slot>
                    </div>
                    <input class="ea-input_inner" type="text" part="input" autocomplete="off" />
                    <div class="ea-input_append-slot" part="append-container">
                        <slot name="append"></slot>
                    </div>
                </div>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-input_wrap');
        this.#input = shadowRoot.querySelector('.ea-input_inner');
        this.#prependSlot = shadowRoot.querySelector('slot[name="prepend"]');
        this.#appendSlot = shadowRoot.querySelector('slot[name="append"]');

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
    }

    // 清除图标
    clearableEvent(e) {
        if (!this.clearable) return;

        if (this.clearable && e.target.value !== '') {
            this.#clearIcon.style.display = 'block';
        } else {
            this.#clearIcon.style.display = 'none';
        }
    }

    // 清除图标初始化
    initClearableIcon() {
        if (this.clearable) {
            const clearIcon = this.iconInit('icon-cancel-circled2');

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

            this.iconAppend('clearable', this.clearable, clearIcon);
        }
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

        if (val) {
            this.#input.type = "password";
        }
    }

    // 显示/隐藏密码图标
    showPasswordEvent(e) {
        if (!this.showPassword) return;

        if (this.showPassword && e.target.value !== '') {
            this.#showPasswordIcon.style.display = 'block';
        } else {
            this.#showPasswordIcon.style.display = 'none';
        }
    }

    // 初始化 显示/隐藏密码
    initShowPasswordIcon() {
        if (this.showPassword) {
            const showPasswordIcon = this.iconInit('icon-eye');
            if (!this.value) showPasswordIcon.style.display = 'none';

            showPasswordIcon.addEventListener('click', (e) => {
                this.#showPasswordIcon.className = this.#input.type === "password" ? "icon-eye-off" : "icon-eye";
                this.#input.type = this.#input.type === "password" ? "text" : "password";

                this.#input.focus();
            })

            this.#showPasswordIcon = showPasswordIcon;

            this.iconAppend('password', this.showPassword, showPasswordIcon);
        }
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
        if (!val) return;

        this.#suggestion = val;
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
        if (val === null || val === undefined) return;

        try {
            const flag = this.#suggestionBoard.style.display
            if (flag == "flex") this.#suggestionBoard.style.display = "block";
            else if (flag == "") this.#suggestionBoard.style.display = "none";

            this.#suggestionBoard.classList.toggle('loading', val);
            this.setAttribute("remote", val);

            if (this.#mounted) this.refresh();
        } catch (error) {

        }
    }

    // 数据更新时调用
    refresh() {
        try {
            this.#suggestionBoard.innerHTML = '';
            this.suggestionEvent();
        } catch (error) {

        }
    }

    // 输入建议逻辑
    suggestionEvent() {
        const suggestionBoard = !this.#mounted ? suggestionBoardDom() : this.#suggestionBoard;

        //  利用 li 标签 将用户传入值 进行渲染
        this.suggestion.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item.value;

            li.addEventListener('click', () => {
                this.value = item.value;
                suggestionBoard.style.display = 'none';
            });

            suggestionBoard.appendChild(li);
        });

        // 当点击其他地方时, 关闭输入建议
        document.addEventListener('click', (e) => {
            if (e.target !== this) {
                suggestionBoard.style.display = 'none';
            }
        });

        // 匹配输入建议
        this.#input.addEventListener('input', (e) => {
            this.shadowRoot.querySelectorAll('li').forEach(item => {
                if (item.innerText.includes(e.target.value)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            })
        });

        // 激活时列出输入建议
        if (this.triggerOnFocus) {
            this.#input.addEventListener('focus', (e) => {
                suggestionBoard.style.display = this.remote ? "flex" : 'block';
            });
            // 输入时列出输入建议
        } else if (this.triggerAfterInput) {
            this.#input.addEventListener('input', (e) => {
                if (e.target.value.length > 0) {
                    suggestionBoard.style.display = 'block';
                } else {
                    suggestionBoard.style.display = 'none';
                }
            });
        }

        if (!this.#mounted) {
            this.#suggestionBoard = suggestionBoard;
            this.#wrap.appendChild(suggestionBoard);
        }
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
        const wordLimit = document.createElement('span');
        this.#wrap.classList.toggle('word-limit', val);
        this.#wrap.classList.toggle('append-slot', val);
        wordLimit.className = 'ea-input_word-limit';
        wordLimit.innerText = `${this.#input.value.length}/${this.maxLength}`;

        this.#input.addEventListener('input', (e) => {
            wordLimit.innerText = `${e.target.value.length}/${this.maxLength}`;
        });


        this.#appendSlot.appendChild(wordLimit);
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
        if (val === null || val === undefined) return;

        this.setAttribute("readonly", val);
        this.#input.readOnly = val;
    }
    // #endregion
    // ------- end -------

    // ------- is-invalid 错误 -------
    // #region
    get isInvalid() {
        return this.getAttrBoolean("is-invalid");
    }

    set isInvalid(val) {
        this.setAttribute("is-invalid", val);
        this.#input.classList.toggle('invalid', val);
    }
    // #endregion
    // ------- end -------

    // 图标dom初始化
    iconInit(className) {
        const clearIcon = document.createElement('ea-icon');
        clearIcon.icon = className;

        return clearIcon;
    }

    // 图标dom添加
    iconAppend(className, isClassName, element) {
        this.#wrap.classList.toggle(className, isClassName);
        this.#wrap.appendChild(element);
    }

    // 事件初始化
    eventInit(e, eventName) {
        this.dispatchEvent(
            new CustomEvent(eventName, {
                detail: {
                    value: e.target.value
                }
            })
        );

        this.clearableEvent(e);
        this.showPasswordEvent(e);
    }

    focus() {
        this.#input.focus();
    }

    init() {
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
        this.initClearableIcon();

        // 密码
        this.showPassword = this.showPassword;
        this.initShowPasswordIcon();

        // 输入框图标
        this.prefixIcon = this.prefixIcon;
        this.surfixIcon = this.surfixIcon;

        // 输入建议
        this.suggestion = this.suggestion;
        if (this.remote) this.remote = this.remote;

        // 输入长度限制
        this.maxLength = this.maxLength;
        this.minLength = this.minLength;

        this.readonly = this.readonly;

        // 输入时
        this.#input.addEventListener("input", (e) => {
            this.eventInit(e, "change");
        });

        // 聚焦时
        this.#input.addEventListener("focus", (e) => {
            this.eventInit(e, "focus");
        });

        // 失焦时
        this.#input.addEventListener("blur", (e) => {
            this.eventInit(e, "blur");
        });
    }

    connectedCallback() {
        this.init();
        this.#mounted = true;
    }
}

if (!window.customElements.get("ea-input")) {
    window.customElements.define("ea-input", EaInput);
}