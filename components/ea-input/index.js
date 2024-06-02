import Base from "../Base";

const stylesheet = ``;

const inputDom = (type) => {
    let input = null;

    if (type === "textarea") {
        input = document.createElement('textarea');
        input.className = "ea-textarea_inner";
    } else {
        input = document.createElement('input');
        input.className = "ea-input_inner";
        input.type = type;
        input.autocomplete = "off";
    }

    return input;
}

export default class EaInput extends Base {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = "ea-input_wrap";

        console.log(this);
    }

    // ------- type 标识是 input 还是  -------
    // #region

    // #endregion
    // ------- end -------
}