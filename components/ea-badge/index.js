// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export default class EaBadge extends Base {
    #wrap;
    #badgeWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-badge_wrap';

        const slot = document.createElement('slot');
        wrap.appendChild(slot);

        const badgeWrap = document.createElement('sup');
        badgeWrap.className = 'ea-badge_content';
        wrap.appendChild(badgeWrap);

        this.#wrap = wrap;
        this.#badgeWrap = badgeWrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- value badge的值 -------
    // #region
    get value() {
        return this.getAttribute('value') || '';
    }

    set value(value) {
        this.setAttribute('value', value);

        this.#badgeWrap.innerHTML = value;
    }
    // #endregion
    // ------- end -------

    // ------- type badge的类型 -------
    // #region
    get type() {
        return this.getAttribute('type') || 'normal';
    }

    set type(value) {
        this.setAttribute('type', value);

        this.#badgeWrap.classList.add(value);
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        this.value = this.value;

        this.type = this.type;

        try {
            const button = this.querySelector('ea-button');
            if (button) button.style.setProperty('--margin-right', '0');
        } catch (error) { }
    }

    connectedCallback() {
        this.init();
    }
}