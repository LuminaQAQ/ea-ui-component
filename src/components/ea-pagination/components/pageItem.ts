export const getPageItem = (page: number, currentPage: number, content?: number | string): string => {
	const isActive = page === currentPage ? " is-active" : "";
	return `<span class="ea-pagination__page${isActive}" part="page" tabindex="0" data-page="${page}" aria-label="page ${page}" aria-current="${page === currentPage}">${content || page}</span>`;
};
