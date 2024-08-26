export function handleCustomEvent(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, {
        detail
    }));
};