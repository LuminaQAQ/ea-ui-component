import EaUtils from "@/utils/Utils";

export const getMoreItem = (content) =>
  EaUtils.EaElement.h(
    "span",
    "ea-pagination__page ea-pagination__more",
    {
      part: "more",
      "aria-label": "Next 5 pages",
      tabindex: 0,
    },
    content
  );
