<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

# Backtop 回到顶部

返回页面顶部的操作按钮

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-backtop/index.js";
</script>
```

## 自定义样式

移步到 [CSS Part](#css-part)。

## 基础用法

<ea-backtop><i class="icon-angle-up"></i></ea-backtop>

<div class="demo">
    <p>滑动页面即可看到右下方的按钮。</p> 
</div>

::: details 查看代码

```html
<ea-backtop><ea-icon icon="icon-angle-up"></ea-icon></ea-backtop>
```

:::

## 自定义触发元素

<ea-backtop target="#hasTarget" bottom="100">UP</ea-backtop>

<div class="demo" id="hasTarget" style="height: 50px; overflow: auto;">
    <p>滑动该区域即可看到右下方的按钮。</p> 
    <p>滑动该区域即可看到右下方的按钮。</p> 
    <p>滑动该区域即可看到右下方的按钮。</p> 
    <p>滑动该区域即可看到右下方的按钮。</p> 
    <p>滑动该区域即可看到右下方的按钮。</p> 
</div>

::: details 显示代码

```html
<ea-backtop target="#hasTarget" bottom="100">UP</ea-backtop>

<div class="demo" id="hasTarget" style="height: 50px; overflow: auto;">
  <p>滑动该区域即可看到右下方的按钮。</p>
  <p>滑动该区域即可看到右下方的按钮。</p>
  <p>滑动该区域即可看到右下方的按钮。</p>
  <p>滑动该区域即可看到右下方的按钮。</p>
  <p>滑动该区域即可看到右下方的按钮。</p>
</div>
```

:::

## 自定义滚动到的视距

<ea-backtop bottom="160" visibility-height="500">视距</ea-backtop>

<div class="demo">
    <p>滑动页面大约 50px 即可看到右下方的按钮。</p> 
</div>

::: details 查看代码

```html
<ea-backtop bottom="160" visibility-height="500">视距</ea-backtop>

<div class="demo">
  <p>滑动页面大约 50px 即可看到右下方的按钮。</p>
</div>
```

:::

## Attributes

| 参数              | 说明               | 类型   | 可选值 | 默认值 |
| ----------------- | ------------------ | ------ | ------ | ------ |
| target            | 触发滚动的对象     | String | -      | -      |
| right             | 按钮距右侧距离     | Number | -      | 40     |
| bottom            | 按钮距底部距离     | Number | -      | 40     |
| visibility-height | 滚动到该高度才显示 | Number | -      | 200    |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明             |
| --------- | ---------------- |
| container | backtop 外层容器 |

## Events

| 事件名称   | 说明             | 回调参数 |
| ---------- | ---------------- | -------- |
| backtop    | 点击按钮时触发   | -        |
| reachedTop | 滚动到顶部时触发 | -        |
