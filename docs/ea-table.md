<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(async () => {
  await customElements.whenDefined("ea-table");

      const data = [
        {
          id: 1,
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 2,
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 3,
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 4,
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ];


      const moreData = [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ];

      const detailsData = [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
      ];
      
      const searchData = [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "John",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Morgan",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Jessy",
          address: "No. 189, Grove St, Los Angeles",
        },
      ];

      const summaryData = [
        {
          id: "12987122",
          name: "Tom",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "Tom",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "Tom",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "Tom",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "Tom",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ];


      window.handleSearch = keywords => {
        const res = searchData.filter(item => {
          return item.name.includes(keywords);
        });

        customHeaderTableExample.table.setData(res);
      };

      window.getRowData = table => {
        /** @type {{target: HTMLTableRowElement, value: any}} */
        const res = table.getCurrentRow();
        console.log(res.value);
      };

      // ------- 基础表格 -------
      // #region
      const basicTable = document.querySelector("#basicTable");
      basicTable.setData(data);
      // #endregion
      // ------- end -------

      // ------- 带斑马纹表格 -------
      // #region
      const stripeTable = document.querySelector("#stripeTable");
      stripeTable.setData(data);
      // #endregion
      // ------- end -------

      // ------- 带边框表格 -------
      // #region
      const borderTable = document.querySelector("#borderTable");
      borderTable.setData(data);
      // #endregion
      // ------- end -------

      // ------- 带状态表格 -------
      // #region
      const statusTable = document.querySelector("#statusTable");
      statusTable.setData(data);
      statusTable.setRowStylePart(
        /**
         * @param {object} param0
         * @param {User} param0.row
         * @param {number} param0.rowIndex
         */
        ({ row, rowIndex }) => {
          if (rowIndex === 1) {
            return "warning-row";
          } else if (rowIndex === 3) {
            return "success-row";
          }

          return "";
        }
      );
      // #endregion
      // ------- end -------

      // ------- 固定表头 -------
      // #region
      const fixedHeaderExample = {
        table: document.querySelector("#fixedHeaderTable"),
        init() {
          this.table.setData(moreData);
        },
      };
      fixedHeaderExample.init();
      // #endregion
      // ------- end -------

      // ------- 固定列 -------
      // #region
      const fixedColumnExample = {
        table: document.querySelector("#fixedColumnTable"),
        init() {
          this.table.setData(detailsData);
        },
      };
      fixedColumnExample.init();
      // #endregion
      // ------- end -------

      // ------- 固定列和表头 -------
      // #region
      const fixedColumnAndHeaderExample = {
        table: document.querySelector("#fixedColumnAndHeaderTable"),
        init() {
          this.table.setData(detailsData);
        },
      };
      fixedColumnAndHeaderExample.init();
      // #endregion
      // ------- end -------

      // ------- 多级表头 -------
      // #region
      const groupingHeadTable = document.querySelector("#groupingHeadTable");
      groupingHeadTable.setData(detailsData);
      // #endregion
      // ------- end -------

      // ------- 单选 -------
      // #region
      const radioTable = {
        table: document.querySelector("#radioTable"),

        selectBtn: document.querySelector("#radioTableSelectBtn"),
        clearBtn: document.querySelector("#radioTableClearBtn"),

        init() {
          this.table.setData(data);

          this.table.addEventListener("ea-current-change", e => {
            console.log(e.detail.row);
          });

          this.selectBtn.addEventListener("click", () => {
            this.table.setCurrentRow(data[1]);
          });

          this.clearBtn.addEventListener("click", () => {
            this.table.setCurrentRow();
          });
        },
      };
      radioTable.init();
      // #endregion
      // ------- end -------

      // ------- 多选 -------
      // #region
      const selectionTable = {
        table: document.querySelector("#selectionTable"),
        secondAndThirdBtn: document.querySelector(
          "#selectionTableToggleSelection1"
        ),
        thirdBtn: document.querySelector("#selectionTableToggleSelection2"),
        clearBtn: document.querySelector("#selectionTableClearSelection"),

        toggleSelection(rows, ignoreSelectable) {
          if (rows) {
            rows.forEach(row => {
              this.table.toggleRowSelection(row, undefined, ignoreSelectable);
            });
          } else {
            this.table.clearSelection();
          }
        },

        init() {
          this.table.selectable = row => ![1, 2].includes(row.id);
          this.table.setData(data);

          this.secondAndThirdBtn.addEventListener("click", () => {
            this.toggleSelection([data[1], data[2]]);
          });

          this.thirdBtn.addEventListener("click", () => {
            this.toggleSelection([data[1], data[2]], false);
          });

          this.clearBtn.addEventListener("click", () => {
            this.toggleSelection();
          });
        },
      };
      selectionTable.init();
      // #endregion
      // ------- end -------

      // ------- 自定义索引 -------
      // #region
      const increaseliyTable = {
        table: document.querySelector("#increaseliyTable"),

        init() {
          this.table.indexMethod = index => index * 2;

          this.table.setData(data);
        },
      };
      increaseliyTable.init();
      // #endregion
      // ------- end -------

      // ------- 排序 -------
      // #region
      const sortableTable = {
        table: document.querySelector("#sortableTable"),

        init() {
          this.table.setData(data);

          this.table.addEventListener("ea-sort-change", e => {
            console.log(e.detail);
          });
        },
      };
      sortableTable.init();
      // #endregion
      // ------- end -------

      // TODO: 筛选
      // ------- 筛选 -------
      // #region

      // #endregion
      // ------- end -------

      // ------- 自定义列模板 -------
      // #region
      const customColumnExample = {
        table: document.querySelector("#customColumnTable"),
        init() {
          this.table.setData(detailsData);
        },
      };
      customColumnExample.init();
      // #endregion
      // ------- end -------

      // ------- 自定义表头 -------
      // #region
      const customHeaderTableExample = {
        table: document.querySelector("#customHeaderTable"),

        init() {
          this.table.setData(searchData);
        },
      };
      customHeaderTableExample.init();
      // #endregion
      // ------- end -------
      
      // ------- 表尾合计行 -------
      // #region
      const summaryExample = {
        table: document.querySelector("#summaryTable"),
        summaryMethodsTable: document.querySelector("#summaryMethodsTable"),

        init() {
          this.summaryMethodsTable.summaryMethod = /**
           * @param {{columns: ColumnOption, data: any[]}} param
           */ param => {
            const { columns, data } = param;
            const sums = [];

            columns.forEach((column, index) => {
              if (index === 0) {
                sums[index] = "Total Cost";
                return;
              }
              const values = data.map(item => Number(item[column.prop]));
              if (!values.every(value => Number.isNaN(value))) {
                sums[index] = `$ ${values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!Number.isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0)}`;
              } else {
                sums[index] = "N/A";
              }
            });

            return sums;
          };

          this.table.setData(summaryData);
          this.summaryMethodsTable.setData(summaryData);
        },
      };
      summaryExample.init();
      // #endregion
      // ------- end -------
})
</script>

<style>
#statusTable::part(warning-row) {
  --ea-table-bg-color: rgb(253, 246, 236);
}

#statusTable::part(success-row) {
  --ea-table-bg-color: rgb(240, 249, 235);
}
</style>

# Table 表格

## 引入

> `js`

```js
<script type='module'>
  import "ea-ui-component/components/ea-table/index.ts";
</script>
```

## 自定义样式

移步到 [CSS Part](#table-css-part) 和 [CSS Custom Properties](#table-css-custom-properties)。

## 基础表格

基础的表格展示用法。

::: warning
注意: 在 `VUE` 环境下, `data` 的设置推荐在 Table 定义后触发时设置，否则可能会导致表格数据不渲染。**此后示例同此情况。**<br/>

同理, 若原生环境出现该问题, 也可使用该方法。

```js
await customElements.whenDefined("ea-table");
```

:::

<div class="demo">
  <ea-table id="basicTable">
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="basicTable">
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>
```

```js
const data = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const basicTable = document.querySelector("#basicTable");
basicTable.setData(data);
```

:::

## 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

<div class="demo">
  <ea-table id="stripeTable" stripe>
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="stripeTable" stripe>
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>
```

```js
const data = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const stripeTable = document.querySelector("#stripeTable");
stripeTable.setData(data);
```

:::

## 带边框表格

<div class="demo">
  <ea-table id="borderTable" border>
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="borderTable" border>
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>
```

```js
const data = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const borderTable = document.querySelector("#borderTable");
borderTable.setData(data);
```

:::

## 带状态表格

<div class="demo">
  <ea-table id="statusTable">
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="statusTable">
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>
```

```css
#statusTable::part(warning-row) {
  --ea-table-bg-color: rgb(253, 246, 236);
}

#statusTable::part(success-row) {
  --ea-table-bg-color: rgb(240, 249, 235);
}
```

```js
const data = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const statusTable = document.querySelector("#statusTable");
statusTable.setData(data);

statusTable.setRowStylePart(
  /**
   * @param {object} param0
   * @param {User} param0.row
   * @param {number} param0.rowIndex
   */
  ({ row, rowIndex }) => {
    if (rowIndex === 1) {
      return "warning-row";
    } else if (rowIndex === 3) {
      return "success-row";
    }

    return "";
  }
);
```

:::

## 固定表头

纵向内容过多时，可选择固定表头。

<div class="demo">
  <ea-table id="fixedHeaderTable" height="200px">
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="fixedHeaderTable" height="200px">
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>
```

```js
const moreData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const fixedHeaderExample = {
  table: document.querySelector("#fixedHeaderTable"),
  init() {
    this.table.setData(moreData);
  },
};
fixedHeaderExample.init();
```

:::

## 固定列

横向内容过多时，可选择固定列。

<div class="demo">
  <ea-table id="fixedColumnTable">
    <ea-table-column
      prop="date"
      label="Date"
      width="150px"
      fixed
    ></ea-table-column>
    <ea-table-column prop="name" label="Name" width="120px"></ea-table-column>
    <ea-table-column prop="state" label="State" width="120px"></ea-table-column>
    <ea-table-column prop="city" label="City" width="120px"></ea-table-column>
    <ea-table-column
      prop="address"
      label="Address"
      width="600px"
    ></ea-table-column>
    <ea-table-column prop="zip" label="Zip" width="120px"></ea-table-column>
    <ea-table-column prop="action" fixed="right" label="Operations">
      <ea-button
        link
        type="primary"
        size="small"
        style="margin-right: 0.5rem"
        onclick="getRowData(document.querySelector('#fixedColumnTable'))"
      >
        Detail
      </ea-button>
      <ea-button
        link
        type="primary"
        size="small"
        onclick="console.log('click')"
      >
        Edit
      </ea-button>
    </ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="fixedColumnTable">
    <ea-table-column
      prop="date"
      label="Date"
      width="150px"
      fixed
    ></ea-table-column>
    <ea-table-column prop="name" label="Name" width="120px"></ea-table-column>
    <ea-table-column prop="state" label="State" width="120px"></ea-table-column>
    <ea-table-column prop="city" label="City" width="120px"></ea-table-column>
    <ea-table-column
      prop="address"
      label="Address"
      width="600px"
    ></ea-table-column>
    <ea-table-column prop="zip" label="Zip" width="120px"></ea-table-column>
    <ea-table-column prop="action" fixed="right" label="Operations">
      <ea-button
        link
        type="primary"
        size="small"
        style="margin-right: 0.5rem"
        onclick="getRowData(document.querySelector('#fixedColumnTable'))"
      >
        Detail
      </ea-button>
      <ea-button
        link
        type="primary"
        size="small"
        onclick="console.log('click')"
      >
        Edit
      </ea-button>
    </ea-table-column>
  </ea-table>
</div>
```

```js
const detailsData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
];

const fixedColumnExample = {
  table: document.querySelector("#fixedColumnTable"),
  init() {
    this.table.setData(detailsData);
  },
};
fixedColumnExample.init();
```

:::

## 固定列和表头

当您有大量数据块放入表中，您可以同时固定表头和列。

固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。

<div class="demo">
  <ea-table id="fixedColumnAndHeaderTable" style="width: 100%" height="200px">
    <ea-table-column
      fixed
      prop="date"
      label="Date"
      width="150px"
    ></ea-table-column>
    <ea-table-column prop="name" label="Name" width="120px"></ea-table-column>
    <ea-table-column prop="state" label="State" width="120px"></ea-table-column>
    <ea-table-column prop="city" label="City" width="320px"></ea-table-column>
    <ea-table-column
      prop="address"
      label="Address"
      width="600px"
    ></ea-table-column>
    <ea-table-column prop="zip" label="Zip"></ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="fixedColumnAndHeaderTable" style="width: 100%" height="200px">
    <ea-table-column
      fixed
      prop="date"
      label="Date"
      width="150px"
    ></ea-table-column>
    <ea-table-column prop="name" label="Name" width="120px"></ea-table-column>
    <ea-table-column prop="state" label="State" width="120px"></ea-table-column>
    <ea-table-column prop="city" label="City" width="320px"></ea-table-column>
    <ea-table-column
      prop="address"
      label="Address"
      width="600px"
    ></ea-table-column>
    <ea-table-column prop="zip" label="Zip"></ea-table-column>
  </ea-table>
</div>
```

```js
const detailsData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
];

const fixedColumnAndHeaderExample = {
  table: document.querySelector("#fixedColumnAndHeaderTable"),
  init() {
    this.table.setData(detailsData);
  },
};
fixedColumnAndHeaderExample.init();
```

:::

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

只需要将 `ea-table-column` 放置于 `ea-table-column` 中，你可以实现组头。

<div class="demo">
  <ea-table id="groupingHeadTable" border style="width: 100%">
    <ea-table-column prop="date" label="Date" width="150px"></ea-table-column>
    <ea-table-column label="Delivery Info">
      <ea-table-column prop="name" label="Name" width="120px"></ea-table-column>
      <ea-table-column label="Address Info">
        <ea-table-column
          prop="state"
          label="State"
          width="120px"
        ></ea-table-column>
        <ea-table-column
          prop="city"
          label="City"
          width="120px"
        ></ea-table-column>
        <ea-table-column prop="address" label="Address"></ea-table-column>
        <ea-table-column prop="zip" label="Zip" width="120px"></ea-table-column>
      </ea-table-column>
    </ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="groupingHeadTable" border style="width: 100%">
    <ea-table-column prop="date" label="Date" width="150px"></ea-table-column>
    <ea-table-column label="Delivery Info">
      <ea-table-column prop="name" label="Name" width="120px"></ea-table-column>
      <ea-table-column label="Address Info">
        <ea-table-column
          prop="state"
          label="State"
          width="120px"
        ></ea-table-column>
        <ea-table-column
          prop="city"
          label="City"
          width="120px"
        ></ea-table-column>
        <ea-table-column prop="address" label="Address"></ea-table-column>
        <ea-table-column prop="zip" label="Zip" width="120px"></ea-table-column>
      </ea-table-column>
    </ea-table-column>
  </ea-table>
</div>
```

```js
const detailsData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
];

const groupingHeadTable = document.querySelector("#groupingHeadTable");
groupingHeadTable.setData(detailsData);
```

:::

## 单选

选择单行数据时使用色块表示。

<div class="demo">
  <ea-table id="radioTable" border highlight-current-row>
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
  <div style="margin-top: 20px">
    <ea-button id="radioTableSelectBtn">Select second row</ea-button>
    <ea-button id="radioTableClearBtn">Clear selection</ea-button>
  </div>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="radioTable" border highlight-current-row>
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
  <div style="margin-top: 20px">
    <ea-button id="radioTableSelectBtn">Select second row</ea-button>
    <ea-button id="radioTableClearBtn">Clear selection</ea-button>
  </div>
</div>
```

```js
const data = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const radioTable = {
  table: document.querySelector("#radioTable"),

  selectBtn: document.querySelector("#radioTableSelectBtn"),
  clearBtn: document.querySelector("#radioTableClearBtn"),

  init() {
    this.table.setData(data);

    this.table.addEventListener("ea-current-change", e => {
      console.log(e.detail.row);
    });

    this.selectBtn.addEventListener("click", () => {
      this.table.setCurrentRow(data[1]);
    });

    this.clearBtn.addEventListener("click", () => {
      this.table.setCurrentRow();
    });
  },
};
radioTable.init();
```

:::

## 多选

选择多行数据时使用 Checkbox。

<div class="demo">
  <ea-table id="selectionTable" border>
    <ea-table-column type="selection" width="55px"></ea-table-column>
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
  <div style="margin-top: 20px">
    <ea-button id="selectionTableToggleSelection1">
      Toggle selection status of second and third rows
    </ea-button>
    <ea-button id="selectionTableToggleSelection2">
      Toggle selection status based on selectable
    </ea-button>
    <ea-button id="selectionTableClearSelection"> Clear selection </ea-button>
  </div>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="selectionTable" border>
    <ea-table-column type="selection" width="55px"></ea-table-column>
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
  <div style="margin-top: 20px">
    <ea-button id="selectionTableToggleSelection1">
      Toggle selection status of second and third rows
    </ea-button>
    <ea-button id="selectionTableToggleSelection2">
      Toggle selection status based on selectable
    </ea-button>
    <ea-button id="selectionTableClearSelection"> Clear selection </ea-button>
  </div>
</div>
```

```js
const data = [
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const selectionTable = {
  table: document.querySelector("#selectionTable"),
  secondAndThirdBtn: document.querySelector("#selectionTableToggleSelection1"),
  thirdBtn: document.querySelector("#selectionTableToggleSelection2"),
  clearBtn: document.querySelector("#selectionTableClearSelection"),

  toggleSelection(rows, ignoreSelectable) {
    if (rows) {
      rows.forEach(row => {
        this.table.toggleRowSelection(row, undefined, ignoreSelectable);
      });
    } else {
      this.table.clearSelection();
    }
  },

  init() {
    this.table.selectable = row => ![1, 2].includes(row.id);
    this.table.setData(data);

    this.secondAndThirdBtn.addEventListener("click", () => {
      this.toggleSelection([data[1], data[2]]);
    });

    this.thirdBtn.addEventListener("click", () => {
      this.toggleSelection([data[1], data[2]], false);
    });

    this.clearBtn.addEventListener("click", () => {
      this.toggleSelection();
    });
  },
};
selectionTable.init();
```

:::

## 自定义索引

自定义 `type=index` 列的行号。

<div class="demo">
  <ea-table id="increaseliyTable" style="width: 100%">
    <ea-table-column type="index"></ea-table-column>
    <ea-table-column prop="date" label="Date" width="180px"></ea-table-column>
    <ea-table-column prop="name" label="Name" width="180px"></ea-table-column>
    <ea-table-column prop="address" label="Address"></ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="increaseliyTable" style="width: 100%">
    <ea-table-column type="index"></ea-table-column>
    <ea-table-column prop="date" label="Date" width="180px"></ea-table-column>
    <ea-table-column prop="name" label="Name" width="180px"></ea-table-column>
    <ea-table-column prop="address" label="Address"></ea-table-column>
  </ea-table>
</div>
```

```js
const data = [
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const increaseliyTable = {
  table: document.querySelector("#increaseliyTable"),

  init() {
    this.table.indexMethod = index => index * 2;

    this.table.setData(data);
  },
};
increaseliyTable.init();
```

:::

## 排序

对表格进行排序，可快速查找或对比数据。

<div class="demo">
  <ea-table id="sortableTable" border>
    <ea-table-column
      label="Date"
      prop="date"
      width="180px"
      sortable
    ></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="sortableTable" border>
    <ea-table-column
      label="Date"
      prop="date"
      width="180px"
      sortable
    ></ea-table-column>
    <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
    <ea-table-column label="Address" prop="address"></ea-table-column>
  </ea-table>
</div>
```

```js
const data = [
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const sortableTable = {
  table: document.querySelector("#sortableTable"),

  init() {
    this.table.setData(data);

    this.table.addEventListener("ea-sort-change", e => {
      console.log(e.detail);
    });
  },
};
sortableTable.init();
```

:::

## 自定义列模板

自定义某列的显示内容，可组合其他组件使用。通过设置 `data-scope="dataKey"` 来指定数据源字段。

<div class="demo">
  <ea-table id="customColumnTable">
    <ea-table-column prop="date" label="Date" width="180px">
      <ea-icon name="clock"></ea-icon>
      <span data-scope="date"></span>
    </ea-table-column>
    <ea-table-column prop="name" label="Info" width="180px">
      <ea-tag data-scope="city"></ea-tag>
      <span data-scope="name"></span>
    </ea-table-column>
    <ea-table-column prop="action" fixed="right" label="Operations">
      <ea-button
        size="small"
        style="margin-right: 0.5rem"
        data-action="detail"
      >
        Detail
      </ea-button>
      <ea-button
        type="danger"
        size="small"
        data-action="delete"
      >
        Delete
      </ea-button>
    </ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="customColumnTable">
    <ea-table-column prop="date" label="Date" width="180px">
      <ea-icon name="clock"></ea-icon>
      <span data-scope="date"></span>
    </ea-table-column>
    <ea-table-column prop="name" label="Info" width="180px">
      <ea-tag data-scope="city"></ea-tag>
      <span data-scope="name"></span>
    </ea-table-column>
    <ea-table-column prop="action" fixed="right" label="Operations">
      <ea-button size="small" style="margin-right: 0.5rem" data-action="detail">
        Detail
      </ea-button>
      <ea-button type="danger" size="small" data-action="delete">
        Delete
      </ea-button>
    </ea-table-column>
  </ea-table>
</div>
```

```js
const detailsData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
];

const customColumnExample = {
  table: document.querySelector("#customColumnTable"),
  init() {
    this.table.setData(detailsData);

    this.table.addEventListener("ea-template-cell-click", e => {
      const { target, rowData, rowIndex, originalEvent } = e.detail;

      const action = target.getAttribute("data-action");
      if (action === "detail") {
        console.log("查看详情:", rowData);
      } else if (action === "delete") {
        console.log("删除操作:", rowData);
      }
    });
  },
};
customColumnExample.init();
```

::: tip
通过 `ea-template-cell-click` 事件，可以方便地处理自定义模板中元素的点击事件，无需为每个元素单独绑定点击事件。
:::

## 自定义表头

表头支持自定义。

<div class="demo">
  <ea-table id="customHeaderTable">
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column prop="name" label="Name" width="180px"></ea-table-column>
    <ea-table-column prop="action" label="Operations" align="right">
      <ea-input
        id="customHeaderTableSearch"
        slot="header"
        size="small"
        placeholder="Type to search"
        oninput="handleSearch(this.value)"
      ></ea-input>
      <ea-button
        style="margin-right: 0.5rem"
        onclick="getRowData(document.querySelector('#customHeaderTable'))"
      >
        Detail
      </ea-button>
      <ea-button
        type="danger"
        onclick="getRowData(document.querySelector('#customHeaderTable'))"
      >
        Delete
      </ea-button>
    </ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="customHeaderTable">
    <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
    <ea-table-column prop="name" label="Name" width="180px"></ea-table-column>
    <ea-table-column prop="action" label="Operations" align="right">
      <ea-input
        id="customHeaderTableSearch"
        slot="header"
        size="small"
        placeholder="Type to search"
        oninput="handleSearch(this.value)"
      ></ea-input>
      <ea-button
        style="margin-right: 0.5rem"
        onclick="getRowData(document.querySelector('#customHeaderTable'))"
      >
        Detail
      </ea-button>
      <ea-button
        type="danger"
        onclick="getRowData(document.querySelector('#customHeaderTable'))"
      >
        Delete
      </ea-button>
    </ea-table-column>
  </ea-table>
</div>
```

```js
const searchData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
];

window.handleSearch = keywords => {
  const res = searchData.filter(item => {
    return item.name.toLowerCase().includes(keywords.toLowerCase());
  });

  customHeaderTableExample.table.setData(res);
};

window.getRowData = table => {
  /** @type {{target: HTMLTableRowElement, value: any}} */
  const res = table.getCurrentRow();
  console.log(res.value);
};

const customHeaderTableExample = {
  table: document.querySelector("#customHeaderTable"),

  init() {
    this.table.setData(searchData);
  },
};
customHeaderTableExample.init();
```

:::

## 表尾合计行

若表格展示的是各类数字，可以在表尾显示各列的合计。

<div class="demo">
  <ea-table id="summaryTable" border show-summary>
    <ea-table-column label="ID" prop="id" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name"></ea-table-column>
    <ea-table-column label="Amount 1" prop="amount1"></ea-table-column>
    <ea-table-column label="Amount 2" prop="amount2"></ea-table-column>
    <ea-table-column label="Amount 3" prop="amount3"></ea-table-column>
  </ea-table>
  <br />
  <ea-table id="summaryMethodsTable" border show-summary>
    <ea-table-column label="ID" prop="id" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name"></ea-table-column>
    <ea-table-column label="Amount 1" prop="amount1"></ea-table-column>
    <ea-table-column label="Amount 2" prop="amount2"></ea-table-column>
    <ea-table-column label="Amount 3" prop="amount3"></ea-table-column>
  </ea-table>
</div>

::: code-group

```html
<div class="demo">
  <ea-table id="summaryTable" border show-summary>
    <ea-table-column label="ID" prop="id" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name"></ea-table-column>
    <ea-table-column label="Amount 1" prop="amount1"></ea-table-column>
    <ea-table-column label="Amount 2" prop="amount2"></ea-table-column>
    <ea-table-column label="Amount 3" prop="amount3"></ea-table-column>
  </ea-table>
  <br />
  <ea-table id="summaryMethodsTable" border show-summary>
    <ea-table-column label="ID" prop="id" width="180px"></ea-table-column>
    <ea-table-column label="Name" prop="name"></ea-table-column>
    <ea-table-column label="Amount 1" prop="amount1"></ea-table-column>
    <ea-table-column label="Amount 2" prop="amount2"></ea-table-column>
    <ea-table-column label="Amount 3" prop="amount3"></ea-table-column>
  </ea-table>
</div>
```

```js
const summaryData = [
  {
    id: "12987122",
    name: "Tom",
    amount1: "234",
    amount2: "3.2",
    amount3: 10,
  },
  {
    id: "12987123",
    name: "Tom",
    amount1: "165",
    amount2: "4.43",
    amount3: 12,
  },
  {
    id: "12987124",
    name: "Tom",
    amount1: "324",
    amount2: "1.9",
    amount3: 9,
  },
  {
    id: "12987125",
    name: "Tom",
    amount1: "621",
    amount2: "2.2",
    amount3: 17,
  },
  {
    id: "12987126",
    name: "Tom",
    amount1: "539",
    amount2: "4.1",
    amount3: 15,
  },
];

const summaryExample = {
  table: document.querySelector("#summaryTable"),
  summaryMethodsTable: document.querySelector("#summaryMethodsTable"),

  init() {
    this.summaryMethodsTable.summaryMethod = /**
     * @param {{columns: ColumnOption, data: any[]}} param
     */ param => {
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Total Cost";
          return;
        }
        const values = data.map(item => Number(item[column.prop]));
        if (!values.every(value => Number.isNaN(value))) {
          sums[index] = `$ ${values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!Number.isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0)}`;
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    };

    this.table.setData(summaryData);
    this.summaryMethodsTable.setData(summaryData);
  },
};
summaryExample.init();
```

:::

## Table API

### Table Attributes

| Name | Description | Type | Options | Default |
| ---- | ----------- | ---- | ------- | ------- |
| stripe | 是否为斑马纹表格 | Boolean | - | false |
| border | 是否为带边框表格 | Boolean | - | false |
| height | 表格高度 | String | - | "" |
| max-height | 表格最大高度 | String | - | "" |
| highlight-current-row | 是否高亮当前行 | Boolean | - | false |
| show-summary | 是否显示合计行 | Boolean | - | false |

### Table Properties

> Properties 为纯 JavaScript 属性，不映射到 HTML attribute，需通过 JS 访问。

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| data | 表格数据（等同于 [setData](#table-methods)） | Array | [] |
| selectable | 行是否可选的判断函数，返回 `true` 表示可选 | Function \| null | null |
| indexMethod | 自定义索引方法，参数为当前索引，返回显示值 | Function \| null | null |
| summaryMethod | 自定义合计方法，参数为 `{ columns, data }`，返回合计值数组 | Function \| null | null |

### Table Methods

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| setData | 设置表格数据 | `(dataSource: any[]) => Promise<void>` |
| sort | 对指定列进行排序 | `(prop: string, order?: 'asc' \| 'desc') => void` |
| setRowStylePart | 设置行样式 part | `(handler: Function \| string) => void` |
| getCurrentRow | 获取当前行数据 | `() => { target: HTMLTableRowElement \| null, value: any }` |
| setCurrentRow | 设置当前行数据 | `(row?: any) => void` |
| toggleRowSelection | 切换行选中状态 | `(row: any, selected?: boolean, ignoreSelectable?: boolean) => void` |
| clearSelection | 清空选择 | `() => void` |

### Table Events

| Name | Description | Detail |
| ---- | ----------- | ------ |
| ea-row-click | 行点击时触发 | `{ target, column, row }` |
| ea-row-dblclick | 行双击时触发 | `{ target, column, row }` |
| ea-row-contextmenu | 行右键点击时触发 | `{ target, column, row }` |
| ea-cell-click | 单元格点击时触发 | `{ cell, column, row }` |
| ea-cell-dblclick | 单元格双击时触发 | `{ cell, column, row }` |
| ea-cell-contextmenu | 单元格右键点击时触发 | `{ cell, column, row }` |
| ea-cell-mouse-enter | 单元格鼠标移入时触发 | `{ cell, column, row }` |
| ea-cell-mouse-leave | 单元格鼠标移出时触发 | `{ cell, column, row }` |
| ea-header-click | 表头单元格点击时触发 | `{ cell, column }` |
| ea-header-contextmenu | 表头单元格右键点击时触发 | `{ cell, column }` |
| ea-sort-change | 排序变化时触发 | `{ prop, order }` |
| ea-current-change | 当前行变化时触发 | `{ target, column, row }` |
| ea-selection-change | 选中项变化时触发 | `{ newSelection }` |
| ea-select | 单行选中时触发 | `{ selection, row }` |
| ea-select-all | 全选时触发 | `{ selection }` |
| ea-template-cell-click | 模板单元格点击时触发 | `{ target, rowData, rowIndex, originalEvent }` |
| ea-table-data-rendered | 数据渲染完成时触发 | - |

### Table CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| Name | Description |
| ---- | ----------- |
| container | 表格容器 |
| colgroup | 列分组 |
| thead | 表头 |
| tbody | 表体 |
| tfoot | 表尾 |
| default-slot | 默认插槽 |
| thead-th | 表头单元格 |
| thead-tr | 表头行 |
| tfoot-tr | 表尾行 |
| tfoot-td | 表尾单元格 |
| tbody-tr | 表体行 |
| tbody-td | 表体单元格 |

### Table CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| --ea-table-cell-spacing | 单元格内边距 | var(--spacing-md) |
| --ea-table-cell-width | 单元格最小宽度 | 100% |
| --ea-table-height | 表格高度 | auto |
| --ea-table-max-height | 表格最大高度 | unset |
| --ea-table-sort-indicator-color | 排序指示器颜色 | var(--grey-500) |
| --ea-table-sort-indicator-active-color | 排序指示器激活颜色 | var(--blue-500) |
| --ea-table-sort-icon-size | 排序图标大小 | 14px |
| --ea-table-header-color | 表头文字颜色 | var(--grey-700) |
| --ea-table-header-font-size | 表头字体大小 | var(--font-size-lg) |
| --ea-table-body-color | 表体文字颜色 | var(--grey-900) |
| --ea-table-body-font-size | 表体字体大小 | var(--font-size-md) |
| --ea-table-bg-color | 表格背景颜色 | var(--color-white) |
| --ea-table-stripe-bg-color | 斑马纹背景颜色 | #fafafa |
| --ea-table-hover-bg-color | 悬停背景颜色 | var(--grey-100) |
| --ea-table-selected-bg-color | 选中行背景颜色 | var(--blue-100) |
| --ea-table-border-color | 边框颜色 | var(--grey-200) |
| --ea-table-fixed-x | 固定列偏移量 | 0 |
| --ea-table-fixed-left-cell-box-shadow | 左固定列阴影 | 0px 10px 10px 0 rgba(0,0,0,0.12) |
| --ea-table-fixed-right-cell-box-shadow | 右固定列阴影 | 0px 10px 10px 0 rgba(0,0,0,0.12) |
| --ea-table-transition | 过渡动画 | var(--transition-fast) |

### Table Slots

| Name | Description |
| ---- | ----------- |
| default | 表格列定义插槽，仅支持 `ea-table-column` |
| empty | 表格无数据时显示插槽 |

## TableColumn API

### TableColumn Attributes

| Name | Description | Type | Options | Default |
| ---- | ----------- | ---- | ------- | ------- |
| type | 列类型 | String | `selection \| index` | "" |
| align | 对齐方式 | String | `left \| center \| right` | left |
| label | 表头标题 | String | - | "" |
| prop | 数据字段名 | String | - | "" |
| colspan | 列跨度 | Number | - | undefined |
| width | 列宽 | String | - | "" |
| sortable | 是否可排序 | Boolean | - | false |
| fixed | 固定列 | String | `left \| right` | false |

### TableColumn Slots

| Name | Description |
| ---- | ----------- |
| default | 自定义列内容模板 |
| header | 自定义表头内容 |
