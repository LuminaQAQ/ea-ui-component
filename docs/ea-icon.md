<script setup>
import {onMounted} from "vue"

onMounted(() => {
  import("../dist/components/index.js")
})
</script>

# Icon 图标

提供了一套常用的图标集合。图标来源：[Font Awesome](https://fontawesome.com/icons)。请访问查看完整的图标列表。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-icon.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-icon";
```

:::

## 自定义样式

移步到 [CSS Part](#ea-icon-css-part)。

## 使用方法

直接通过设置 `name` 属性来使用即可。例如：

<div class="demo">
  <ea-icon name="coffee"></ea-icon>
  <ea-icon name="check" variant="solid"></ea-icon>
  <ea-icon name="github" family="brands"></ea-icon>
</div>

:::: details 查看代码

::: code-group

```html [组件形式]
<div class="demo">
  <ea-icon name="coffee"></ea-icon>
  <ea-icon name="check" variant="solid"></ea-icon>
  <ea-icon name="github" family="brands"></ea-icon>
</div>
```

```html [原生形式]
<div class="demo">
  <i class="fa-solid fa-coffee"></i>
  <i class="fa-solid fa-check"></i>
  <i class="fa-brands fa-github"></i>
</div>
```

:::

::::

## 示例

### 基础用法

<div class="demo row left">
  <ea-icon name="coffee"></ea-icon>
  <ea-icon name="check" variant="solid"></ea-icon>
  <ea-icon name="user" variant="regular"></ea-icon>
  <ea-icon name="github" family="brands"></ea-icon>
</div>

::: details 查看代码

```html
<div class="demo row left">
  <ea-icon name="coffee"></ea-icon>
  <ea-icon name="check" variant="solid"></ea-icon>
  <ea-icon name="user" variant="regular"></ea-icon>
  <ea-icon name="github" family="brands"></ea-icon>
</div>
```

:::

### 不同样式

通过 `variant` 属性设置图标样式，支持 `solid`、`regular`、`light`、`thin`、`duotone` 五种样式。

<div class="demo row left">
  <ea-icon name="heart" variant="solid" color="#ff4757"></ea-icon>
  <ea-icon name="heart" variant="regular" color="#ff4757"></ea-icon>
  <ea-icon name="star" variant="solid" color="#ffa502"></ea-icon>
  <ea-icon name="star" variant="regular" color="#ffa502"></ea-icon>
</div>

::: details 查看代码

```html
<div class="demo row left">
  <ea-icon name="heart" variant="solid" color="#ff4757"></ea-icon>
  <ea-icon name="heart" variant="regular" color="#ff4757"></ea-icon>
  <ea-icon name="star" variant="solid" color="#ffa502"></ea-icon>
  <ea-icon name="star" variant="regular" color="#ffa502"></ea-icon>
</div>
```

:::

### 设置大小

通过 `size` 属性设置图标大小，支持预设值（`small`、`medium`、`large`）和自定义数字值（单位为 px）。

<div class="demo row left">
  <ea-icon name="coffee" size="16"></ea-icon>
  <ea-icon name="coffee" size="24"></ea-icon>
  <ea-icon name="coffee" size="32"></ea-icon>
  <ea-icon name="coffee" size="48"></ea-icon>
</div>

::: details 查看代码

```html
<div class="demo row left">
  <ea-icon name="coffee" size="16"></ea-icon>
  <ea-icon name="coffee" size="24"></ea-icon>
  <ea-icon name="coffee" size="32"></ea-icon>
  <ea-icon name="coffee" size="48"></ea-icon>
</div>
```

:::

### 旋转动画

通过 `spin` 属性开启图标旋转动画。

<div class="demo row left">
  <ea-icon name="spinner" spin></ea-icon>
  <ea-icon name="circle-notch" spin></ea-icon>
  <ea-icon name="sync" spin></ea-icon>
</div>

::: details 查看代码

```html
<div class="demo row left">
  <ea-icon name="spinner" spin></ea-icon>
  <ea-icon name="circle-notch" spin></ea-icon>
  <ea-icon name="sync" spin></ea-icon>
</div>
```

:::

### 图标家族

通过 `family` 属性设置图标家族，支持 `classic`、`sharp`、`brands` 三种家族。

<div class="demo row left">
  <ea-icon name="coffee" family="classic"></ea-icon>
  <ea-icon name="github" family="brands"></ea-icon>
</div>

::: details 查看代码

```html
<div class="demo row left">
  <ea-icon name="coffee" family="classic"></ea-icon>
  <ea-icon name="github" family="brands"></ea-icon>
</div>
```

:::

## EaIcon API

### EaIcon Attributes

| 属性名  | 类型    | 可选值                                           | 默认值    | 说明                                                     |
| ------- | ------- | ------------------------------------------------ | --------- | -------------------------------------------------------- |
| name    | string  | —                                                | `""`      | 图标名称，如 `coffee`、`check`、`github`                 |
| family  | string  | `classic` / `sharp` / `brands`                   | `classic` | 图标家族                                                 |
| variant | string  | `solid` / `regular` / `light` / `thin` / `duotone` | `solid`   | 图标样式                                                 |
| size    | string  | `small` / `medium` / `large` / 自定义数字值       | `""`      | 图标大小，预设值或数字（px）                              |
| color   | string  | —                                                | `""`      | 图标颜色，支持任意 CSS 颜色值                             |
| spin    | boolean | —                                                | `false`   | 是否开启旋转动画                                         |

### EaIcon CSS Part

| 名称      | 说明         |
| --------- | ------------ |
| container | 图标容器元素 |

### EaIcon Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 默认插槽，自定义内容 |

### EaIcon CSS Custom Properties

| 属性名            | 说明     | 默认值                |
| ----------------- | -------- | --------------------- |
| --ea-icon-size    | 图标大小 | `var(--font-size-md)` |
| --ea-icon-color   | 图标颜色 | `inherit`             |
