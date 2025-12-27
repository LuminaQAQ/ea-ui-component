<script setup>
import { onMounted } from 'vue'
import { EaDropdown } from "../dist/components/ea-dropdown.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
  
  const commandExample = {
    el: document.querySelector("#commandDropdown"),

    init() {
      this.el.addEventListener("command", e => {
        console.log(e.detail);
      });
    },
  };
  commandExample.init();

  const methodsExample = {
    dropdown: document.querySelector("#methodsDropdown"),
    showBtn: document.querySelector("#methodsDropdownShowBtn"),
    hideBtn: document.querySelector("#methodsDropdownHideBtn"),

    init() {
      this.showBtn.addEventListener("click", () => {
        this.dropdown.show();
      });

      this.hideBtn.addEventListener("click", () => {
        this.dropdown.hide();
      });
    },
  };

  methodsExample.init();
})
</script>

<style>
.ea-dropdown-reference {
    cursor: pointer;
    color: #409eff;
}
</style>

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 引入

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-breadcrumb/index.js";
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

## 基本用法

悬停在下拉菜单上以展开更多操作。

通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

<div class="demo">
  <ea-dropdown>
    <span slot="reference" class="ea-dropdown-reference">
      Dropdown List
      <ea-icon class="icon-angle-down"></ea-icon>
    </span>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
      <ea-dropdown-item>Action 4</ea-dropdown-item>
      <ea-dropdown-item>Action 5</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>

::: code-group

```html
<div class="demo">
  <ea-dropdown>
    <span slot="reference" class="ea-dropdown-reference">
      Dropdown List
      <ea-icon class="icon-angle-down"></ea-icon>
    </span>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
      <ea-dropdown-item>Action 4</ea-dropdown-item>
      <ea-dropdown-item>Action 5</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>
```

```css
.ea-dropdown-reference {
  cursor: pointer;
  color: #409eff;
}
```

:::

## 位置

支持 6 个位置。

设置 `placement` 属性，使下拉菜单出现在不同位置。

<div class="demo row left">
  <ea-dropdown placement="top-start">
    <ea-button slot="reference"> top-start </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="top">
    <ea-button slot="reference"> top </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="top-end">
    <ea-button slot="reference"> top-end </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="bottom-start">
    <ea-button slot="reference"> bottom-start </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="bottom">
    <ea-button slot="reference"> bottom </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="bottom-end">
    <ea-button slot="reference"> bottom-end </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-dropdown placement="top-start">
    <ea-button slot="reference"> top-start </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="top">
    <ea-button slot="reference"> top </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="top-end">
    <ea-button slot="reference"> top-end </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="bottom-start">
    <ea-button slot="reference"> bottom-start </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="bottom">
    <ea-button slot="reference"> bottom </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown placement="bottom-end">
    <ea-button slot="reference"> bottom-end </ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>
```

:::

## 分割线

可以在 `ea-dropdown-item` 添加 `divided` 属性来添加分割线。

<div class="demo">
  <ea-dropdown>
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item divided>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>

```html
<div class="demo">
  <ea-dropdown>
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item divided>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>
```

## 触发方式

可以配置点击激活或者悬停激活。

将 `trigger` 属性设置为 `click` 即可， 默认为 `hover`。

<div class="demo row left">
  <ea-dropdown trigger="hover">
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item divided>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown trigger="click">
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item divided>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown trigger="contextmenu">
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item divided>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-dropdown trigger="hover">
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item divided>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown trigger="click">
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item divided>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
  <ea-dropdown trigger="contextmenu">
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item divided>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>
```

:::

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性设置为 `false` 可以关闭此功能。

<div class="demo">
  <ea-dropdown hide-on-click="false">
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
      <ea-dropdown-item disabled> Action 4 </ea-dropdown-item>
      <ea-dropdown-item divided>Action 5</ea-dropdown-item>
      <ea-dropdown-item divided>Action 6</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>

```html
<div class="demo">
  <ea-dropdown hide-on-click="false">
    <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
      <ea-dropdown-item disabled> Action 4 </ea-dropdown-item>
      <ea-dropdown-item divided>Action 5</ea-dropdown-item>
      <ea-dropdown-item divided>Action 6</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>
```

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

<div class="demo">
  <ea-dropdown id="commandDropdown">
    <span slot="reference" class="ea-dropdown-reference">
      Dropdown List
      <ea-icon class="icon-angle-down"></ea-icon>
    </span>
    <ea-dropdown-menu>
      <ea-dropdown-item command="a">Action 1</ea-dropdown-item>
      <ea-dropdown-item command="b">Action 2</ea-dropdown-item>
      <ea-dropdown-item command="c">Action 3</ea-dropdown-item>
      <ea-dropdown-item command="d" disabled>Action 4</ea-dropdown-item>
      <ea-dropdown-item command="e" divided>Action 5</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>

::: code-group

```html
<div class="demo">
  <ea-dropdown id="commandDropdown">
    <span slot="reference" class="ea-dropdown-reference">
      Dropdown List
      <ea-icon class="icon-angle-down"></ea-icon>
    </span>
    <ea-dropdown-menu>
      <ea-dropdown-item command="a">Action 1</ea-dropdown-item>
      <ea-dropdown-item command="b">Action 2</ea-dropdown-item>
      <ea-dropdown-item command="c">Action 3</ea-dropdown-item>
      <ea-dropdown-item command="d" disabled>Action 4</ea-dropdown-item>
      <ea-dropdown-item command="e" divided>Action 5</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>
```

```js
const commandExample = {
  el: document.querySelector("#commandDropdown"),

  init() {
    this.el.addEventListener("command", e => {
      console.log(e.detail);
    });
  },
};
commandExample.init();
```

:::

## 下拉方法

您可以手动使用 `手动打开` 或 手动关闭下拉菜单以打开或关闭

<div class="demo row left">
  <ea-button id="methodsDropdownShowBtn">show</ea-button>
  <ea-button id="methodsDropdownHideBtn">hide</ea-button>
  <ea-dropdown id="methodsDropdown">
    <span slot="reference" class="ea-dropdown-reference">
      Dropdown List <ea-icon icon="icon-angle-down"></ea-icon>
    </span>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>

::: code-group

```html
<div class="demo">
  <ea-button id="methodsDropdownShowBtn">show</ea-button>
  <ea-button id="methodsDropdownHideBtn">hide</ea-button>
  <ea-dropdown id="methodsDropdown">
    <span slot="reference" class="ea-dropdown-reference">
      Dropdown List <ea-icon icon="icon-angle-down"></ea-icon>
    </span>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>
```

```js
const methodsExample = {
  dropdown: document.querySelector("#methodsDropdown"),
  showBtn: document.querySelector("#methodsDropdownShowBtn"),
  hideBtn: document.querySelector("#methodsDropdownHideBtn"),

  init() {
    this.showBtn.addEventListener("click", () => {
      this.dropdown.show();
    });

    this.hideBtn.addEventListener("click", () => {
      this.dropdown.hide();
    });
  },
};

methodsExample.init();
```

:::

## Dropdown API

### Dropdown Attributes

::: tip
该组件基于 [Overlay 遮罩层](./ea-overlay.md#overlay-attributes-api) 实现，因此遮罩层组件的属性都可以使用。
:::

| 参数          | 说明                 | 类型    | 可选值                                                                                        | 默认值 |
| ------------- | -------------------- | ------- | --------------------------------------------------------------------------------------------- | ------ |
| placement     | 菜单位置             | string  | `'top-start' \| 'top' \| 'top-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'bottom'` | bottom |
| trigger       | 触发方式             | string  | `'hover' \| 'click' \| 'contextmenu' \| 'hover'`                                              | hover  |
| hide-on-click | 点击菜单项后是否隐藏 | boolean | —                                                                                             | true   |

### Dropdown Slots

| 名称      | 描述                 |
| --------- | -------------------- |
| -         | 内容插槽（下拉列表） |
| reference | 触发元素插槽         |

### Dropdown CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

::: tip
该组件基于 [Overlay 遮罩层](./ea-overlay.md#css-part) 实现，请参考该文档。
:::

| 名称      | 说明             |
| --------- | ---------------- |
| container | overlay 外层容器 |
| mask      | overlay 遮罩层   |
| content   | overlay 内容容器 |

### Dropdown Events

该组件基于 [Overlay 遮罩层](./ea-overlay.md#events) 实现，请参考该文档。

| 事件名称     | 说明                                                  | 回调参数                              |
| ------------ | ----------------------------------------------------- | ------------------------------------- |
| command      | 点击菜单项时触发，事件 detail 为 item 的 `command` 值 |
| open         | 开启 Overlay 时触发的事件                             | `() => void`                          |
| opened       | 开启 Overlay 的动画结束时触发                         | `() => void`                          |
| close        | 关闭 Overlay 时触发的事件                             | `() => void`                          |
| closed       | 关闭 Overlay 的动画结束时触发                         | `() => void`                          |
| before-close | 关闭 Overlay 前触发的事件                             | `(e.detail.done: () => void) => void` |

### Dropdown Methods

| 名称 | 描述         |
| ---- | ------------ |
| show | 显示下拉菜单 |
| hide | 隐藏下拉菜单 |

## DropdownItem API

### DropdownItem Attributes

| 参数     | 说明           | 类型    | 可选值 | 默认值 |
| -------- | -------------- | ------- | ------ | ------ |
| divided  | 是否显示分割线 | boolean | —      | false  |
| disabled | 是否禁用项     | boolean | —      | false  |
| command  | 命令标识       | string  | —      | —      |

### DropdownItem Slots

| 名称 | 描述     |
| ---- | -------- |
| -    | 默认插槽 |

### DropdownItem CSS Part

| 名称      | 说明       |
| --------- | ---------- |
| container | 菜单项容器 |
| divider   | 分割线     |
| content   | 菜单项内容 |

## DropdownMenu API

### DropdownItem CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 菜单容器 |
