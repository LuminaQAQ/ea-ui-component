export const getTdTemplate_direction = (text, hasBorder, colspan) => {
    return `
        <td class="ea-descriptions-item_content ea-descriptions-item_cell ${hasBorder ? 'is-border' : ''}" colspan="${colspan}" part="table-td">
            ${text}
        </td>
    `
}