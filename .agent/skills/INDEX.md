# 技能模块索引

> **版本**: 3.7.0 | **最后更新**: 2026-06-04
> 共 17 个原子化技能模块，覆盖组件开发全流程

## 按开发阶段分类

### 🏗️ 组件创建

| 技能 | 名称 | 触发场景 |
|------|------|---------|
| `custom-element` | @CustomElement 装饰器 | 创建新组件、修改组件注册选项、添加组件 JSDoc 注释 |
| `lifecycle` | 生命周期方法 | 实现组件生命周期钩子 |
| `form-base` | 表单关联基类 | 创建表单组件（input/select/checkbox 等） |

### 🎨 属性定义

| 技能 | 名称 | 触发场景 |
|------|------|---------|
| `attribute` | @attribute 装饰器 | 定义映射 HTML attribute 的属性，含 `a11y` 无障碍属性同步 |
| `property` | @property 装饰器 | 定义纯 JS 属性（不映射 HTML attribute），含 `a11y` 无障碍属性同步 |
| `variant` | Variant 类型系统 | 定义组件视觉变体属性 |

### 🔍 DOM 与事件

| 技能 | 名称 | 触发场景 |
|------|------|---------|
| `query` | @query / @queryAll 装饰器 | 访问 Shadow DOM 元素 |
| `children` | @children 装饰器 | 访问 Light DOM 子元素 |
| `listen` | @listen 装饰器 | 绑定事件监听 |
| `event` | 事件系统 | 创建或更新组件事件 |

### 🎭 样式

| 技能 | 名称 | 触发场景 |
|------|------|---------|
| `bem` | BEM 类名生成（TS） | 在 TypeScript 中生成 BEM 类名 |
| `bem-mixin` | BEM SCSS Mixin | 编写组件 SCSS 样式 |
| `CSS` | CSS 样式规范 | 创建或更新组件 SCSS 文件 |

### 🛡️ 安全与类型

| 技能 | 名称 | 触发场景 |
|------|------|---------|
| `html-safe` | HTML 安全处理 | 插入 HTML 内容或调试 DOMPurify 问题 |
| `type-declaration` | 类型声明文件 | 创建或更新组件类型声明 |

### 📝 文档与测试

| 技能 | 名称 | 触发场景 |
|------|------|---------|
| `DOC` | 文档生成 | 编写或更新组件文档 |
| `test` | 测试开发 | 编写或更新组件测试文件 |

## 按技术组件分类

### 装饰器

| 装饰器 | 技能模块 | 说明 |
|--------|---------|------|
| `@CustomElement` | `custom-element` | 注册自定义元素 |
| `@attribute` | `attribute` | HTML attribute 映射属性，含 `a11y` 无障碍同步 |
| `@property` | `property` | 纯 JS 属性，含 `a11y` 无障碍同步 |
| `@query` | `query` | 查询单个 DOM 元素 |
| `@queryAll` | `query` | 查询多个 DOM 元素 |
| `@children` | `children` | 查询 Light DOM 子元素 |
| `@listen` | `listen` | 事件监听绑定 |

### 工具函数

| 工具 | 技能模块 | 路径 |
|------|---------|------|
| `createBEM()` | `bem` | `@utils/bem` |
| `html()` | `html-safe` | `@utils/html` |
| `Enum()` | `variant` | `@utils/Enum` |
| `VARIANT_TYPES` | `variant` | `@constants/variant` |

### 基类

| 基类 | 技能模块 | 路径 |
|------|---------|------|
| `EaBase` | `lifecycle` | `@core/EaBase` |
| `EaFormAssociatedBase` | `form-base` | `@core/EaFormAssociatedBase` |

## 使用说明

1. 每个技能模块功能单一、职责明确
2. 技能之间可组合使用（如 `attribute` + `bem` + `CSS` 完成属性样式联动）
3. 规则文件（Project.md）提供高层规范，技能模块提供详细操作指南
4. 修改组件时，根据涉及的装饰器/工具自动触发对应技能
