import Base from '@components/Base.js'

export class EaMessageBase extends Base {
    /** @type {AbortController} */
    #abortController;

    static get observedAttributes() {
        return [
            'dangerouslyUseHTMLString', 'title', 'message',
            'type', 'icon', 'showClose', 'closeIcon',
            'cancelButtonText', 'confirmButtonText',
        ].map(s => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
            .toLowerCase());
    }

    state = this.properties({
        dangerouslyUseHTMLString: {
            type: Boolean,
            default: false,
            observer: (newVal) => { }
        },
        title: {
            type: String,
            default: '',
            observer: (newVal) => {
                this.titleElement.textContent = newVal;
            }
        },
        message: {
            type: String,
            default: '',
            observer: (newVal) => {
                if (this.dangerouslyUseHTMLString) {
                    this.contentElement.innerHTML = newVal;
                } else {
                    this.contentElement.textContent = newVal;
                }
            }
        },
        type: {
            type: ['normal', 'primary', 'success', 'warning', 'danger'],
            default: 'primary',
            observer: (newVal) => {
                this.confirmButton.type = newVal;
            }
        },
        icon: {
            type: String,
            default: '',
            observer: (newVal) => {
            }
        },
        showClose: {
            type: Boolean,
            default: true,
            observer: (newVal) => {
                console.log(newVal);

                if (newVal) {
                    this.closeIconElement.style.display = 'block';
                } else {
                    this.closeIconElement.style.display = 'none';
                }
            }
        },
        confirmbuttontext: {
            type: String,
            default: 'OK',
            observer: (newVal) => {
                console.log(newVal);

                this.confirmButton.textContent = newVal;
            }
        },
    })

    dispatchBubblesEvent = (customEventName, detail) => {
        this.dispatchEvent(new CustomEvent(customEventName, {
            detail,
            bubbles: true,
            composed: true,
        }));
    }

    connectedCallback() {
        super.connectedCallback();

        this.#abortController = new AbortController();

        this.confirmButton.addEventListener('click', () => {
            this.dispatchBubblesEvent('confirm');
        }, { once: true, signal: this.#abortController.signal });

        this.closeIconElement.addEventListener('click', () => {
            this.dispatchBubblesEvent('cancel');
        }, { once: true, signal: this.#abortController.signal });

        this.addEventListener('close', () => {
            this.dispatchBubblesEvent('cancel');
        }, { once: true, signal: this.#abortController.signal });
    }

    $beforeUnmounted() {
        this.#abortController?.abort();
    }
}