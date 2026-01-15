<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")


    const controllableExample = {
        radioGroup: document.querySelector('#controllableRadioGroup'),
        container: document.querySelector('#controllableSpace'),

        init() {
            this.radioGroup.addEventListener('change', (e) => {
                this.container.setAttribute('size', e.detail.value);
            });
        }
    };
    controllableExample.init();


    const fillExample = {
        fillSwitch: document.querySelector('#fillSwitch'),
        fillContainer: document.querySelector('#fillSpace'),

        fillRadioGroup: document.querySelector('#fillRadioGroup'),
        fillRatioSwitch: document.querySelector('#fillRatioSwitch'),
        fillRatioContainer: document.querySelector('#fillRatioSpace'),

        init() {
            this.fillSwitch.addEventListener('change', (e) => {
                this.fillContainer.setAttribute('fill', e.detail.value);
            });

            this.fillRadioGroup.addEventListener('change', (e) => {
                this.fillRatioContainer.setAttribute('direction', e.detail.value);
            });

            this.fillRatioSwitch.addEventListener('change', (e) => {
                this.fillRatioContainer.setAttribute('fill', e.detail.value);
            });
        }
    };
    fillExample.init();
})
</script>

<style>
.alignment-container {
    width: 240px;
    margin-bottom: 20px;
    padding: 8px;

    border: 1px solid #ddd;
}
</style>

# Space 间距 ​

虽然我们拥有 <ea-link type="primary" href="./ea-divider">Divider</ea-link> 组件，但很多时候我们需要不是一个被 <ea-link type="primary" href="./ea-divider">Divider</ea-link> 组件 分割开的页面结构，因此我们会重复的使用很多的 <ea-link type="primary" href="./ea-divider">Divider</ea-link> 组件，这在我们的开发效率上造成了一定的困扰。 间距组件就是为了解决这种困扰应运而生的。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-space/index.js";
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

## 基础用法 ​

最基础的用法，通过这个组件来给组件之间提供统一的间距。

通过间距组件来给多个组件之间提供间距

<div class="demo">
  <ea-space wrap>
    <ea-card v-for="i in 3" style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-space wrap>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>
```

:::

## 垂直布局 ​

使用 `direction` 来控制布局的方式, 背后实际上是利用了 `flex-direction` 来控制.

我们也提供垂直布局方式。

<div class="demo">
  <ea-space direction="vertical" wrap>
    <ea-card v-for="i in 3" style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-space direction="vertical" wrap>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>
```

:::

## 控制间距的大小 ​

通过调整 `size` 的值来控制间距的大小

使用内置的 `small`、`default`、`large` 来设置间距大小，分别对应 `8px`、`12px` 和 `16px` 的间距。 默认的间距大小为 `small`，也就是 `8px`。

您也可以通过自定义的 `size` 来控制大小。

<div class="demo">
  <ea-space direction="vertical" alignment="start" size="30px">
    <ea-radio-group id="controllableRadioGroup" name="salary">
      <ea-radio value="large" checked>Large</ea-radio>
      <ea-radio value="default">Default</ea-radio>
      <ea-radio value="small">Small</ea-radio>
    </ea-radio-group>
    <ea-space id="controllableSpace" size="large" wrap>
      <ea-card v-for="item in 3" style="width: 250px;">
        <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
        <ol>
          <li>List item</li>
          <li>List item</li>
          <li>List item</li>
          <li>List item</li>
        </ol>
      </ea-card>
    </ea-space>
  </ea-space>
</div>

::: code-group

```html
<div class="demo">
  <ea-space direction="vertical" alignment="start" size="30px">
    <ea-radio-group id="controllableRadioGroup" name="salary">
      <ea-radio value="large" checked>Large</ea-radio>
      <ea-radio value="default">Default</ea-radio>
      <ea-radio value="small">Small</ea-radio>
    </ea-radio-group>
    <ea-space id="controllableSpace" size="large" wrap>
      <ea-card style="width: 250px;">
        <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
        <ol>
          <li>List item</li>
          <li>List item</li>
          <li>List item</li>
          <li>List item</li>
        </ol>
      </ea-card>
      <ea-card style="width: 250px;">
        <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
        <ol>
          <li>List item</li>
          <li>List item</li>
          <li>List item</li>
          <li>List item</li>
        </ol>
      </ea-card>
      <ea-card style="width: 250px;">
        <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
        <ol>
          <li>List item</li>
          <li>List item</li>
          <li>List item</li>
          <li>List item</li>
        </ol>
      </ea-card>
    </ea-space>
  </ea-space>
</div>
```

```js
const controllableExample = {
  radioGroup: document.querySelector("#controllableRadioGroup"),
  container: document.querySelector("#controllableSpace"),

  init() {
    this.radioGroup.addEventListener("change", e => {
      this.container.setAttribute("size", e.detail.value);
    });
  },
};
controllableExample.init();
```

:::

## 自动换行 ​

在 **水平 (horizontal)** 模式下，通过使用 `wrap`（布尔类型）来控制自动换行行为。

利用 `wrap` 属性控制换行

<div class="demo">
  <ea-space wrap>
    <ea-button v-for="i in 10" text>Text button</ea-button>
  </ea-space>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-space wrap>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
    <ea-button text>Text button</ea-button>
  </ea-space>
</div>
```

:::

## 行间分隔符 ​

有时候，仅仅在行间加空白并不能满足我们的日常需求，此时分隔符 (spacer) 就可以发挥非常好的作用了。

利用 `wrap` 属性控制换行

<div class="demo">
  <ea-space size="10px" spacer="|">
    <ea-button> button 1 </ea-button>
    <ea-button> button 2 </ea-button>
    <ea-button> button 3 </ea-button>
  </ea-space>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-space size="10px" spacer="|">
    <ea-button> button 1 </ea-button>
    <ea-button> button 2 </ea-button>
    <ea-button> button 3 </ea-button>
  </ea-space>
</div>
```

:::

## 对齐方式 ​

设置该值可以调整所有子节点在容器内的对齐方式，可设置的值与 `align-items` 一致。

使用 `alignment` 属性来对齐

<div class="demo">
  <div class="alignment-container">
    <ea-space>
      string
      <ea-button> button </ea-button>
      <ea-card header="header"> body </ea-card>
    </ea-space>
  </div>
  <div class="alignment-container">
    <ea-space alignment="flex-start">
      string
      <ea-button> button </ea-button>
      <ea-card header="header"> body </ea-card>
    </ea-space>
  </div>
  <div class="alignment-container">
    <ea-space alignment="flex-end">
      string
      <ea-button> button </ea-button>
      <ea-card header="header"> body </ea-card>
    </ea-space>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div class="alignment-container">
    <ea-space>
      string
      <ea-button> button </ea-button>
      <ea-card header="header"> body </ea-card>
    </ea-space>
  </div>
  <div class="alignment-container">
    <ea-space alignment="flex-start">
      string
      <ea-button> button </ea-button>
      <ea-card header="header"> body </ea-card>
    </ea-space>
  </div>
  <div class="alignment-container">
    <ea-space alignment="flex-end">
      string
      <ea-button> button </ea-button>
      <ea-card header="header"> body </ea-card>
    </ea-space>
  </div>
</div>
```

:::

## 填充容器 ​

通过 fill **（布尔类型）** 参数，您可以控制子节点是否自动填充容器。

下面的例子中，当设置为 fill 时，子节点的宽度会自动适配容器的宽度。

用 fill 属性让子节点自动填充容器

<div class="demo">
  <div style="margin-bottom: 15px">
    fill: <ea-switch id="fillSwitch"></ea-switch>
  </div>
  <ea-space id="fillSpace" wrap>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>

::: details 查看代码

```html
<div class="demo">
  <div style="margin-bottom: 15px">
    fill: <ea-switch id="fillSwitch"></ea-switch>
  </div>
  <ea-space id="fillSpace" wrap>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>
```

:::

也可以使用 `fillRatio` 参数，自定义填充的比例， 默认值为 `100`，代表基于父容器宽度的 `100%` 进行填充

需要注意的是，水平布局和垂直布局的表现形式稍有不同，具体的效果可以查看下面的例子

用 `fillRatio` 自定义填充比例

<div class="demo">
  <div style="margin-bottom: 15px">
    direction:
    <ea-radio-group id="fillRadioGroup" name="direction">
      <ea-radio value="horizontal" checked>horizontal</ea-radio>
      <ea-radio value="vertical">vertical</ea-radio>
    </ea-radio-group>
  </div>
  <div style="margin-bottom: 15px">
    fill(ratio): <ea-switch id="fillRatioSwitch"></ea-switch>
  </div>
  <ea-space id="fillRatioSpace" fill-ratio="49" wrap>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>

::: details 查看代码

```html
<div class="demo">
  <div style="margin-bottom: 15px">
    direction:
    <ea-radio-group id="fillRadioGroup" name="direction">
      <ea-radio value="horizontal" checked>horizontal</ea-radio>
      <ea-radio value="vertical">vertical</ea-radio>
    </ea-radio-group>
  </div>
  <div style="margin-bottom: 15px">
    fill(ratio): <ea-switch id="fillRatioSwitch"></ea-switch>
  </div>
  <ea-space id="fillRatioSpace" fill-ratio="49" wrap>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>
```

:::

::: code-group

```js [填充容器示例]
const fillExample = {
  fillSwitch: document.querySelector("#fillSwitch"),
  fillContainer: document.querySelector("#fillSpace"),

  fillRadioGroup: document.querySelector("#fillRadioGroup"),
  fillRatioSwitch: document.querySelector("#fillRatioSwitch"),
  fillRatioContainer: document.querySelector("#fillRatioSpace"),

  init() {
    this.fillSwitch.addEventListener("change", e => {
      this.fillContainer.setAttribute("fill", e.detail.value);
    });

    this.fillRadioGroup.addEventListener("change", e => {
      this.fillRatioContainer.setAttribute("direction", e.detail.value);
    });

    this.fillRatioSwitch.addEventListener("change", e => {
      this.fillRatioContainer.setAttribute("fill", e.detail.value);
    });
  },
};
fillExample.init();
```

:::

## API

### Attributes

| **属性名** | **说明**             | **类型**        | **可选值**                                                                                                                 | **默认值** |
| ---------- | -------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------- |
| alignment  | 对齐的方式           | enum            | 详见 <ea-link type="primary" href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-items">MDN align-items</ea-link> | center     |
| direction  | 排列的方向           | string          | `'vertical' \| 'horizontal'`                                                                                               | horizontal |
| spacer     | 间隔                 | string / number | -                                                                                                                          | -          |
| size       | 间隔大小             | string          | `'default' \| 'small' \| 'large'` / `string(eg: 32px)`                                                                     | default    |
| wrap       | 设置是否自动折行     | boolean         | -                                                                                                                          | false      |
| fill       | 子元素是否填充父容器 | boolean         | -                                                                                                                          | false      |
| fill-ratio | 填充父容器的比例     | number          | `0-100`                                                                                                                    | 100        |

### Slots

| **插槽名** | **说明** |
| ---------- | -------- |
| -          | 默认内容 |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明       |
| --------- | ---------- |
| container | 容器       |
| spacer    | 分隔符样式 |
