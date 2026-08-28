<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')
})
</script>

<style>
  .affix-container {
    text-align: center;
    height: 400px;
    border-radius: 4px;
    background: var(--primary-color);
  }
</style>

# Affix 固钉

固钉组件，将页面元素固定在可视范围内，常用于侧边导航或操作按钮。

## 引入

::: code-group

```html [原生引入]
<script
  type="module"
  src="./node_modules/easy-component-ui/dist/components/ea-affix.js"
></script>
<script
  type="module"
  src="./node_modules/easy-component-ui/dist/components/ea-button.js"
></script>
```

```html [Vite 导入]
import 'easy-component-ui/ea-affix' import 'easy-component-ui/ea-button'
```

:::

## 基础用法

默认固定到页面顶部，通过 `offset` 属性设置距离顶部的偏移量。

<div class="demo">
  <ea-affix offset="120">
    <ea-button variant="primary">Offset top 120px</ea-button>
  </ea-affix>
</div>

::: details 查看代码

```html
<ea-affix offset="120">
  <ea-button variant="primary">Offset top 120px</ea-button>
</ea-affix>
```

:::

## 指定容器

通过 `target` 属性指定固定容器，组件将在该容器范围内固定，超出容器后随滚动离开。

<div class="demo">
  <div class="affix-container">
    <ea-affix target=".affix-container" offset="80">
      <ea-button variant="primary">Target container</ea-button>
    </ea-affix>
  </div>
</div>

::: details 查看代码

```html
<div class="affix-container">
  <ea-affix target=".affix-container" offset="80">
    <ea-button variant="primary">Target container</ea-button>
  </ea-affix>
</div>
```

```css
.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--primary-color);
}
```

:::

## 固定位置

通过 `position="bottom"` 将组件固定到页面底部，`offset` 表示距离底部的偏移量。

<div class="demo">
  <ea-affix position="bottom" offset="20">
    <ea-button variant="primary">Offset bottom 20px</ea-button>
  </ea-affix>
</div>

::: details 查看代码

```html
<ea-affix position="bottom" offset="20">
  <ea-button variant="primary">Offset bottom 20px</ea-button>
</ea-affix>
```

:::

## Affix API

### Affix Attributes

| 参数     | 说明                                 | 类型   | 可选值          | 默认值 |
| -------- | ------------------------------------ | ------ | --------------- | ------ |
| offset   | 固定时距离视口（或目标容器）的偏移量 | Number | —               | 0      |
| target   | 指定固定的容器选择器                 | String | —               | ""     |
| position | 固定位置                             | String | `top \| bottom` | top    |

### Affix CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明         |
| --------- | ------------ |
| container | 固钉容器元素 |

### Affix Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| default | 默认插槽，需要固定的内容 |

### Affix CSS Custom Properties

| 名称              | 说明                     |
| ----------------- | ------------------------ |
| --ea-affix-x      | 固钉水平偏移位置         |
| --ea-affix-y      | 固钉垂直偏移位置         |
| --ea-affix-width  | 固钉宽度，固定时保持原宽 |
| --ea-affix-height | 固钉高度，固定时保持原高 |
