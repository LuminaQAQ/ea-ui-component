import { EaLoading } from "./components/ea-loading";
import { EaLoadingService } from "./utils/EaLoadingInstance";

declare global {
  interface Window {
    $loading: typeof EaLoadingService;
  }
}

(globalThis as any).$loading = EaLoadingService;

export { EaLoading, EaLoadingService };
