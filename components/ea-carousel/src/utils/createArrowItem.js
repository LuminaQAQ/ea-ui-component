import { createElement } from "../../../../utils/createElement.js";

export function createArrowItem(container, contentContainer, arrow) {
    let throttle = false;
    const arrowItem = createElement('div', `ea-carousel-item_arrow ea-carousel-item_arrow--${arrow}`);

    arrowItem.innerHTML = this.arrow === "left" ? `&lt;` : `&gt;`;

    switch (this.arrow) {
        case "always":
            container.classList.add('always-show-arrow');
            break;
        case "hover":
            container.classList.add('hover-trigger');
            break;
    }

    arrowItem.addEventListener('click', () => {
        if (throttle) return;
        this.index = this.arrow === "left" ? --this.index : ++this.index;
    })

    contentContainer.addEventListener('transitionstart', () => {
        throttle = true;
    })
    contentContainer.addEventListener('transitionend', () => {
        throttle = false;
    })

    return arrowItem;
}