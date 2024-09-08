export const getPageItem = (page, hasBgc) => {
    const pageItem = document.createElement('span');
    pageItem.part = 'page-item';
    pageItem.className = 'ea-pagination_item';
    pageItem.innerText = page;
    pageItem.setAttribute('data-page', page);

    if (hasBgc) pageItem.classList.add('background');

    return pageItem;
};