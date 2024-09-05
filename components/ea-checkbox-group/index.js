// @ts-nocheck
import setStyle from "../../utils/setStyle";
import Base from "../Base";

const stylesheet = `
.ea-checkbox-group {
  display: flex;
}
.ea-checkbox-group ::slotted(ea-checkbox) {
  margin-right: 1.5rem;
}`;

export class EaCheckboxGroup extends Base {
    #mounted = false;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class="ea-checkbox-group_wrap" part="container">
                <slot></slot>
            </div>
        `;

        this.build(shadowRoot, stylesheet);
    }

    // ------- name 唯一键值 -------
    // #region
    get name() {
        return this.getAttribute('name') || 'ea-checkbox';
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
                const checkbox = this.querySelector(`ea-checkbox[value="${item}"]`);

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
        if (!val && !this.#mounted) return;

        const checkboxs = this.querySelectorAll(`ea-checkbox`);
        checkboxs.forEach(checkbox => {
            checkbox.disabled = val;
        });
    }
    // #endregion
    // ------- end -------

    #handleValueUptate(checkboxes) {
        let valueArr = [];
        Array.from(checkboxes).filter(item => {
            if (item.checked) return valueArr.push(item.value);
            return false;
        })

        this.value = valueArr.join(',');
    }

    connectedCallback() {
        this.setAttribute('data-ea-component', true);

        // name 唯一键值
        this.name = this.name;

        setTimeout(() => {
            // value 指定选中值
            this.value = this.value;

            // disabled 禁用
            this.disabled = this.disabled;

            const checkboxes = this.querySelectorAll('ea-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', e => {
                    this.#handleValueUptate(checkboxes);
                });
            });
            this.#handleValueUptate(checkboxes);
            this.#mounted = true;
        }, 20);

    }
}

if (!window.customElements.get("ea-checkbox-group")) {
    window.customElements.define("ea-checkbox-group", EaCheckboxGroup);
}