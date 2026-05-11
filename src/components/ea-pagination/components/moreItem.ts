export const getMoreItem = (content: string, action: "prev" | "next"): string => {
	return `<span class="ea-pagination__page ea-pagination__more" part="more" aria-label="${action === "next" ? "Next 5 pages" : "Previous 5 pages"}" tabindex="0" data-action="${action}">${content}</span>`;
};
