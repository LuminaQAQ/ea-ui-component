import { getTdTemplate_border } from "./getTdTemplate_border.js";
import { getThTemplate_normal } from "./getThTemplate_normal.js";

export const contentTemplate = (item, colspan, hasBorder) => {
    let label = item.getAttribute("label");
    let content = item.innerHTML;

    if (!label) label = item.querySelector('[slot="label"]')?.innerHTML || "";

    return hasBorder ? getTdTemplate_border(label, content, colspan) : getThTemplate_normal(label, content, colspan);
}