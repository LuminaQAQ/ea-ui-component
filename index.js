// @ts-nocheck
import "./components/ea-ui-base-style.css";

import EaButton from "./components/ea-button/ea-button";
import EaButtonGroup from "./components/ea-button-group/";



if (!window.customElements.get("ea-button")) {
    window.customElements.define("ea-button", EaButton);
    window.customElements.define("ea-button-group", EaButtonGroup);
}