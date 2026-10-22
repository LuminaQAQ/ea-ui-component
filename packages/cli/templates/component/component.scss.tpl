$name: ___TAG_NAME___;

:host {
  --#{$name}-border-radius: var(--border-radius-sm);
  --#{$name}-font-size: var(--font-size-md);
  --#{$name}-transition: var(--transition-fast);

  display: block;
}

@include block(#{$name}) {
  box-sizing: border-box;

  @include element(content) {
    // TODO: 元素样式
  }

  @include modifier(primary) {
    // TODO: 修饰符样式
  }

  @include state(active) {
    // TODO: 状态样式
  }
}
