<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')

const basicExample = {
  el: document.querySelector("#basicInfinite"),
  createTemplate(content) {
    const item = document.createElement("div");
    item.className = "sg-infinite-item";
    item.innerHTML = content;

    return item;
  },

  init() {
    this.el.addEventListener("ea-loadmore", async e => {
      const { finished } = e.detail;
      const length = this.el.querySelectorAll(".sg-infinite-item").length;

      for (let i = length; i < length + 5; i++) {
        this.el.appendChild(this.createTemplate(i + 1));
      }

      finished();
    });
  },
};
basicExample.init();


      const statusExample = {
        el: document.querySelector("#statusInfinite"),
        createTemplate(content) {
          const item = document.createElement("div");
          item.className = "sg-infinite-item";
          item.innerHTML = content;

          return item;
        },

        init() {
          this.el.addEventListener("ea-loadmore", async (e) => {
            const { finished, noMore } = e.detail;
            const length = this.el.querySelectorAll(".sg-infinite-item").length;

            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (length >= 20) return noMore();

            for (let i = length; i < length + 5; i++) {
              this.el.appendChild(this.createTemplate(i + 1));
            }

            finished();
          });
        },
      };
      statusExample.init();
})
</script>

<style lang="scss">
  .sg-infinite-item {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    text-align: center;
    background-color: aquamarine;
    margin-bottom: 10px;
  }
</style>

# InfiniteScroll 无限滚动

滚动至底部时，自动加载更多数据。基于 IntersectionObserver 实现，通过监听 `ea-loadmore` 事件在滚动到底部时触发加载逻辑。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-infinite-scroll.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-infinite-scroll";
```

:::

## 自定义样式

移步到 [CSS Part](#infinite-scroll-css-part)。

## 基础用法

将列表内容放入 `ea-infinite-scroll` 组件的默认插槽中，通过监听 `ea-loadmore` 事件实现滚动到底部时自动加载。事件回调的 `detail` 中包含 `finished` 和 `noMore` 两个方法，加载完成后调用 `finished()` 恢复可加载状态。

<div class="demo" style="height: 150px; overflow: auto">
  <ea-scrollbar>
    <ea-infinite-scroll id="basicInfinite">
      <div class="sg-infinite-item">1</div>
      <div class="sg-infinite-item">2</div>
      <div class="sg-infinite-item">3</div>
      <div class="sg-infinite-item">4</div>
      <div class="sg-infinite-item">5</div>
      <section slot="loading">
        <ea-icon name="mug-hot"></ea-icon> loading...
      </section>
      <section slot="noMore">
        <ea-icon name="ban"></ea-icon> no more
      </section>
    </ea-infinite-scroll>
  </ea-scrollbar>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo" style="height: 150px; overflow: auto">
  <ea-scrollbar>
    <ea-infinite-scroll id="basicInfinite">
      <div class="sg-infinite-item">1</div>
      <div class="sg-infinite-item">2</div>
      <div class="sg-infinite-item">3</div>
      <div class="sg-infinite-item">4</div>
      <div class="sg-infinite-item">5</div>

      <section slot="loading">
        <ea-icon name="mug-hot"></ea-icon> loading...
      </section>
      <section slot="noMore"><ea-icon name="ban"></ea-icon> no more</section>
    </ea-infinite-scroll>
  </ea-scrollbar>
</div>
```

```js
const basicExample = {
  el: document.querySelector("#basicInfinite"),
  createTemplate(content) {
    const item = document.createElement("div");
    item.className = "sg-infinite-item";
    item.innerHTML = content;
    return item;
  },
  init() {
    this.el.addEventListener("ea-loadmore", async e => {
      const { finished } = e.detail;
      const length = this.el.querySelectorAll(".sg-infinite-item").length;
      for (let i = length; i < length + 5; i++) {
        this.el.appendChild(this.createTemplate(i + 1));
      }
      finished();
    });
  },
};
basicExample.init();
```

```css
.sg-infinite-item {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: aquamarine;
  margin-bottom: 10px;
}
```

:::

::::

## 加载状态

通过 `status` 属性控制组件的加载状态。当调用 `noMore()` 回调后，`status` 变为 `noMore`，此时会显示 `noMore` 插槽的内容，且不再触发加载事件。

<div class="demo" style="height: 150px; overflow: auto">
  <ea-scrollbar>
    <ea-infinite-scroll id="statusInfinite">
      <div class="sg-infinite-item">1</div>
      <div class="sg-infinite-item">2</div>
      <div class="sg-infinite-item">3</div>
      <div class="sg-infinite-item">4</div>
      <div class="sg-infinite-item">5</div>
      <section slot="loading" style="text-align: center">
        <ea-icon name="mug-hot"></ea-icon> loading...
      </section>
      <section slot="noMore" style="text-align: center">
        <ea-icon name="ban"></ea-icon> no more
      </section>
    </ea-infinite-scroll>
  </ea-scrollbar>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo" style="height: 150px; overflow: auto">
  <ea-scrollbar>
    <ea-infinite-scroll id="statusInfinite">
      <div class="sg-infinite-item">1</div>
      <div class="sg-infinite-item">2</div>
      <div class="sg-infinite-item">3</div>
      <div class="sg-infinite-item">4</div>
      <div class="sg-infinite-item">5</div>
      <section slot="loading" style="text-align: center">
        <ea-icon name="mug-hot"></ea-icon> loading...
      </section>
      <section slot="noMore" style="text-align: center">
        <ea-icon name="ban"></ea-icon> no more
      </section>
    </ea-infinite-scroll>
  </ea-scrollbar>
</div>
```

```js
const statusExample = {
  el: document.querySelector("#statusInfinite"),
  createTemplate(content) {
    const item = document.createElement("div");
    item.className = "sg-infinite-item";
    item.innerHTML = content;
    return item;
  },
  init() {
    this.el.addEventListener("ea-loadmore", async e => {
      const { finished, noMore } = e.detail;
      const length = this.el.querySelectorAll(".sg-infinite-item").length;
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (length >= 20) return noMore();
      for (let i = length; i < length + 5; i++) {
        this.el.appendChild(this.createTemplate(i + 1));
      }
      finished();
    });
  },
};
statusExample.init();
```

```css
.sg-infinite-item {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: aquamarine;
  margin-bottom: 10px;
}
```

:::

::::

## InfiniteScroll API

### InfiniteScroll Attributes

| 参数     | 说明                                                             | 类型   | 可选值                        | 默认值     |
| -------- | ---------------------------------------------------------------- | ------ | ----------------------------- | ---------- |
| status   | 当前加载状态，控制显示的状态区域                                 | String | `finished` `loading` `noMore` | `finished` |
| distance | 占位元素与视口交叉的 rootMargin 偏移量（像素），用于提前触发加载 | Number | —                             | `0`        |

### InfiniteScroll CSS Part

| 名称        | 说明                                           |
| ----------- | ---------------------------------------------- |
| container   | 根容器元素                                     |
| content     | 内容包裹元素                                   |
| placeholder | 占位哨兵元素（用于 IntersectionObserver 观察） |
| loading     | 加载状态容器元素                               |
| noMore      | 无更多数据容器元素                             |

### InfiniteScroll Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| default | 默认插槽，滚动列表的内容 |
| loading | 加载中显示内容           |
| noMore  | 无更多数据时显示内容     |

### InfiniteScroll Events

| 事件名      | 说明                                             | 回调参数(event.detail)                                                                                       |
| ----------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| ea-loadmore | 占位元素进入可视区且 status 为 `finished` 时触发 | `{ finished: () => void, noMore: () => void }`，调用 `finished()` 恢复可加载，调用 `noMore()` 标记无更多数据 |

### InfiniteScroll CSS Custom Properties

| 属性名                                  | 说明             | 默认值 |
| --------------------------------------- | ---------------- | ------ |
| --ea-infinite-scroll-placeholder-height | 占位哨兵元素高度 | `1px`  |
