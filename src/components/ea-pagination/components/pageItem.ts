import { createBEM } from "@core/EaBase";

const bem = createBEM("ea-pagination");

export const getPageItem = (
  page: number,
  currentPage: number,
  content?: number | string
): string => {
  const isActive = page === currentPage;
  const className = isActive
    ? `${bem.e("page")} ${bem.s("active")}`
    : bem.e("page");
  return `<span class="${className}" part="page" role="button" tabindex="${isActive ? "0" : "-1"}" data-page="${page}" aria-label="Page ${page}"${isActive ? ' aria-current="page"' : ""}>${content || page}</span>`;
};
