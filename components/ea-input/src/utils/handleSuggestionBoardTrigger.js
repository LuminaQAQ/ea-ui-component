/**
 * 初始化在输入框内容变化后触发的事件处理函数
 * 
 * 此函数主要用于在用户向输入框输入内容时，根据输入内容来决定是否显示建议列表
 * 它会检查建议列表中的项是否包含输入框中的内容，如果至少有一项满足条件且输入框内容非空，则显示建议列表
 * 
 * @param {HTMLElement} input - 输入框的DOM元素，用于绑定输入事件
 * @param {HTMLElement} suggestionBoard - 建议列表的DOM元素，用于操作建议列表的显示与隐藏
 */
export function initTriggerAfterInputEvent(input, suggestionBoard) {
    input.addEventListener('input', (e) => {
        const hasRes = Array.from(suggestionBoard.querySelectorAll('li')).some((item, index) => {
            return item.innerText.includes(e.target.value);
        })

        suggestionBoard.classList.toggle('is-open', hasRes && e.target.value !== '');
    });
}

/**
 * 初始化输入框聚焦事件的触发
 * 当输入框获得焦点时，展示建议面板
 * 
 * @param {HTMLElement} suggestionBoard - 建议面板的HTML元素，用于展示输入框的建议或自动完成内容
 * @param {HTMLElement} input - 输入框的HTML元素，用于监听聚焦事件
 */
export function initTriggerOnFocusEvent(suggestionBoard, input) {
    input.addEventListener('focus', (e) => {
        suggestionBoard.classList.add('is-open');
    });
}