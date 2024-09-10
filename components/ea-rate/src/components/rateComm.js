import { createElement } from "../../../../utils/createElement.js";

const rateComm = (i) => {
    const dom = createElement('span', 'ea-rate_item');
    dom.index = i;
    dom.part = 'rate-item';

    const icon = createElement('ea-icon');
    icon.icon = 'icon-star-empty';
    dom.appendChild(icon);

    return dom;
}


export const initRateTempalte = (container) => {
    for (let i = 0; i < 5; i++) {
        container.appendChild(rateComm(i));
    }
}