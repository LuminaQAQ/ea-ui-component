export function initClosableElement(container, closeIcon, closeText, closable) {
    if (!closable) return;

    closable === true && closeText === "" ? closeIcon.icon = 'icon-cancel' : closeIcon.innerText = closeText;

    closeIcon.addEventListener('click', () => {
        container.style.opacity = 0;

        this.dispatchEvent(new CustomEvent('close', { detail: { target: closeIcon } }));
    });

    container.addEventListener('transitionend', () => {
        this.remove();
    });
}