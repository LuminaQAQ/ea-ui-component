<script setup>
import { onMounted, ref } from 'vue'

onMounted(() => {
  import('../index.js')
  import('./index.scss')

  // document.querySelector('#basicInput').addEventListener('change', (e) => {
  //   console.log(e.target.value)
  // })
})
</script>

<style lang="scss" scoped>
  .prepend,
  .append {
    background-color: #f5f7fa;
    padding: 0.5rem;
  }
</style>

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

## 复合型输入框

可前置或后置元素，一般为标签或按钮

<div class="col left">
    <ea-input placeholder="假装有网址">
      <div class="prepend" slot="prepend">Http://</div>
    </ea-input>
    <ea-input placeholder="假装有网址">
      <div class="append" slot="append">.com</div>
    </ea-input>
    <ea-input placeholder="假装有网址">
      <div class="prepend" slot="prepend">Http://</div>
      <div class="append" slot="append">
        <i class="icon-search"></i>
      </div>
    </ea-input>
</div>

```html
<div class="col left">
  <ea-input placeholder="假装有网址">
    <div class="prepend" slot="prepend">Http://</div>
  </ea-input>
  <ea-input placeholder="假装有网址">
    <div class="append" slot="append">.com</div>
  </ea-input>
  <ea-input placeholder="假装有网址">
    <div class="prepend" slot="prepend">Http://</div>
    <div class="append" slot="append">
      <i class="icon-search"></i>
    </div>
  </ea-input>
</div>
```

<!-- ## 尺寸 -->

<!-- ## 带输入建议

根据输入内容提供对应的输入建议 -->

<!-- ## 远程搜索

从服务端搜索数据 -->

<!-- ## 输入长度限制 -->
