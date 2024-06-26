import { createElement } from "../../utils/createElement.js"

export class EaDialog {
    constructor() {
        
    }

    get attrs() {
        return ["confirmButtonText", "cancelButtonText"];
    }

    handleElementAttrs(el, options, attrs) {
        attrs.forEach(attr => {
            if (options[attr]) el[attr] = options[attr];
        });
    }

    close(el) {
        el.remove();
    }

    open(content, title, options) {
        const that = this;

        const EaMessageBox = createElement('ea-dialog', '');
        document.body.appendChild(EaMessageBox);

        EaMessageBox.open = true;

        EaMessageBox.content = content;
        EaMessageBox.title = title;

        this.handleElementAttrs(EaMessageBox, options, this.attrs);

        return new Promise((resolve, reject) => {
            EaMessageBox.addEventListener('close', () => {
                that.close(EaMessageBox);
                reject();
            });

            EaMessageBox.addEventListener('confirm', () => {
                that.close(EaMessageBox);
                resolve(true);
            });
        });
    }

}