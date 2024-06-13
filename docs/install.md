---
outline: deep
---

# 安装

## npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```bash
npm init -y

npm i easy-component-ui
```

## 在原生环境引入

如果是在原生环境引入, 且要放置在指定目录中，则需要到 `/node_modules` 中找到 `easy-component-ui` 的目录.

```html
<!-- 以下路径要按使用项目的路径来修改 -->

<link rel="stylesheet" href="easy-component-ui/dist/index.css" />
<script type="module">
  import "easy-component-ui";
</script>
```
