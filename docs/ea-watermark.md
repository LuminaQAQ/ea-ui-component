<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')

  const multiLine = document.querySelector('#multiLineWatermark')
  if (multiLine) {
    multiLine.content = 'Top Secret\nInternal Use'
  }

  const multiLine2 = document.querySelector('#multiLineWatermark2')
  if (multiLine2) {
    multiLine2.gap = [300, 180]
    multiLine2.content = 'Top Secret\nConfidential\nInternal Use'
    multiLine2.font = { fontSize: 20 }
  }

  const fontWatermark = document.querySelector('#fontWatermark')
  if (fontWatermark) {
    fontWatermark.width = 240
    fontWatermark.height = 120
    fontWatermark.gap = [240, 120]
    fontWatermark.font = {
      color: 'rgba(0, 100, 200, 0.25)',
      fontSize: 20,
      fontWeight: 'bold',
    }
  }
})
</script>

<style>
  .watermark-box {
    height: 300px;
    border: 1px solid var(--grey-300);
    border-radius: 8px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .watermark-box .inner {
    padding: 24px;
    color: var(--grey-600);
  }
</style>

# Watermark 水印

为页面容器叠加文字或图片水印，防止内容被随意转载。水印以平铺的背景图片渲染，不会阻塞任何用户交互。

## 引入

::: code-group

```html [原生引入]
<script
  type="module"
  src="./node_modules/easy-component-ui/dist/components/ea-watermark.js"
></script>
```

```html [Vite 导入]
import 'easy-component-ui/ea-watermark'
```

:::

## 基础用法

通过 `ea-watermark` 包裹需要叠加水印的内容，默认会在内容上平铺 "watermark" 文字水印。

<div class="demo">
  <ea-watermark>
    <div class="watermark-box">
      <div class="inner">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. The watermark
        is rendered on top of the content as a repeated background image,
        without blocking any user interaction.
      </div>
    </div>
  </ea-watermark>
</div>

::: details 查看代码

```html
<ea-watermark>
  <div class="watermark-box">
    <div class="inner">...</div>
  </div>
</ea-watermark>
```

:::

## 自定义内容

通过 `content` 属性设置水印文字。`content` 为纯 JavaScript 属性，也支持字符串数组渲染多行水印。

<div class="demo">
  <ea-watermark content="Confidential">
    <div class="watermark-box">
      <div class="inner">Text watermark with custom content.</div>
    </div>
  </ea-watermark>
  <ea-watermark id="multiLineWatermark">
    <div class="watermark-box">
      <div class="inner">Multi-line watermark rendered via array.</div>
    </div>
  </ea-watermark>
</div>

::: details 查看代码

::: code-group

```html
<ea-watermark content="Confidential">
  <div class="watermark-box">...</div>
</ea-watermark>
<ea-watermark id="multiLineWatermark">
  <div class="watermark-box">...</div>
</ea-watermark>
```

```js
const multiLine = document.querySelector("#multiLineWatermark");
multiLine.content = "Top Secret\nInternal Use";
```

:::

:::

## 多行文本水印

设置足够的 `width` / `height` 与 `gap`，并给 `content` 传入字符串数组，即可渲染多行水印文本。

<div class="demo">
  <ea-watermark id="multiLineWatermark2" width="300" height="180">
    <div class="watermark-box">
      <div class="inner">
        Multi-line watermark rendered via an array of strings.
      </div>
    </div>
  </ea-watermark>
</div>

::: details 查看代码

::: code-group

```html
<ea-watermark id="multiLineWatermark2" width="300" height="180">
  <div class="watermark-box">...</div>
</ea-watermark>
```

```js
const multiLine = document.querySelector("#multiLineWatermark2");
multiLine.gap = [300, 180];
multiLine.content = "Top Secret\nConfidential\nInternal Use";
multiLine.font = { fontSize: 20 };
```

:::

:::

## 旋转角度

通过 `rotate` 属性设置水印的旋转角度，单位 °。

<div class="demo">
  <ea-watermark rotate="-30">
    <div class="watermark-box">
      <div class="inner">Watermark rotated by -30 degrees.</div>
    </div>
  </ea-watermark>
  <ea-watermark rotate="0">
    <div class="watermark-box">
      <div class="inner">Watermark without rotation.</div>
    </div>
  </ea-watermark>
</div>

::: details 查看代码

```html
<ea-watermark rotate="-30">
  <div class="watermark-box">...</div>
</ea-watermark>
<ea-watermark rotate="0">
  <div class="watermark-box">...</div>
</ea-watermark>
```

:::

## 自定义字体与间距

通过 JS 属性 `font` 设置水印文字样式，通过 `gap` 设置水印之间的间距。

<div class="demo">
  <ea-watermark id="fontWatermark">
    <div class="watermark-box">
      <div class="inner">
        Custom font color, size and gap set via JS property.
      </div>
    </div>
  </ea-watermark>
</div>

::: details 查看代码

::: code-group

```html
<ea-watermark id="fontWatermark">
  <div class="watermark-box">...</div>
</ea-watermark>
```

```js
const fontWatermark = document.querySelector("#fontWatermark");
fontWatermark.width = 240;
fontWatermark.height = 120;
fontWatermark.gap = [240, 120];
fontWatermark.font = {
  color: "rgba(0, 100, 200, 0.25)",
  fontSize: 20,
  fontWeight: "bold",
};
```

:::

:::

## 图片水印

通过 `image` 属性设置水印图片，建议使用 2x 或 3x 图像。同时可通过 `width` / `height` 控制水印平铺单元尺寸。

<div class="demo">
  <ea-watermark image="/logo.png" width="256" height="128">
    <div class="watermark-box">
      <div class="inner">Image watermark using a custom source image.</div>
    </div>
  </ea-watermark>
</div>

::: details 查看代码

```html
<ea-watermark image="/logo.png" width="256" height="128">
  <div class="watermark-box">...</div>
</ea-watermark>
```

:::

## Watermark API

### Watermark Attributes

| 参数      | 说明                             | 类型     | 可选值 | 默认值        |
| --------- | -------------------------------- | -------- | ------ | ------------- |
| `width`   | 水印的宽度                       | `number` | —      | `120`         |
| `height`  | 水印的高度                       | `number` | —      | `64`          |
| `rotate`  | 水印的旋转角度，单位 °           | `number` | —      | `-22`         |
| `z-index` | 水印元素的 z-index 值            | `number` | —      | `9`           |
| `image`   | 水印图片，建议使用 2x 或 3x 图像 | `string` | —      | `""`          |
| `content` | 水印文本内容                     | `string` | —      | `"watermark"` |

### Watermark Properties

Properties 为纯 JavaScript 属性，不映射到 HTML attribute，需通过 JS 访问。

| 属性      | 说明                                 | 类型                 | 默认值                      |
| --------- | ------------------------------------ | -------------------- | --------------------------- |
| `content` | 水印文本内容，支持字符串数组渲染多行 | `string \| string[]` | `"watermark"`               |
| `font`    | 水印文字样式，字段见下表             | `Font`               | 见下表                      |
| `gap`     | 水印之间的间距                       | `number[]`           | `[100, 100]`                |
| `offset`  | 水印从容器左上角的偏移               | `number[] \| null`   | `null`（默认 `gap` 的一半） |

### Font

| 名称           | 详情     | 类型               | 默认值                |
| -------------- | -------- | ------------------ | --------------------- |
| `color`        | 字体颜色 | `string`           | `rgba(0, 0, 0, 0.15)` |
| `fontSize`     | 字体大小 | `number \| string` | `16`                  |
| `fontWeight`   | 字重     | `number \| string` | `normal`              |
| `fontFamily`   | 字体     | `string`           | `sans-serif`          |
| `fontGap`      | 字体间隙 | `number`           | `3`                   |
| `fontStyle`    | 字体样式 | `string`           | `normal`              |
| `textAlign`    | 文本对齐 | `string`           | `center`              |
| `textBaseline` | 文本基线 | `string`           | `hanging`             |

### Watermark CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明         |
| ----------- | ------------ |
| `container` | 容器元素     |
| `content`   | 水印内容元素 |

### Watermark Slots

| 名称      | 说明                         |
| --------- | ---------------------------- |
| `default` | 默认插槽，需要叠加水印的内容 |

### Watermark CSS Custom Properties

| 属性                           | 说明         | 默认值                    |
| ------------------------------ | ------------ | ------------------------- |
| `--ea-watermark-border-radius` | 组件边框圆角 | `var(--border-radius-sm)` |
| `--ea-watermark-font-size`     | 组件字体大小 | `var(--font-size-md)`     |
| `--ea-watermark-transition`    | 组件过渡动画 | `var(--transition-fast)`  |
| `--ea-watermark-text`          | 文字颜色     | `var(--grey-900)`         |
| `--ea-watermark-bg`            | 背景颜色     | `var(--color-white)`      |
| `--ea-watermark-border-color`  | 边框颜色     | `var(--grey-300)`         |
