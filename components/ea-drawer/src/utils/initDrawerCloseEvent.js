

export function initDrawerCloseEvent(wrap, drawerWrap, maskWrap, headerCloseIcon) {
    const callback = () => {
        this.open = false;
        wrap.classList.remove('will-close');

        drawerWrap.removeEventListener('transitionend', callback);
    }

    const handleClose = () => {
        wrap.classList.add('will-close');

        drawerWrap.addEventListener('transitionend', callback);

        this.dispatchEvent(new CustomEvent('close', {
            bubbles: true,
            composed: true,
        }));
    }

    if (this.wrapperClosable && this.modal) {
        maskWrap.addEventListener('click', () => {
            handleClose();
        });
    }

    if (this.showClose) {
        headerCloseIcon.addEventListener('click', () => {
            handleClose();
        });
    }
}