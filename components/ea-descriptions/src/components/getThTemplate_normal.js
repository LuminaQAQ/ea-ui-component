export const getThTemplate_normal = (label, content, colspan) => {
    return `
        <td class="ea-descriptions-item" colspan="${colspan}">
            <span class="ea-descriptions-item_label">${label}:</span>
            <span class="ea-descriptions-item_content">${content}</span>
        </td>
    `;
}