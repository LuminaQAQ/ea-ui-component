---
"@easy-component-ui/core": major
---

属性声明统一到一张元数据表：

- 新增 `static properties` 声明方式，不使用装饰器也能配置属性
- `@attribute` 与 `@property` 写入同一张表，由 `attribute` 字段区分是否观察 HTML attribute
- `@property` 可用 `attribute: true` 或指定 attribute 名进入观察列表
- `observedAttributes` 只登记小写连字符名，不再重复生成驼峰条目
- 包根导出 `PropertyDecl` / `ClassMeta` 类型

BREAKING CHANGE: 移除子路径 `@easy-component-ui/core/stores/element-attributes` 与 `@easy-component-ui/core/stores/element-properties`，两张 WeakMap 已废弃。
