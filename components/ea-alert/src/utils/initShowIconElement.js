import { createElement } from "../../../../utils/createElement.js";

const iconClass = {
    success: 'ok-circled',
    info: 'info',
    warning: 'attention-alt',
    error: 'cancel-circled'
}

export function initShowIconElement(iconContainer, type, isShowIcon) {
    if (!isShowIcon) return;

    const icon = createElement('ea-icon');
    icon.icon = `icon-${iconClass[type]}`;
    icon.classList.add(`ea-alert--${type}`);

    iconContainer.insertBefore(icon, iconContainer.firstChild);
}