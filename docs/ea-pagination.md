<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(async () => {
  await customElements.whenDefined('ea-pagination')

const basicExample = {
  noMoreEl: document.querySelector("#basicNoMorePagination"),
  moreEl: document.querySelector("#basicMorePagination"),

  layout: ["prev", "pager", "next"],

  init() {
    this.noMoreEl.layout = this.layout;
    this.moreEl.layout = this.layout;
  },
};
basicExample.init();

const maxPagerCountExample = {
  el: document.querySelector("#maxPagerCountPagination"),

  init() {
    this.el.layout = ["prev", "pager", "next"];
    this.el.pagerCount = 11;
  },
};
maxPagerCountExample.init();

const backgroundExample = {
  el: document.querySelector("#backgroundPagination"),

  init() {
    this.el.layout = ["prev", "pager", "next"];
  },
};
backgroundExample.init();

const smallExample = {
  els: [
    document.querySelector("#smallPagination1"),
    document.querySelector("#smallPagination2"),
  ],

  init() {
    this.els.forEach(el => {
      el.layout = ["prev", "pager", "next"];
    });
  },
};
smallExample.init();

const singlePageExample = {
  el: document.querySelector("#singlePagePagination"),
  btn: document.querySelector("#singlePageSwitch"),

  init() {
    this.el.layout = ["prev", "pager", "next"];

    this.btn.addEventListener("change", e => {
      this.el.hideOnSinglePage = e.detail.value;
    });
  },
};
singlePageExample.init();

const additionalFunctionsExample = {
  sizeBtn: document.querySelector("#additionalFunctionsSize"),
  backgroundBtn: document.querySelector("#additionalFunctionsBackground"),
  disabledBtn: document.querySelector("#additionalFunctionsDisabled"),

  els: [
    document.querySelector("#additionalFunctionsPagination1"),
    document.querySelector("#additionalFunctionsPagination2"),
    document.querySelector("#additionalFunctionsPagination3"),
    document.querySelector("#additionalFunctionsPagination4"),
  ],

  init() {
    const layout = ["prev", "pager", "next", "jumper", "->", "total"];
    const sizes = [100, 200, 300, 400];

    this.els[1].layout = ["total", "sizes", "prev", "pager", "next"];
    this.els[1].pageSizes = sizes;
    this.els[3].layout = ["sizes", "prev", "pager", "next", "jumper"];
    this.els[3].pageSizes = sizes;

    this.sizeBtn.addEventListener("change", e => {
      const { value } = e.detail;

      this.els.forEach(el => {
        el.size = value;
      });
    });

    this.backgroundBtn.addEventListener("change", e => {
      const { value } = e.detail;

      this.els.forEach(el => {
        el.background = value;
      });
    });

    this.disabledBtn.addEventListener("change", e => {
      const { value } = e.detail;

      this.els.forEach(el => {
        el.disabled = value;
      });
    });
  },
};

additionalFunctionsExample.init();

const eventExample = {
  el: document.querySelector("#eventPagination"),

  init() {
    this.el.layout = ["prev", "pager", "next"];

    this.el.addEventListener("ea-current-change", (e) => {
      console.log("ea-current-change", e.detail);
    });

    this.el.addEventListener("ea-prev-click", (e) => {
      console.log("ea-prev-click", e.detail);
    });

    this.el.addEventListener("ea-next-click", (e) => {
      console.log("ea-next-click", e.detail);
    });
  },
};
eventExample.init();
})
</script>

# Pagination 分页

当数据量过多时，使用分页分解数据。

::: tip
若需自定义 `layout`，请在等待 `ea-pagination` 组件定义完成之后再进行 js 操作。（特别在 Vue 环境中）

```js
await customElements.whenDefined("ea-pagination");
```

:::

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-pagination.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-pagination";
```

:::

## 自定义样式

移步到 [CSS Part](#pagination-css-part) 或 [CSS Custom Properties](#pagination-css-自定义属性)。

## 基础用法

需要设置 `total` 属性来设置数据总数。可以设置 `layout` 属性来控制显示的内容。分页元素包括：`prev`（跳转到上一页的按钮）、`next`（跳转到下一页的按钮）、`pager`（页码列表）、`jumper`（跳转输入框）、`total`（总条目数）、`sizes`（用于设置每页条数的选择器）以及 `->`（该符号之后的所有元素将被靠右对齐）。

<div class="demo">
  <p>When you have few pages</p>
  <ea-pagination id="basicNoMorePagination" total="50"></ea-pagination>
  <p>When you have more than 7 pages</p>
  <ea-pagination id="basicMorePagination" total="1000"></ea-pagination>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <p>When you have few pages</p>
  <ea-pagination id="basicNoMorePagination" total="50"></ea-pagination>
  <p>When you have more than 7 pages</p>
  <ea-pagination id="basicMorePagination" total="1000"></ea-pagination>
</div>
```

```js
const basicExample = {
  noMoreEl: document.querySelector("#basicNoMorePagination"),
  moreEl: document.querySelector("#basicMorePagination"),

  layout: ["prev", "pager", "next"],

  init() {
    this.noMoreEl.layout = this.layout;
    this.moreEl.layout = this.layout;
  },
};
basicExample.init();
```

:::

::::

## 设置最大页码按钮数

默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。通过设置 `pager-count` 属性来设置最大页码按钮数。

<div class="demo">
  <ea-pagination
    id="maxPagerCountPagination"
    page-size="20"
    pager-count="11"
    total="1000"
  ></ea-pagination>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-pagination
    id="maxPagerCountPagination"
    page-size="20"
    pager-count="11"
    total="1000"
  ></ea-pagination>
</div>
```

```js
const maxPagerCountExample = {
  el: document.querySelector("#maxPagerCountPagination"),

  init() {
    this.el.layout = ["prev", "pager", "next"];
    this.el.pagerCount = 11;
  },
};
maxPagerCountExample.init();
```

:::

::::

## 带有背景色的分页

通过设置 `background` 属性来设置背景色。

<div class="demo">
  <ea-pagination
    id="backgroundPagination"
    background
    total="1000"
  ></ea-pagination>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-pagination
    id="backgroundPagination"
    background
    total="1000"
  ></ea-pagination>
</div>
```

```js
const backgroundExample = {
  el: document.querySelector("#backgroundPagination"),

  init() {
    this.el.layout = ["prev", "pager", "next"];
  },
};
backgroundExample.init();
```

:::

::::

## 小型分页

在空间有限的情况下，可以使用简单的小型分页。

通过 `size` 更改大小，支持 `large`、`default`、`small` 三种尺寸。

<div class="demo">
  <ea-pagination
    id="smallPagination1"
    size="small"
    total="1000"
  ></ea-pagination>
  <ea-pagination
    id="smallPagination2"
    background
    size="small"
    total="1000"
  ></ea-pagination>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-pagination
    id="smallPagination1"
    size="small"
    total="1000"
  ></ea-pagination>
  <ea-pagination
    id="smallPagination2"
    background
    size="small"
    total="1000"
  ></ea-pagination>
</div>
```

```js
const smallExample = {
  els: [
    document.querySelector("#smallPagination1"),
    document.querySelector("#smallPagination2"),
  ],

  init() {
    this.els.forEach(el => {
      el.layout = ["prev", "pager", "next"];
    });
  },
};
smallExample.init();
```

:::

::::

## 当只有一页时隐藏分页

当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。

<div class="demo">
  <ea-switch id="singlePageSwitch"></ea-switch>
  <ea-pagination id="singlePagePagination" total="5"></ea-pagination>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-switch id="singlePageSwitch"></ea-switch>
  <ea-pagination id="singlePagePagination" total="5"></ea-pagination>
</div>
```

```js
const singlePageExample = {
  el: document.querySelector("#singlePagePagination"),
  btn: document.querySelector("#singlePageSwitch"),

  init() {
    this.el.layout = ["prev", "pager", "next"];

    this.btn.addEventListener("change", e => {
      this.el.hideOnSinglePage = e.detail.value;
    });
  },
};
singlePageExample.init();
```

:::

::::

## 附加功能

根据场景，可以组合使用 `total`、`sizes`、`jumper` 等功能模块。`layout` 属性控制各模块的显示顺序和种类。

<div class="demo col left">
  <ea-radio-group id="additionalFunctionsSize" name="size" value="default">
    <ea-radio value="large">large</ea-radio>
    <ea-radio value="default">default</ea-radio>
    <ea-radio value="small">small</ea-radio>
  </ea-radio-group>
  <div>
    background: <ea-switch id="additionalFunctionsBackground"></ea-switch>
  </div>
  <div>disabled: <ea-switch id="additionalFunctionsDisabled"></ea-switch></div>

  <p class="demonstration">Total item count</p>
  <ea-pagination
    id="additionalFunctionsPagination1"
    total="1000"
    page-size="100"
  ></ea-pagination>

  <p class="demonstration">Change page size</p>
  <ea-pagination
    id="additionalFunctionsPagination2"
    page-sizes="[100, 200, 300, 400]"
    total="1000"
  ></ea-pagination>

  <p class="demonstration">Jump to</p>
  <ea-pagination
    id="additionalFunctionsPagination3"
    total="1000"
  ></ea-pagination>

  <p class="demonstration">All combined</p>
  <ea-pagination
    id="additionalFunctionsPagination4"
    page-sizes="[100, 200, 300, 400]"
    total="400"
  ></ea-pagination>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-radio-group id="additionalFunctionsSize" name="size" value="default">
    <ea-radio value="large">large</ea-radio>
    <ea-radio value="default">default</ea-radio>
    <ea-radio value="small">small</ea-radio>
  </ea-radio-group>
  <div>
    background: <ea-switch id="additionalFunctionsBackground"></ea-switch>
  </div>
  <div>disabled: <ea-switch id="additionalFunctionsDisabled"></ea-switch></div>

  <p class="demonstration">Total item count</p>
  <ea-pagination
    id="additionalFunctionsPagination1"
    total="1000"
    page-size="100"
  ></ea-pagination>

  <p class="demonstration">Change page size</p>
  <ea-pagination
    id="additionalFunctionsPagination2"
    total="1000"
  ></ea-pagination>

  <p class="demonstration">Jump to</p>
  <ea-pagination
    id="additionalFunctionsPagination3"
    total="1000"
  ></ea-pagination>

  <p class="demonstration">All combined</p>
  <ea-pagination
    id="additionalFunctionsPagination4"
    total="400"
  ></ea-pagination>
</div>
```

```js
const additionalFunctionsExample = {
  sizeBtn: document.querySelector("#additionalFunctionsSize"),
  backgroundBtn: document.querySelector("#additionalFunctionsBackground"),
  disabledBtn: document.querySelector("#additionalFunctionsDisabled"),

  els: [
    document.querySelector("#additionalFunctionsPagination1"),
    document.querySelector("#additionalFunctionsPagination2"),
    document.querySelector("#additionalFunctionsPagination3"),
    document.querySelector("#additionalFunctionsPagination4"),
  ],

  init() {
    const layout = ["prev", "pager", "next", "jumper", "->", "total"];
    const sizes = [100, 200, 300, 400];

    this.els[1].layout = ["total", "sizes", "prev", "pager", "next"];
    this.els[1].pageSizes = sizes;
    this.els[3].layout = ["sizes", "prev", "pager", "next", "jumper"];
    this.els[3].pageSizes = sizes;

    this.sizeBtn.addEventListener("change", e => {
      const { value } = e.detail;

      this.els.forEach(el => {
        el.size = value;
      });
    });

    this.backgroundBtn.addEventListener("change", e => {
      const { value } = e.detail;

      this.els.forEach(el => {
        el.background = value;
      });
    });

    this.disabledBtn.addEventListener("change", e => {
      const { value } = e.detail;

      this.els.forEach(el => {
        el.disabled = value;
      });
    });
  },
};

additionalFunctionsExample.init();
```

:::

::::

## 事件用法

分页组件提供多个自定义事件，用于监听页码变化和按钮点击。

<div class="demo">
  <ea-pagination id="eventPagination" total="1000"></ea-pagination>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-pagination id="eventPagination" total="1000"></ea-pagination>
</div>
```

```js
const eventExample = {
  el: document.querySelector("#eventPagination"),

  init() {
    this.el.layout = ["prev", "pager", "next"];

    this.el.addEventListener("ea-current-change", e => {
      console.log("ea-current-change", e.detail);
    });

    this.el.addEventListener("ea-prev-click", e => {
      console.log("ea-prev-click", e.detail);
    });

    this.el.addEventListener("ea-next-click", e => {
      console.log("ea-next-click", e.detail);
    });
  },
};
eventExample.init();
```

:::

::::

## Pagination API

### Pagination Attributes

| 参数                                           | 说明                                                  | 类型    | 可选值                                                                         | 默认值                                               |
| ---------------------------------------------- | ----------------------------------------------------- | ------- | ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| total                                          | 数据总条目数，用于计算总页数                          | number  | —                                                                              | 0                                                    |
| pager-count                                    | 设置最大页码按钮数，当总页数超过该值时会折叠          | number  | —                                                                              | 7                                                    |
| layout <ea-tag type="primary">prop</ea-tag>    | 控制显示的元素顺序与种类（字符串数组或逗号分隔）      | Array   | `Array<'prev' \| 'pager' \| 'next' \| '->' \| 'jumper' \| 'total' \| 'sizes'>` | `["prev", "pager", "next", "jumper", "->", "total"]` |
| background                                     | 是否显示带背景样式                                    | boolean | —                                                                              | false                                                |
| default-page-size                              | 默认每页显示条数（用于 `page-size` 未设置时的回退值） | number  | —                                                                              | 10                                                   |
| page-size                                      | 当前每页显示条数                                      | number  | —                                                                              | 10                                                   |
| pageSizes <ea-tag type="primary">prop</ea-tag> | 每页显示条数的选择器选项                              | Array   | —                                                                              | `[10, 20, 30, 40, 50, 100]`                          |
| current-page                                   | 当前页码                                              | number  | —                                                                              | 1                                                    |
| hide-on-single-page                            | 当仅有一页时是否隐藏分页组件                          | boolean | —                                                                              | false                                                |
| size                                           | 组件尺寸                                              | string  | `large` / `default` / `small`                                                  | ""                                                   |
| disabled                                       | 是否禁用分页交互                                      | boolean | —                                                                              | false                                                |

### Pagination CSS Part

> 用法可参考 [MDN ::part() 伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明                                                                         |
| ----------- | ---------------------------------------------------------------------------- |
| container   | 组件根容器                                                                   |
| icon        | 图标元素（上一页/下一页箭头共用）                                            |
| prev-icon   | 上一页箭头图标（同时包含 `icon` part）                                       |
| next-icon   | 下一页箭头图标（同时包含 `icon` part）                                       |
| pager       | 页码列表容器（仅在 layout 包含 `pager` 时存在）                              |
| page        | 单个页码按钮                                                                 |
| more        | 省略号/更多按钮                                                              |
| total       | 总数显示容器（仅在 layout 包含 `total` 时存在）                              |
| jumper-wrap | 跳转输入容器（仅在 layout 包含 `jumper` 时存在）                             |
| jumper      | 跳转输入控件（对应内部 `ea-input-number`，仅在 layout 包含 `jumper` 时存在） |
| sizes       | 每页大小选择控件（仅在 layout 包含 `sizes` 时存在）                          |
| separator   | 右对齐分隔占位（对应 `->` 在 layout 中的位置）                               |

### Pagination Methods

| 方法名                   | 说明                                            | 参数 |
| ------------------------ | ----------------------------------------------- | ---- |
| updateContainerClasslist | 更新容器类名，根据当前属性状态重新计算 BEM 类名 | —    |

### Pagination Events

| 事件名            | 说明                 | 回调参数 (event.detail) |
| ----------------- | -------------------- | ----------------------- |
| ea-current-change | 当前页变化时触发     | `{ value: number }`     |
| ea-prev-click     | 点击上一页按钮时触发 | `{ value: number }`     |
| ea-next-click     | 点击下一页按钮时触发 | `{ value: number }`     |
| ea-size-change    | 每页条数变化时触发   | `{ pageSize: number }`  |

### Pagination CSS Custom Properties

| 属性名                                | 说明               | 默认值                              |
| ------------------------------------- | ------------------ | ----------------------------------- |
| --ea-pagination-color                 | 文本颜色           | var(--grey-900)                     |
| --ea-pagination-active-color          | 激活态颜色         | var(--blue-500)                     |
| --ea-pagination-disabled-active-color | 禁用态激活颜色     | var(--blue-300)                     |
| --ea-pagination-disabled-color        | 禁用态颜色         | var(--grey-300)                     |
| --ea-pagination-background            | 背景色             | var(--grey-200)                     |
| --ea-pagination-font-size             | 字体大小           | var(--font-size-lg)                 |
| --ea-pagination-font-size-small       | 小号字体大小       | var(--font-size-md)                 |
| --ea-pagination-font-size-large       | 大号字体大小       | 18px                                |
| --ea-pagination-spacing               | 内边距             | var(--spacing-sm) var(--spacing-lg) |
| --ea-pagination-spacing-small         | 小号内边距         | var(--spacing-xs) var(--spacing-md) |
| --ea-pagination-spacing-large         | 大号内边距         | var(--spacing-sm) 12px              |
| --ea-pagination-jumper-height         | 跳转输入框高度     | 28px                                |
| --ea-pagination-jumper-height-small   | 小号跳转输入框高度 | 22px                                |
| --ea-pagination-jumper-height-large   | 大号跳转输入框高度 | 30px                                |
