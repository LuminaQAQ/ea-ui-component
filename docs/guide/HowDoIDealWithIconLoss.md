# 如何处理图标丢失的问题

## 1. 图标未正确加载

[参考该文章](./customIconFontHref.md)

## 2. 资源被打包

在一些框架中，比如 vue，iconfont 资源会打包到 js 中，导致图标丢失。所以最好设置无需打包的文件。也可以直接[下载图标组件](./install.md#如何获取单独的图标组件)，然后参考 [自定义图标链接](./customIconFontHref.md)。

## 3. 使用了图标/带图标的属性, 但是没有在 `html` 通过 `link` 引入[参考该文章](./install.md#在原生环境引入)
