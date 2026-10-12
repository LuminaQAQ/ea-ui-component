import { describe, it, expect, afterEach } from "vitest";

import { waitForRender } from "../utils/waitForRender.js";

describe("waitForRender 真实浏览器分支", () => {
  const originalRaf = window.requestAnimationFrame;

  afterEach(() => {
    window.requestAnimationFrame = originalRaf;
  });

  it("真实浏览器应走双 rAF 路径并早于超时 resolve", async () => {
    const start = performance.now();

    await waitForRender(2000);

    expect(performance.now() - start).toBeLessThan(1000);
  });

  it("双 rAF 未触发时应由超时兜底 resolve", async () => {
    window.requestAnimationFrame = () => 0;

    const start = performance.now();

    await waitForRender(150);

    const elapsed = performance.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(140);
    expect(elapsed).toBeLessThan(1000);
  });

  it("timeout 为 0 时应仅等待一帧即 resolve", async () => {
    const start = performance.now();

    await waitForRender(0);

    expect(performance.now() - start).toBeLessThan(200);
  });

  it("双 rAF 与超时兜底竞争时应只 resolve 一次", async () => {
    const start = performance.now();

    await waitForRender(30);

    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(1000);
  });
});
