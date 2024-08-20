import { timeout } from "../../../../utils/timeout.js";

function handleBackTopBtnShow(container, scrollDom, scrollFlag) {
    if (scrollDom.scrollTop > scrollFlag) {
        container.style.display = 'flex';
        container.ontransitionend = null;

        timeout(() => {
            container.style.opacity = 1;
        }, 10);
    } else {
        container.style.opacity = 0;

        container.ontransitionend = () => {
            container.style.display = 'none';
        };
    }
}

function handleScrollEvent(targetName) {
    let dom = null;
    let scrollDom = null;

    if (targetName === "null" || targetName === '' || targetName === null || targetName === undefined || targetName === 'undefined') {
        dom = document;
        scrollDom = document.documentElement;
    } else {
        dom = document.querySelector(targetName);
        scrollDom = document.querySelector(targetName);
    }

    return { dom, scrollDom };
}

export function initScrollBtn(container, targetElement, visibilityHeight) {
    const { dom, scrollDom } = handleScrollEvent(targetElement);

    handleBackTopBtnShow(container, scrollDom, visibilityHeight);

    dom.addEventListener('scroll', () => {
        handleBackTopBtnShow(container, scrollDom, visibilityHeight);
    });

    container.addEventListener('click', function () {
        let step = 10;

        let timer = setInterval(() => {
            step += 5;
            scrollDom.scrollTop -= step;

            if (scrollDom.scrollTop <= 0) {
                scrollDom.scrollTop = 0;
                clearInterval(timer);
                timer = null;

                this.dispatchEvent(new CustomEvent('reachedTop', {}));
            }
        }, 12);

        this.dispatchEvent(new CustomEvent('backtop', {}));
    });
}