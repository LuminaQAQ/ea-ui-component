<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  await import("../dist/components/index.js")

  // ------- 区域加载 -------
  const loadingToggle = document.querySelector("#loadingToggle")
  const loadingTarget = document.querySelector("#loadingTarget")
  if (loadingToggle && loadingTarget) {
    loadingToggle.addEventListener("click", () => {
      loadingTarget.loading = !loadingTarget.loading
    })
  }

  // ------- 自定义加载图标 -------
  const spinnerToggle = document.querySelector("#spinnerToggle")
  const spinnerTarget = document.querySelector("#spinnerTarget")
  if (spinnerToggle && spinnerTarget) {
    spinnerToggle.addEventListener("click", () => {
      spinnerTarget.loading = !spinnerTarget.loading
    })
  }

  // ------- 加载文本 -------
  const textToggle = document.querySelector("#textToggle")
  const textTarget = document.querySelector("#textTarget")
  if (textToggle && textTarget) {
    textToggle.addEventListener("click", () => {
      textTarget.loading = !textTarget.loading
    })
  }

  // ------- 自定义背景色 -------
  const bgToggle = document.querySelector("#bgToggle")
  const bgTarget = document.querySelector("#bgTarget")
  if (bgToggle && bgTarget) {
    bgToggle.addEventListener("click", () => {
      bgTarget.loading = !bgTarget.loading
    })
  }

  // ------- 全屏加载 -------
  const fullscreenToggle = document.querySelector("#fullscreenToggle")
  if (fullscreenToggle) {
    fullscreenToggle.addEventListener("click", () => {
      const loading = window.$loading({})
      setTimeout(() => {
        loading.close()
      }, 2000)
    })
  }

  // ------- 锁定滚动 -------
  const lockToggle = document.querySelector("#lockToggle")
  if (lockToggle) {
    lockToggle.addEventListener("click", () => {
      const loading = window.$loading({ lock: true })
      setTimeout(() => {
        loading.close()
      }, 2000)
    })
  }

  // ------- 服务 -------
  const serviceToggle = document.querySelector("#serviceToggle")
  if (serviceToggle) {
    serviceToggle.addEventListener("click", () => {
      const loading = window.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'circle-notch',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    })
  }

  // ------- 自定义图标插槽 -------
  const slotToggle = document.querySelector("#slotToggle")
  const slotTarget = document.querySelector("#slotTarget")
  if (slotToggle && slotTarget) {
    slotToggle.addEventListener("click", () => {
      slotTarget.loading = !slotTarget.loading
    })
  }
})
</script>

<style scoped>
.loading-container {
  position: relative;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-lg);
  box-sizing: border-box;
}

ea-button {
  margin-right: 8px;
}
</style>

# Loading 加载

加载数据时显示的动效。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-loading.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-loading";
```

:::

## 自定义样式

移步到 [CSS Part](#loading-css-part) 或 [CSS Custom Properties](#loading-css-自定义属性)。

::: details 查看代码

```css
ea-loading::part(spinner) {
  --ea-icon-size: 2rem;
  --ea-icon-color: #409eff;
}

ea-loading::part(mask) {
  background-color: hsla(0, 0%, 100%, 0.9);
}
```

:::

## 区域加载

在需要展示加载状态的容器上使用 `loading` 属性，组件会在容器内显示遮罩和加载动画。容器内的内容通过默认插槽传入。

<div class="demo">
  <ea-button id="loadingToggle" plain>切换加载状态</ea-button>
  <ea-loading id="loadingTarget" class="loading-container" loading>
    <ea-descriptions caption="User Info">
      <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
      <ea-descriptions-item label="Essence">Lord of the Wild</ea-descriptions-item>
      <ea-descriptions-item label="Place">Lunacrest Continent</ea-descriptions-item>
      <ea-descriptions-item label="Traits">
        <ea-tag size="small" variant="warning" style="margin-right: 1rem">Thunderous Veins</ea-tag>
        <ea-tag size="small" variant="info">Daredevil</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="Description">
        She was once an elf lord, defending the border from goblin invaders. She was then a goblin warrior, protecting her clan from being slaughtered by elves.
      </ea-descriptions-item>
    </ea-descriptions>
  </ea-loading>
</div>

::: details 查看代码

```html
<ea-button id="loadingToggle" plain>切换加载状态</ea-button>
<ea-loading id="loadingTarget" class="loading-container" loading>
  <ea-descriptions caption="User Info">
    <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
    <ea-descriptions-item label="Essence"
      >Lord of the Wild</ea-descriptions-item
    >
    <ea-descriptions-item label="Place"
      >Lunacrest Continent</ea-descriptions-item
    >
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem"
        >Thunderous Veins</ea-tag
      >
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders. She
      was then a goblin warrior, protecting her clan from being slaughtered by
      elves.
    </ea-descriptions-item>
  </ea-descriptions>
</ea-loading>

<script>
  const loadingToggle = document.querySelector("#loadingToggle");
  const loadingTarget = document.querySelector("#loadingTarget");
  loadingToggle.addEventListener("click", () => {
    loadingTarget.loading = !loadingTarget.loading;
  });
</script>
```

:::

## 自定义加载图标

通过 `spinner` 属性可以自定义加载图标的名称，图标名称参考 Font Awesome 图标库。

通过 `spinner-size` 属性可以设置加载图标的大小（单位：像素）。

<div class="demo">
  <ea-button id="spinnerToggle" plain>切换加载状态</ea-button>
  <ea-loading id="spinnerTarget" class="loading-container" loading spinner="circle-notch" spinner-size="32">
    <ea-descriptions caption="User Info">
      <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
      <ea-descriptions-item label="Essence">Lord of the Wild</ea-descriptions-item>
      <ea-descriptions-item label="Place">Lunacrest Continent</ea-descriptions-item>
      <ea-descriptions-item label="Traits">
        <ea-tag size="small" variant="warning" style="margin-right: 1rem">Thunderous Veins</ea-tag>
        <ea-tag size="small" variant="info">Daredevil</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="Description">
        She was once an elf lord, defending the border from goblin invaders. She was then a goblin warrior, protecting her clan from being slaughtered by elves.
      </ea-descriptions-item>
    </ea-descriptions>
  </ea-loading>
</div>

::: details 查看代码

```html
<ea-loading
  class="loading-container"
  loading
  spinner="circle-notch"
  spinner-size="32"
>
  <ea-descriptions caption="User Info">
    <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
    <ea-descriptions-item label="Essence"
      >Lord of the Wild</ea-descriptions-item
    >
    <ea-descriptions-item label="Place"
      >Lunacrest Continent</ea-descriptions-item
    >
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem"
        >Thunderous Veins</ea-tag
      >
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders. She
      was then a goblin warrior, protecting her clan from being slaughtered by
      elves.
    </ea-descriptions-item>
  </ea-descriptions>
</ea-loading>
```

:::

## 加载文本

通过 `text` 属性可以在加载图标下方显示文本信息。

<div class="demo">
  <ea-button id="textToggle" plain>切换加载状态</ea-button>
  <ea-loading id="textTarget" class="loading-container" loading text="正在加载中...">
    <ea-descriptions caption="User Info">
      <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
      <ea-descriptions-item label="Essence">Lord of the Wild</ea-descriptions-item>
      <ea-descriptions-item label="Place">Lunacrest Continent</ea-descriptions-item>
      <ea-descriptions-item label="Traits">
        <ea-tag size="small" variant="warning" style="margin-right: 1rem">Thunderous Veins</ea-tag>
        <ea-tag size="small" variant="info">Daredevil</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="Description">
        She was once an elf lord, defending the border from goblin invaders. She was then a goblin warrior, protecting her clan from being slaughtered by elves.
      </ea-descriptions-item>
    </ea-descriptions>
  </ea-loading>
</div>

::: details 查看代码

```html
<ea-loading class="loading-container" loading text="正在加载中...">
  <ea-descriptions caption="User Info">
    <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
    <ea-descriptions-item label="Essence"
      >Lord of the Wild</ea-descriptions-item
    >
    <ea-descriptions-item label="Place"
      >Lunacrest Continent</ea-descriptions-item
    >
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem"
        >Thunderous Veins</ea-tag
      >
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders. She
      was then a goblin warrior, protecting her clan from being slaughtered by
      elves.
    </ea-descriptions-item>
  </ea-descriptions>
</ea-loading>
```

:::

## 自定义背景色

通过 `background` 属性可以设置遮罩层的背景颜色。

<div class="demo">
  <ea-button id="bgToggle" plain>切换加载状态</ea-button>
  <ea-loading id="bgTarget" class="loading-container" loading background="hsla(220, 4%, 58%, 0.3)">
    <ea-descriptions caption="User Info">
      <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
      <ea-descriptions-item label="Essence">Lord of the Wild</ea-descriptions-item>
      <ea-descriptions-item label="Place">Lunacrest Continent</ea-descriptions-item>
      <ea-descriptions-item label="Traits">
        <ea-tag size="small" variant="warning" style="margin-right: 1rem">Thunderous Veins</ea-tag>
        <ea-tag size="small" variant="info">Daredevil</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="Description">
        She was once an elf lord, defending the border from goblin invaders. She was then a goblin warrior, protecting her clan from being slaughtered by elves.
      </ea-descriptions-item>
    </ea-descriptions>
  </ea-loading>
</div>

::: details 查看代码

```html
<ea-loading
  class="loading-container"
  loading
  background="hsla(220, 4%, 58%, 0.3)"
>
  <ea-descriptions caption="User Info">
    <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
    <ea-descriptions-item label="Essence"
      >Lord of the Wild</ea-descriptions-item
    >
    <ea-descriptions-item label="Place"
      >Lunacrest Continent</ea-descriptions-item
    >
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem"
        >Thunderous Veins</ea-tag
      >
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders. She
      was then a goblin warrior, protecting her clan from being slaughtered by
      elves.
    </ea-descriptions-item>
  </ea-descriptions>
</ea-loading>
```

:::

## 全屏加载

使用 `$loading` 服务可以快速创建全屏加载遮罩，返回的实例提供 `close()` 方法用于关闭。

<div class="demo">
  <ea-button id="fullscreenToggle" plain>显示全屏加载（2秒后关闭）</ea-button>
</div>

::: details 查看代码

```javascript
const loading = window.$loading({});
setTimeout(() => {
  loading.close();
}, 2000);
```

:::

## 锁定滚动

当使用全屏加载时，可以通过 `lock` 选项锁定页面滚动。

<div class="demo">
  <ea-button id="lockToggle" plain>显示锁定加载（2秒后关闭）</ea-button>
</div>

::: details 查看代码

```javascript
const loading = window.$loading({ lock: true });
setTimeout(() => {
  loading.close();
}, 2000);
```

:::

## 服务

`$loading` 服务支持传入配置对象，自定义加载选项。

<div class="demo">
  <ea-button id="serviceToggle" plain>显示自定义加载（2秒后关闭）</ea-button>
</div>

::: details 查看代码

```javascript
const loading = window.$loading({
  lock: true,
  text: "Loading",
  spinner: "circle-notch",
  background: "rgba(0, 0, 0, 0.7)",
});
setTimeout(() => {
  loading.close();
}, 2000);
```

:::

## 自定义加载图标插槽

使用 `spinner` 插槽可以完全自定义加载动画的内容。

<div class="demo">
  <ea-button id="slotToggle" plain>切换加载状态</ea-button>
  <ea-loading id="slotTarget" class="loading-container" loading>
    <div slot="spinner" style="font-size: 24px; color: #409eff;">⏳</div>
    <ea-descriptions caption="User Info">
      <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
      <ea-descriptions-item label="Essence">Lord of the Wild</ea-descriptions-item>
      <ea-descriptions-item label="Place">Lunacrest Continent</ea-descriptions-item>
      <ea-descriptions-item label="Traits">
        <ea-tag size="small" variant="warning" style="margin-right: 1rem">Thunderous Veins</ea-tag>
        <ea-tag size="small" variant="info">Daredevil</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="Description">
        She was once an elf lord, defending the border from goblin invaders. She was then a goblin warrior, protecting her clan from being slaughtered by elves.
      </ea-descriptions-item>
    </ea-descriptions>
  </ea-loading>
</div>

::: details 查看代码

```html
<ea-loading class="loading-container" loading>
  <div slot="spinner" style="font-size: 24px; color: #409eff;">⏳</div>
  <ea-descriptions caption="User Info">
    <ea-descriptions-item label="Username">Lilyiro</ea-descriptions-item>
    <ea-descriptions-item label="Essence"
      >Lord of the Wild</ea-descriptions-item
    >
    <ea-descriptions-item label="Place"
      >Lunacrest Continent</ea-descriptions-item
    >
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem"
        >Thunderous Veins</ea-tag
      >
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders. She
      was then a goblin warrior, protecting her clan from being slaughtered by
      elves.
    </ea-descriptions-item>
  </ea-descriptions>
</ea-loading>
```

:::

## Loading API

### Loading Attributes

| 参数         | 说明                                     | 类型    | 可选值 | 默认值                 |
| ------------ | ---------------------------------------- | ------- | ------ | ---------------------- |
| loading      | 是否显示加载动画                         | Boolean | —      | false                  |
| spinner      | 加载图标名称（Font Awesome 图标名）      | String  | —      | spinner                |
| spinner-size | 加载图标大小（单位：像素，0 为默认大小） | Number  | —      | 0                      |
| background   | 遮罩层背景颜色                           | String  | —      | hsla(0, 0%, 100%, 0.9) |
| text         | 加载文本                                 | String  | —      | ''                     |
| fullscreen   | 是否全屏显示                             | Boolean | —      | false                  |
| lock         | 全屏时是否锁定滚动                       | Boolean | —      | false                  |

### Loading Methods

| 方法名                   | 说明         | 参数 |
| ------------------------ | ------------ | ---- |
| close                    | 关闭加载     | —    |
| updateContainerClasslist | 更新容器类名 | —    |

### Loading Events

| 事件名   | 说明           | 详情 |
| -------- | -------------- | ---- |
| ea-close | 关闭加载时触发 | —    |

### Loading CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明         |
| ------------ | ------------ |
| container    | 加载容器元素 |
| mask         | 遮罩层元素   |
| spinner      | 加载图标元素 |
| text         | 加载文本元素 |
| content-wrap | 内容包裹元素 |

### Loading Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 需要遮罩的内容区域 |
| spinner | 自定义加载图标内容 |

### Loading Service

通过 `window.$loading(options)` 调用，返回 `EaLoadingInstance` 实例。

| 参数        | 说明                                      | 类型                  | 默认值                 |
| ----------- | ----------------------------------------- | --------------------- | ---------------------- |
| lock        | 是否锁定滚动                              | Boolean               | false                  |
| text        | 加载文本                                  | String                | ''                     |
| spinner     | 加载图标名称                              | String                | 'spinner'              |
| background  | 遮罩层背景颜色                            | String                | hsla(0, 0%, 100%, 0.9) |
| spinnerSize | 加载图标大小（像素）                      | Number                | 0                      |
| target      | 加载挂载目标（HTMLElement 或 CSS 选择器） | HTMLElement \| String | 'body'                 |

**返回值**：`EaLoadingInstance`

| 属性/方法 | 说明                     |
| --------- | ------------------------ |
| instance  | ea-loading 组件 DOM 实例 |
| close()   | 关闭加载并移除 DOM 元素  |

### Loading CSS Custom Properties

| 属性名                       | 说明         | 默认值                 |
| ---------------------------- | ------------ | ---------------------- |
| --ea-loading-spinner-size    | 加载图标大小 | 2rem                   |
| --ea-loading-spinner-color   | 加载图标颜色 | var(--blue-500)        |
| --ea-loading-background      | 遮罩层背景色 | hsla(0, 0%, 100%, 0.9) |
| --ea-loading-text-color      | 加载文本颜色 | var(--blue-500)        |
| --ea-loading-text-font-size  | 加载文本字号 | var(--font-size-md)    |
| --ea-loading-text-margin-top | 加载文本间距 | var(--spacing-sm)      |
| --ea-loading-z-index         | 全屏模式层级 | 3000                   |
| --ea-loading-transition      | 过渡动画时长 | var(--transition-fast) |
