<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

# Backtop 回到顶部

返回页面顶部的操作按钮

## 基础用法

滑动页面即可看到右下方的按钮。

<ea-backtop><i class="icon-angle-up"></i></ea-backtop>

<div class="demo">
    <p>滑动页面即可看到右下方的按钮。</p> 
</div>

```html
<ea-backtop><i class="icon-angle-up"></i></ea-backtop>
```

## 自定义触发元素

<ea-backtop target="#hasTarget" bottom="100">UP</ea-backtop>

<div class="demo" id="hasTarget" style="height: 50px; overflow: auto;">
    <p>滑动页面即可看到右下方的按钮。</p> 
    <p>滑动页面即可看到右下方的按钮。</p> 
    <p>滑动页面即可看到右下方的按钮。</p> 
    <p>滑动页面即可看到右下方的按钮。</p> 
    <p>滑动页面即可看到右下方的按钮。</p> 
</div>

```html
<ea-backtop target="#hasTarget" bottom="100">UP</ea-backtop>

<div class="demo" id="hasTarget" style="height: 50px; overflow: auto;">
  <p>滑动页面即可看到右下方的按钮。</p>
  <p>滑动页面即可看到右下方的按钮。</p>
  <p>滑动页面即可看到右下方的按钮。</p>
  <p>滑动页面即可看到右下方的按钮。</p>
  <p>滑动页面即可看到右下方的按钮。</p>
</div>
```

## 自定义滚动到的视距

<ea-backtop bottom="160" visibility-height="50">视距</ea-backtop>

<div class="demo">
    <p>滑动页面大约 50px 即可看到右下方的按钮。</p> 
</div>

```html
<ea-backtop bottom="160" visibility-height="50">视距</ea-backtop>

<div class="demo">
  <p>滑动页面大约 50px 即可看到右下方的按钮。</p>
</div>
```

## Attributes

| 参数              | 说明               | 类型   | 可选值 | 默认值 |
| ----------------- | ------------------ | ------ | ------ | ------ |
| target            | 触发滚动的对象     | String | -      | -      |
| right             | 按钮距右侧距离     | Number | -      | 40     |
| bottom            | 按钮距底部距离     | Number | -      | 40     |
| visibility-height | 滚动到该高度才显示 | Number | -      | 200    |

## Events

| 事件名称 | 说明           | 回调参数 |
| -------- | -------------- | -------- |
| click    | 点击按钮时触发 | -        |
