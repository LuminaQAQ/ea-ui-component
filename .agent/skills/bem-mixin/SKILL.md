---
name: "bem-mixin"
description: "BEM SCSS mixins for component styling. Invoke when writing or updating component SCSS styles using block/element/modifier/state mixins."
---

# BEM SCSS Mixin 规范

使用 SCSS mixin 定义组件的 BEM 样式结构。

## 导入方式

mixin 通过 `src/themes/namespace.scss` 全局引入，无需手动导入。

## Mixin 参考

### @include block($name)

定义组件块样式：

```scss
$name: ea-component;

@include block($name) {
  display: inline-flex;
  align-items: center;
}
```

### @include element(element-name)

定义元素样式，**仅在 `@include block()` 内部使用**：

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

### @include modifier(modifier-name)

定义修饰符样式，**仅在 `@include block()` 内部使用**：

```scss
@include block($name) {
  @include modifier(large) {
    font-size: var(--#{$name}-font-size-large);

    // 使用完整选择器覆盖子元素
    .#{$name}__item {
      padding: var(--spacing-lg);
    }
  }

  @include modifier(small) {
    --#{$name}-height: var(--#{$name}-height-small);
  }
}
```

### @include state(state-name)

定义状态样式，**仅在 `@include block()` 内部使用**：

```scss
@include block($name) {
  @include state(active) {
    background-color: var(--primary-color);

    // 使用完整选择器覆盖子元素
    .#{$name}__content {
      color: var(--color-white);
    }
  }

  @include state(disabled) {
    cursor: not-allowed;
    opacity: 0.6;

    .#{$name}__button {
      pointer-events: none;
    }
  }
}
```

## 核心规则

1. **仅在 `@include block($name)` 内部使用** element、modifier、state 的 mixin
2. **在 element、modifier、state 内部使用完整 CSS 选择器**而非 mixin
3. 状态样式内部需要覆盖子元素时，使用 `.#{$name}__element` 完整选择器

## 完整结构模板

```scss
$name: ea-component-name;

// 1. CSS Custom Properties
:host {
  --#{$name}-size: var(--spacing-md);
  --#{$name}-bg-color: var(--grey-100);
  --#{$name}-transition: var(--transition-fast);
}

// 2. Host 样式
:host {
  display: block;
}

:host([disabled]) {
  cursor: not-allowed;
}

// 3. BEM 结构
@include block($name) {
  display: inline-flex;
  align-items: center;

  @include element(item) {
    padding: var(--#{$name}-padding);
  }

  @include state(active) {
    background-color: var(--primary-color);

    .#{$name}__item {
      color: var(--color-white);
    }
  }

  @include modifier(small) {
    --#{$name}-size: var(--#{$name}-size-small);
  }

  @include modifier(large) {
    --#{$name}-size: var(--#{$name}-size-large);
  }
}
```

## 子组件样式覆盖

使用 `::part` 选择器修改子组件样式：

```scss
@include block($name) {
  @include element(trigger) {
    &::part(original) {
      display: none;
    }

    &::part(content) {
      background-color: var(--grey-800);
    }
  }
}
```

## 与 TypeScript BEM 配合

```typescript
// TypeScript
const bem = createBEM("ea-component");
bem({ size: "large" }); // -> .ea-component.ea-component--size-large
bem({}, { disabled: true }); // -> .ea-component.is-disabled
```

```scss
// SCSS
$name: ea-component;

@include block($name) {
  @include modifier(size-large) {
    // .ea-component--size-large
    // ...
  }
}

@include state(disabled) {
  // .is-disabled
  // ...
}
```
