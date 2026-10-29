import { afterEach, describe, expect, it, vi } from "vitest";
import { RovingTabindex } from "@utils/roving-tabindex";

const mountItems = (count: number): HTMLButtonElement[] => {
  const items = Array.from({ length: count }, (_, index) => {
    const el = document.createElement("button");
    el.textContent = String(index);
    document.body.append(el);
    return el;
  });
  return items;
};

const keydown = (key: string): KeyboardEvent =>
  new KeyboardEvent("keydown", { key, cancelable: true, bubbles: true });

afterEach(() => {
  document.body.innerHTML = "";
});

describe("RovingTabindex", () => {
  it("setItems 只让当前项 tabindex=0", () => {
    const items = mountItems(3);
    const roving = new RovingTabindex({});
    roving.setItems(items);

    expect(items.map(item => item.getAttribute("tabindex"))).toEqual([
      "0",
      "-1",
      "-1",
    ]);
    expect(roving.getCurrentIndex()).toBe(0);
  });

  it("方向键在水平方向上移动焦点并阻止默认行为", () => {
    const items = mountItems(3);
    const roving = new RovingTabindex({});
    roving.setItems(items);

    const event = keydown("ArrowRight");
    roving.handleKeydown(event);

    expect(roving.getCurrentIndex()).toBe(1);
    expect(items[1].getAttribute("tabindex")).toBe("0");
    expect(document.activeElement).toBe(items[1]);
    expect(event.defaultPrevented).toBe(true);
  });

  it("水平方向忽略垂直方向键", () => {
    const items = mountItems(3);
    const roving = new RovingTabindex({});
    roving.setItems(items);

    const event = keydown("ArrowDown");
    roving.handleKeydown(event);

    expect(roving.getCurrentIndex()).toBe(0);
    expect(event.defaultPrevented).toBe(false);
  });

  it("vertical / both 方向支持上下键", () => {
    const items = mountItems(3);
    const vertical = new RovingTabindex({ orientation: "vertical" });
    vertical.setItems(items);
    vertical.handleKeydown(keydown("ArrowDown"));
    expect(vertical.getCurrentIndex()).toBe(1);

    const both = new RovingTabindex({ orientation: "both" });
    both.setItems(items);
    both.handleKeydown(keydown("ArrowRight"));
    expect(both.getCurrentIndex()).toBe(1);
  });

  it("loop=true 时首尾循环，loop=false 时停在边界", () => {
    const items = mountItems(3);

    const looping = new RovingTabindex({ loop: true });
    looping.setItems(items);
    looping.setCurrentIndex(2);
    looping.handleKeydown(keydown("ArrowRight"));
    expect(looping.getCurrentIndex()).toBe(0);

    const bounded = new RovingTabindex({ loop: false });
    bounded.setItems(items);
    bounded.setCurrentIndex(2);
    bounded.handleKeydown(keydown("ArrowRight"));
    expect(bounded.getCurrentIndex()).toBe(2);
  });

  it("Home / End 跳到首尾", () => {
    const items = mountItems(3);
    const roving = new RovingTabindex({});
    roving.setItems(items);

    roving.handleKeydown(keydown("End"));
    expect(roving.getCurrentIndex()).toBe(2);
    roving.handleKeydown(keydown("Home"));
    expect(roving.getCurrentIndex()).toBe(0);
  });

  it("Enter / 空格触发 onActivate 并带上当前索引", () => {
    const items = mountItems(2);
    const onActivate = vi.fn();
    const roving = new RovingTabindex({ onActivate });
    roving.setItems(items);
    roving.setCurrentIndex(1);

    roving.handleKeydown(keydown("Enter"));
    roving.handleKeydown(keydown(" "));
    expect(onActivate).toHaveBeenCalledTimes(2);
    expect(onActivate).toHaveBeenNthCalledWith(1, 1);
  });

  it("setCurrentIndex 只改 tabindex，不移动焦点", () => {
    const items = mountItems(2);
    const roving = new RovingTabindex({});
    roving.setItems(items);

    roving.setCurrentIndex(1);
    expect(items[1].getAttribute("tabindex")).toBe("0");
    expect(document.activeElement).not.toBe(items[1]);
  });

  it("越界索引被忽略", () => {
    const items = mountItems(2);
    const roving = new RovingTabindex({});
    roving.setItems(items);

    roving.setCurrentIndex(5);
    roving.focusItem(-1);
    expect(roving.getCurrentIndex()).toBe(0);
  });

  it("空列表时键盘事件直接返回", () => {
    const roving = new RovingTabindex({});
    roving.setItems([]);
    const event = keydown("ArrowRight");
    roving.handleKeydown(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it("特征测试：destroy() 只清空列表，不移除已有 tabindex（P2-6）", () => {
    const items = mountItems(2);
    const roving = new RovingTabindex({});
    roving.setItems(items);
    roving.destroy();

    expect(items[0].getAttribute("tabindex")).toBe("0");
    expect(items[1].getAttribute("tabindex")).toBe("-1");
  });
});
