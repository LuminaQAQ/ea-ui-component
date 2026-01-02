<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
})
</script>

# Result 结果

用于对用户的操作结果或者异常状态做反馈。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-result/index.js";
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

<div class="row space-between">
  <ea-result
    type="primary"
    title="Primary Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    type="success"
    title="Success Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    type="warning"
    title="Warning Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    type="error"
    title="Error Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
</div>

::: details 查看代码

```html
<div class="row space-between">
  <ea-result
    type="primary"
    title="Primary Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    type="success"
    title="Success Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    type="warning"
    title="Warning Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    type="error"
    title="Error Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
</div>
```

:::

## 自定义内容

<div class="demo">
  <ea-result title="404" sub-title="Sorry, request error">
    <div slot="icon">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
    </div>
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
</div>

```html
<div class="demo">
  <ea-result title="404" sub-title="Sorry, request error">
    <div slot="icon">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
    </div>
    <div slot="extra">
      <ea-button type="primary">Back</ea-button>
    </div>
  </ea-result>
</div>
```

## Attributes

| 参数      | 说明                  | 类型   | 可选值                                                     | 默认值 |
| --------- | --------------------- | ------ | ---------------------------------------------------------- | ------ |
| title     | result 组件的标题     | string | -                                                          | -      |
| sub-title | result 组件的副标题   | string | -                                                          | -      |
| type      | 类型                  | string | `"primary" \| "success" \| "warning" \| "info" \| "error"` | ""     |
| icon      | result 组件的图标类型 | string | -                                                          | -      |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称          | 说明           |
| ------------- | -------------- |
| container     | 外层容器       |
| icon-wrap     | 图标容器       |
| icon          | 图标           |
| title         | 标题容器       |
| subTitle-wrap | 描述容器       |
| extra-wrap    | 额外内容的容器 |

## Slots

| 名称      | 说明                |
| --------- | ------------------- |
| icon      | icon 内容           |
| title     | result title 的内容 |
| sub-title | sub title 的内容    |
| extra     | 内容额外区域的内容  |
