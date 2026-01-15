<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {

  const extExample = {
    tooltip: document.querySelector("#extTooltip"),
    switch: document.querySelector("#extSwitch"),

    init() {
      const getContentString = value =>
        `Switch value: ${value === 100 ? "100" : "0"}`;

      this.tooltip.setAttribute("content", getContentString(this.switch.value));

      this.switch.addEventListener("change", e => {
        this.tooltip.setAttribute("content", getContentString(e.detail.value));
      });
    },
  };
  extExample.init();


  const forbiddenExample = {
    switch1: document.querySelector("#forbiddenSwitch1"),
    switch2: document.querySelector("#forbiddenSwitch2"),

    init() {
      this.switch1.beforeChange = () => {
        this.switch1.toggleAttribute("disabled", true);

        return new Promise(resolve => {
          setTimeout(() => {
            this.switch1.toggleAttribute("disabled", false);
            window.$message.success("Switch success");
            return resolve(true);
          }, 1000);
        });
      };

      this.switch2.beforeChange = () => {
        this.switch2.toggleAttribute("disabled", true);

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.switch2.toggleAttribute("disabled", false);
            window.$message.error("Switch failed");
            return reject(new Error("Error"));
          }, 1000);
        });
      };
    },
  };
  forbiddenExample.init();


})
</script>

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 引入

`js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-switch/index.js";
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

移步到 [CSS Part](#css-part)。

## 基础用法

<div class="demo">
  <ea-switch name="basic" value="true"></ea-switch>
  <ea-switch
    name="basicHasText"
    value="true"
    style="
          --ea-switch-active-bg-color: #13ce66;
          --ea-switch-inactive-bg-color: #ff4949;
        "
  ></ea-switch>
</div>

```html
<div class="demo">
  <ea-switch name="basic" value="true"></ea-switch>
  <ea-switch
    name="basicHasText"
    value="true"
    style="
          --ea-switch-active-bg-color: #13ce66;
          --ea-switch-inactive-bg-color: #ff4949;
        "
  ></ea-switch>
</div>
```

## 不同尺寸

<div class="demo col left">
  <ea-switch
    name="basic"
    value="true"
    size="large"
    active-text="Open"
    inactive-text="Close"
  ></ea-switch>
  <br />
  <ea-switch
    name="basic"
    value="true"
    active-text="Open"
    inactive-text="Close"
  ></ea-switch>
  <br />
  <ea-switch
    name="basic"
    value="true"
    size="small"
    active-text="Open"
    inactive-text="Close"
  ></ea-switch>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-switch
    name="basic"
    value="true"
    size="large"
    active-text="Open"
    inactive-text="Close"
  ></ea-switch>
  <br />
  <ea-switch
    name="basic"
    value="true"
    active-text="Open"
    inactive-text="Close"
  ></ea-switch>
  <br />
  <ea-switch
    name="basic"
    value="true"
    size="small"
    active-text="Open"
    inactive-text="Close"
  ></ea-switch>
</div>
```

:::

## 文字描述

使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。

<div class="demo col left">
  <ea-switch
    value="true"
    active-text="Pay by month"
    inactive-text="Pay by year"
  ></ea-switch>
  <br />
  <ea-switch
    value="true"
    active-text="Pay by month"
    inactive-text="Pay by year"
    style="
          --ea-switch-active-bg-color: #13ce66;
          --ea-switch-inactive-bg-color: #ff4949;
        "
  ></ea-switch>
  <br />
  <ea-switch
    value="true"
    style="
          --ea-switch-active-bg-color: #13ce66;
          --ea-switch-inactive-bg-color: #ff4949;
        "
  >
    <ea-icon icon="icon-cancel" slot="inactive"></ea-icon>
    <ea-icon icon="icon-ok" slot="active"></ea-icon>
  </ea-switch>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-switch
    value="true"
    active-text="Pay by month"
    inactive-text="Pay by year"
  ></ea-switch>
  <br />
  <ea-switch
    value="true"
    active-text="Pay by month"
    inactive-text="Pay by year"
    style="
          --ea-switch-active-bg-color: #13ce66;
          --ea-switch-inactive-bg-color: #ff4949;
        "
  ></ea-switch>
  <br />
  <ea-switch
    value="true"
    style="
          --ea-switch-active-bg-color: #13ce66;
          --ea-switch-inactive-bg-color: #ff4949;
        "
  >
    <ea-icon icon="icon-cancel" slot="inactive"></ea-icon>
    <ea-icon icon="icon-ok" slot="active"></ea-icon>
  </ea-switch>
</div>
```

:::

## 扩展的 value 类型

你可以设置 `active-value` 和 `inactive-value` 属性， 它们接受 `Boolean`、`String` 或 `Number` 类型的值。

<div class="demo">
  <ea-tooltip id="extTooltip" content="1111" placement="top-start">
    <ea-switch
      id="extSwitch"
      slot="reference"
      value="100"
      style="
            --ea-switch-active-bg-color: #13ce66;
            --ea-switch-inactive-bg-color: #ff4949;
          "
      active-value="100"
      inactive-value="0"
    ></ea-switch>
  </ea-tooltip>
</div>

::: code-group

```html
<div class="demo">
  <ea-tooltip id="extTooltip" content="1111" placement="top-start">
    <ea-switch
      id="extSwitch"
      slot="reference"
      value="100"
      style="
            --ea-switch-active-bg-color: #13ce66;
            --ea-switch-inactive-bg-color: #ff4949;
          "
      active-value="100"
      inactive-value="0"
    ></ea-switch>
  </ea-tooltip>
</div>
```

```js
const extExample = {
  tooltip: document.querySelector("#extTooltip"),
  switch: document.querySelector("#extSwitch"),

  init() {
    const getContentString = value =>
      `Switch value: ${value === 100 ? "100" : "0"}`;

    this.tooltip.setAttribute("content", getContentString(this.switch.value));

    this.switch.addEventListener("change", e => {
      this.tooltip.setAttribute("content", getContentString(e.detail.value));
    });
  },
};
extExample.init();
```

:::

## 禁用状态

设置 `disabled` 属性，接受一个 `Boolean` ，设置 `true` 即可禁用。

<div class="row left">
  <ea-switch disabled></ea-switch>
  <ea-switch
    value="true"
    active-text="Pay by month"
    inactive-text="Pay by year"
    disabled
  ></ea-switch>
</div>

```html
<div class="demo">
  <ea-switch disabled></ea-switch>
  <ea-switch
    value="true"
    active-text="Pay by month"
    inactive-text="Pay by year"
    disabled
  ></ea-switch>
</div>
```

## 阻止切换

<div class="demo">
  <ea-switch id="forbiddenSwitch1"></ea-switch>
  <ea-switch id="forbiddenSwitch2"></ea-switch>
</div>

::: code-group

```html
<div class="demo">
  <ea-switch id="forbiddenSwitch1"></ea-switch>
  <ea-switch id="forbiddenSwitch2"></ea-switch>
</div>
```

```js
const forbiddenExample = {
  switch1: document.querySelector("#forbiddenSwitch1"),
  switch2: document.querySelector("#forbiddenSwitch2"),

  init() {
    this.switch1.beforeChange = () => {
      this.switch1.toggleAttribute("disabled", true);

      return new Promise(resolve => {
        setTimeout(() => {
          this.switch1.toggleAttribute("disabled", false);
          window.$message.success("Switch success");
          return resolve(true);
        }, 1000);
      });
    };

    this.switch2.beforeChange = () => {
      this.switch2.toggleAttribute("disabled", true);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.switch2.toggleAttribute("disabled", false);
          window.$message.error("Switch failed");
          return reject(new Error("Error"));
        }, 1000);
      });
    };
  },
};
forbiddenExample.init();
```

:::

## Attributes

| 参数                                              | 说明                                                     | 类型                      | 可选值                      | 默认值  |
| ------------------------------------------------- | -------------------------------------------------------- | ------------------------- | --------------------------- | ------- |
| name                                              | 原生属性，若与 `form` 组合使用，则作为 `FormData` 的键名 | string                    | -                           | -       |
| value                                             | 当前开关的值                                             | string / number / boolean | -                           | false   |
| active-value                                      | 打开时的值                                               | string / number / boolean | -                           | true    |
| inactive-value                                    | 关闭时的值                                               | string / number / boolean | -                           | false   |
| size                                              | 开关的尺寸                                               | string                    | `large \| default \| small` | default |
| inactive-text                                     | 关闭时显示的文字                                         | string                    | -                           | -       |
| inactive-color                                    | 关闭时的背景色                                           | string                    | -                           | -       |
| active-text                                       | 打开时显示的文字                                         | string                    | -                           | -       |
| active-color                                      | 打开时的背景色                                           | string                    | -                           | -       |
| disabled                                          | 是否禁用                                                 | boolean                   | -                           | false   |
| beforeChange <ea-tag type="primary">prop</ea-tag> | 切换前的回调函数，返回 Promise                           | `Function：() => Promise` |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明                     |
| ----------- | ------------------------ |
| container   | 外层容器                 |
| original    | 原生控件                 |
| label-left  | 左侧文字                 |
| switch      | 伪 `checkbox` input 控件 |
| label-right | 右侧文字                 |

## Slots

| 名称     | 说明             |
| -------- | ---------------- |
| active   | 打开状态时的内容 |
| inactive | 关闭状态时的内容 |

## Events

| 事件名 | 说明               | 回调参数 ( event.detail )                |
| ------ | ------------------ | ---------------------------------------- |
| change | 状态发生变化时触发 | `{ value: String \| Number \| Boolean }` |
