import { createBEM } from "@core/EaBase";

const bem = createBEM("ea-progress");

export const circleItem: string = `
<svg viewBox="0 0 100 100">
    <circle class="${bem.e("track")}" part="track" cx="50" cy="50" fill="none" stroke-dasharray="302px" stroke-dashoffset="0" />
    <circle class="${bem.e("path")}" part="path" cx="50" cy="50" fill="none" stroke-dasharray="302px" stroke-dashoffset="0" />
</svg>
<section class="${bem.e("percentage-wrapper")}" part="percentage">
    <slot class="${bem.e("percentage")}"></slot>
</section>
`;
