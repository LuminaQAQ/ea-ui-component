<script setup>
import {onMounted} from "vue"

onMounted(() => {
  import("../dist/components/index.js")
})
</script>

# Icon 图标

提供了一套常用的图标集合。图标来源：[Font Awesome](https://fontawesome.com/icons)。请访问查看完整的图标列表。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-icon/index.js";
</script>
```

## 使用方法

直接通过设置 `name` 属性来使用即可。例如：

<div class="demo">
  <ea-icon name="coffee"></ea-icon>
  <ea-icon name="check" variant="solid"></ea-icon>
  <ea-icon name="github" family="brands"></ea-icon>
</div>

<div class="demo">
  <i class="fa-solid fa-coffee"></i> <i class="fa-brands fa-github"></i>
</div>

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
  <i class="fa-solid fa-coffee"></i> <i class="fa-brands fa-github"></i>
</div>
```

:::

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

<div class="demo row left">
  <ea-icon name="heart" variant="solid" color="#ff4757"></ea-icon>
  <ea-icon name="heart" variant="regular" color="#ff4757"></ea-icon>
  <ea-icon name="star" variant="solid" color="#ffa502"></ea-icon>
  <ea-icon name="star" variant="regular" color="#ffa502"></ea-icon>
</div>

::: details 查看代码

````html
<div class="demo row left">
  <ea-icon name="heart" variant="solid" color="#ff4757"></ea-icon>
  <ea-icon name="heart" variant="regular" color="#ff4757"></ea-icon>
  <ea-icon name="star" variant="solid" color="#ffa502"></ea-icon>
  <ea-icon name="star" variant="regular" color="#ffa502"></ea-icon>
</div>
` ::: ### 设置大小

<div class="demo row left">
  <ea-icon name="coffee" size="16"></ea-icon>
  <ea-icon name="coffee" size="24"></ea-icon>
  <ea-icon name="coffee" size="32"></ea-icon>
  <ea-icon name="coffee" size="48"></ea-icon>
</div>

::: details 查看代码 ```html
<div class="demo row left">
  <ea-icon name="coffee" size="16"></ea-icon>
  <ea-icon name="coffee" size="24"></ea-icon>
  <ea-icon name="coffee" size="32"></ea-icon>
  <ea-icon name="coffee" size="48"></ea-icon>
</div>
````

:::

## Attributes

| 属性名  | 类型          | 默认值    | 说明                                                     |
| ------- | ------------- | --------- | -------------------------------------------------------- |
| name    | string        | -         | 图标名称，如 `coffee`、`check`、`github`                 |
| family  | string        | `classic` | 图标家族：`classic`、`sharp`、`brands`                   |
| variant | string        | `solid`   | 图标样式：`solid`、`regular`、`light`、`thin`、`duotone` |
| size    | string/number | -         | 图标大小                                                 |
| color   | string        | -         | 图标颜色                                                 |
