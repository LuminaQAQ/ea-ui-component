---
name: CSS
description: 所有关于组件的css需要更新为对应要求时
---

## CSS样式开发规范提示词

### 任务概述

根据提供的组件JavaScript文件生成对应的SCSS样式文件。您需要先读取主题文件（variables.scss和namespace.scss），然后根据组件结构生成符合项目规范的样式代码。

### 准备工作

在开始生成样式之前，请执行以下步骤：

1. 读取 `src/themes/variables.scss` 以获取可用的颜色、间距、字体等设计变量
2. 读取 `src/themes/namespace.scss` 以了解BEM命名规范
3. 分析提供的组件JavaScript文件，如果包含子组件引用，请逐一读取这些子组件文件以完全理解组件结构

### 样式文件结构规范

生成的SCSS文件应遵循以下结构模式：

#### 1. 组件命名变量声明

```scss
$name: ea-component-name; // 根据实际组件名称替换
```

#### 2. 自定义属性定义块

在 `:host` 块中定义所有可能被用户自定义的样式值，格式为 `--#{$name}-属性描述`，如果是使用 [variables.scss](src/themes/variables.scss) 中存在的变量 如：

```scss
:host {
  --#{$name}-foo: var(--bar);
}
```

#### 3. 主机样式定义

```scss
:host {
  display: block; // 或其他适当的显示类型，按照组件实现也可以不添加这部分
}

:host([disabled]) {
  cursor: not-allow; // 或其他适当的显示类型，按照组件实现也可以不添加这部分
}
```

#### 4. BEM结构样式定义

使用mixins函数来定义BEM结构，但仅在block内部使用elements、modifiers和states的mixin函数，且不在elements、modifiers和states内使用elements、modifiers和states的mixin函数。例如：

```scss
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
    // 激活状态样式
    .#[$name]__content {
      color: var(--#{$name}-active-color);
    }
  }

  @include element(button) {
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

- 使用 `@include block($name)` 定义组件块
- 使用 `@include element(element-name)` 定义元素
- 使用 `@include modifier(modifier-name)` 定义修饰符
- 使用 `@include state(state-name)` 定义状态
- 仅在 `@include block($name)` 内部使用 elements、modifiers 和 states 的mixin函数，且不在elements、modifiers和states内使用elements、modifiers和states的mixin函数

### 注意事项

1. **变量化设计**：任何可能被用户自定义的样式属性都应提供CSS变量接口
2. **可访问性**：考虑颜色对比度、焦点状态等无障碍访问需求
3. **响应式设计**：如需要，在变量中考虑不同屏幕尺寸的适配
4. **性能优化**：合理使用CSS过渡和变换，避免复杂选择器
5. **兼容性**：确保使用的CSS特性在目标浏览器中得到支持

### 最佳实践

1. 保持样式模块化，每个组件独立
2. 使用CSS自定义属性提供主题定制能力
3. 合理组织样式层次，使用namespace.scss中定义的mixin函数
4. 使用CSS变量提高可维护性和一致性
5. 遵循组件化样式的单一职责原则

### BEM Mixin使用指南

- 仅在 `@include block()` 内部使用 `@include element()`、`@include modifier()` 和 `@include state()`
- 不要在 `@include element()`、`@include modifier()` 和 `@include state()` 内部使用elements、modifiers、states的mixin函数
- 如果需要在 `@include element()`、`@include modifier()` 和 `@include state()` 定义独立的选择器，使用完整的CSS选择器语法而非mixin

请根据具体的组件JavaScript文件分析其结构和功能，然后按照上述规范生成相应的SCSS样式文件。

---