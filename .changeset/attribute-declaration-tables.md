---
"@easy-component-ui/core": major
---

属性声明拆为 `static attributes` 与 `static properties` 两张表，`default` 改为可选：

- `@attribute` 写入 attributes 表、`@property` 写入 properties 表，不再用 `attribute` 三态标记区分归属
- 新增 `name` 选项指定映射的 attribute 名，取代原先的 `attribute: "xxx"`
- 同一个类内同名不得同时出现在两张表，冲突在类定义期直接抛错
- 子类可用任意一张表覆盖父类的任意一张表；`属性名: false` 仍表示从继承中移除
- `ClassMeta.props` 的每条记录改为 `{ decl, attributeName }`，`attributeName` 是归一化后的小写连字符名，不映射 HTML 时为 `null`
- `default` 降为可选覆盖：省略时取该字段的初值（构造期按类推断一次，不写回 `decl`、也不写到宿主 attribute 上）
- 新增 `AttributeDecl` / `PropMeta` 类型导出

BREAKING CHANGE: `AttributeOptions.attribute` 与 `PropertyOptions.attribute` 已移除，
`ClassMeta.props` 的取值类型由 `PropertyDecl` 变为 `PropMeta`。迁移方式：

- `@attribute({ attribute: "data-x" })` → `@attribute({ name: "data-x" })`
- `@property({ attribute: "data-x" })` → 改用 `@attribute`（或写进 `static attributes`）
- `@attribute({ attribute: false })` → 改用 `@property`
- `@property({ attribute: true })` → 改用 `@attribute`
- 读取元数据时 `meta.props.get(name)` 改为 `meta.props.get(name)?.decl`
