<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../components/ea-loading/index.js')
  import('../components/ea-button/index.js')
  import('../components/ea-descriptions/index.js')

  import('./index.scss')

  const areaController = {
    btn: document.querySelector("#btn"),
    loading: document.querySelector("#loading"),

    init() {
      this.btn.addEventListener("click", (e) => {
        this.loading.loading = !this.loading.loading;
      });
    },
  };
  areaController.init();

  const customizationController = {
    btn: document.querySelector("#customizationBtn"),
    loading: document.querySelector("#customizationLoading"),

    init() {
      this.btn.addEventListener("click", (e) => {
        this.loading.loading = !this.loading.loading;
      });
    },
  };
  customizationController.init();

  function handleRemoveLoadingStatus(container) {
    let timer = setTimeout(() => {
      container.loading = false;
      clearTimeout(timer);
      timer = null;
    }, 2000);
  }

  const fullscreenController = {
    btn: document.querySelector("#fullscreenBtn"),
    loading: document.querySelector("#fullscreenLoading"),

    init() {
      this.btn.addEventListener("click", (e) => {
        this.loading.loading = !this.loading.loading;
        handleRemoveLoadingStatus(this.loading);
      });
    },
  };
  fullscreenController.init();

  const fullscreenLockController = {
    btn: document.querySelector("#fullscreenLockBtn"),
    loading: document.querySelector("#fullscreenLockLoading"),

    init() {
      this.btn.addEventListener("click", (e) => {
        this.loading.loading = !this.loading.loading;
        handleRemoveLoadingStatus(this.loading);
      });
    },
  };
  fullscreenLockController.init();
})
</script>

# Loading 加载

加载数据时显示动效。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-loading/index.js";
</script>
```

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#css-part)。

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

::: details 查看代码

`html`

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

`js`

```js
const areaController = {
  btn: document.querySelector("#btn"),
  loading: document.querySelector("#loading"),

  init() {
    this.btn.addEventListener("click", (e) => {
      this.loading.loading = !this.loading.loading;
    });
  },
};
areaController.init();
```

:::

## 自定义

可自定义 `text` 加载文案、`spinner` 图标、`spinner-size` 图标大小和 `background` 背景色。

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

::: details 查看代码

`html`

```html
<div class="row left">
  <ea-button id="customizationBtn">点击切换状态</ea-button>
  <ea-loading
    id="customizationLoading"
    text="拼命加载中"
    loading="true"
    background="rgba(0,0,0,0.8)"
    spinner="icon-chrome"
    spinner-size="20"
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
</div>
```

`js`

```js
const customizationController = {
  btn: document.querySelector("#customizationBtn"),
  loading: document.querySelector("#customizationLoading"),

  init() {
    this.btn.addEventListener("click", (e) => {
      this.loading.loading = !this.loading.loading;
    });
  },
};
customizationController.init();
```

:::

## 整页加载

页面数据加载时显示。全屏状态需要设置 `fullscreen` 属性，同时可以设置 `lock` 属性来锁定滚动条。

<ea-loading id="fullscreenLoading" loading="false" fullscreen></ea-loading>
<ea-loading id="fullscreenLockLoading" loading="false" fullscreen lock></ea-loading>

<div class="row left">
  <ea-button id="fullscreenBtn">点击切换状态(未锁定)</ea-button>
  <ea-button id="fullscreenLockBtn">点击切换状态(锁定)</ea-button>
</div>

::: details 查看代码

`html`

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

`js`

```js
function handleRemoveLoadingStatus(container) {
  let timer = setTimeout(() => {
    container.loading = false;
    clearTimeout(timer);
    timer = null;
  }, 2000);
}

const fullscreenController = {
  btn: document.querySelector("#fullscreenBtn"),
  loading: document.querySelector("#fullscreenLoading"),

  init() {
    this.btn.addEventListener("click", (e) => {
      this.loading.loading = !this.loading.loading;
      handleRemoveLoadingStatus(this.loading);
    });
  },
};
fullscreenController.init();

const fullscreenLockController = {
  btn: document.querySelector("#fullscreenLockBtn"),
  loading: document.querySelector("#fullscreenLockLoading"),

  init() {
    this.btn.addEventListener("click", (e) => {
      this.loading.loading = !this.loading.loading;
      handleRemoveLoadingStatus(this.loading);
    });
  },
};
fullscreenLockController.init();
```

:::

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

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明               |
| ------------ | ------------------ |
| container    | 外层容器           |
| mask-wrap    | 遮罩层             |
| icon         | 遮罩层内的加载图标 |
| content-wrap | 默认插槽的容器     |

## Slot

| name | 说明     |
| ---- | -------- |
| -    | 默认插槽 |
