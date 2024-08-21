import { createElement } from "../../../../utils/createElement.js";
export const createThead = (weekArr = ["一", "二", "三", "四", "五", "六", "日"]) => {
    const tr = createElement('tr');

    const ths = weekArr.map(item => {
        const th = createElement('th');

        th.innerText = item;

        return th;
    });

    tr.append(...ths);

    return tr;
}