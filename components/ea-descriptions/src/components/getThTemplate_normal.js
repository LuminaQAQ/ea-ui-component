export const getThTemplate_normal = (label, content, colspan) => {
    return `
        <td class="ea-descriptions-item" colspan="${colspan}" part="table-td">
            <span class="ea-descriptions-item_label" part="table-td-label">${label}:</span>
            <span class="ea-descriptions-item_content" part="table-td-content">${content}</span>
        </td>
    `;
}