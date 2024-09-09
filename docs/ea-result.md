<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../components/ea-result/index.js')
    import('../components/ea-button/index.js')
    import('../components/ea-avatar/index.js')
    import('./index.scss')
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
    <ea-result icon="icon-ok-circled" title="成功提示" sub-title="请根据提示进行操作">
        <template slot="extra">
            <ea-button type="success" size="small">确定</ea-button>
        </template>
    </ea-result>
    <ea-result icon="icon-attention-alt" title="警告提示" sub-title="请根据提示进行操作">
        <template slot="extra">
            <ea-button type="warning" size="small">确定</ea-button>
        </template>
    </ea-result>
    <ea-result icon="icon-cancel-circled" title="错误提示" sub-title="请根据提示进行操作">
        <template slot="extra">
            <ea-button type="danger" size="small">返回</ea-button>
        </template>
    </ea-result>
    <ea-result icon="icon-info" title="信息提示" sub-title="请根据提示进行操作">
        <template slot="extra">
            <ea-button type="primary" size="small">朕已阅</ea-button>
        </template>
    </ea-result>
</div>

::: details 查看代码

```html
<div class="row space-between">
  <ea-result
    icon="icon-ok-circled"
    title="成功提示"
    sub-title="请根据提示进行操作"
  >
    <template slot="extra">
      <ea-button type="success" size="small">确定</ea-button>
    </template>
  </ea-result>
  <ea-result
    icon="icon-attention-alt"
    title="警告提示"
    sub-title="请根据提示进行操作"
  >
    <template slot="extra">
      <ea-button type="warning" size="small">确定</ea-button>
    </template>
  </ea-result>
  <ea-result
    icon="icon-cancel-circled"
    title="错误提示"
    sub-title="请根据提示进行操作"
  >
    <template slot="extra">
      <ea-button type="danger" size="small">返回</ea-button>
    </template>
  </ea-result>
  <ea-result icon="icon-info" title="信息提示" sub-title="请根据提示进行操作">
    <template slot="extra">
      <ea-button type="primary" size="small">朕已阅</ea-button>
    </template>
  </ea-result>
</div>
```

:::

## 自定义内容

<ea-result>
  <div slot="icon">  
    <ea-avatar
        size="100"
        shape="square"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
    ></ea-avatar>
  </div>
  <div slot="title">
    <div>404</div>
  </div>
  <div slot="subTitle">
    <div>抱歉，请求错误</div>  
  </div>
  <div slot="extra">
    <ea-button type="primary" size="medium">返回</ea-button>
  </div>
</ea-result>

::: details 查看代码

```html
<ea-result>
  <template slot="icon">
    <ea-avatar
      size="100"
      shape="square"
      src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
    ></ea-avatar>
  </template>
  <template slot="title">
    <div>404</div>
  </template>
  <template slot="subTitle">
    <div>抱歉，请求错误</div>
  </template>
  <template slot="extra">
    <ea-button type="primary" size="medium">返回</ea-button>
  </template>
</ea-result>
```

:::

## Attributes

| 参数      | 说明 | 类型   | 可选值 | 默认值 |
| --------- | ---- | ------ | ------ | ------ |
| icon      | 图标 | string | -      | -      |
| title     | 标题 | string | -      | -      |
| sub-title | 描述 | string | -      | -      |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称          | 说明           |
| ------------- | -------------- |
| container     | 外层容器       |
| icon-wrap     | 图标容器       |
| title-wrap    | 标题容器       |
| subTitle-wrap | 描述容器       |
| extra-wrap    | 额外内容的容器 |

## Slots

| 名称     | 说明     |
| -------- | -------- |
| icon     | 图标插槽 |
| title    | 标题插槽 |
| subTitle | 描述插槽 |
| extra    | 操作插槽 |
