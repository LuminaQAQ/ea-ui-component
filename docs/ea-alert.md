<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

# Alert 警告

用于页面中展示重要的提示信息。

## 基本用法

页面中的非浮层元素，不会自动消失

> Alert 组件提供四种主题, 由 `type` 属性指定, 默认值为 `info`。

<div class="demo">
    <ea-alert title="成功提示的文案" type="success"></ea-alert>
    <ea-alert title="消息提示的文案" type="info"></ea-alert>
    <ea-alert title="警告提示的文案" type="warning"></ea-alert>
    <ea-alert title="错误提示的文案" type="error"></ea-alert>
</div>

```html
<div class="demo">
  <ea-alert title="成功提示的文案" type="success"></ea-alert>
  <ea-alert title="消息提示的文案" type="info"></ea-alert>
  <ea-alert title="警告提示的文案" type="warning"></ea-alert>
  <ea-alert title="错误提示的文案" type="error"></ea-alert>
</div>
```

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。

<div class="demo">
    <ea-alert effect="dark" title="成功提示的文案" type="success"></ea-alert>
    <ea-alert effect="dark" title="消息提示的文案" type="info"></ea-alert>
    <ea-alert effect="dark" title="警告提示的文案" type="warning"></ea-alert>
    <ea-alert effect="dark" title="错误提示的文案" type="error"></ea-alert>
</div>

## 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

## 带有 icon

表示某种状态时提升可读性。

## 文字居中

使用 center 属性让文字水平居中。

## 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

## 带有 icon 和辅助性文字介绍
