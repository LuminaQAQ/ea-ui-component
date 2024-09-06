export const getTdTemplate_border = (label, content, colspan) => {
    return `
        <th class="ea-descriptions-item_label ea-descriptions-item_cell is-border" colspan="${1}" part="table-th">${label}</th>
        <td class="ea-descriptions-item_content ea-descriptions-item_cell is-border" colspan="${colspan}" part="table-td">${content}</td>
    `
}