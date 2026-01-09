<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
})
</script>

<style>
  .header {
    font-weight: 800;
    font-size: 18px;
  }
</style>

# Timeline 时间线

可视化地呈现时间流信息。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-timeline/index.js";
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

移步到 [CSS Part](#timeline-css-part)。

## 基础用法

Timeline 可拆分成多个按照时间戳正序或倒序排列的 `activity`，时间戳是其区分于其他控件的重要特征，使⽤时注意与 `Steps` 步骤条等区分。

<div class="demo">
  <ea-timeline>
    <ea-timeline-item timestamp="2024-7-1">
      Open the refrigerator
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024-7-2">
      Put the elephant inside
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024-7-3">
      Close the refrigerator
    </ea-timeline-item>
  </ea-timeline>
</div>

```html
<div class="demo">
  <ea-timeline>
    <ea-timeline-item timestamp="2024-7-1">
      Open the refrigerator
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024-7-2">
      Put the elephant inside
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024-7-3">
      Close the refrigerator
    </ea-timeline-item>
  </ea-timeline>
</div>
```

## ⾃定义节点样式

可根据实际场景⾃定义节点尺⼨、颜⾊，或直接使⽤图标。

<div class="demo">
  <ea-timeline>
    <ea-timeline-item
      type="primary"
      size="large"
      timestamp="2024-7-1"
      icon="icon-coffee"
    >
      Custom icon
    </ea-timeline-item>
    <ea-timeline-item type="primary" color="#0bbd87" timestamp="2024-7-2">
      Custom color
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024-7-3"> Custom size </ea-timeline-item>
    <ea-timeline-item type="primary" timestamp="2024-7-4" hollow>
      Custom hollow
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024-7-5"> Default node </ea-timeline-item>
  </ea-timeline>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-timeline>
    <ea-timeline-item
      type="primary"
      size="large"
      timestamp="2024-7-1"
      icon="icon-coffee"
    >
      Custom icon
    </ea-timeline-item>
    <ea-timeline-item type="primary" color="#0bbd87" timestamp="2024-7-2">
      Custom color
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024-7-3"> Custom size </ea-timeline-item>
    <ea-timeline-item type="primary" timestamp="2024-7-4" hollow>
      Custom hollow
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024-7-5"> Default node </ea-timeline-item>
  </ea-timeline>
</div>
```

:::

## ⾃定义时间戳

当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。

<div class="demo">
  <ea-timeline>
    <ea-timeline-item type="success" placement="top">
      <ea-card>
        <header class="header">打开冰箱</header>
        <p>Open the refrigerator</p>
      </ea-card>
      <div slot="timestamp">2025-10-21</div>
    </ea-timeline-item>
    <ea-timeline-item type="primary" placement="top">
      <ea-card>
        <header class="header">把大象放进去</header>
        <p>Put the elephant inside</p>
      </ea-card>
      <div slot="timestamp">2025-10-22</div>
    </ea-timeline-item>
    <ea-timeline-item type="warning" placement="top">
      <ea-card>
        <header class="header">关上冰箱</header>
        <p>Close the refrigerator</p>
      </ea-card>
      <div slot="timestamp">2025-10-23</div>
    </ea-timeline-item>
    <ea-timeline-item type="danger" placement="top">
      <ea-card>
        <header class="header">
          由于违反动物保护法，该组件库将被无限期停更
        </header>
        <p>
          Due to violation of the Animal Protection Law, this component library
          will be suspended indefinitely
        </p>
      </ea-card>
      <div slot="timestamp">2025-10-24</div>
    </ea-timeline-item>
    <ea-timeline-item color="black" placement="top">
      <ea-card>
        <header class="header">该组件库已无法访问</header>
        <p>This component library is no longer accessible</p>
      </ea-card>
      <div slot="timestamp">2025-10-24</div>
    </ea-timeline-item>
  </ea-timeline>
</div>

::: details 查看代码

`HTML`

```html
<div class="demo">
  <ea-timeline>
    <ea-timeline-item type="success" placement="top">
      <ea-card>
        <header class="header">打开冰箱</header>
        <p>Open the refrigerator</p>
      </ea-card>
      <div slot="timestamp">2025-10-21</div>
    </ea-timeline-item>
    <ea-timeline-item type="primary" placement="top">
      <ea-card>
        <header class="header">把大象放进去</header>
        <p>Put the elephant inside</p>
      </ea-card>
      <div slot="timestamp">2025-10-22</div>
    </ea-timeline-item>
    <ea-timeline-item type="warning" placement="top">
      <ea-card>
        <header class="header">关上冰箱</header>
        <p>Close the refrigerator</p>
      </ea-card>
      <div slot="timestamp">2025-10-23</div>
    </ea-timeline-item>
    <ea-timeline-item type="danger" placement="top">
      <ea-card>
        <header class="header">
          由于违反动物保护法，该组件库将被无限期停更
        </header>
        <p>
          Due to violation of the Animal Protection Law, this component library
          will be suspended indefinitely
        </p>
      </ea-card>
      <div slot="timestamp">2025-10-24</div>
    </ea-timeline-item>
    <ea-timeline-item color="black" placement="top">
      <ea-card>
        <header class="header">该组件库已无法访问</header>
        <p>This component library is no longer accessible</p>
      </ea-card>
      <div slot="timestamp">2025-10-24</div>
    </ea-timeline-item>
  </ea-timeline>
</div>
```

`CSS`

```css
.header {
  font-weight: 800;
  font-size: 18px;
}
```

:::

## 垂直居中

当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。设置 `placement` 属性为 `top` 即可。

<div class="demo">
  <ea-timeline style="max-width: 600px">
    <ea-timeline-item center timestamp="2024/6/1" placement="top">
      <ea-card>
        <h4>Update Github template</h4>
        <p>LuminaQAQ committed on 2024/6/1 04:38</p>
      </ea-card>
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024/5/21" placement="top">
      <ea-card>
        <h4>Update Github template</h4>
        <p>LuminaQAQ committed on 2024/5/21 04:38</p>
      </ea-card>
    </ea-timeline-item>
    <ea-timeline-item center timestamp="2024/5/20" placement="top">
      <p>Update Github template</p>
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024/5/20" placement="top">
      <p>Update Github template</p>
    </ea-timeline-item>
  </ea-timeline>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-timeline style="max-width: 600px">
    <ea-timeline-item center timestamp="2024/6/1" placement="top">
      <ea-card>
        <h4>Update Github template</h4>
        <p>LuminaQAQ committed on 2024/6/1 04:38</p>
      </ea-card>
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024/5/21" placement="top">
      <ea-card>
        <h4>Update Github template</h4>
        <p>LuminaQAQ committed on 2024/5/21 04:38</p>
      </ea-card>
    </ea-timeline-item>
    <ea-timeline-item center timestamp="2024/5/20" placement="top">
      <p>Update Github template</p>
    </ea-timeline-item>
    <ea-timeline-item timestamp="2024/5/20" placement="top">
      <p>Update Github template</p>
    </ea-timeline-item>
  </ea-timeline>
</div>
```

:::

## Timeline API

### Timeline CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

### Timeline Slots

| 名称 | 说明                                     |
| ---- | ---------------------------------------- |
| -    | 默认插槽, 放置 `ea-timeline-item` 子节点 |

## TimelineItem API

### TimelineItem Attributes

| 参数           | 说明                                 | 类型    | 可选值                                            | 默认值 |
| -------------- | ------------------------------------ | ------- | ------------------------------------------------- | ------ |
| type           | 节点类型，用于控制颜色或样式         | string  | `primary \| success \| warning \| danger \| info` | info   |
| timestamp      | 时间戳，可作为 slot 覆盖             | string  | -                                                 | -      |
| hide-timestamp | 是否隐藏时间戳                       | boolean | -                                                 | false  |
| placement      | 时间戳位置，可选将时间放置到内容上方 | string  | top                                               | bottom |
| size           | 节点大小                             | string  | `large \| normal`                                 | normal |
| color          | 自定义颜色（支持任意 CSS 颜色值）    | string  | -                                                 | -      |
| hollow         | 是否为空心节点（只显示描边）         | boolean | -                                                 | false  |
| icon           | 节点图标类名（如果需要图标）         | string  | -                                                 | -      |
| center         | 是否垂直居中对齐内容                 | boolean | -                                                 | false  |

### TimelineItem CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称          | 说明             |
| ------------- | ---------------- |
| container     | 外层容器         |
| left-wrapper  | 左侧容器         |
| dot           | 默认的节点容器   |
| icon-dot      | 节点图标         |
| tail          | 时间线线条       |
| right-wrapper | 右侧容器         |
| content       | 单个时间线的内容 |
| timestamp     | 时间戳           |

### TimelineItem Slots

| 名称      | 说明                                      |
| --------- | ----------------------------------------- |
| -         | 默认插槽, 放置时间线项的主内容            |
| dot       | 自定义节点内容（覆盖 `icon` 属性）        |
| timestamp | 自定义时间戳内容（覆盖 `timestamp` 属性） |
