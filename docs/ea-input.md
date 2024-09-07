<script setup>
import { onMounted, ref } from 'vue'

onMounted(() => {
  import('../components/ea-input/index.js')
  import('./index.scss')

  // document.querySelector('#basicInput').addEventListener('change', (e) => {
  //   console.log(e.target.value)
  // })

  const valArr = [
    { value: '1' },
    { value: '2' },
    { value: '张三' },
    { value: '李四' },
    { value: '王五' },
    { value: '赵六' },
    { value: '孙七' },
    { value: '周八' },
    { value: '吴九' },
    { value: '郑十' },
  ];

  const suggentionControl = {
    onFocusInput: document.querySelector('#trigger-on-focus'),
    onAfterInput: document.querySelector('#trigger-after-input'),

    init() {
      this.onFocusInput.addEventListener('ready', () => {
        this.onFocusInput.suggestion = valArr;
      })
      this.onAfterInput.addEventListener('ready', () => {
        this.onAfterInput.suggestion = valArr;
      })
    }
  };
  suggentionControl.init()

  const remoteControl = {
    input: document.querySelector("#trigger-on-focus_for-remote"),
    data: [{ value: "123" }, { value: "456" }, { value: "789" }],
    timer: null,

    handleRemoteSearch(data) {
      if (this.timer) return;
      this.input.remote = true;
      this.timer =  setTimeout(() => {
        this.input.suggestion = data;
        this.input.remote = false;
        clearTimeout(this.timer);
        this.timer = null;
      }, 3 * 1000);
    },
    init() {
      this.input.addEventListener("ready", () => {
      });
        this.input.addEventListener("change", (e) => {
          this.handleRemoteSearch(
            this.data.filter((item) => item.value.includes(e.detail.value))
          );
        });

        this.input.addEventListener("focus", (e) => {
          this.handleRemoteSearch(this.data);
        });
    },
  };
  remoteControl.init();
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

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-input/index.js";
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

移步到 [CSS Part](#css-part)。

## 基础用法

<div class="row left">
    <ea-input placeholder="请输入内容"></ea-input>
    <ea-input placeholder="请输入内容" value="hello"></ea-input>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-input placeholder="请输入内容"></ea-input>
  <ea-input placeholder="请输入内容" value="hello"></ea-input>
</div>
```

:::

## 禁用状态

<div class="row left">
    <ea-input id="basicInput" placeholder="请输入内容" disabled></ea-input>
    <ea-input id="basicInput" placeholder="请输入内容" value="hello" disabled></ea-input>
</div>

::: details 查看代码

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

:::

## 可清空

<div class="row left">
    <ea-input id="basicInput" placeholder="这不是空的" clearable></ea-input>
    <ea-input id="basicInput" placeholder="请输入内容" value="这是空的" clearable></ea-input>
</div>

::: details 查看代码

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

:::

## 密码框

<div class="row left">
    <ea-input id="basicInput" placeholder="这不是空的" show-password></ea-input>
    <ea-input id="basicInput" placeholder="这不是空的" value="这是空的" show-password></ea-input>
</div>

::: details 查看代码

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

:::

## 带 icon 的输入框

带有图标标记输入类型

<div class="row left">
    <ea-input placeholder="这不是空的" prefix-icon="icon-search"></ea-input>
    <ea-input placeholder="这不是空的" suffix-icon="icon-search"></ea-input>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-input placeholder="这不是空的" prefix-icon="icon-search"></ea-input>
  <ea-input placeholder="这不是空的" suffix-icon="icon-search"></ea-input>
</div>
```

:::

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

::: details 查看代码

`css`

```css
.prepend,
.append {
  background-color: #f5f7fa;
  padding: 0.5rem;
}
```

`html`

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

:::

## 带输入建议

根据输入内容提供对应的输入建议(建议使用场景: 建议数据为静态数据)

::: warning
注意: 在 `VUE` 环境下, `suggestion` 的设置推荐在 `ready` 事件触发时设置，否则可能会导致建议列表不会渲染。<br/>

同理, 若原生环境出现该问题, 也可使用该方法。

```js
EaInput.addEventListener("ready", () => {
  EaInput.suggestion = suggentionArr;
});
```

:::

<div class="row">
  {{
    "搜索词: [" + 
    [ { value: '1' },
    { value: '2' },
    { value: '张三' },
    { value: '李四' },
    { value: '王五' },
    { value: '赵六' },
    { value: '孙七' },
    { value: '周八' },
    { value: '吴九' },
    { value: '郑十' },]
    .map(item => {
      return item.value
    }) +"]"
  }}
</div>
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

::: details 查看代码

```html
<div class="row">
  <section>
    <p>激活时列出输入建议</p>
    <ea-input
      id="trigger-on-focus"
      placeholder="请输入内容"
      trigger-on-focus
    ></ea-input>
  </section>
  <section>
    <p>输入后匹配输入建议</p>
    <ea-input
      id="trigger-after-input"
      placeholder="请输入内容"
      trigger-after-input
    ></ea-input>
  </section>
</div>
```

`js`: 设置输入建议 `input.suggestion`

```js
const valArr = [
  { value: "1" },
  { value: "2" },
  { value: "张三" },
  { value: "李四" },
  { value: "王五" },
  { value: "赵六" },
  { value: "孙七" },
  { value: "周八" },
  { value: "吴九" },
  { value: "郑十" },
];

const suggentionControl = {
  onFocusInput: document.querySelector("#trigger-on-focus"),
  onAfterInput: document.querySelector("#trigger-after-input"),

  init() {
    this.onFocusInput.addEventListener("ready", () => {
      this.onFocusInput.suggestion = valArr;
    });
    this.onAfterInput.addEventListener("ready", () => {
      this.onAfterInput.suggestion = valArr;
    });
  },
};
suggentionControl.init();
```

:::

## 远程搜索

从服务端搜索数据。通过更改 `remote` 属性开启远程搜索功能。

<div class="row">
  {{
    "搜索词: [" + 
    [ { value: '1' },
    { value: '2' },
    { value: '张三' },
    { value: '李四' },
    { value: '王五' },
    { value: '赵六' },
    { value: '孙七' },
    { value: '周八' },
    { value: '吴九' },
    { value: '郑十' },]
    .map(item => {
      return item.value
    }) +"]"
  }}
</div>
<div class="row">
  <section>
      <p>激活时列出输入建议</p>
      <ea-input id="trigger-on-focus_for-remote" placeholder="请输入内容" trigger-on-focus remote></ea-input>
  </section>
</div>

::: details 查看代码

`html`

```html
<div class="row">
  <section>
    <p>激活时列出输入建议</p>
    <ea-input
      id="trigger-on-focus_for-remote"
      placeholder="请输入内容"
      trigger-on-focus
      remote
    ></ea-input>
  </section>
</div>
```

`js`: 建议列表的设置方法同上一个示例一样。`remote` 属性开启后，会渲染一个加载动画；数据返回后，通过设置建议列表 + 设置 `remote` 属性为 `false` 来展示建议列表。

```js
const valArr = [
  { value: "1" },
  { value: "2" },
  { value: "张三" },
  { value: "李四" },
  { value: "王五" },
  { value: "赵六" },
  { value: "孙七" },
  { value: "周八" },
  { value: "吴九" },
  { value: "郑十" },
];
const remoteControl = {
  input: document.querySelector("#trigger-on-focus_for-remote"),
  data: [{ value: "123" }, { value: "456" }, { value: "789" }],

  handleRemoteSearch(data) {
    this.remote.remote = true;
    setTimeout(() => {
      this.remote.suggestion = data;
      this.remote.remote = false;
    }, 3 * 1000);
  },
  init() {
    this.input.addEventListener("ready", () => {
      this.input.addEventListener("change", (e) => {
        this.handleRemoteSearch(
          this.data.filter((item) => item.value.includes(e.detail.value))
        );
      });

      this.input.addEventListener("focus", (e) => {
        this.handleRemoteSearch(this.data);
      });
    });
  },
};
remoteControl.init();
```

`set` 和 `get` 操作

```js
// 获取值
EaInput.remote;

// 赋值: 当数据返回时
EaInput.remote = true;
```

:::

## 输入长度限制

<div class="col left">
  <ea-input placeholder="请输入内容" show-word-limit max-length="10"></ea-input>
  <ea-input placeholder="请输入内容" show-word-limit min-length="2"></ea-input>
</div>

::: details 查看代码

```html
<div class="col left">
  <ea-input placeholder="请输入内容" show-word-limit max-length="10"></ea-input>
  <ea-input placeholder="请输入内容" show-word-limit min-length="2"></ea-input>
</div>
```

:::

## Attributes

| 参数                | 说明               | 类型    | 可选值                                                                                                       | 默认值 |
| ------------------- | ------------------ | ------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| type                | 输入框类型         | String  | text / password / number / email / url / search / tel / date / time / datetime / week / month / color / file | text   |
| value               | 输入框的值         | String  | -                                                                                                            | -      |
| placeholder         | 占位符             | String  | -                                                                                                            | -      |
| disabled            | 禁用               | Boolean | true / false                                                                                                 | false  |
| clearable           | 可清空             | Boolean | true / false                                                                                                 | false  |
| show-password       | 显示密码           | Boolean | true / false                                                                                                 | false  |
| prefix-icon         | 输入框图标(前)     | String  | -                                                                                                            | -      |
| suffix-icon         | 输入框图标(后)     | String  | -                                                                                                            | -      |
| trigger-on-focus    | 激活时列出输入建议 | Boolean | true / false                                                                                                 | false  |
| trigger-after-input | 输入后匹配输入建议 | Boolean | true / false                                                                                                 | false  |
| remote              | 远程搜索           | Boolean | true / false                                                                                                 | false  |
| max-length          | 最大输入长度       | Number  | -                                                                                                            | -      |
| min-length          | 最小输入长度       | Number  | -                                                                                                            | -      |
| show-word-limit     | 显示输入长度限制   | Boolean | true / false                                                                                                 | false  |

## CSS Part

| 名称                                                                                      | 说明                               |
| ----------------------------------------------------------------------------------------- | ---------------------------------- |
| container                                                                                 | 外层容器                           |
| input-wrap                                                                                | 输入框容器                         |
| input                                                                                     | 输入框                             |
| **(仅当使用 `prepend` 插槽时可用)** prepend-wrap                                          | 前置内容容器(插槽`slot="prepend"`) |
| **(仅当使用 `append` 插槽时可用)** append-wrap                                            | 后置内容容器(插槽`slot="append"`)  |
| **(仅当使用 `prefix-icon` 属性时可用)** prefix-icon                                       | 前置图标容器                       |
| **(仅当使用 `suffix-icon` 属性时可用(包括`show-password`和`clearable`属性))** suffix-icon | 前置图标容器                       |
| **(仅当使用 `suggestion` 属性时可用)** suggestion-wrap                                    | 输入建议容器                       |
| **(仅当使用 `suggestion` 属性时可用)** suggestion-item                                    | 输入建议列表项                     |
| **(仅当使用 `suggestion` 属性时可用)** loading-icon                                       | 加载中图标                         |
| **(仅当使用 `show-word-limit` 属性时可用)** word-limit                                    | 输入长度限制提示                   |

## Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

## Event

| 事件名 | 说明                 | 参数 | 获取值         | 值的类型 |
| ------ | -------------------- | ---- | -------------- | -------- |
| input  | 输入时触发           | -    | e.detail.value | String   |
| focus  | 输入框聚焦时触发     | -    | e.detail.value | String   |
| blur   | 输入框失去焦点时触发 | -    | e.detail.value | String   |
