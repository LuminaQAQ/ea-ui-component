# 重构中，当前分支非文档主分支

- 组件主要更新分支暂时独立于 [package_2.0 分支](https://github.com/LuminaQAQ/ea-ui-component/tree/package_dev2.0)

## 已知问题

- [ ] layout 组件中，col 未设置 span 时，span 为 24。不会按照 slot 的 col 平分。
- [ ] Overlay 的根元素层级过低，导致 vitepress 的层级显示错误。
- [ ] Button 的 loading 因为当时更新了图标库，导致 loading 图标有问题
- [ ] Avatar 加载失败时，若 Fallback 为字符串，会出现的文字样式错误的问题。加上 white-space: nowrap; 即可。
- [ ] Overlay 组件的 :root 的 z-index 值未设置，导致可能出现的层级问题。
