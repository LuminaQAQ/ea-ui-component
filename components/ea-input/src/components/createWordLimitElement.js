export function createWordLimitElement(input) {
    const wordLimit = document.createElement('span');
    wordLimit.className = 'ea-input_word-limit';
    wordLimit.innerText = `${input.value.length}/${this.maxLength}`;

    input.addEventListener('input', (e) => {
        wordLimit.innerText = `${e.target.value.length}/${this.maxLength}`;
    });

    return wordLimit;
}