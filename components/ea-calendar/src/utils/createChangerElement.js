import { createElement } from "../../../../utils/createElement.js";

export const createChangerElement = (text, className) => {
    const el = createElement('ea-button', `ea-calendar-header_sg-changer ea-calendar-header_changer-${className}`);

    el.innerText = text;
    el.size = "small";

    return el;
}