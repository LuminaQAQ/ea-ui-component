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

export const createSlotElement = (name) => {
    const slot = document.createElement('slot');
    slot.name = name;

    return slot;
};