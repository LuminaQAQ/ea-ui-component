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

      window.getRowData = async table => {
        /** @type {{target: HTMLTableRowElement, value: any}} */
        const res = await table.getCurrentRow();
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

          this.table.addEventListener("current-change", e => {
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

      // ------- 排序 -------
      // #region
      const sortableTable = {
        table: document.querySelector("#sortableTable"),

        init() {
          this.table.setData(data);

          this.table.addEventListener("sort-change", e => {
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

      // ------- 7. 自增id序列 -------
      // #region
      // const increaseliyTable = document.querySelector("#increaseliyTable");
      // increaseliyTable.data = data;
      // #endregion
      // ------- end -------

      // ------- 9. 排序 -------
      // #region
      // const sortableTable = {
      //   table: document.querySelector("#sortableTable"),

      //   init() {
      //     this.table.data = moreData;

      //     this.table.addEventListener("sort-change", (e) => {
      //       console.log(e.detail);
      //     });
      //   },
      // };
      // sortableTable.init();
      // #endregion
      // ------- end -------

      // ------- 10. 自定义插槽 -------
      // #region
      // const customTable = {
      //   table: document.querySelector("#customTable"),
      //   searchInput: document.querySelector("#searchInput"),

      //   init() {
      //     this.table.data = moreData;

      //     // 搜索
      //     this.searchInput.addEventListener("change", () => {
      //       const res = moreData.filter((item) =>
      //         item.name.includes(this.searchInput.value)
      //       );
      //       this.table.data = res;
      //     });
      //   },
      // };
      // customTable.init();

      // // 编辑按钮
      // class MyEditButton extends HTMLElement {
      //   constructor() {
      //     super();

      //     const shadowroot = this.attachShadow({ mode: "open" });
      //     shadowroot.innerHTML = `
      //               <ea-button type="primary" size="mini">编辑</ea-button>
      //           `;
      //     const btn = shadowroot.querySelector("ea-button");
      //     btn.addEventListener("click", (e) => {
      //       setTimeout(() => {
      //         console.log(customTable.table.currentRowDetail);
      //       }, 0);
      //     });

      //     shadowroot.appendChild(btn);
      //   }
      // }
      // window.customElements.define("my-edit-button", MyEditButton);

      // // 删除按钮
      // class MyDeleteButton extends HTMLElement {
      //   constructor() {
      //     super();

      //     const shadowroot = this.attachShadow({ mode: "open" });
      //     shadowroot.innerHTML = `
      //               <ea-button type="danger" size="mini">删除</ea-button>
      //           `;
      //     const btn = shadowroot.querySelector("ea-button");
      //     btn.addEventListener("click", (e) => {
      //       setTimeout(() => {
      //         console.log(customTable.table.currentRowDetail);
      //       }, 0);
      //     });
      //   }
      // }
      // window.customElements.define("my-delete-button", MyDeleteButton);
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
  import "./node_modules/easy-component-ui/components/ea-table/index.js";
</script>
```

> `css`

::: tip
需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 `link` 标签引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#table-css-part)。

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
const basicTable = document.querySelector("#basicTable");

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
const stripeTable = document.querySelector("#stripeTable");

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
const borderTable = document.querySelector("#borderTable");

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
const statusTable = document.querySelector("#statusTable");

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

    this.table.addEventListener("current-change", e => {
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

    this.table.addEventListener("sort-change", e => {
      console.log(e.detail);
    });
  },
};
sortableTable.init();
```

:::

## [-] 自定义插槽

自定义某列或表头的显示内容，可组合其他组件使用。

:::danger

<!-- 注意: 若 `slot="body"` 中的元素要带有业务逻辑且开启了排序功能，则该元素必须以 `WebComponent` 的形式存在，且`事件`需要在组件中已经定义和绑定。否则会在排序后丢失元素事件。 -->

:::

::: code-group

```html

```

```js

```

:::

<!-- ## Table Attributes

| 参数                  | 说明       | 类型 | 可选值 | 默认值 |
| --------------------- | ---------- | ---- | ------ | ------ |
| data                  | 数据       | -    | -      | []     |
| height                | 高度       | -    | -      | -      |
| border                | 边框       | -    | -      | false  |
| stripe                | 斑马纹     | -    | -      | false  |
| highlight-current-row | 当前行高亮 | -    | -      | false  |
| currentRow            | 当前行     | -    | -      | -      |
| currentRowDetail      | 当前行详情 | -    | -      | -      |

## Table CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------ |
| container    | 外层容器                                                                                   |
| header-wrap  | 表格的`thead`容器(内部为一个 `table` 元素, 仅含 `colgroup` 和 `thead`)                     |
| header-table | 表头表格                                                                                   |
| body-wrap    | 表格的`tbody`容器(内部为一个`table`元素, 仅含`colgroup`, `tbody` 和 `slot [name="empty"]`) |
| row          | 表格行                                                                                     |
| th-cell      | 表头单元格                                                                                 |
| td-cell      | 表格单元格                                                                                 |

## TableColumn CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

## Table Events

| 事件名                | 说明                           | 参数 |
| --------------------- | ------------------------------ | ---- |
| sort-change           | 排序                           | -    |
| current-change        | 当前行变化                     | -    |
| click                 | 点击行                         | -    |
| body-selection-change | `type=selection`时, 选中行变化 | -    |

## Table Slot

| 名称   | 说明                               |
| ------ | ---------------------------------- |
| -      | 表头内容, 仅支持 `ea-table-column` |
| header | 表头额外内容                       |
| body   | 表格主体额外列                     |
| empty  | 空数据                             |

## Table-column Attributes

| 参数     | 说明                 | 类型   | 可选值                  | 默认值  |
| -------- | -------------------- | ------ | ----------------------- | ------- |
| prop     | 表头对应的数据的键值 | -      | -                       | -       |
| label    | `th` 的内容          | -      | -                       | -       |
| width    | 列宽                 | -      | -                       | 100     |
| sortable | 排序                 | -      | -                       | false   |
| type     | 类型                 | String | default/index/selection | default |
| rowspan  | 跨行数               | Number | -                       | 1       |
| colspan  | 跨列数               | Number | -                       | 1       |
| order    | 排序顺序             | String | asc/desc                | asc     |

## Table-column Slot

| 名称 | 说明      |
| ---- | --------- |
| -    | `th` 内容 | -->
