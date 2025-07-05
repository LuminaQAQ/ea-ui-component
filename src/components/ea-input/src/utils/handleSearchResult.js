export function handleSearchResult(suggestionBoard, value) {
    suggestionBoard.querySelectorAll('li').forEach(item => {
        if (item.innerText.includes(value)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
}