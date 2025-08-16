<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

<style lang="scss" scoped>
ea-card::part(header-wrap) {
  text-align: center;
}

.footer {
  text-align: right;
}

.ea-card-demo {
  width: 300px;
}

.image {
  width: 100%;

  img {
    width: 100%;
  }
}
</style>

# Card 卡片

将信息聚合在卡片容器中展示。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-card/index.js";
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

卡片包含标题，内容以及操作区域。

Card 组件由 `header` `body` 和 `footer` 组成。 `header` 和 `footer` 是可选的，其内容取决于一个具名的 slot。

<div class="demo">
  <ea-card class="ea-card-demo " header="卡片标题">
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
      <li>List item 4</li>
    </ul>
    <div class="footer" slot="footer">
      <ea-button type="primary">确认</ea-button>
      <ea-button>取消</ea-button>
    </div>
  </ea-card>
</div>

::: details 查看代码

`css`

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.ea-card-demo {
  width: 300px;
}
```

`html`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-card/index.js";
</script>

<div class="demo">
  <ea-card class="ea-card-demo" header="卡片标题">
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
      <li>List item 4</li>
    </ul>
    <div class="footer" slot="footer">
      <ea-button type="primary">确认</ea-button>
      <ea-button>取消</ea-button>
    </div>
  </ea-card>
</div>
```

:::

## 简单卡片

卡片可以只有内容区域。

<div class="demo">
  <ea-card class="ea-card-demo">
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
      <li>List item 4</li>
    </ul>
  </ea-card>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-card class="ea-card-demo">
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
      <li>List item 4</li>
    </ul>
  </ea-card>
</div>
```

:::

## 带图片

可配置定义更丰富的内容展示。

<div class="demo ">
  <div class="ea-card-demo">
    <ea-card header="风景">
      <div class="image">
        <img
          src="https://th.bing.com/th/id/R.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0"
        />
      </div>
    </ea-card>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div class="ea-card-demo">
    <ea-card header="风景">
      <div class="image">
        <img
          src="https://th.bing.com/th/id/R.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0"
        />
      </div>
    </ea-card>
  </div>
</div>
```

:::

## 卡片阴影

你可以定义什么时候展示卡片的阴影效果。

通过 `shadow` 属性设置卡片阴影出现的时机。 该属性的值可以是：`always`、`hover` 或 `never`。

<div class="demo">
  <ea-space direction="vertical">
    <ea-card shadow="always">总是显示</ea-card>
    <ea-card shadow="hover">鼠标移入显示</ea-card>
    <ea-card shadow="never">从不显示</ea-card>
  </ea-space>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-space direction="vertical">
    <ea-card shadow="always">总是显示</ea-card>
    <ea-card shadow="hover">鼠标移入显示</ea-card>
    <ea-card shadow="never">从不显示</ea-card>
  </ea-space>
</div>
```

:::

## Attributes

| 参数   | 说明                                                                                            | 类型   | 可选值                 | 默认值 |
| ------ | ----------------------------------------------------------------------------------------------- | ------ | ---------------------- | ------ |
| header | 卡片的标题 你既可以通过设置 header 来修改标题，也可以通过 `slot="header"` 传入 DOM 节点         | string | —                      | —      |
| footer | 卡片页脚。 你既可以通过设置 footer 来修改卡片底部内容，也可以通过 `slot="footer"` 传入 DOM 节点 | string | —                      | —      |
| shadow | 卡片阴影                                                                                        | string | always / hover / never | always |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明      |
| ------------ | --------- |
| container    | card 容器 |
| header-wrap  | 标题容器  |
| content-wrap | 内容容器  |
| footer-wrap  | 页脚容器  |

## Slot

| name   | 说明     |
| ------ | -------- |
| —      | 卡片内容 |
| header | 卡片标题 |
| footer | 卡片页脚 |
