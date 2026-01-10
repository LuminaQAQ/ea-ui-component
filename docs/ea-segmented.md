<script setup>
  import { onMounted } from "vue";
  import "../dist/components/index.js";
  import "../dist/assets/icon.css";

  onMounted(() => {
    const basicExample = {
      els: [
        document.querySelector("#basicSegmentedLarge"),
        document.querySelector("#basicSegmentedDefault"),
        document.querySelector("#basicSegmentedSmall"),
      ],
      options: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

      init() {
        this.els.forEach(el => {
          el.options = this.options;

          el.addEventListener("change", e => {
            this.els.forEach(el => {
              el.value = e.detail.value;
            });
          });
        });
      },
    };

    const directionExample = {
      sizeSegmented: document.querySelector("#sizeSegmented"),
      directionSegmented: document.querySelector("#directionSegmented"),
      directionSegmentedOptions: document.querySelector(
        "#directionSegmentedOptions"
      ),
      sizeOptions: ["large", "default", "small"],
      directionOptions: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
      ],
      options: [
        { label: "Apple", value: "Apple" },
        { label: "Cherry", value: "Cherry" },
        { label: "Grape", value: "Grape" },
        { label: "Orange", value: "Orange" },
        { label: "Pear", value: "Pear" },
        { label: "Watermelon", value: "Watermelon", disabled: true },
      ],

      init() {
        this.sizeSegmented.options = this.sizeOptions;
        this.directionSegmented.options = this.directionOptions;
        this.directionSegmentedOptions.options = this.options;

        this.sizeSegmented.addEventListener("change", e => {
          this.directionSegmentedOptions.size = e.detail.value;
        });

        this.directionSegmented.addEventListener("change", e => {
          this.directionSegmentedOptions.direction = e.detail.value;
        });
      },
    };

    const disabledExample = {
      disabledSegmented1: document.querySelector("#disabledSegmented1"),
      disabledSegmented2: document.querySelector("#disabledSegmented2"),

      options: [
        { label: "Mon", value: "Mon", disabled: true },
        { label: "Tue", value: "Tue" },
        { label: "Wed", value: "Wed", disabled: true },
        { label: "Thu", value: "Thu" },
        { label: "Fri", value: "Fri", disabled: true },
        { label: "Sat", value: "Sat" },
        { label: "Sun", value: "Sun" },
      ],

      init() {
        this.disabledSegmented1.options = this.options;
        this.disabledSegmented2.options = this.options;

        this.disabledSegmented1.addEventListener("change", e => {
          this.disabledSegmented2.value = e.detail.value;
        });

        this.disabledSegmented2.addEventListener("change", e => {
          this.disabledSegmented1.value = e.detail.value;
        });
      },
    };

    const customExample = {
      customSegmented: document.querySelector("#customSegmented"),
      options: [
        { myLabel: "Mon", myValue: "Mon", myDisabled: true },
        { myLabel: "Tue", myValue: "Tue" },
        { myLabel: "Wed", myValue: "Wed", myDisabled: true },
        { myLabel: "Thu", myValue: "Thu" },
        { myLabel: "Fri", myValue: "Fri", myDisabled: true },
        { myLabel: "Sat", myValue: "Sat" },
        { myLabel: "Sun", myValue: "Sun" },
      ],

      init() {
        this.customSegmented.propsConfiguration = {
          label: "myLabel",
          value: "myValue",
          disabled: "myDisabled",
        };
        this.customSegmented.options = this.options;
      },
    };

    const blockExample = {
      blockSegmented: document.querySelector("#blockSegmented"),
      options: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sunday long long long long long long long",
      ],

      init() {
        this.blockSegmented.options = this.options;
      },
    };

    const customStyleExample = {
      blockSegmented: document.querySelector("#customStyleSegmented"),
      options: [
        { label: "Apple", value: "Apple" },
        { label: "Cherry", value: "Cherry" },
        { label: "Grape", value: "Grape" },
        { label: "Orange", value: "Orange" },
        { label: "Pear", value: "Pear" },
        { label: "Watermelon", value: "Watermelon" },
      ],

      init() {
        this.blockSegmented.options = this.options;
      },
    };

    basicExample.init();
    directionExample.init();
    disabledExample.init();
    customExample.init();
    blockExample.init();
    customStyleExample.init();
  });
</script>

<style scoped>
  #customStyleSegmented {
    --ea-segmented-item-checked-color: black;
    --ea-segmented-indicator-color: #ffd100;
    --ea-segmented-border-radius: 16px;
  }

  .demo {
    display: flex;
    flex-direction: column;
  }

  #customStyleSegmented {
    --ea-segmented-item-checked-color: black;
    --ea-segmented-indicator-color: #ffd100;
    --ea-segmented-border-radius: 16px;
  }
</style>

# Segmented 分段选择器

分段选择器用于在一组互斥的选项中进行选择。

## 引入

`js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-segmented/index.js";
</script>
```

> `css`

::: tip
如果需要使用到带图标的属性/组件，需提前通过 `link` 引入图标样式
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 基础用法

设置 `options` 为选项值。

<div class="demo col left">
  <ea-segmented id="basicSegmentedLarge" name="week" value="Mon" size="large"></ea-segmented>
  <ea-segmented id="basicSegmentedDefault" name="week" value="Mon" size="default"></ea-segmented>
  <ea-segmented id="basicSegmentedSmall" name="week" value="Mon" size="small"></ea-segmented>
</div>

```html
<div class="demo">
  <ea-segmented
    id="basicSegmentedLarge"
    name="week"
    value="Mon"
    size="large"
  ></ea-segmented>
  <ea-segmented
    id="basicSegmentedDefault"
    name="week"
    value="Mon"
    size="default"
  ></ea-segmented>
  <ea-segmented
    id="basicSegmentedSmall"
    name="week"
    value="Mon"
    size="small"
  ></ea-segmented>
</div>
```

## 配置方向

设置 `vertical` 来改变方向。

<div class="demo col left">
  <ea-segmented id="sizeSegmented" name="size" value="default"></ea-segmented>
  <ea-segmented id="directionSegmented" name="direction" value="horizontal"></ea-segmented>
  <ea-segmented id="directionSegmentedOptions" name="fruit" value="Apple"></ea-segmented>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-segmented id="sizeSegmented" name="size" value="default"></ea-segmented>
  <ea-segmented
    id="directionSegmented"
    name="direction"
    value="horizontal"
  ></ea-segmented>
  <ea-segmented
    id="directionSegmentedOptions"
    name="fruit"
    value="Apple"
  ></ea-segmented>
</div>
```

:::

## 禁用状态

设置 `disabled` 属性来禁用一些选项。

<div class="demo col left">
  <ea-segmented id="disabledSegmented1" name="week" value="Mon" disabled></ea-segmented>
  <ea-segmented id="disabledSegmented2" name="week" value="Mon"></ea-segmented>
</div>

```html
<div class="demo">
  <ea-segmented
    id="disabledSegmented1"
    name="week"
    value="Mon"
    disabled
  ></ea-segmented>
  <ea-segmented id="disabledSegmented2" name="week" value="Mon"></ea-segmented>
</div>
```

## 自定义选项

当您的 `options` 格式不同于默认格式时，可通过 `propsConfiguration` 属性自定义 `options`

<div class="demo col left">
  <ea-segmented id="customSegmented" name="week" value="Mon"></ea-segmented>
</div>

```html
<div class="demo">
  <ea-segmented id="customSegmented" name="week" value="Mon"></ea-segmented>
</div>
```

## Block 分段选择器

设置 `block` 为 `true` 以适应父元素的宽度。

<div class="demo col left">
  <ea-segmented id="blockSegmented" name="week" value="Mon" block></ea-segmented>
</div>

```html
<div class="demo">
  <ea-segmented
    id="blockSegmented"
    name="week"
    value="Mon"
    block
  ></ea-segmented>
</div>
```

## 自定义样式

<div class="demo">
  <ea-segmented id="customStyleSegmented" name="fruit" value="Apple"></ea-segmented>
</div>

::: code-group

```html
<div class="demo">
  <ea-segmented
    id="customStyleSegmented"
    name="fruit"
    value="Apple"
  ></ea-segmented>
</div>
```

```css
#customStyleSegmented {
  --ea-segmented-item-checked-color: black;
  --ea-segmented-indicator-color: #ffd100;
  --ea-segmented-border-radius: 16px;
}
```

:::

## API

### Attributes

| 参数                                     | 说明                                 | 类型    | 可选值                       | 默认值                                                     |
| ---------------------------------------- | ------------------------------------ | ------- | ---------------------------- | ---------------------------------------------------------- |
| value                                    | 当前选中值                           | string  | -                            | ""                                                         |
| options <ea-tag>prop</ea-tag>            | 选项列表（可为字符串数组或对象数组） | array   | -                            | `[ ]`                                                      |
| propsConfiguration <ea-tag>prop</ea-tag> | 自定义选项字段映射                   | object  | `{ label, value, disabled }` | `{ label: 'label', value: 'value', disabled: 'disabled' }` |
| size                                     | 组件尺寸                             | string  | `large \| default \| small`  | default                                                    |
| block                                    | 是否在父容器内占满宽度（块级）       | boolean | -                            | false                                                      |
| direction                                | 排列方向                             | string  | `horizontal \| vertical`     | horizontal                                                 |
| disabled                                 | 是否禁用整个组件                     | boolean | -                            | false                                                      |

### CSS Part

| 名称      | 说明                             |
| --------- | -------------------------------- |
| container | 组件根元素，part="container"     |
| item      | 每个选项的容器，part="item"      |
| label     | 选项标签，part="label"           |
| input     | 原生 input，part="input"         |
| indicator | 当前选中指示器，part="indicator" |

### Events

| 事件名 | 说明           |
| ------ | -------------- |
| change | 选项改变时触发 |
