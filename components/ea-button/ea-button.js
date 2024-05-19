export default class EaButton extends HTMLElement {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
        :root {
            font-size: 5rem;
        }
        div {
            font-size: 5rem;
        }
        button {
            font-size: 5rem;
        }
        `;


        const test = document.createElement('button');
        test.innerHTML = `111111`;

        shadowRoot.appendChild(style);
        shadowRoot.appendChild(test);
    }

    static get buttonShape() {
        return [
            "plain",
            "round",
            "circle",
        ]
    }

    get disabled() {
        return this.getAttribute('disabled')
    }
}