import { createElement } from "../../../../utils/createElement.js";
export const createThead = (weekArr = ["一", "二", "三", "四", "五", "六", "日"]) => {
    const tr = createElement('tr');
    tr.part = "table-head-row";

    const ths = weekArr.map(item => {
        const th = createElement('th');
        th.part = "table-head-item";

        th.innerText = item;

        return th;
    });

    tr.append(...ths);

    return tr;
}