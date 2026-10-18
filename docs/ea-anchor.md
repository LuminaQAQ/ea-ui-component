<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../packages/components/dist/index.js')
})
</script>

<style>
  .anchor-demo-layout {
    display: flex;
    gap: 1.5rem;
  }

  .anchor-demo-pane {
    flex: 1;
    min-width: 0;
  }

  .anchor-demo-aside {
    flex: 0 0 160px;
    width: 160px;
  }

  .anchor-demo-block {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
    margin-bottom: 1rem;
    border-radius: 4px;
    background: var(--grey-100, #f5f7fa);
    color: var(--grey-700, #606266);
  }

  .anchor-demo-block-lg {
    height: 220px;
  }

  .anchor-demo-scroll-box {
    height: 260px;
    margin-top: 1rem;
    padding: 0 1rem;
    overflow-y: auto;
    border: 1px solid var(--grey-200, #e4e7ed);
    border-radius: 4px;
  }
</style>

# Anchor 锚点

锚点导航组件，用于长页面的区块定位滚动与当前区块联动高亮，支持嵌套层级、水平方向与吸附。

## 引入

::: code-group

```html [原生引入]
<script
  type="module"
  src="./node_modules/easy-component-ui/dist/components/ea-anchor.js"
></script>
```

```js [Vite]
import "easy-component-ui/ea-anchor";
```

:::

## 自定义样式

移步到 [CSS Part](#anchor-css-part) 和 [CSS Custom Properties](#anchor-css-custom-properties)。

## 基础用法 {#basic}

默认垂直排列。滚动页面时高亮随当前示例联动，点击链接平滑滚动到对应示例位置。

<div class="demo">
  <ea-anchor>
    <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
    <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
    <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
    <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
    <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
    <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
  </ea-anchor>
</div>

::: details 查看代码

```html
<ea-anchor>
  <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
  <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
  <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
  <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
  <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
  <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
</ea-anchor>
```

:::

## 指定偏移 {#offset}

设置 `offset="64"`，点击链接后目标示例停在距页面顶部 64px 处。

<div class="demo">
  <ea-anchor offset="64">
    <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
    <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
    <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
    <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
    <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
    <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
  </ea-anchor>
</div>

::: details 查看代码

```html
<ea-anchor offset="64">
  <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
  <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
  <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
  <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
  <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
  <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
</ea-anchor>
```

:::

## 水平方向 {#horizontal}

设置 `direction="horizontal"`，链接横向排列，marker 为底部下划线；滚动轴由容器实际可滚动方向自动判定，页面纵向滚动时同样联动高亮。

<div class="demo">
  <ea-anchor direction="horizontal">
    <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
    <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
    <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
    <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
    <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
    <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
  </ea-anchor>
</div>

::: details 查看代码

```html
<ea-anchor direction="horizontal">
  <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
  <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
  <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
  <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
  <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
  <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
</ea-anchor>
```

:::

## 嵌套目录 {#nested}

父级链接包含子级时，子级高亮会联动父级；此处按分组组织同一套示例链接。

<div class="demo">
  <ea-anchor>
    <ea-anchor-link href="#basic" heading="基础用法">
      <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
      <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
    </ea-anchor-link>
    <ea-anchor-link href="#nested" heading="嵌套目录">
      <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
      <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
    </ea-anchor-link>
  </ea-anchor>
</div>

::: details 查看代码

```html
<ea-anchor>
  <ea-anchor-link href="#basic" heading="基础用法">
    <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
    <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
  </ea-anchor-link>
  <ea-anchor-link href="#nested" heading="嵌套目录">
    <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
    <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
  </ea-anchor-link>
</ea-anchor>
```

:::

## 吸附导航 {#affix}

设置 `affix` 与 `offset="20"`，导航随页面滚动吸附在距顶部 20px 处。下方示例把导航放在右侧栏内，滚动整页即可观察其全程吸附效果。

<div class="demo">
  <div class="anchor-demo-layout">
    <div class="anchor-demo-pane">
      <div class="anchor-demo-block">区块一</div>
      <div class="anchor-demo-block">区块二</div>
      <div class="anchor-demo-block">区块三</div>
    </div>
    <div class="anchor-demo-aside">
      <ea-anchor affix offset="20">
        <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
        <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
        <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
        <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
        <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
        <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
      </ea-anchor>
    </div>
  </div>
</div>

::: details 查看代码

```html
<div class="anchor-demo-layout">
  <div class="anchor-demo-pane">
    <div class="anchor-demo-block">区块一</div>
    <div class="anchor-demo-block">区块二</div>
    <div class="anchor-demo-block">区块三</div>
  </div>
  <div class="anchor-demo-aside">
    <ea-anchor affix offset="20">
      <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
      <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
      <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
      <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
      <ea-anchor-link href="#affix" heading="吸附导航"></ea-anchor-link>
      <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
    </ea-anchor>
  </div>
</div>
```

:::

## 禁用链接 {#disabled}

此处将「吸附导航」一项设为 `disabled`，点击与高亮均不响应。

<div class="demo">
  <ea-anchor>
    <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
    <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
    <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
    <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
    <ea-anchor-link href="#affix" heading="吸附导航" disabled></ea-anchor-link>
    <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
  </ea-anchor>
</div>

::: details 查看代码

```html
<ea-anchor>
  <ea-anchor-link href="#basic" heading="基础用法"></ea-anchor-link>
  <ea-anchor-link href="#offset" heading="指定偏移"></ea-anchor-link>
  <ea-anchor-link href="#horizontal" heading="水平方向"></ea-anchor-link>
  <ea-anchor-link href="#nested" heading="嵌套目录"></ea-anchor-link>
  <ea-anchor-link href="#affix" heading="吸附导航" disabled></ea-anchor-link>
  <ea-anchor-link href="#disabled" heading="禁用链接"></ea-anchor-link>
</ea-anchor>
```

:::

## 指定滚动容器 {#container}

设置 `target="#container-scroll"`，锚点随容器内滚动联动，而不是页面滚动。

<div class="demo">
  <ea-anchor target="#container-scroll">
    <ea-anchor-link href="#container-api" heading="API"></ea-anchor-link>
    <ea-anchor-link href="#container-theme" heading="主题"></ea-anchor-link>
    <ea-anchor-link href="#container-faq" heading="常见问题"></ea-anchor-link>
  </ea-anchor>
  <div class="anchor-demo-scroll-box" id="container-scroll">
    <section id="container-api" class="anchor-demo-block anchor-demo-block-lg">
      API · 容器内滚动
    </section>
    <section id="container-theme" class="anchor-demo-block anchor-demo-block-lg">
      主题 · 容器内滚动
    </section>
    <section id="container-faq" class="anchor-demo-block anchor-demo-block-lg">
      常见问题 · 容器内滚动
    </section>
  </div>
</div>

::: details 查看代码

```html
<ea-anchor target="#container-scroll">
  <ea-anchor-link href="#container-api" heading="API"></ea-anchor-link>
  <ea-anchor-link href="#container-theme" heading="主题"></ea-anchor-link>
  <ea-anchor-link href="#container-faq" heading="常见问题"></ea-anchor-link>
</ea-anchor>

<div class="anchor-demo-scroll-box" id="container-scroll">
  <section id="container-api" class="anchor-demo-block anchor-demo-block-lg">
    API · 容器内滚动
  </section>
  <section id="container-theme" class="anchor-demo-block anchor-demo-block-lg">
    主题 · 容器内滚动
  </section>
  <section id="container-faq" class="anchor-demo-block anchor-demo-block-lg">
    常见问题 · 容器内滚动
  </section>
</div>
```

:::

## Anchor API

### Anchor Attributes

| 参数            | 说明                                                    | 类型    | 可选值                   | 默认值     |
| --------------- | ------------------------------------------------------- | ------- | ------------------------ | ---------- |
| target          | 滚动容器选择器，`window` 表示页面滚动                   | String  | —                        | `window`   |
| offset          | 滚动定位时目标区块距容器顶部的偏移量（用于固定头部）    | Number  | —                        | 0          |
| offset-boundary | 滚动高亮判定「当前区块」的顶部边界容差                  | Number  | —                        | 15         |
| duration        | 滚动动画时长（毫秒），`0` 表示瞬时跳转                  | Number  | —                        | 300        |
| direction       | 排列方向（仅决定排列与 marker 方向，不影响滚动轴）      | String  | `vertical \| horizontal` | `vertical` |
| marker          | 是否显示当前项滑块指示器                                | Boolean | —                        | true       |
| affix           | 是否吸附：容器为垂直方向时吸附顶部，水平方向时吸附左侧  | Boolean | —                        | false      |
| replace         | 点击后使用 `replaceState` 同步 hash（默认 `pushState`） | Boolean | —                        | false      |
| active          | 当前高亮链接的 `href`（可外部读写，实现受控）           | String  | —                        | ""         |

> `offset` 与 `offset-boundary` 均以 `offset` 开头但语义不同：`offset` 服务于**点击定位**（滚动终点偏移），`offset-boundary` 服务于**滚动高亮**（判定当前区块的顶部边界容差），默认值也不同。

### Anchor CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明               |
| --------- | ------------------ |
| container | 导航容器元素       |
| marker    | 当前项滑块指示元素 |

### Anchor Slots

| 名称    | 说明                              |
| ------- | --------------------------------- |
| default | 默认插槽，用于放置 ea-anchor-link |

### Anchor Methods

| 方法名         | 说明                       | 参数           |
| -------------- | -------------------------- | -------------- |
| scrollToAnchor | 程序化滚动到指定区块并高亮 | `href: string` |

### Anchor Events

| 事件名    | 说明                   | 回调参数(event.detail)        |
| --------- | ---------------------- | ----------------------------- |
| ea-click  | 点击锚点链接时触发     | `{ href, heading, targetEl }` |
| ea-change | 当前高亮链接变化时触发 | `{ href, heading }`           |

### Anchor CSS Custom Properties

| 属性名                        | 说明         | 默认值                   |
| ----------------------------- | ------------ | ------------------------ |
| --ea-anchor-font-size         | 字号         | var(--font-size-md)      |
| --ea-anchor-text-color        | 文本颜色     | var(--grey-700)          |
| --ea-anchor-text-color-active | 激活文本颜色 | var(--blue-500)          |
| --ea-anchor-marker-color      | 滑块颜色     | var(--blue-500)          |
| --ea-anchor-marker-width      | 滑块粗细     | 2px                      |
| --ea-anchor-marker-offset     | 滑块偏移量   | 0px                      |
| --ea-anchor-marker-size       | 滑块长度     | 0px                      |
| --ea-anchor-offset            | 吸附偏移量   | 0px                      |
| --ea-anchor-transition        | 过渡时长     | var(--transition-normal) |

## AnchorLink API

### AnchorLink Attributes

| 参数     | 说明               | 类型    | 可选值 | 默认值 |
| -------- | ------------------ | ------- | ------ | ------ |
| href     | 目标区块选择器     | String  | —      | ""     |
| heading  | 链接标题           | String  | —      | ""     |
| disabled | 是否禁用该链接     | Boolean | —      | false  |
| active   | 是否为当前高亮链接 | Boolean | —      | false  |

### AnchorLink CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明         |
| --------- | ------------ |
| container | 链接容器元素 |
| link      | 链接元素     |
| heading   | 标题元素     |

### AnchorLink Slots

| 名称    | 说明                      |
| ------- | ------------------------- |
| heading | 自定义链接标题内容        |
| default | 嵌套的子级 ea-anchor-link |

### AnchorLink CSS Custom Properties

| 属性名                               | 说明         | 默认值                 |
| ------------------------------------ | ------------ | ---------------------- |
| --ea-anchor-link-text-color          | 文本颜色     | var(--grey-700)        |
| --ea-anchor-link-text-color-active   | 激活文本颜色 | var(--blue-500)        |
| --ea-anchor-link-text-color-disabled | 禁用文本颜色 | var(--grey-400)        |
| --ea-anchor-link-indent              | 子级缩进     | var(--spacing-lg)      |
| --ea-anchor-link-marker-gap          | 与滑块的间隙 | var(--spacing-lg)      |
| --ea-anchor-link-transition          | 过渡时长     | var(--transition-fast) |
