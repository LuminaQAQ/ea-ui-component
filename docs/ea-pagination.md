<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    document.querySelector('#prevAndNext').addEventListener('change', function (e) {
        alert(`当前页码为: ${e.detail.currentPage}`);
    })
})
</script>

# Pagination 分页

当数据量过多时，使用分页分解数据。

## 基础用法

> 可以设置`layout`属性来控制显示的内容。

<div class="col left">
    <ea-pagination layout="prev,pager,next" total="81" />
    <ea-pagination layout="prev,pager,next" total="200" />
</div>

```html
<div class="col left">
  <ea-pagination layout="prev,pager,next" total="80" />
</div>
```

> 当只显示前后按钮时，可以通过`change`事件监听当前页码的变化。

<div class="col left">
    <ea-pagination id="prevAndNext" layout="prev,next" total="80" />
</div>

```html
<div class="col left">
  <ea-pagination id="prevAndNext" layout="prev,next" total="80" />
</div>
```

```js
document.querySelector("#prevAndNext").addEventListener("change", function (e) {
  alert(`当前页码为: ${e.detail.currentPage}`);
});
```

## 设置最大页码按钮数

## 带有背景色的分页

## 小型分页

在空间有限的情况下，可以使用简单的小型分页。

## 附加功能

根据场景需要，可以添加其他功能模块。

## 当只有一页时隐藏分页

当只有一页时，通过设置 hide-on-single-page 属性来隐藏分页。
