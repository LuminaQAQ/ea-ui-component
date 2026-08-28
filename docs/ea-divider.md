<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')
})
</script>

<style>
  .demo .vertical-wrapper {
    display: inline-flex;
    align-items: center;
    height: 48px;
    gap: 4px;
  }
</style>

# Divider 分隔线

分隔线组件，用于分隔内容区块，支持水平 / 垂直方向、不同分隔线样式和文案位置。

## 引入

::: code-group

```html [原生引入]
<script
  type="module"
  src="./node_modules/easy-component-ui/dist/components/ea-divider.js"
></script>
```

```html [Vite 导入]
import 'easy-component-ui/ea-divider'
```

:::

## 基础用法

默认使用水平分隔线，通过 `variant` 属性可设置 `dashed`（虚线）或 `dotted`（点线）样式。

<div class="demo">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
    quo modo.
  </p>
  <ea-divider></ea-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
    quo modo.
  </p>
  <ea-divider variant="dashed"></ea-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
    quo modo.
  </p>
  <ea-divider variant="dotted"></ea-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
    quo modo.
  </p>
</div>

::: details 查看代码

```html
<ea-divider></ea-divider>
<ea-divider variant="dashed"></ea-divider>
<ea-divider variant="dotted"></ea-divider>
```

:::

## 设置文案

通过 `content-position` 属性设置文案位置，支持 `start`（居左）、`center`（居中，默认）、`end`（居右）。也可通过插槽插入自定义内容。

<div class="demo">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
    quo modo.
  </p>
  <ea-divider content-position="start">Rabindranath Tagore</ea-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
    quo modo.
  </p>
  <ea-divider>
    <ea-icon name="star"></ea-icon>
  </ea-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
    quo modo.
  </p>
  <ea-divider content-position="end">Rabindranath Tagore</ea-divider>
</div>

::: details 查看代码

```html
<ea-divider content-position="start">Rabindranath Tagore</ea-divider>
<ea-divider>
  <ea-icon name="star"></ea-icon>
</ea-divider>
<ea-divider content-position="end">Rabindranath Tagore</ea-divider>
```

:::

## 垂直分隔线

通过 `direction="vertical"` 设置垂直分隔线，用于行内元素的分隔。

<div class="demo">
  <div class="vertical-wrapper">
    <span>Rain</span>
    <ea-divider direction="vertical"></ea-divider>
    <span>Home</span>
    <ea-divider direction="vertical" variant="dashed"></ea-divider>
    <span>Grass</span>
  </div>
</div>

::: details 查看代码

```html
<span>Rain</span>
<ea-divider direction="vertical"></ea-divider>
<span>Home</span>
<ea-divider direction="vertical" variant="dashed"></ea-divider>
<span>Grass</span>
```

:::

## Divider API

### Divider Attributes

| 参数               | 说明       | 类型     | 可选值                        | 默认值       |
| ------------------ | ---------- | -------- | ----------------------------- | ------------ |
| `variant`          | 分隔线类型 | `string` | `solid` / `dashed` / `dotted` | `solid`      |
| `content-position` | 文案位置   | `string` | `start` / `center` / `end`    | `center`     |
| `direction`        | 分隔线方向 | `string` | `horizontal` / `vertical`     | `horizontal` |

### Divider CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明         |
| ----------- | ------------ |
| `container` | 容器元素     |
| `content`   | 文案内容元素 |
| `line`      | 分隔线元素   |

### Divider Slots

| 名称      | 说明                                 |
| --------- | ------------------------------------ |
| `default` | 默认插槽，分隔线中间的自定义文案内容 |

### Divider CSS Custom Properties

| 属性                              | 说明                        | 默认值                    |
| --------------------------------- | --------------------------- | ------------------------- |
| `--ea-divider-border-color`       | 分隔线边框颜色              | `var(--grey-300)`         |
| `--ea-divider-border-style`       | 分隔线边框样式              | `solid`                   |
| `--ea-divider-horizontal-spacing` | 水平方向上下间距            | `24px`                    |
| `--ea-divider-vertical-spacing`   | 垂直方向左右间距            | `var(--spacing-md)`       |
| `--ea-divider-text-spacing`       | 文案左右间距                | `var(--spacing-lg)`       |
| `--ea-divider-line-proportion`    | 文案居左/居右时短边线的比例 | `0.05`                    |
| `--ea-divider-border-radius`      | 组件边框圆角                | `var(--border-radius-sm)` |
| `--ea-divider-font-size`          | 文案字体大小                | `var(--font-size-md)`     |
| `--ea-divider-transition`         | 组件过渡动画                | `var(--transition-fast)`  |
| `--ea-divider-text`               | 文案文字颜色                | `var(--grey-900)`         |
| `--ea-divider-bg`                 | 背景颜色                    | `var(--color-white)`      |
