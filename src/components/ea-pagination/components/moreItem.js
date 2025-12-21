import EaUtils from "@/utils/Utils";

/**
 *
 * @param {any} content
 * @param {'prev' | 'next'} action
 * @returns
 */
export const getMoreItem = (content, action) =>
  EaUtils.EaElement.h(
    "span",
    "ea-pagination__page ea-pagination__more",
    {
      part: "more",
      "aria-label": action === "next" ? "Next 5 pages" : "Previous 5 pages",
      tabindex: 0,
      "data-action": action,
    },
    content
  );
