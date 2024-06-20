<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

# Empty 空状态

空状态时的占位提示。

## 基础用法

通过设置 `description` 属性来配置描述文字。

<div class="demo">
    <ea-empty description="描述文字"></ea-empty>
</div>

```html
<div class="demo">
  <ea-empty description="描述文字"></ea-empty>
</div>
```

## 自定义图片

通过设置 `image` 属性传入图片 URL。

<div class="demo">
    <ea-empty image="https://inews.gtimg.com/om_bt/O6SG7dHjdG0kWNyWz6WPo2_3v6A6eAC9ThTazwlKPO1qMAA/641"></ea-empty>
</div>

```html
<div class="demo">
  <ea-empty
    image="https://inews.gtimg.com/om_bt/O6SG7dHjdG0kWNyWz6WPo2_3v6A6eAC9ThTazwlKPO1qMAA/641"
  ></ea-empty>
</div>
```

## 图片尺寸

通过设置 `image-size` 属性来控制图片大小。

<div class="row">
    <ea-empty image-size="100" image="https://inews.gtimg.com/om_bt/O6SG7dHjdG0kWNyWz6WPo2_3v6A6eAC9ThTazwlKPO1qMAA/641"></ea-empty>
    <ea-empty image-size="100"></ea-empty>
</div>

```html
<div class="row">
  <ea-empty
    image-size="100"
    image="https://inews.gtimg.com/om_bt/O6SG7dHjdG0kWNyWz6WPo2_3v6A6eAC9ThTazwlKPO1qMAA/641"
  ></ea-empty>
  <ea-empty image-size="100"></ea-empty>
</div>
```

## 底部内容

使用默认插槽可在底部插入内容。
