import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { timeout } from "@utils/timeout";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("timeout", () => {
  it("默认延迟 0ms 后执行", () => {
    const spy = vi.fn();
    timeout(spy);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(0);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("按指定毫秒数延迟执行", () => {
    const spy = vi.fn();
    timeout(spy, 200);

    vi.advanceTimersByTime(199);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("返回定时器句柄，且回调执行后自动清理", () => {
    const spy = vi.fn();
    const id = timeout(spy, 50);

    // 类型声明为 `number`，返回值实际是平台原样返回的句柄
    // （浏览器为 number，jsdom + fake timers 下是 sinon 的 Timeout 对象）
    expect(id).toBeDefined();
    vi.advanceTimersByTime(50);
    expect(spy).toHaveBeenCalledTimes(1);
    // 再次推进不应重复触发
    vi.advanceTimersByTime(50);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
