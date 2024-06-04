<script setup>
import { onMounted, ref } from 'vue'

onMounted(() => {
  import('../index.js')
  import('./index.scss')

  // document.querySelector('#basicInput').addEventListener('change', (e) => {
  //   console.log(e.target.value)
  // })

  document.querySelector('#trigger-on-focus').suggestion = [
    { value: '张三' },
    { value: '1' },
    { value: '2' },
    { value: '李四' },
    { value: '张三' },
    { value: '李四' },
    { value: '张三' },
    { value: '李四' },
    { value: '张三' },
    { value: '李四' },
    { value: '张三' },
    { value: '李四' },
  ];
  // console.log(document.querySelector('#trigger-on-focus').suggestion)
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

> 使用 div 标签来定义前置或后置元素, 而非其他标签

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

```css
.prepend,
.append {
  background-color: #f5f7fa;
  padding: 0.5rem;
}
```

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

## 带输入建议

根据输入内容提供对应的输入建议(建议使用场景为非交互模式, 数据为静态数据)

> 因技术问题, 若案例未弹出输入建议, 需要刷新该页面

<div class="row">
  <section>
    <p>激活时列出输入建议</p>
    <ea-input id="trigger-on-focus" placeholder="请输入内容" trigger-on-focus></ea-input>
  </section>
  <section>
    <p>输入后匹配输入建议</p>
    <ea-input id="trigger-after-input" placeholder="请输入内容" trigger-after-input></ea-input>
  </section>
</div>

<!-- ## 远程搜索

从服务端搜索数据 -->

<!-- ## 输入长度限制 -->
