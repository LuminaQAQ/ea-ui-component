<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')

  const hiddenExample = {
    badge: document.querySelector("#hiddenBadge"),

    init() {
      this.badge.addEventListener("mouseover", () => {
        this.badge.setAttribute("data-hidden", true);

        this.badge.addEventListener(
          "mouseout",
          () => {
            this.badge.removeAttribute("data-hidden");
          },
          { once: true }
        );
      });
    },
  };
  hiddenExample.init();
})
</script>

<style>
ea-badge::part(custom-icon) {
  color: white;
  font-size: 12px;
  margin-right: 2px;
}

ea-badge::part(custom-value) {
  font-size: 14px;
}
</style>

# Badge 徽标

出现在按钮、图标旁的数字或状态标记。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-badge/index.js";
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

通过设置 `value` 属性展示新消息数量。

<div class="demo row left">
  <ea-badge value="12">
    <ea-button>comments</ea-button>
  </ea-badge>
  <ea-badge value="3" type="primary">
    <ea-button>replies</ea-button>
  </ea-badge>
  <ea-badge value="12" type="success">
    <ea-button>comments</ea-button>
  </ea-badge>
  <ea-badge value="3" type="warning">
    <ea-button>replies</ea-button>
  </ea-badge>
  <ea-badge value="3" type="info">
    <ea-button>comments</ea-button>
  </ea-badge>
  <ea-badge value="3" color="green">
    <ea-button>custom background</ea-button>
  </ea-badge>
</div>

::: details 查看代码

```html
<div class="demo row">
  <ea-badge value="12">
    <ea-button>comments</ea-button>
  </ea-badge>
  <ea-badge value="3" type="primary">
    <ea-button>replies</ea-button>
  </ea-badge>
  <ea-badge value="12" type="success">
    <ea-button>comments</ea-button>
  </ea-badge>
  <ea-badge value="3" type="warning">
    <ea-button>replies</ea-button>
  </ea-badge>
  <ea-badge value="3" type="info">
    <ea-button>comments</ea-button>
  </ea-badge>
  <ea-badge value="3" color="green">
    <ea-button>custom background</ea-button>
  </ea-badge>
</div>
```

:::

## 最大值

可通过设置 `max` 属性自定义最大值。

::: tip

`max` 属性接受一个 `Number`，需要注意的是，只有当 `value` 为 `Number` 时，它才会生效。

:::

<div class="demo row left">
  <ea-badge value="200" max="99">
    <ea-button>comments</ea-button>
  </ea-badge>
  <ea-badge value="100" max="10">
    <ea-button>replies</ea-button>
  </ea-badge>
</div>

```html
<div class="demo row">
  <ea-badge value="200" max="99">
    <ea-button>comments</ea-button>
  </ea-badge>
  <ea-badge value="100" max="10">
    <ea-button>replies</ea-button>
  </ea-badge>
</div>
```

## 自定义显示内容​

你也可以展示除数字以外你想要展示的任何值。 或者您可以使用 content 栏位自定义内容。

当 `value` 是 `String` 时，可以显示自定义文字。 或者使用 `content` 插槽。

<div class="row left">
  <ea-badge value="new">
    <ea-button size="small">评论</ea-button>
  </ea-badge>
  <ea-badge value="hot">
    <ea-button size="small">回复</ea-button>
  </ea-badge>
</div>

::: code-group

```html
<div class="demo">
  <div class="row">
    <ea-badge value="new">
      <ea-button>comments</ea-button>
    </ea-badge>
    <ea-badge value="hot">
      <ea-button>replies</ea-button>
    </ea-badge>
  </div>
  <ea-badge value="99">
    <ea-button>share</ea-button>
    <div slot="content">
      <ea-icon icon="icon-share" part="custom-icon"></ea-icon>
      <span data-value part="custom-value"></span>
    </div>
  </ea-badge>
</div>
```

```css
ea-badge::part(custom-icon) {
  color: white;
  font-size: 12px;
  margin-right: 2px;
}
ea-badge::part(custom-value) {
  font-size: 14px;
}
```

:::

## 小红点​

通过一个小红点标记来告知用户有新内容。

使用 `is-dot` 属性。 是个布尔值。

<div class="demo row">
  <ea-badge is-dot>query</ea-badge>
  <ea-badge id="hiddenBadge" is-dot>
    <ea-button icon="icon-share">share</ea-button>
  </ea-badge>
  <ea-badge is-dot>
    <ea-button icon="icon-mail"></ea-button>
  </ea-badge>
</div>

::: code-group

```html
<div class="demo row">
  <ea-badge is-dot>query</ea-badge>
  <ea-badge id="hiddenBadge" is-dot>
    <ea-button icon="icon-share">share</ea-button>
  </ea-badge>
  <ea-badge is-dot>
    <ea-button icon="icon-mail"></ea-button>
  </ea-badge>
</div>
```

```js
const hiddenExample = {
  badge: document.querySelector("#hiddenBadge"),

  init() {
    this.badge.addEventListener("mouseover", () => {
      this.badge.setAttribute("data-hidden", true);

      this.badge.addEventListener(
        "mouseout",
        () => {
          this.badge.removeAttribute("data-hidden");
        },
        { once: true }
      );
    });
  },
};
hiddenExample.init();
```

:::

## 偏移量

设置徽章点的偏移，格式是 `[左，顶部]`， 代表状态点从左侧和默认位置顶部的偏移。

<div class="demo">
  <ea-badge class="item" value="0" offset-x="10" offset-y="5">
    <ea-button>offset</ea-button>
  </ea-badge>
</div>

```html
<div class="demo">
  <ea-badge class="item" value="0" offset-x="10" offset-y="5">
    <ea-button>offset</ea-button>
  </ea-badge>
</div>
```

## Attributes

| 参数        | 说明                                                                       | 类型               | 可选值                                            | 默认值   |
| ----------- | -------------------------------------------------------------------------- | ------------------ | ------------------------------------------------- | -------- |
| value       | 徽章显示的值；可以是数字或字符串；当为数字且超过 `max` 时会显示为 `{max}+` | String / Number    | —                                                 | ""       |
| max         | 最大值阈值，超过显示为 `{max}+`；仅当 `value` 为 Number 时生效             | Number             | —                                                 | Infinity |
| is-dot      | 是否以小圆点形式显示徽章（不显示数字）                                     | Boolean            | —                                                 | false    |
| data-hidden | 是否隐藏 Badge。                                                           | Boolean            | —                                                 | false    |
| type        | badge 类型。                                                               | String             | `primary \| success \| warning \| danger \| info` | danger   |
| show-zero   | 值为零时是否显示 Badge                                                     | Boolean            | —                                                 | true     |
| color       | 背景色 `--ea-badge-color`                                                  | String (CSS color) | —                                                 | ""       |
| offset-x    | 徽章在 X 轴上的偏移（像素），内部会设置 `--ea-badge-offset-x`              | Number             | —                                                 | 0        |
| offset-y    | 徽章在 Y 轴上的偏移（像素），内部会设置 `--ea-badge-offset-y`              | Number             | —                                                 | 0        |

## Scopes

| 名称       | 说明         |
| ---------- | ------------ |
| data-value | 徽章显示的值 |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                                    |
| --------- | ------------------------------------------------------- |
| container | `ea-badge` 外层容器（包含徽章与插槽内容）               |
| content   | 徽章显示值的容器（内部为 `<sup>` 元素，part="content"） |

## Slots

| 名称 | 说明                                                                         |
| ---- | ---------------------------------------------------------------------------- |
| —    | 默认插槽：组件的子节点通常为触发目标（如按钮、图标等），徽章会定位在该元素上 |
