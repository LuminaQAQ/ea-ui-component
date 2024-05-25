// @ts-nocheck
import "./components/ea-ui-base-style.css";

import EaButton from "./components/ea-button/ea-button.js";
import EaButtonGroup from "./components/ea-button-group/";
import EaLink from "./components/ea-link/";



if (!window.customElements.get("ea-button")) {
    window.customElements.define("ea-button", EaButton);
    window.customElements.define("ea-button-group", EaButtonGroup);
    window.customElements.define("ea-link", EaLink);
}