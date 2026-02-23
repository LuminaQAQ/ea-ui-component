---
trigger: glob
glob: src/components/*.scss
---

## CSS样式开发规范提示词

### 任务概述

根据提供的组件JavaScript文件生成对应的SCSS样式文件。您需要先读取主题文件（variables.scss和namespace.scss），然后根据组件结构生成符合项目规范的样式代码。

### 准备工作

1. 读取 `src/themes/variables.scss` 获取设计变量
2. 读取 `src/themes/namespace.scss` 了解BEM命名规范
3. 分析组件JavaScript文件理解组件结构

### 样式文件结构

```scss
// 1. 组件命名变量
$name: ea-component-name;

// 2. CSS自定义属性（可选）
:host {
  --#{$name}-size: var(--spacing-md);
  --#{$name}-bg-color: var(--grey-100);
}

// 3. Host样式
:host {
  display: block; // 或其他适当的显示类型，按照组件实现也可以不添加这部分
}

:host([disabled]) {
  cursor: not-allowed; // 或其他适当的显示类型，按照组件实现也可以不添加这部分
}

// 4. BEM结构
@include block($name) {
  // 组件根元素样式
  foo: var(--#{$name}-bar);

  @include element(foo) {
    foo: var(--#{$name}-bar);
  }

  @include modifier(large) {
    // 大尺寸样式
    font-size: var(--#{$name}-font-size-large);
  }

  @include state(active) {
    .#{$name}__item {
      // 子元素覆盖
    }
  }

  @include element(button) {
    --#{$name}-size: var(--spacing-sm);
    transition: var(--#{$name}-transition);

    &:hover {
      background-color: var(--#{$name}-bg-color-hover);
    }
  }
}
```

### 设计变量使用原则

1. **优先使用变量**：若在 [variables.scss](src/themes/variables.scss) 中存在的颜色、尺寸、间距等值，必须使用其对应的CSS变量，例如：
   - 使用 `var(--blue-500)` 而不是硬编码 `#409eff`
   - 使用 `var(--spacing-md)` 而不是硬编码 `8px`
   - 使用 `var(--font-size-lg)` 而不是硬编码 `16px`

2. **变量命名规范**：自定义变量必须以 `--#{$name}-` 开头，后跟有意义的描述性名称

### BEM命名规范

- **block**: `@include block($name)` - 组件根容器
- **element**: `@include element(name)` - 子元素
- **modifier**: `@include modifier(name)` - 尺寸/类型变体
- **state**: `@include state(name)` - 状态类

**重要规则**:

- 仅在 `block` 内部使用 `element/modifier/state` mixin
- 在 `element/modifier/state` 内部使用完整CSS选择器（如 `.#{$name}__item`）

### 设计变量使用

1. **优先使用变量**：使用 `var(--blue-500)` 而非 `#409eff`
2. **自定义变量命名**：`--#{$name}-属性名`
3. **尺寸变体**：通过CSS变量切换

```scss
@include modifier(small) {
  --#{$name}-size: var(--#{$name}-size-small);
}
```

### 子组件样式覆盖

```scss
@include element(trigger) {
  &::part(original) {
    display: none;
  }
}
```

### BEM Mixin使用指南

- 仅在 `@include block()` 内部使用 `@include element()`、`@include modifier()` 和 `@include state()`
- 不要在 `@include element()`、`@include modifier()` 和 `@include state()` 内部使用elements、modifiers、states的mixin函数
- 如果需要在 `@include element()`、`@include modifier()` 和 `@include state()` 定义独立的选择器，使用完整的CSS选择器语法而非mixin

### 注意事项

1. 提供CSS变量接口供用户自定义
2. 在state内部使用完整选择器覆盖子元素
3. 使用 `pointer-events: none` 控制交互
4. 遵循单一职责原则
5. 保持样式模块化，每个组件独立
6. 使用CSS自定义属性提供主题定制能力
7. 合理组织样式层次，使用namespace.scss中定义的mixin函数
8. 使用CSS变量提高可维护性和一致性
9. 遵循组件化样式的单一职责原则
