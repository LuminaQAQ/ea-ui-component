export const dashboardItem = `
<svg viewBox="0 0 100 100">
    <mask id="myMask">
        <rect class="mask" width="100%" height="20%" fill="white" />
    </mask>
    <clipPath id="myClip">
        <rect class="mask" />
    </clipPath>
    <circle class="ea-progress__track" part="track" cx="50" cy="50" fill="none" clip-path="url(#myClip)" />
    <circle class="ea-progress__path" part="path" cx="50" cy="50" fill="none" clip-path="url(#myClip)" />
</svg>
<section class="ea-progress__percentage" part="percentage">
    <slot></slot>
</section>
`;
