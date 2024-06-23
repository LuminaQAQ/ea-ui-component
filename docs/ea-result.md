<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

# Result 结果

用于对用户的操作结果或者异常状态做反馈。

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

## 自定义内容

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

## Attributes

| 参数      | 说明 | 类型   | 可选值 | 默认值 |
| --------- | ---- | ------ | ------ | ------ |
| icon      | 图标 | string | -      | -      |
| title     | 标题 | string | -      | -      |
| sub-title | 描述 | string | -      | -      |

## Result Slots

| 名称     | 说明     |
| -------- | -------- |
| icon     | 图标插槽 |
| title    | 标题插槽 |
| subTitle | 描述插槽 |
| extra    | 操作插槽 |
