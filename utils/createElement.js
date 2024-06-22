export const createElement = (tagName, className, children) => {
    const element = document.createElement(tagName || 'div');
    element.className = className || '';

    if (children) {
        if (Array.isArray(children)) {
            children.forEach(child => {
                element.appendChild(child);
            });
        } else {
            element.appendChild(children);
        }
    }

    return element;
};