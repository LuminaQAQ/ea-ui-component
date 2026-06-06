import sourceCss from "../themes/source.scss?inline";

const style = document.createElement("style");
style.textContent = sourceCss;
document.head.appendChild(style);
