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
import EaSelect from "./components/ea-select/";
import EaSwitch from "./components/ea-switch/";
import EaRate from "./components/ea-rate/";
import EaTag from "./components/ea-tag";
import EaProgress from "./components/ea-progress/";
import { EaPagination } from "./components/ea-pagination/";
import EaBadge from "./components/ea-badge/";
import EaAvatar from "./components/ea-avatar/";
import { EaSkeleton } from "./components/ea-skeleton/";
import { EaSkeletonItem } from "./components/ea-skeleton/";
import { EaEmpty } from "./components/ea-empty";
import { EaDescriptions } from "./components/ea-descriptions/";
import { EaDescriptionsItem } from "./components/ea-descriptions-item/";
import { EaResult } from "./components/ea-result/";

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
register("ea-select", EaSelect);
register("ea-switch", EaSwitch);
register("ea-rate", EaRate);
register("ea-tag", EaTag);
register("ea-progress", EaProgress);
register("ea-pagination", EaPagination);
register("ea-badge", EaBadge);
register("ea-avatar", EaAvatar);
register("ea-skeleton", EaSkeleton);
register("ea-skeleton-item", EaSkeletonItem);
register("ea-empty", EaEmpty);
register("ea-descriptions", EaDescriptions);
register("ea-descriptions-item", EaDescriptionsItem);
register("ea-result", EaResult);