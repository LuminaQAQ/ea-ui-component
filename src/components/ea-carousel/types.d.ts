export type DirectionType = "horizontal" | "vertical";
export type TriggerType = "click" | "hover";
export type ArrowType = "never" | "always" | "hover";
export type IndicatorPositionType = "" | "none" | "outside";

export interface EaCarouselProps {
  height: string;
  direction: DirectionType;
  index: number;
  trigger: TriggerType;
  interval: number;
  arrow: ArrowType;
  autoplay: boolean;
  loop: boolean;
  pauseOnHover: boolean;
  indicatorPosition: IndicatorPositionType;
}