export const defaultAvatar = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <clipPath id="a">
                <path d="M0 40h90v45H0z" />
            </clipPath>
        </defs>
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <circle cx="50" cy="35" r="20" fill="#fff" />
        <circle cx="50" cy="97" r="40" fill="#fff" clip-path="url(#a)" />
    </svg>
`;

export const errorAvatar = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <path fill="#fff" d="M15 20h70v60H15z" />
        <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
        <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
        <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
    </svg>
`;
