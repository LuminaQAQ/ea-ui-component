function handleSuggestionBoardClose(suggestionBoard) {
    suggestionBoard.classList.remove('is-open');
}

export function createSuggestionBoard(container, val) {
    const hasSuggestionBoard = this.shadowRoot.querySelector('.ea-input_suggestion-wrap');

    const suggestionBoard = document.createElement('ul');
    suggestionBoard.className = "ea-input_suggestion-wrap";

    val.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item.value;

        li.addEventListener('click', () => {
            this.value = item.value;
            handleSuggestionBoardClose(suggestionBoard);
        });

        suggestionBoard.appendChild(li);
    });

    const loadingIcon = document.createElement('ea-icon');
    loadingIcon.className = 'loading-icon animate-spin';
    loadingIcon.icon = 'icon-spin6 ';
    suggestionBoard.appendChild(loadingIcon);

    window.addEventListener('click', (e) => {
        if (!this.contains(e.target)) handleSuggestionBoardClose(suggestionBoard);
    });

    if (hasSuggestionBoard) {
        hasSuggestionBoard.remove();
        suggestionBoard.classList.add('is-open');
    }

    container.appendChild(suggestionBoard);

    return suggestionBoard;
}