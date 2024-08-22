import { contentTemplate } from "../components/contentTemplate.js";
import { getTdTemplate_direction } from "../components/getTdTemplate_direction.js";
import { getThTemplate_direction } from "../components/getThTemplate_direction.js";

export function initDescriptionsItem(wrap, colNumber, items, hasBorder, direction) {
    const length = Number(items.length);

    for (let i = 0; i < length; i += 3) {
        let colspanCount = 0;
        const tbody = document.createElement('tbody');

        switch (direction) {
            case "horizontal": {
                const tr = document.createElement('tr');

                for (let j = i; j < colNumber + i; j++) {
                    const colspan = Number(items[j]?.getAttribute("span")) || 1;
                    let temp = colspanCount + colspan;

                    if (temp > colNumber || !items[j]) break;

                    tr.innerHTML += contentTemplate(items[j], colspan, hasBorder);
                }

                tbody.appendChild(tr);
                break;
            }
            case "vertical": {
                const th_tr = document.createElement('tr');
                const td_tr = document.createElement('tr');

                for (let j = i; j < colNumber + i; j++) {
                    const colspan = Number(items[j]?.getAttribute("span")) || 1;
                    let temp = colspanCount + colspan;

                    if (temp > colNumber || !items[j]) break;

                    th_tr.innerHTML += getThTemplate_direction(items[j].getAttribute("label"), hasBorder);
                    td_tr.innerHTML += getTdTemplate_direction(items[j].innerHTML, hasBorder, colspan);
                }

                tbody.appendChild(th_tr);
                tbody.appendChild(td_tr);
                break;
            }
        }

        wrap.appendChild(tbody);
    }

    items.forEach(el => {
        el.remove();
    });
}