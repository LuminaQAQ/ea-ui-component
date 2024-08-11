// @ts-nocheck
import Base from "../Base.js";
import "../ea-icon/index.js"

const stylesheet = `
@charset "UTF-8";

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
  /* ------- 特定的属性的图标(clearable, password) ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
  /* ------- 标识图标在输入框前还是后 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
  /* ------- 输入框前后的dom ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
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
.ea-input_wrap.prefix .ea-input_inner, .ea-input_wrap.suffix .ea-input_inner {
  width: calc(100% - 1.75rem);
}
.ea-input_wrap.prefix i {
  left: 2.5%;
  transform: translate(-2.5%, -50%);
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

const inputDom = (type) => {
    const input = document.createElement('input');

    input.className = "ea-input_inner";
    input.type = type || "text";
    input.autocomplete = "off";

    return input;
}

const suggestionBoardDom = () => {
    const suggestionBoard = document.createElement('ul');
    suggestionBoard.className = "ea-input_suggestion-wrap";

    return suggestionBoard;
}

const slotDom = (name) => {
    const slot = document.createElement('slot');
    slot.name = name;

    return slot;
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
        const wrap = document.createElement('div');
        wrap.className = "ea-input_wrap";

        const dom = inputDom(this.type);

        // slot 和 template, 用于输入框前后 的 插槽
        const prependSlot = slotDom('prepend');
        const appendSlot = slotDom('append');

        const prependTemplate = this.querySelector('[slot=prepend]');
        const appendTemplate = this.querySelector('[slot=append]');

        if (prependTemplate) {
            wrap.classList.add('prepend-slot');

            prependTemplate.style.setProperty('--border-top-left-radius', '3px');
            prependTemplate.style.setProperty('--border-bottom-left-radius', '3px');

            prependTemplate.style.setProperty('--border-right-width', '0');
            prependTemplate.style.setProperty('--border-left-width', '1px');

            prependSlot.appendChild(prependTemplate.cloneNode(true));
        }

        if (appendTemplate) {
            wrap.classList.add('append-slot');

            appendTemplate.style.setProperty('--border-top-right-radius', '3px');
            appendTemplate.style.setProperty('--border-bottom-right-radius', '3px');

            appendTemplate.style.setProperty('--border-left-width', '0');
            appendTemplate.style.setProperty('--border-right-width', '1px');

            appendSlot.appendChild(appendTemplate.cloneNode(true));
        }

        wrap.appendChild(dom);
        wrap.insertBefore(prependSlot, dom);
        wrap.appendChild(appendSlot);

        this.#wrap = wrap;
        this.#input = dom;
        this.#prependSlot = prependSlot;
        this.#appendSlot = appendSlot;

        // 输入建议
        if (this.suggestion.length > 0 || this.remote) {
            this.suggestionEvent();
        }

        this.setIconFile(new URL('../ea-icon/index.css', import.meta.url).href);

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

    // ------- disabled 输入框禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean("disabled");
    }

    set disabled(val) {
        this.toggleAttr("disabled", val);
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
        const prefixIcon = this.iconInit(val);
        this.iconAppend('prefix', true, prefixIcon);
    }

    get surfixIcon() {
        return this.getAttribute("suffix-icon") || '';
    }

    set surfixIcon(val) {
        if (!val) return;

        this.setAttribute("suffix", val);
        const surfixIcon = this.iconInit(val);
        this.iconAppend('suffix', true, surfixIcon);
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

        // console.log(val);
        this.#suggestion = val;
        // this.setAttribute("primary-key", nanoid());
        // this.primaryKey = nanoid();
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

    // 获取最大限制值
    get maxLength() {
        return this.getAttribute("max-length");
    }

    set maxLength(val) {
        if (!val || this.#input.type !== "text") return;

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
        if (!val || this.#input.type !== "text") return;

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

    // 显示 当前文字长度 和 限制值
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

    // 图标dom初始化
    iconInit(className) {
        const clearIcon = document.createElement('i');
        clearIcon.className = className;

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