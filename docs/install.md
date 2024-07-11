---
outline: deep
---

# 安装

## npm 安装

```bash
npm init -y

npm i easy-component-ui
```

## 在原生环境引入

这里的路径是 `node_modules` 目录下的 `easy-component-ui` 目录, 即默认下载路径.

> `css`: 特别的, 如果项目中会使用到带有图标的 `属性/组件`, 需要使用 `link` 标签引入图标文件

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

> `js`: 相应组件的引入, 请看对应组件的文档. 格式通常如下:

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-button/index.js";
<script>
```
