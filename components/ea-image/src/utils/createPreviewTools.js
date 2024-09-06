

import { createElement } from "../../../../utils/createElement.js";

function handlePreviewDisplay(wrap) {
    wrap.classList.remove('entry');

    wrap.addEventListener('transitionend', () => {
        wrap.remove();
        document.body.style.overflow = 'auto';
    })
}

/**
 * 创建一个图片预览的关闭按钮
 * 
 * @returns {HTMLElement} 返回创建的关闭按钮元素
 */
function createCloseBtn(wrap) {
    const closeBtn = createElement('span', 'ea-icon-close');
    closeBtn.innerText = "x";

    closeBtn.addEventListener('click', () => {
        handlePreviewDisplay(wrap);
    });

    // 返回创建的关闭按钮元素
    return closeBtn;
}

/**
 * 构建图片预览工具
 * @param {HTMLElement} img 图片元素
 */
function handleImageDrag(wrap, img) {
    let startX = 0;
    let startY = 0;

    function handleMouseMove(e) {
        const { clientX, clientY } = e;

        img.style.marginLeft = `${clientX - startX}px`;
        img.style.marginTop = `${clientY - startY}px`;
    }

    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    img.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;

        img.addEventListener('mousemove', handleMouseMove);

        img.addEventListener('mouseup', () => {
            img.removeEventListener('mousemove', handleMouseMove);
        });
    });
}

/**
 * 创建一个图片预览的关闭按钮
 * 
 * @param {HTMLElement} img 图片元素
 * @returns {HTMLElement} 返回创建的关闭按钮元素
 */
function createPreviewTools(img) {
    const toolsWrap = createElement('div', 'ea-image_preview-tools');
    toolsWrap.innerHTML = `
        <span class="ea-icon-zoom ea-icon-zoom-in">+</span>
        <span class="ea-icon-zoom ea-icon-zoom-out">-</span>
        <span class="ea-icon-rotate ea-icon-rotate-left">↺</span>
        <span class="ea-icon-rotate ea-icon-rotate-right">↻</span>
    `;

    const zoomInBtn = toolsWrap.querySelector('.ea-icon-zoom-in');
    zoomInBtn.addEventListener('click', () => {
        img.style.scale = img.style.scale ? Number(img.style.scale) + 0.2 : 1.2;
    });

    const zoomOutBtn = toolsWrap.querySelector('.ea-icon-zoom-out');
    zoomOutBtn.addEventListener('click', () => {
        img.style.scale = img.style.scale ? Number(img.style.scale) - 0.2 : 0.8;
    });

    const rotateLeft = toolsWrap.querySelector('.ea-icon-rotate-left');
    rotateLeft.addEventListener('click', () => {
        img.style.rotate = (img.style.rotate ? Number(img.style.rotate.split('deg')[0]) - 90 : -90) + "deg";
    });

    const rotateRight = toolsWrap.querySelector('.ea-icon-rotate-right');
    rotateRight.addEventListener('click', () => {
        img.style.rotate = (img.style.rotate ? Number(img.style.rotate.split('deg')[0]) + 90 : 90) + "deg";
    });


    return toolsWrap;
}


/**
 * 处理图片预览功能。
 * 当isPreview参数为true时，为图片添加点击事件监听器，以实现预览功能。
 * 预览功能包括：克隆图片元素、设置图片样式、处理图片拖动、创建关闭按钮和工具栏、以及隐藏滚动条。
 * @param {boolean} isPreview - 是否开启图片预览功能。
 */
export function initImagePreview(container, img, isPreview) {
    if (isPreview) {
        img.addEventListener('click', () => {
            // 克隆图片元素以用于预览，并设置图片的object-fit属性为contain。
            img = img.cloneNode(true);
            img.style.objectFit = "contain";

            // 创建预览包装元素，并将克隆的图片添加到其中。
            const wrap = createElement('div', 'ea-image_preview-wrap', [img]);
            container.appendChild(wrap);

            // 创建并添加关闭按钮到预览窗口。
            const closeBtn = createCloseBtn(wrap);
            wrap.appendChild(closeBtn);

            // 创建并添加预览工具栏到预览窗口。
            const toolkit = createPreviewTools(img, wrap);
            wrap.appendChild(toolkit);

            // 延迟20毫秒后添加动画入口类，以平滑地显示预览窗口。
            setTimeout(() => {
                wrap.classList.add('entry');
            }, 20)

            handleImageDrag(wrap, img);

            document.body.style.overflow = 'hidden';
        });
    }
}