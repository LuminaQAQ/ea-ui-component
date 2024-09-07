<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../components/ea-infinite-scroll/index.js')
    import('./index.scss')

    const infiniteNodes = {
      wrap: document.getElementById('infinite'),
      disabledWrap: document.getElementById('infinite-disabled'),

      createTemplate(content) {
        return `<div class="sg-infinite-item">${content}</div>`
      },
      appendChild(wrap) {
        const children = wrap.querySelectorAll('ea-infinite-item');
        const item = document.createElement('ea-infinite-item');
        item.innerHTML = this.createTemplate(children.length + 1);

        wrap.appendChild(item);
      }
    }

    infiniteNodes.wrap.addEventListener('bottomReached', (e) => {
      for(let i = 0; i < 2; i++) {
        infiniteNodes.appendChild(infiniteNodes.wrap);
      }
    })

    infiniteNodes.disabledWrap.addEventListener('bottomReached', (e) => {
      if(infiniteNodes.disabledWrap.children.length > 15) {
        infiniteNodes.disabledWrap.disabled = true;
        return;
      }

      for(let i = 0; i < 5; i++) {
        infiniteNodes.appendChild(infiniteNodes.disabledWrap);
      }
    })
})
</script>

<style lang="scss">
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

.loading-status,
.no-more-status {
  text-align: center;
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

<div class="demo" style="height: 150px; overflow: auto;">
    <ea-infinite id="infinite">
        <template v-for="i in 5">
            <ea-infinite-item>
                <div class="sg-infinite-item">{{i}}</div>
            </ea-infinite-item>
        </template>
    </ea-infinite>
</div>

::: details 查看代码

> `css`: 通过使用 `::part()` 伪类修改 `ea-infinite` 样式

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

> `html`

```html
<div class="demo" style="height: 150px; overflow: auto;">
  <ea-infinite id="infinite">
    <ea-infinite-item>
      <div class="sg-infinite-item">1</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">2</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">3</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">4</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">5</div>
    </ea-infinite-item>
  </ea-infinite>
</div>
```

> `js`: 通过监听 `bottomReached` 事件来处理相应事件

```js
const infiniteNodes = {
  wrap: document.getElementById("infinite"),
  createTemplate(content) {
    return `<div class="sg-infinite-item">${content}</div>`;
  },
};

infiniteNodes.wrap.addEventListener("bottomReached", (e) => {
  const children = infiniteNodes.wrap.children;

  for (let i = 0; i < 5; i++) {
    const item = document.createElement("ea-infinite-item");
    item.innerHTML = infiniteNodes.createTemplate(children.length + 1);

    infiniteNodes.wrap.appendChild(item);
  }
});
```

:::

## 禁用加载

通过设置 `disabled` 属性，可以禁用无限加载功能。若同时使用了插槽名为 `noMore` 的插槽，则会显示 `noMore` 插槽的内容。

<div class="demo" style="height: 150px; overflow: auto;">
  <ea-infinite id="infinite-disabled" delay="500" loading>
    <ea-infinite-item>
      <div class="sg-infinite-item">1</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">2</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">3</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">4</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">5</div>
    </ea-infinite-item>
    <div class="loading-status" slot="loading">加载中...</div>
    <div class="no-more-status" slot="noMore">到底啦~</div>
  </ea-infinite>
</div>

```js
infinite.disabled = true;
```

::: details 查看代码

`css`

```css
.loading-status,
.no-more-status {
  text-align: center;
}
```

`html`

```html
<div class="demo" style="height: 150px; overflow: auto;">
  <ea-infinite id="infinite-disabled" delay="500" loading>
    <ea-infinite-item>
      <div class="sg-infinite-item">1</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">2</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">3</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">4</div>
    </ea-infinite-item>
    <ea-infinite-item>
      <div class="sg-infinite-item">5</div>
    </ea-infinite-item>
    <div class="loading-status" slot="loading">加载中...</div>
    <div class="no-more-status" slot="noMore">到底啦~</div>
  </ea-infinite>
</div>
```

`js`

```js
// 定义一个对象用于管理无限加载的节点
const infiniteNodes = {
  // 获取页面上用于无限加载的容器元素
  disabledWrap: document.getElementById("infinite-disabled"),

  // 创建一个新的无限加载项模板
  createTemplate(content) {
    return `<div class="sg-infinite-item">${content}</div>`;
  },

  // 向指定容器中追加子元素
  appendChild(wrap) {
    const children = wrap.querySelectorAll(".sg-infinite-item");
    const item = document.createElement("ea-infinite-item");
    item.innerHTML = this.createTemplate(children.length + 1);

    wrap.appendChild(item);
  },
};

// 监听容器上的"bottomReached"事件，该事件在容器底部到达视口时触发
infiniteNodes.disabledWrap.addEventListener("bottomReached", (e) => {
  // 检查容器中的子元素数量是否超过15个
  if (infiniteNodes.disabledWrap.children.length > 15) {
    // 如果超过15个，则禁用容器，停止无限加载
    infiniteNodes.disabledWrap.disabled = true;
    return;
  }

  for (let i = 0; i < 5; i++) {
    infiniteNodes.appendChild(infiniteNodes.disabledWrap);
  }
});
```

:::

## Attributes

| 参数     | 说明                                                          | 类型    | 可选值 | 默认值 |
| -------- | ------------------------------------------------------------- | ------- | ------ | ------ |
| disabled | 是否禁用无限加载                                              | Boolean | -      | false  |
| loading  | 加载中时显示的内容<br/>(需要配合 `slot="loading"` 的容器使用) | String  | -      | -      |
| delay    | 延迟加载的时间(ms)                                            | Number  | -      | 200    |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明                                              |
| ------------ | ------------------------------------------------- |
| container    | 内容容器                                          |
| loading-wrap | 显示加载中的内容的容器(`slot="loading"`的容器)    |
| noMore-wrap  | 显示无更多数据的内容的容器(`slot="noMore"`的容器) |

## Events

| 事件名        | 说明           | 回调参数 |
| ------------- | -------------- | -------- |
| bottomReached | 到达底部时触发 | -        |

## Slots

| 名称    | 说明                                                 |
| ------- | ---------------------------------------------------- |
| -       | 滚动区域的内容                                       |
| noMore  | 无更多数据时显示的内容(需要配合 `disabled` 属性使用) |
| loading | 加载中的内容(需要配合 `loading` 属性使用)            |
