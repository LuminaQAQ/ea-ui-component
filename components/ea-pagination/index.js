// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;


const getPaginationWrap = () => {
    const paginationWrap = document.createElement('div');
    paginationWrap.className = 'ea-pagination_item_wrap';

    return paginationWrap;
}

const getPageItem = (page) => {
    const pageItem = document.createElement('span');
    pageItem.className = 'ea-pagination_item';
    pageItem.innerText = page;
    pageItem.setAttribute('data-page', page);

    return pageItem;
};

const getArrowItem = (arrow) => {
    const arrowItem = document.createElement('span');
    arrowItem.className = 'ea-pagination_arrow';
    arrowItem.innerHTML = arrow === "prev" ? '&lt;' : '&gt;';

    return arrowItem;
}

const getMoreItem = (arrow) => {
    const moreItem = document.createElement('span');
    moreItem.className = 'ea-pagination_more';
    moreItem.innerHTML = '···';

    // moreItem.addEventListener('click', () => {
    //     const page = this.getAttrNumber('page');
    //     const total = this.getAttrNumber('total');
    //     const pageSize = this.getAttrNumber('page-size');

    //     const currentPage = page + 1;
    //     const totalPage = Math.ceil(total / pageSize);

    //     if (currentPage < totalPage) {
    //         this.setAttribute('page', currentPage);
    //     }
    // })

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

export class EaPagination extends Base {
    #container;

    // 页码元素的容器
    #paginationWrap;

    // 箭头
    #prevArrow;
    #nextArrow;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-pagination_wrap';

        this.#container = wrap;

        const prevArrow = getArrowItem('prev');
        const pageItemWrap = getPaginationWrap();
        const nextArrow = getArrowItem('next');

        this.#container.appendChild(prevArrow);
        this.#container.appendChild(pageItemWrap);
        this.#container.appendChild(nextArrow);

        this.#prevArrow = prevArrow;
        this.#paginationWrap = pageItemWrap;
        this.#nextArrow = nextArrow;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- layout 布局(前一页, 页码, 后一页) -------
    // #region
    get layout() {
        const arr = this.getAttribute('layout').split(',').map(item => item.trim());

        return arr || ['prev', 'pager', 'next'];
    }

    set layout(value) {
        this.setAttribute('layout', value);
    }
    // #endregion
    // ------- end -------

    // ------- sizes 分页中每页多少记录 -------
    // #region
    get sizes() {
        return this.getAttrNumber('sizes') || 10;
    }

    set sizes(value) {
        this.setAttribute('sizes', value);
    }
    // #endregion
    // ------- end -------

    // ------- current-page 当前页码 -------
    // #region
    get currentPage() {
        return this.getAttrNumber('current-page') || 1;
    }

    set currentPage(value) {
        this.setAttribute('current-page', value);
    }
    // #endregion
    // ------- end -------

    // ------- page-count 总显示的页码数量 -------
    // #region
    get pageCount() {
        return this.getAttrNumber('page-count') || 6;
    }

    set pageCount(value) {
        this.setAttribute('page-count', value);
    }
    // #endregion
    // ------- end -------

    // ------- total 总记录数 -------
    // #region

    get total() {
        return this.getAttrNumber('total');
    }

    set total(value) {
        this.setAttribute('total', value);
    }
    // #endregion
    // ------- end -------

    // ------- paginationCount 分页总数 -------
    // #region
    get paginationCount() {
        return Math.ceil(this.total / this.sizes);
    }
    // #endregion
    // ------- end -------

    handleDispatchEvent(event, options) {
        this.dispatchEvent(new CustomEvent(event, options));
    }

    // 初始化箭头元素
    initArrowItem() {
        const that = this;

        this.handleArrowStatus();

        if (this.layout.includes('prev')) {
            this.#prevArrow.addEventListener('click', () => {
                if (that.currentPage <= 1) return;

                that.currentPage--;
                that.handlePaginationChange();

                that.handleDispatchEvent("change", { detail: { currentPage: that.currentPage } });
            })
        } else {
            this.#prevArrow.style.display = 'none';
        }

        if (this.layout.includes('next')) {
            this.#nextArrow.addEventListener('click', () => {
                if (that.currentPage >= that.paginationCount) return;

                that.currentPage++;
                that.handlePaginationChange();

                that.handleDispatchEvent("change", { detail: { currentPage: that.currentPage } });
            })
        } else {
            this.#nextArrow.style.display = 'none';
        }
    }

    // 处理箭头状态
    handleArrowStatus() {
        if (!this.layout.includes('prev') && !this.layout.includes('next')) return;

        if (this.currentPage === 1 && this.layout.includes('prev')) this.#prevArrow.classList.add('disabled');
        else if (this.currentPage >= this.paginationCount && this.layout.includes('next')) this.#nextArrow.classList.add('disabled');
        else {
            this.#prevArrow.classList.remove('disabled');
            this.#nextArrow.classList.remove('disabled');
        }
    }

    // 处理分页点击事件
    handlePaginationClick(pageItem, index) {
        const that = this;

        pageItem.addEventListener('click', function (e) {
            that.currentPage = index;
            that.handlePaginationChange();

            that.handleDispatchEvent('change', {
                detail: {
                    currentPage: that.currentPage
                }
            });
        })
    }

    // 处理更多按钮点击事件
    handleMoreItemClick(moreItem, arrow) {
        const that = this;

        moreItem.addEventListener('click', function (e) {

            // 跳转到指定页码
            that.currentPage += arrow === "prev" ? -5 : 5;

            /**
             * 边界处理: 
             * 页码数量小于1, 跳转到第一页
             * 页码数量大于总页数, 跳转到最后一页
             */
            if (that.currentPage < 1) that.currentPage = 1;
            else if (that.currentPage > that.paginationCount) that.currentPage = that.paginationCount;

            that.handlePaginationChange();

            that.handleDispatchEvent('change', {
                detail: {
                    currentPage: that.currentPage
                }
            });
        })
    }

    // 处理分页的页码
    handlePaginationItemChange() {
        const that = this;

        if (!this.layout.includes('pager')) return;

        this.#paginationWrap.innerHTML = '';

        const interval = Math.floor(this.pageCount / 2);
        let start = this.currentPage - interval;
        let end = this.currentPage + interval;

        // 边界处理
        if (start <= 1) {
            start = 1;
            end = this.pageCount < this.paginationCount ? this.pageCount : this.paginationCount;
        } else if (end >= this.paginationCount) {
            start = this.paginationCount - this.pageCount + 1;
            end = this.paginationCount;
        } else {
            end--;
        }

        // 添加页码
        for (let i = start; i <= end; i++) {
            const pageItem = getPageItem(i);
            this.#paginationWrap.appendChild(pageItem);

            // 设置当前页码
            if (i === this.currentPage) {
                pageItem.classList.add('ea-pagination_item--active');
            }

            // 添加点击事件
            that.handlePaginationClick(pageItem, i);
        }

        // 添加 更多(左) + 第一页
        if (this.total > this.pageCount && this.currentPage >= this.pageCount && this.paginationCount !== this.pageCount) {
            const more = getMoreItem('prev');
            that.handleMoreItemClick(more, 'prev');

            const firstPage = getPageItem(1);
            this.handlePaginationClick(firstPage, 1);

            this.#paginationWrap.insertBefore(more, this.#paginationWrap.firstChild);
            this.#paginationWrap.insertBefore(firstPage, this.#paginationWrap.firstChild);
        }

        // 添加 更多(右) + 最后一页
        if (this.total > this.pageCount && this.currentPage < this.paginationCount - interval && this.paginationCount !== this.pageCount) {
            const more = getMoreItem('next');
            that.handleMoreItemClick(more, 'next');

            const lastPage = getPageItem(this.paginationCount);
            this.handlePaginationClick(lastPage, this.paginationCount);

            this.#paginationWrap.appendChild(more);
            this.#paginationWrap.appendChild(lastPage);
        }
    }

    // 处理分页变化
    handlePaginationChange() {
        this.handleArrowStatus();
        this.handlePaginationItemChange();
    }

    init() {
        const that = this;

        // 设置sizes
        this.sizes = this.sizes;

        // 设置current-page
        this.currentPage = this.currentPage;

        // 设置total
        this.total = this.total;

        this.initArrowItem();
        this.handlePaginationItemChange();
    }

    connectedCallback() {
        this.init();
    }
}