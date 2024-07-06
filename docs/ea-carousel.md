<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

# Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容

## 基础用法

适用广泛的基础用法

> 结合使用 `ea-carousel` 和 `ea-carousel-item` 标签就得到了一个走马灯。幻灯片的内容是任意的，需要放在 `el-carousel-item` 标签中。默认情况下，在鼠标 `hover` 底部的指示器时就会触发切换。通过设置 `trigger` 属性为 `click`，可以达到点击触发的效果。

<div class="demo">
    <div class="title">默认 Hover 指示器触发</div>
    <ea-carousel>
        <template v-for="i in 5" :key="i">
            <ea-carousel-item>
                <div>{{i}}</div>
            </ea-carousel-item>
        </template>
    </ea-carousel>
    <hr/>
    <div class="title">Click 指示器触发</div>
    <ea-carousel trigger="click">
        <template v-for="i in 5" :key="i">
            <ea-carousel-item>
                <div>{{i}}</div>
            </ea-carousel-item>
        </template>
    </ea-carousel>
</div>

```html
<div class="demo">
  <!-- Hover 指示器触发 -->
  <div class="title">默认 Hover 指示器触发</div>
  <ea-carousel>
    <ea-carousel-item>
      <div>1</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>2</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>3</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>4</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>5</div>
    </ea-carousel-item>
  </ea-carousel>

  <!-- Click 指示器触发 -->
  <div class="title">Click 指示器触发</div>
  <ea-carousel trigger="click">
    <ea-carousel-item>
      <div>1</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>2</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>3</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>4</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>5</div>
    </ea-carousel-item>
  </ea-carousel>
</div>
```

## 切换间隔

> 通过设置 `interval` 属性可以设置切换间隔。

<div class="demo">
    <ea-carousel interval="5">
        <template v-for="i in 5" :key="i">
            <ea-carousel-item>
                <div>{{i}}</div>
            </ea-carousel-item>
        </template>
    </ea-carousel>
</div>

```html
<ea-carousel interval="5">
  <ea-carousel-item>
    <div>1</div>
  </ea-carousel-item>
  <ea-carousel-item>
    <div>2</div>
  </ea-carousel-item>
  <ea-carousel-item>
    <div>3</div>
  </ea-carousel-item>
  <ea-carousel-item>
    <div>4</div>
  </ea-carousel-item>
  <ea-carousel-item>
    <div>5</div>
  </ea-carousel-item>
</ea-carousel>
```

## 切换箭头

可以通过 `arrow` 属性设置切换箭头的显示时机

> `arrow` 属性定义了切换箭头的显示时机。默认情况下，切换箭头只有在鼠标 `hover` 到走马灯上时才会显示；若将 `arrow` 设置为 `always`，则会一直显示；设置为 `never`，则会一直隐藏。

<div class="demo">
    <div class="title"><b>arrow</b> 属性值为 <b>always</b></div>
    <ea-carousel arrow="always">
        <ea-carousel-item>
            <div>1</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>2</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>3</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>4</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>5</div>
        </ea-carousel-item>
    </ea-carousel>
    <hr/>
    <div class="title"><b>arrow</b> 属性值为 <b>never</b></div>
    <ea-carousel arrow="never">
        <ea-carousel-item>
            <div>1</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>2</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>3</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>4</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>5</div>
        </ea-carousel-item>
    </ea-carousel>
</div>

```html
<div class="demo">
  <div class="title"><b>arrow</b> 属性值为 <b>always</b></div>
  <ea-carousel arrow="always">
    <ea-carousel-item>
      <div>1</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>2</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>3</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>4</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>5</div>
    </ea-carousel-item>
  </ea-carousel>
  <hr />
  <div class="title"><b>arrow</b> 属性值为 <b>never</b></div>
  <ea-carousel arrow="never">
    <ea-carousel-item>
      <div>1</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>2</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>3</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>4</div>
    </ea-carousel-item>
    <ea-carousel-item>
      <div>5</div>
    </ea-carousel-item>
  </ea-carousel>
</div>
```

## Attributes

| 参数     | 说明               | 类型   | 可选值             | 默认值 |
| -------- | ------------------ | ------ | ------------------ | ------ |
| interval | 切换间隔，单位为秒 | number | —                  | 3000   |
| trigger  | 指示器触发方式     | string | hover/click        | hover  |
| arrow    | 切换箭头显示时机   | string | always/hover/never | hover  |
