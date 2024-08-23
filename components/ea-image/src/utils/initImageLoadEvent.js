import { errorImage } from "../assets/errorImage.js";

/**
 * 处理图片加载逻辑
 * @param {HTMLElement} container 图片容器元素
 * @param {HTMLElement} imageElement 图片元素
 * @param {HTMLElement} placeholderSlot 占位元素槽
 * @param {string} src 图片源地址
 * @param {boolean} [isLazy=false] 是否为懒加载，默认为false
 */
export function initImageLoadEvent(container, imageElement, placeholderSlot, src, isLazy = false) {
    const image = new Image();

    if (isLazy) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return;

            image.src = src;
            observer.disconnect();
        });

        observer.observe(container);
    } else {
        image.src = src;
    }

    image.onload = () => {
        imageElement.setAttribute('src', src);
        placeholderSlot.remove();

        this.dispatchEvent(new CustomEvent('load', { detail: { src } }));
    };

    image.onerror = () => {
        container.innerHTML = errorImage;
        container.classList.add('is-error');
        placeholderSlot.remove();

        this.dispatchEvent(new CustomEvent('error', { detail: { src } }));
    };
}