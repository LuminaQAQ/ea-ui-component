export const defaultAvatar = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <clipPath id="a">
                <path d="M0 30h90v45H0z" />
            </clipPath>
        </defs>
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <circle cx="50" cy="35" r="15" fill="#fff" />
        <circle cx="50" cy="82.5" r="30" fill="#fff" clip-path="url(#a)" />
    </svg>
`;

export const errorAvatar = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <path fill="#fff" d="M20 25h60v50H20z" />
        <circle r="7" cx="35" cy="40" fill="#c0c4cc" />
        <path d="M35 55L25 70h-5 30z" fill="#c0c4cc" />
        <path d="M55 45L40 70h5 30z" fill="#c0c4cc" />
    </svg>
`;
