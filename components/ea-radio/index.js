// @ts-nocheck
import setStyle from "../../utils/setStyle";
import Base from '../Base.js'

<<<<<<< HEAD
const stylesheet = `:host(ea-radio) {
  --margin-right: 0.75rem;
  --text-color: #606266;
  --radio-show-type: inline-block;
  --button-size: 1rem;
  --button-margin: 0.5rem;
}

.ea-radio_wrap {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
.ea-radio_wrap .__ea-radio-input_wrap {
  width: var(--button-size);
  height: var(--button-size);
  line-height: 1;
  margin-right: var(--button-margin);
}
.ea-radio_wrap .__ea-radio-input_wrap input {
  display: none;
}
.ea-radio_wrap .__ea-radio-input_wrap .__ea-radio-input_inner {
  position: relative;
  display: var(--radio-show-type);
  width: 1rem;
  height: 1rem;
  line-height: 1;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1px solid #606266;
}
.ea-radio_wrap .__ea-radio-input_wrap .__ea-radio-input_inner::before {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  content: "";
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background-color: transparent;
  box-sizing: border-box;
  transition: all 0.3s ease;
}
.ea-radio_wrap .__ea-radio-input_wrap .__ea-radio-input_inner:hover {
  border-color: #409eff;
}
.ea-radio_wrap .__ea-radio-label_desc {
  color: var(--text-color);
}
.ea-radio_wrap.checked .__ea-radio-input_wrap .__ea-radio-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-radio_wrap.checked .__ea-radio-input_wrap .__ea-radio-input_inner::before {
  background-color: white;
}
.ea-radio_wrap.checked .__ea-radio-label_desc {
  color: #409eff;
}
.ea-radio_wrap.disabled .__ea-radio-input_wrap .__ea-radio-input_inner {
  border-color: #eeeeee;
  background-color: #eeeeee;
}
.ea-radio_wrap.disabled .__ea-radio-input_wrap .__ea-radio-input_inner::before {
  background-color: transparent;
}
.ea-radio_wrap.disabled .__ea-radio-label_desc {
  color: #c0c4cc;
}
.ea-radio_wrap.disabled[checked=true] .__ea-radio-input_wrap .__ea-radio-input_inner::before {
  background-color: #c0c4cc;
}
.ea-radio_wrap.border {
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}
.ea-radio_wrap.border[checked=true] {
  border: 1px solid #409eff;
}`;

const inputDom = () => {
  const wrap = document.createElement('span');
  wrap.className = "__ea-radio-input_wrap";

  const radio = document.createElement('span');
  radio.className = "__ea-radio-input_inner";
  wrap.appendChild(radio);

  const input = document.createElement('input');
  input.type = 'radio';
  input.className = "__ea-radio-input_input";

  wrap.appendChild(input);

  return { wrap, input };
}

const labelDom = () => {
  const labelDesc = document.createElement('span');
  labelDesc.className = "__ea-radio-label_desc";
  const slot = document.createElement('slot');
  labelDesc.appendChild(slot);

  return labelDesc;
}

export class EaRadio extends Base {
  #radio;
  #label;

  static get observedAttributes() {
    return ['checked'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    let dom = document.createElement('label');
    dom.className = "ea-radio_wrap";

    // input + radio
    const input = inputDom();
    dom.appendChild(input.wrap);

    // label 标签文字
    const label = labelDom();
    dom.appendChild(label);

    this.#label = dom;
    this.#radio = input.input;


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

  // ------- 选中 -------
  // #region
  get checked() {
    return this.getAttrBoolean('checked');
  }

  set checked(val) {
    this.#radio.checked = val;

    if (val) {
      this.setAttribute('checked', true);
      this.#label.setAttribute('checked', true);
      this.#label.classList.add('checked');
    } else {
      this.removeAttribute('checked');
      this.#label.removeAttribute('checked');
      this.#label.classList.remove('checked');
    }
  }
  // #endregion
  // ------- end -------

  // ------- label_for 单选框的唯一键 -------
  // #region
  get name() {
    return this.getAttribute('name');
  }

  set name(val) {
    this.#radio.setAttribute('name', val);
  }
  // #endregion
  // ------- end -------

  // ------- value 单选框的值 -------
  // #region
  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    this.#label.setAttribute('for', val);
    this.#radio.setAttribute('id', val);
    this.#radio.setAttribute('value', val);
  }
  // #endregion
  // ------- end -------

  // ------- disabled 禁用状态 -------
  // #region
  get disabled() {
    return this.getAttrBoolean('disabled');
  }

  set disabled(val) {
    this.#radio.disabled = val;
    this.#label.toggleAttribute('disabled', val);
    this.#label.classList.toggle('disabled', val);
  }
  // #endregion
  // ------- end -------

  // ------- border 是否带有边框 -------
  // #region
  get border() {
    return this.getAttrBoolean('border');
  }

  set border(val) {
    this.#label.classList.toggle('border', val);
  }
  // #endregion
  // ------- end -------

  init() {
    const that = this;

    // radio 的 checked 属性
    this.checked = this.checked;

    // label 的 for 属性
    this.name = this.name;

    // radio 的 value 属性
    this.value = this.value;

    // radio 的 disabled 属性
    this.disabled = this.disabled;

    // border 属性
    this.border = this.border;

    // 监听 change 事件, 修改 checked 属性
    this.#radio.addEventListener('change', function (e) {
      if (e.target.checked) {
        document.querySelectorAll(`ea-radio[name="${that.name}"]`).forEach(btn => {
          const btnInput = btn.shadowRoot.querySelector('input');

          if (btnInput !== this) {
            btn.checked = false;
          } else {
            btn.checked = true;
          }
        });
      }

      that.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: this.value,
          checked: this.checked
        }
      }))
    })


  }

  connectedCallback() {
    this.init();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    // console.log(name);
  }
}

if (!window.customElements.get("ea-radio")) {
  window.customElements.define("ea-radio", EaRadio);
=======
const stylesheet = ``;

const inputDom = () => {
    const wrap = document.createElement('span');
    wrap.className = "__ea-radio-input_wrap";

    const radio = document.createElement('span');
    radio.className = "__ea-radio-input_inner";
    wrap.appendChild(radio);

    const input = document.createElement('input');
    input.type = 'radio';
    input.className = "__ea-radio-input_input";

    wrap.appendChild(input);

    return { wrap, input };
}

const labelDom = () => {
    const labelDesc = document.createElement('span');
    labelDesc.className = "__ea-radio-label_desc";
    const slot = document.createElement('slot');
    labelDesc.appendChild(slot);

    return labelDesc;
}

export default class EaRadio extends Base {
    #radio;
    #label;

    static get observedAttributes() {
        return ['checked'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        let dom = document.createElement('label');
        dom.className = "ea-radio_wrap";

        // input + radio
        const input = inputDom();
        dom.appendChild(input.wrap);

        // label 标签文字
        const label = labelDom();
        dom.appendChild(label);

        this.#label = dom;
        this.#radio = input.input;


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

    // ------- 选中 -------
    // #region
    get checked() {
        return this.getAttrBoolean('checked');
    }

    set checked(val) {
        this.#radio.checked = val;

        if (val) {
            this.setAttribute('checked', true);
            this.#label.setAttribute('checked', true);
            this.#label.classList.add('checked');
        } else {
            this.removeAttribute('checked');
            this.#label.removeAttribute('checked');
            this.#label.classList.remove('checked');
        }
    }
    // #endregion
    // ------- end -------

    // ------- label_for 单选框的唯一键 -------
    // #region
    get name() {
        return this.getAttribute('name');
    }

    set name(val) {
        this.#radio.setAttribute('name', val);
    }
    // #endregion
    // ------- end -------

    // ------- value 单选框的值 -------
    // #region
    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        this.#label.setAttribute('for', val);
        this.#radio.setAttribute('id', val);
        this.#radio.setAttribute('value', val);
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用状态 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(val) {
        this.#radio.disabled = val;
        this.#label.toggleAttribute('disabled', val);
        this.#label.classList.toggle('disabled', val);
    }
    // #endregion
    // ------- end -------

    // ------- border 是否带有边框 -------
    // #region
    get border() {
        return this.getAttrBoolean('border');
    }

    set border(val) {
        this.#label.classList.toggle('border', val);
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        // radio 的 checked 属性
        this.checked = this.checked;

        // label 的 for 属性
        this.name = this.name;

        // radio 的 value 属性
        this.value = this.value;

        // radio 的 disabled 属性
        this.disabled = this.disabled;

        // border 属性
        this.border = this.border;

        // 监听 change 事件, 修改 checked 属性
        this.#radio.addEventListener('change', function (e) {
            if (e.target.checked) {
                document.querySelectorAll(`ea-radio[name="${that.name}"]`).forEach(btn => {
                    const btnInput = btn.shadowRoot.querySelector('input');

                    if (btnInput !== this) {
                        btn.checked = false;
                    } else {
                        btn.checked = true;
                    }
                });
            }
        })


    }

    connectedCallback() {
        this.init();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        // console.log(name);
    }
>>>>>>> master
}