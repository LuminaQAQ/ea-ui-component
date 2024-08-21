export function handleButtonStyle(children) {
    Array.from(children).map((child, index, arr) => {
        if (index === 0) {
            child.style.setProperty('--border-radius', '4px 0 0 4px');
        } else if (index === arr.length - 1) {
            child.style.setProperty('--border-radius', '0 4px 4px 0');
        } else {
            child.style.setProperty('--border-radius', '0');
        }

        if (index === 0 || index < arr.length - 1) {
            if (child.type !== "text" && child.type !== "normal") child.style.borderRight = "1px solid rgba(255, 255, 255, 0.3)";
        }
    })
}