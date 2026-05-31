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

移步到 [CSS Part](#ea-result-css-part)。

## 基础用法

<div class="row space-between">
  <ea-result
    variant="primary"
    heading="Primary Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    variant="success"
    heading="Success Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    variant="warning"
    heading="Warning Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    variant="danger"
    heading="Danger Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
</div>

::: details 查看代码

```html
<div class="row space-between">
  <ea-result
    variant="primary"
    heading="Primary Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    variant="success"
    heading="Success Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    variant="warning"
    heading="Warning Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
  <ea-result
    variant="danger"
    heading="Danger Tip"
    sub-title="Please follow the instructions"
  >
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
</div>
```

:::

## 自定义内容

<div class="demo">
  <ea-result heading="404" sub-title="Sorry, request error">
    <div slot="icon">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
    </div>
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-result heading="404" sub-title="Sorry, request error">
    <div slot="icon">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
    </div>
    <div slot="extra">
      <ea-button variant="primary">Back</ea-button>
    </div>
  </ea-result>
</div>
```

:::

## 自定义图标

通过 `icon` 属性可以自定义图标，`icon` 属性优先于 `variant` 默认图标。

<div class="row space-between">
  <ea-result
    variant="success"
    heading="Success"
    sub-title="Operation completed"
    icon="star"
  >
  </ea-result>
  <ea-result
    variant="danger"
    heading="Error"
    sub-title="Something went wrong"
    icon="bug"
  >
  </ea-result>
</div>

::: details 查看代码

```html
<div class="row space-between">
  <ea-result
    variant="success"
    heading="Success"
    sub-title="Operation completed"
    icon="star"
  >
  </ea-result>
  <ea-result
    variant="danger"
    heading="Error"
    sub-title="Something went wrong"
    icon="bug"
  >
  </ea-result>
</div>
```

:::

## ea-result API

### ea-result Attributes

| 参数      | 说明                   | 类型   | 可选值                                             | 默认值 |
| --------- | ---------------------- | ------ | -------------------------------------------------- | ------ |
| variant   | 结果类型               | string | `"primary" \| "success" \| "warning" \| "danger" \| "info"` | ""     |
| heading   | 标题                   | string | —                                                  | ""     |
| sub-title | 副标题                 | string | —                                                  | ""     |
| icon      | 自定义图标，优先于 variant 默认图标 | string | — | ""     |

### ea-result CSS Part

| 名称      | 说明         |
| --------- | ------------ |
| container | 容器元素     |
| icon-wrap | 图标容器元素 |
| icon      | 图标元素     |
| title     | 标题元素     |
| sub-title | 副标题元素   |
| extra     | 额外内容元素 |

### ea-result Slots

| 名称      | 说明         |
| --------- | ------------ |
| icon      | 自定义图标   |
| title     | 自定义标题   |
| sub-title | 自定义副标题 |
| extra     | 额外内容区域 |

### ea-result CSS 自定义属性

| 属性名                              | 说明           | 默认值             |
| ----------------------------------- | -------------- | ------------------ |
| --ea-result-icon-size               | 图标尺寸       | 64px               |
| --ea-result-padding                 | 组件内边距     | 40px 30px          |
| --ea-result-title-margin-top        | 标题上边距     | 20px               |
| --ea-result-title-font-size         | 标题字体大小   | 20px               |
| --ea-result-title-color             | 标题颜色       | var(--grey-900)    |
| --ea-result-sub-title-margin-top    | 副标题上边距   | 10px               |
| --ea-result-sub-title-font-size     | 副标题字体大小 | var(--font-size-md) |
| --ea-result-sub-title-color         | 副标题颜色     | var(--grey-700)    |
| --ea-result-extra-margin-top        | 额外内容上边距 | 30px               |
