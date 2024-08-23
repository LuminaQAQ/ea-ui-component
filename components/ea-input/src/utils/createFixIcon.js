export function createFixIcon(container, icon, type) {
    const prefixIcon = document.createElement('ea-icon');
    prefixIcon.className = `fix-icon ${type}-icon`;
    prefixIcon.icon = icon;
    prefixIcon.part = `${type}-icon`;

    container.classList.add(type);

    container.appendChild(prefixIcon);
}