// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-pagination_wrap {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}
.ea-pagination_wrap .ea-pagination_item_wrap {
  display: flex;
  align-items: center;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_item,
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_more {
  cursor: pointer;
  box-sizing: border-box;
  margin: 0 5px;
  padding: 0 4px;
  min-width: 30px;
  height: 28px;
  line-height: 28px;
  font-size: 13px;
  text-align: center;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_item.ea-pagination_item--active {
  color: #409eff;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_more {
  cursor: pointer;
  user-select: none;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_more.ea-pagination_more--active {
  color: #409eff;
}
.ea-pagination_wrap .ea-pagination_arrow {
  user-select: none;
  cursor: pointer;
  padding: 0 10px;
}
.ea-pagination_wrap .ea-pagination_arrow.disabled {
  cursor: default;
  pointer-events: none;
  color: #c0c4cc;
}
.ea-pagination_wrap .ea-pagination_arrow:first-child {
  margin-right: 0.25rem;
}
.ea-pagination_wrap .ea-pagination_arrow:last-child {
  margin-left: 0.25rem;
}
.ea-pagination_wrap .ea-pagination_item.background,
.ea-pagination_wrap .ea-pagination_more.background,
.ea-pagination_wrap .ea-pagination_arrow.background {
  background-color: #f4f4f5;
  border-radius: 3px;
}
.ea-pagination_wrap .ea-pagination_item.background:hover,
.ea-pagination_wrap .ea-pagination_more.background:hover,
.ea-pagination_wrap .ea-pagination_arrow.background:hover {
  color: #409eff;
}
.ea-pagination_wrap .ea-pagination_item.background.active,
.ea-pagination_wrap .ea-pagination_more.background.active,
.ea-pagination_wrap .ea-pagination_arrow.background.active {
  background-color: #409eff;
  color: #f4f4f5;
}
.ea-pagination_wrap .ea-pagination_show_total {
  margin-right: 0.5rem;
  font-size: 13px;
}
`;


const getPaginationWrap = () => {
    const paginationWrap = document.createElement('div');
    paginationWrap.className = 'ea-pagination_item_wrap';

    return paginationWrap;
}

const getPageItem = (page, hasBgc) => {
    const pageItem = document.createElement('span');
    pageItem.className = 'ea-pagination_item';
    pageItem.innerText = page;
    pageItem.setAttribute('data-page', page);

    if (hasBgc) pageItem.classList.add('background');

    return pageItem;
};

const getArrowItem = (arrow, hasBgc) => {
    const arrowItem = document.createElement('span');
    arrowItem.className = 'ea-pagination_arrow';
    arrowItem.innerHTML = arrow === "prev" ? '&lt;' : '&gt;';

    if (hasBgc) arrowItem.classList.add('background');

    return arrowItem;
}

const getMoreItem = (arrow, hasBgc) => {
    const moreItem = document.createElement('span');
    moreItem.className = 'ea-pagination_more';
    moreItem.innerHTML = '···';

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

const getShowTotalItem = () => {
    const showTotalItem = document.createElement('span');
    showTotalItem.className = 'ea-pagination_show_total';

    return showTotalItem;
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

        const prevArrow = getArrowItem('prev', this.background);
        const pageItemWrap = getPaginationWrap();
        const nextArrow = getArrowItem('next', this.background);

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

    // ------- background 背景颜色 -------
    // #region
    get background() {
        return this.getAttrBoolean('background');
    }

    set background(value) {
        this.setAttribute('background', value);
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
            const pageItem = getPageItem(i, this.background);
            this.#paginationWrap.appendChild(pageItem);

            // 设置当前页码选中后的样式
            if (i === this.currentPage) {
                pageItem.classList.add('ea-pagination_item--active');
                if (this.background) pageItem.classList.add('active');
            }

            // 添加点击事件
            that.handlePaginationClick(pageItem, i);
        }

        // 添加 更多(左) + 第一页
        if (this.total > this.pageCount && this.currentPage >= this.pageCount && this.paginationCount !== this.pageCount) {
            const more = getMoreItem('prev', this.background);
            that.handleMoreItemClick(more, 'prev');

            const firstPage = getPageItem(1, this.background);
            this.handlePaginationClick(firstPage, 1);

            this.#paginationWrap.insertBefore(more, this.#paginationWrap.firstChild);
            this.#paginationWrap.insertBefore(firstPage, this.#paginationWrap.firstChild);
        }

        // 添加 更多(右) + 最后一页
        if (this.total > this.pageCount && this.currentPage < this.paginationCount - interval && this.paginationCount !== this.pageCount) {
            const more = getMoreItem('next', this.background);
            that.handleMoreItemClick(more, 'next');

            const lastPage = getPageItem(this.paginationCount, this.background);
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

    // 处理显示总数
    initTotalShow() {
        if (!this.layout.includes('total')) return;

        const totalItem = getShowTotalItem();
        totalItem.innerHTML = `共 ${this.total} 条`;

        this.#container.insertBefore(totalItem, this.#container.firstChild);
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
        this.initTotalShow();
    }

    connectedCallback() {
        this.init();
    }
}