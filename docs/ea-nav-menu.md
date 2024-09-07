<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-switch/index.js')
    import('../components/ea-menu/index.js')
    import('../components/ea-link/index.js')
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

# NavMenu 导航菜单

为网站提供导航功能的菜单。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-menu/index.js";
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

移步到 [CSS Part](#menu-css-part)。

## 顶栏

适用广泛的基础用法。

::: tip

导航菜单默认为垂直模式，通过 `mode` 属性可以使导航菜单变更为水平模式。另外，在菜单中通过 `submenu` 组件可以生成二级菜单。Menu 还提供了 `background-color`、`text-color` 和 `active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

:::

<div class="demo">
    <ea-menu mode="horizontal">
        <ea-menu-item actived>首页</ea-menu-item>
        <ea-menu-item>产品中心</ea-menu-item>
        <ea-menu-item>关于我们</ea-menu-item>
        <ea-menu-item disabled>
            <ea-link href="#navmenu-导航菜单" target="_blank" icon="icon-coffee" disabled>联系我们</ea-link>
        </ea-menu-item>
        <ea-submenu>
            <div slot='title'>更多</div>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
        </ea-submenu>
    </ea-menu>
    <ea-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <ea-menu-item actived>首页</ea-menu-item>
        <ea-menu-item>产品中心</ea-menu-item>
        <ea-menu-item>关于我们</ea-menu-item>
        <ea-menu-item>
            <ea-link type="primary" href="#navmenu-导航菜单" target="_blank" icon="icon-coffee">联系我们</ea-link>
        </ea-menu-item>
        <ea-submenu disabled>
            <div slot='title'>更多</div>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
        </ea-submenu>
    </ea-menu>
</div>

::: details 查看代码

```html
<div class="demo">
  <!-- 白色顶栏 -->
  <ea-menu mode="horizontal">
    <ea-menu-item actived>首页</ea-menu-item>
    <ea-menu-item>产品中心</ea-menu-item>
    <ea-menu-item>关于我们</ea-menu-item>
    <ea-menu-item disabled>
      <ea-icon icon="icon-coffee"></ea-icon>
      <a href="https://luminaqaq.github.io/ea_ui_component/" target="_blank"
        >联系我们</a
      >
    </ea-menu-item>
    <ea-submenu>
      <div slot="title">更多</div>
      <ea-menu-item>关于我们</ea-menu-item>
      <ea-menu-item>关于我们</ea-menu-item>
      <ea-menu-item>关于我们</ea-menu-item>
    </ea-submenu>
  </ea-menu>

  <!-- 黑色顶栏 -->
  <ea-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <ea-menu-item actived>首页</ea-menu-item>
    <ea-menu-item>产品中心</ea-menu-item>
    <ea-menu-item>关于我们</ea-menu-item>
    <ea-menu-item>
      <ea-icon icon="icon-coffee"></ea-icon>
      <a href="https://luminaqaq.github.io/ea_ui_component/" target="_blank"
        >联系我们</a
      >
    </ea-menu-item>
    <ea-submenu disabled>
      <div slot="title">更多</div>
      <ea-menu-item>关于我们</ea-menu-item>
      <ea-menu-item>关于我们</ea-menu-item>
      <ea-menu-item>关于我们</ea-menu-item>
    </ea-submenu>
  </ea-menu>
</div>
```

:::

## 侧栏

垂直菜单，可内嵌子菜单。通过使用 `ea-menu-item-group` 组件可以实现菜单进行分组。

<div class="row flex-start" style="height: 500px;">
    <ea-menu class="vertical" mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <ea-menu-item actived>
            <ea-icon icon="icon-crown"></ea-icon>
            <span class="ea-menu-item-title">联系我们</span>
        </ea-menu-item>
        <ea-menu-item>
            <ea-icon icon="icon-briefcase"></ea-icon>
            <span class="ea-menu-item-title">产品中心</span>
        </ea-menu-item>
        <ea-menu-item>
            <ea-icon icon="icon-user"></ea-icon>
            <span class="ea-menu-item-title">关于我们</span>
        </ea-menu-item>
        <ea-menu-item>
            <ea-icon icon="icon-mail-alt"></ea-icon>
            <span class="ea-menu-item-title">联系我们</span>
        </ea-menu-item>
        <ea-menu-item-group>
            <div slot='title'>
                <ea-icon icon="icon-th-large"></ea-icon>
                <span class="ea-menu-item-title">更多</span>
            </div>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
        </ea-menu-item-group>
    </ea-menu>
    <ea-menu class="vertical" mode="vertical">
        <ea-menu-item actived>
            <ea-icon icon="icon-crown"></ea-icon>
            <span class="ea-menu-item-title">联系我们</span>
        </ea-menu-item>
        <ea-menu-item>
            <ea-icon icon="icon-briefcase"></ea-icon>
            <span class="ea-menu-item-title">产品中心</span>
        </ea-menu-item>
        <ea-menu-item>
            <ea-icon icon="icon-user"></ea-icon>
            <span class="ea-menu-item-title">关于我们</span>
        </ea-menu-item>
        <ea-menu-item>
            <ea-icon icon="icon-mail-alt"></ea-icon>
            <span class="ea-menu-item-title">联系我们</span>
        </ea-menu-item>
        <ea-menu-item-group>
            <div slot='title'>
                <ea-icon icon="icon-th-large"></ea-icon>
                <span class="ea-menu-item-title">更多</span>
            </div>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
        </ea-menu-item-group>
    </ea-menu>
</div>

::: details 查看代码

```html
<div class="row flex-start" style="height: 500px;">
  <!-- 黑色侧边栏 -->
  <ea-menu
    class="vertical"
    mode="vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <ea-menu-item actived>
      <ea-icon icon="icon-crown"></ea-icon>
      <span class="ea-menu-item-title">联系我们</span>
    </ea-menu-item>
    <ea-menu-item>
      <ea-icon icon="icon-briefcase"></ea-icon>
      <span class="ea-menu-item-title">产品中心</span>
    </ea-menu-item>
    <ea-menu-item>
      <ea-icon icon="icon-user"></ea-icon>
      <span class="ea-menu-item-title">关于我们</span>
    </ea-menu-item>
    <ea-menu-item>
      <ea-icon icon="icon-mail-alt"></ea-icon>
      <span class="ea-menu-item-title">联系我们</span>
    </ea-menu-item>
    <ea-menu-item-group>
      <div slot="title">
        <ea-icon icon="icon-th-large"></ea-icon>
        <span class="ea-menu-item-title">更多</span>
      </div>
      <ea-menu-item>关于我们</ea-menu-item>
      <ea-menu-item>关于我们</ea-menu-item>
      <ea-menu-item>关于我们</ea-menu-item>
    </ea-menu-item-group>
  </ea-menu>

  <!-- 白色侧边栏 -->
  <ea-menu class="vertical" mode="vertical">
    <ea-menu-item actived>
      <ea-icon icon="icon-crown"></ea-icon>
      <span class="ea-menu-item-title">联系我们</span>
    </ea-menu-item>
    <ea-menu-item>
      <ea-icon icon="icon-briefcase"></ea-icon>
      <span class="ea-menu-item-title">产品中心</span>
    </ea-menu-item>
    <ea-menu-item>
      <ea-icon icon="icon-user"></ea-icon>
      <span class="ea-menu-item-title">关于我们</span>
    </ea-menu-item>
    <ea-menu-item>
      <ea-icon icon="icon-mail-alt"></ea-icon>
      <span class="ea-menu-item-title">联系我们</span>
    </ea-menu-item>
    <ea-menu-item-group>
      <div slot="title">
        <ea-icon icon="icon-th-large"></ea-icon>
        <span class="ea-menu-item-title">更多</span>
      </div>
      <ea-menu-item>关于我们</ea-menu-item>
      <ea-menu-item>关于我们</ea-menu-item>
      <ea-menu-item>关于我们</ea-menu-item>
    </ea-menu-item-group>
  </ea-menu>
</div>
```

:::

## Menu Attribute

| 参数              | 说明                   | 类型   | 可选值                | 默认值     |
| ----------------- | ---------------------- | ------ | --------------------- | ---------- |
| mode              | 菜单类型               | string | horizontal / vertical | horizontal |
| background-color  | 背景颜色               | string | -                     | #fff       |
| text-color        | 文字颜色               | string | -                     | #303133    |
| active-text-color | 当前激活菜单的文字颜色 | string | -                     | #409eff    |

## Menu Item Attribute

| 参数     | 说明     | 类型    | 可选值 | 默认值 |
| -------- | -------- | ------- | ------ | ------ |
| actived  | 是否激活 | boolean | -      | false  |
| disabled | 是否禁用 | boolean | -      | false  |

## Menu CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

## Menu Item CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

## Menu Item Group CSS Part

| 名称          | 说明                                 |
| ------------- | ------------------------------------ |
| container     | 外层容器                             |
| title-wrap    | 标题容器(插槽`slot="title"`所在容器) |
| dropdown-icon | 下拉图标                             |
| dropdown-wrap | 下拉列表容器(默认插槽所在容器)       |

## SubMenu CSS Part

| 名称          | 说明                                 |
| ------------- | ------------------------------------ |
| container     | 外层容器                             |
| title-wrap    | 标题容器(插槽`slot="title"`所在容器) |
| dropdown-icon | 下拉图标                             |
| dropdown-wrap | 下拉列表容器(默认插槽所在容器)       |

## Menu Event

| 事件名 | 说明     | 参数 |
| ------ | -------- | ---- |
| select | 点击菜单 | -    |

## Menu Item Group Slot

| 名称  | 说明       |
| ----- | ---------- |
| title | 菜单组标题 |
