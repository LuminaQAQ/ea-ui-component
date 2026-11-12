import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  configureDiagnostics,
  reportError,
  reportWarn,
  reportWarnOnce,
  resetDiagnostics,
} from "@utils/diagnostics";

describe("诊断通道", () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    resetDiagnostics();
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    resetDiagnostics();
    delete (globalThis as Record<string, unknown>).__EA_DIAGNOSTICS__;
    vi.restoreAllMocks();
  });

  it("默认带统一前缀输出 warn", () => {
    reportWarn("ea-select", "未知模式");

    expect(warnSpy).toHaveBeenCalledWith("[ea-ui] ea-select", "未知模式");
  });

  it("level 为 off 时全部静默", () => {
    configureDiagnostics({ level: "off" });

    reportWarn("ea-select", "w");
    reportError("ea-select", "e");

    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("level 为 error 时只输出 error", () => {
    configureDiagnostics({ level: "error" });

    reportWarn("ea-select", "w");
    reportError("ea-select", "e");

    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("filter 可按键静默", () => {
    configureDiagnostics({ filter: key => key !== "ea-select" });

    reportWarn("ea-select", "w");
    reportWarn("ea-input", "w");

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith("[ea-ui] ea-input", "w");
  });

  it("同 key 的 once 系列只输出一次", () => {
    reportWarnOnce("ea-carousel", "w");
    reportWarnOnce("ea-carousel", "w2");
    reportWarnOnce("ea-rate", "w");

    expect(warnSpy).toHaveBeenCalledTimes(2);
  });

  it("globalThis.__EA_DIAGNOSTICS__ 作为配置入口生效", () => {
    (globalThis as Record<string, unknown>).__EA_DIAGNOSTICS__ = {
      level: "off",
    };

    reportWarn("ea-select", "w");

    expect(warnSpy).not.toHaveBeenCalled();
  });
});
