<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../components/ea-timeline/index.js')
    import('../components/ea-radio-group/index.js')
    import('../components/ea-radio/index.js')

    import('./index.scss')

    const add = document.querySelector('.add');
    const board = document.querySelector('.board');
    add.addEventListener('click', () => {
        const elm = document.createElement('ea-timeline-item');
        const day = Math.floor(Math.random() * 31 + 1);
        elm.time = `2024-7-${day}`;
        elm.innerHTML = `随机消息`;
        board.appendChild(elm);
    })

    const reverseRadio = document.querySelector('.reverse');
    const positiveRadio = document.querySelector('.positive');
    reverseRadio.addEventListener('change', () => {
        board.reverse = true;
    })
    positiveRadio.addEventListener('change', () => {
        board.reverse = false;
    })
})
</script>

<style>
ea-timeline::part(container) {
  min-height: 15rem;
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

::: tip
如果包含切换正逆序, 最佳实践是设置最小高度

```css
ea-timeline::part(container) {
  min-height: 15rem;
}
```

:::

## 基础用法

Timeline 可拆分成多个按照时间戳正序或倒序排列的 `activity`，时间戳是其区分于其他控件的重要特征，使⽤时注意与 `Steps` 步骤条等区分。

<div class="demo">
    <ea-radio-group name="sort">
        <span style="margin-right: 1rem;">排序：</span>
        <ea-radio class="reverse" value="false" checked>倒序</ea-radio>
        <ea-radio class="positive" value="false">正序</ea-radio>
    </ea-radio-group>
    <div style="margin-top: 1rem;">
        <ea-button class="add" type="primary">添加时间节点</ea-button>
    </div>
    <ea-timeline class="board">
        <ea-timeline-item time="2024-7-2">把大象放进去</ea-timeline-item>
        <ea-timeline-item time="2024-7-1">打开冰箱</ea-timeline-item>
        <ea-timeline-item time="2024-7-3">把冰箱关住</ea-timeline-item>
        <ea-timeline-item time="2024-7-4">因违反动物保护法, 该组件库无限期停更</ea-timeline-item>
    </ea-timeline>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-radio-group name="sort">
    <span style="margin-right: 1rem;">排序：</span>
    <ea-radio class="reverse" value="false" checked>倒序</ea-radio>
    <ea-radio class="positive" value="false">正序</ea-radio>
  </ea-radio-group>
  <div style="margin-top: 1rem;">
    <ea-button class="add" type="primary">添加时间节点</ea-button>
  </div>
  <ea-timeline class="board">
    <ea-timeline-item time="2024-7-2">2: 2024-7-2</ea-timeline-item>
    <ea-timeline-item time="2024-7-1">1: 2024-7-1</ea-timeline-item>
    <ea-timeline-item time="2024-7-3">3: 2024-7-3</ea-timeline-item>
  </ea-timeline>
</div>
```

`js`

```js
// 获取页面上用于添加事件的按钮
const add = document.querySelector(".add");
// 获取时间轴容器
const board = document.querySelector(".board");

// 绑定点击事件监听器，用于添加新的时间点
add.addEventListener("click", () => {
  // 创建一个新的时间点元素
  const elm = document.createElement("ea-timeline-item");
  const day = Math.floor(Math.random() * 31 + 1);
  elm.time = `2024-7-${day}`;
  elm.innerHTML = `${day}: 2024-7-${day}`;

  // 将新时间点添加到时间轴上
  board.appendChild(elm);
});

// 获取页面上用于切换显示顺序的“倒序”radio按钮
const reverseRadio = document.querySelector(".reverse");
// 获取页面上用于切换显示顺序的“正序”radio按钮
const positiveRadio = document.querySelector(".positive");

// 绑定改变事件监听器，用于切换到倒序显示
reverseRadio.addEventListener("change", () => {
  board.reverse = true;
});
// 绑定改变事件监听器，用于切换到正序显示
positiveRadio.addEventListener("change", () => {
  board.reverse = false;
});
```

:::

## ⾃定义节点样式

可根据实际场景⾃定义节点尺⼨`size`, 节点类型`type`。

<div class="demo">
    <ea-timeline>
        <ea-timeline-item type="success" size="large"  time="2024-7-1">打开冰箱</ea-timeline-item>
        <ea-timeline-item type="primary" size="large" time="2024-7-2">把大象放进去</ea-timeline-item>
        <ea-timeline-item type="warning" size="large" time="2024-7-3">把冰箱关住</ea-timeline-item>
        <ea-timeline-item type="danger" size="large" time="2024-7-4">因违反动物保护法, 该组件库无限期停更</ea-timeline-item>
        <ea-timeline-item type="danger" size="large" color="black" time="2024-7-5">该组件库已无法访问</ea-timeline-item>
    </ea-timeline>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-timeline>
    <ea-timeline-item type="success" size="large" time="2024-7-1"
      >打开冰箱</ea-timeline-item
    >
    <ea-timeline-item type="primary" size="large" time="2024-7-2"
      >把大象放进去</ea-timeline-item
    >
    <ea-timeline-item type="warning" size="large" time="2024-7-3"
      >把冰箱关住</ea-timeline-item
    >
    <ea-timeline-item type="danger" size="large" time="2024-7-4"
      >因违反动物保护法, 该组件库无限期停更</ea-timeline-item
    >
    <ea-timeline-item type="danger" size="large" color="black" time="2024-7-5"
      >该组件库已无法访问</ea-timeline-item
    >
  </ea-timeline>
</div>
```

:::

## ⾃定义时间戳

当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。设置 `placement` 属性为 `top` 即可。

<div class="demo">
    <ea-timeline>
        <ea-timeline-item placement="top" type="success" time="2024-7-1">
            <ea-card>打开冰箱</ea-card>
        </ea-timeline-item>
        <ea-timeline-item placement="top" type="primary" time="2024-7-2">
            <ea-card>把大象放进去</ea-card>
        </ea-timeline-item>
        <ea-timeline-item placement="top" type="warning" time="2024-7-3">
            <ea-card>把冰箱关住</ea-card>
        </ea-timeline-item>
        <ea-timeline-item placement="top" type="danger" time="2024-7-4">
            <ea-card>因违反动物保护法, 该组件库无限期停更</ea-card>
        </ea-timeline-item>
        <ea-timeline-item placement="top" type="danger" color="black" time="2024-7-5">
            <ea-card>该组件库已无法访问</ea-card>
        </ea-timeline-item>
    </ea-timeline>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-timeline>
    <ea-timeline-item placement="top" type="success" time="2024-7-1">
      <ea-card>打开冰箱</ea-card>
    </ea-timeline-item>
    <ea-timeline-item placement="top" type="primary" time="2024-7-2">
      <ea-card>把大象放进去</ea-card>
    </ea-timeline-item>
    <ea-timeline-item placement="top" type="warning" time="2024-7-3">
      <ea-card>把冰箱关住</ea-card>
    </ea-timeline-item>
    <ea-timeline-item placement="top" type="danger" time="2024-7-4">
      <ea-card>因违反动物保护法, 该组件库无限期停更</ea-card>
    </ea-timeline-item>
    <ea-timeline-item
      placement="top"
      type="danger"
      color="black"
      time="2024-7-5"
    >
      <ea-card>该组件库已无法访问</ea-card>
    </ea-timeline-item>
  </ea-timeline>
</div>
```

:::

## Timeline Attributes

| 参数    | 说明 | 类型    | 可选值 | 默认值 |
| ------- | ---- | ------- | ------ | ------ |
| reverse | 倒序 | boolean | -      | true   |

## TimelineItem Attributes

| 参数      | 说明 | 类型   | 可选值                                   | 默认值 |
| --------- | ---- | ------ | ---------------------------------------- | ------ |
| time      | 时间 | string | -                                        | -      |
| placement | 位置 | string | top                                      | bottom |
| type      | 类型 | string | primary/success<br/>/warning/danger/info | info   |
| size      | 大小 | string | large                                    | normal |
| color     | 颜色 | string | -                                        | -      |

## Timeline CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |
| list-wrap | 列表容器 |

## TimelineItem CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| container | 外层容器                                                     |
| circle    | 圆点                                                         |
| tail      | 线条                                                         |
| body      | 单个时间线的内容容器(包含 `content` 和 `timestamp` 元素节点) |
| content   | 单个时间线的内容                                             |
| timestamp | 时间戳                                                       |

## TimelineItem Slots

| 名称 | 说明               |
| ---- | ------------------ |
| -    | 默认插槽, 放置内容 |
