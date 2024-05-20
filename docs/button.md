<script setup>
import { onMounted } from 'vue'
  onMounted(() => {
    import('../index.js')
    import('./css/index.scss')
  })
</script>

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

## 文字按钮 `text`

<div class="row left">
  <ea-button type="text">文字按钮</ea-button>
  <ea-button type="text" disabled>文字按钮</ea-button>
</div>

```html
<div class="row left">
  <ea-button type="text">文字按钮</ea-button>
  <ea-button type="text" disabled>文字按钮</ea-button>
</div>
```

## 按钮组 `button-group`

<div class="row left">
  <ea-button-group>
    <ea-button type="primary">上一页</ea-button>
    <ea-button type="primary">下一页</ea-button>
  </ea-button-group>
  <ea-button-group>
    <ea-button type="primary">后退</ea-button>
    <ea-button type="primary">刷新</ea-button>
    <ea-button type="primary">前进</ea-button>
  </ea-button-group>
</div>

```html
<ea-button-group>
  <ea-button type="primary">上一页</ea-button>
  <ea-button type="primary">下一页</ea-button>
</ea-button-group>
<ea-button-group>
  <ea-button type="primary">后退</ea-button>
  <ea-button type="primary">刷新</ea-button>
  <ea-button type="primary">前进</ea-button>
</ea-button-group>
```

## 加载中 `loading`

## 不同尺寸 `size`

<div class="row">
  <ea-button round>默认按钮</ea-button>
  <ea-button size="medium" round>中等按钮</ea-button>
  <ea-button size="small" round>小型按钮</ea-button>
  <ea-button size="mini" round>超小按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button round>默认按钮</ea-button>
  <ea-button size="medium" round>中等按钮</ea-button>
  <ea-button size="small" round>小型按钮</ea-button>
  <ea-button size="mini" round>超小按钮</ea-button>
</div>
```
