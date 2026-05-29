<script setup>
import { onMounted } from 'vue'
import { EaDropdown } from "../dist/components/ea-dropdown.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  const commandExample = {
    el: document.querySelector("#commandDropdown"),

    init() {
      this.el.addEventListener("ea-command", e => {
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
  import "./node_modules/easy-component-ui/components/ea-dropdown/index.js";
</script>
```

## 自定义样式

移步到 [CSS Part](#dropdown-css-part) 和 [CSS 自定义属性](#dropdown-css-自定义属性)。

## 基本用法

悬停在下拉菜单上以展开更多操作。

通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

<div class="demo">
  <ea-dropdown>
    <span slot="reference" class="ea-dropdown-reference">
      Dropdown List
      <ea-icon name="angle-down"></ea-icon>
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

:::: details 查看代码

::: code-group

```html
<ea-dropdown>
  <span slot="reference" class="ea-dropdown-reference">
    Dropdown List
    <ea-icon name="angle-down"></ea-icon>
  </span>
  <ea-dropdown-menu>
    <ea-dropdown-item>Action 1</ea-dropdown-item>
    <ea-dropdown-item>Action 2</ea-dropdown-item>
    <ea-dropdown-item>Action 3</ea-dropdown-item>
    <ea-dropdown-item>Action 4</ea-dropdown-item>
    <ea-dropdown-item>Action 5</ea-dropdown-item>
  </ea-dropdown-menu>
</ea-dropdown>
```

```css
.ea-dropdown-reference {
  cursor: pointer;
  color: #409eff;
}
```

:::

::::

## 位置

支持 12 个位置。

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

::: details 查看代码

```html
<ea-dropdown>
  <ea-button type="primary" slot="reference"> Dropdown List</ea-button>
  <ea-dropdown-menu>
    <ea-dropdown-item>Action 1</ea-dropdown-item>
    <ea-dropdown-item divided>Action 2</ea-dropdown-item>
    <ea-dropdown-item>Action 3</ea-dropdown-item>
  </ea-dropdown-menu>
</ea-dropdown>
```

:::

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

::: details 查看代码

```html
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
```

:::

## 指令事件

点击菜单项后会触发 `ea-command` 事件，用户可以通过相应的菜单项 `command` 值进行不同的操作。

<div class="demo">
  <ea-dropdown id="commandDropdown">
    <span slot="reference" class="ea-dropdown-reference">
      Dropdown List
      <ea-icon name="angle-down"></ea-icon>
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

:::: details 查看代码

::: code-group

```html
<ea-dropdown id="commandDropdown">
  <span slot="reference" class="ea-dropdown-reference">
    Dropdown List
    <ea-icon name="angle-down"></ea-icon>
  </span>
  <ea-dropdown-menu>
    <ea-dropdown-item command="a">Action 1</ea-dropdown-item>
    <ea-dropdown-item command="b">Action 2</ea-dropdown-item>
    <ea-dropdown-item command="c">Action 3</ea-dropdown-item>
    <ea-dropdown-item command="d" disabled>Action 4</ea-dropdown-item>
    <ea-dropdown-item command="e" divided>Action 5</ea-dropdown-item>
  </ea-dropdown-menu>
</ea-dropdown>
```

```js
const commandExample = {
  el: document.querySelector("#commandDropdown"),

  init() {
    this.el.addEventListener("ea-command", e => {
      console.log(e.detail);
    });
  },
};
commandExample.init();
```

:::

::::

## 下拉方法

您可以手动使用 `show` 或 `hide` 方法来打开或关闭下拉菜单。

<div class="demo row left">
  <ea-button id="methodsDropdownShowBtn">show</ea-button>
  <ea-button id="methodsDropdownHideBtn">hide</ea-button>
  <ea-dropdown id="methodsDropdown">
    <span slot="reference" class="ea-dropdown-reference">
      Dropdown List <ea-icon name="angle-down"></ea-icon>
    </span>
    <ea-dropdown-menu>
      <ea-dropdown-item>Action 1</ea-dropdown-item>
      <ea-dropdown-item>Action 2</ea-dropdown-item>
      <ea-dropdown-item>Action 3</ea-dropdown-item>
    </ea-dropdown-menu>
  </ea-dropdown>
</div>

:::: details 查看代码

::: code-group

```html
<ea-button id="methodsDropdownShowBtn">show</ea-button>
<ea-button id="methodsDropdownHideBtn">hide</ea-button>
<ea-dropdown id="methodsDropdown">
  <span slot="reference" class="ea-dropdown-reference">
    Dropdown List <ea-icon name="angle-down"></ea-icon>
  </span>
  <ea-dropdown-menu>
    <ea-dropdown-item>Action 1</ea-dropdown-item>
    <ea-dropdown-item>Action 2</ea-dropdown-item>
    <ea-dropdown-item>Action 3</ea-dropdown-item>
  </ea-dropdown-menu>
</ea-dropdown>
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

::::

## Dropdown API

### Dropdown Attributes

::: tip
该组件继承自 [EaPopper 气泡定位](./ea-popper.md#popper-attributes) 组件，因此 Popper 组件的属性都可以使用。
:::

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| trigger | 触发方式 | string | `hover` / `click` / `contextmenu` | hover |
| hide-on-click | 点击菜单项后是否隐藏 | boolean | — | true |
| size | 菜单尺寸 | string | `small` / `default` / `large` | — |
| placement | 菜单位置 | string | `top` / `top-start` / `top-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `left-start` / `left-end` / `right` / `right-start` / `right-end` | bottom |
| width | 下拉菜单宽度 | number | — | 150 |
| show-arrow | 是否显示箭头 | boolean | — | true |
| visible | 是否可见 | boolean | — | false |
| offset | 偏移量，格式为 `"x y"` | string | — | 0 0 |
| flip | 是否自动翻转 | boolean | — | true |

### Dropdown Slots

| 名称 | 说明 |
| --- | --- |
| default | 下拉菜单内容插槽 |
| reference | 触发下拉菜单的元素插槽 |

### Dropdown CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称 | 说明 |
| --- | --- |
| container | 外层容器 |
| reference | 触发元素的父容器 |
| original | 下拉菜单内容容器 |

### Dropdown Events

| 事件名 | 说明 | 回调参数(event.detail) |
| --- | --- | --- |
| ea-command | 点击菜单项时触发 | `{ command: string }` |
| ea-show | 开启下拉菜单时触发 | — |
| ea-shown | 开启下拉菜单的动画结束时触发 | — |
| ea-hide | 关闭下拉菜单时触发 | — |
| ea-hidden | 关闭下拉菜单的动画结束时触发 | — |

### Dropdown Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| show | 显示下拉菜单 | — |
| hide | 隐藏下拉菜单 | — |
| toggle | 切换下拉菜单显示状态 | — |

### Dropdown CSS 自定义属性

| 属性名 | 说明 | 默认值 |
| --- | --- | --- |
| --ea-dropdown-z-index | 下拉菜单层级 | 2000 |
| --ea-popper-width | 下拉菜单宽度 | 150px |
| --ea-popper-border-color | 边框颜色 | — |
| --ea-popper-background-color | 背景颜色 | — |
| --ea-popper-box-shadow | 阴影 | — |
| --ea-popper-arrow-size | 箭头大小 | — |
| --ea-popper-spacing | 内边距 | — |
| --ea-popper-transform-x | X 轴偏移量 | — |
| --ea-popper-transform-y | Y 轴偏移量 | — |
| --ea-popper-transition | 过渡动画时长 | — |

## DropdownItem API

### DropdownItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| divided | 是否显示分割线 | boolean | — | false |
| disabled | 是否禁用项 | boolean | — | false |
| command | 命令标识 | string | — | — |

### DropdownItem Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项内容插槽 |

### DropdownItem CSS Part

| 名称 | 说明 |
| --- | --- |
| container | 菜单项容器 |
| divider | 分割线 |
| content | 菜单项内容 |

### DropdownItem Events

| 事件名 | 说明 | 回调参数(event.detail) |
| --- | --- | --- |
| ea-command | 点击菜单项时触发（当设置了 command 属性） | `{ command: string }` |

### DropdownItem CSS 自定义属性

| 属性名 | 说明 | 默认值 |
| --- | --- | --- |
| --ea-dropdown-item-spacing | 菜单项内边距 | var(--spacing-sm) |
| --ea-dropdown-item-divider-spacing | 分割线间距 | var(--spacing-md) |
| --ea-dropdown-item-divider-color | 分割线颜色 | var(--grey-200) |
| --ea-dropdown-item-color | 菜单项文字颜色 | var(--grey-900) |
| --ea-dropdown-item-disabled-color | 禁用状态文字颜色 | var(--grey-300) |
| --ea-dropdown-item-hover-color | 悬停状态文字颜色 | var(--blue-500) |
| --ea-dropdown-item-hover-background-color | 悬停状态背景颜色 | var(--blue-100) |
| --ea-dropdown-item-font-size | 菜单项字体大小 | var(--font-size-md) |

## DropdownMenu API

### DropdownMenu Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项内容插槽 |

### DropdownMenu CSS Part

| 名称 | 说明 |
| --- | --- |
| container | 菜单容器 |
