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

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-pagination/index.js";
</script>
```

## 基础用法

需要设置`total`属性来设置数据总数。可以设置`layout`属性来控制显示的内容。

> 利用`change`事件监听当前页码的变化。

<div class="col left">
    <ea-pagination layout="prev,pager,next" total="60" />
    <ea-pagination layout="prev,pager,next" total="200" />
</div>

```html
<div class="col left">
  <ea-pagination layout="prev,pager,next" total="60"></ea-pagination>
  <ea-pagination layout="prev,pager,next" total="200"></ea-pagination>
</div>
```

> 当只显示前后按钮时，也可以通过`change`事件监听当前页码的变化。

<div class="col left">
    <ea-pagination id="prevAndNext" layout="prev,next" total="80"></ea-pagination>
</div>

```html
<div class="col left">
  <ea-pagination id="prevAndNext" layout="prev,next" total="80"></ea-pagination>
</div>
```

```js
document.querySelector("#prevAndNext").addEventListener("change", function (e) {
  alert(`当前页码为: ${e.detail.currentPage}`);
});
```

## 设置最大页码按钮数

> 设置`page-count`属性来设置最大页码按钮数。

<div class="col left">
    <ea-pagination layout="prev,pager,next" total="60" page-count="10"></ea-pagination>
    <ea-pagination layout="prev,pager,next" total="200" page-count="10"></ea-pagination>
</div>

```html
<div class="col left">
  <ea-pagination
    layout="prev,pager,next"
    total="60"
    page-count="10"
  ></ea-pagination>
  <ea-pagination
    layout="prev,pager,next"
    total="200"
    page-count="10"
  ></ea-pagination>
</div>
```

## 带有背景色的分页

通过设置`background`属性来设置背景色。

<div class="col left">
    <ea-pagination background layout="prev,pager,next" total="200"></ea-pagination>
</div>

```html
<div class="col left">
  <ea-pagination
    background
    layout="prev,pager,next"
    total="200"
  ></ea-pagination>
</div>
```

## 附加功能

根据场景需要，可以添加其他功能模块。

<div class="col left">
    <section>显示总数</section>
    <ea-pagination background layout="total,prev,pager,next" total="200"></ea-pagination>
</div>

```html
<div class="col left">
  <section>显示总数</section>
  <ea-pagination
    background
    layout="total,prev,pager,next"
    total="200"
  ></ea-pagination>
</div>
```

## Attributes

| 参数        | 说明           | 类型    | 可选值 | 默认值          |
| ----------- | -------------- | ------- | ------ | --------------- |
| total       | 总数           | number  | -      | 0               |
| page-count  | 最大页码按钮数 | number  | -      | 7               |
| layout      | 显示的内容     | string  | -      | prev,pager,next |
| background  | 显示背景色     | boolean | -      | false           |
| page-size   | 每页显示条数   | number  | -      | 10              |
| pager-count | 页码按钮的数量 | number  | -      | 7               |

## Events

| 事件名称 | 说明           | 回调参数                |
| -------- | -------------- | ----------------------- |
| change   | 页码改变时触发 | { currentPage: number } |
