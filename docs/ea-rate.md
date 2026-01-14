<script setup>
import { onMounted } from "vue";
import "../dist/components/index.js";
import "../dist/assets/icon.css";

onMounted(async () => {
  const hoverExample = {
    rate: document.querySelector("#hoverRate"),
    content: document.querySelector(".hover-rate-text"),

    text: ["oops", "disappointed", "normal", "good", "great"],

    init() {
      this.rate.addEventListener("hover", e => {
        this.content.textContent = this.text[e.detail.value];
      });
    },
  };

  hoverExample.init();

  const customIconExample = {
    rate: document.querySelector("#customIconRate"),

    init() {
      this.rate.getSymbol = () =>
        `<ea-icon icon="icon-heart" part="icon"></ea-icon>`;
    },
  };
  customIconExample.init();

  const customIconRendererExample = {
    rate: document.querySelector("#customIconRendererRate"),
    color: ["red", "orange", "yellow", "green", "blue"],

    init() {
      this.rate.getSymbol = (value, isSelected) =>
        `<ea-icon icon="icon-battery-${value}" part="icon"></ea-icon>`;

      this.rate.addEventListener("hover", e => {
        this.rate.style.setProperty(
          "--ea-rate-active-color",
          this.color[e.detail.value]
        );
      });
    },
  };

  customIconRendererExample.init();

});
</script>

<style>
  .hover-rate-text {
    position: absolute;

    display: inline-block;
    box-sizing: border-box;

    padding: 4px 6px;

    border-radius: 8px;
    background: black;
    color: white;
    text-align: center;
  }

  .hover-rate-text:empty {
    display: none;
  }
</style>

# Rate 评分

评分组件，支持自定义图标、悬停提示和可配置最大值。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-rate/index.js";
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

默认情况下，组件会渲染 5 个评分项，用户点击可切换选中状态。

<div class="row">
  <section>
    <p>Default</p>
    <ea-rate id="ea-rate-example"></ea-rate>
  </section>
  <section>
    <p>Custom color</p>
    <ea-rate style="--ea-rate-active-color: red"></ea-rate>
  </section>
</div>

```html
<div class="row">
  <section>
    <p>Default</p>
    <ea-rate id="ea-rate-example"></ea-rate>
  </section>
  <section>
    <p>Custom color</p>
    <ea-rate style="--ea-rate-active-color: red"></ea-rate>
  </section>
</div>
```

## 尺寸

支持通过 `size` 属性调整组件尺寸。

<div class="demo">
  <ea-rate size="large"></ea-rate>
  <br />
  <ea-rate></ea-rate>
  <br />
  <ea-rate size="small"></ea-rate>
</div>

```html
<div class="demo">
  <ea-rate size="large"></ea-rate>
  <br />
  <ea-rate></ea-rate>
  <br />
  <ea-rate size="small"></ea-rate>
</div>
```

## 只读

设置 `readonly` 属性用于仅展示评分，禁止交互。

<div class="col left">
  <ea-rate value="2" readonly></ea-rate>
</div>

```html
<div class="col left">
  <ea-rate value="2" readonly></ea-rate>
</div>
```

## 禁用状态

设置 `disabled` 属性后组件不可交互并体现禁用样式。

<div class="col left">
  <ea-rate value="2" disabled></ea-rate>
</div>

```html
<div class="col left">
  <ea-rate value="2" disabled></ea-rate>
</div>
```

## 最大值

通过 `max` 属性配置最大评分个数（默认 5）。

<div class="demo">
  <ea-rate max="3"></ea-rate>
</div>

```html
<div class="demo">
  <ea-rate max="3"></ea-rate>
</div>
```

## 悬停辅助文字

该示例中在组件外用一个浮层显示当前 `hover` 值对应的描述文本。

<div class="demo">
  <section style="position: relative">
    <ea-rate id="hoverRate"></ea-rate>
    <span class="hover-rate-text"></span>
  </section>
</div>

::: code-group

```html
<div class="demo">
  <section style="position: relative">
    <ea-rate id="hoverRate"></ea-rate>
    <span class="hover-rate-text"></span>
  </section>
</div>
```

```css
.hover-rate-text {
  position: absolute;

  display: inline-block;
  box-sizing: border-box;

  padding: 4px 6px;

  border-radius: 8px;
  background: black;
  color: white;
  text-align: center;
}

.hover-rate-text:empty {
  display: none;
}
```

```js
const hoverExample = {
  rate: document.querySelector("#hoverRate"),
  content: document.querySelector(".hover-rate-text"),

  text: ["oops", "disappointed", "normal", "good", "great"],

  init() {
    this.rate.addEventListener("hover", e => {
      this.content.textContent = this.text[e.detail.value];
    });
  },
};

hoverExample.init();
```

:::

## 自定义图标

可以通过覆盖组件实例的 `getSymbol` 方法来自定义每一项的渲染（返回字符串 HTML）。

<div class="demo">
  <ea-rate
    id="customIconRate"
    value="2"
    style="--ea-rate-active-color: red"
  ></ea-rate>
</div>

::: code-group

```html
<div class="demo">
  <ea-rate
    id="customIconRate"
    value="2"
    style="--ea-rate-active-color: red"
  ></ea-rate>
</div>
```

```js
const customIconExample = {
  rate: document.querySelector("#customIconRate"),

  init() {
    this.rate.getSymbol = () =>
      `<ea-icon icon="icon-heart" part="icon"></ea-icon>`;
  },
};
customIconExample.init();
```

:::

## 自定义图标渲染

`getSymbol` 接收 (value, isSelected) 两个参数，可以基于 value 渲染不同图标。

<div class="demo">
  <ea-rate id="customIconRendererRate" style="--ea-rate-spacing: 4px"></ea-rate>
</div>

::: code-group

```html
<div class="demo">
  <ea-rate id="customIconRendererRate" style="--ea-rate-spacing: 4px"></ea-rate>
</div>
```

```js
const customIconRendererExample = {
  rate: document.querySelector("#customIconRendererRate"),
  color: ["red", "orange", "yellow", "green", "blue"],

  init() {
    this.rate.getSymbol = (value, isSelected) =>
      `<ea-icon icon="icon-battery-${value}" part="icon"></ea-icon>`;

    this.rate.addEventListener("hover", e => {
      this.rate.style.setProperty(
        "--ea-rate-active-color",
        this.color[e.detail.value]
      );
    });
  },
};

customIconRendererExample.init();
```

:::

## Attributes

| 参数                            | 说明         | 类型     | 可选值                            | 默认值                                                     |
| ------------------------------- | ------------ | -------- | --------------------------------- | ---------------------------------------------------------- |
| value                           | 当前评分值   | number   | —                                 | 0                                                          |
| max                             | 最大评分长度 | number   | —                                 | 5                                                          |
| size                            | 组件尺寸     | string   | `"large" \| "default" \| "small"` | -                                                          |
| readonly                        | 是否只读     | boolean  | —                                 | false                                                      |
| disabled                        | 是否禁用     | boolean  | —                                 | false                                                      |
| getSymbol <ea-tag>prop</ea-tag> | 自定义图标   | function | —                                 | `() => "<ea-icon icon="icon-star" part="icon"></ea-icon>"` |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| container   | 外层容器（组件根元素，part="container"）                     |
| symbol-wrap | 单个评分项的包裹元素（part="symbol-wrap"）                   |
| icon        | 每个图标的内部元素（`getSymbol` 返回的图标可带 part="icon"） |

## Events

| 事件名 | 说明                 | 回调参数 ( event.detail )                |
| ------ | -------------------- | ---------------------------------------- |
| change | 评分值变化时触发     | `{ value: number }`                      |
| hover  | 鼠标移动到某项时触发 | `{ value: number, target: HTMLElement }` |
