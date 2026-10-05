import darkCss from "../styles/dark.scss?inline";

const style = document.createElement("style");
style.textContent = darkCss;
document.head.appendChild(style);
