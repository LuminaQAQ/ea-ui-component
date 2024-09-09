<script setup>
import { onMounted } from 'vue'

const data = [
    { name: 'Lumina', age: 18, address: '中国' },
    { name: 'Alice', age: 18, address: '中国' },
    { name: 'Tom', age: 18, address: '中国' },
    { name: 'Bob', age: 18, address: '中国' },
];

const moreData = [
    { date: "2024-08-01", name: 'Lumina', age: 18, address: '中国' },
    { date: "2024-08-02", name: 'Alice', age: 18, address: '中国' },
    { date: "2024-08-03", name: 'Tom', age: 18, address: '中国' },
    { date: "2024-08-04", name: 'Bob', age: 18, address: '中国' },
    { date: "2024-08-05", name: 'Jerry', age: 18, address: '中国' },
    { date: "2024-08-06", name: 'Lucy', age: 18, address: '中国' },
    { date: "2024-08-07", name: 'Tom', age: 18, address: '中国' },
    { date: "2024-08-08", name: 'Bob', age: 18, address: '中国' },
    { date: "2024-08-09", name: 'Jerry', age: 18, address: '中国' },
    { date: "2024-08-10", name: 'Lucy', age: 18, address: '中国' },
    { date: "2024-08-11", name: 'Tom', age: 18, address: '中国' },
    { date: "2024-08-12", name: 'Bob', age: 18, address: '中国' },
    { date: "2024-08-13", name: 'Jerry', age: 18, address: '中国' },
    { date: "2024-08-14", name: 'Lucy', age: 18, address: '中国' },
]

onMounted(() => {
  import('./index.scss')
  
  import('../components/ea-icon/index.js')
  import('../components/ea-icon/index.css')
  import('../components/ea-button/index.js')
  import('../components/ea-button-group/index.js')
  
  import('../components/ea-input/index.js')
  import('../components/ea-empty/index.js')

  import('../components/ea-table/index.js')
    
  const data = [
      { name: 'Lumina', age: 18, address: '中国' },
      { name: 'Alice', age: 18, address: '中国' },
      { name: 'Tom', age: 18, address: '中国' },
      { name: 'Bob', age: 18, address: '中国' },
  ];

  const moreData = [
      { date: "2024-08-01", name: 'Lumina', age: 18, address: '中国' },
      { date: "2024-08-02", name: 'Alice', age: 18, address: '中国' },
      { date: "2024-08-03", name: 'Tom', age: 18, address: '中国' },
      { date: "2024-08-04", name: 'Bob', age: 18, address: '中国' },
      { date: "2024-08-05", name: 'Jerry', age: 18, address: '中国' },
      { date: "2024-08-06", name: 'Lucy', age: 18, address: '中国' },
      { date: "2024-08-07", name: 'Tom', age: 18, address: '中国' },
      { date: "2024-08-08", name: 'Bob', age: 18, address: '中国' },
      { date: "2024-08-09", name: 'Jerry', age: 18, address: '中国' },
      { date: "2024-08-10", name: 'Lucy', age: 18, address: '中国' },
      { date: "2024-08-11", name: 'Tom', age: 18, address: '中国' },
      { date: "2024-08-12", name: 'Bob', age: 18, address: '中国' },
      { date: "2024-08-13", name: 'Jerry', age: 18, address: '中国' },
      { date: "2024-08-14", name: 'Lucy', age: 18, address: '中国' },
  ]

  // ------- 1. 基础表格 -------
  // #region
  const basicTable = document.querySelector('#basicTable');
  basicTable.addEventListener('table-ready', (e) => {
    basicTable.data = data;
  });

  // #endregion
  // ------- end -------

  // ------- 2. 带斑马纹表格 -------
  // #region
  const stripeTable = document.querySelector('#stripeTable');
  stripeTable.addEventListener('table-ready', (e) => {
    stripeTable.data = data;
  });
  // #endregion
  // ------- end -------

  // ------- 3. 带边框表格 -------
  // #region
  const borderTable = document.querySelector('#borderTable');
  borderTable.addEventListener('table-ready', (e) => {
    borderTable.data = data;
  });
  // #endregion
  // ------- end -------

  // ------- 4. 固定表头 -------
  // #region
  const fixedHeaderTable = document.querySelector('#fixedHeaderTable');
  fixedHeaderTable.addEventListener('table-ready', (e) => {
    fixedHeaderTable.data = moreData;
  });
  // #endregion
  // ------- end -------

  // ------- 5. 多级表头 -------
  // #region
  const groupingHeadTable = document.querySelector('#groupingHeadTable');
  groupingHeadTable.addEventListener('table-ready', (e) => {
    groupingHeadTable.data = moreData;
  });
  // #endregion
  // ------- end -------

  // ------- 6. 单选 -------
  // #region
  const radioTable = {
      table: document.querySelector('#radioTable'),

      init() {
          this.table.addEventListener('table-ready', (e) => {
            this.table.data = moreData;
          });

          this.table.addEventListener('current-change', (e) => {
              console.log(e.detail);
          });
      }
  }
  radioTable.init();
  // #endregion
  // ------- end -------

  // ------- 7. 自增id序列 -------
  // #region
  const increaseliyTable = document.querySelector('#increaseliyTable');
  increaseliyTable.addEventListener('table-ready', (e) => {
    increaseliyTable.data = data;
  });
  // #endregion
  // ------- end -------

  // ------- 8. 多选 -------
  // #region
  const checkboxTable = document.querySelector('#checkboxTable');
  checkboxTable.addEventListener('table-ready', (e) => {
    checkboxTable.data = data;
  });
  checkboxTable.addEventListener('body-selection-change', (e) => {
      console.log(e.detail);
  });
  // #endregion
  // ------- end -------

  // ------- 9. 排序 -------
  // #region
  const sortableTable = {
      table: document.querySelector('#sortableTable'),

      init() {
          this.table.addEventListener('table-ready', (e) => {
            this.table.data = moreData;
          });

          this.table.addEventListener('sort-change', (e) => {
              console.log(e.detail);
          });
      }
  }
  sortableTable.init();
  // #endregion
  // ------- end -------

  // ------- 10. 自定义插槽 -------
  // #region

  const customTable = {
      table: document.querySelector('#customTable'),
      searchInput: document.querySelector('#searchInput'),

      init() {
          this.table.addEventListener('table-ready', (e) => {
            this.table.data = moreData;
          });
          
          // 搜索
          this.searchInput.addEventListener('change', () => {
              const res = moreData.filter(item => item.name.includes(this.searchInput.value));
              this.table.data = res;
          });
      }
  }
  customTable.init();

  // 编辑按钮
  class MyEditButton extends HTMLElement {
      constructor() {
          super();

          const shadowroot = this.attachShadow({ mode: 'open' });
          shadowroot.innerHTML = `
              <ea-button type="primary" size="mini">编辑</ea-button>
          `;
          const btn = shadowroot.querySelector('ea-button');
          btn.addEventListener('click', (e) => {
              setTimeout(() => {
                  console.log(customTable.table.currentRowDetail);
              }, 0);
          })

          shadowroot.appendChild(btn);
      }
  }
  if(!window.customElements.get('ea-my-edit-button')) window.customElements.define('ea-my-edit-button', MyEditButton);

  // 删除按钮
  class MyDeleteButton extends HTMLElement {
      constructor() {
          super();

          const shadowroot = this.attachShadow({ mode: 'open' });
          shadowroot.innerHTML = `
              <ea-button type="danger" size="mini">删除</ea-button>
          `;
          const btn = shadowroot.querySelector('ea-button');
          btn.addEventListener('click', (e) => {
              setTimeout(() => {
                  console.log(customTable.table.currentRowDetail);
              }, 0);
          })
      }
  }
  if(!window.customElements.get('ea-my-delete-button')) window.customElements.define('ea-my-delete-button', MyDeleteButton);
  // #endregion
  // ------- end -------
})
</script>

<style>
    .prepend,
    .append {
        background-color: #f5f7fa;
        padding: 0.5rem;
    }
</style>

# Table 表格

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-table/index.js";
</script>
```

## 基础表格

基础的表格展示用法。

::: warning
注意: 在 `VUE` 环境下, `data` 的设置推荐在 `table-ready` 事件触发时设置，否则可能会导致表格数据不渲染。**此后示例同此情况。**<br/>

同理, 若原生环境出现该问题, 也可使用该方法。
:::

<!-- -------- 1. 基础表格 --------  -->
<!-- #region  -->
<div>
    <ea-table id="basicTable">
        <ea-table-column prop="name" width="100">姓名</ea-table-column>
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
    </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<div>
  <ea-table id="basicTable">
    <ea-table-column prop="name" width="100">姓名</ea-table-column>
    <ea-table-column prop="age" width="100">年龄</ea-table-column>
    <ea-table-column prop="address">地址</ea-table-column>
  </ea-table>
</div>
```

---

`js`

```js
const basicTable = document.querySelector("#basicTable");
basicTable.addEventListener("table-ready", (e) => {
  basicTable.data = data;
});
```

:::

## 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

<!-- -------- 2. 带斑马纹表格 --------  -->
<!-- #region  -->
<div>
    <ea-table id="stripeTable" stripe>
        <ea-table-column prop="name" width="100">姓名</ea-table-column>
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
    </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<div>
  <ea-table id="stripeTable" stripe>
    <ea-table-column prop="name" width="100">姓名</ea-table-column>
    <ea-table-column prop="age" width="100">年龄</ea-table-column>
    <ea-table-column prop="address">地址</ea-table-column>
  </ea-table>
</div>
```

---

`js`

```js
const stripeTable = document.querySelector("#stripeTable");
stripeTable.addEventListener("table-ready", (e) => {
  stripeTable.data = data;
});
```

:::

## 带边框表格

<!-- -------- 3. 带边框表格 --------  -->
<!-- #region  -->
<div>
    <ea-table id="borderTable" border>
        <ea-table-column prop="name" width="100">姓名</ea-table-column>
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
    </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<div>
  <ea-table id="borderTable" border>
    <ea-table-column prop="name" width="100">姓名</ea-table-column>
    <ea-table-column prop="age" width="100">年龄</ea-table-column>
    <ea-table-column prop="address">地址</ea-table-column>
  </ea-table>
</div>
```

---

`js`

```js
const borderTable = document.querySelector("#borderTable");
borderTable.addEventListener("table-ready", (e) => {
  borderTable.data = data;
});
```

:::

## 固定表头

纵向内容过多时，可选择固定表头。

<!-- -------- 4. 固定表头 --------  -->
<!-- #region  -->
<div>
    <ea-table id="fixedHeaderTable" border height="250">
        <ea-table-column prop="date" width="100">日期</ea-table-column>
        <ea-table-column prop="name" width="100">姓名</ea-table-column>
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
    </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<div>
  <ea-table id="fixedHeaderTable" border height="250">
    <ea-table-column prop="date" width="100">日期</ea-table-column>
    <ea-table-column prop="name" width="100">姓名</ea-table-column>
    <ea-table-column prop="age" width="100">年龄</ea-table-column>
    <ea-table-column prop="address">地址</ea-table-column>
  </ea-table>
</div>
```

---

`js`

```js
const fixedHeaderTable = document.querySelector("#fixedHeaderTable");
fixedHeaderTable.addEventListener("table-ready", (e) => {
  fixedHeaderTable.data = moreData;
});
```

:::

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

<!-- -------- 5. 多级表头 --------  -->
<!-- #region  -->
<div>
    <ea-table id="groupingHeadTable" border height="250">
        <ea-table-column prop="date" width="100" rowspan="3">日期</ea-table-column>
        <ea-table-column label="详细信息" colspan="3">
            <ea-table-column prop="name" width="100" rowspan="2">姓名</ea-table-column>
            <ea-table-column label="个人信息" colspan="2">
                <ea-table-column prop="age" width="100">年龄</ea-table-column>
                <ea-table-column prop="address">地址</ea-table-column>
            </ea-table-column>
        </ea-table-column>
    </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<div>
  <ea-table id="groupingHeadTable" border height="250">
    <ea-table-column prop="date" width="100" rowspan="3">日期</ea-table-column>
    <ea-table-column label="详细信息" colspan="3">
      <ea-table-column prop="name" width="100" rowspan="2"
        >姓名</ea-table-column
      >
      <ea-table-column label="个人信息" colspan="2">
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
      </ea-table-column>
    </ea-table-column>
  </ea-table>
</div>
```

---

`js`

```js
const groupingHeadTable = document.querySelector("#groupingHeadTable");
groupingHeadTable.addEventListener("table-ready", (e) => {
  groupingHeadTable.data = moreData;
});
```

:::

## 单选

选择单行数据时使用色块表示。

<!-- -------- 6. 单选 --------  -->
<!-- #region  -->
<div>
    <ea-table id="radioTable" border height="250" highlight-current-row>
        <ea-table-column prop="date" width="100">日期</ea-table-column>
        <ea-table-column prop="name" width="100">姓名</ea-table-column>
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
    </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<div>
  <ea-table id="radioTable" border height="250" highlight-current-row>
    <ea-table-column prop="date" width="100">日期</ea-table-column>
    <ea-table-column prop="name" width="100">姓名</ea-table-column>
    <ea-table-column prop="age" width="100">年龄</ea-table-column>
    <ea-table-column prop="address">地址</ea-table-column>
  </ea-table>
</div>
```

---

`js`

```js
const radioTable = {
  table: document.querySelector("#radioTable"),

  init() {
    this.table.addEventListener("table-ready", (e) => {
      this.table.data = moreData;
    });

    this.table.addEventListener("current-change", (e) => {
      console.log(e.detail);
    });
  },
};
radioTable.init();
```

:::

## 自增 id 序列

设置 `type` 属性为 `index` 即可显示从 `1` 开始的索引号。。

<!-- -------- 7. 自增id序列 --------  -->
<!-- #region  -->
<div>
    <ea-table id="increaseliyTable" border height="250" highlight-current-row>
        <ea-table-column type="index" width="100">id</ea-table-column>
        <ea-table-column prop="name" width="100">姓名</ea-table-column>
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
    </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<ea-table id="increaseliyTable" border height="250" highlight-current-row>
  <ea-table-column type="index" width="100">id</ea-table-column>
  <ea-table-column prop="name" width="100">姓名</ea-table-column>
  <ea-table-column prop="age" width="100">年龄</ea-table-column>
  <ea-table-column prop="address">地址</ea-table-column>
</ea-table>
```

---

`js`

```js
const increaseliyTable = document.querySelector("#increaseliyTable");
increaseliyTable.addEventListener("table-ready", (e) => {
  increaseliyTable.data = data;
});
```

:::

## 多选

选择多行数据时使用 Checkbox。

<!-- -------- 8. 多选 --------  -->
<!-- #region  -->
<div>
    <ea-table id="checkboxTable" border height="250">
        <ea-table-column type="selection" width="100"></ea-table-column>
        <ea-table-column type="index" width="100">id</ea-table-column>
        <ea-table-column prop="name" width="100">姓名</ea-table-column>
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
    </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<ea-table id="checkboxTable" border height="250">
  <ea-table-column type="selection" width="100"></ea-table-column>
  <ea-table-column type="index" width="100">id</ea-table-column>
  <ea-table-column prop="name" width="100">姓名</ea-table-column>
  <ea-table-column prop="age" width="100">年龄</ea-table-column>
  <ea-table-column prop="address">地址</ea-table-column>
</ea-table>
```

---

`js`

```js
const checkboxTable = document.querySelector("#checkboxTable");
checkboxTable.addEventListener("table-ready", (e) => {
  checkboxTable.data = data;
});
checkboxTable.addEventListener("body-selection-change", (e) => {
  console.log(e.detail);
});
```

:::

## 排序

对表格进行排序，可快速查找或对比数据。

<!-- -------- 9. 排序 --------  -->
<!-- #region  -->
<div>
    <ea-table id="sortableTable" border height="250">
        <ea-table-column prop="date" width="100" rowspan="3" sortable>日期</ea-table-column>
        <ea-table-column label="详细信息" colspan="3">
            <ea-table-column prop="name" width="100" rowspan="2" sortable>姓名</ea-table-column>
            <ea-table-column label="个人信息" colspan="2">
                <ea-table-column prop="age" width="100">年龄</ea-table-column>
                <ea-table-column prop="address">地址</ea-table-column>
            </ea-table-column>
        </ea-table-column>
    </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<ea-table id="sortableTable" border height="250">
  <ea-table-column prop="date" width="100" rowspan="3" sortable
    >日期</ea-table-column
  >
  <ea-table-column label="详细信息" colspan="3">
    <ea-table-column prop="name" width="100" rowspan="2" sortable
      >姓名</ea-table-column
    >
    <ea-table-column label="个人信息" colspan="2">
      <ea-table-column prop="age" width="100">年龄</ea-table-column>
      <ea-table-column prop="address">地址</ea-table-column>
    </ea-table-column>
  </ea-table-column>
</ea-table>
```

---

`js`

```js
const sortableTable = {
  table: document.querySelector("#sortableTable"),

  init() {
    this.table.addEventListener("table-ready", (e) => {
      this.table.data = moreData;
    });

    this.table.addEventListener("sort-change", (e) => {
      console.log(e.detail);
    });
  },
};
sortableTable.init();
```

:::

## 自定义插槽

自定义某列或表头的显示内容，可组合其他组件使用。

:::danger
注意: 若 `slot="body"` 中的元素要带有业务逻辑且开启了排序功能，则该元素必须以 `WebComponent` 的形式存在，且`事件`需要在组件中已经定义和绑定。否则会在排序后丢失元素事件。
:::

<!-- -------- 9. 排序 --------  -->
<!-- #region  -->
<div class="demo">
  <ea-table id="customTable" border height="250">
    <ea-table-column prop="date" width="100" rowspan="3" sortable
      >日期</ea-table-column
    >
    <ea-table-column label="详细信息" colspan="3">
      <ea-table-column prop="name" width="100" rowspan="2" sortable
        >姓名</ea-table-column
      >
      <ea-table-column label="个人信息" colspan="2">
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
      </ea-table-column>
    </ea-table-column>
    <div slot="header">
      <ea-input id="searchInput" placeholder="搜索名字"></ea-input>
    </div>
    <div slot="body">
      <div style="display: flex;justify-content: space-evenly;flex-wrap: wrap;">
        <ea-my-edit-button></ea-my-edit-button>
        <ea-my-delete-button></ea-my-delete-button>
      </div>
    </div>
    <div slot="empty">
      <ea-empty description="描述文字" image-size="100"></ea-empty>
    </div>
  </ea-table>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码

`html`

```html
<div class="demo">
  <ea-table id="customTable" border height="250">
    <ea-table-column prop="date" width="100" rowspan="3" sortable
      >日期</ea-table-column
    >
    <ea-table-column label="详细信息" colspan="3">
      <ea-table-column prop="name" width="100" rowspan="2" sortable
        >姓名</ea-table-column
      >
      <ea-table-column label="个人信息" colspan="2">
        <ea-table-column prop="age" width="100">年龄</ea-table-column>
        <ea-table-column prop="address">地址</ea-table-column>
      </ea-table-column>
    </ea-table-column>
    <div slot="header">
      <ea-input id="searchInput" placeholder="搜索名字"></ea-input>
    </div>
    <div slot="body">
      <div style="display: flex; justify-content: space-evenly;">
        <my-edit-button></my-edit-button>
        <my-delete-button></my-delete-button>
      </div>
    </div>
    <div slot="empty">
      <ea-empty description="描述文字" image-size="100"></ea-empty>
    </div>
  </ea-table>
</div>
```

---

`js`

> [!NOTE]
> 示例中的自定义组件，其中的逻辑使用了异步操作，因为其本身调用的是 `Table` 组件上的事件，所以需要等待 `Table` 组件自身的事件触发完成。

```js
const customTable = {
  table: document.querySelector("#customTable"),
  searchInput: document.querySelector("#searchInput"),

  init() {
    this.table.addEventListener("table-ready", (e) => {
      console.log(this.table.data, e);
      console.log(this.table.data);
      this.table.data = moreData;
    });

    // 搜索
    this.searchInput.addEventListener("change", () => {
      const res = moreData.filter((item) =>
        item.name.includes(this.searchInput.value)
      );
      this.table.data = res;
    });
  },
};
customTable.init();

// 编辑按钮
class MyEditButton extends HTMLElement {
  constructor() {
    super();

    const shadowroot = this.attachShadow({ mode: "open" });
    shadowroot.innerHTML = `
              <ea-button type="primary" size="mini">编辑</ea-button>
          `;
    const btn = shadowroot.querySelector("ea-button");
    btn.addEventListener("click", (e) => {
      setTimeout(() => {
        console.log(customTable.table.currentRowDetail);
      }, 0);
    });

    shadowroot.appendChild(btn);
  }
}
if (!window.customElements.get("ea-my-edit-button"))
  window.customElements.define("ea-my-edit-button", MyEditButton);

// 删除按钮
class MyDeleteButton extends HTMLElement {
  constructor() {
    super();

    const shadowroot = this.attachShadow({ mode: "open" });
    shadowroot.innerHTML = `
              <ea-button type="danger" size="mini">删除</ea-button>
          `;
    const btn = shadowroot.querySelector("ea-button");
    btn.addEventListener("click", (e) => {
      setTimeout(() => {
        console.log(customTable.table.currentRowDetail);
      }, 0);
    });
  }
}
if (!window.customElements.get("ea-my-delete-button"))
  window.customElements.define("ea-my-delete-button", MyDeleteButton);
```

:::

## Table Attributes

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
| -    | `th` 内容 |
