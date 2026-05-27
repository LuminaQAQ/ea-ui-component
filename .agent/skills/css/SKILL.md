---
name: "CSS"
description: "Component CSS styling standards including variables, host styles, states, and responsive patterns. Invoke when creating or updating component SCSS files."
---

# CSS 样式开发规范

基于 ea-ui-component Web Components 组件库的统一样式标准。

## 样式文件结构

```scss
$name: ea-component-name;

// 1. CSS 自定义属性
:host {
  --#{$name}-height: 6px;
  --#{$name}-bg-color: var(--grey-200);
  --#{$name}-transition: var(--transition-fast);
}

// 2. Host 样式
:host {
  display: inline-block;
  width: 100%;
}

:host([disabled]) {
  cursor: not-allowed;
}

// 3. BEM 结构样式
@include block($name) {
  display: inline-flex;
  align-items: center;

  @include element(item) {
    padding: var(--#{$name}-padding);
  }

  @include modifier(large) {
    --#{$name}-height: var(--#{$name}-height-large);
  }

  @include state(active) {
    background-color: var(--primary-color);

    .#{$name}__content {
      color: var(--color-white);
    }
  }
}
```

## CSS 变量规范

### 变量命名规则

自定义变量必须以 `--#{$name}-` 开头：

```scss
:host {
  --#{$name}-height: 6px;
  --#{$name}-bg-color: var(--grey-100);
  --#{$name}-text-color: var(--grey-700);
  --#{$name}-border-color: var(--grey-300);
  --#{$name}-font-size: var(--font-size-md);
  --#{$name}-transition: var(--transition-normal);
  --#{$name}-z-index: 1;
}
```

### 尺寸变体变量

```scss
:host {
  --#{$name}-height: 6px;
  --#{$name}-height-small: 4px;
  --#{$name}-height-large: 8px;
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

1. **优先使用变量**：若在 `src/themes/variables.scss` 中存在的值，必须使用其对应的 CSS 变量
   - `var(--blue-500)` 而非 `#409eff`
   - `var(--spacing-md)` 而非 `8px`
   - `var(--font-size-lg)` 而非 `16px`

2. **避免嵌套变量**：不要创建引用其他组件变量的嵌套变量
   ```scss
   // 正确
   --#{$name}-bg-color: var(--grey-100);
   // 错误
   --#{$name}-item-bg: var(--#{$name}-bg-color);
   ```

3. **硬编码仅作为最后手段**：当不存在包含定义的变量时，才可以使用硬编码

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
}
```

### 禁用状态

```scss
@include block($name) {
  @include state(disabled) {
    .#{$name}__rail {
      background-color: var(--grey-100);
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

    &:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  }
}
```

## 响应式布局

```scss
@include block($name) {
  display: inline-flex;
  align-items: center;

  @include state(vertical) {
    flex-direction: column;
    height: 100%;
    width: auto;
  }
}
```

## 样式组织顺序

```scss
@include block($name) {
  // 1. 布局样式
  display: flex;
  position: relative;

  // 2. 盒模型样式
  width: 100%;
  padding: var(--spacing-md);

  // 3. 视觉样式
  background-color: var(--#{$name}-bg-color);
  border-radius: var(--border-radius-sm);

  // 4. 文字样式
  font-size: var(--#{$name}-font-size);
  color: var(--#{$name}-text-color);

  // 5. 其他样式
  transition: var(--#{$name}-transition);
  cursor: pointer;
}
```

## 常见陷阱

### 用 CSS 状态类替代 JS style 控制显隐

```scss
// 推荐：使用状态类
@include block(ea-drawer) {
  @include state(header-hidden) {
    .ea-drawer-main__header {
      display: none;
    }
  }
}
```

```typescript
// TypeScript 中通过 updateContainerClasslist 添加状态类
updateContainerClasslist(): string {
  const className = bem(
    { [this.direction]: true },
    { "header-hidden": !this.withHeader }
  );
}
```

## 参考文件

- [variables.scss](file:///e:/repo/ea-ui-component/src/themes/variables.scss) - 设计变量定义
- [namespace.scss](file:///e:/repo/ea-ui-component/src/themes/namespace.scss) - BEM mixin 定义
- [ea-alert/index.scss](file:///e:/repo/ea-ui-component/src/components/ea-alert/index.scss) - 完整示例
