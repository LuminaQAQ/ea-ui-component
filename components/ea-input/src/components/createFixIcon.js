/**
 * 在指定容器中创建一个固定的图标元素
 * 
 * 此函数通过接受一个容器元素、图标名称和类型作为参数，动态创建一个自定义的<ea-icon>元素
 * 它为新创建的图标设置类名和属性，以确保其样式和行为符合预期
 * 
 * @param {HTMLElement} container - 图标将被添加到的容器元素
 * @param {string} icon - 图标名称，用于设置<ea-icon>的icon属性
 * @param {string} type - 图标类型，用于确定类名和part属性值
 * @returns {HTMLElement} 返回创建的<ea-icon>元素，以便进行进一步的操作或引用
 */
export function createFixIcon(container, icon, type) {
    const fixIcon = document.createElement('ea-icon');
    fixIcon.className = `fix-icon ${type}-icon`;
    fixIcon.icon = icon;
    fixIcon.part = `${type}-icon`;

    container.classList.add(type);

    container.appendChild(fixIcon);

    return fixIcon;
}
/**
 * 控制图标显示与隐藏
 * 
 * @param {HTMLElement} icon - 需要控制显示状态的图标元素
 * @param {boolean} flag - 标志位，决定图标是否显示如果为true，则图标显示；如果为false，则图标隐藏
 */
function handleIconDisplay(icon, flag) {
    if (flag) {
        icon.style.display = 'block';
    } else {
        icon.style.display = 'none';
    }
}

/**
 * 绑定事件监听器或清除图标显示逻辑
 * 
 * @param {string} eventName - 需要监听的事件名称，用于决定是否显示密码清除图标
 * @param {HTMLElement} input - 输入框元素，通常为密码输入框
 * @param {HTMLElement} icon - 清除密码的图标元素
 * 
 * 此函数的作用是为输入框绑定一个事件监听器，当输入框的内容变化时，
 * 根据输入框的内容决定是否显示清除图标。如果输入框有内容，则显示清除图标；
 * 如果输入框为空，则隐藏清除图标。
 */
function clearableEvent(eventName, input, icon) {
    input.addEventListener(eventName, (e) => {
        handleIconDisplay(icon, e.target?.value);
    });

}

/**
 * 在指定容器中创建一个固定位置的图标，该图标在特定条件下可见并可响应点击事件
 * 当输入框内容变化时，显示或隐藏该图标
 * 当图标被点击时，清空输入框内容或执行其他预定义操作
 * 
 * @param {HTMLElement} container - 图标将被放置的容器元素
 * @param {HTMLElement} input - 与图标关联的输入框元素
 * @param {string} icon - 图标名称，用于确定图标的样式或资源
 * @returns {HTMLElement} - 创建的图标元素
 */
export function createClearableFixIcon(container, input, icon) {
    const clearIcon = createFixIcon(container, icon, 'surfix');
    clearIcon.addEventListener('click', () => {
        this.value = '';
        input.focus();
    })

    handleIconDisplay(clearIcon, input.value);

    clearableEvent('input', input, clearIcon);
    clearableEvent('focus', input, clearIcon);
    clearableEvent('blur', input, clearIcon);

    return clearIcon;
}

/**
 * 创建显示/隐藏密码图标
 * 
 * 此函数用于在密码输入框旁创建一个图标，该图标允许用户点击后切换密码的显示状态（显示或隐藏）
 * 
 * @param {HTMLElement} container - 输入框容器，用于确定图标的位置
 * @param {HTMLElement} input - 密码输入框元素，其类型将被切换
 * @param {string} icon - 图标名称，用于初始状态的图标显示
 * @returns {HTMLElement} - 创建的显示/隐藏密码图标元素
 */
export function createShowPasswordIcon(container, input, icon) {
    const showPasswordIcon = createFixIcon(container, icon, 'surfix');
    showPasswordIcon.addEventListener('click', () => {
        input.type = input.type === 'password' ? 'text' : 'password';
        showPasswordIcon.icon = input.type === 'password' ? 'icon-eye' : 'icon-eye-off';

        input.focus();
    })

    input.addEventListener('input', () => {
        handleIconDisplay(showPasswordIcon, input.value);
    })

    handleIconDisplay(showPasswordIcon, input.value);

    return showPasswordIcon;
}