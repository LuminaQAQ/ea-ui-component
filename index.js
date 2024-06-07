// @ts-nocheck
import "./components/ea-ui-base-style.css";

import EaButton from "./components/ea-button/ea-button.js";
import EaButtonGroup from "./components/ea-button-group/";
import EaLink from "./components/ea-link/";
import EaRadio from "./components/ea-radio/";
import EaRadioGroup from "./components/ea-radio-group/";
import EaCheckbox from "./components/ea-checkbox/";
import EaCheckboxGroup from "./components/ea-checkbox-group/";
import EaInput from "./components/ea-input/";
import EaTextarea from "./components/ea-textarea/";
import EaInputNumber from "./components/ea-input-number/";

const register = (name, component) => {
    if (!window.customElements.get(name)) {
        window.customElements.define(name, component);
    }
}

register("ea-button", EaButton);
register("ea-button-group", EaButtonGroup);
register("ea-link", EaLink);
register("ea-radio", EaRadio);
register("ea-radio-group", EaRadioGroup);
register("ea-checkbox", EaCheckbox);
register("ea-checkbox-group", EaCheckboxGroup);
register("ea-input", EaInput);
register("ea-textarea", EaTextarea);
register("ea-input-number", EaInputNumber);