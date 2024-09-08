<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../components/ea-button/index.js')
  import('../components/ea-radio/index.js')
  import('../components/ea-radio-group/index.js')
  import('./index.scss')

  const getGroupCheckedValueObj = {
    btn: document.querySelector("#getGroupCheckedValue"),
    group: document.querySelector("#radioGroup"),

    init() {
      this.btn.addEventListener("click", (e) => {
        alert(this.group.value);
      });
    },
  };
  getGroupCheckedValueObj.init();

  const getCheckedValueObj = {
    btn: document.querySelector("#getCheckedValue"),
    name: "gender",

    init() {
      this.btn.addEventListener("click", (e) => {
        const node = document.querySelector(
          `ea-radio[name=${this.name}][checked="true"]`
        );
        window.alert(
          `您选中的是: name 为 ${this.name}, 值为 ${node.value} 的单选框选项`
        );
      });
    },
  };
  getCheckedValueObj.init();
})
</script>

# Radio 单选框

在一组备选项中进行单选

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-radio/index.js";
  import "./node_modules/easy-component-ui/components/ea-radio-group/index.js";
</script>
```

> `css`

::: tip
需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 `link` 标签引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#radiogroup-css-part)。

## 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

<div class="row left">
    <ea-radio name="city" value="福州" checked>福州</ea-radio>
    <ea-radio name="city" value="厦门">厦门</ea-radio>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-radio name="city" value="福州" checked>福州</ea-radio>
  <ea-radio name="city" value="厦门">厦门</ea-radio>
</div>
```

:::

## 禁用状态

单选框不可用的状态。

<div class="row left">
  <ea-radio name="work" value="前端切图仔" checked disabled>前端切图仔</ea-radio>
  <ea-radio name="work" value="后端CRUD工程师" disabled>后端CRUD工程师</ea-radio>
</div>

::: details 查看代码

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

:::

## 单选框组

适用于在多个互斥的选项中选择的场景

<div class="row left">
  <ea-radio-group id="radioGroup" name="salary">
    <ea-radio value="月入3000笑哈哈" checked>月入3000笑哈哈</ea-radio>
    <ea-radio value="月薪过万不是梦">月薪过万不是梦</ea-radio>
  </ea-radio-group>
  <ea-button type="primary" id="getGroupCheckedValue">获取选中值</ea-button>
</div>

::: details 查看代码

`html`

```html
<ea-radio-group name="salary">
  <ea-radio value="月入3000笑哈哈" checked>月入3000笑哈哈</ea-radio>
  <ea-radio value="月薪过万不是梦">月薪过万不是梦</ea-radio>
</ea-radio-group>
```

`js`

```js
const getGroupCheckedValueObj = {
  btn: document.querySelector("#getGroupCheckedValue"),
  group: document.querySelector("#radioGroup"),

  init() {
    this.btn.addEventListener("click", (e) => {
      alert(this.group.value);
    });
  },
};
getGroupCheckedValueObj.init();
```

:::

## 带有边框

<div class="row left">
  <ea-radio name="age" value="Relife" checked border>Relife</ea-radio>
  <ea-radio name="age" value="重返未来1999" border>重返未来1999</ea-radio>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-radio name="age" value="重返18岁" checked border>Relife</ea-radio>
  <ea-radio name="age" value="重返未来1999" border>重返未来1999</ea-radio>
</div>
```

:::

## 获取选中值

获取该组值的方式

:::tip
虽然给出了这个示例，不过建议使用 [单选框组](#单选框组) 给出的示例来获取选中值。
:::

<div class="row left">
  <ea-radio name="gender" value="武装直升机" checked border>武装直升机</ea-radio>
  <ea-radio name="gender" value="沃尔玛购物袋" border>沃尔玛购物袋</ea-radio>
</div>

<div class="row left">
  <ea-button type="primary" id="getCheckedValue">获取选中值</ea-button>
</div>

::: details 查看代码

`html`

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

`js`: 通过绑定的 `name` 来进行获取。

```js
const getCheckedValueObj = {
  btn: document.querySelector("#getCheckedValue"),
  name: "gender",

  init() {
    this.btn.addEventListener("click", (e) => {
      const node = document.querySelector(
        `ea-radio[name=${this.name}][checked="true"]`
      );
      window.alert(
        `您选中的是: name 为 ${this.name}, 值为 ${node.value} 的单选框选项`
      );
    });
  },
};
getCheckedValueObj.init();
```

:::

## Attributes

| 参数     | 说明                                    | 类型    | 可选值 | 默认值 |
| -------- | --------------------------------------- | ------- | ------ | ------ |
| name     | 绑定的唯一单选值，选中时提交该值        | string  | —      | ''     |
| value    | 选中时的值                              | string  | —      | ''     |
| disabled | 是否禁用                                | boolean | —      | false  |
| checked  | 当前是否为选中状态                      | boolean | —      | false  |
| label    | 选项的标签，若未设置则默认与 value 相同 | string  | —      | ''     |
| border   | 是否有边框                              | boolean | —      | false  |

## RadioGroup CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

## Radio CSS Part

| 名称       | 说明                          |
| ---------- | ----------------------------- |
| container  | 外层容器                      |
| input-wrap | 输入框容器                    |
| input      | 输入框(非 `input:radio` 本身) |
| label-wrap | label 容器                    |
