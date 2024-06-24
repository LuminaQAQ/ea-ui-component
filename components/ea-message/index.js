// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaMessageElement extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-message_wrap';

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- text 提示框的文字 -------
    // #region
    get text() {
        return this.getAttribute('text');
    }

    set text(value) {
        this.setAttribute('text', value);

        this.#wrap.innerHTML = value;
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;
    }

    connectedCallback() {
        this.init();
    }
}


export class EaMessage {
    constructor() {
    }

    open(tip) {
        console.log(tip);

        const eaMessage = document.createElement('ea-message');
        eaMessage.text = tip;
        eaMessage.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
        `

        document.body.appendChild(eaMessage);

        let timer = setTimeout(() => {
            eaMessage.remove();
            clearTimeout(timer);
            timer = null;
        }, 2000);
    }
}