import lightCss from "./light.scss?inline";

const style = document.createElement("style");
style.textContent = lightCss;
document.head.appendChild(style);
