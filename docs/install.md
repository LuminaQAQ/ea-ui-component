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

需要到 `/node_modules` 中找到 `easy-component-ui` 的目录, 然后将这个文件移至项目的`根目录下`.

> 注意: 因特殊原因, 该文件夹必须放在项目的根目录下

```txt
├─easy-component-ui
│ ├─icon
│ │ ├─config.json
│ │ ├─css
│ │ ├─font
│ │ └─index.css
│ ├─index.js
├─css
├─js
└─index.html
```

```html
<link rel="stylesheet" href="./easy-component-ui/icon/index.css" />
<script type="module">
  import "./easy-component-ui/index.js";
</script>
```
