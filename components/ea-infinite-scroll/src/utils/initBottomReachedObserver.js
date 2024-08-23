
function getLastChild() {
    const items = this.querySelectorAll('ea-infinite-item');
    return items[items.length - 1];
}

export function initBottomReachedObserver(loadingSlot, delay) {
    if (this.disabled) return;

    let item = getLastChild.call(this);
    let timer = null;

    const observer = new IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        if (this.disabled) {
            observer.disconnect();
            return;
        }

        if (!isIntersecting || timer) return;

        if (this.loading) loadingSlot.style.display = 'block';

        observer.unobserve(item);

        timer = setTimeout(() => {
            this.dispatchEvent(new CustomEvent('bottomReached'));

            clearTimeout(timer);
            timer = null;

            item = getLastChild.call(this);
            observer.observe(item);
            loadingSlot.style.display = 'none';

        }, delay || 200);
    }, { root: this.parentNode, rootMargin: '10px', threshold: 0.1 });

    // 初始观察
    observer.observe(item);
}