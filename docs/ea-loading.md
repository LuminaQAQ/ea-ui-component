<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../index.js')
  import('./index.scss')

  document.querySelector('#btn').addEventListener('click', (e) => {
    const isLoading = document.querySelector('#loading');
    isLoading.loading = !isLoading.loading;
  })

  document.querySelector('#customizationBtn').addEventListener('click', (e) => {
    const isLoading = document.querySelector('#customizationLoading');
    isLoading.loading = !isLoading.loading;
  })

  document.querySelector('#fullscreenBtn').addEventListener('click', (e) => {
    const isLoading = document.querySelector('#fullscreenLoading');
    isLoading.loading = !isLoading.loading;

    let timer = setTimeout(() => {
        isLoading.loading = false;
        clearTimeout(timer);
        timer = null;
    }, 2000)
  })

  document.querySelector('#fullscreenLockBtn').addEventListener('click', (e) => {
    const isLoading = document.querySelector('#fullscreenLockLoading');
    isLoading.loading = !isLoading.loading;

    let timer = setTimeout(() => {
        isLoading.loading = false;
        clearTimeout(timer);
        timer = null;
    }, 2000)
  })
})
</script>

# Loading 加载

加载数据时显示动效。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-loading/index.js";
</script>
```

> `js`: 如果需要使用案例, 则需额外引入 `ea-description` 和 `ea-description-item` 组件。

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-button/index.js";
  import "./node_modules/easy-component-ui/components/ea-descriptions/index.js";
  import
  "./node_modules/easy-component-ui/components/ea-descriptions-item/index.js";
</script>
```

## 区域加载

在表格等容器中加载数据时显示。

<div class="row left">
  <ea-button id="btn">点击切换状态</ea-button>
  <ea-loading id="loading" loading="true">
      <ea-descriptions title="用户信息">
        <ea-descriptions-item label="姓名">张三</ea-descriptions-item>
        <ea-descriptions-item label="手机号">110</ea-descriptions-item>
        <ea-descriptions-item label="居住地">福建省</ea-descriptions-item>
        <ea-descriptions-item label="备注">
          <ea-tag>正确的</ea-tag>
        </ea-descriptions-item>
        <ea-descriptions-item span="2" label="联系地址">帝都东城区史家胡同123号</ea-descriptions-item>
    </ea-descriptions>
  </ea-loading>
</div>

```html
<ea-button id="btn">点击切换状态</ea-button>
<ea-loading
  id="loading"
  loading="true"
  background="rgba(0,0,0,0.8)"
  spinner="icon-chrome"
>
  <ea-descriptions title="用户信息">
    <ea-descriptions-item label="姓名">张三</ea-descriptions-item>
    <ea-descriptions-item label="手机号">110</ea-descriptions-item>
    <ea-descriptions-item label="居住地">福建省</ea-descriptions-item>
    <ea-descriptions-item label="备注">
      <ea-tag>正确的</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item span="2" label="联系地址"
      >帝都东城区史家胡同123号</ea-descriptions-item
    >
  </ea-descriptions>
</ea-loading>
```

```js
document.querySelector("#btn").addEventListener("click", (e) => {
  const isLoading = document.querySelector("#loading").loading;
  document.querySelector("#loading").loading = !isLoading;
});
```

## 自定义

> 可自定义 `text` 加载文案、`spinner`图标、`spinner-size`图标大小和`background`背景色。

<div class="row left">
  <ea-button id="customizationBtn">点击切换状态</ea-button>
  <ea-loading id="customizationLoading" text="拼命加载中" loading="true" background="rgba(0,0,0,0.8)" spinner="icon-chrome" spinner-size="20">
      <ea-descriptions title="用户信息">
        <ea-descriptions-item label="姓名">张三</ea-descriptions-item>
        <ea-descriptions-item label="手机号">110</ea-descriptions-item>
        <ea-descriptions-item label="居住地">福建省</ea-descriptions-item>
        <ea-descriptions-item label="备注">
          <ea-tag>正确的</ea-tag>
        </ea-descriptions-item>
        <ea-descriptions-item span="2" label="联系地址">帝都东城区史家胡同123号</ea-descriptions-item>
    </ea-descriptions>
  </ea-loading>
</div>

## 整页加载

页面数据加载时显示。

> 全屏状态需要设置 `fullscreen` 属性。可以设置 `lock` 属性来锁定滚动条。

<ea-loading id="fullscreenLoading" loading="false" fullscreen></ea-loading>
<ea-loading id="fullscreenLockLoading" loading="false" fullscreen lock></ea-loading>

<div class="row left">
  <ea-button id="fullscreenBtn">点击切换状态(未锁定)</ea-button>
  <ea-button id="fullscreenLockBtn">点击切换状态(锁定)</ea-button>
</div>

```html
<ea-loading id="fullscreenLoading" loading="false" fullscreen></ea-loading>
<ea-loading
  id="fullscreenLockLoading"
  loading="false"
  fullscreen
  lock
></ea-loading>

<div class="row left">
  <ea-button id="fullscreenBtn">点击切换状态(未锁定)</ea-button>
  <ea-button id="fullscreenLockBtn">点击切换状态(锁定)</ea-button>
</div>
```

```js
document.querySelector("#fullscreenBtn").addEventListener("click", (e) => {
  const isLoading = document.querySelector("#fullscreenLoading");
  isLoading.loading = !isLoading.loading;

  let timer = setTimeout(() => {
    isLoading.loading = false;
    clearTimeout(timer);
    timer = null;
  }, 2000);
});

document.querySelector("#fullscreenLockBtn").addEventListener("click", (e) => {
  const isLoading = document.querySelector("#fullscreenLockLoading");
  isLoading.loading = !isLoading.loading;

  let timer = setTimeout(() => {
    isLoading.loading = false;
    clearTimeout(timer);
    timer = null;
  }, 2000);
});
```

## Attributes

| 参数         | 说明             | 类型    | 可选值 | 默认值                 |
| ------------ | ---------------- | ------- | ------ | ---------------------- |
| loading      | 是否显示加载动画 | Boolean | -      | false                  |
| fullscreen   | 是否全屏         | Boolean | -      | false                  |
| lock         | 是否锁定页面     | Boolean | -      | false                  |
| background   | 背景颜色         | String  | -      | hsla(0, 0%, 100%, 0.9) |
| text         | 加载文案         | String  | -      | ''                     |
| spinner      | 加载图标         | String  | -      | ''                     |
| spinner-size | 加载图标大小     | String  | -      | 16px                   |

## Slot

| name | 说明     |
| ---- | -------- |
| -    | 默认插槽 |
