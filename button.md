<script setup>
import { onMounted } from 'vue'
  onMounted(() => {
    import('./js/ea-ui.js')
  })
</script>

<style>
    .row {
        display: flex;
        justify-content: space-around;
    }
</style>

# Button 按钮

常用的操作按钮。

## 基础用法 `normal`

<div class="row">
    <ea-button>默认按钮</ea-button>
    <ea-button type="primary">主要按钮</ea-button>
    <ea-button type="success">成功按钮</ea-button>
    <ea-button type="warning">警告按钮</ea-button>
    <ea-button type="danger">危险按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button>默认按钮</ea-button>
  <ea-button type="primary">主要按钮</ea-button>
  <ea-button type="success">成功按钮</ea-button>
  <ea-button type="warning">警告按钮</ea-button>
  <ea-button type="danger">危险按钮</ea-button>
</div>
```

## 朴素按钮 `plain`

<div class="row">
    <ea-button plain>朴素按钮</ea-button>
    <ea-button type="primary" plain>主要按钮</ea-button>
    <ea-button type="success" plain>成功按钮</ea-button>
    <ea-button type="warning" plain>警告按钮</ea-button>
    <ea-button type="danger" plain>危险按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button plain>朴素按钮</ea-button>
  <ea-button type="primary" plain>主要按钮</ea-button>
  <ea-button type="success" plain>成功按钮</ea-button>
  <ea-button type="warning" plain>警告按钮</ea-button>
  <ea-button type="danger" plain>危险按钮</ea-button>
</div>
```

## 圆角按钮 `round`

<div class="row">
    <ea-button round>圆角按钮</ea-button>
    <ea-button type="primary" round>主要按钮</ea-button>
    <ea-button type="success" round>成功按钮</ea-button>
    <ea-button type="warning" round>警告按钮</ea-button>
    <ea-button type="danger" round>危险按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button round>圆角按钮</ea-button>
  <ea-button type="primary" round>主要按钮</ea-button>
  <ea-button type="success" round>成功按钮</ea-button>
  <ea-button type="warning" round>警告按钮</ea-button>
  <ea-button type="danger" round>危险按钮</ea-button>
</div>
```

## 禁用按钮 `disabled`

<div class="row">
  <ea-button disabled>禁用按钮</ea-button>
  <ea-button type="primary" disabled>主要按钮</ea-button>
  <ea-button type="success" disabled>成功按钮</ea-button>
  <ea-button type="warning" disabled>警告按钮</ea-button>
  <ea-button type="danger" disabled>危险按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button disabled>禁用按钮</ea-button>
  <ea-button type="primary" disabled>主要按钮</ea-button>
  <ea-button type="success" disabled>成功按钮</ea-button>
  <ea-button type="warning" disabled>警告按钮</ea-button>
  <ea-button type="danger" disabled>危险按钮</ea-button>
</div>
```
