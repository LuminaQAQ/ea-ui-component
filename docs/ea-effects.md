<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  // ------- Zoom 缩放 -------
  // #region
  const zoomEffects = {
    btn: document.querySelector("#zoomButton"),
    effects: document.querySelectorAll("#zoomEffectsContainer ea-effects"),
    init() {
      this.btn?.addEventListener("click", () => {
        this.effects.forEach(effect => effect.toggle());
      });
    }
  }
  zoomEffects.init();
  // #endregion
  // ------- end -------

  // ------- Fade 淡入淡出 -------
  // #region
  const fadeEffects = {
    btn: document.querySelector("#fadeButton"),
    effects: document.querySelectorAll("#fadeEffectsContainer ea-effects"),
    init() {
      this.btn?.addEventListener("click", () => {
        this.effects.forEach(effect => effect.toggle());
      });
    }
  }
  fadeEffects.init();
  // #endregion
  // ------- end -------

  // ------- Slide 滑动 -------
  // #region
  const slideEffects = {
    btn: document.querySelector("#slideButton"),
    effects: document.querySelectorAll("#slideEffectsContainer ea-effects"),
    init() {
      this.btn?.addEventListener("click", () => {
        this.effects.forEach(effect => effect.toggle());
      });
    }
  }
  slideEffects.init();
  // #endregion
  // ------- end -------

  // ------- Flip 翻转 -------
  // #region
  const flipEffects = {
    btn: document.querySelector("#flipButton"),
    effects: document.querySelectorAll("#flipEffectsContainer ea-effects"),
    init() {
      this.btn?.addEventListener("click", () => {
        this.effects.forEach(effect => effect.toggle());
      });
    }
  }
  flipEffects.init();
  // #endregion
  // ------- end -------

  // ------- Trigger 触发 -------
  // #region
  const triggerEffects = {
    btn: document.querySelector("#triggerButton"),
    effects: document.querySelectorAll("#triggerEffectsContainer ea-effects"),
    init() {
      this.btn?.addEventListener("click", () => {
        this.effects.forEach(effect => effect.toggle());
      });
    }
  }
  triggerEffects.init();
  // #endregion
  // ------- end -------
})
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 100px;
  margin-top: 20px;
}
.transition-box {
  width: 200px;
  height: 100px;
  border-radius: 8px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
}
</style>

# Effects 动画效果

用于为子元素添加进入/离开动画效果，支持缩放、淡入淡出、滑动、翻转等多种效果。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-effects.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-effects";
```

:::

## 自定义样式

移步到 [CSS Part](#ea-effects-css-part)。

## Zoom 缩放

提供从不同方向缩放的效果，支持 `zoom-center`、`zoom-top`、`zoom-right`、`zoom-bottom`、`zoom-left`。

<div class="demo">
  <ea-button id="zoomButton">Click Me</ea-button>

  <div id="zoomEffectsContainer" class="container">
    <ea-effects effect="zoom-center">
      <div class="transition-box">zoom-center</div>
    </ea-effects>
    <ea-effects effect="zoom-center" timing-function="linear">
      <div class="transition-box">zoom-center-linear</div>
    </ea-effects>
    <ea-effects effect="zoom-top">
      <div class="transition-box">zoom-top</div>
    </ea-effects>
    <ea-effects effect="zoom-right">
      <div class="transition-box">zoom-right</div>
    </ea-effects>
    <ea-effects effect="zoom-bottom">
      <div class="transition-box">zoom-bottom</div>
    </ea-effects>
    <ea-effects effect="zoom-left">
      <div class="transition-box">zoom-left</div>
    </ea-effects>
  </div>
</div>

::: details 查看代码

```html
<ea-effects effect="zoom-center">
  <div class="transition-box">zoom-center</div>
</ea-effects>
<ea-effects effect="zoom-center" timing-function="linear">
  <div class="transition-box">zoom-center-linear</div>
</ea-effects>
<ea-effects effect="zoom-top">
  <div class="transition-box">zoom-top</div>
</ea-effects>
<ea-effects effect="zoom-right">
  <div class="transition-box">zoom-right</div>
</ea-effects>
<ea-effects effect="zoom-bottom">
  <div class="transition-box">zoom-bottom</div>
</ea-effects>
<ea-effects effect="zoom-left">
  <div class="transition-box">zoom-left</div>
</ea-effects>
```

```js
const zoomEffects = {
  btn: document.querySelector("#zoomButton"),
  effects: document.querySelectorAll("#zoomEffectsContainer ea-effects"),

  init() {
    this.btn.addEventListener("click", () => {
      this.effects.forEach(effect => effect.toggle());
    });
  },
};
zoomEffects.init();
```

:::

## Fade 淡入淡出

提供简单的淡入淡出效果。

<div class="demo">
  <ea-button id="fadeButton">Click Me</ea-button>

  <div id="fadeEffectsContainer" class="container">
    <ea-effects effect="fade">
      <div class="transition-box">fade-1</div>
    </ea-effects>
    <ea-effects effect="fade" visible="false" style="display: none;">
      <div class="transition-box">fade-2</div>
    </ea-effects>
  </div>
</div>

::: details 查看代码

```html
<ea-effects effect="fade">
  <div class="transition-box">fade-1</div>
</ea-effects>
<ea-effects effect="fade" visible="false" style="display: none;">
  <div class="transition-box">fade-2</div>
</ea-effects>
```

```js
const fadeEffects = {
  btn: document.querySelector("#fadeButton"),
  effects: document.querySelectorAll("#fadeEffectsContainer ea-effects"),

  init() {
    this.btn.addEventListener("click", () => {
      this.effects.forEach(effect => effect.toggle());
    });
  },
};
fadeEffects.init();
```

:::

## Slide 滑动

提供从不同方向滑入/滑出的效果，支持 `slide-top`、`slide-right`、`slide-bottom`、`slide-left`。

<div class="demo">
  <ea-button id="slideButton">Click Me</ea-button>

  <div id="slideEffectsContainer" class="container">
    <ea-effects effect="slide-top">
      <div class="transition-box">slide-top</div>
    </ea-effects>
    <ea-effects effect="slide-right">
      <div class="transition-box">slide-right</div>
    </ea-effects>
    <ea-effects effect="slide-bottom">
      <div class="transition-box">slide-bottom</div>
    </ea-effects>
    <ea-effects effect="slide-left">
      <div class="transition-box">slide-left</div>
    </ea-effects>
  </div>
</div>

::: details 查看代码

```html
<ea-effects effect="slide-top">
  <div class="transition-box">slide-top</div>
</ea-effects>
<ea-effects effect="slide-right">
  <div class="transition-box">slide-right</div>
</ea-effects>
<ea-effects effect="slide-bottom">
  <div class="transition-box">slide-bottom</div>
</ea-effects>
<ea-effects effect="slide-left">
  <div class="transition-box">slide-left</div>
</ea-effects>
```

```js
const slideEffects = {
  btn: document.querySelector("#slideButton"),
  effects: document.querySelectorAll("#slideEffectsContainer ea-effects"),

  init() {
    this.btn.addEventListener("click", () => {
      this.effects.forEach(effect => effect.toggle());
    });
  },
};
slideEffects.init();
```

:::

## Flip 翻转

提供沿 X 轴或 Y 轴翻转的效果，支持 `flip-x`、`flip-y`。

<div class="demo">
  <ea-button id="flipButton">Click Me</ea-button>

  <div id="flipEffectsContainer" class="container">
    <ea-effects effect="flip-x">
      <div class="transition-box">flip-x</div>
    </ea-effects>
    <ea-effects effect="flip-y">
      <div class="transition-box">flip-y</div>
    </ea-effects>
  </div>
</div>

::: details 查看代码

```html
<ea-effects effect="flip-x">
  <div class="transition-box">flip-x</div>
</ea-effects>
<ea-effects effect="flip-y">
  <div class="transition-box">flip-y</div>
</ea-effects>
```

```js
const flipEffects = {
  btn: document.querySelector("#flipButton"),
  effects: document.querySelectorAll("#flipEffectsContainer ea-effects"),

  init() {
    this.btn.addEventListener("click", () => {
      this.effects.forEach(effect => effect.toggle());
    });
  },
};
flipEffects.init();
```

:::

## Trigger 触发

通过 `trigger` 属性可以设置不同的触发方式。

- `click`：点击触发
- `hover`：悬停触发
- `manual`：手动触发（通过方法调用）
- `scroll`：滚动进入视口时触发

<div class="demo">
  <ea-button id="triggerButton">Click Me</ea-button>

  <div id="triggerEffectsContainer" class="container">
    <ea-effects effect="zoom-center" trigger="click">
      <div class="transition-box">trigger: click</div>
    </ea-effects>
    <ea-effects effect="fade" trigger="hover">
      <div class="transition-box">trigger: hover</div>
    </ea-effects>
    <ea-effects effect="flip-x" trigger="manual">
      <div class="transition-box">trigger: manual</div>
    </ea-effects>
    <ea-effects effect="slide-top" trigger="scroll" scroll-once="false">
      <div class="transition-box">trigger: scroll</div>
    </ea-effects>
  </div>
</div>

::: details 查看代码

```html
<ea-effects effect="zoom-center" trigger="click">
  <div class="transition-box">trigger: click</div>
</ea-effects>
<ea-effects effect="fade" trigger="hover">
  <div class="transition-box">trigger: hover</div>
</ea-effects>
<ea-effects effect="flip-x" trigger="manual">
  <div class="transition-box">trigger: manual</div>
</ea-effects>
<ea-effects effect="slide-top" trigger="scroll" scroll-once="false">
  <div class="transition-box">trigger: scroll</div>
</ea-effects>
```

```js
const triggerEffects = {
  btn: document.querySelector("#triggerButton"),
  effects: document.querySelectorAll("#triggerEffectsContainer ea-effects"),

  init() {
    this.btn.addEventListener("click", () => {
      this.effects.forEach(effect => effect.toggle());
    });
  },
};
triggerEffects.init();
```

:::

## Effects API

### Effects Attributes

| 参数              | 说明                   | 类型      | 可选值                                                                                                                                                               | 默认值     |
| ----------------- | ---------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `effect`          | 动画效果名称           | `string`  | `zoom-center` / `zoom-top` / `zoom-right` / `zoom-bottom` / `zoom-left` / `fade` / `slide-top` / `slide-right` / `slide-bottom` / `slide-left` / `flip-x` / `flip-y` | `""`       |
| `visible`         | 是否可见               | `boolean` | —                                                                                                                                                                    | `true`     |
| `duration`        | 动画持续时间           | `string`  | —                                                                                                                                                                    | `""`       |
| `delay`           | 动画延迟时间           | `string`  | —                                                                                                                                                                    | `""`       |
| `timing-function` | 动画缓动函数           | `string`  | —                                                                                                                                                                    | `""`       |
| `iteration`       | 动画播放次数           | `number`  | —                                                                                                                                                                    | `1`        |
| `trigger`         | 触发方式               | `string`  | `hover` / `click` / `manual` / `scroll`                                                                                                                              | `"manual"` |
| `scroll-once`     | 滚动触发是否仅执行一次 | `boolean` | —                                                                                                                                                                    | `true`     |
| `scroll-target`   | 滚动触发目标元素选择器 | `string`  | —                                                                                                                                                                    | `""`       |

### Effects CSS Part

| 名称        | 说明         |
| ----------- | ------------ |
| `container` | 动画容器元素 |

### Effects Slots

| 名称      | 说明                   |
| --------- | ---------------------- |
| `default` | 需要应用动画效果的内容 |

### Effects Methods

| 方法名     | 说明                   | 参数 |
| ---------- | ---------------------- | ---- |
| `show()`   | 显示内容，触发进入动画 | —    |
| `hide()`   | 隐藏内容，触发离开动画 | —    |
| `toggle()` | 切换可见状态           | —    |
| `reset()`  | 重置动画状态           | —    |

### Effects CSS Custom Properties

| 属性名                         | 说明         | 默认值        |
| ------------------------------ | ------------ | ------------- |
| `--ea-effects-duration`        | 动画持续时间 | `0.3s`        |
| `--ea-effects-delay`           | 动画延迟时间 | `0`           |
| `--ea-effects-timing-function` | 动画缓动函数 | `ease-in-out` |
| `--ea-effects-iteration-count` | 动画播放次数 | `1`           |
