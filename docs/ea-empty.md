<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')
})
</script>

# Empty 空状态

空状态时的占位提示。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-empty.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-empty";
```

:::

## 自定义样式

移步到 [CSS Part](#empty-css-part)。

## 基础用法

通过设置 `description` 属性来配置描述文字。

<div class="demo">
  <ea-empty description="description"></ea-empty>
</div>

::: details 查看代码

```html
<ea-empty description="description"></ea-empty>
```

:::

## 自定义图片

通过设置 `image` 属性传入图片 URL。

<div class="demo">
  <ea-empty
    image="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-empty>
</div>

::: details 查看代码

```html
<ea-empty
  image="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
></ea-empty>
```

:::

## 图片尺寸

通过设置 `image-size` 属性来控制图片大小。

<div class="row">
  <ea-empty
    image-size="200px"
    image="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-empty>
</div>

::: details 查看代码

```html
<ea-empty
  image-size="200px"
  image="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
></ea-empty>
```

:::

## 底部内容

使用默认插槽可在底部插入内容。

<div class="demo">
  <ea-empty>
    <ea-button type="primary">Button</ea-button>
  </ea-empty>
</div>

::: details 查看代码

```html
<ea-empty>
  <ea-button type="primary">Button</ea-button>
</ea-empty>
```

:::

## Empty API

### Empty Attributes

| 参数        | 说明                                      | 类型   | 可选值 | 默认值 |
| ----------- | ----------------------------------------- | ------ | ------ | ------ |
| image       | 图片 URL，为空时显示默认 SVG              | string | —      | —      |
| image-size  | 图片尺寸，支持 CSS 合法尺寸值（如 200px） | string | —      | —      |
| description | 描述文字，为空时显示 "No Data"            | string | —      | —      |

### Empty CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称                 | 说明                  |
| -------------------- | --------------------- |
| container            | 外层容器              |
| placeholder          | 图片占位容器          |
| image                | 自定义图片元素        |
| default-image-front  | 默认 SVG 前景路径元素 |
| default-image-border | 默认 SVG 边框路径元素 |
| description          | 描述文字容器          |
| bottom               | 底部容器              |

### Empty Slots

| 名称        | 说明                   |
| ----------- | ---------------------- |
| default     | 默认插槽，底部操作内容 |
| image       | 自定义图片内容         |
| description | 自定义描述内容         |

### Empty CSS Custom Properties

| 属性名                           | 说明         | 默认值              |
| -------------------------------- | ------------ | ------------------- |
| --ea-empty-size                  | 图片区域尺寸 | 120px               |
| --ea-empty-image-color           | 默认图片颜色 | var(--grey-400)     |
| --ea-empty-color                 | 描述文字颜色 | var(--grey-500)     |
| --ea-empty-description-font-size | 描述文字字号 | var(--font-size-lg) |
| --ea-empty-spacing               | 元素间距     | var(--spacing-lg)   |
