<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../index.js')
  import('./index.scss')

  document.querySelector('#getCheckedValue').addEventListener('click', (e) => {
    const name = 'gender';
    const node = document.querySelector(`ea-radio[name=${name}][checked]`);
    window.alert(`您选中的是: name 为 ${name}, 值为 ${node.value} 的单选框选项`);
  })
})
</script>

# Radio 单选框

在一组备选项中进行单选

## 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

<div class="row left">
    <ea-radio name="city" value="福州" checked>福州</ea-radio>
    <ea-radio name="city" value="厦门">厦门</ea-radio>
</div>

```html
<div class="row left">
  <ea-radio name="city" value="福州" checked>福州</ea-radio>
  <ea-radio name="city" value="厦门">厦门</ea-radio>
</div>
```

## 禁用状态

单选框不可用的状态。

<div class="row left">
  <ea-radio name="work" value="前端切图仔" checked disabled>前端切图仔</ea-radio>
  <ea-radio name="work" value="后端CRUD工程师" disabled>后端CRUD工程师</ea-radio>
</div>

```html
<div class="row left">
  <ea-radio name="work" value="前端切图工程师" checked disabled>
    前端切图仔
  </ea-radio>
  <ea-radio name="work" value="后端CRUD工程师" disabled>
    后端CRUD工程师
  </ea-radio>
</div>
```

## 单选框组

适用于在多个互斥的选项中选择的场景

<div class="row left">
  <ea-radio-group name="salary">
    <ea-radio value="月入3000笑哈哈" checked>月入3000笑哈哈</ea-radio>
    <ea-radio value="月薪过万不是梦">月薪过万不是梦</ea-radio>
  </ea-radio-group>
</div>

```html
<ea-radio-group name="salary">
  <ea-radio value="月入3000笑哈哈" checked>月入3000笑哈哈</ea-radio>
  <ea-radio value="月薪过万不是梦">月薪过万不是梦</ea-radio>
</ea-radio-group>
```

## 带有边框

<div class="row left">
  <ea-radio name="age" value="Relife" checked border>Relife</ea-radio>
  <ea-radio name="age" value="重返未来1999" border>重返未来1999</ea-radio>
</div>

```html
<div class="row left">
  <ea-radio name="age" value="重返18岁" checked border>Relife</ea-radio>
  <ea-radio name="age" value="重返未来1999" border>重返未来1999</ea-radio>
</div>
```

## 获取选中值

获取该组值的方式

<div class="row left">
  <ea-radio name="gender" value="武装直升机" checked border>武装直升机</ea-radio>
  <ea-radio name="gender" value="沃尔玛购物袋" border>沃尔玛购物袋</ea-radio>
</div>

<div class="row left">
  <ea-button type="primary" id="getCheckedValue">获取选中值</ea-button>
</div>

```html
<div class="row left">
  <ea-radio name="gender" value="武装直升机" checked border>
    武装直升机
  </ea-radio>
  <ea-radio name="gender" value="沃尔玛购物袋" border> 沃尔玛购物袋 </ea-radio>
</div>
<div class="row left">
  <ea-button type="primary" id="getCheckedValue">获取选中值</ea-button>
</div>
```

Js 操作, 需要通过绑定的 `name` 来进行获取

```js
document.querySelector("#getCheckedValue").addEventListener("click", (e) => {
  const name = "gender";
  const node = document.querySelector(`ea-radio[name=${name}][checked]`);
  window.alert(`您选中的是: name 为 ${name}, 值为 ${node.value} 的单选框选项`);
});
```

## Attributes

| 参数     | 说明                                    | 类型    | 可选值 | 默认值 |
| -------- | --------------------------------------- | ------- | ------ | ------ |
| name     | 绑定的唯一单选值，选中时提交该值        | string  | —      | ''     |
| value    | 选中时的值                              | string  | —      | ''     |
| disabled | 是否禁用                                | boolean | —      | false  |
| checked  | 当前是否为选中状态                      | boolean | —      | false  |
| label    | 选项的标签，若未设置则默认与 value 相同 | string  | —      | ''     |
| border   | 是否有边框                              | boolean | —      | false  |
