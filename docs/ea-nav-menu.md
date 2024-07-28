<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    import('../components/ea-switch/index.js')
    import('../components/ea-menu/index.js')
    import('../components/ea-menu-item/index.js')
    import('../components/ea-menu-item-group/index.js')
    import('../components/ea-submenu/index.js')
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

> [!CAUTION]
> 若出现奇怪布局, 刷新浏览器即可 ( `vitepress` 不知道抽的什么风, 可以正常直接使用)

## 顶栏

适用广泛的基础用法。

> 导航菜单默认为垂直模式，通过 `mode` 属性可以使导航菜单变更为水平模式。另外，在菜单中通过 `submenu` 组件可以生成二级菜单。Menu 还提供了 `background-color`、`text-color` 和 `active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

<div class="demo">
    <ea-menu mode="horizontal">
        <ea-menu-item actived>首页</ea-menu-item>
        <ea-menu-item>产品中心</ea-menu-item>
        <ea-menu-item>关于我们</ea-menu-item>
        <ea-menu-item disabled>
            <ea-icon icon="icon-coffee"></ea-icon>
            <a href="https://luminaqaq.github.io/ea_ui_component/" target="_blank">联系我们</a>
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
            <ea-icon icon="icon-coffee"></ea-icon>
            <a href="https://luminaqaq.github.io/ea_ui_component/" target="_blank">联系我们</a>
        </ea-menu-item>
        <ea-submenu disabled>
            <div slot='title'>更多</div>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
            <ea-menu-item>关于我们</ea-menu-item>
        </ea-submenu>
    </ea-menu>
</div>

## 侧栏

垂直菜单，可内嵌子菜单。

> 通过 `ea-menu-item-group` 组件可以实现菜单进行分组。

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

## Menu Attribute

| 参数              | 说明                   | 类型   | 可选值                | 默认值     |
| ----------------- | ---------------------- | ------ | --------------------- | ---------- |
| mode              | 菜单类型               | string | horizontal / vertical | horizontal |
| background-color  | 背景颜色               | string | -                     | #fff       |
| text-color        | 文字颜色               | string | -                     | #303133    |
| active-text-color | 当前激活菜单的文字颜色 | string | -                     | #409eff    |

## Menu Event

| 事件名 | 说明     | 参数 |
| ------ | -------- | ---- |
| select | 点击菜单 | -    |

## Menu Item Attribute

| 参数     | 说明     | 类型    | 可选值 | 默认值 |
| -------- | -------- | ------- | ------ | ------ |
| actived  | 是否激活 | boolean | -      | false  |
| disabled | 是否禁用 | boolean | -      | false  |

## Menu Item Group Slot

| 名称  | 说明       |
| ----- | ---------- |
| title | 菜单组标题 |
