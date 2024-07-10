import { createElement } from "../../utils/createElement.js"

export class EaMessageBox {
    constructor() {

    }

    get attrs() {
        return ["cancelButtonText", "confirmButtonText"];
    }

    #handleElementAttrs(el, options, attrs) {
        attrs.forEach(attr => {
            if (options[attr]) el[attr] = options[attr];
        });
    }

    #close(el) {
        el.remove();
    }

    open(content, title, options) {
        const that = this;

        const EaMessageBox = createElement('ea-message-box', '');
        document.body.appendChild(EaMessageBox);

        EaMessageBox.open = true;

        EaMessageBox.content = content;
        EaMessageBox.title = title;

        this.#handleElementAttrs(EaMessageBox, options, this.attrs);

        return new Promise((resolve, reject) => {
            EaMessageBox.addEventListener('cancel', () => {
                that.#close(EaMessageBox);
                reject();
            });

            EaMessageBox.addEventListener('confirm', () => {
                that.#close(EaMessageBox);
                resolve(true);
            });
        });
    }

}