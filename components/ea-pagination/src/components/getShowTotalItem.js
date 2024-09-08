export const getShowTotalItem = () => {
    const showTotalItem = document.createElement('span');
    showTotalItem.className = 'ea-pagination_show_total';
    showTotalItem.part = 'total-wrap';

    return showTotalItem;
}