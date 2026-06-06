import darkCss from "../themes/dark.scss?inline";

const style = document.createElement("style");
style.textContent = darkCss;
document.head.appendChild(style);
