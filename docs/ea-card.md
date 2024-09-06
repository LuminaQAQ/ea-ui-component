<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../components/ea-card/index.js')
    import('../components/ea-button/index.js')

    import('./index.scss')
})
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 20px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
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

包含标题，内容和操作。

> Card 组件包括 `header` 和 `body` 部分， `header` 部分需要有显式具名 slot 分发，同时也是可选的。

<div class="demo">
    <div class="ea-card-demo">
        <ea-card>
            <div slot="header" class="header">
                <span>卡片标题</span>
                <ea-button type="text" size="small">操作按钮</ea-button>
            </div>
            <p class="ea-card-content" v-for="index in 4" :key="index">
                content{{index}}
            </p>
        </ea-card>
    </div>
</div>

::: details 查看代码

`css`

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}

.ea-card-demo {
  width: 400px;
}
```

`html`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-card/index.js";
</script>

<div class="ea-card-demo">
  <ea-card>
    <div slot="header" class="header">
      <span>卡片标题</span>
      <ea-button type="text" size="small">操作按钮</ea-button>
    </div>
    <p class="ea-card-content">content1</p>
    <p class="ea-card-content">content2</p>
    <p class="ea-card-content">content3</p>
    <p class="ea-card-content">content4</p>
  </ea-card>
</div>
```

:::

## 简单卡片

卡片可以只有内容区域。

<div class="demo">
  <ea-card>
    <p class="ea-card-content" v-for="index in 4" :key="index">
        content{{index}}
    </p>
  </ea-card>
</div>

::: details 查看代码

```html
<ea-card>
  <p class="ea-card-content">content1</p>
  <p class="ea-card-content">content2</p>
  <p class="ea-card-content">content3</p>
  <p class="ea-card-content">content4</p>
</ea-card>
```

:::

## 带图片

可配置定义更丰富的内容展示。

<div class="demo">
    <div class="ea-card-demo">
        <ea-card>
            <div class="image">
                <img src="https://picture.gptkong.com/20240627/15559913d5b477444baca33968cbb88b44.jpeg">
            </div>
            <div class="header" style="padding: 14px;">
                <span>不再流浪</span>
                <ea-button type="text" class="button">操作按钮</ea-button>
            </div>
        </ea-card>
    </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-card>
    <div class="image">
      <img
        src="https://picture.gptkong.com/20240627/15559913d5b477444baca33968cbb88b44.jpeg"
      />
    </div>
    <div class="header" style="padding: 14px;">
      <span>地狱笑话</span>
      <ea-button type="text" class="button">操作按钮</ea-button>
    </div>
  </ea-card>
</div>
```

:::

## 卡片阴影

通过设置 `shadow` 属性可对阴影的显示进行配置。

<div class="demo">
    <ea-card shadow="always">总是显示</ea-card>
    <ea-card shadow="hover">鼠标移入显示</ea-card>
    <ea-card shadow="never">从不显示</ea-card>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-card shadow="always">总是显示</ea-card>
  <ea-card shadow="hover">鼠标移入显示</ea-card>
  <ea-card shadow="never">从不显示</ea-card>
</div>
```

:::

## Attributes

| 参数   | 说明     | 类型   | 可选值                 | 默认值 |
| ------ | -------- | ------ | ---------------------- | ------ |
| header | 卡片标题 | string | —                      | —      |
| shadow | 卡片阴影 | string | always / hover / never | always |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明      |
| ------------ | --------- |
| container    | card 容器 |
| header-wrap  | 头部容器  |
| content-wrap | 内容容器  |

## Slot

| name   | 说明     |
| ------ | -------- |
| —      | 卡片内容 |
| header | 卡片标题 |
