<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
})
</script>

# Tag 标签

用于标记和选择。

## 引入

> `js`

```js
<script type='module'>
  import "./node_modules/easy-component-ui/components/ea-tag/index.js";
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

由 `type` 属性来选择 tag 的类型。 也可以通过 `color` 属性来自定义背景色。

<div class="demo row left">
  <ea-tag type="primary">Tag 1</ea-tag>
  <ea-tag type="success">Tag 2</ea-tag>
  <ea-tag type="info">Tag 3</ea-tag>
  <ea-tag type="warning">Tag 4</ea-tag>
  <ea-tag type="danger">Tag 5</ea-tag>
</div>

```html
<div class="demo">
  <ea-tag type="primary">Tag 1</ea-tag>
  <ea-tag type="success">Tag 2</ea-tag>
  <ea-tag type="info">Tag 3</ea-tag>
  <ea-tag type="warning">Tag 4</ea-tag>
  <ea-tag type="danger">Tag 5</ea-tag>
</div>
```

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。 它接受一个 `Boolean`。 默认的标签移除时会附带渐变动画。 如果不想使用，可以设置 `disable-transitions` 属性，它接受一个 `Boolean`，`true` 为关闭。 当 Tag 被移除时会触发 `ea-remove` 事件。

<div class="demo row left">
  <ea-tag type="primary" closable>Tag 1</ea-tag>
  <ea-tag type="success" closable>Tag 2</ea-tag>
  <ea-tag type="info" closable>Tag 3</ea-tag>
  <ea-tag type="warning" closable>Tag 4</ea-tag>
  <ea-tag type="danger" closable>Tag 5</ea-tag>
</div>

```html
<div class="demo">
  <ea-tag type="primary" closable>Tag 1</ea-tag>
  <ea-tag type="success" closable>Tag 2</ea-tag>
  <ea-tag type="info" closable>Tag 3</ea-tag>
  <ea-tag type="warning" closable>Tag 4</ea-tag>
  <ea-tag type="danger" closable>Tag 5</ea-tag>
</div>
```

## 不同尺寸

Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

<div class="demo row left">
  <ea-tag size="large">Large</ea-tag>
  <ea-tag>Default</ea-tag>
  <ea-tag size="small">Small</ea-tag>
</div>

```html
<div class="demo">
  <ea-tag size="large">Large</ea-tag>
  <ea-tag>Default</ea-tag>
  <ea-tag size="small">Small</ea-tag>
</div>
```

## 不同主题

Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`。通过设置 `effect` 属性来改变主题, 默认主题为 `light`

<div class="demo">
  <p class="row left is-not-demo">
    Dark：
    <ea-tag effect="dark" type="primary">Tag 1</ea-tag>
    <ea-tag effect="dark" type="success">Tag 2</ea-tag>
    <ea-tag effect="dark" type="info">Tag 3</ea-tag>
    <ea-tag effect="dark" type="warning">Tag 4</ea-tag>
    <ea-tag effect="dark" type="danger">Tag 5</ea-tag>
  </p>
  <p class="row left is-not-demo">
    Light：
    <ea-tag effect="light" type="primary">Tag 1</ea-tag>
    <ea-tag effect="light" type="success">Tag 2</ea-tag>
    <ea-tag effect="light" type="info">Tag 3</ea-tag>
    <ea-tag effect="light" type="warning">Tag 4</ea-tag>
    <ea-tag effect="light" type="danger">Tag 5</ea-tag>
  </p>
  <p class="row left is-not-demo">
    Plain：
    <ea-tag effect="plain" type="primary">Tag 1</ea-tag>
    <ea-tag effect="plain" type="success">Tag 2</ea-tag>
    <ea-tag effect="plain" type="info">Tag 3</ea-tag>
    <ea-tag effect="plain" type="warning">Tag 4</ea-tag>
    <ea-tag effect="plain" type="danger">Tag 5</ea-tag>
  </p>
</div>

::: details 查看代码

```html
<div class="demo">
  <p>
    Dark：
    <ea-tag effect="dark" type="primary">Tag 1</ea-tag>
    <ea-tag effect="dark" type="success">Tag 2</ea-tag>
    <ea-tag effect="dark" type="info">Tag 3</ea-tag>
    <ea-tag effect="dark" type="warning">Tag 4</ea-tag>
    <ea-tag effect="dark" type="danger">Tag 5</ea-tag>
  </p>
  <p>
    Light：
    <ea-tag effect="light" type="primary">Tag 1</ea-tag>
    <ea-tag effect="light" type="success">Tag 2</ea-tag>
    <ea-tag effect="light" type="info">Tag 3</ea-tag>
    <ea-tag effect="light" type="warning">Tag 4</ea-tag>
    <ea-tag effect="light" type="danger">Tag 5</ea-tag>
  </p>
  <p>
    Plain：
    <ea-tag effect="plain" type="primary">Tag 1</ea-tag>
    <ea-tag effect="plain" type="success">Tag 2</ea-tag>
    <ea-tag effect="plain" type="info">Tag 3</ea-tag>
    <ea-tag effect="plain" type="warning">Tag 4</ea-tag>
    <ea-tag effect="plain" type="danger">Tag 5</ea-tag>
  </p>
</div>
```

:::

## 圆形标签​

Tag 可以向按钮组件一样变为完全圆形。

<div class="demo">
  <p class="row left is-not-demo">
    <ea-tag effect="dark" round type="primary">Tag 1</ea-tag>
    <ea-tag effect="dark" round type="success">Tag 2</ea-tag>
    <ea-tag effect="dark" round type="info">Tag 3</ea-tag>
    <ea-tag effect="dark" round type="warning">Tag 4</ea-tag>
    <ea-tag effect="dark" round type="danger">Tag 5</ea-tag>
  </p>
  <p class="row left is-not-demo">
    <ea-tag effect="light" round type="primary">Tag 1</ea-tag>
    <ea-tag effect="light" round type="success">Tag 2</ea-tag>
    <ea-tag effect="light" round type="info">Tag 3</ea-tag>
    <ea-tag effect="light" round type="warning">Tag 4</ea-tag>
    <ea-tag effect="light" round type="danger">Tag 5</ea-tag>
  </p>
  <p class="row left is-not-demo">
    <ea-tag effect="plain" round type="primary">Tag 1</ea-tag>
    <ea-tag effect="plain" round type="success">Tag 2</ea-tag>
    <ea-tag effect="plain" round type="info">Tag 3</ea-tag>
    <ea-tag effect="plain" round type="warning">Tag 4</ea-tag>
    <ea-tag effect="plain" round type="danger">Tag 5</ea-tag>
  </p>
</div>

::: details 查看代码

```html
<div class="demo">
  <p>
    <ea-tag effect="dark" round type="primary">Tag 1</ea-tag>
    <ea-tag effect="dark" round type="success">Tag 2</ea-tag>
    <ea-tag effect="dark" round type="info">Tag 3</ea-tag>
    <ea-tag effect="dark" round type="warning">Tag 4</ea-tag>
    <ea-tag effect="dark" round type="danger">Tag 5</ea-tag>
  </p>
  <p>
    <ea-tag effect="light" round type="primary">Tag 1</ea-tag>
    <ea-tag effect="light" round type="success">Tag 2</ea-tag>
    <ea-tag effect="light" round type="info">Tag 3</ea-tag>
    <ea-tag effect="light" round type="warning">Tag 4</ea-tag>
    <ea-tag effect="light" round type="danger">Tag 5</ea-tag>
  </p>
  <p>
    <ea-tag effect="plain" round type="primary">Tag 1</ea-tag>
    <ea-tag effect="plain" round type="success">Tag 2</ea-tag>
    <ea-tag effect="plain" round type="info">Tag 3</ea-tag>
    <ea-tag effect="plain" round type="warning">Tag 4</ea-tag>
    <ea-tag effect="plain" round type="danger">Tag 5</ea-tag>
  </p>
</div>
```

:::

## 可选中的标签​

有时候因为业务需求，我们可能会需要用到类似复选框的标签，但是按钮式的复选框的样式又不满足需求，此时我们就可以用到 `check-tag` 组件。

<div class="demo">
  <p class="row left is-not-demo">
    <ea-check-tag checked>Checked</ea-check-tag>
    <ea-check-tag>Toggle me</ea-check-tag>
    <ea-check-tag disabled>Disabled</ea-check-tag>
  </p>
  <p class="row left is-not-demo">
    <ea-check-tag checked type="primary"> Tag 1 </ea-check-tag>
    <ea-check-tag checked type="success"> Tag 2 </ea-check-tag>
    <ea-check-tag checked type="info"> Tag 3 </ea-check-tag>
    <ea-check-tag checked type="warning"> Tag 4 </ea-check-tag>
    <ea-check-tag checked type="danger"> Tag 5 </ea-check-tag>
    <ea-check-tag checked disabled type="success"> Tag 6 </ea-check-tag>
  </p>
</div>

::: details 查看代码

```html
<div class="demo">
  <p>
    <ea-check-tag checked>Checked</ea-check-tag>
    <ea-check-tag>Toggle me</ea-check-tag>
    <ea-check-tag disabled>Disabled</ea-check-tag>
  </p>
  <p>
    <ea-check-tag checked type="primary"> Tag 1 </ea-check-tag>
    <ea-check-tag checked type="success"> Tag 2 </ea-check-tag>
    <ea-check-tag checked type="info"> Tag 3 </ea-check-tag>
    <ea-check-tag checked type="warning"> Tag 4 </ea-check-tag>
    <ea-check-tag checked type="danger"> Tag 5 </ea-check-tag>
    <ea-check-tag checked disabled type="success"> Tag 6 </ea-check-tag>
  </p>
</div>
```

:::

## Tag API

### Tag Attributes

| 参数                | 说明                                         | 类型    | 可选值                                                       | 默认值  |
| ------------------- | -------------------------------------------- | ------- | ------------------------------------------------------------ | ------- |
| type                | 主题类型，用于选择预设样式                   | string  | `default \| primary \| success \| info \| warning \| danger` | primary |
| size                | 组件尺寸，影响内边距与字体大小               | string  | `large \| default \| small`                                  | default |
| effect              | 主题效果，控制背景与边框样式                 | string  | `dark \| light \| plain`                                     | light   |
| closable            | 是否显示关闭图标，支持用户移除标签           | boolean | -                                                            | false   |
| color               | 自定义背景色或文字色（依据 effect/样式而定） | string  | CSS color value                                              | -       |
| disabled            | 是否禁用交互（禁用时不触发事件）             | boolean | -                                                            | false   |
| round               | 是否为圆角/圆形样式                          | boolean | -                                                            | false   |
| disable-transitions | 是否禁用移除时的动画过渡                     | boolean | -                                                            | false   |

### Tag CSS Part

| 名称       | 说明                                    |
| ---------- | --------------------------------------- |
| container  | Tag 根容器，包含文本与可选图标/关闭按钮 |
| close-icon | 关闭图标按钮                            |

### Tag Slots

| 名称 | 说明                                   |
| ---- | -------------------------------------- |
| -    | 默认插槽，用于放置标签文本或自定义内容 |

### Tag Events

| 事件名称  | 说明             | 回调参数                                    |
| --------- | ---------------- | ------------------------------------------- |
| ea-remove | 标签被移除后触发 | event: (被移除标签的相关信息，可包含 value) |

## CheckTag API

### CheckTag Attributes

| 参数     | 说明               | 类型    | 可选值                                                       | 默认值  |
| -------- | ------------------ | ------- | ------------------------------------------------------------ | ------- |
| checked  | 是否选中状态       | boolean | -                                                            | false   |
| disabled | 是否禁用交互       | boolean | -                                                            | false   |
| type     | 选中状态的主题样式 | string  | `default \| primary \| success \| info \| warning \| danger` | default |

### CheckTag CSS Part

| 名称      | 说明                                |
| --------- | ----------------------------------- |
| container | CheckTag 根容器，包含可选图标与文本 |

### CheckTag Slots

| 名称 | 说明                                   |
| ---- | -------------------------------------- |
| -    | 默认插槽，用于放置标签文本或自定义内容 |

### CheckTag Events

| 事件名称 | 说明               | 回调参数                           |
| -------- | ------------------ | ---------------------------------- |
| change   | 选中状态改变时触发 | event.detail: `{ value: boolean }` |
