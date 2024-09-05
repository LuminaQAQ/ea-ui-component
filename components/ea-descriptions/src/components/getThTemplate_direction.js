export const getThTemplate_direction = (label, hasBorder) => {
    return `
        <th class="ea-descriptions-item_label ea-descriptions-item_cell ${hasBorder ? 'is-border' : ''}" colspan="${1}">
            ${label}${hasBorder ? '' : ':'}
        </th>
    `
}