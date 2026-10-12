import { EaSkeleton } from "./components/ea-skeleton";
import { EaSkeletonItem } from "./components/ea-skeleton-item";

export { EaSkeleton, EaSkeletonItem };
export default { EaSkeleton, EaSkeletonItem };

declare global {
  interface HTMLElementTagNameMap {
    "ea-skeleton": EaSkeleton;
    "ea-skeleton-item": EaSkeletonItem;
  }
}
