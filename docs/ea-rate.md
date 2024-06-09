<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../index.js')
  import('./index.scss')

  document.getElementById('ea-rate').addEventListener('change', function (e) {
    console.log(e.detail.value)
  })

  document.getElementById('ea-rate-show-text-customization').showTextList = ["极差", "差", "中", "良", "优"];
  document.getElementById('ea-rate-show-text').addEventListener('hover', function (e) {
    console.log(e.detail.value)
  })
})
</script>

# Rate 评分

评分组件

## 基础用法

<div class="row">
    <section>
        <p>默认颜色</p>
        <ea-rate id="ea-rate" value="2"></ea-rate>
    </section>
    <section>
        <p>自定义颜色</p>
        <ea-rate id="ea-rate-different-color" colors="#f56c6c"></ea-rate>
    </section>
</div>

```html
<div class="row">
  <section>
    <p>默认颜色</p>
    <ea-rate id="ea-rate"></ea-rate>
  </section>
  <section>
    <p>自定义颜色</p>
    <ea-rate id="ea-rate-different-color" colors="#f56c6c"></ea-rate>
  </section>
</div>
```

`JS`: 用 `e.detail.value` 获取当前分数

> (测试可看控制台)

```js
document.getElementById("ea-rate").addEventListener("change", function (e) {
  console.log(e.detail.value);
});
```

## 辅助文字

用辅助文字直接地表达对应分数

<div class="row">
    <section>
        <p>默认显示文字</p>
        <ea-rate id="ea-rate-show-text" show-text></ea-rate>
    </section>
    <section>
        <p>自定义文字</p>
        <ea-rate id="ea-rate-show-text-customization" show-text></ea-rate>
    </section>
</div>

```html
<div class="row">
  <section>
    <p>默认颜色</p>
    <ea-rate id="ea-rate-show-text" show-text></ea-rate>
  </section>
  <section>
    <p>默认颜色</p>
    <ea-rate id="ea-rate-show-text-customization" show-text></ea-rate>
  </section>
</div>
```

`JS` 自定义显示文字

```js
document.getElementById("ea-rate-show-text").showTextList = [
  "极差",
  "差",
  "中",
  "良",
  "优",
];
```

## 其它 icon

当有多层评价时，可以用不同类型的 icon 区分评分层级

## 只读

只读的评分用来展示分数，允许出现半星
