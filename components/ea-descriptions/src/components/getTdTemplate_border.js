export const getTdTemplate_border = (label, content, colspan) => {
    return `
        <th class="ea-descriptions-item_label ea-descriptions-item_cell is-border" colspan="${1}">${label}</th>
        <td class="ea-descriptions-item_content ea-descriptions-item_cell is-border" colspan="${colspan}">${content}</td>
    `
}