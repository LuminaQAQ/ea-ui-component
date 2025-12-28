<script setup>
import { onMounted } from 'vue'
import { EaNotification } from "../dist/components/ea-notification.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  const completeExample = {
    pageHeader: document.querySelector("#completePageHeader"),

    init() {
      this.pageHeader.addEventListener("back", () => {
        EaNotification({
          type: "info",
          title: "Back",
          message: "Go back clicked!",
        });
      });
    },
  };
  completeExample.init();

  const basicExample = {
    pageHeader: document.querySelector("#basicPageHeader"),

    init() {
      this.pageHeader.addEventListener("back", () => {
        EaNotification({
          type: "info",
          title: "Back",
          message: "Go back clicked!",
        });
      });
    },
  };
  basicExample.init();
})
</script>

# PageHeader 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-page-header/index.js";
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
      <ea-button type="primary" class="ml-2">Edit</ea-button>
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
      <ea-button type="primary" class="ml-2">Edit</ea-button>
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
    this.pageHeader.addEventListener("back", () => {
      EaNotification({
        type: "info",
        title: "Back",
        message: "Go back clicked!",
      });
    });
  },
};
completeExample.init();
```

:::

## 基础用法

简单场景下的标准页头。

<div class="demo">
  <ea-page-header id="basicPageHeader">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>

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
    this.pageHeader.addEventListener("back", () => {
      EaNotification({
        type: "info",
        title: "Back",
        message: "Go back clicked!",
      });
    });
  },
};
basicExample.init();
```

:::

## 自定义图标

默认图标可能无法满足您的需求，您可以通过设置`icon`属性来自定义图标，示例如下。

<div class="demo">
  <ea-page-header icon="icon-ccw">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
  <br />
  <ea-page-header icon="">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>

```html
<div class="demo">
  <!-- 自定义图标 -->
  <ea-page-header icon="icon-ccw">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
  <br />
  <!-- 无图标 -->
  <ea-page-header icon="">
    <span class="text-large font-600 mr-3" slot="content"> Title </span>
  </ea-page-header>
</div>
```

## 面包屑导航

使用页头组件，您可以通过添加插槽 breadcrumb 来设置面包屑路由导航。

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
      <ea-button type="primary" class="ml-2">Edit</ea-button>
    </div>
  </ea-page-header>
</div>

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
      <ea-button type="primary" class="ml-2">Edit</ea-button>
    </div>
  </ea-page-header>
</div>
```

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

## Attributes

### Attributes

| 参数    | 说明                                         | 类型   | 可选值 | 默认值            |
| ------- | -------------------------------------------- | ------ | ------ | ----------------- |
| icon    | 返回按钮使用的图标名称                       | String | -      | "icon-angle-left" |
| title   | 返回按钮文字（具名 slot "title" 的默认内容） | String | -      | "Back"            |
| content | 页头右侧主要内容的文本（也可通过 slot 填充） | String | -      | ""                |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称             | 说明                                                    |
| ---------------- | ------------------------------------------------------- |
| container        | 外层容器 (`part="container"`)                           |
| breadcrumb       | 面包屑插槽容器 (`part="breadcrumb"`)                    |
| header-wrapper   | 标题与操作区的包装容器 (`part="header-wrapper"`)        |
| back             | 返回按钮容器 (`part="back"`)                            |
| icon / back-icon | 返回图标容器 / back-icon（slot 内默认 ea-icon 的 part） |
| title            | 返回按钮文字容器 (`part="title"`)                       |
| divider          | 分隔符 (`part="divider"`)                               |
| content          | 主要内容容器 (`part="content"`)                         |
| extra            | 额外操作区容器 (`part="extra"`)                         |

## Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| back   | 点击返回按钮时派发 | -        |

## Slots

| 名称       | 说明                                                                 |
| ---------- | -------------------------------------------------------------------- |
| breadcrumb | 面包屑插槽，可放置 `ea-breadcrumb` 组件（slot="breadcrumb"）         |
| icon       | 自定义返回图标（具名 slot="icon"），如果不提供会显示默认的 `ea-icon` |
| title      | 返回按钮文字（具名 slot="title"，默认文本由 `title` 属性提供）       |
| content    | 页头的主要内容区（具名 slot="content"）                              |
| extra      | 额外操作区（具名 slot="extra"）                                      |
| -          | 默认插槽，可用于放置额外内容                                         |
