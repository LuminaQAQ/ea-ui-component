import EaUtils from "@/utils/Utils";

export const getPageItem = (page, currentPage, content) =>
  EaUtils.EaElement.h(
    "span",
    `ea-pagination__page ${page === currentPage ? "is-active" : ""}`.trim(),
    {
      part: "page",
      tabindex: 0,
      "data-page": page,
      "aria-label": `page ${page}`,
      "aria-current": page === currentPage,
    },
    content || page
  );
