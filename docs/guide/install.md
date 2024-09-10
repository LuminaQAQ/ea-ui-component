---
outline: deep
---

# 安装

## npm 安装

```bash
npm init -y

npm i easy-component-ui
```

## 在线引入

> `js`: 相应组件的引入, 需考虑修改`/components/ea-button/index.js`部分.

```html
<script type="module">
  import "https://unpkg.com/easy-component-ui@1.0.3/components/ea-button/index.js";
<script>
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

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-button/index.js";
<script>
```

## 如何获取单独的图标组件

> 1.  [npm 安装](#npm-安装)
> 2.  [jsdelivr](https://www.jsdelivr.com/package/npm/easy-component-ui?tab=files)
> 3.  [github 发布页](https://github.com/LuminaQAQ/ea-ui-component/releases)

:::tip
以下为文件目录结构。其中：

- 不在 `build` 目录下的`components`和`utils`，为未进行压缩源文件。
- 在 `build` 目录下的`components`和`utils`，为压缩后的文件。

> 因为先写的文档后发的包, 虽然不规范, 暂时先这样吧。

:::

```txt
├─.gitignore
├─build
│ ├─components
│ │ ├─Base.js
│ │ ├─ea-icon
│ │ │ ├─config.json
│ │ │ ├─css
│ │ │ │ └─fontello.css
│ │ │ ├─font
│ │ │ │ ├─fontello.eot
│ │ │ │ ├─fontello.svg
│ │ │ │ ├─fontello.ttf
│ │ │ │ ├─fontello.woff
│ │ │ │ └─fontello.woff2
│ │ │ ├─index.css
│ │ │ └─index.js
│ │ ├─globalConfig.js
│ │ └─index.js
│ └─utils
│   ├─createElement.js
│   ├─handleDefaultAttrIsTrue.js
│   ├─handleTemplate.js
│   ├─setStyle.js
│   ├─timeout.js
│   └─Validator.js
├─components
│ ├─Base.js
│ ├─ea-icon
│ │ ├─config.json
│ │ ├─css
│ │ │ └─fontello.css
│ │ ├─font
│ │ │ ├─fontello.eot
│ │ │ ├─fontello.svg
│ │ │ ├─fontello.ttf
│ │ │ ├─fontello.woff
│ │ │ └─fontello.woff2
│ │ ├─index.css
│ │ └─index.js
│ ├─globalConfig.js
│ └─index.js
│ ├─ea-ui-base-style.css
│ ├─ea-ui-base-style.scss
│ ├─globalConfig.js
│ └─index.js
├─LICENSE
├─package.json
└─utils
```
