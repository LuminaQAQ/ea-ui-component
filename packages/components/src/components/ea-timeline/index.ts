import { EaTimeline } from "./components/ea-timeline";
import { EaTimelineItem } from "./components/ea-timeline-item";

export { EaTimeline, EaTimelineItem };
export default { EaTimeline, EaTimelineItem };

declare global {
  interface HTMLElementTagNameMap {
    "ea-timeline": EaTimeline;
    "ea-timeline-item": EaTimelineItem;
  }
}
