// @ts-nocheck
import "./components/ea-ui-base-style.css";

import EaButton from "./components/ea-button/ea-button.js";
import EaButtonGroup from "./components/ea-button-group/";
import EaLink from "./components/ea-link/";
import EaRadio from "./components/ea-radio/";

const register = (name, component) => {
    if (!window.customElements.get(name)) {
        window.customElements.define(name, component);
    }
}

register("ea-button", EaButton);
register("ea-button-group", EaButtonGroup);
register("ea-link", EaLink);
register("ea-radio", EaRadio);