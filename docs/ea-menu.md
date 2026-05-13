<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

<style>
  .ea-menu-item-title {
    margin-left: 0.25rem;
  }

  .vertical::part(wrap) {
    height: 100%;
  }
</style>

# Menu 导航菜单

为网站提供导航功能的菜单。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-menu/index.ts";
</script>
```

## 自定义样式

移步到 [CSS Part](#menu-css-part)。

## 顶栏

适用广泛的基础用法。

::: tip

导航菜单默认为垂直模式，通过 `mode` 属性可以使导航菜单变更为水平模式。另外，在菜单中通过 `submenu` 组件可以生成二级菜单。Menu 还提供了 `background-color`、`text-color` 和 `active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

:::

<div class="demo">
  <!-- 白色顶栏 -->
  <ea-menu default-active="1" class="ea-menu-demo" mode="horizontal">
    <ea-menu-item index="1">Processing Center</ea-menu-item>
    <ea-sub-menu index="2">
      <span slot="title">Workspace</span>
      <ea-menu-item index="2-1">item one</ea-menu-item>
      <ea-menu-item index="2-2">item two</ea-menu-item>
      <ea-menu-item index="2-3">item three</ea-menu-item>
      <ea-sub-menu index="2-4">
        <span slot="title">item four</span>
        <ea-menu-item index="2-4-1">item one</ea-menu-item>
        <ea-menu-item index="2-4-2">item two</ea-menu-item>
        <ea-menu-item index="2-4-3">item three</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
    <ea-menu-item index="3" disabled>Info</ea-menu-item>
    <ea-menu-item index="4">Orders</ea-menu-item>
  </ea-menu>
  <!-- 黑色顶栏 -->
  <ea-menu
    default-active="1"
    class="ea-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="--ea-menu-hover-bg-color: rgb(67, 74, 80)"
  >
    <ea-menu-item index="1">Processing Center</ea-menu-item>
    <ea-sub-menu index="2">
      <span slot="title">Workspace</span>
      <ea-menu-item index="2-1">item one</ea-menu-item>
      <ea-menu-item index="2-2">item two</ea-menu-item>
      <ea-menu-item index="2-3">item three</ea-menu-item>
      <ea-sub-menu index="2-4">
        <span slot="title">item four</span>
        <ea-menu-item index="2-4-1">item one</ea-menu-item>
        <ea-menu-item index="2-4-2">item two</ea-menu-item>
        <ea-menu-item index="2-4-3">item three</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
    <ea-menu-item index="3" disabled>Info</ea-menu-item>
    <ea-menu-item index="4">Orders</ea-menu-item>
  </ea-menu>
</div>

::: details 查看代码

```html
<div class="demo">
  <!-- 白色顶栏 -->
  <ea-menu default-active="1" class="ea-menu-demo" mode="horizontal">
    <ea-menu-item index="1">Processing Center</ea-menu-item>
    <ea-sub-menu index="2">
      <span slot="title">Workspace</span>
      <ea-menu-item index="2-1">item one</ea-menu-item>
      <ea-menu-item index="2-2">item two</ea-menu-item>
      <ea-menu-item index="2-3">item three</ea-menu-item>
      <ea-sub-menu index="2-4">
        <span slot="title">item four</span>
        <ea-menu-item index="2-4-1">item one</ea-menu-item>
        <ea-menu-item index="2-4-2">item two</ea-menu-item>
        <ea-menu-item index="2-4-3">item three</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
    <ea-menu-item index="3" disabled>Info</ea-menu-item>
    <ea-menu-item index="4">Orders</ea-menu-item>
  </ea-menu>
  <!-- 黑色顶栏 -->
  <ea-menu
    default-active="1"
    class="ea-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="--ea-menu-hover-bg-color: rgb(67, 74, 80)"
  >
    <ea-menu-item index="1">Processing Center</ea-menu-item>
    <ea-sub-menu index="2">
      <span slot="title">Workspace</span>
      <ea-menu-item index="2-1">item one</ea-menu-item>
      <ea-menu-item index="2-2">item two</ea-menu-item>
      <ea-menu-item index="2-3">item three</ea-menu-item>
      <ea-sub-menu index="2-4">
        <span slot="title">item four</span>
        <ea-menu-item index="2-4-1">item one</ea-menu-item>
        <ea-menu-item index="2-4-2">item two</ea-menu-item>
        <ea-menu-item index="2-4-3">item three</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
    <ea-menu-item index="3" disabled>Info</ea-menu-item>
    <ea-menu-item index="4">Orders</ea-menu-item>
  </ea-menu>
</div>
```

:::

## 左右

您可以将菜单项放置在左边或右边。

<div class="demo">
  <ea-menu default-active="1" class="ea-menu-demo" mode="horizontal">
    <ea-menu-item index="0" style="margin-right: auto">
      <img
        style="width: 100px"
        src="https://raw.githubusercontent.com/LuminaQAQ/ea-ui-component/refs/heads/master/logo.png"
        alt="EasyUI logo"
      />
    </ea-menu-item>
    <ea-menu-item index="1">Processing Center</ea-menu-item>
    <ea-sub-menu index="2">
      <span slot="title">Workspace</span>
      <ea-menu-item index="2-1">item one</ea-menu-item>
      <ea-menu-item index="2-2">item two</ea-menu-item>
      <ea-menu-item index="2-3">item three</ea-menu-item>
      <ea-sub-menu index="2-4">
        <span slot="title">item four</span>
        <ea-menu-item index="2-4-1">item one</ea-menu-item>
        <ea-menu-item index="2-4-2">item two</ea-menu-item>
        <ea-menu-item index="2-4-3">item three</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
  </ea-menu>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-menu default-active="1" class="ea-menu-demo" mode="horizontal">
    <ea-menu-item index="0" style="margin-right: auto">
      <img
        style="width: 100px"
        src="https://github.com/LuminaQAQ/ea-ui-component/raw/master/public/logo.png"
        alt="EasyUI logo"
      />
    </ea-menu-item>
    <ea-menu-item index="1">Processing Center</ea-menu-item>
    <ea-sub-menu index="2">
      <span slot="title">Workspace</span>
      <ea-menu-item index="2-1">item one</ea-menu-item>
      <ea-menu-item index="2-2">item two</ea-menu-item>
      <ea-menu-item index="2-3">item three</ea-menu-item>
      <ea-sub-menu index="2-4">
        <span slot="title">item four</span>
        <ea-menu-item index="2-4-1">item one</ea-menu-item>
        <ea-menu-item index="2-4-2">item two</ea-menu-item>
        <ea-menu-item index="2-4-3">item three</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
  </ea-menu>
</div>
```

:::

## 侧栏

垂直菜单，可内嵌子菜单。通过使用 `ea-menu-item-group` 组件可以实现菜单进行分组。

<div class="demo row left">
  <ea-menu default-active="2" class="ea-menu-vertical-demo" mode="vertical" style="width: 250px; min-height: 600px; border-right: 1px solid #ccc;">
    <ea-sub-menu index="1">
      <span slot="title">
        <ea-icon name="location-dot"></ea-icon>
        <span>Navigator One</span>
      </span>
      <ea-menu-item-group group-title="Group One">
        <ea-menu-item index="1-1">item one</ea-menu-item>
        <ea-menu-item index="1-2">item two</ea-menu-item>
      </ea-menu-item-group>
      <ea-menu-item-group group-title="Group Two">
        <ea-menu-item index="1-3">item three</ea-menu-item>
      </ea-menu-item-group>
      <ea-sub-menu index="1-4">
        <span slot="title">
          <span>item four</span>
        </span>
        <ea-menu-item index="1-4-1">item one</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
    <ea-menu-item index="2">
      <ea-icon name="table-cells-large"></ea-icon>
      <span>Navigator Two</span>
    </ea-menu-item>
    <ea-menu-item index="3" disabled>
      <ea-icon name="table"></ea-icon>
      <span>Navigator Three</span>
    </ea-menu-item>
    <ea-menu-item index="4">
      <ea-icon name="gear"></ea-icon>
      <span>Navigator Four</span>
    </ea-menu-item>
  </ea-menu>
  <ea-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="ea-menu-vertical-demo"
    default-active="2"
    mode="vertical"
    text-color="#fff"
    style="--ea-menu-hover-bg-color: rgb(67, 74, 80); width: 250px; min-height: 600px;"
  >
    <ea-sub-menu index="1">
      <span slot="title">
        <ea-icon name="location-dot"></ea-icon>
        <span>Navigator One</span>
      </span>
      <ea-menu-item-group group-title="Group One">
        <ea-menu-item index="1-1">item one</ea-menu-item>
        <ea-menu-item index="1-2">item two</ea-menu-item>
      </ea-menu-item-group>
      <ea-menu-item-group group-title="Group Two">
        <ea-menu-item index="1-3">item three</ea-menu-item>
      </ea-menu-item-group>
      <ea-sub-menu index="1-4">
        <span slot="title">
          <span>item four</span>
        </span>
        <ea-menu-item index="1-4-1">item one</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
    <ea-menu-item index="2">
      <ea-icon name="table-cells-large"></ea-icon>
      <span>Navigator Two</span>
    </ea-menu-item>
    <ea-menu-item index="3" disabled>
      <ea-icon name="table"></ea-icon>
      <span>Navigator Three</span>
    </ea-menu-item>
    <ea-menu-item index="4">
      <ea-icon name="gear"></ea-icon>
      <span>Navigator Four</span>
    </ea-menu-item>
  </ea-menu>
</div>

::: details 查看代码

```html
<div class="demo">
  <!-- 白色侧栏 -->
  <ea-menu
    default-active="2"
    class="ea-menu-vertical-demo"
    mode="vertical"
    style="width: 250px; min-height: 600px; border-right: 1px solid #ccc;"
  >
    <ea-sub-menu index="1">
      <span slot="title">
        <ea-icon name="location-dot"></ea-icon>
        <span>Navigator One</span>
      </span>
      <ea-menu-item-group group-title="Group One">
        <ea-menu-item index="1-1">item one</ea-menu-item>
        <ea-menu-item index="1-2">item two</ea-menu-item>
      </ea-menu-item-group>
      <ea-menu-item-group group-title="Group Two">
        <ea-menu-item index="1-3">item three</ea-menu-item>
      </ea-menu-item-group>
      <ea-sub-menu index="1-4">
        <span slot="title">
          <span>item four</span>
        </span>
        <ea-menu-item index="1-4-1">item one</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
    <ea-menu-item index="2">
      <ea-icon name="table-cells-large"></ea-icon>
      <span>Navigator Two</span>
    </ea-menu-item>
    <ea-menu-item index="3" disabled>
      <ea-icon name="table"></ea-icon>
      <span>Navigator Three</span>
    </ea-menu-item>
    <ea-menu-item index="4">
      <ea-icon name="gear"></ea-icon>
      <span>Navigator Four</span>
    </ea-menu-item>
  </ea-menu>
  <!-- 黑色侧栏 -->
  <ea-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="ea-menu-vertical-demo"
    default-active="2"
    mode="vertical"
    text-color="#fff"
    style="--ea-menu-hover-bg-color: rgb(67, 74, 80); width: 250px;  min-height: 600px;"
  >
    <ea-sub-menu index="1">
      <span slot="title">
        <ea-icon name="location-dot"></ea-icon>
        <span>Navigator One</span>
      </span>
      <ea-menu-item-group group-title="Group One">
        <ea-menu-item index="1-1">item one</ea-menu-item>
        <ea-menu-item index="1-2">item two</ea-menu-item>
      </ea-menu-item-group>
      <ea-menu-item-group group-title="Group Two">
        <ea-menu-item index="1-3">item three</ea-menu-item>
      </ea-menu-item-group>
      <ea-sub-menu index="1-4">
        <span slot="title">
          <span>item four</span>
        </span>
        <ea-menu-item index="1-4-1">item one</ea-menu-item>
      </ea-sub-menu>
    </ea-sub-menu>
    <ea-menu-item index="2">
      <ea-icon name="table-cells-large"></ea-icon>
      <span>Navigator Two</span>
    </ea-menu-item>
    <ea-menu-item index="3" disabled>
      <ea-icon name="table"></ea-icon>
      <span>Navigator Three</span>
    </ea-menu-item>
    <ea-menu-item index="4">
      <ea-icon name="gear"></ea-icon>
      <span>Navigator Four</span>
    </ea-menu-item>
  </ea-menu>
</div>
```

:::

## 实例

结合 `ea-container` 实现侧栏 + 顶栏的完整布局。

<div class="demo">
  <style>
    .ea-container {
      display: block;
      height: 100vh;
    }

    .ea-aside {
      flex: 1 0 0;
      min-width: 0;
    }

    .ea-container-left {
      --ea-container-direction: column;
      flex: 1 0 0;
      width: 100%;
      overflow: auto;
    }

  </style>
  <ea-container class="ea-container" direction="horizontal">
    <ea-aside width="300px">
      <ea-menu default-active="2" class="ea-menu-vertical-demo" mode="vertical">
        <ea-sub-menu index="1">
          <span slot="title">
            <ea-icon name="location-dot"></ea-icon>
            <span>Navigator One</span>
          </span>
          <ea-menu-item-group group-title="Group One">
            <ea-menu-item index="1-1">item one</ea-menu-item>
            <ea-menu-item index="1-2">item two</ea-menu-item>
          </ea-menu-item-group>
          <ea-menu-item-group group-title="Group Two">
            <ea-menu-item index="1-3">item three</ea-menu-item>
          </ea-menu-item-group>
          <ea-sub-menu index="1-4">
            <span slot="title">
              <span>item four</span>
            </span>
            <ea-menu-item index="1-4-1">item one</ea-menu-item>
          </ea-sub-menu>
        </ea-sub-menu>
        <ea-menu-item index="2">
          <ea-icon name="table-cells-large"></ea-icon>
          <span>Navigator Two</span>
        </ea-menu-item>
        <ea-menu-item index="3" disabled>
          <ea-icon name="table"></ea-icon>
          <span>Navigator Three</span>
        </ea-menu-item>
        <ea-menu-item index="4">
          <ea-icon name="gear"></ea-icon>
          <span>Navigator Four</span>
        </ea-menu-item>
      </ea-menu>
    </ea-aside>
    <ea-container class="ea-container-left" direction="vertical">
      <ea-header>
        <ea-menu default-active="2" mode="horizontal" class="ea-menu-demo">
          <ea-sub-menu index="1">
            <span slot="title">
              <ea-icon name="location-dot"></ea-icon>
              <span>Navigator One</span>
            </span>
            <ea-menu-item-group group-title="Group One">
              <ea-menu-item index="1-1">item one</ea-menu-item>
              <ea-menu-item index="1-2">item two</ea-menu-item>
            </ea-menu-item-group>
            <ea-menu-item-group group-title="Group Two">
              <ea-menu-item index="1-3">item three</ea-menu-item>
            </ea-menu-item-group>
            <ea-sub-menu index="1-4">
              <span slot="title">
                <span>item four</span>
              </span>
              <ea-menu-item index="1-4-1">item one</ea-menu-item>
            </ea-sub-menu>
          </ea-sub-menu>
          <ea-menu-item index="2">
            <ea-icon name="table-cells-large"></ea-icon>
            <span>Navigator Two</span>
          </ea-menu-item>
          <ea-menu-item index="3" disabled>
            <ea-icon name="table"></ea-icon>
            <span>Navigator Three</span>
          </ea-menu-item>
          <ea-menu-item index="4">
            <ea-icon name="gear"></ea-icon>
            <span>Navigator Four</span>
          </ea-menu-item>
        </ea-menu>
      </ea-header>
      <ea-main>
        这个示例在 Header 下方嵌套了一个包含 Aside 和 Main 的 ea-container。
      </ea-main>
    </ea-container>
  </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <style>
    .ea-container {
      display: block;
      height: 100vh;
    }

    .ea-aside {
      flex: 1 0 0;
      min-width: 0;
    }

    .ea-container-left {
      --ea-container-direction: column;
      flex: 1 0 0;
      width: 100%;
      overflow: auto;
    }
  </style>
  <ea-container class="ea-container" direction="horizontal">
    <ea-aside width="300px">
      <ea-menu default-active="2" class="ea-menu-vertical-demo" mode="vertical">
        <ea-sub-menu index="1">
          <span slot="title">
            <ea-icon name="location-dot"></ea-icon>
            <span>Navigator One</span>
          </span>
          <ea-menu-item-group group-title="Group One">
            <ea-menu-item index="1-1">item one</ea-menu-item>
            <ea-menu-item index="1-2">item two</ea-menu-item>
          </ea-menu-item-group>
          <ea-menu-item-group group-title="Group Two">
            <ea-menu-item index="1-3">item three</ea-menu-item>
          </ea-menu-item-group>
          <ea-sub-menu index="1-4">
            <span slot="title">
              <span>item four</span>
            </span>
            <ea-menu-item index="1-4-1">item one</ea-menu-item>
          </ea-sub-menu>
        </ea-sub-menu>
        <ea-menu-item index="2">
          <ea-icon name="table-cells-large"></ea-icon>
          <span>Navigator Two</span>
        </ea-menu-item>
        <ea-menu-item index="3" disabled>
          <ea-icon name="table"></ea-icon>
          <span>Navigator Three</span>
        </ea-menu-item>
        <ea-menu-item index="4">
          <ea-icon name="gear"></ea-icon>
          <span>Navigator Four</span>
        </ea-menu-item>
      </ea-menu>
    </ea-aside>
    <ea-container class="ea-container-left" direction="vertical">
      <ea-header>
        <ea-menu default-active="2" mode="horizontal" class="ea-menu-demo">
          <ea-sub-menu index="1">
            <span slot="title">
              <ea-icon name="location-dot"></ea-icon>
              <span>Navigator One</span>
            </span>
            <ea-menu-item-group group-title="Group One">
              <ea-menu-item index="1-1">item one</ea-menu-item>
              <ea-menu-item index="1-2">item two</ea-menu-item>
            </ea-menu-item-group>
            <ea-menu-item-group group-title="Group Two">
              <ea-menu-item index="1-3">item three</ea-menu-item>
            </ea-menu-item-group>
            <ea-sub-menu index="1-4">
              <span slot="title">
                <span>item four</span>
              </span>
              <ea-menu-item index="1-4-1">item one</ea-menu-item>
            </ea-sub-menu>
          </ea-sub-menu>
          <ea-menu-item index="2">
            <ea-icon name="table-cells-large"></ea-icon>
            <span>Navigator Two</span>
          </ea-menu-item>
          <ea-menu-item index="3" disabled>
            <ea-icon name="table"></ea-icon>
            <span>Navigator Three</span>
          </ea-menu-item>
          <ea-menu-item index="4">
            <ea-icon name="gear"></ea-icon>
            <span>Navigator Four</span>
          </ea-menu-item>
        </ea-menu>
      </ea-header>
      <ea-main>
        这个示例在 Header 下方嵌套了一个包含 Aside 和 Main 的 ea-container。
      </ea-main>
    </ea-container>
  </ea-container>
</div>
```

:::

## Menu API

### Menu Attributes

| 参数              | 说明                              | 类型    | 可选值                       | 默认值     |
| ----------------- | --------------------------------- | ------- | ---------------------------- | ---------- |
| mode              | 菜单模式，决定是水平还是垂直显示  | string  | `"horizontal" \| "vertical"` | "vertical" |
| background-color  | 菜单背景色                        | string  | -                            | "#ffffff"  |
| text-color        | 菜单文字颜色                      | string  | -                            | "#303133"  |
| active-text-color | 当前激活菜单的文字颜色            | string  | -                            | "#409eff"  |
| default-active    | 初始激活的菜单项 index 值         | string  | -                            | ""         |
| active            | 动态控制当前激活的菜单项 index 值 | string  | -                            | ""         |
| collapse          | 是否折叠菜单                      | boolean | -                            | false      |

### Menu CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                      |
| --------- | ----------------------------------------- |
| container | 外层容器 (菜单根节点，`part="container"`) |

### Menu Events

| 事件名 | 说明         | detail                                           |
| ------ | ------------ | ------------------------------------------------ |
| select | 菜单激活回调 | `e.detail: {index: String, target: HTMLElement}` |

### Menu Slots

| 名称 | 说明                 | 子标签                                |
| ---- | -------------------- | ------------------------------------- |
| -    | 菜单内容的默认插槽。 | SubMenu / Menu-Item / Menu-Item-Group |

## SubMenu API

### SubMenu Attributes

| 参数     | 说明             | 类型    | 可选值                       | 默认值     |
| -------- | ---------------- | ------- | ---------------------------- | ---------- |
| index    | 子菜单的唯一标识 | string  | -                            | ""         |
| mode     | 菜单模式         | string  | `"horizontal" \| "vertical"` | "vertical" |
| disabled | 是否禁用         | boolean | -                            | false      |
| active   | 是否激活         | boolean | -                            | false      |
| open     | 是否展开         | boolean | -                            | false      |
| label    | 子菜单标题文本   | string  | -                            | ""         |

### SubMenu CSS Part

| 名称      | 说明                                                   |
| --------- | ------------------------------------------------------ |
| container | 外层容器 (`part="container"`)                          |
| title     | 标题容器，包含具名插槽 `slot="title"` (`part="title"`) |
| arrow     | 展示为下拉或右箭头的图标 (`part="arrow"`)              |
| content   | 子菜单列表容器，默认插槽所在处 (`part="content"`)      |

### SubMenu Slots

| 名称  | 说明                                                                |
| ----- | ------------------------------------------------------------------- |
| title | 子菜单标题（具名插槽）                                              |
| -     | 子菜单项（默认插槽，放置 `ea-menu-item` / `ea-menu-item-group` 等） |

## Menu-Item API

### Menu-Item Attributes

| 参数     | 说明                   | 类型    | 可选值 | 默认值 |
| -------- | ---------------------- | ------- | ------ | ------ |
| index    | 菜单项的唯一标识       | string  | -      | ""     |
| active   | 菜单项是否激活（属性） | boolean | -      | false  |
| disabled | 菜单项是否禁用         | boolean | -      | false  |

### Menu-Item CSS Part

| 名称      | 说明                                |
| --------- | ----------------------------------- |
| container | 菜单项外层容器 (`part="container"`) |

### Menu-Item Slots

| 名称 | 说明                 |
| ---- | -------------------- |
| -    | 菜单内容的默认插槽。 |

## Menu-Item-Group API

### Menu-Item-Group Attributes

| 参数        | 说明       | 类型   | 可选值 | 默认值 |
| ----------- | ---------- | ------ | ------ | ------ |
| group-title | 菜单组标题 | string | -      | ""     |

### Menu-Item-Group CSS Part

| 名称      | 说明                                    |
| --------- | --------------------------------------- |
| container | 菜单项外层容器 (li，`part="container"`) |
| title     | 菜单项标题容器 (`part="title"`)         |
| content   | 菜单项内容容器 (`part="content"`)       |

### Menu-Item-Group Slots

| 名称  | 说明                                              |
| ----- | ------------------------------------------------- |
| -     | 菜单项内容（默认插槽）                            |
| title | 菜单组标题（具名插槽，或使用 `group-title` 属性） |
