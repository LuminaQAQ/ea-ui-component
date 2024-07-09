<script setup>
import { onMounted } from 'vue'

const fits = ["fill", "contain", "cover", "none", "scale-down"];
const urls =  [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
]

onMounted(() => {
    // import('../index.js')
    import('./index.scss')
    import("../components/ea-image/index.js")
})
</script>

# Image 图片

图片容器，在保留原生 img 的特性下，支持懒加载，自定义占位、加载失败等

## 基础用法

> 可通过 `fit` 确定图片如何适应到容器框，同原生 `object-fit`。

<div class="row">
    <div class="sg-item" v-for="fit in fits">
        <div class="title">{{fit}}</div>
        <ea-image :fit="fit" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></ea-image>
    </div>
</div>

```html
<ea-image
  fit="fill"
  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
></ea-image>
<ea-image
  fit="contain"
  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
></ea-image>
<ea-image
  fit="cover"
  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
></ea-image>
<ea-image
  fit="none"
  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
></ea-image>
<ea-image
  fit="scale-down"
  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
></ea-image>
```

## 占位内容

<div class="row">
    <ea-image
    fit="fill"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    >
        <div slot="placeholder">加载中...</div>
    </ea-image>
</div>

```html
<div class="row">
  <ea-image
    fit="fill"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  >
    <div slot="placeholder">加载中...</div>
  </ea-image>
</div>
```

## 加载失败

<div class="row">
    <ea-image fit="fill"></ea-image>
</div>

```html
<div class="row">
  <ea-image fit="fill"></ea-image>
</div>
```

## 懒加载

<div class="row">
    <ea-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" lazy></ea-image>
</div>

<div class="demo" style="height: 120px; overflow: auto;">
    <template v-for="(url, index) in urls" :key="index">
        <ea-image :src="url" lazy></ea-image>
    </template>
</div>

> 单项

```html
<div class="row">
  <ea-image
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    lazy
  ></ea-image>
</div>
```

> 多项

```html
<div class="demo" style="height: 120px; overflow: auto;">
  <ea-image
    src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
    lazy
  ></ea-image
  ><ea-image
    src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
    lazy
  ></ea-image
  ><ea-image
    src="https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg"
    lazy
  ></ea-image
  ><ea-image
    src="https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"
    lazy
  ></ea-image
  ><ea-image
    src="https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
    lazy
  ></ea-image
  ><ea-image
    src="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"
    lazy
  ></ea-image
  ><ea-image
    src="https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
    lazy
  ></ea-image>
</div>
```

## 大图预览

<div class="row">
    <ea-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" lazy preview></ea-image>
</div>

```html
<div class="row">
  <ea-image
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    lazy
    preview
  ></ea-image>
</div>
```

## Attributes

| 参数    | 说明         | 类型    | 可选值                                 | 默认值 |
| ------- | ------------ | ------- | -------------------------------------- | ------ |
| src     | 图片地址     | String  | -                                      | -      |
| fit     | 图片裁剪模式 | String  | contain, cover, fill, none, scale-down | cover  |
| alt     | 原生 alt     | String  | -                                      | -      |
| lazy    | 是否懒加载   | Boolean | -                                      | false  |
| preview | 是否开启预览 | Boolean | -                                      | false  |

## Events

| 事件名称 | 说明               | 回调参数   |
| -------- | ------------------ | ---------- |
| load     | 图片加载成功时触发 | (e: Event) |
| error    | 图片加载失败时触发 | (e: Event) |

## Slots

| 名称        | 说明               |
| ----------- | ------------------ |
| placeholder | 默认插槽，图片内容 |
