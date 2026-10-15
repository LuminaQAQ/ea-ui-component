import { EaLoading } from "./components/ea-loading";
import { EaLoadingService } from "./utils/EaLoadingInstance";

declare global {
  interface Window {
    $loading: typeof EaLoadingService;
  }
}

window.$loading = EaLoadingService;

export { EaLoading, EaLoadingService };
