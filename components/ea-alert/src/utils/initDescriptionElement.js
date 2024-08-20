import { createElement } from "../../../../utils/createElement.js";

export function initDescriptionElement(container, description) {
    if (!description) return;

    const descriptionElement = createElement('p', 'ea-alert_description');
    container.style.flexDirection = 'column';

    descriptionElement.innerText = description;
    container.appendChild(descriptionElement);
}