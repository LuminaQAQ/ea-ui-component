<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
const loadingExample = {
  el: document.querySelector("#loadingSkeleton"),
  switch: document.querySelector("#loadingSwitch"),

  init() {
    this.switch.addEventListener("change", e => {
      const { value } = e.target;

      this.el.loading = value;
    });
  },
};

loadingExample.init();

const multipleDataExample = {
  el: document.querySelector("#multipleDataSkeleton"),
  switch: document.querySelector("#multipleDataSwitch"),

  init() {
    this.switch.addEventListener("change", e => {
      const { value } = e.detail;
      this.el.loading = value;
    });
  },
};
multipleDataExample.init();


const throttleExample = {
  el: document.querySelector("#throttleSkeleton"),
  switch: document.querySelector("#throttleSwitch"),

  init() {
    this.switch.addEventListener("change", e => {
      const { value } = e.target;

      this.el.loading = value;
    });
  },
};

throttleExample.init();


})
</script>

# Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

## 引入

> `js`

```js
<script type='module'>
  import "./node_modules/easy-component-ui/components/ea-skeleton/index.js";
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

基础的骨架效果。

<div class="demo">
  <ea-skeleton></ea-skeleton>
  <br />
  <ea-skeleton>
    <ea-skeleton-item
      slot="template"
      variant="circle"
      style="--ea-skeleton-item-circle-size: 100px"
    ></ea-skeleton-item>
  </ea-skeleton>
</div>

```html
<div class="demo">
  <ea-skeleton></ea-skeleton>
  <br />
  <ea-skeleton>
    <ea-skeleton-item
      slot="template"
      variant="circle"
      style="--ea-skeleton-item-circle-size: 100px"
    ></ea-skeleton-item>
  </ea-skeleton>
</div>
```

## 更多参数

可以配置骨架屏段落数量，以便更接近真实渲染效果。显示的数量会比传入的数量多 1，首行会被渲染一个长度 `33%` 的段首。

<div class="demo">
  <ea-skeleton rows="6"></ea-skeleton>
</div>

```html
<div class="demo">
  <ea-skeleton rows="6"></ea-skeleton>
</div>
```

## 动画效果

通过设置 `animated` 属性，可以显示动画效果。

<div class="demo">
  <ea-skeleton row="6" animated></ea-skeleton>
</div>

```html
<div class="demo">
  <ea-skeleton row="6" animated></ea-skeleton>
</div>
```

## 自定义样式

默认提供的排版模式有时候并不满足要求，当您想要用自己定义的模板时，可以通过一个具名 `slot="template"` 来自己设定模板。

我们提供了不同的模板单元可供使用，具体可选值请看 [API-variant](#skeleton-item-attributes) 详细描述。 建议在描述模板的时候，尽量靠近真实的 DOM 结构，这样可以避免 DOM 高度差距引起的抖动。

<div class="demo">
  <ea-skeleton style="width: 240px" animated>
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 240px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="p" style="width: 50%"></ea-skeleton-item>
        <ea-skeleton-item
          variant="text"
          style="margin-right: 16px"
        ></ea-skeleton-item>
        <ea-skeleton-item variant="text" style="width: 30%"></ea-skeleton-item>
      </div>
    </div>
  </ea-skeleton>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-skeleton style="width: 240px" animated>
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 240px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="p" style="width: 50%"></ea-skeleton-item>
        <ea-skeleton-item
          variant="text"
          style="margin-right: 16px"
        ></ea-skeleton-item>
        <ea-skeleton-item variant="text" style="width: 30%"></ea-skeleton-item>
      </div>
    </div>
  </ea-skeleton>
</div>
```

:::

## 加载状态

当 `Loading` 结束之后，我们往往需要显示真实的 UI， 可以通过 `loading` 属性的值来控制是否显示加载后的 DOM。 也可以通过 `默认插槽` 来构建 `loading` 结束之后需要展示的真实 DOM 元素结构。

<div class="demo">
  <p>切换状态: <ea-switch id="loadingSwitch" value="true"></ea-switch></p>
  <ea-skeleton id="loadingSkeleton" style="width: 240px" animated>
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 150px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="h3" style="width: 50%"></ea-skeleton-item>
        <div
          style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              "
        >
          <ea-skeleton-item
            variant="text"
            style="margin-right: 16px"
          ></ea-skeleton-item>
          <ea-skeleton-item
            variant="text"
            style="width: 30%"
          ></ea-skeleton-item>
        </div>
      </div>
    </div>
    <ea-card style="--ea-card-padding: 0">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
      <div style="padding: 14px">
        <span>Wonderful scenery</span>
        <div
          style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              "
        >
          <span class="time">2025-10-20</span>
          <ea-button text class="button">Operation</ea-button>
        </div>
      </div>
    </ea-card>
  </ea-skeleton>
</div>

::: code-group

```html
<div class="demo" style="width: 240px">
  <p>切换状态: <ea-switch id="loadingSwitch" value="true"></ea-switch></p>
  <ea-skeleton id="loadingSkeleton" style="width: 240px" animated>
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 150px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="h3" style="width: 50%"></ea-skeleton-item>
        <div
          style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              "
        >
          <ea-skeleton-item
            variant="text"
            style="margin-right: 16px"
          ></ea-skeleton-item>
          <ea-skeleton-item
            variant="text"
            style="width: 30%"
          ></ea-skeleton-item>
        </div>
      </div>
    </div>
    <ea-card style="--ea-card-padding: 0">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
      <div style="padding: 14px">
        <span>Wonderful scenery</span>
        <div
          style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              "
        >
          <span class="time">2025-10-20</span>
          <ea-button text class="button">Operation</ea-button>
        </div>
      </div>
    </ea-card>
  </ea-skeleton>
</div>
```

```js
const loadingExample = {
  el: document.querySelector("#loadingSkeleton"),
  switch: document.querySelector("#loadingSwitch"),

  init() {
    this.switch.addEventListener("change", e => {
      const { value } = e.target;

      this.el.loading = value;
    });
  },
};

loadingExample.init();
```

:::

## 渲染多条数据

大多时候, 骨架屏都被用来渲染列表, 当我们需要在从服务器获取数据的时候来渲染一个假的 UI。 利用 `count` 这个属性就能控制渲染多少条假的数据在页面上

:::warning

请注意, 请尽可能的将 `count` 的大小保持在最小状态, 即使是假的 UI, DOM 元素多了之后, 照样会引起性能问题。

:::

<div class="demo">
  <p>
    切换状态:
    <ea-switch id="multipleDataSwitch" value="true"></ea-switch>
  </p>
  <ea-skeleton id="multipleDataSkeleton" style="width: 240px" animated count="2">
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 140px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="text" style="width: 50%"></ea-skeleton-item>
        <ea-skeleton-item
          variant="text"
          style="margin-right: 16px"
        ></ea-skeleton-item>
      </div>
    </div>
    <ea-card style="--ea-card-padding: 0">
      <ea-image
        src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
      ></ea-image>
      <div style="padding: 14px">
        <div>Scenery 1</div>
        <div style="font-size: 12px; color: gray">2025-10-20</div>
      </div>
    </ea-card>
    <ea-card style="--ea-card-padding: 0">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
      <div style="padding: 14px">
        <div>Scenery 2</div>
        <div style="font-size: 12px; color: gray">2025-10-20</div>
      </div>
    </ea-card>
  </ea-skeleton>
</div>

::: code-group

```html
<div class="demo" style="width: 240px">
  <p>
    切换状态:
    <ea-switch id="multipleDataSwitch" value="true"></ea-switch>
  </p>
  <ea-skeleton id="multipleDataSkeleton" animated count="2">
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 140px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="text" style="width: 50%"></ea-skeleton-item>
        <ea-skeleton-item
          variant="text"
          style="margin-right: 16px"
        ></ea-skeleton-item>
      </div>
    </div>
    <ea-card style="--ea-card-padding: 0">
      <ea-image
        src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
      ></ea-image>
      <div style="padding: 14px">
        <div>Scenery 1</div>
        <div style="font-size: 12px; color: gray">2025-10-20</div>
      </div>
    </ea-card>
    <ea-card style="--ea-card-padding: 0">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
      <div style="padding: 14px">
        <div>Scenery 2</div>
        <div style="font-size: 12px; color: gray">2025-10-20</div>
      </div>
    </ea-card>
  </ea-skeleton>
</div>
```

```js
const multipleDataExample = {
  el: document.querySelector("#multipleDataSkeleton"),
  switch: document.querySelector("#multipleDataSwitch"),

  init() {
    this.switch.addEventListener("change", e => {
      const { value } = e.detail;
      this.el.loading = value;
    });
  },
};
multipleDataExample.init();
```

:::

## 防止渲染抖动​

有的时候，API 的请求回来的特别快，往往骨架占位刚刚被渲染，真实的数据就已经回来了，用户的界面会突然一闪， 此时为了避免这种情况，就需要通过 `throttle` 属性来避免这个问题。

<div class="demo">
  <p>切换状态: <ea-switch id="throttleSwitch" value="true"></ea-switch></p>
  <ea-skeleton
    id="throttleSkeleton"
    style="width: 240px"
    animated
    throttle-trailing="500"
    throttle-leading="500"
  >
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 150px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="h3" style="width: 50%"></ea-skeleton-item>
        <div
          style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              "
        >
          <ea-skeleton-item
            variant="text"
            style="margin-right: 16px"
          ></ea-skeleton-item>
          <ea-skeleton-item
            variant="text"
            style="width: 30%"
          ></ea-skeleton-item>
        </div>
      </div>
    </div>
    <ea-card style="--ea-card-padding: 0">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
      <div style="padding: 14px">
        <span>Wonderful scenery</span>
        <div
          style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              "
        >
          <span class="time">2025-10-20</span>
          <ea-button text class="button">Operation</ea-button>
        </div>
      </div>
    </ea-card>
  </ea-skeleton>
</div>

::: code-group

```html
<div class="demo">
  <p>切换状态: <ea-switch id="throttleSwitch" value="true"></ea-switch></p>
  <ea-skeleton
    id="throttleSkeleton"
    style="width: 240px"
    animated
    throttle-trailing="500"
    throttle-leading="500"
  >
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 150px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="h3" style="width: 50%"></ea-skeleton-item>
        <div
          style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              "
        >
          <ea-skeleton-item
            variant="text"
            style="margin-right: 16px"
          ></ea-skeleton-item>
          <ea-skeleton-item
            variant="text"
            style="width: 30%"
          ></ea-skeleton-item>
        </div>
      </div>
    </div>
    <ea-card style="--ea-card-padding: 0">
      <ea-image
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-image>
      <div style="padding: 14px">
        <span>Wonderful scenery</span>
        <div
          style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              "
        >
          <span class="time">2025-10-20</span>
          <ea-button text class="button">Operation</ea-button>
        </div>
      </div>
    </ea-card>
  </ea-skeleton>
</div>
```

```js
const throttleExample = {
  el: document.querySelector("#throttleSkeleton"),
  switch: document.querySelector("#throttleSwitch"),

  init() {
    this.switch.addEventListener("change", e => {
      const { value } = e.target;

      this.el.loading = value;
    });
  },
};

throttleExample.init();
```

:::

## Skeleton API

### Skeleton Attributes

| 参数              | 说明                                                                   | 类型    | 可选值 | 默认值 |
| ----------------- | ---------------------------------------------------------------------- | ------- | ------ | ------ |
| animated          | 是否开启动画                                                           | Boolean | -      | false  |
| count             | 渲染的骨架屏条目数量（注意性能）                                       | Number  | -      | 1      |
| loading           | 是否显示骨架屏（true 显示骨架，false 显示默认插槽中的真实内容）        | Boolean | -      | true   |
| rows              | 段落占位图行数，用于生成默认模板的段落数                               | Number  | -      | 4      |
| throttle          | 预留节流属性（组件同时支持 `throttle-leading` 与 `throttle-trailing`） | Number  | -      | 0      |
| throttle-leading  | 当 `loading` 由 true -> false 时的延迟（ms），用于防抖/节流以防止闪烁  | Number  | -      | 0      |
| throttle-trailing | 当 `loading` 由 false -> true 时的延迟（ms），用于防抖/节流以防止闪烁  | Number  | -      | 0      |

### Skeleton CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                       |
| --------- | ------------------------------------------ |
| container | 外层容器，part="container"，对应组件根元素 |

### Skeleton Slots

| 名称     | 说明                   |
| -------- | ---------------------- |
| -        | 骨架屏内容, 非具名插槽 |
| template | 骨架屏模板             |

## Skeleton API

### Skeleton Item Attributes

| 参数    | 说明       | 类型   | 可选值                                                                  | 默认值 |
| ------- | ---------- | ------ | ----------------------------------------------------------------------- | ------ |
| variant | 占位图类型 | String | `p`, `text`, `h1`, `h3`, `caption`, `button`, `image`, `circle`, `rect` | p      |

### SkeletonItem CSS Part

| 名称      | 说明                                       |
| --------- | ------------------------------------------ |
| container | 外层容器，part="container"，对应组件根元素 |
