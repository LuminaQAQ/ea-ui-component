/**
 * Roving Tabindex 管理器
 * 实现 WAI-ARIA 的 Roving Tabindex 模式，用于管理复合组件内的焦点导航
 *
 * @example
 * const roving = new RovingTabindex({
 *   orientation: 'horizontal',
 *   loop: true,
 *   onActivate: (index) => this._selectItem(index),
 * });
 * roving.setItems(items);
 *
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export class RovingTabindex {
  private _items: HTMLElement[] = [];
  private _currentIndex: number = 0;
  private _orientation: "horizontal" | "vertical" | "both";
  private _loop: boolean;
  private _onActivate?: (index: number) => void;
  private _onFocus?: (index: number) => void;

  constructor(options: {
    orientation?: "horizontal" | "vertical" | "both";
    loop?: boolean;
    onActivate?: (index: number) => void;
    onFocus?: (index: number) => void;
  }) {
    this._orientation = options.orientation ?? "horizontal";
    this._loop = options.loop ?? true;
    this._onActivate = options.onActivate;
    this._onFocus = options.onFocus;
  }

  setItems(items: HTMLElement[]): void {
    this._items = items;
    this._currentIndex = 0;
    this._updateTabindices();
  }

  handleKeydown(e: KeyboardEvent): void {
    if (this._items.length === 0) return;

    const key = e.key;
    let handled = false;

    switch (key) {
      case "ArrowRight":
        if (this._orientation === "horizontal" || this._orientation === "both") {
          handled = true;
          this._moveToNext();
        }
        break;
      case "ArrowLeft":
        if (this._orientation === "horizontal" || this._orientation === "both") {
          handled = true;
          this._moveToPrev();
        }
        break;
      case "ArrowDown":
        if (this._orientation === "vertical" || this._orientation === "both") {
          handled = true;
          this._moveToNext();
        }
        break;
      case "ArrowUp":
        if (this._orientation === "vertical" || this._orientation === "both") {
          handled = true;
          this._moveToPrev();
        }
        break;
      case "Home":
        handled = true;
        this._moveToFirst();
        break;
      case "End":
        handled = true;
        this._moveToLast();
        break;
      case "Enter":
      case " ":
        handled = true;
        this._onActivate?.(this._currentIndex);
        break;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  getCurrentIndex(): number {
    return this._currentIndex;
  }

  focusItem(index: number): void {
    if (index < 0 || index >= this._items.length) return;
    this._currentIndex = index;
    this._updateTabindices();
    this._items[index].focus();
    this._onFocus?.(index);
  }

  /** 更新当前索引和 tabindex，但不移动焦点 */
  setCurrentIndex(index: number): void {
    if (index < 0 || index >= this._items.length) return;
    this._currentIndex = index;
    this._updateTabindices();
  }

  destroy(): void {
    this._items = [];
  }

  private _moveToNext(): void {
    let next = this._currentIndex + 1;
    if (next >= this._items.length) {
      next = this._loop ? 0 : this._items.length - 1;
    }
    this.focusItem(next);
  }

  private _moveToPrev(): void {
    let prev = this._currentIndex - 1;
    if (prev < 0) {
      prev = this._loop ? this._items.length - 1 : 0;
    }
    this.focusItem(prev);
  }

  private _moveToFirst(): void {
    this.focusItem(0);
  }

  private _moveToLast(): void {
    this.focusItem(this._items.length - 1);
  }

  private _updateTabindices(): void {
    this._items.forEach((item, index) => {
      item.setAttribute("tabindex", index === this._currentIndex ? "0" : "-1");
    });
  }
}
