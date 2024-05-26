<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../index.js')
  import('./index.scss')
})
</script>

# Link 文字链接

文字超链接

## 基础用法

基础的文字链接用法。

<div class="row left">
    <ea-link href="https://github.com/LuminaQAQ">默认链接</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="primary">主要链接</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="success">成功链接</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="warning">警告链接</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="danger">危险链接</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="info">信息链接</ea-link>
</div>

```html
<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ">默认链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="primary">主要链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="success">成功链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="warning">警告链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="danger">危险链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="info">信息链接</ea-link>
</div>
```

## 禁用状态

文字链接不可用状态。

<div class="row left">
    <ea-link type="primary" href="https://github.com/LuminaQAQ">未禁用状态</ea-link>
    <ea-link disabled>禁用状态</ea-link>
</div>

```html
<div class="row left">
  <ea-link type="primary" href="https://github.com/LuminaQAQ"
    >未禁用状态</ea-link
  >
  <ea-link disabled>禁用状态</ea-link>
</div>
```

## 下划线

文字链接下划线。

<div class="row left">
    <ea-link>无下划线</ea-link>
    <ea-link type="primary" underline>下划线</ea-link>
</div>

```html
<div class="row left">
  <ea-link>无下划线</ea-link>
  <ea-link type="primary" underline>下划线</ea-link>
</div>
```

## 图标

带图标的文字链接可增强辨识度。

<div class="row left">
    <ea-link icon="icon-eye">查看</ea-link>
    <ea-link icon="icon-share">分享</ea-link>
</div>

```html
<div class="row left">
  <ea-link icon="icon-eye">查看</ea-link>
  <ea-link icon="icon-share">分享</ea-link>
</div>
```
