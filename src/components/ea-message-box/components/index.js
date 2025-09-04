import { EaOverlay } from '@/common/ea-overlay';
import { EaMessageAlertBox } from "./ea-message-alert-box/index.js"

import stylesheet from './index.scss?inline';

export class EaMessageBoxElement extends EaOverlay {
    /** @type {HTMLElement} */
    #messageBoxContainer;
    /** @type {AbortController} */
    #visibleAbortController;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            'visible', 'boxtype',
            '','title', 'message',
            'cancelButtonText', 'confirmbuttontext',
        ];
    }

    state = this.properties({
        visible: {
            type: Boolean,
            default: false,
            observer: async (newVal) => {
                this.status = newVal;
            }
        },
        boxtype: {
            type: ['alert' | 'confirm' | 'prompt'],
            default: 'alert',
            observer: async (newVal) => {
                const attrs = EaMessageBoxElement.observedAttributes;
                const el = document.createElement(`ea-message-${newVal}-box`);

                attrs.forEach(k => {
                    el[k] = this[k];
                });

                this.appendChild(el);
            }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return `${super.updateContainerClasslist()} ${this.computedClasslist('ea-message-box', {
            ['--visible']: this.visible,
        })}`;
    }

    connectedCallback() {
        this.setAttribute('role', 'dialog');
        this["content-width"] = "100%";
        this["content-max-width"] = "420px";
        this["content-height"] = "auto";
        this["close-on-click-modal"] = false;

        super.connectedCallback();
        this.assignedStyle(stylesheet);
    }
}

if (!window.customElements.get('ea-message-box')) {
    window.customElements.define('ea-message-box', EaMessageBoxElement);
}