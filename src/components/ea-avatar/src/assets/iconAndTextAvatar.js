const background = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill="#c0c4cc" d="M0 0h100v100H0z" />
</svg>
`;
export const iconAvatar = (icon) => {
    return `
        ${background}
        <ea-icon class="fa ea-avatar--text" icon="${icon}"></ea-icon>
    `;
}

export const textAvatar = (text) => {
    return `
        ${background}
        <span class="ea-avatar--text">${text}</span>
    `;
}