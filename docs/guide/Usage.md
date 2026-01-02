# 使用

## 注册

与传统框架不同，自定义元素没有集中式的初始化阶段。这意味着在尝试与其属性或方法交互之前，您需要验证自定义元素是否已正确注册。

::: tip
特别的，当与其属性或方法交互时，元素未进行相应更新。可以通过确认这点来排查问题。
:::

```js
await customElements.whenDefined("ea-button");

const button = document.querySelector("ea-button");
```
