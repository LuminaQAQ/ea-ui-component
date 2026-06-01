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

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-tag.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-tag";
```

:::

## 自定义样式

移步到 [CSS Part](#tag-css-part)。

## 基础用法

由 `variant` 属性来选择 tag 的类型。也可以通过 `color` 属性来自定义背景色。

<div class="demo row left">
  <ea-tag variant="primary">Tag 1</ea-tag>
  <ea-tag variant="success">Tag 2</ea-tag>
  <ea-tag variant="info">Tag 3</ea-tag>
  <ea-tag variant="warning">Tag 4</ea-tag>
  <ea-tag variant="danger">Tag 5</ea-tag>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-tag variant="primary">Tag 1</ea-tag>
  <ea-tag variant="success">Tag 2</ea-tag>
  <ea-tag variant="info">Tag 3</ea-tag>
  <ea-tag variant="warning">Tag 4</ea-tag>
  <ea-tag variant="danger">Tag 5</ea-tag>
</div>
```

:::

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。它接受一个 `Boolean`。默认的标签移除时会附带渐变动画。如果不想使用，可以设置 `disable-transitions` 属性，它接受一个 `Boolean`，`true` 为关闭。当 Tag 被移除时会触发 `ea-remove` 事件。

<div class="demo row left">
  <ea-tag variant="primary" closable>Tag 1</ea-tag>
  <ea-tag variant="success" closable>Tag 2</ea-tag>
  <ea-tag variant="info" closable>Tag 3</ea-tag>
  <ea-tag variant="warning" closable>Tag 4</ea-tag>
  <ea-tag variant="danger" closable>Tag 5</ea-tag>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-tag variant="primary" closable>Tag 1</ea-tag>
  <ea-tag variant="success" closable>Tag 2</ea-tag>
  <ea-tag variant="info" closable>Tag 3</ea-tag>
  <ea-tag variant="warning" closable>Tag 4</ea-tag>
  <ea-tag variant="danger" closable>Tag 5</ea-tag>
</div>
```

:::

## 不同尺寸

Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

<div class="demo row left">
  <ea-tag size="large">Large</ea-tag>
  <ea-tag>Default</ea-tag>
  <ea-tag size="small">Small</ea-tag>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-tag size="large">Large</ea-tag>
  <ea-tag>Default</ea-tag>
  <ea-tag size="small">Small</ea-tag>
</div>
```

:::

## 不同主题

Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`。通过设置 `effect` 属性来改变主题，默认主题为 `light`。

<div class="demo">
  <p class="row left is-not-demo">
    Dark：
    <ea-tag effect="dark" variant="primary">Tag 1</ea-tag>
    <ea-tag effect="dark" variant="success">Tag 2</ea-tag>
    <ea-tag effect="dark" variant="info">Tag 3</ea-tag>
    <ea-tag effect="dark" variant="warning">Tag 4</ea-tag>
    <ea-tag effect="dark" variant="danger">Tag 5</ea-tag>
  </p>
  <p class="row left is-not-demo">
    Light：
    <ea-tag effect="light" variant="primary">Tag 1</ea-tag>
    <ea-tag effect="light" variant="success">Tag 2</ea-tag>
    <ea-tag effect="light" variant="info">Tag 3</ea-tag>
    <ea-tag effect="light" variant="warning">Tag 4</ea-tag>
    <ea-tag effect="light" variant="danger">Tag 5</ea-tag>
  </p>
  <p class="row left is-not-demo">
    Plain：
    <ea-tag effect="plain" variant="primary">Tag 1</ea-tag>
    <ea-tag effect="plain" variant="success">Tag 2</ea-tag>
    <ea-tag effect="plain" variant="info">Tag 3</ea-tag>
    <ea-tag effect="plain" variant="warning">Tag 4</ea-tag>
    <ea-tag effect="plain" variant="danger">Tag 5</ea-tag>
  </p>
</div>

::: details 查看代码

```html
<div class="demo">
  <p>
    Dark：
    <ea-tag effect="dark" variant="primary">Tag 1</ea-tag>
    <ea-tag effect="dark" variant="success">Tag 2</ea-tag>
    <ea-tag effect="dark" variant="info">Tag 3</ea-tag>
    <ea-tag effect="dark" variant="warning">Tag 4</ea-tag>
    <ea-tag effect="dark" variant="danger">Tag 5</ea-tag>
  </p>
  <p>
    Light：
    <ea-tag effect="light" variant="primary">Tag 1</ea-tag>
    <ea-tag effect="light" variant="success">Tag 2</ea-tag>
    <ea-tag effect="light" variant="info">Tag 3</ea-tag>
    <ea-tag effect="light" variant="warning">Tag 4</ea-tag>
    <ea-tag effect="light" variant="danger">Tag 5</ea-tag>
  </p>
  <p>
    Plain：
    <ea-tag effect="plain" variant="primary">Tag 1</ea-tag>
    <ea-tag effect="plain" variant="success">Tag 2</ea-tag>
    <ea-tag effect="plain" variant="info">Tag 3</ea-tag>
    <ea-tag effect="plain" variant="warning">Tag 4</ea-tag>
    <ea-tag effect="plain" variant="danger">Tag 5</ea-tag>
  </p>
</div>
```

:::

## 圆形标签

Tag 可以像按钮组件一样变为完全圆形。

<div class="demo">
  <p class="row left is-not-demo">
    <ea-tag effect="dark" round variant="primary">Tag 1</ea-tag>
    <ea-tag effect="dark" round variant="success">Tag 2</ea-tag>
    <ea-tag effect="dark" round variant="info">Tag 3</ea-tag>
    <ea-tag effect="dark" round variant="warning">Tag 4</ea-tag>
    <ea-tag effect="dark" round variant="danger">Tag 5</ea-tag>
  </p>
  <p class="row left is-not-demo">
    <ea-tag effect="light" round variant="primary">Tag 1</ea-tag>
    <ea-tag effect="light" round variant="success">Tag 2</ea-tag>
    <ea-tag effect="light" round variant="info">Tag 3</ea-tag>
    <ea-tag effect="light" round variant="warning">Tag 4</ea-tag>
    <ea-tag effect="light" round variant="danger">Tag 5</ea-tag>
  </p>
  <p class="row left is-not-demo">
    <ea-tag effect="plain" round variant="primary">Tag 1</ea-tag>
    <ea-tag effect="plain" round variant="success">Tag 2</ea-tag>
    <ea-tag effect="plain" round variant="info">Tag 3</ea-tag>
    <ea-tag effect="plain" round variant="warning">Tag 4</ea-tag>
    <ea-tag effect="plain" round variant="danger">Tag 5</ea-tag>
  </p>
</div>

::: details 查看代码

```html
<div class="demo">
  <p>
    <ea-tag effect="dark" round variant="primary">Tag 1</ea-tag>
    <ea-tag effect="dark" round variant="success">Tag 2</ea-tag>
    <ea-tag effect="dark" round variant="info">Tag 3</ea-tag>
    <ea-tag effect="dark" round variant="warning">Tag 4</ea-tag>
    <ea-tag effect="dark" round variant="danger">Tag 5</ea-tag>
  </p>
  <p>
    <ea-tag effect="light" round variant="primary">Tag 1</ea-tag>
    <ea-tag effect="light" round variant="success">Tag 2</ea-tag>
    <ea-tag effect="light" round variant="info">Tag 3</ea-tag>
    <ea-tag effect="light" round variant="warning">Tag 4</ea-tag>
    <ea-tag effect="light" round variant="danger">Tag 5</ea-tag>
  </p>
  <p>
    <ea-tag effect="plain" round variant="primary">Tag 1</ea-tag>
    <ea-tag effect="plain" round variant="success">Tag 2</ea-tag>
    <ea-tag effect="plain" round variant="info">Tag 3</ea-tag>
    <ea-tag effect="plain" round variant="warning">Tag 4</ea-tag>
    <ea-tag effect="plain" round variant="danger">Tag 5</ea-tag>
  </p>
</div>
```

:::

## 可选中的标签

有时候因为业务需求，我们可能会需要用到类似复选框的标签，但是按钮式的复选框的样式又不满足需求，此时我们就可以用到 `check-tag` 组件。

<div class="demo">
  <p class="row left is-not-demo">
    <ea-check-tag checked>Checked</ea-check-tag>
    <ea-check-tag>Toggle me</ea-check-tag>
    <ea-check-tag disabled>Disabled</ea-check-tag>
  </p>
  <p class="row left is-not-demo">
    <ea-check-tag checked variant="primary"> Tag 1 </ea-check-tag>
    <ea-check-tag checked variant="success"> Tag 2 </ea-check-tag>
    <ea-check-tag checked variant="info"> Tag 3 </ea-check-tag>
    <ea-check-tag checked variant="warning"> Tag 4 </ea-check-tag>
    <ea-check-tag checked variant="danger"> Tag 5 </ea-check-tag>
    <ea-check-tag checked disabled variant="success"> Tag 6 </ea-check-tag>
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
    <ea-check-tag checked variant="primary"> Tag 1 </ea-check-tag>
    <ea-check-tag checked variant="success"> Tag 2 </ea-check-tag>
    <ea-check-tag checked variant="info"> Tag 3 </ea-check-tag>
    <ea-check-tag checked variant="warning"> Tag 4 </ea-check-tag>
    <ea-check-tag checked variant="danger"> Tag 5 </ea-check-tag>
    <ea-check-tag checked disabled variant="success"> Tag 6 </ea-check-tag>
  </p>
</div>
```

:::

## Tag API

### Tag Attributes

| 参数                | 说明                               | 类型    | 可选值                                            | 默认值  |
| ------------------- | ---------------------------------- | ------- | ------------------------------------------------- | ------- |
| variant             | 主题类型，用于选择预设样式         | string  | `primary \| success \| info \| warning \| danger` | info    |
| size                | 组件尺寸，影响内边距与字体大小     | string  | `large \| default \| small`                       | default |
| effect              | 主题效果，控制背景与边框样式       | string  | `dark \| light \| plain`                          | light   |
| closable            | 是否显示关闭图标，支持用户移除标签 | boolean | —                                                 | false   |
| color               | 自定义背景色                       | string  | CSS color value                                   | —       |
| round               | 是否为圆角/圆形样式                | boolean | —                                                 | false   |
| disable-transitions | 是否禁用移除时的动画过渡           | boolean | —                                                 | false   |

### Tag CSS Part

| 名称       | 说明         |
| ---------- | ------------ |
| container  | 标签根容器   |
| close-icon | 关闭图标按钮 |

### Tag Slots

| 名称 | 说明                                   |
| ---- | -------------------------------------- |
| —    | 默认插槽，用于放置标签文本或自定义内容 |

### Tag Events

| 事件名称  | 说明             | 回调参数                   |
| --------- | ---------------- | -------------------------- |
| ea-remove | 标签被移除后触发 | `{ text: string \| null }` |

### Tag CSS Custom Properties

| 属性名                 | 说明         | 默认值                   |
| ---------------------- | ------------ | ------------------------ |
| --ea-tag-border-radius | 组件圆角     | var(--border-radius-sm)  |
| --ea-tag-font-size     | 组件字体大小 | var(--font-size-sm)      |
| --ea-tag-transition    | 过渡动画时长 | var(--transition-normal) |

## CheckTag API

### CheckTag Attributes

| 参数     | 说明               | 类型    | 可选值                                            | 默认值  |
| -------- | ------------------ | ------- | ------------------------------------------------- | ------- |
| checked  | 是否选中状态       | boolean | —                                                 | false   |
| disabled | 是否禁用交互       | boolean | —                                                 | false   |
| variant  | 选中状态的主题样式 | string  | `primary \| success \| info \| warning \| danger` | primary |

### CheckTag CSS Part

| 名称      | 说明       |
| --------- | ---------- |
| container | 标签根容器 |

### CheckTag Slots

| 名称 | 说明                                   |
| ---- | -------------------------------------- |
| —    | 默认插槽，用于放置标签文本或自定义内容 |

### CheckTag Events

| 事件名称 | 说明               | 回调参数               |
| -------- | ------------------ | ---------------------- |
| change   | 选中状态改变时触发 | `{ checked: boolean }` |
