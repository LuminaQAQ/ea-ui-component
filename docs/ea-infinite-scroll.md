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
    this.el.addEventListener("loadmore", async e => {
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
          this.el.addEventListener("loadmore", async (e) => {
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

  ea-infinite::part(wrap) {
    display: flex;
    flex-direction: column;
  }
</style>

# InfiniteScroll 无限滚动

滚动至底部时，加载更多数据。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-infinite-scroll/index.js";
</script>
```

> `css`

::: tip
需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 `link` 标签引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#css-part)。

## 基础用法

通过 `ea-infinite` 与 `ea-infinite-item` 组件配合实现无限滚动。通过监听 `bottomReached` 事件可实现滚动到底部时自动执行加载方法。

<div class="demo" style="height: 150px; overflow: auto">
  <ea-scrollbar>
    <ea-infinite-scroll id="basicInfinite">
      <div class="sg-infinite-item">1</div>
      <div class="sg-infinite-item">2</div>
      <div class="sg-infinite-item">3</div>
      <div class="sg-infinite-item">4</div>
      <div class="sg-infinite-item">5</div>
      <section slot="loading">
        <ea-icon icon="icon-coffee"></ea-icon> loading...
      </section>
      <section slot="noMore">
        <ea-icon icon="icon-cancel"></ea-icon> no more
      </section>
    </ea-infinite-scroll>
  </ea-scrollbar>
</div>

::: code-group

```css
.sg-infinite-item {
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: aquamarine;
  margin-bottom: 10px;
}

ea-infinite::part(wrap) {
  display: flex;
  flex-direction: column;
}
```

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
        <ea-icon icon="icon-coffee"></ea-icon> loading...
      </section>
      <section slot="noMore">
        <ea-icon icon="icon-cancel"></ea-icon> no more
      </section>
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
    this.el.addEventListener("loadmore", async e => {
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

:::

## 禁用加载

通过设置 `disabled` 属性，可以禁用无限加载功能。若同时使用了插槽名为 `noMore` 的插槽，则会显示 `noMore` 插槽的内容。

<div class="demo" style="height: 150px; overflow: auto">
  <ea-scrollbar>
    <ea-infinite-scroll id="statusInfinite">
      <div class="sg-infinite-item">1</div>
      <div class="sg-infinite-item">2</div>
      <div class="sg-infinite-item">3</div>
      <div class="sg-infinite-item">4</div>
      <div class="sg-infinite-item">5</div>
      <section slot="loading" style="text-align: center">
        <ea-icon icon="icon-coffee"></ea-icon> loading...
      </section>
      <section slot="noMore" style="text-align: center">
        <ea-icon icon="icon-cancel"></ea-icon> no more
      </section>
    </ea-infinite-scroll>
  </ea-scrollbar>
</div>

::: code-group

```css
.sg-infinite-item {
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: aquamarine;
  margin-bottom: 10px;
}

ea-infinite::part(wrap) {
  display: flex;
  flex-direction: column;
}
```

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
        <ea-icon icon="icon-coffee"></ea-icon> loading...
      </section>
      <section slot="noMore" style="text-align: center">
        <ea-icon icon="icon-cancel"></ea-icon> no more
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
    this.el.addEventListener("loadmore", async e => {
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

:::

## Attributes

| 参数     | 说明                                                          | 类型   | 可选值                        | 默认值     |
| -------- | ------------------------------------------------------------- | ------ | ----------------------------- | ---------- |
| status   | 当前状态，控制显示的状态类（`finished`、`loading`、`noMore`） | String | `finished` `loading` `noMore` | `finished` |
| distance | 占位元素与视口交叉的 rootMargin（像素），用于触发加载         | Number | -                             | `0`        |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明                                                           |
| ----------- | -------------------------------------------------------------- |
| container   | 根容器（组件外层 section，part='container'）                   |
| placeholder | 占位元素（用于 IntersectionObserver 观察，part='placeholder'） |
| loading     | 加载状态显示容器（slot="loading" 的外层，part='loading'）      |
| noMore      | 无更多数据显示容器（slot="noMore" 的外层，part='noMore'）      |

## Events

| 事件名   | 说明                                                               | 回调参数                                                                       |
| -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| loadmore | 占位元素进入可视区并且组件处于可加载（status 为 `finished`）时触发 | Object，包含回调函数：{ finished: () => void, noMore: () => void }，事件可冒泡 |

## Slots

| 名称    | 说明                                                                       |
| ------- | -------------------------------------------------------------------------- |
| -       | 默认插槽：滚动列表的内容（列表项通常直接作为子元素放入）                   |
| loading | 加载中显示内容（放置加载中提示或自定义 loading UI）                        |
| noMore  | 无更多数据时显示内容（当组件通过回调或 disabled 状态切换到 noMore 时显示） |
