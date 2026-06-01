<script setup>
import { onMounted } from 'vue'
import { EaNotification } from "../dist/components/ea-notification.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  const completeExample = {
    pageHeader: document.querySelector("#completePageHeader"),

    init() {
      this.pageHeader.addEventListener("ea-back", () => {
        EaNotification({
          type: "info",
          heading: "Back",
          message: "Go back clicked!",
        });
      });
    },
  };
  completeExample.init();

  const basicExample = {
    pageHeader: document.querySelector("#basicPageHeader"),

    init() {
      this.pageHeader.addEventListener("ea-back", () => {
        EaNotification({
          type: "info",
          heading: "Back",
          message: "Go back clicked!",
        });
      });
    },
  };
  basicExample.init();
})
</script>

# PageHeader 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。页头组件支持返回按钮、面包屑导航、标题内容、额外操作区等功能，并提供丰富的插槽和 CSS Custom Properties用于定制化。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-page-header.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-page-header";
```

:::

## 自定义样式

移步到 [CSS Part](#pageheader-css-part) 和 [CSS Custom Properties](#pageheader-css-自定义属性)。

## 完整示例

<div aria-label="A complete example of page header" class="demo">
  <ea-page-header id="completePageHeader">
    <ea-breadcrumb slot="breadcrumb" separator="/">
      <ea-breadcrumb-item href="#"> homepage </ea-breadcrumb-item>
      <ea-breadcrumb-item href="#"> route 1 </ea-breadcrumb-item>
      <ea-breadcrumb-item>route 2</ea-breadcrumb-item>
    </ea-breadcrumb>
    <div class="flex items-center" slot="content">
      <ea-avatar
        class="mr-3"
        size="32px"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></ea-avatar>
      <span class="text-large font-600 mr-3"> Title </span>
      <span class="text-sm mr-2"> Sub title </span>
      <ea-tag>Default</ea-tag>
    </div>
    <div class="flex items-center" slot="extra">
      <ea-button>Print</ea-button>
      <ea-button variant="primary" class="ml-2">Edit</ea-button>
    </div>
    <ea-descriptions>
      <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
      <ea-descriptions-item label="Essence">
        Lord of the Wild
      </ea-descriptions-item>
      <ea-descriptions-item label="Place">
        Lunacrest Continent
      </ea-descriptions-item>
      <ea-descriptions-item label="Traits">
        <ea-tag size="small" type="warning" style="margin-right: 1rem">
          Thunderous Veins
        </ea-tag>
        <ea-tag size="small" type="info">Daredevil</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="Description">
        She was once an elf lord, defending the border from goblin invaders. She
        was then a goblin warrior, protecting her clan from being slaughtered by
        elves. She has the unwavering courage to uphold justice in her heart and
        she is prepared to betray or be betrayed for the greater good. Despite
        her inner gentleness, Lilyiro, who has spilled so much blood on
        battlefields, is more straightforward than men.
      </ea-descriptions-item>
    </ea-descriptions>
  </ea-page-header>
</div>

:::: details 查看代码

::: code-group

```html
<div aria-label="A complete example of page header" class="demo">
  <ea-page-header id="completePageHeader">
    <ea-breadcrumb slot="breadcrumb" separator="/">
      <ea-breadcrumb-item href="#"> homepage </ea-breadcrumb-item>
      <ea-breadcrumb-item href="#"> route 1 </ea-breadcrumb-item>
      <ea-breadcrumb-item>route 2</ea-breadcrumb-item>
    </ea-breadcrumb>
    <div class="flex items-center" slot="content">
      <ea-avatar
        class="mr-3"
        size="32px"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></ea-avatar>
      <span class="text-large font-600 mr-3"> Title </span>
      <span class="text-sm mr-2"> Sub title </span>
      <ea-tag>Default</ea-tag>
    </div>
    <div class="flex items-center" slot="extra">
      <ea-button>Print</ea-button>
      <ea-button variant="primary" class="ml-2">Edit</ea-button>
    </div>
    <ea-descriptions>
      <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
      <ea-descriptions-item label="Essence">
        Lord of the Wild
      </ea-descriptions-item>
      <ea-descriptions-item label="Place">
        Lunacrest Continent
      </ea-descriptions-item>
      <ea-descriptions-item label="Traits">
        <ea-tag size="small" type="warning" style="margin-right: 1rem">
          Thunderous Veins
        </ea-tag>
        <ea-tag size="small" type="info">Daredevil</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="Description">
        She was once an elf lord, defending the border from goblin invaders. She
        was then a goblin warrior, protecting her clan from being slaughtered by
        elves. She has the unwavering courage to uphold justice in her heart and
        she is prepared to betray or be betrayed for the greater good. Despite
        her inner gentleness, Lilyiro, who has spilled so much blood on
        battlefields, is more straightforward than men.
      </ea-descriptions-item>
    </ea-descriptions>
  </ea-page-header>
</div>
```

```js
import { EaNotification } from "./node_modules/easy-component-ui/components/ea-notification/index.js";

const completeExample = {
  pageHeader: document.querySelector("#completePageHeader"),

  init() {
    this.pageHeader.addEventListener("ea-back", () => {
      EaNotification({
        type: "info",
        heading: "Back",
        message: "Go back clicked!",
      });
    });
  },
};
completeExample.init();
```

:::

::::

## 基础用法

简单场景下的标准页头。

<div class="demo">
  <ea-page-header id="basicPageHeader">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-page-header id="basicPageHeader">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>
```

```js
import { EaNotification } from "./node_modules/easy-component-ui/components/ea-notification/index.js";

const basicExample = {
  pageHeader: document.querySelector("#basicPageHeader"),

  init() {
    this.pageHeader.addEventListener("ea-back", () => {
      EaNotification({
        type: "info",
        heading: "Back",
        message: "Go back clicked!",
      });
    });
  },
};
basicExample.init();
```

:::

::::

## 使用 heading 和 content 属性

通过 `heading` 属性设置返回按钮文字，通过 `content` 属性设置页头右侧主要内容的文本。设置属性后，对应的插槽内容将被替换为属性值；属性值为空时恢复插槽。

<div class="demo">
  <ea-page-header heading="返回" content="页面标题"></ea-page-header>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-page-header heading="返回" content="页面标题"></ea-page-header>
</div>
```

:::

## 自定义图标

默认图标可能无法满足您的需求，您可以通过设置 `icon` 属性来自定义图标名称。

<div class="demo">
  <ea-page-header icon="rotate-left">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-page-header icon="rotate-left">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>
```

:::

## 无图标

将 `icon` 属性设为空字符串时，图标区域将被隐藏。

<div class="demo">
  <ea-page-header icon="">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-page-header icon="">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>
```

:::

## 面包屑导航

使用页头组件，您可以通过添加插槽 `breadcrumb` 来设置面包屑路由导航。

<div class="demo">
  <ea-page-header>
    <ea-breadcrumb slot="breadcrumb" separator="/">
      <ea-breadcrumb-item href="#"> homepage </ea-breadcrumb-item>
      <ea-breadcrumb-item href="#"> route 1 </ea-breadcrumb-item>
      <ea-breadcrumb-item>route 2</ea-breadcrumb-item>
    </ea-breadcrumb>
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-page-header>
    <ea-breadcrumb slot="breadcrumb" separator="/">
      <ea-breadcrumb-item href="#"> homepage </ea-breadcrumb-item>
      <ea-breadcrumb-item href="#"> route 1 </ea-breadcrumb-item>
      <ea-breadcrumb-item>route 2</ea-breadcrumb-item>
    </ea-breadcrumb>
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>
```

:::

## 额外操作部分

头部可能会变得很复杂，您可以在头部添加更多的区块，以允许丰富的交互。

<div class="demo">
  <ea-page-header>
    <div class="flex items-center" slot="content">
      <ea-avatar
        class="mr-3"
        size="32px"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></ea-avatar>
      <span class="text-large font-600 mr-3"> Title </span>
      <span class="text-sm mr-2"> Sub title </span>
      <ea-tag>Default</ea-tag>
    </div>
    <div class="flex items-center" slot="extra">
      <ea-button>Print</ea-button>
      <ea-button variant="primary" class="ml-2">Edit</ea-button>
    </div>
  </ea-page-header>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-page-header>
    <div class="flex items-center" slot="content">
      <ea-avatar
        class="mr-3"
        size="32px"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></ea-avatar>
      <span class="text-large font-600 mr-3"> Title </span>
      <span class="text-sm mr-2"> Sub title </span>
      <ea-tag>Default</ea-tag>
    </div>
    <div class="flex items-center" slot="extra">
      <ea-button>Print</ea-button>
      <ea-button variant="primary" class="ml-2">Edit</ea-button>
    </div>
  </ea-page-header>
</div>
```

:::

## 主要内容

有时我们想让页头显示一些协同响应内容，我们可以使用 `default` 插槽。

<div class="demo">
  <ea-page-header>
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
    <strong>
      Your additional content can be added with default slot, You may put as
      many content as you want here.
    </strong>
  </ea-page-header>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-page-header>
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
    <strong>
      Your additional content can be added with default slot, You may put as
      many content as you want here.
    </strong>
  </ea-page-header>
</div>
```

:::

## PageHeader API

### PageHeader Attributes

| 参数    | 说明                                         | 类型   | 可选值 | 默认值       |
| ------- | -------------------------------------------- | ------ | ------ | ------------ |
| icon    | 返回按钮使用的图标名称，设为空字符串隐藏图标 | String | -      | "angle-left" |
| heading | 返回按钮文字（具名 slot "title" 的默认内容） | String | -      | ""           |
| content | 页头右侧主要内容的文本（也可通过 slot 填充） | String | -      | ""           |

> **注意**：`icon` 属性默认为 `"angle-left"`，即默认显示左箭头图标；将 `icon` 设为空字符串（`icon=""`）可隐藏图标区域。`heading` 属性默认为空字符串，slot "title" 的默认文本为 "Back"。`heading` 和 `content` 属性值会通过 `html()` 函数进行安全处理，防止 XSS 攻击。

### PageHeader CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称           | 说明                                    |
| -------------- | --------------------------------------- |
| container      | 外层容器                                |
| breadcrumb     | 面包屑插槽容器                          |
| header-wrapper | 标题与操作区的包装容器                  |
| back           | 返回按钮容器                            |
| icon           | 返回图标容器                            |
| back-icon      | 默认返回图标元素（slot 内的 `ea-icon`） |
| title          | 返回按钮文字容器                        |
| divider        | 分隔符                                  |
| content        | 主要内容容器                            |
| extra          | 额外操作区容器                          |

### PageHeader Slots

| 名称       | 说明                                                       |
| ---------- | ---------------------------------------------------------- |
| breadcrumb | 面包屑插槽，可放置 `ea-breadcrumb` 组件                    |
| icon       | 自定义返回图标，默认显示 `angle-left` 图标                 |
| title      | 返回按钮文字，默认文本由 `heading` 属性提供，默认为 "Back" |
| content    | 页头的主要内容区                                           |
| extra      | 额外操作区                                                 |
| default    | 默认插槽，用于放置额外内容                                 |

### PageHeader Events

| 事件名  | 说明               | 回调参数(event.detail) |
| ------- | ------------------ | ---------------------- |
| ea-back | 点击返回按钮时触发 | —                      |

### PageHeader CSS Custom Properties

| 属性名                               | 说明           | 默认值                  |
| ------------------------------------ | -------------- | ----------------------- |
| --ea-page-header-gap                 | 包装容器内间距 | var(--spacing-md)       |
| --ea-page-header-back-gap            | 返回按钮内间距 | var(--spacing-sm)       |
| --ea-page-header-divider-margin      | 分隔符外边距   | 0 var(--spacing-md)     |
| --ea-page-header-divider-color       | 分隔符颜色     | var(--grey-400)         |
| --ea-page-header-heading-font-size   | 返回文字字号   | var(--font-size-md)     |
| --ea-page-header-heading-font-weight | 返回文字字重   | var(--font-weight-md)   |
| --ea-page-header-heading-color       | 返回文字颜色   | var(--grey-700)         |
| --ea-page-header-content-font-size   | 内容字号       | var(--font-size-lg)     |
| --ea-page-header-content-font-weight | 内容字重       | var(--font-weight-bold) |
| --ea-page-header-content-color       | 内容颜色       | var(--grey-900)         |
