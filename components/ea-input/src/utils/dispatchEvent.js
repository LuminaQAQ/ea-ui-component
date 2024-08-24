export function dispatchEvent(e, eventName) {
    this.dispatchEvent(
        new CustomEvent(eventName, {
            detail: {
                value: e.target.value
            }
        })
    );
}