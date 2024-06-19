<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    const skeletonTemplate = `
        <div style="width: 240px;">
            <ea-skeleton animated>
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
    `;

    const realDomTemplate = `
        <div style="width: 240px;">
            <ea-avatar size="240" shape="square"></ea-avatar>
            <div style="padding: 14px">
                <div>Hello World!</div>
                <div>Hello World! Hello World!</div>
                <div>Hello!</div>
            </div>
        </div>
    `;

    document.querySelector("#handleLoadingStatusSwitch").addEventListener('change', (e) => {
        const isChecked = e.detail.checked;
        const wrap = document.querySelector("#loadingStatusNodeWrap");

        if (isChecked) wrap.innerHTML = skeletonTemplate;
        else wrap.innerHTML = realDomTemplate;
    })

    document.querySelector("#handleMultipleLoadingStatusSwitch").addEventListener('change', (e) => {
        const isChecked = e.detail.checked;
        const wrap = document.querySelector("#multipleLoadingStatusNodeWrap");

        let template = ``;

        if (isChecked){
            for(let i = 0; i < 3; i++) {
                template += skeletonTemplate;
            }

            wrap.innerHTML = template;
        } else {
            for(let i = 0; i < 3; i++) {
                template += realDomTemplate;
            }
            
            wrap.innerHTML = template;
        } 
    })
})
</script>

# Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

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
    <div id="loadingStatusNodeWrap">
        <div style="width: 240px;">
            <ea-skeleton animated>
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
</div>

```html
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
        <ea-skeleton-item variant="text" style="width: 30%;"></ea-skeleton-item>
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

<div id="loadingStatusNodeWrap">
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

```js
document
  .querySelector("#handleLoadingStatusSwitch")
  .addEventListener("change", (e) => {
    const isChecked = e.detail.checked;
    const wrap = document.querySelector("#loadingStatusNodeWrap");

    if (isChecked) wrap.innerHTML = skeletonTemplate;
    else wrap.innerHTML = realDomTemplate;
  });
```

## 渲染多条数据

大多时候, 骨架屏都被用来渲染列表, 当我们需要在从服务器获取数据的时候来渲染一个假的 UI。利用 `count` 这个属性就能控制渲染多少条假的数据在页面上

> 请注意, 请尽可能的将 count 的大小保持在最小状态, 即使是假的 UI, DOM 元素多了之后, 照样会引起性能问题, 并且在骨架屏销毁时所消耗的时间也会更长(相对的)。

<div class="demo">
    <p class="align-center">
        切换 Loading 状态 <ea-switch id="handleMultipleLoadingStatusSwitch" checked></ea-switch>
    </p>
    <div id="multipleLoadingStatusNodeWrap">
        <div style="width: 240px;">
            <ea-skeleton animated count="3">
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
</div>

```html
<div style="width: 240px;">
  <ea-skeleton animated count="3">
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
  </ea-skeleton>
</div>
```

## 防止渲染抖动

有的时候，API 的请求回来的特别快，往往骨架占位刚刚被渲染，真实的数据就已经回来了，用户的界面会突然一闪，此时为了避免这种情况，就需要通过 throttle 属性来避免这个问题。
