// @ts-nocheck
import setStyle from "../../utils/setStyle";
import Base from '../Base.js'

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
}