import { createBEM } from "@core/EaBase";

const bem = createBEM("ea-progress");

export const dashboardItem: string = `
<svg viewBox="0 0 100 100">
    <mask id="myMask">
        <rect class="mask" width="100%" height="20%" fill="white" />
    </mask>
    <clipPath id="myClip">
        <rect class="mask" />
    </clipPath>
    <circle class="${bem.e("track")}" part="track" cx="50" cy="50" fill="none" clip-path="url(#myClip)" />
    <circle class="${bem.e("path")}" part="path" cx="50" cy="50" fill="none" clip-path="url(#myClip)" />
</svg>
<section class="${bem.e("percentage-wrapper")}" part="percentage">
    <slot class="${bem.e("percentage")}"></slot>
</section>
`;
