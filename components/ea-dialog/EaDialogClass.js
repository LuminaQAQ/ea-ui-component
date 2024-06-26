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

        const EaDialog = createElement('ea-dialog', '');
        document.body.appendChild(EaDialog);

        EaDialog.open = true;

        EaDialog.content = content;
        EaDialog.title = title;

        this.handleElementAttrs(EaDialog, options, this.attrs);

        return new Promise((resolve, reject) => {
            EaDialog.addEventListener('close', () => {
                that.close(EaDialog);
                reject();
            });

            EaDialog.addEventListener('confirm', () => {
                that.close(EaDialog);
                resolve(true);
            });
        });
    }

}