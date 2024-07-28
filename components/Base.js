// @ts-nocheck

import setStyle from '../utils/setStyle.js';

export default class Base extends HTMLElement {
    constructor() {
        super();

        this.isProduction = false;
        this.isProduction = true;
    }

    /**
     * 设置属性值，并切换className
     * @param {string} attr 属性名
     * @param {boolean} flag 属性值
     * @param {string} className class名
     */
    toggleAttribute(attr, flag, className) {
        if (flag) {
            this.setAttribute(attr, flag);

            if (className) this.dom.classList.add(className);
        } else {

            if (this.hasAttribute(attr)) this.removeAttribute(attr);
            if (className) this.dom.classList.remove(className);
        }
    }

    /**
     * 设置属性值
     * @param {string} attr 属性名
     * @param {boolean} flag 属性值
     */
    toggleAttr(attr, flag) {
        if (flag) {
            this.setAttribute(attr, flag);
        } else {
            this.removeAttribute(attr);
        }
    }

    /**
     * 获取属性值，并转换为布尔值
     * @param {string} attrName 属性名
     * @returns {boolean}
     */
    getAttrBoolean(attrName) {
        const attr = this.getAttribute(attrName);
        return attr === 'true' || attr === '';
    }

    /**
     * 获取属性值，并转换为数字
     * @param {string} attrName 属性名
     * @returns {number}
     */
    getAttrNumber(attrName) {
        const attr = this.getAttribute(attrName);

        return attr ? Number(attr) : 0;
    }

    // 样式构建
    build(shadowRoot, stylesheet) {
        if (this.isProduction) {
            const styleNode = document.createElement('style');
            styleNode.innerHTML = stylesheet;
            this.shadowRoot.appendChild(styleNode);
        } else {
            if (this.nodeName.toLowerCase() == 'ea-skeleton-item' && !this.isProduction) setStyle(shadowRoot, new URL("ea-skeleton" + '/index.css', import.meta.url).href);
            else if (this.nodeName.toLowerCase() == 'ea-carousel-item' && !this.isProduction) setStyle(shadowRoot, new URL("ea-carousel" + '/index.css', import.meta.url).href);
            else if (this.nodeName.toLowerCase() == 'ea-timeline-item' && !this.isProduction) setStyle(shadowRoot, new URL("ea-timeline" + '/index.css', import.meta.url).href);
            else if (this.nodeName.toLowerCase() == 'ea-collapse-item' && !this.isProduction) setStyle(shadowRoot, new URL("ea-collapse" + '/index.css', import.meta.url).href);
            // else if (this.nodeName.toLowerCase() == 'ea-menu-item' && !this.isProduction) setStyle(shadowRoot, new URL("ea-menu" + '/index.css', import.meta.url).href);
            // else if (this.nodeName.toLowerCase() == 'ea-submenu' && !this.isProduction) setStyle(shadowRoot, new URL("ea-menu" + '/index.css', import.meta.url).href);
            else setStyle(shadowRoot, new URL(this.nodeName.toLowerCase() + '/index.css', import.meta.url).href);
        }
    }

    /**
     * 
     * @param {string} url 链接
     */
    setIconFile(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        this.shadowRoot.appendChild(link);
    }
}