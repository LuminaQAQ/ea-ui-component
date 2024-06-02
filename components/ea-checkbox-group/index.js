// @ts-nocheck
import setStyle from "../../utils/setStyle";
import Base from "../Base";

const stylesheet = `.ea-checkbox-group {
  display: flex;
}
.ea-checkbox-group ::slotted(ea-checkbox) {
  margin-right: 1.5rem;
}`;

export default class EaCheckboxGroup extends Base {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const dom = document.createElement('div');
        shadowRoot.appendChild(dom);
        const slot = document.createElement('slot');
        dom.className = "ea-checkbox-group";
        dom.appendChild(slot);


        this.dom = dom;

        this.build(shadowRoot, stylesheet);

        shadowRoot.appendChild(dom);
    }

    // ------- name 唯一键值 -------
    // #region
    get name() {
        return this.getAttribute('name');
    }

    set name(val) {
        this.querySelectorAll('ea-checkbox').forEach(checkbox => {
            checkbox.setAttribute('name', val);
            checkbox.name = val;
        });
    }
    // #endregion
    // ------- end -------

    // ------- value 指定选中值 -------
    // #region
    get value() {
        if (!this.getAttribute('value')) return;

        return this.getAttribute('value');
    }

    set value(val) {
        if (!val) return;

        try {
            const valArr = val.split(',').map(item => item.trimStart());

            valArr.map(item => {
                const checkbox = document.querySelector(`ea-checkbox[name="${this.name}"][value="${item}"]`);
                checkbox.setAttribute('checked', 'true');
                checkbox.checked = 'true';
            })
        } catch (error) {

        }
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(val) {
        const checkboxs = document.querySelectorAll(`ea-checkbox[name="${this.name}"]`);

        checkboxs.forEach(checkbox => {
            checkbox.setAttribute('disabled', 'true');
            checkbox.disabled = 'true';
        });
    }
    // #endregion
    // ------- end -------

    init() {
        // name 唯一键值
        this.name = this.name;

        // value 指定选中值
        this.value = this.value;

        // disabled 禁用
        this.disabled = this.disabled;
    }

    connectedCallback() {
        this.init();
    }
}
