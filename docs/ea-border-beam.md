<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')
})
</script>

<style>
  .demo-tag {
    font-size: 12px;
    color: var(--grey-500);
    margin-top: 8px;
  }

  ea-card {
    width: 300px;
  }
</style>

# BorderBeam 边框光束

为元素添加动态的边框光束扫描效果，支持多条光束、悬停触发和自定义样式。

## 引入

::: code-group

```html [原生引入]
<script type="module" src="path/to/ea-border-beam/index.ts"></script>
<script type="module" src="path/to/ea-card/index.ts"></script>
```

```html [Vite 导入]
<script type="module" src="../src/components/ea-border-beam/index.ts"></script>
<script type="module" src="../src/components/ea-card/index.ts"></script>
```

:::

## 基础用法

通过 `ea-border-beam` 包裹需要应用光束效果的内容，默认会有一条光束沿容器边框循环扫描。

<div class="demo row left">
  <ea-border-beam>
    <ea-card header="Workspace overview">
      Review task status, deployment health, and recent automation activity
      in one panel.
    </ea-card>
  </ea-border-beam>
  <ea-border-beam trigger="hover">
    <ea-card header="Hover over the card">
      The border beam appears when the pointer moves over this card.
    </ea-card>
  </ea-border-beam>
</div>

::: details 查看代码

```html
<ea-border-beam>
  <ea-card header="Workspace overview">
    Review task status, deployment health, and recent automation activity in one
    panel.
  </ea-card>
</ea-border-beam>
<ea-border-beam trigger="hover">
  <ea-card header="Hover over the card">
    The border beam appears when the pointer moves over this card.
  </ea-card>
</ea-border-beam>
```

:::

## 多条流光

通过 `count` 属性设置多条光束，它们会均匀分布在容器边框上同时扫描。

<div class="demo row left">
  <ea-border-beam count="3">
    <ea-card header="Multiple beams (3)">
      Set count to distribute multiple beams evenly around the container
      border.
    </ea-card>
  </ea-border-beam>
  <ea-border-beam count="2">
    <ea-card header="Multiple beams (2)">
      Set count to distribute multiple beams evenly around the container
      border.
    </ea-card>
  </ea-border-beam>
</div>

::: details 查看代码

```html
<ea-border-beam count="3">
  <ea-card header="Multiple beams (3)">
    Set count to distribute multiple beams evenly...
  </ea-card>
</ea-border-beam>
<ea-border-beam count="2">
  <ea-card header="Multiple beams (2)">
    Set count to distribute multiple beams evenly...
  </ea-card>
</ea-border-beam>
```

:::

## 动画时长

通过 `duration` 属性控制光束动画的循环时长。

<div class="demo row left">
  <ea-border-beam duration="3">
    <ea-card header="Fast">
      <div>
        A quick loop for temporary highlights and active modules.
        <div class="demo-tag">3s</div>
      </div>
    </ea-card>
  </ea-border-beam>
  <ea-border-beam duration="6">
    <ea-card header="Default">
      <div>
        The original pacing for most emphasized containers.
        <div class="demo-tag">6s</div>
      </div>
    </ea-card>
  </ea-border-beam>
  <ea-border-beam duration="12">
    <ea-card header="Slow">
      <div>
        A calmer loop for persistent panels and ambient surfaces.
        <div class="demo-tag">12s</div>
      </div>
    </ea-card>
  </ea-border-beam>
</div>

::: details 查看代码

```html
<ea-border-beam duration="3">
  <ea-card header="Fast">...</ea-card>
</ea-border-beam>
<ea-border-beam duration="6">
  <ea-card header="Default">...</ea-card>
</ea-border-beam>
<ea-border-beam duration="12">
  <ea-card header="Slow">...</ea-card>
</ea-border-beam>
```

:::

## 线宽

通过 `line-width` 属性控制光束线条的宽度。

<div class="demo row left">
  <ea-border-beam line-width="2">
    <ea-card header="Custom line width">
      Set line-width to match the border width of this container.
    </ea-card>
  </ea-border-beam>
  <ea-border-beam line-width="3">
    <ea-card header="Wider line">
      A thicker border beam for a more prominent highlight effect.
    </ea-card>
  </ea-border-beam>
</div>

::: details 查看代码

```html
<ea-border-beam line-width="2">
  <ea-card header="Custom line width">...</ea-card>
</ea-border-beam>
<ea-border-beam line-width="3">
  <ea-card header="Wider line">...</ea-card>
</ea-border-beam>
```

:::

## 尺寸

通过 `size` 属性控制光束可见段的长度。

<div class="demo row left">
  <ea-border-beam>
    <ea-card header="Default (100px)">
      Uses the default 100px visible beam segment.
    </ea-card>
  </ea-border-beam>
  <ea-border-beam size="56">
    <ea-card header="Compact (56px)">
      Keeps the highlight shorter for dense card groups.
    </ea-card>
  </ea-border-beam>
  <ea-border-beam size="160">
    <ea-card header="Extended (160px)">
      Creates a longer highlight for wider feature panels.
    </ea-card>
  </ea-border-beam>
</div>

::: details 查看代码

```html
<ea-border-beam>
  <ea-card header="Default (100px)">...</ea-card>
</ea-border-beam>
<ea-border-beam size="56">
  <ea-card header="Compact (56px)">...</ea-card>
</ea-border-beam>
<ea-border-beam size="160">
  <ea-card header="Extended (160px)">...</ea-card>
</ea-border-beam>
```

:::

## BorderBeam API

### BorderBeam Attributes

| 参数          | 说明                        | 类型     | 可选值           | 默认值 |
| ------------- | --------------------------- | -------- | ---------------- | ------ |
| `count`       | 光束数量                    | `number` | —                | `1`    |
| `trigger`     | 触发方式                    | `string` | `""` / `"hover"` | `""`   |
| `size`        | 光束指示器尺寸，单位 px     | `number` | —                | `100`  |
| `line-width`  | 光束指示器线条宽度，单位 px | `number` | —                | `1`    |
| `duration`    | 光束动画持续时间，单位 s    | `number` | —                | `10`   |
| `start-delay` | 光束动画开始延迟，单位 s    | `number` | —                | `0`    |

### BorderBeam CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明           |
| ----------- | -------------- |
| `container` | 容器元素       |
| `indicator` | 光束指示器元素 |

### BorderBeam Slots

| 名称 | 说明                                 |
| ---- | ------------------------------------ |
| -    | 默认插槽，需要应用边框光束效果的内容 |

### BorderBeam CSS Custom Properties

| 属性                                    | 说明               | 默认值                                                        |
| --------------------------------------- | ------------------ | ------------------------------------------------------------- |
| `--ea-border-beam-indicator-size`       | 光束指示器尺寸     | `100px`                                                       |
| `--ea-border-beam-indicator-color`      | 光束指示器颜色渐变 | `linear-gradient(to right, transparent 50%, var(--blue-500))` |
| `--ea-border-beam-indicator-line-width` | 光束指示器线条宽度 | `1px`                                                         |
| `--ea-border-beam-duration`             | 光束动画持续时间   | `10s`                                                         |
| `--ea-border-beam-start-delay`          | 光束动画开始延迟   | `0s`                                                          |
| `--ea-border-beam-initial-distance`     | 光束初始偏移距离   | `0%`                                                          |
| `--ea-border-beam-border-radius`        | 组件边框圆角       | `var(--border-radius-sm)`                                     |
| `--ea-border-beam-font-size`            | 组件字体大小       | `var(--font-size-md)`                                         |
| `--ea-border-beam-transition`           | 组件过渡动画       | `var(--transition-normal)`                                    |
| `--ea-border-beam-text`                 | 文字颜色           | `var(--grey-900)`                                             |
| `--ea-border-beam-bg`                   | 背景颜色           | `var(--blue-500)`                                             |
| `--ea-border-beam-border-color`         | 边框颜色           | `var(--grey-300)`                                             |
