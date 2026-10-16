import { describe, it, expect, vi, afterEach } from "vitest";
import { c, info, success, warn, error, fail, dbg } from "../lib/output";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("output 流路由", () => {
  it("info/success/warn/error 写 stdout", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const err = vi.spyOn(console, "error").mockImplementation(() => {});

    info("i");
    success("s");
    warn("w");
    error("e");

    expect(log).toHaveBeenCalledTimes(4);
    expect(err).not.toHaveBeenCalled();
    expect(log.mock.calls.map(call => call[0])).toEqual(["i", expect.any(String), expect.any(String), expect.any(String)]);
    // 无色环境下着色为透传，内容仍包含原文
    expect(log.mock.calls[1][0]).toContain("s");
    expect(log.mock.calls[2][0]).toContain("w");
    expect(log.mock.calls[3][0]).toContain("e");
  });

  it("fail 写 stderr", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const err = vi.spyOn(console, "error").mockImplementation(() => {});

    fail("boom");

    expect(err).toHaveBeenCalledTimes(1);
    expect(err.mock.calls[0][0]).toContain("boom");
    expect(log).not.toHaveBeenCalled();
  });

  it("dbg 不产生任何输出", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const err = vi.spyOn(console, "error").mockImplementation(() => {});

    dbg("hidden");

    expect(log).not.toHaveBeenCalled();
    expect(err).not.toHaveBeenCalled();
  });
});

describe("c 颜色封装", () => {
  it("c 为 picocolors 透传，着色结果保留原文", () => {
    expect(c.red("x")).toContain("x");
    expect(c.green("y")).toContain("y");
    expect(c.bold("z")).toContain("z");
    expect(typeof c.dim).toBe("function");
  });
});

describe("级别→色映射（不依赖终端启用）", () => {
  it("success 经 green、warn 经 yellow、error/fail 经 red、info 不上色", () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    const green = vi.spyOn(c, "green").mockImplementation(s => String(s));
    const yellow = vi.spyOn(c, "yellow").mockImplementation(s => String(s));
    const red = vi.spyOn(c, "red").mockImplementation(s => String(s));

    info("i");
    success("s");
    warn("w");
    error("e");
    fail("f");

    expect(green).toHaveBeenCalledWith("s");
    expect(yellow).toHaveBeenCalledWith("w");
    expect(red).toHaveBeenCalledWith("e");
    expect(red).toHaveBeenCalledWith("f");
    // info 无色：不走任何色函数
    expect(green).not.toHaveBeenCalledWith("i");
    expect(yellow).not.toHaveBeenCalledWith("i");
    expect(red).not.toHaveBeenCalledWith("i");
  });

  it("函数不注入前缀：消息逐字传入色函数", () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const green = vi.spyOn(c, "green").mockImplementation(s => String(s));

    success("✓ 已写入 x");

    expect(green).toHaveBeenCalledTimes(1);
    expect(green.mock.calls[0][0]).toBe("✓ 已写入 x");
  });
});
