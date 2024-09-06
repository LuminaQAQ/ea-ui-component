<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../components/ea-collapse/index.js')
    import('../components/ea-button/index.js')

    import('./index.scss')

    const collapseControler = {
      el: document.querySelector("#normalCollapse"),
      collapseAll: document.querySelector("#collapse"),
      closeAll: document.querySelector("#closeAll"),
      init() {
        this.collapseAll.addEventListener("click", () => {
          this.el.active = "1, 2, 3";
        });
        this.closeAll.addEventListener("click", () => {
          this.el.active = "";
        });
      },
    };
    collapseControler.init();

    const accordionControler = {
      el: document.querySelector("#accordionCollapse"),
      btn: document.querySelector("#accordion"),
      init() {
        this.btn.addEventListener("click", () => {
          this.el.active = 2;
        });
        this.el.addEventListener("change", (e) => {
          console.log(e.detail);
        });
      },
    };
    accordionControler.init();
})
</script>

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-collapse/index.js";
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

可同时展开多个面板，面板之间不影响。通过设置元素上的 `active` 属性来控制指定面板的开或关，前提是设置好 `name` 属性，若不设置，则默认为子组件的顺序。

<div class="demo">
  <ea-button-group>
    <ea-button id="collapse" type="primary">设置 active 为 1, 2, 3</ea-button>
    <ea-button id="closeAll" type="primary">设置 active 为 ""</ea-button>
  </ea-button-group>
  <ea-collapse id="normalCollapse" active="1, 2">
    <ea-collapse-item class="" title="标题1" name="1">
      <div>内容1</div>
    </ea-collapse-item>
    <ea-collapse-item class="" title="标题2" name="2">
      <div>内容2</div>
    </ea-collapse-item>
    <ea-collapse-item class="" title="标题3" name="3">
      <div>内容3</div>
    </ea-collapse-item>
  </ea-collapse>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-button-group>
    <ea-button id="collapse" type="primary">设置 active 为 1, 2, 3</ea-button>
    <ea-button id="closeAll" type="primary">设置 active 为 ""</ea-button>
  </ea-button-group>
  <ea-collapse id="normalCollapse" active="1, 2">
    <ea-collapse-item class="" title="标题1" name="1">
      <div>内容1</div>
    </ea-collapse-item>
    <ea-collapse-item class="" title="标题2" name="2">
      <div>内容2</div>
    </ea-collapse-item>
    <ea-collapse-item class="" title="标题3" name="3">
      <div>内容3</div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

`js` - 操作 `active` 属性来改变面板的开或关(`el.active = ""`)

```js
const collapseControler = {
  el: document.querySelector("#normalCollapse"),
  collapseAll: document.querySelector("#collapse"),
  closeAll: document.querySelector("#closeAll"),
  init() {
    this.collapseAll.addEventListener("click", () => {
      this.el.active = "1, 2, 3";
    });
    this.closeAll.addEventListener("click", () => {
      this.el.active = "";
    });
  },
};
collapseControler.init();
```

:::

## 手风琴效果

每次只能展开一个面板。通过设置 `accordion` 属性为 `true` 来开启手风琴模式。可以在元素上添加 `change` 事件来监听面板的展开和收起。

<div class="demo">
  <ea-button id="accordion" type="primary">设置 active 为 2</ea-button>
  <ea-collapse id="accordionCollapse" active="1" accordion>
    <ea-collapse-item class="" title="标题1" name="1">
      <div>内容1</div>
    </ea-collapse-item>
    <ea-collapse-item class="" title="标题2" name="2">
      <div>内容2</div>
    </ea-collapse-item>
  </ea-collapse>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-button id="accordion" type="primary">设置 active 为 2</ea-button>
  <ea-collapse id="accordionCollapse" active="1" accordion>
    <ea-collapse-item class="" title="标题1" name="1">
      <div>内容1</div>
    </ea-collapse-item>
    <ea-collapse-item class="" title="标题2" name="2">
      <div>内容2</div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

`js` - 监听面板的展开和收起事件(`el.addEventListener("change", (e) => {})`)

```js
const collapseControler = {
  el: document.querySelector("#accordionCollapse"),
  btn: document.querySelector("#accordion"),
  init() {
    this.btn.addEventListener("click", () => {
      this.el.active = 2;
    });
    this.el.addEventListener("change", (e) => {
      console.log(e.detail);
    });
  },
};
collapseControler.init();
```

:::

## Collapse Attributes

| 参数      | 说明                                                   | 类型    | 可选值 | 默认值 |
| --------- | ------------------------------------------------------ | ------- | ------ | ------ |
| active    | 当前激活面板的 name. 当展开元素为多项时, 需用逗号分隔. | string  | —      | —      |
| accordion | 是否开启手风琴模式                                     | boolean | —      | false  |

## CollapseItem Attributes

| 参数  | 说明                                                          | 类型   | 可选值 | 默认值 |
| ----- | ------------------------------------------------------------- | ------ | ------ | ------ |
| title | 面板标题                                                      | string | —      | —      |
| name  | 当前面板的 name. 可选, 若不设置, 则会根据子组件的顺序自动生成 | string | —      | —      |

## Collapse CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

## CollapseItem CSS Part

| 名称          | 说明                                               |
| ------------- | -------------------------------------------------- |
| container     | 外层容器, 包含标题`title-wrap`和内容`content-wrap` |
| title-wrap    | 标题容器                                           |
| title-content | 标题内容                                           |
| title-icon    | 标题图标                                           |
| content-wrap  | 内容容器                                           |

## Collapse Events

| 事件名称 | 说明                                       | 回调参数 |
| -------- | ------------------------------------------ | -------- |
| change   | 手动展开面板变化时触发（对应 active 属性） | -        |
