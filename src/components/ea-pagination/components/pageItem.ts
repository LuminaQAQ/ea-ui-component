import { createBEM } from "@core/EaBase";

const bem = createBEM("ea-pagination");

export const getPageItem = (page: number, currentPage: number, content?: number | string): string => {
	const isActive = page === currentPage;
	const className = isActive
		? `${bem.e("page")} ${bem.s("active")}`
		: bem.e("page");
	return `<span class="${className}" part="page" tabindex="0" data-page="${page}" aria-label="page ${page}" aria-current="${isActive}">${content || page}</span>`;
};
