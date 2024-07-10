<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../index.js')
  import('./index.scss')

  document.getElementById('ea-rate').addEventListener('change', function (e) {
    console.log(e.detail.value)
  })

  document.getElementById('ea-rate').setAttribute('value', 5);
  document.getElementById('ea-rate-disabled').setAttribute('value', 2);

  document.getElementById('ea-rate-show-text-customization').showTextList = ["极差", "差", "中", "良", "优"];
  document.getElementById('ea-rate-show-text').addEventListener('hover', function (e) {
    console.log(e.detail.value, e.detail.rateText)
  })
})
</script>

# Rate 评分

评分组件

## 基础用法

<div class="row">
    <section>
        <p>默认颜色</p>
        <ea-rate id="ea-rate"></ea-rate>
    </section>
    <section>
        <p>自定义颜色</p>
        <ea-rate id="ea-rate-different-color" value="2" color="#f56c6c"></ea-rate>
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
    <ea-rate id="ea-rate-different-color" color="#f56c6c"></ea-rate>
  </section>
</div>
```

`JS`: 用 `e.detail.value` 获取当前分数

> (测试可看控制台)

```js
// 获取分数
document.getElementById("ea-rate").addEventListener("change", function (e) {
  console.log(e.detail.value);
});

// 设置分数
document.getElementById("ea-rate").setAttribute("value", 5);
```

## 禁用状态

只读的评分用来展示分数

<div class="col left">
    <ea-rate id="ea-rate-disabled" value="1" disabled></ea-rate>
</div>

```html
<div class="col left">
  <ea-rate id="ea-rate-disabled" value="1" disabled></ea-rate>
</div>
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
// get: 获取评分描述: e.detail.rateText
document
  .getElementById("ea-rate-show-text")
  .addEventListener("hover", function (e) {
    console.log(e.detail.value, e.detail.rateText);
  });

// set: 设置评分值描述: element.showTextList = []
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

<div class="col left">
    <ea-rate value="1"></ea-rate>
    <ea-rate void-icon-class="icon-heart-empty" active-icon-class="icon-heart" color="#f56c6c" value="2"></ea-rate>
    <ea-rate void-icon-class="icon-ok-circled2" active-icon-class="icon-ok-circled" color="#67c23a" value="3"></ea-rate>
    <ea-rate void-icon-class="icon-cancel-circled2" active-icon-class="icon-cancel-circled" color="red" value="4"></ea-rate>
</div>

```html
<div class="col left">
  <ea-rate value="1"></ea-rate>
  <ea-rate
    void-icon-class="icon-heart-empty"
    active-icon-class="icon-heart"
    color="#f56c6c"
    value="2"
  ></ea-rate>
  <ea-rate
    void-icon-class="icon-ok-circled2"
    active-icon-class="icon-ok-circled"
    color="#67c23a"
    value="3"
  ></ea-rate>
  <ea-rate
    void-icon-class="icon-cancel-circled2"
    active-icon-class="icon-cancel-circled"
    color="red"
    value="4"
  ></ea-rate>
</div>
```

## Attributes

| 参数              | 说明                         | 类型    | 可选值                | 默认值                                   |
| ----------------- | ---------------------------- | ------- | --------------------- | ---------------------------------------- |
| value             | 绑定值                       | number  | —                     | 0                                        |
| disabled          | 是否为只读状态，无法进行交互 | boolean | —                     | false                                    |
| show-text         | 是否显示辅助文字             | boolean | —                     | false                                    |
| void-icon-class   | 未选中 icon 的类名           | string  | —                     | icon-star-empty                          |
| active-icon-class | 选中 icon 的类名             | string  | —                     | icon-star                                |
| show-text-list    | 辅助文字列表                 | array   | —                     | ["极差", "失望", "一般", "满意", "惊喜"] |
| color             | 激活时的颜色                 | string  | —                     | #f7ba2a                                  |
| size              | 尺寸                         | string  | medium / small / mini | -                                        |

## Events

| 事件名称 | 说明           | 回调参数                                            |
| -------- | -------------- | --------------------------------------------------- |
| change   | 评分改变时触发 | (e.target.value: number)                            |
| hover    | 鼠标移入时触发 | (e.target.value: number, e.target.rateText: string) |
