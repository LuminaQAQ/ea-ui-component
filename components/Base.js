// @ts-nocheck
export default class Base extends HTMLElement {
    constructor() {
        super();
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
     * 获取属性值，并转换为布尔值
     * @param {string} attrName 属性名
     * @returns {boolean}
     */
    getAttrBoolean(attrName) {
        const attr = this.getAttribute(attrName);
        return attr === true || attr === 'true' || attr === '';
    }

}