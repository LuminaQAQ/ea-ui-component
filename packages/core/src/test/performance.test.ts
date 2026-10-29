import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce, rafThrottle, throttle } from "@utils/performance";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("debounce", () => {
  it("连续调用只执行最后一次", () => {
    const spy = vi.fn();
    const fn = debounce(spy, 100);

    fn("a");
    fn("b");
    fn("c");
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("c");
  });

  it("cancel() 取消尚未执行的调用", () => {
    const spy = vi.fn();
    const fn = debounce(spy, 100);

    fn();
    fn.cancel();
    vi.advanceTimersByTime(200);
    expect(spy).not.toHaveBeenCalled();
  });

  it("默认延迟 300ms", () => {
    const spy = vi.fn();
    debounce(spy)();
    vi.advanceTimersByTime(299);
    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("throttle", () => {
  it("首次调用立即执行，窗口内调用合并为一次尾调用", () => {
    const spy = vi.fn();
    const fn = throttle(spy, 100);

    fn(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(1);

    fn(2);
    fn(3);
    expect(spy).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith(3);
  });

  it("窗口外的调用重新立即执行", () => {
    const spy = vi.fn();
    const fn = throttle(spy, 100);

    fn(1);
    vi.advanceTimersByTime(100);
    fn(2);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith(2);
  });

  it("cancel() 丢弃排队中的尾调用", () => {
    const spy = vi.fn();
    const fn = throttle(spy, 100);

    fn(1);
    fn(2);
    fn.cancel();
    vi.advanceTimersByTime(200);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("rafThrottle", () => {
  it("同一帧内的多次调用合并为一次", () => {
    const spy = vi.fn();
    const fn = rafThrottle(spy);

    fn("a");
    fn("b");
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(20);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("a");
  });

  it("下一帧可以再次执行", () => {
    const spy = vi.fn();
    const fn = rafThrottle(spy);

    fn();
    vi.advanceTimersByTime(20);
    fn();
    vi.advanceTimersByTime(20);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("cancel() 取消已排队的帧回调", () => {
    const spy = vi.fn();
    const fn = rafThrottle(spy);

    fn();
    fn.cancel();
    vi.advanceTimersByTime(50);
    expect(spy).not.toHaveBeenCalled();
  });
});
