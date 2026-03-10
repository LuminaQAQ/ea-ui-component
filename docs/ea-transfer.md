<script setup>
import { onMounted } from 'vue'
import PropTag from "./components/PropTag.vue"
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(async () => {
  await customElements.whenDefined("ea-transfer");

  // ------- 基础用法 -------
  // #region
  const basicExample = {
    transfer: document.querySelector("#basicTransfer"),
    setDataBtn: document.querySelector("#setDataBtn"),

    generateData: () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    },

    init() {
      const data = this.generateData();
      this.transfer.data = data;
    },
  };
  basicExample.init();
  // #endregion
  // ------- end -------

  // ------- 可搜索过滤 -------
  // #region
  const filterableExample = {
    transfer: document.querySelector("#filterableTransfer"),

    generateData: () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    },

    init() {
      const data = this.generateData();
      this.transfer.data = data;
    },
  };
  filterableExample.init();
  // #endregion
  // ------- end -------

  // ------- 自定义用法 -------
  // #region
  const customExample = {
    transfer: document.querySelector("#customTransfer"),

    generateData: () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    },

    init() {
      const data = this.generateData();

      this.transfer.titles = ["Source", "Target"];
      this.transfer.buttonTexts = ["To right", "To left"];

      this.transfer.data = data;

      this.transfer.value = [1, 2, 3];

      this.transfer.addEventListener("change", event => {
        console.log("Selection changed:", event.detail.value);
      });

      this.transfer.addEventListener("ea-left-check-change", event => {
        console.log("Left check changed:", event.detail);
      });

      this.transfer.addEventListener("ea-right-check-change", event => {
        console.log("Right check changed:", event.detail);
      });
    },
  };
  customExample.init();
  // #endregion
  // ------- end -------

  // ------- 自定义空内容 -------
  // #region
  const emptyExample = {
    transfer: document.querySelector("#emptyTransfer"),

    generateData: () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    },

    init() {
      this.transfer.data = this.generateData();

      this.transfer.addEventListener("change", event => {
        console.log("Selection changed:", event.detail.value);
      });
    },
  };
  emptyExample.init();
  // #endregion
  // ------- end -------
})
</script>

# Transfer 穿梭框

Transfer 是一个用于在两个列表之间移动数据的穿梭框组件，支持数据筛选、自定义渲染、多选操作等功能。

## 引入

> `js`

```js
<script type='module'>
  import "./node_modules/easy-component-ui/components/ea-transfer/index.js";
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

移步到 [CSS Part](#transfer-css-part)。

## 基础用法

最基本的穿梭框用法，包含左右两个面板和移动按钮。

<div class="demo">
  <ea-transfer id="basicTransfer"></ea-transfer>
</div>

::: code-group

```html
<div class="demo">
  <ea-transfer id="basicTransfer"></ea-transfer>
</div>
```

```js
const basicExample = {
  transfer: document.querySelector("#basicTransfer"),

  generateData: () => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `Option ${i}`,
        disabled: i % 4 === 0,
      });
    }
    return data;
  },

  init() {
    const data = this.generateData();
    this.transfer.data = data;
  },
};
basicExample.init();
```

:::

## 可搜索过滤

通过设置 `filterable` 属性启用搜索功能，可以快速筛选数据。

<div class="demo">
  <ea-transfer id="filterableTransfer" filterable></ea-transfer>
</div>

::: code-group

```html
<div class="demo">
  <ea-transfer id="filterableTransfer" filterable></ea-transfer>
</div>
```

```js
const filterableExample = {
  transfer: document.querySelector("#filterableTransfer"),

  generateData: () => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `Option ${i}`,
        disabled: i % 4 === 0,
      });
    }
    return data;
  },

  init() {
    const data = this.generateData();
    this.transfer.data = data;
  },
};
filterableExample.init();
```

:::

## 自定义用法

支持自定义面板标题、按钮文本、空状态内容等。

<div class="demo">
  <p style="text-align: center; margin: 0 0 20px">
    Customize data items using render-content
  </p>
  <div style="text-align: center">
    <ea-transfer
      id="customTransfer"
      style="text-align: left; display: inline-block"
      filterable
    >
      <div slot="left-footer">
        <ea-button size="small" style="margin-left: 15px;padding: 6px 5px"> Operation </ea-button>
      </div>
      <div slot="right-footer">
        <ea-button size="small" style="margin-left: 15px;padding: 6px 5px"> Operation </ea-button>
      </div>
    </ea-transfer>
  </div>
</div>

::: code-group

```html
<div class="demo">
  <p style="text-align: center; margin: 0 0 20px">
    Customize data items using render-content
  </p>
  <div style="text-align: center">
    <ea-transfer
      id="customTransfer"
      style="text-align: left; display: inline-block"
      filterable
    >
      <div slot="left-footer">
        <ea-button size="small" style="margin-left: 15px; padding: 6px 5px">
          Operation
        </ea-button>
      </div>
      <div slot="right-footer">
        <ea-button size="small" style="margin-left: 15px;padding: 6px 5px">
          Operation
        </ea-button>
      </div>
    </ea-transfer>
  </div>
</div>
```

```js
const customExample = {
  transfer: document.querySelector("#customTransfer"),

  generateData: () => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `Option ${i}`,
        disabled: i % 4 === 0,
      });
    }
    return data;
  },

  init() {
    const data = this.generateData();

    this.transfer.titles = ["Source", "Target"];
    this.transfer.buttonTexts = ["To right", "To left"];

    this.transfer.data = data;

    this.transfer.value = [1, 2, 3];

    this.transfer.addEventListener("change", event => {
      console.log("Selection changed:", event.detail.value);
    });

    this.transfer.addEventListener("ea-left-check-change", event => {
      console.log("Left check changed:", event.detail);
    });

    this.transfer.addEventListener("ea-right-check-change", event => {
      console.log("Right check changed:", event.detail);
    });
  },
};
customExample.init();
```

:::

## 自定义空内容

可以为左右面板分别自定义空状态显示内容。

<div class="demo">
  <p style="text-align: center; margin: 0 0 20px">
    Customize empty content for both panels
  </p>
  <div style="text-align: center">
    <ea-transfer id="emptyTransfer">
      <div slot="left-empty">
        <div style="text-align: center; padding: 20px; color: #909399">
          <div style="font-size: 60px; margin-bottom: 30px">📭</div>
          <div>No data</div>
        </div>
      </div>
      <div slot="right-empty">
        <div style="text-align: center; padding: 20px; color: #909399">
          <div style="font-size: 60px; margin-bottom: 30px">📭</div>
          <div>No data</div>
        </div>
      </div>
    </ea-transfer>
  </div>
</div>

::: code-group

```html
<div class="demo">
  <p style="text-align: center; margin: 0 0 20px">
    Customize empty content for both panels
  </p>
  <div style="text-align: center">
    <ea-transfer id="emptyTransfer">
      <div slot="left-empty">
        <div style="text-align: center; padding: 20px; color: #909399">
          <div style="font-size: 60px; margin-bottom: 10px">📭</div>
          <div>No data</div>
        </div>
      </div>
      <div slot="right-empty">
        <div style="text-align: center; padding: 20px; color: #909399">
          <div style="font-size: 60px; margin-bottom: 10px">📭</div>
          <div>No data</div>
        </div>
      </div>
    </ea-transfer>
  </div>
</div>
```

```js
const emptyExample = {
  transfer: document.querySelector("#emptyTransfer"),

  generateData: () => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `Option ${i}`,
        disabled: i % 4 === 0,
      });
    }
    return data;
  },

  init() {
    this.transfer.data = this.generateData();

    this.transfer.addEventListener("change", event => {
      console.log("Selection changed:", event.detail.value);
    });
  },
};
emptyExample.init();
```

:::

## Transfer API

### Transfer Attributes

| 参数                           | 说明             | 类型          | 可选值 | 默认值                                                 |
| ------------------------------ | ---------------- | ------------- | ------ | ------------------------------------------------------ |
| data <PropTag/>                | 数据源           | `dataProps[]` | -      | []                                                     |
| value <PropTag/>               | 已选中的数据项   | Array         | -      | []                                                     |
| disabled                       | 是否禁用         | Boolean       | -      | false                                                  |
| filterable                     | 是否可搜索       | Boolean       | -      | false                                                  |
| filter-placeholder             | 搜索框占位符     | String        | -      | "请输入搜索内容"                                       |
| dataProps <PropTag/>           | 数据字段映射配置 | Object        | -      | `{ key: "key", label: "label", disabled: "disabled" }` |
| titles                         | 面板标题         | Array         | -      | []                                                     |
| buttonTexts <PropTag/>         | 按钮文本         | Array         | -      | []                                                     |
| filterMethod <PropTag/>        | 自定义筛选方法   | Function      | -      | null                                                   |
| leftDefaultChecked <PropTag/>  | 左侧默认选中项   | Array         | -      | []                                                     |
| rightDefaultChecked <PropTag/> | 右侧默认选中项   | Array         | -      | []                                                     |

### Transfer Methods

| 方法名     | 说明           | 参数                     |
| ---------- | -------------- | ------------------------ |
| clearQuery | 清空搜索关键词 | which: 'left' \| 'right' |

### Transfer Events

| 事件名                | 说明                     | 回调参数(event.detail)                |
| --------------------- | ------------------------ | ------------------------------------- |
| change                | 选中项变化时触发         | `{ value: any[] }`                    |
| ea-left-check-change  | 左侧面板选中项变化时触发 | `{ value: any[], movedKeys?: any[] }` |
| ea-right-check-change | 右侧面板选中项变化时触发 | `{ value: any[], movedKeys?: any[] }` |

### Transfer CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称                       | 说明         |
| -------------------------- | ------------ |
| container                  | 组件容器     |
| panel                      | 面板容器     |
| panel & source-panel       | 左侧面板     |
| panel & target-panel       | 右侧面板     |
| buttons                    | 按钮区域     |
| button                     | 按钮         |
| button & move-to-right-btn | 向右移动按钮 |
| button & move-to-left-btn  | 向左移动按钮 |

### Transfer Slot

| 名称         | 说明               |
| ------------ | ------------------ |
| left-empty   | 左侧面板空状态内容 |
| right-empty  | 右侧面板空状态内容 |
| left-footer  | 左侧面板底部内容   |
| right-footer | 右侧面板底部内容   |

## TransferPanel API

### TransferPanel CSS Part

| 名称                                                | 说明         |
| --------------------------------------------------- | ------------ |
| container                                           | 面板容器     |
| header                                              | 面板头部     |
| [checkbox](./ea-checkbox.md#checkbox-css-part)      | 全选复选框   |
| title                                               | 标题         |
| count                                               | 计数显示     |
| body                                                | 面板主体     |
| filter-wrapper                                      | 搜索框容器   |
| [filter](./ea-input.md#css-part)                    | 搜索框       |
| empty                                               | 空状态区域   |
| list                                                | 列表容器     |
| [item-checkbox](./ea-checkbox.md#checkbox-css-part) | 列表项复选框 |
| item-label                                          | 列表项标签   |

### TransferPanel Slot

| 名称  | 说明       |
| ----- | ---------- |
| empty | 空状态内容 |
