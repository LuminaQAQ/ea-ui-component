<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../index.js')
  import('./index.scss')

  document.querySelector('#city-group').addEventListener('click', () => {
    const name = "city";
    const elements = document.querySelectorAll(`ea-checkbox[name=${name}][checked]`);

    const checkboxValueArr = [];

    elements.forEach(item => checkboxValueArr.push(item.value));

    alert(`[${checkboxValueArr}]`);
  })

  // 
  document.querySelector('#setIndeterminate').addEventListener('click', function(e) {
    document.querySelector('#checkAll').indeterminate = true;
  })

  // 
  document.querySelector('#day-group').addEventListener('click', function(e) {
    console.log(document.querySelector('#ea-checkbox-group').value);
    const name = "day";
    const elements = document.querySelectorAll(`ea-checkbox[name=${name}][checked]`);

    const checkboxValueArr = [];

    elements.forEach(item => checkboxValueArr.push(item.value));

    alert(`[${checkboxValueArr}]`);
  })

})
</script>

# Checkbox 多选框

一组备选项中进行多选

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

<div class="row left">
    <ea-checkbox name="work" value="前端">前端</ea-checkbox>
    <ea-checkbox name="work" value="后端">后端</ea-checkbox>
</div>

```html
<div class="row left">
  <ea-checkbox name="work" value="前端">前端</ea-checkbox>
  <ea-checkbox name="work" value="后端">后端</ea-checkbox>
</div>
```

## 禁用状态

多选框不可用状态。

<div class="row left">
    <ea-checkbox name="salary" value="月入3000笑哈哈">月入3000笑哈哈</ea-checkbox>
    <ea-checkbox name="salary" value="月薪过万不是梦" disabled>月薪过万不是梦</ea-checkbox>
</div>

```html
<div class="row left">
  <ea-checkbox name="salary" value="月入3000笑哈哈">月入3000笑哈哈</ea-checkbox>
  <ea-checkbox name="salary" value="月薪过万不是梦" disabled>
    月薪过万不是梦
  </ea-checkbox>
</div>
```

## 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

<div class="row left">
  <ea-checkbox-group name="city">
    <ea-checkbox value="北京">北京</ea-checkbox>
    <ea-checkbox value="上海">上海</ea-checkbox>
    <ea-checkbox value="广州">广州</ea-checkbox>
    <ea-checkbox value="深圳" disabled>深圳</ea-checkbox>
    <ea-checkbox value="成都" disabled checked>成都</ea-checkbox>
  </ea-checkbox-group>
</div>
<div class="row left">
  <ea-button id="city-group" type="primary">点击获取 checkbox 值</ea-button>
</div>

```html
<div class="row left">
  <ea-checkbox-group name="city">
    <ea-checkbox value="北京">北京</ea-checkbox>
    <ea-checkbox value="上海">上海</ea-checkbox>
    <ea-checkbox value="广州">广州</ea-checkbox>
    <ea-checkbox value="深圳" disabled>深圳</ea-checkbox>
    <ea-checkbox value="成都" disabled checked>成都</ea-checkbox>
  </ea-checkbox-group>
</div>
<div class="row left">
  <ea-button id="city-group" type="primary">点击获取 checkbox 值</ea-button>
</div>
```

`JS`获取多选值操作。

```js
document.querySelector("#city-group").addEventListener("click", () => {
  const name = "city";
  const elements = document.querySelectorAll(
    `ea-checkbox[name=${name}][checked]`
  );

  const checkboxValueArr = [];

  elements.forEach((item) => checkboxValueArr.push(item.value));

  alert(`[${checkboxValueArr}]`);
});
```

## indeterminate 状态

indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

<div class="row left">
  <ea-checkbox id="checkAll" name="food">全选</ea-checkbox>
  <ea-button id="setIndeterminate" type="primary">设置 indeterminate 状态</ea-button>
</div>

```html
<div class="row left">
  <ea-checkbox id="checkAll" name="food">全选</ea-checkbox>
  <ea-button id="setIndeterminate" type="primary">
    设置 indeterminate 状态
  </ea-button>
</div>
```

`JS` 操作 indeterminate 状态。

```js
document
  .querySelector("#setIndeterminate")
  .addEventListener("click", function (e) {
    document.querySelector("#checkAll").indeterminate = true;
  });
```

## 多选框组 value 属性

<div class="row left">
  <ea-checkbox-group id="ea-checkbox-group" name="day" value="今天, 明天" disabled>
    <ea-checkbox value="前天">前天</ea-checkbox>
    <ea-checkbox value="昨天">昨天</ea-checkbox>
    <ea-checkbox value="今天">今天</ea-checkbox>
    <ea-checkbox value="明天">明天</ea-checkbox>
    <ea-checkbox value="后天">后天</ea-checkbox>
  </ea-checkbox-group>
</div>
<div class="row left">
  <ea-button id="day-group" type="primary">点击获取 checkbox 值</ea-button>
</div>
