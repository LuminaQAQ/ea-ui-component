export const getMoreItem = (arrow, hasBgc) => {
    const moreItem = document.createElement('span');
    moreItem.className = 'ea-pagination_more';
    moreItem.innerHTML = '···';
    moreItem.part = 'more-item';

    if (hasBgc) moreItem.classList.add('background');

    moreItem.addEventListener('mouseenter', function (e) {
        moreItem.classList.add('ea-pagination_more--active');
        moreItem.innerHTML = arrow === "prev" ? '&lt;&lt;' : '&gt;&gt;';
    })

    moreItem.addEventListener('mouseleave', function (e) {
        moreItem.classList.remove('ea-pagination_more--active');
        moreItem.innerHTML = '···';
    })

    return moreItem;
}