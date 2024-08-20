// @ts-nocheck
import Base from "../Base.js";

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-checkbox-group {
  display: flex;
}
.ea-checkbox-group ::slotted(ea-checkbox) {
  margin-right: 1.5rem;
}`;

export class EaCheckboxGroup extends Base {
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
        return this.getAttribute('value') || '';
    }

    set value(val) {
        this.setAttribute('value', val);

        try {
            const valArr = val.split(',').map(item => item.trimStart());

            valArr.map(item => {
                const checkbox = this.querySelector(`ea-checkbox[name="${this.name}"][value="${item}"]`);
                checkbox.setAttribute('checked', 'true');
                checkbox.checked = 'true';
            })

            this.dispatchEvent(new CustomEvent('change', { detail: valArr }));
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
            checkbox.disabled = val;
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

        const checkboxes = this.querySelectorAll('ea-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', e => {
                let valueArr = [];
                Array.from(checkboxes).filter(item => {
                    if (item.checked) return valueArr.push(item.value);
                    return false;
                })

                this.value = valueArr.join(',');
            });
        });

        this.setAttribute('data-ea-component', true);
    }

    connectedCallback() {
        this.init();
    }
}

if (!window.customElements.get("ea-checkbox-group")) {
    window.customElements.define("ea-checkbox-group", EaCheckboxGroup);
}