// @ts-nocheck
import setStyle from "../../utils/setStyle";
import Base from '../Base.js'

const stylesheet = ``;

const inputDom = () => {
    const wrap = document.createElement('span');
    wrap.className = "__ea-checkbox-input_wrap";

    const checkbox = document.createElement('span');
    checkbox.className = "__ea-checkbox-input_inner";
    wrap.appendChild(checkbox);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = "__ea-checkbox-input_input";

    wrap.appendChild(input);

    return { wrap, input };
}

const labelDom = () => {
    const labelDesc = document.createElement('span');
    labelDesc.className = "__ea-checkbox-label_desc";
    const slot = document.createElement('slot');
    labelDesc.appendChild(slot);

    return labelDesc;
}

export default class EacheChekbox extends Base {
    #mounted = false;
    #checkbox;
    #label;

    static get observedAttributes() {
        return ['checked'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const that = this;
        let dom = document.createElement('label');
        dom.className = "ea-checkbox_wrap";

        // input + checkbox
        const input = inputDom();
        dom.appendChild(input.wrap);

        // label 标签文字
        const label = labelDom();
        dom.appendChild(label);

        this.#label = dom;
        this.#checkbox = input.input;


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

    // ------- checked 选中 -------
    // #region
    get checked() {
        return this.getAttrBoolean('checked');
    }

    set checked(val) {
        this.#checkbox.checked = val;

        if (val) {
            this.setAttribute('checked', true);
            this.#label.setAttribute('checked', true);
            this.#label.classList.add('checked');
        } else {
            this.removeAttribute('checked');
            this.#label.removeAttribute('checked');
            this.#label.classList.remove('checked');
            this.#label.classList.remove('indeterminate');
        }
    }
    // #endregion
    // ------- end -------

    // ------- name 单选框的唯一键 -------
    // #region
    get name() {
        return this.getAttribute('name');
    }

    set name(val) {
        this.#checkbox.setAttribute('name', val);
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
        this.#checkbox.setAttribute('id', val);
        this.#checkbox.setAttribute('value', val);
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用状态 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(val) {
        this.#checkbox.disabled = val;
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

    // ------- indeterminate 状态 -------
    // #region
    get indeterminate() {
        return this.getAttrBoolean('indeterminate');
    }

    set indeterminate(val) {
        if (val) {
            this.setAttribute('indeterminate', true);
            this.#label.classList.add('indeterminate');
        } else {
            this.removeAttribute('indeterminate');
            this.#label.classList.remove('indeterminate');
        }
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        // checkbox 的 checked 属性
        this.checked = this.checked;

        // label 的 for 属性
        this.name = this.name;

        // checkbox 的 value 属性
        this.value = this.value;

        // checkbox 的 disabled 属性
        this.disabled = this.disabled;

        // border 属性
        this.border = this.border;

        // indeterminate 属性
        this.indeterminate = this.indeterminate;

        // 监听 change 事件, 修改 checked 属性
        this.#checkbox.addEventListener('change', function (e) {
            e.preventDefault();
            that.checked = e.target.checked;
            if (e.target.checked) {
                // document.querySelectorAll(`ea-checkbox[name="${that.name}"]`).forEach(btn => {
                //     const btnInput = btn.shadowRoot.querySelector('input');

                //     if (btnInput !== this) {
                //         btn.checked = false;
                //     } else {
                //         btn.checked = true;
                //     }
                // });
            }
        })
    }

    connectedCallback() {
        this.init();
    }

    attributeChangedCallback(name, oldVal, newVal) {

    }
}