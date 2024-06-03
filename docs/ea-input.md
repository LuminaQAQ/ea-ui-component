<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../index.js')
  import('./index.scss')

  document.querySelector('#basicInput').addEventListener('change', (e) => {
    console.log(e.target.value)
  })
})
</script>

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

<div class="row left">
    <ea-input id="basicInput" placeholder="请输入内容"></ea-input>
    <ea-input id="basicInput" placeholder="请输入内容" value="hello"></ea-input>
</div>

```html
<div class="row left">
  <ea-input id="basicInput" placeholder="请输入内容" value="hello"></ea-input>
</div>
```

## 禁用状态

<div class="row left">
    <ea-input id="basicInput" placeholder="请输入内容" disabled></ea-input>
    <ea-input id="basicInput" placeholder="请输入内容" value="hello" disabled></ea-input>
</div>

```html
<div class="row left">
  <ea-input id="basicInput" placeholder="请输入内容" disabled></ea-input>
  <ea-input
    id="basicInput"
    placeholder="请输入内容"
    value="hello"
    disabled
  ></ea-input>
</div>
```

## 可清空

<div class="row left">
    <ea-input id="basicInput" placeholder="这不是空的" clearable></ea-input>
    <ea-input id="basicInput" placeholder="请输入内容" value="这是空的" clearable></ea-input>
</div>

```html
<div class="row left">
  <ea-input id="basicInput" placeholder="这不是空的" clearable></ea-input>
  <ea-input
    id="basicInput"
    placeholder="请输入内容"
    value="这是空的"
    clearable
  ></ea-input>
</div>
```

## 密码框

<div class="row left">
    <ea-input id="basicInput" placeholder="这不是空的" show-password></ea-input>
    <ea-input id="basicInput" placeholder="这不是空的" value="这是空的" show-password></ea-input>
</div>

```html
<div class="row left">
  <ea-input id="basicInput" placeholder="这不是空的" show-password></ea-input>
  <ea-input
    id="basicInput"
    placeholder="这不是空的"
    value="这是空的"
    show-password
  ></ea-input>
</div>
```

## 带 icon 的输入框

带有图标标记输入类型

<div class="row left">
    <ea-input placeholder="这不是空的" prefix-icon="icon-search"></ea-input>
    <ea-input placeholder="这不是空的" suffix-icon="icon-search"></ea-input>
</div>

```html
<div class="row left">
  <ea-input placeholder="这不是空的" prefix-icon="icon-search"></ea-input>
  <ea-input placeholder="这不是空的" suffix-icon="icon-search"></ea-input>
</div>
```

## 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。

<div class="row left">
    <ea-input type="textarea" rows="2" placeholder="这不是空的"></ea-input>
</div>

```html
<div class="row left">
  <ea-input type="textarea" rows="2" placeholder="这不是空的"></ea-input>
</div>
```

## 可自适应文本高度的文本域

通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整。

<div class="col left">
    <ea-input type="textarea" placeholder="这不是空的" autosize></ea-input>
</div>

```html
<div class="col left">
  <ea-input type="textarea" placeholder="这不是空的" autosize></ea-input>
</div>
```

## 设置高度的最值

可以指定最小行数和最大行数。

<div class="col left">
    <ea-input type="textarea" placeholder="这不是空的" autosize></ea-input>
</div>

## 复合型输入框

可前置或后置元素，一般为标签或按钮

## 尺寸

## 带输入建议

根据输入内容提供对应的输入建议

## 远程搜索

从服务端搜索数据

## 输入长度限制
