<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
    
    document.querySelectorAll(".dynamic-closable-tag").forEach(item => {
        item.addEventListener("close", function (e) {
            this.remove();
            console.log('标签被移除', e.target, e.detail.value);
        })
    })
})
</script>

# Tag 标签

用于标记和选择。

## 基础用法

<div class="row left">
    <ea-tag>默认标签</ea-tag>
    <ea-tag type="success">成功标签</ea-tag>
    <ea-tag type="info">信息标签</ea-tag>
    <ea-tag type="warning">警告标签</ea-tag>
    <ea-tag type="danger">危险标签</ea-tag>
</div>

```html
<div class="row left">
  <ea-tag>默认标签</ea-tag>
  <ea-tag type="success">成功标签</ea-tag>
  <ea-tag type="info">信息标签</ea-tag>
  <ea-tag type="warning">警告标签</ea-tag>
  <ea-tag type="danger">危险标签</ea-tag>
</div>
```

## 可移除标签

<div class="row left">
    <ea-tag closable>默认标签</ea-tag>
    <ea-tag type="success" closable>成功标签</ea-tag>
    <ea-tag type="info" closable>信息标签</ea-tag>
    <ea-tag type="warning" closable>警告标签</ea-tag>
    <ea-tag type="danger" closable>危险标签</ea-tag>
</div>

```html
<div class="row left">
  <ea-tag closable>默认标签</ea-tag>
  <ea-tag type="success" closable>成功标签</ea-tag>
  <ea-tag type="info" closable>信息标签</ea-tag>
  <ea-tag type="warning" closable>警告标签</ea-tag>
  <ea-tag type="danger" closable>危险标签</ea-tag>
</div>
```

## 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现

<div class="row left">
    <ea-tag class="dynamic-closable-tag" closable>默认标签</ea-tag>
    <ea-tag class="dynamic-closable-tag" type="success" closable>成功标签</ea-tag>
    <ea-tag class="dynamic-closable-tag" type="info" closable>信息标签</ea-tag>
    <ea-tag class="dynamic-closable-tag" type="warning" closable>警告标签</ea-tag>
    <ea-tag class="dynamic-closable-tag" type="danger" closable>危险标签</ea-tag>
    <ea-input></ea-input>
</div>

```html
<div class="row left">
  <ea-tag class="dynamic-closable-tag" closable>默认标签</ea-tag>
  <ea-tag class="dynamic-closable-tag" type="success" closable>成功标签</ea-tag>
  <ea-tag class="dynamic-closable-tag" type="info" closable>信息标签</ea-tag>
  <ea-tag class="dynamic-closable-tag" type="warning" closable>警告标签</ea-tag>
  <ea-tag class="dynamic-closable-tag" type="danger" closable>危险标签</ea-tag>
</div>
```

`JS`: `close` 事件

> 为了适应可能出现的特殊场景, 所以并未在框架内部添加 `DOM` 移除事件

```js
document.querySelectorAll(".dynamic-closable-tag").forEach((item) => {
  item.addEventListener("close", function (e) {
    // 移除该dom
    this.remove();

    // e.target: 当前标签; e.detail.value: 当前标签的 value 值
    console.log("标签被移除", e.target, e.detail.value);
  });
});
```

## 不同尺寸

Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

## 不同主题

Tag 组件提供了三个不同的主题：dark、light 和 plain
