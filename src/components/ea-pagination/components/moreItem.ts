import { createBEM } from "@core/EaBase";

const bem = createBEM("ea-pagination");

export const getMoreItem = (
  content: string,
  action: "prev" | "next"
): string => {
  return `<span class="${bem.e("page")} ${bem.e("more")}" part="more" role="button" aria-label="${action === "next" ? "Next 5 pages" : "Previous 5 pages"}" tabindex="-1" data-action="${action}">${content}</span>`;
};
