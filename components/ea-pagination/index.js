import Base from '../Base.js';

import { stylesheet } from './src/style/stylesheet.js';

import { getMoreItem } from './src/components/getMoreItem.js';
import { getPageItem } from './src/components/getPageItem.js';
import { getShowTotalItem } from './src/components/getShowTotalItem.js';

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

        shadowRoot.innerHTML = `
            <div class="ea-pagination_wrap" part="container">
                <span class="ea-pagination_arrow prev ${this.background ? 'background' : ''}" part="arrow">&lt;</span>
                <div class="ea-pagination_item_wrap" part="item-wrap"></div>
                <span class="ea-pagination_arrow next ${this.background ? 'background' : ''}" part="arrow">&gt;</span>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-pagination_wrap');
        this.#prevArrow = shadowRoot.querySelector('.prev');
        this.#paginationWrap = shadowRoot.querySelector('.ea-pagination_item_wrap');
        this.#nextArrow = shadowRoot.querySelector('.next');

        this.build(shadowRoot, stylesheet);
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
        if (!value) return;

        this.setAttribute('background', value);
    }
    // #endregion
    // ------- end -------

    #handleDispatchEvent(event, options) {
        this.dispatchEvent(new CustomEvent(event, options));
    }

    // 初始化箭头元素
    #initArrowItem() {
        this.#handleArrowStatus();

        if (this.layout.includes('prev')) {
            this.#prevArrow.addEventListener('click', () => {
                if (this.currentPage <= 1) return;

                this.currentPage--;
                this.#handlePaginationChange();

                this.#handleDispatchEvent("change", { detail: { currentPage: this.currentPage } });
            })
        } else {
            this.#prevArrow.style.display = 'none';
        }

        if (this.layout.includes('next')) {
            this.#nextArrow.addEventListener('click', () => {
                if (this.currentPage >= this.paginationCount) return;

                this.currentPage++;
                this.#handlePaginationChange();

                this.#handleDispatchEvent("change", { detail: { currentPage: this.currentPage } });
            })
        } else {
            this.#nextArrow.style.display = 'none';
        }
    }

    // 处理箭头状态
    #handleArrowStatus() {
        if (!this.layout.includes('prev') && !this.layout.includes('next')) return;

        if (this.currentPage === 1 && this.layout.includes('prev')) this.#prevArrow.classList.add('disabled');
        else if (this.currentPage >= this.paginationCount && this.layout.includes('next')) this.#nextArrow.classList.add('disabled');
        else {
            this.#prevArrow.classList.remove('disabled');
            this.#nextArrow.classList.remove('disabled');
        }
    }

    // 处理分页点击事件
    #handlePaginationClick(pageItem, index) {
        pageItem.addEventListener('click', (e) => {
            this.currentPage = index;
            this.#handlePaginationChange();

            this.#handleDispatchEvent('change', {
                detail: {
                    currentPage: this.currentPage
                }
            });
        })
    }

    // 处理更多按钮点击事件
    #handleMoreItemClick(moreItem, arrow) {
        moreItem.addEventListener('click', (e) => {

            // 跳转到指定页码
            this.currentPage += arrow === "prev" ? -5 : 5;

            /**
             * 边界处理: 
             * 页码数量小于1, 跳转到第一页
             * 页码数量大于总页数, 跳转到最后一页
             */
            if (this.currentPage < 1) this.currentPage = 1;
            else if (this.currentPage > this.paginationCount) this.currentPage = this.paginationCount;

            this.#handlePaginationChange();

            this.#handleDispatchEvent('change', {
                detail: {
                    currentPage: this.currentPage
                }
            });
        })
    }

    // 处理分页的页码
    #handlePaginationItemChange() {
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
            this.#handlePaginationClick(pageItem, i);
        }

        // 添加 更多(左) + 第一页
        if (this.total > this.pageCount && this.currentPage >= this.pageCount && this.paginationCount !== this.pageCount) {
            const more = getMoreItem('prev', this.background);
            this.#handleMoreItemClick(more, 'prev');

            const firstPage = getPageItem(1, this.background);
            this.#handlePaginationClick(firstPage, 1);

            this.#paginationWrap.insertBefore(more, this.#paginationWrap.firstChild);
            this.#paginationWrap.insertBefore(firstPage, this.#paginationWrap.firstChild);
        }

        // 添加 更多(右) + 最后一页
        if (this.total > this.pageCount && this.currentPage < this.paginationCount - interval && this.paginationCount !== this.pageCount) {
            const more = getMoreItem('next', this.background);
            this.#handleMoreItemClick(more, 'next');

            const lastPage = getPageItem(this.paginationCount, this.background);
            this.#handlePaginationClick(lastPage, this.paginationCount);

            this.#paginationWrap.appendChild(more);
            this.#paginationWrap.appendChild(lastPage);
        }
    }

    // 处理分页变化
    #handlePaginationChange() {
        this.#handleArrowStatus();
        this.#handlePaginationItemChange();
    }

    // 处理显示总数
    #initTotalShow() {
        if (!this.layout.includes('total')) return;

        const totalItem = getShowTotalItem();
        totalItem.innerHTML = `共 ${this.total} 条`;

        this.#container.insertBefore(totalItem, this.#container.firstChild);
    }

    connectedCallback() {
        // 设置sizes
        this.sizes = this.sizes;

        // 设置current-page
        this.currentPage = this.currentPage;

        // 设置total
        this.total = this.total;

        this.#initArrowItem();
        this.#handlePaginationItemChange();
        this.#initTotalShow();
    }
}

if (!customElements.get('ea-pagination')) {
    customElements.define('ea-pagination', EaPagination);
}