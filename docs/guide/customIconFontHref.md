# 改变图标链接

::: tip
该组件默认的图标文件链接为：`https://cdn.jsdelivr.net/npm/easy-component-ui/components/ea-icon/css/animation.min.css`。但在文档编写期间，该 `CDN` 已经报错 N 次了。所以更推荐自定义一个图标文件链接。同时也不建议在正式环境中使用。
:::

## 在 原生 项目中使用

在组件目录中带有一个 `globalConfig.js` 文件，该文件为图标链接的配置文件。使用 `setConfig` 方法，传入一个对象，该对象中包含一个 `fontelloCSS` 属性，值为图标链接。

```html
<script type="module">
  import { setConfig } from "./node_modules/easy-component-ui/components/globalConfig.js";
  setConfig({
    fontelloCSS: new URL(
      "./node_modules/easy-component-ui/components/ea-icon/index.css",
      import.meta.url
    ).href,
  });
</script>
```

## 在 Vue 项目中使用

基本使用方法同上个例子。唯一不同的是，在 `Vue` 项目中，偶发即便在 `onMounted/mounted` 函数中使用 `WebComponent` ，还会出现未完全初始化的情况。所以需要在 `document` 元素上添加 `ea-icon-ready` 的事件监听，在此内进行链接设置。

```vue
<script setup>
import { onMounted } from "vue";

import { setConfig } from "../components/globalConfig.js";

onMounted(() => {
  import("../components/ea-icon/index.js");

  document.addEventListener("ea-icon-ready", () => {
    setConfig({
      fontelloCSS: new URL("your/path/fontello.css", import.meta.url).href,
    });
  });
});
</script>
```
