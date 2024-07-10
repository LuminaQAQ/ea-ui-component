<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    document.querySelector("#handleLoadingStatusSwitch").addEventListener('change', (e) => {
        const isChecked = e.detail.checked;
        const wrap = document.querySelector("#loadingStatusNodeWrap");
        wrap.loading = isChecked;
    })

    document.querySelector("#handleMultipleLoadingStatusSwitch").addEventListener('change', (e) => {
        const isChecked = e.detail.checked;
        const wrap = document.querySelector("#multipleLoadingStatusNodeWrap");
        wrap.loading = isChecked;
    })
})
</script>

# Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-skeleton/index.js";
</script>
```

## 基础用法

基础的骨架效果。

<div class="demo">
    <ea-skeleton></ea-skeleton>
</div>

```html
<div class="demo">
  <ea-skeleton></ea-skeleton>
</div>
```

## 更多参数

可以配置骨架屏段落数量，以便更接近真实渲染效果。首行会被渲染一个长度 33% 的段首。

<div class="demo">
    <ea-skeleton row="6"></ea-skeleton>
</div>

```html
<div class="demo">
  <ea-skeleton row="6"></ea-skeleton>
</div>
```

## 动画效果

显示动画效果。

<div class="demo">
    <ea-skeleton row="6" animated></ea-skeleton>
</div>

```html
<div class="demo">
  <ea-skeleton row="6" animated></ea-skeleton>
</div>
```

## 自定义样式

Element 提供的排版模式有时候并不满足要求，当您想要用自己定义的模板时，可以通过一个具名 Slot 来自己设定模板。

我们提供了不同的模板单元可供使用，具体可选值请看 API 详细描述。 建议在描述模板的时候，尽量靠近真实的 DOM 结构，这样可以避免 DOM 高度差距引起的抖动。

<div class="demo">
    <div style="width: 240px;">
        <ea-skeleton>
          <div slot="template">
              <ea-skeleton-item variant="image" style="width: 240px; height: 240px" ></ea-skeleton-item>
              <div style="padding: 14px">
                  <ea-skeleton-item variant="p" style="width: 50%;"></ea-skeleton-item>
                  <ea-skeleton-item variant="text" style="margin-right: 16px;"></ea-skeleton-item>
                  <ea-skeleton-item variant="text" style="width: 30%;"></ea-skeleton-item>
              </div>
          </div>   
        </ea-skeleton>
    </div>
</div>

```html
<div class="demo">
  <div style="width: 240px;">
    <ea-skeleton animated>
      <div slot="template">
        <ea-skeleton-item
          variant="image"
          style="width: 240px; height: 240px"
        ></ea-skeleton-item>
        <div style="padding: 14px">
          <ea-skeleton-item variant="p" style="width: 50%;"></ea-skeleton-item>
          <ea-skeleton-item
            variant="text"
            style="margin-right: 16px;"
          ></ea-skeleton-item>
          <ea-skeleton-item
            variant="text"
            style="width: 30%;"
          ></ea-skeleton-item>
        </div>
      </div>
    </ea-skeleton>
  </div>
</div>
```

## Loading 状态

<div class="demo">
    <p class="align-center">
        切换 Loading 状态 <ea-switch id="handleLoadingStatusSwitch" checked></ea-switch>
    </p>
    <div>
        <div style="width: 240px;">
            <ea-skeleton id="loadingStatusNodeWrap" animated>
              <div slot="template">
                  <ea-skeleton-item variant="image" style="width: 240px; height: 240px" ></ea-skeleton-item>
                  <div style="padding: 14px">
                      <ea-skeleton-item variant="p" style="width: 50%;"></ea-skeleton-item>
                      <ea-skeleton-item variant="text" style="margin-right: 16px;"></ea-skeleton-item>
                      <ea-skeleton-item variant="text" style="width: 30%;"></ea-skeleton-item>
                  </div>
              </div>
              <div>
                  <ea-avatar size="240" shape="square" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
                  <div style="padding: 14px">
                      <div>Hello World!</div>
                      <div>Hello World! Hello World!</div>
                      <div>Hello!</div>
                  </div>
              </div>         
            </ea-skeleton>
        </div>      
    </div>
</div>

```html
<div style="width: 240px;">
  <ea-skeleton id="loadingStatusNodeWrap" animated>
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 240px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="p" style="width: 50%;"></ea-skeleton-item>
        <ea-skeleton-item
          variant="text"
          style="margin-right: 16px;"
        ></ea-skeleton-item>
        <ea-skeleton-item variant="text" style="width: 30%;"></ea-skeleton-item>
      </div>
    </div>
    <div>
      <ea-avatar
        size="240"
        shape="square"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      ></ea-avatar>
      <div style="padding: 14px">
        <div>Hello World!</div>
        <div>Hello World! Hello World!</div>
        <div>Hello!</div>
      </div>
    </div>
  </ea-skeleton>
</div>
```

### 示例

```html
<p class="align-center">
  切换 Loading 状态
  <ea-switch id="handleLoadingStatusSwitch" checked></ea-switch>
</p>
<div>
  <div style="width: 240px;">
    <ea-skeleton id="loadingStatusNodeWrap" animated>
      <div slot="template">
        <ea-skeleton-item
          variant="image"
          style="width: 240px; height: 240px"
        ></ea-skeleton-item>
        <div style="padding: 14px">
          <ea-skeleton-item variant="p" style="width: 50%;"></ea-skeleton-item>
          <ea-skeleton-item
            variant="text"
            style="margin-right: 16px;"
          ></ea-skeleton-item>
          <ea-skeleton-item
            variant="text"
            style="width: 30%;"
          ></ea-skeleton-item>
        </div>
      </div>
      <div>
        <ea-avatar
          size="240"
          shape="square"
          src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
        ></ea-avatar>
        <div style="padding: 14px">
          <div>Hello World!</div>
          <div>Hello World! Hello World!</div>
          <div>Hello!</div>
        </div>
      </div>
    </ea-skeleton>
  </div>
</div>
```

```js
document
  .querySelector("#handleLoadingStatusSwitch")
  .addEventListener("change", (e) => {
    const isChecked = e.detail.checked;
    const wrap = document.querySelector("#loadingStatusNodeWrap");
    wrap.loading = isChecked;
  });
```

## 渲染多条数据

大多时候, 骨架屏都被用来渲染列表, 当我们需要在从服务器获取数据的时候来渲染一个假的 UI。利用 `count` 这个属性就能控制渲染多少条假的数据在页面上

> 请注意, 请尽可能的将 count 的大小保持在最小状态, 即使是假的 UI, DOM 元素多了之后, 照样会引起性能问题, 并且在骨架屏销毁时所消耗的时间也会更长(相对的)。

<div class="demo">
    <p class="align-center">
        切换 Loading 状态 <ea-switch id="handleMultipleLoadingStatusSwitch" checked></ea-switch>
    </p>
    <div>
        <div style="width: 240px;">
            <ea-skeleton id="multipleLoadingStatusNodeWrap" animated count="2">
                <div slot="template">
                    <ea-skeleton-item variant="image" style="width: 240px; height: 240px" ></ea-skeleton-item>
                    <div style="padding: 14px">
                        <ea-skeleton-item variant="p" style="width: 50%;"></ea-skeleton-item>
                        <ea-skeleton-item variant="text" style="margin-right: 16px;"></ea-skeleton-item>
                    </div>
                </div>
                <div>
                  <ea-avatar size="240" shape="square" src="https://b0.bdstatic.com/2bb3119a584a173526df6da5ee42754b.jpg@h_1280"></ea-avatar>
                  <div style="padding: 14px">
                      <div>牛马</div>
                      <div style="font-size: 12px; color: gray;">这是一只牛马</div>
                  </div>
                </div>
                <div>
                  <ea-avatar size="240" shape="square" src="https://pic4.zhimg.com/v2-c2bdf8d900f904e7ff1f3e7d7cdc665b_r.jpg"></ea-avatar>
                  <div style="padding: 14px">
                      <div>吗喽</div>
                      <div style="font-size: 12px; color: gray;">这是一只吗喽</div>
                  </div>
                </div>               
            </ea-skeleton>
        </div>
    </div>
</div>

```html
<div style="width: 240px;">
  <ea-skeleton id="multipleLoadingStatusNodeWrap" animated count="2">
    <div slot="template">
      <ea-skeleton-item
        variant="image"
        style="width: 240px; height: 240px"
      ></ea-skeleton-item>
      <div style="padding: 14px">
        <ea-skeleton-item variant="p" style="width: 50%;"></ea-skeleton-item>
        <ea-skeleton-item
          variant="text"
          style="margin-right: 16px;"
        ></ea-skeleton-item>
      </div>
    </div>
    <div>
      <ea-avatar
        size="240"
        shape="square"
        src="https://b0.bdstatic.com/2bb3119a584a173526df6da5ee42754b.jpg@h_1280"
      ></ea-avatar>
      <div style="padding: 14px">
        <div>牛马</div>
        <div style="font-size: 12px; color: gray;">这是一只牛马</div>
      </div>
    </div>
    <div>
      <ea-avatar
        size="240"
        shape="square"
        src="https://pic4.zhimg.com/v2-c2bdf8d900f904e7ff1f3e7d7cdc665b_r.jpg"
      ></ea-avatar>
      <div style="padding: 14px">
        <div>吗喽</div>
        <div style="font-size: 12px; color: gray;">这是一只吗喽</div>
      </div>
    </div>
  </ea-skeleton>
</div>
```

## Skeleton Attributes

| 参数     | 说明             | 类型    | 可选值 | 默认值 |
| -------- | ---------------- | ------- | ------ | ------ |
| animated | 是否开启动画     | Boolean | -      | false  |
| count    | 渲染的骨架屏个数 | Number  | -      | 1      |
| loading  | 是否显示骨架屏   | Boolean | -      | true   |
| rows     | 段落占位图行数   | Number  | -      | 0      |

## Skeleton Item Attributes

| 参数    | 说明       | 类型   | 可选值         | 默认值 |
| ------- | ---------- | ------ | -------------- | ------ |
| variant | 占位图类型 | String | image, p, text | image  |

## Skeleton Slots

| 名称     | 说明                   |
| -------- | ---------------------- |
| template | 骨架屏模板             |
| default  | 骨架屏内容, 非具名插槽 |
