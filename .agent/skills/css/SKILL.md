---
name: CSS
description: 所有关于组件的css需要更新为对应要求时
---

# CSS 样式开发规范

基于 ea-ui-component Web Components 组件库的开发特性制定的统一样式标准。

## 样式文件结构

### 完整结构模板

```scss
// 1. 组件命名变量
$name: ea-component-name;

// 2. CSS 自定义属性定义（可选）
:host {
  // 尺寸变量
  --#{$name}-size: var(--spacing-md);
  --#{$name}-size-small: var(--spacing-sm);
  --#{$name}-size-large: var(--spacing-lg);

  // 颜色变量
  --#{$name}-bg-color: var(--grey-100);
  --#{$name}-text-color: var(--grey-700);

  // 其他变量
  --#{$name}-transition: var(--transition-fast);
}

// 3. Host 样式
:host {
  display: block;
}

:host([disabled]) {
  cursor: not-allowed;
}

// 4. BEM 结构样式
@include block($name) {
  // 基础样式

  @include element(item) {
    // 元素样式
  }

  // State 定义
  @include state(active) {
    .#{$name}__item {
      // 子元素覆盖
    }
  }

  @include state(disabled) {
    .#{$name}__item {
      pointer-events: none;
    }
  }

  // Modifier 定义（可选）
  @include modifier(small) {
    --#{$name}-size: var(--#{$name}-size-small);
  }

  @include modifier(large) {
    --#{$name}-size: var(--#{$name}-size-large);
  }
}
```

### 结构说明

1. **命名变量**：`$name` 定义组件名，用于 BEM 命名
2. **CSS 变量**：在 `:host` 中定义可自定义属性，使用 `--#{$name}-` 前缀
3. **Host 样式**：控制组件根元素显示类型和属性选择器样式
4. **BEM 结构**：
   - `block`：组件根容器
   - `element`：子元素（如 `item`, `content`, `icon`）
   - `state`：状态类（如 `active`, `disabled`, `vertical`），内部使用完整选择器覆盖子元素
   - `modifier`：尺寸/类型变体（如 `small`, `large`），通过 CSS 变量切换

---

## BEM 命名规范

### 基本规则

- 使用 `@include block($name)` 定义组件块
- 使用 `@include element(element-name)` 定义元素
- 使用 `@include modifier(modifier-name)` 定义修饰符
- 使用 `@include state(state-name)` 定义状态
- **仅在 `@include block($name)` 内部使用 elements、modifiers 和 states 的 mixin 函数**
- **在 `@include element()`、`@include modifier()` 和 `@include state()` 内部使用完整 CSS 选择器而非 mixin**

### Block 定义

```scss
@include block($name) {
  // 组件根元素样式
  font-size: var(--#{$name}-font-size);
}
```

### Element 定义

```scss
@include block($name) {
  @include element(item) {
    padding: var(--#{$name}-padding);
  }

  @include element(button) {
    transition: var(--#{$name}-transition);

    &:hover {
      background-color: var(--#{$name}-bg-color-hover);
    }

    // 在 element 内部使用完整选择器
    .#{$name}__icon {
      margin-right: var(--spacing-xs);
    }
  }
}
```

### Modifier 定义

```scss
@include block($name) {
  @include modifier(large) {
    font-size: var(--#{$name}-font-size-large);

    // 使用完整选择器覆盖子元素
    .#{$name}__item {
      padding: var(--spacing-lg);
    }
  }

  @include modifier(card) {
    border: 1px solid var(--grey-300);
    border-radius: var(--border-radius-md);
  }
}
```

### State 定义

```scss
@include block($name) {
  @include state(active) {
    background-color: var(--primary-color);

    // 使用完整选择器覆盖子元素
    .#{$name}__content {
      color: var(--color-white);
    }

    .#{$name}__icon {
      transform: rotate(180deg);
    }
  }

  @include state(disabled) {
    cursor: not-allowed;
    opacity: 0.6;

    .#{$name}__button {
      pointer-events: none;
    }
  }

  @include state(vertical) {
    flex-direction: column;

    .#{$name}__item {
      width: 100%;
    }
  }
}
```

---

## CSS 变量规范

### 变量命名规则

自定义变量必须以 `--#{$name}-` 开头，后跟有意义的描述性名称：

```scss
:host {
  // 尺寸变量
  --#{$name}-height: 6px;
  --#{$name}-width: 100%;
  --#{$name}-padding: var(--spacing-md);

  // 颜色变量
  --#{$name}-bg-color: var(--grey-100);
  --#{$name}-bg-color-hover: var(--grey-200);
  --#{$name}-text-color: var(--grey-700);
  --#{$name}-border-color: var(--grey-300);

  // 字体变量
  --#{$name}-font-size: var(--font-size-md);
  --#{$name}-font-weight: var(--font-weight-normal);

  // 动画变量
  --#{$name}-transition: var(--transition-normal);
  --#{$name}-transition-duration: 0.3s;

  // 层级变量
  --#{$name}-z-index: 1;
}
```

### 尺寸变体变量

```scss
:host {
  // 基础尺寸
  --#{$name}-height: 6px;
  --#{$name}-height-small: 4px;
  --#{$name}-height-large: 8px;

  // 元素尺寸
  --#{$name}-thumb-size: 16px;
  --#{$name}-thumb-size-small: 12px;
  --#{$name}-thumb-size-large: 20px;
}

@include block($name) {
  @include modifier(small) {
    --#{$name}-height: var(--#{$name}-height-small);
    --#{$name}-thumb-size: var(--#{$name}-thumb-size-small);
  }

  @include modifier(large) {
    --#{$name}-height: var(--#{$name}-height-large);
    --#{$name}-thumb-size: var(--#{$name}-thumb-size-large);
  }
}
```

### 设计变量使用原则

1. **优先使用变量**：若在 `src/themes/variables.scss` 中存在的颜色、尺寸、间距等值，必须使用其对应的 CSS 变量
   - 使用 `var(--blue-500)` 而不是硬编码 `#409eff`
   - 使用 `var(--spacing-md)` 而不是硬编码 `8px`
   - 使用 `var(--font-size-lg)` 而不是硬编码 `16px`

2. **变量引用规范**：

   ```scss
   // 正确
   --#{$name}-rail-bg-color: var(--grey-200);
   --#{$name}-thumb-border-color: var(--blue-300);

   // 错误
   --#{$name}-rail-bg-color: #e0e0e0;
   --#{$name}-thumb-border-color: #66b1ff;
   ```

---

## 子组件样式覆盖

### 使用 ::part 选择器

当需要在父组件中修改子组件的样式时，使用 `::part` 选择器：

```scss
@include block($name) {
  @include element(trigger) {
    // 修改子组件的 part
    &::part(original) {
      display: none;
    }

    &::part(content) {
      background-color: var(--grey-800);
      color: var(--color-white);
    }
  }

  @include state(show-tooltip) {
    .#{$name}__trigger::part(original) {
      display: block;
    }
  }
}
```

### 使用 CSS 变量传递

```scss
@include block($name) {
  @include element(trigger) {
    // 为子组件设置 CSS 变量
    --ea-popper-width: auto;
    --ea-tooltip-bg-color: var(--grey-800);
  }
}
```

---

## 响应式布局

### 水平/垂直模式

```scss
@include block($name) {
  // 水平模式（默认）
  display: inline-flex;
  align-items: center;

  @include element(item) {
    flex-direction: row;
  }

  // 垂直模式
  @include state(vertical) {
    flex-direction: column;
    height: 100%;
    width: auto;

    .#{$name}__runway {
      height: 100%;
      width: auto;
    }

    .#{$name}__rail {
      width: var(--#{$name}-height);
      height: 100%;
    }

    .#{$name}__trigger {
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
```

### 定位调整

```scss
@include block($name) {
  @include state(vertical) {
    .#{$name}__mark {
      top: auto;
      left: 50%;
      transform: translateY(-50%);
      flex-direction: row;
      margin-top: 0;
      margin-left: calc(var(--#{$name}-thumb-size) / 2);
    }

    .#{$name}__mark-label {
      margin-top: 0;
      margin-left: var(--spacing-xs);
      text-align: left;
    }
  }
}
```

---

## 状态样式

### 显示/隐藏状态

```scss
@include block($name) {
  @include element(stop) {
    display: none;
  }

  @include state(show-stops) {
    .#{$name}__stop {
      display: block;
    }
  }

  @include state(show-input) {
    .#{$name}__input {
      display: inline-block;
    }
  }
}
```

### 禁用状态

```scss
@include block($name) {
  @include state(disabled) {
    .#{$name}__rail {
      background-color: var(--grey-100);
    }

    .#{$name}__thumb {
      cursor: not-allowed;
      border-color: var(--grey-300);
    }
  }
}

:host([disabled]) {
  cursor: not-allowed;
}
```

### 交互状态

```scss
@include block($name) {
  @include element(button) {
    transition: var(--#{$name}-transition);

    &:hover {
      background-color: var(--#{$name}-bg-color-hover);
    }

    &:active {
      background-color: var(--#{$name}-bg-color-active);
    }
  }

  @include element(trigger) {
    transition: transform var(--#{$name}-transition);

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
}
```

---

## 最佳实践

### 1. 保持样式模块化

每个组件独立管理自己的样式，不依赖外部样式：

```scss
// 正确
@include block($name) {
  padding: var(--#{$name}-padding);
}

// 错误
@include block($name) {
  padding: 8px; // 硬编码
}
```

### 2. 使用 CSS 变量提供主题定制

```scss
:host {
  --#{$name}-primary-color: var(--blue-500);
  --#{$name}-success-color: var(--green-500);
  --#{$name}-warning-color: var(--yellow-500);
  --#{$name}-danger-color: var(--red-500);
}
```

### 3. 合理组织样式层次

```scss
@include block($name) {
  // 1. 布局样式
  display: flex;
  position: relative;

  // 2. 盒模型样式
  width: 100%;
  padding: var(--spacing-md);
  margin: 0;

  // 3. 视觉样式
  background-color: var(--#{$name}-bg-color);
  border: 1px solid var(--#{$name}-border-color);
  border-radius: var(--border-radius-sm);

  // 4. 文字样式
  font-size: var(--#{$name}-font-size);
  color: var(--#{$name}-text-color);

  // 5. 其他样式
  transition: var(--#{$name}-transition);
  cursor: pointer;
}
```

### 4. 避免复杂选择器

```scss
// 正确
.#{$name}__item {
  // ...
}

// 错误
.#{$name}__container > .#{$name}__list > .#{$name}__item {
  // ...
}
```

### 5. 考虑无障碍访问

```scss
@include block($name) {
  @include element(button) {
    // 焦点状态
    &:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    // 颜色对比度
    color: var(--grey-700);
    background-color: var(--grey-100);
  }
}
```

### 6. 使用 pointer-events 控制交互

```scss
@include block($name) {
  @include element(marks) {
    // 让 marks 不拦截鼠标事件
    pointer-events: none;
  }
}
```

---

## CSS 变量使用规范

### 变量命名层级

CSS 变量应遵循以下层级关系，避免嵌套引用：

```scss
// 正确：直接引用基础变量
:host {
  --#{$name}-bg-color: var(--grey-100);
  --#{$name}-text-color: var(--grey-700);
  --#{$name}-primary-color: var(--blue-500);
}

// 错误：避免嵌套变量引用
:host {
  --#{$name}-item-bg: var(--#{$name}-bg-color); // 不要这样嵌套
}
```

### 变量定义位置

组件级变量应在 `:host` 选择器中定义：

```scss
:host {
  // 尺寸变量
  --#{$name}-height: 32px;
  --#{$name}-height-small: 24px;
  --#{$name}-height-large: 40px;

  // 颜色变量
  --#{$name}-bg-color: var(--grey-100);
  --#{$name}-bg-color-hover: var(--grey-200);
  --#{$name}-text-color: var(--grey-700);

  // 其他变量
  --#{$name}-border-radius: var(--border-radius-sm);
  --#{$name}-transition: var(--transition-fast);
}
```

### 尺寸变体实现

使用 CSS 变量切换尺寸变体：

```scss
:host {
  --#{$name}-height: 32px;
  --#{$name}-height-small: 24px;
  --#{$name}-height-large: 40px;
}

@include block($name) {
  height: var(--#{$name}-height);

  @include modifier(small) {
    --#{$name}-height: var(--#{$name}-height-small);
  }

  @include modifier(large) {
    --#{$name}-height: var(--#{$name}-height-large);
  }
}
```

### 设计变量使用原则

1. **优先使用基础变量**：
   - 使用 `var(--blue-500)` 而不是硬编码 `#409eff`
   - 使用 `var(--grey-200)` 而不是硬编码 `#e0e0e0`
   - 使用 `var(--spacing-md)` 而不是硬编码 `8px`

2. **组件变量命名**：
   - 必须以 `--#{$name}-` 开头
   - 使用有意义的描述性名称
   - 避免缩写，保持可读性

3. **变量引用规范**：

   ```scss
   // 正确
   --#{$name}-rail-bg-color: var(--grey-200);
   --#{$name}-thumb-border-color: var(--blue-300);

   // 错误
   --#{$name}-rail-bg-color: #e0e0e0; // 硬编码。当不存在包含定义的变量时，才可以使用硬编码。
   ```

---

## 注意事项

1. **变量化设计**：任何可能被用户自定义的样式属性都应提供 CSS 变量接口
2. **可访问性**：考虑颜色对比度、焦点状态等无障碍访问需求
3. **响应式设计**：如需要，在变量中考虑不同屏幕尺寸的适配
4. **性能优化**：合理使用 CSS 过渡和变换，避免复杂选择器
5. **兼容性**：确保使用的 CSS 特性在目标浏览器中得到支持
6. **BEM 规范**：严格遵循 BEM 命名规范，保持代码一致性
7. **避免嵌套变量**：不要创建引用其他组件变量的嵌套变量

---

## 参考文件

- [variables.scss](file:///e:/repo/ea-ui-component/src/themes/variables.scss) - 设计变量定义
- [namespace.scss](file:///e:/repo/ea-ui-component/src/themes/namespace.scss) - BEM mixin 定义
- [ea-slider/index.scss](file:///e:/repo/ea-ui-component/src/components/ea-slider/index.scss) - 完整示例
