---
"@easy-component-ui/core": minor
---

属性值契约与表单基类调整：

- 移除属性时 observer 照常调用，值为默认值（未设默认则为 `null`）；`previous` 不再套默认值，首次为 `null`
- 新增 `@attribute` 的 `forward` 选项，把属性值转发到宿主或内部元素；`a11y` 复用同一实现
- `Number` / `Date` / `Array` / `RegExp` 类型下空串按“未设置”处理
- 删除从未生效的 `PropertyOptions.rawFunction` 与 `repeatable`
- `form` / `validity` / `validationMessage` / `willValidate` 改为读取 `internals` 的 getter，禁用时 `willValidate` 为 `false`
- 表单断开后恢复 `noValidate`；提交校验覆盖外置控件；`formResetCallback` 回到首次连接时的值
- `ea-carousel` 的 `ea-change.prev` 保持 `number`
