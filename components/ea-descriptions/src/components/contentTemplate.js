import{getTdTemplate_border}from"./getTdTemplate_border.js";import{getThTemplate_normal}from"./getThTemplate_normal.js";export const contentTemplate=(e,t,r)=>{let l=e.getAttribute("label"),o=e.innerHTML;return l||(l=e.querySelector('[slot="label"]')?.innerHTML||""),r?getTdTemplate_border(l,o,t):getThTemplate_normal(l,o,t)};