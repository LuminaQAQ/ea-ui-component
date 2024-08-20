import { createElement } from "../../../../utils/createElement.js";

export function handleSeparator(separator, separatorClass, separatorColor) {
    const items = this.querySelectorAll('ea-breadcrumb-item');

    items.forEach((item, index) => {
        if (index < items.length - 1) {
            const separatorIcon = createElement('ea-icon');
            separatorIcon.color = separatorColor;

            if (separatorClass) {
                separatorIcon.icon = separatorClass;
            } else {
                separatorIcon.style.margin = '0 10px';
                separatorIcon.innerText = separator;
            }

            item.appendChild(separatorIcon);
        }
    });
}