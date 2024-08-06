// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-table-column/index.js"

const stylesheet = `

`;

export class EaTable extends Base {
    #container;

    #headerTable;
    #headerTableColgroup;
    #headerTableThead;

    #bodyTable;
    #bodyTableColgroup
    #bodyTableTbody

    #tableColumns;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-table_wrap">
                <div class="ea-table_header-wrap">
                    <table class="ea-table_header">
                        <colgroup></colgroup>
                        <thead></thead>
                    </table>
                </div>
                <div class="ea-table_body-wrap">
                    <table class="ea-table_main">
                        <colgroup></colgroup>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <slot></slot>
        `;

        this.build(shadowRoot, stylesheet);

        this.#container = this.shadowRoot.querySelector('.ea-table_wrap');

        this.#headerTable = this.shadowRoot.querySelector('.ea-table_header');
        this.#headerTableColgroup = this.#headerTable.querySelector('.ea-table_header colgroup');
        this.#headerTableThead = this.#headerTable.querySelector('.ea-table_header thead');

        this.#bodyTable = this.shadowRoot.querySelector('.ea-table_main');
        this.#bodyTableColgroup = this.#bodyTable.querySelector('.ea-table_body-wrap colgroup');
        this.#bodyTableTbody = this.#bodyTable.querySelector('.ea-table_body-wrap tbody');

        this.#tableColumns = this.querySelectorAll('ea-table-column');
    }

    // ------- border 边框 -------
    // #region
    get border() {
        return this.getAttrBoolean('border');
    }

    set border(value) {
        this.setAttribute('border', value);

        this.#container.classList.toggle('border', value);
        this.#headerTable.classList.toggle('border', value);
    }
    // #endregion
    // ------- end -------

    // ------- stripe 斑马线条纹 -------
    // #region
    get stripe() {
        return this.getAttrBoolean('stripe');
    }

    set stripe(value) {
        this.setAttribute('stripe', value);

        this.#container.classList.toggle('stripe', value);
    }
    // #endregion
    // ------- end -------

    // ------- height 表格高度 -------
    // #region
    get height() {
        return this.getAttrNumber('height');
    }

    set height(value) {
        this.setAttribute('height', value);

        if (value) {
            const bodyWrap = this.shadowRoot.querySelector('.ea-table_body-wrap');
            bodyWrap.style.height = `${value}px`;
        }
        else this.#container.style.height = '';
    }
    // #endregion
    // ------- end -------

    /**
     * 处理窗口调整大小时表格的宽度调整
     * @param {Element} bodyWrap - 表格内容部分的包裹元素
     * @param {Element} bodyTable - 表格内容部分的表格元素
     * @param {Element} headerWrap - 表头部分的包裹元素
     * @param {Element} headerColgroup - 表头部分的列组元素
     * @param {boolean} isInit - 是否是初始化阶段
     */
    #handleResize(bodyWrap, bodyTable, headerWrap, headerColgroup, isInit = false) {
        // 获取自定义元素的阴影根中的表格包裹元素
        const wrap = this.shadowRoot.querySelector('.ea-table_wrap');
        // 获取父元素的宽度
        const width = this.parentNode.offsetWidth;
        // 计算滚动条的宽度
        const scrollbarWidth = bodyWrap.getBoundingClientRect().width - bodyTable.getBoundingClientRect().width;

        // 计算所有列的宽度之和
        const colWidth = Array.from(headerColgroup.children).reduce((pre, cur) => {
            return pre + Number(cur.getAttribute('width'));
        }, 0);

        // 根据窗口和列宽度的比较，设置表头和表格内容部分的宽度
        if (width > 0 && colWidth <= width) {
            headerWrap.style.width = `${width - scrollbarWidth}px`;
            bodyWrap.style.width = `${width - scrollbarWidth}px`;
            bodyTable.style.width = `${width - scrollbarWidth}px`;

            // 在初始化阶段，表格内容部分的宽度应与窗口宽度相同
            if (isInit) bodyWrap.style.width = `${width}px`;
        } else {
            // 当窗口宽度不足以显示所有列时，表格内容部分的宽度应与窗口宽度相同
            bodyWrap.style.width = `${width}px`;
            bodyTable.style.width = `${width}px`;
        }
    }

    #handleHasGutterTable() {
        const headerWrap = this.shadowRoot.querySelector('.ea-table_header-wrap');
        const headerColgroup = this.shadowRoot.querySelector('.ea-table_header-wrap colgroup');
        const bodyColgroup = this.shadowRoot.querySelector('.ea-table_body-wrap colgroup');

        const bodyWrap = this.shadowRoot.querySelector('.ea-table_body-wrap');
        const bodyTable = this.shadowRoot.querySelector('.ea-table_body-wrap .ea-table_main');

        window.addEventListener('resize', () => {
            this.#handleResize(bodyWrap, bodyTable, headerWrap, headerColgroup);
        });

        setTimeout(() => {
            this.#handleResize(bodyWrap, bodyTable, headerWrap, headerColgroup, true);
        }, 0);

        // 监听表格内容部分的滚动事件，保持表头位置同步
        bodyWrap.addEventListener('scroll', (e) => {
            headerWrap.style.transform = `translateX(-${bodyWrap.scrollLeft}px)`;
        });
    }

    #renderTableHeader() {
        const columns = this.querySelectorAll('ea-table-column');
        this.#headerTableColgroup.innerHTML = '';
        this.#bodyTableColgroup.innerHTML = '';
        this.#headerTableThead.innerHTML = '';

        const createThElement = (child, i = 1) => {
            const newTr = createElement('tr');
            newTr.setAttribute('index', i);
            Array.from(child).forEach(subchild => {
                const th = createElement('th', 'ea-table__cell th-cell');

                th.setAttribute('colspan', subchild.colspan || 1);
                th.setAttribute('rowspan', subchild.rowspan || 1);

                th.appendChild(subchild);
                newTr.appendChild(th);

                if (subchild.children.length > 0) {
                    createThElement(subchild.children, ++i);
                } else {
                    this.#headerTableThead.appendChild(newTr);
                }
            });
        };

        createThElement(this.children);
    }

    renderTableBody(data) {
        this.#bodyTableTbody.innerHTML = '';

        data.forEach(item => {
            const row = createElement('tr', 'ea-table__row');

            Object.entries(item).forEach(([key, value]) => {
                const cell = createElement('td', 'ea-table__cell td_cell');
                cell.innerHTML = value;
                row.appendChild(cell);
            });

            this.#bodyTableTbody.appendChild(row);
        });
    }

    #init() {
        const that = this;

        this.border = this.border;

        this.stripe = this.stripe;

        this.height = this.height;

        this.#renderTableHeader();

        this.#handleHasGutterTable();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-table')) {
    customElements.define('ea-table', EaTable);
}