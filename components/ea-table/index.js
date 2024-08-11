// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-table-column/index.js"
import "../ea-checkbox/index.js"

const stylesheet = `
.ea-table_wrap,
.ea-table_fixed-column {
  position: relative;
  background-color: #fff;
  overflow: hidden;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header,
.ea-table_wrap .ea-table_body-wrap .ea-table_main,
.ea-table_wrap .ea-table_main,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main,
.ea-table_fixed-column .ea-table_main {
  position: relative;
  box-sizing: border-box;
  padding: 12px 0;
  width: 100%;
  min-width: 0;
  text-overflow: ellipsis;
  vertical-align: middle;
  text-align: left;
  border-collapse: collapse;
  table-layout: fixed;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header .ea-table__cell,
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__cell,
.ea-table_wrap .ea-table_main .ea-table__cell,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header .ea-table__cell,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__cell,
.ea-table_fixed-column .ea-table_main .ea-table__cell {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  padding: 8px;
  color: #606266;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header .ea-table__cell.th-cell,
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__cell.th-cell,
.ea-table_wrap .ea-table_main .ea-table__cell.th-cell,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header .ea-table__cell.th-cell,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__cell.th-cell,
.ea-table_fixed-column .ea-table_main .ea-table__cell.th-cell {
  color: #909399;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_main .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_main .ea-table__cell.is-gutter {
  width: 15px;
  padding: 0;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header.border .ea-table__cell,
.ea-table_wrap .ea-table_body-wrap .ea-table_main.border .ea-table__cell,
.ea-table_wrap .ea-table_main.border .ea-table__cell,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header.border .ea-table__cell,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main.border .ea-table__cell,
.ea-table_fixed-column .ea-table_main.border .ea-table__cell {
  border: 1px solid #ebeef5;
  padding: 8px;
  color: #606266;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header.border .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_body-wrap .ea-table_main.border .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_main.border .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header.border .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main.border .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_main.border .ea-table__cell.is-gutter {
  width: 15px;
  padding: 0;
  min-width: none;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header.stripe .ea-table__row:nth-child(2n),
.ea-table_wrap .ea-table_body-wrap .ea-table_main.stripe .ea-table__row:nth-child(2n),
.ea-table_wrap .ea-table_main.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column .ea-table_main.stripe .ea-table__row:nth-child(2n) {
  background-color: #fafafa;
}
.ea-table_wrap .ea-table_main,
.ea-table_fixed-column .ea-table_main {
  position: absolute;
  left: 0;
  top: 0;
}
.ea-table_wrap .ea-table_body-wrap,
.ea-table_fixed-column .ea-table_body-wrap {
  overflow-y: auto;
}
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__row:hover,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__row:hover {
  background-color: #f5f7fa;
}
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__row.is-current-row,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__row.is-current-row {
  background-color: #ecf5ff;
}
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

    #checkAllElement;

    #tableData;

    #tableDataIsInit;

    #bodySlot;

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
                        <slot name="empty" style="display: none;"></slot>
                    </table>
                </div>
            </div>
            <slot></slot>
            <slot name="header"></slot>
            <slot name="body"></slot>
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

    // ------- highlight-current-row 当前行高亮 -------
    // #region
    get highlightCurrentRow() {
        return this.getAttrBoolean('highlight-current-row') || false;
    }

    set highlightCurrentRow(value) {
        this.setAttribute('highlight-current-row', value);
    }
    // #endregion
    // ------- end -------

    // ------- currentRow 当前行 -------
    // #region
    get currentRow() {
        console.log();
        return this.getAttrNumber('current-row') || 0;
    }

    set currentRow(value) {
        this.setAttribute('current-row', value);
    }
    // #endregion
    // ------- end -------

    // ------- data 数据 -------
    // #region
    get data() {
        return this.#tableData || [];
    }

    set data(value) {
        const strData = JSON.stringify(value);
        let jsonData = JSON.parse(strData);

        this.#tableData = jsonData;

        this.renderTableBody(jsonData);
    }
    // #endregion
    // ------- end -------

    // ------- currentRowDetail 当前行详情 -------
    // #region
    get currentRowDetail() {
        const index = this.currentRow;
        const data = this.data[index];
        const target = this.#bodyTable.querySelectorAll('.ea-table__row')[index] || null;
        return { index, data, target };
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

    #handleSortableTh(th, subchild) {
        if (subchild.sortable && subchild.type !== 'selection') {
            const icon = createElement('ea-icon');
            icon.icon = "icon-angle-down";
            icon.style.float = 'right';
            th.appendChild(icon);

            th.addEventListener('click', () => {
                icon.color = "#5cb6ff";
                const order = subchild.order;
                if (order === "asc") {
                    subchild.order = "desc";
                    icon.icon = "icon-angle-up";
                } else {
                    subchild.order = "asc";
                    icon.icon = "icon-angle-down";
                }

                let data = this.data.sort((a, b) => {
                    const key = subchild.prop !== "null" ? subchild.prop : subchild.type;

                    return subchild.order === "asc" ? String(a[key]).localeCompare(b[key]) : String(b[key]).localeCompare(a[key]);
                })

                this.renderTableBody(data);

                this.dispatchEvent(new CustomEvent('sort-change', {
                    detail: {
                        prop: subchild.prop,
                        order: subchild.order
                    },
                    composed: true,
                    bubbles: true,
                }));
            });
        }
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
                if (subchild.nodeName !== 'EA-TABLE-COLUMN') return;

                const th = createElement('th', 'ea-table__cell th-cell');

                th.setAttribute('colspan', subchild.colspan || 1);
                th.setAttribute('rowspan', subchild.rowspan || 1);

                th.appendChild(subchild);
                newTr.appendChild(th);

                if (subchild.type === 'selection') {
                    this.#checkAllElement = subchild.querySelector('ea-checkbox');
                }

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

                    this.#handleSortableTh(th, subchild);
                }
            });
        };

        createThElement(this.children);
    }

    #handleHighlightCurrentRow(row, data) {
        row.addEventListener('click', () => {
            const rows = this.#bodyTableTbody.querySelectorAll('.ea-table__row');
            let isIndexType = false;
            let isSelectionType = false;
            rows.forEach((row, index) => {
                if (row.type === "index") isIndexType = true;
                if (row.type === "selection") isSelectionType = true;

                row.index = index;

                if (this.highlightCurrentRow) row.classList.remove('is-current-row');
            });
            if (this.highlightCurrentRow) row.classList.add('is-current-row');

            if (isSelectionType) delete data.selection;

            this.currentRow = row.index;

            this.dispatchEvent(new CustomEvent('current-change', {
                composed: true,
                bubbles: true,
                detail: {
                    index: row.index,
                    row,
                    data
                }
            }));
        });
    }

    #handleTypeTh(data, type) {
        const ths = this.#headerTable.querySelectorAll('ea-table-column');
        let colIndex = 0;
        let isIndexTh = false;
        ths.forEach((item, i) => {
            if (item.type === type) {
                colIndex = i;
                isIndexTh = true;
            }
        });

        if (isIndexTh) {
            return data.map((item, index) => {
                const obj = {};
                const arr = Object.keys(item);
                arr.splice(colIndex, 0, type);
                arr.forEach((key, i) => {
                    if (key === 'index') obj[key] = index + 1;
                    else if (key === 'selection') obj[key] = `<ea-checkbox></ea-checkbox>`;
                    else obj[key] = item[key];
                });

                return obj;
            });
        }

        return data;
    }

    #handleRenderBodySlot() {
        const trs = this.#bodyTableTbody.querySelectorAll('tr');
        const slot = this.shadowRoot.querySelector('slot[name="body"]');

        if (!slot.assignedNodes().length) {
            slot.remove();
        } else {
            trs.forEach(item => {
                const div = createElement('td', 'ea-table__cell');
                Array.from(slot.assignedNodes()).forEach(slotItem => {
                    const cloneNode = slotItem.cloneNode(true);
                    div.appendChild(cloneNode);

                    cloneNode.addEventListener('click', () => {
                        slotItem.dispatchEvent(new CustomEvent('click', {
                            bubbles: true,
                            composed: true,
                            detail: {
                                row: item
                            }
                        }));
                    });
                });
                item.appendChild(div);
            });
            slot.style.display = 'none';
        }

    }

    renderTableBody(data) {
        this.#bodyTableTbody.innerHTML = '';

        if (!this.#tableDataIsInit) {
            data = this.#handleTypeTh(data, 'index');
            data = this.#handleTypeTh(data, 'selection');

            const thSequence = Array.from(this.#headerTable.querySelectorAll('ea-table-column')).map((item, i) => {
                return item.type === "default" ? item.prop : item.type;
            });
            data = data.map(item => {
                const obj = {};
                thSequence.forEach(key => {
                    if (key !== null && key !== 'null' && typeof key !== 'undefined' && key !== "undefined")
                        obj[key] = item[key];
                });
                return obj;
            });

            this.#tableDataIsInit = true;
        }


        data.forEach((item, index) => {
            const row = createElement('tr', 'ea-table__row');

            Object.entries(item).forEach(([key, value]) => {
                const cell = createElement('td', 'ea-table__cell td_cell');
                cell.innerHTML = value;

                if (key === "selection") {
                    cell.querySelector('ea-checkbox').addEventListener('change', (e) => {

                        this.dispatchEvent(new CustomEvent('body-selection-change', {
                            composed: true,
                            bubbles: true,
                            detail: {
                                checked: e.detail.checked,
                                row: row,
                                data: item
                            }
                        }));
                    });
                }

                row.appendChild(cell);
            });

            this.#handleHighlightCurrentRow(row, item);

            this.#bodyTableTbody.appendChild(row);
        });
        this.#tableData = data;

        const emptySlot = this.shadowRoot.querySelector('slot[name="empty"]');
        if (data.length > 0) {
            emptySlot.style.display = 'none';
        } else {
            emptySlot.style.display = 'block';
        }


        this.#handleRenderBodySlot();
    }

    #initSelectionTypeTh() {
        const ths = this.shadowRoot.querySelectorAll('ea-table-column');
        if (!Array.from(ths).some(item => item.type === "selection")) return;

        this.addEventListener('header-selection-change', (e) => {
            const checkboxes = this.#bodyTable.querySelectorAll('ea-checkbox');
            checkboxes.forEach(item => {
                item.checked = e.detail.checked;
            });
        })

        this.addEventListener('body-selection-change', (e) => {
            const checkallBtn = this.#headerTableThead.querySelector('ea-table-column').shadowRoot.querySelector('ea-checkbox');
            const checkboxes = this.#bodyTable.querySelectorAll('ea-checkbox');

            let isAllSelectedArr = Array.from(checkboxes).map(item => {
                return item.checked;
            })


            if (isAllSelectedArr.every(item => item === true)) {
                checkallBtn.checked = true;
            } else if (isAllSelectedArr.every(item => item === false)) {
                checkallBtn.checked = false;
            } else {
                checkallBtn.indeterminate = true;
            }
        })
    }

    #initHeaderSlot() {
        const headerSlot = this.shadowRoot.querySelector('slot[name="header"]');
        if (headerSlot.assignedNodes().length > 0) {
            const tr = this.#headerTableThead.querySelector('tr');
            const th = createElement('th', 'ea-table__cell th-cell');
            let maxRowSpan = 1;
            Array.from(this.#headerTableThead.querySelectorAll('th')).forEach(item => {
                if (item.rowSpan > maxRowSpan) maxRowSpan = item.rowSpan;
            });
            th.rowSpan = maxRowSpan;
            th.appendChild(headerSlot);
            tr.appendChild(th);
        } else {
            headerSlot.remove();
        }
    }

    #init() {
        const that = this;

        this.border = this.border;

        this.stripe = this.stripe;

        this.height = this.height;

        this.highlightCurrentRow = this.highlightCurrentRow;

        this.#renderTableHeader();

        this.#handleHasGutterTable();

        this.#initSelectionTypeTh();

        this.#initHeaderSlot();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-table')) {
    customElements.define('ea-table', EaTable);
}