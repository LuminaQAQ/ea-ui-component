import { createElement } from "../../../../utils/createElement.js"

export class EaMessageBox {
    constructor(isPrompt) {
        this.isPrompt = isPrompt;
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
        const EaMessageBox = createElement('ea-message-box');
        EaMessageBox.addEventListener('ready', () => {
            if (this.isPrompt) EaMessageBox.isPrompt = true;
            EaMessageBox.reg = new RegExp(options.reg);
            EaMessageBox.style.setProperty('--invalid-message', `"${options.invalidMessage}"`);
            EaMessageBox.inputPlaceholder = options.inputPlaceholder;
        });
        document.body.appendChild(EaMessageBox);

        EaMessageBox.open = true;

        EaMessageBox.content = content;
        EaMessageBox.title = title;

        this.#handleElementAttrs(EaMessageBox, options, this.attrs);

        return new Promise((resolve, reject) => {
            EaMessageBox.addEventListener('cancel', () => {
                this.#close(EaMessageBox);
                reject();
            });

            EaMessageBox.addEventListener('confirm', (e) => {
                if (this.isPrompt && !options.reg.test(e.detail.value)) {
                    e.detail.target.setAttribute('aria-invalid', true);
                    e.detail.target.focus();

                    return;
                }

                this.#close(EaMessageBox);
                if (this.isPrompt) resolve(e.detail.value);
                else resolve(true);
            });
        });
    }

}