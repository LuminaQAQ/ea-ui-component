<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../components/ea-checkbox-group/index.js')
  import('../components/ea-checkbox/index.js')
  import('../components/ea-button/index.js')
  import('../components/ea-switch/index.js')
  import('./index.scss')

  const basicControler = {
    btn: document.querySelector("#basic"),
    init() {
      this.btn.addEventListener("change", (e) => {
        console.log(e.detail);
      });
    },
  };
  basicControler.init();

  const disabledControler = {
    btn: document.querySelector("#disabledSwitch"),
    checkbox: document.querySelector("#disabledCheckbox"),
    init() {
      this.btn.addEventListener("change", (e) => {
        this.checkbox.disabled = e.detail.checked;
      });
    },
  };
  disabledControler.init();

  const groupControler = {
    btn: document.querySelector("#cityGroupBtn"),
    group: document.querySelector("#cityGroup"),
    init() {
      this.btn.addEventListener("click", () => {
        console.log(this.group.value);
        alert(`[${this.group.value}]`);
      });
    },
  };
  groupControler.init();

  const indeterminateControler = {
    btn: document.querySelector("#setIndeterminate"),
    checkbox: document.querySelector("#checkAll"),
    init() {
      this.btn.addEventListener("click", (e) => {
        this.checkbox.indeterminate = true;
      });
    },
  };
  indeterminateControler.init();

  const dayControler = {
    btn: document.querySelector("#day-group"),
    group: document.querySelector("#ea-checkbox-group"),
    init() {
      this.btn.addEventListener("click", () => {
        alert(`[${this.group.value}]`);
      });
    },
  };
  dayControler.init();

})
</script>

# Checkbox 多选框

一组备选项中进行多选

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-checkbox/index.js";
  import "./node_modules/easy-component-ui/components/ea-checkbox-group/index.js";
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

移步到 [CSS Part](#checkbox-css-part)。

## 基础用法

可以添加 `change` 事件监听。

<div class="row left">
  <ea-checkbox id="basic" name="work" value="前端">前端</ea-checkbox>
  <ea-checkbox name="work" value="后端">后端</ea-checkbox>
</div>

::: details 查看代码

`html`

```html
<div class="row left">
  <ea-checkbox id="basic" name="work" value="前端">前端</ea-checkbox>
  <ea-checkbox name="work" value="后端">后端</ea-checkbox>
</div>
```

`js`- 添加`change`事件监听。

```js
const basicControler = {
  btn: document.querySelector("#basic"),
  init() {
    this.btn.addEventListener("change", (e) => {
      console.log(e.detail);
    });
  },
};
basicControler.init();
```

:::

## 禁用状态

多选框不可用状态。在元素上添加 `disabled` 属性即可。

<div class="row left">
  <ea-switch id="disabledSwitch" inactive-text="启用" active-text="禁用"></ea-switch>
  <ea-checkbox id="disabledCheckbox" name="salary" value="月入3000笑哈哈">月入3000笑哈哈</ea-checkbox>
  <ea-checkbox name="salary" value="月薪过万不是梦" disabled>
    月薪过万不是梦
  </ea-checkbox>
</div>

::: details 查看代码

`html`

```html
<div class="row left">
  <ea-switch
    id="disabledSwitch"
    inactive-text="启用"
    active-text="禁用"
  ></ea-switch>
  <ea-checkbox id="disabledCheckbox" name="salary" value="月入3000笑哈哈"
    >月入3000笑哈哈</ea-checkbox
  >
  <ea-checkbox name="salary" value="月薪过万不是梦" disabled>
    月薪过万不是梦
  </ea-checkbox>
</div>
```

`js` - 操作的`disabled`属性。

```js
const disabledControler = {
  btn: document.querySelector("#disabledSwitch"),
  checkbox: document.querySelector("#disabledCheckbox"),
  init() {
    this.btn.addEventListener("change", (e) => {
      this.checkbox.disabled = e.detail.checked;
    });
  },
};
disabledControler.init();
```

:::

## 多选框组

`checkbox-group`适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

<div class="row left">
  <ea-checkbox-group id="cityGroup" name="city">
    <ea-checkbox value="北京">北京</ea-checkbox>
    <ea-checkbox value="上海">上海</ea-checkbox>
    <ea-checkbox value="广州">广州</ea-checkbox>
    <ea-checkbox value="深圳" disabled>深圳</ea-checkbox>
    <ea-checkbox value="成都" disabled checked>成都</ea-checkbox>
  </ea-checkbox-group>
</div>
<div class="row left">
  <ea-button id="cityGroupBtn" type="primary">点击获取 checkbox 值</ea-button>
</div>

::: details 查看代码

`html`

```html
<div class="row left">
  <ea-checkbox-group id="cityGroup" name="city">
    <ea-checkbox value="北京">北京</ea-checkbox>
    <ea-checkbox value="上海">上海</ea-checkbox>
    <ea-checkbox value="广州">广州</ea-checkbox>
    <ea-checkbox value="深圳" disabled>深圳</ea-checkbox>
    <ea-checkbox value="成都" disabled checked>成都</ea-checkbox>
  </ea-checkbox-group>
</div>
<div class="row left">
  <ea-button id="cityGroupBtn" type="primary">点击获取 checkbox 值</ea-button>
</div>
```

`js` - 获取多选值操作(`checkboxGroup.value`)。

```js
const groupControler = {
  btn: document.querySelector("#cityGroupBtn"),
  group: document.querySelector("#cityGroup"),
  init() {
    this.btn.addEventListener("click", () => {
      alert(`[${this.group.value}]`);
    });
  },
};
groupControler.init();
```

:::

## indeterminate 状态

indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

<div class="row left">
  <ea-checkbox id="checkAll" name="food">全选</ea-checkbox>
  <ea-button id="setIndeterminate" type="primary">
    设置 indeterminate 状态
  </ea-button>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-checkbox id="checkAll" name="food">全选</ea-checkbox>
  <ea-button id="setIndeterminate" type="primary">
    设置 indeterminate 状态
  </ea-button>
</div>
```

`js` 操作 `indeterminate` 状态(`checkbox.indeterminate = true`)。

```js
const indeterminateControler = {
  btn: document.querySelector("#setIndeterminate"),
  checkbox: document.querySelector("#checkAll"),
  init() {
    this.btn.addEventListener("click", (e) => {
      this.checkbox.indeterminate = true;
    });
  },
};
indeterminateControler.init();
```

:::

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

::: details 查看代码

`html`

```html
<div class="row left">
  <ea-checkbox-group
    id="ea-checkbox-group"
    name="day"
    value="今天, 明天"
    disabled
  >
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
```

`js` - 获取多选值操作(`checkboxGroup.value`)。

```js
const dayControler = {
  btn: document.querySelector("#day-group"),
  group: document.querySelector("#ea-checkbox-group"),
  init() {
    this.btn.addEventListener("click", () => {
      alert(`[${this.checkboxGroup.value}]`);
    });
  },
};
dayControler.init();
```

:::

## Checkbox Attributes

| 参数          | 说明             | 类型    | 可选值 | 默认值 |
| ------------- | ---------------- | ------- | ------ | ------ |
| value         | 绑定值           | String  | -      | -      |
| name          | 原生的`name`属性 | String  | -      | -      |
| disabled      | 是否禁用         | Boolean | -      | false  |
| checked       | 是否选中         | Boolean | -      | false  |
| indeterminate | 是否为半选状态   | Boolean | -      | false  |

## CheckboxGroup Attributes

| 参数     | 说明                                             | 类型    | 可选值 | 默认值 |
| -------- | ------------------------------------------------ | ------- | ------ | ------ |
| name     | 若该组件位于表单内，则该`name`将作为该组值的键名 | String  | -      | -      |
| value    | 当前选中的值                                     | Array   | -      | -      |
| disabled | 是否禁用                                         | Boolean | -      | false  |

## Checkbox CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称            | 说明                                                                 |
| --------------- | -------------------------------------------------------------------- |
| container       | 外层容器(包含 按钮容器`input-container`和 标签容器`label-container`) |
| input-container | `checkbox` 按钮容器                                                  |
| input           | `checkbox` 伪按钮                                                    |
| label-container | `label` 标签容器, 用于放置标签内容                                   |

## CheckboxGroup CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

## Checkbox Events

| 事件名 | 说明               | 回调参数   |
| ------ | ------------------ | ---------- |
| change | 状态发生变化时触发 | (e.detail) |
