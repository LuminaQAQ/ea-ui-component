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

        this.style.position = 'relative';

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
        this.#bodyTable.classList.toggle('border', value);
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

    #handleResize(bodyWrap, bodyTable, headerWrap, headerColgroup, scrollbarWidth, isInit = false) {
        // 获取父元素的宽度
        const width = this.parentNode.clientWidth;

        // 计算所有列的宽度之和
        const colWidth = Array.from(headerColgroup.children).reduce((pre, cur) => {
            return pre + Number(cur.getAttribute('width'));
        }, 0);

        // 根据窗口和列宽度的比较，设置表头和表格内容部分的宽度
        if (width > 0 && colWidth <= width) {
            headerWrap.style.width = `${width - scrollbarWidth}px`;
            bodyWrap.style.width = `${width}px`;
            bodyTable.style.width = `${width - scrollbarWidth}px`;

            // 在初始化阶段，表格内容部分的宽度应与窗口宽度相同
            if (isInit) bodyWrap.style.width = `${width}px`;
        } else {
            // 当窗口宽度不足以显示所有列时，表格内容部分的宽度应与窗口宽度相同
            headerWrap.style.width = `${width}px`;
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

        let scrollbarWidth = null;

        const resizeFn = () => {
            this.#handleResize(this.#container, this.#bodyTable, this.#headerTable, this.#headerTableColgroup, scrollbarWidth);
        }

        window.addEventListener('resize', () => {
            resizeFn();
        });

        setTimeout(() => {
            scrollbarWidth = this.#container.getBoundingClientRect().width - this.#bodyTable.getBoundingClientRect().width;
            resizeFn();
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
                    const headerCol = createElement('col');
                    headerCol.setAttribute('width', subchild.getAttribute('width') || 100);
                    const bodyCol = createElement('col');
                    bodyCol.setAttribute('width', subchild.getAttribute('width') || 100);
                    this.#headerTableColgroup.appendChild(headerCol);
                    this.#bodyTableColgroup.appendChild(bodyCol);

                    this.#headerTableThead.appendChild(newTr);
                }
            });
        };

        createThElement(this.children);
    }

    renderTableBody(data) {
        this.#bodyTableTbody.innerHTML = '';

        const fixedColumnsArr = [];
        this.#tableColumns.forEach(column => {
            if (column.fixed) {
                fixedColumnsArr.push(column.prop);
            }
        });
        // console.log(fixedColumnsArr);

        data.forEach(item => {
            const row = createElement('tr', 'ea-table__row');

            // console.log(item[fixedColumnsArr[0]]);

            Object.entries(item).forEach(([key, value]) => {
                const cell = createElement('td', 'ea-table__cell td_cell');
                cell.innerHTML = value;
                row.appendChild(cell);

                // console.log(fixedColumnsArr.includes(key));
                // console.log(key);
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