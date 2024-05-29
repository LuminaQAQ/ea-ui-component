export default function setStyle(shadowRoot, href) {
    const link = document.createElement('link');
    
    link.href = href;
    link.rel = "stylesheet";

    shadowRoot.appendChild(link);
}