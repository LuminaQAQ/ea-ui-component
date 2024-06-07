<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../index.js')
  import('./index.scss')

})
</script>

# InputNumber 计数器

仅允许输入标准的数字值，可定义范围

## 基础用法

<div class="row left">
    <ea-input-number></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number></ea-input-number>
</div>
```

## 禁用状态

<div class="row left">
    <ea-input-number disabled></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number disabled></ea-input-number>
</div>
```

## 步数

<div class="row left">
    <ea-input-number step="2"></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number step="2"></ea-input-number>
</div>
```

## 严格步数

<div class="row left">
    <ea-input-number step="3" step-strictly></ea-input-number>
</div>

## 精度

> precision 的值必须是一个非负整数，并且不能小于 step 的小数位数。

## 尺寸

额外提供了 medium、small、mini 三种尺寸的数字输入框

## 按钮位置
