// core 测试环境的 jsdom 补齐
import { installElementInternalsPolyfill } from "../../../../internal/test-setup/element-internals";

// rAF
if (typeof globalThis.requestAnimationFrame !== "function") {
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback): number =>
    setTimeout(
      () => cb(Date.now()),
      0
    ) as unknown as number) as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number): void => {
    clearTimeout(id);
  }) as typeof cancelAnimationFrame;
}

installElementInternalsPolyfill();
