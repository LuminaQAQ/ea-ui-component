import { configureDiagnostics } from "@utils/diagnostics";
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

// jsdom 不实现 adoptedStyleSheets，降级告警在单测里属于预期行为，不刷屏
configureDiagnostics({
  filter: key => key !== "styles.adopted-unsupported",
});
