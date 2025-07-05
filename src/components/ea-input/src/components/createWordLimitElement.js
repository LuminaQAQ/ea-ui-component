/**
 * 创建一个显示输入字数限制的span元素
 * 
 * @param {HTMLElement} input - 输入框元素，用于监听其输入变化并显示当前输入字数与最大字数限制
 * @returns {HTMLElement} - 返回包含字数限制信息的span元素
 */
export function createWordLimitElement(input) {
    const wordLimit = document.createElement('span');
    wordLimit.className = 'ea-input_word-limit';
    wordLimit.part = 'word-limit';
    wordLimit.innerText = `${input.value.length}/${this.maxLength}`;

    input.addEventListener('input', (e) => {
        wordLimit.innerText = `${e.target.value.length}/${this.maxLength}`;
    });

    return wordLimit;
}