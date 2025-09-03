/**
 * @typedef {Object} MessageBoxOptions
 * @property {string} title
 * @property {string} message
 * @property {Boolean} dangerouslyUseHTMLString
 * @property {'primary' | 'success' | 'info' | 'warning' | 'error'} type
 * @property {String} icon
 * @property {String} closeIcon
 * @property {(value: string, action) => any | (action) => any} callback
 * @property {Boolean} showClose
 * @property {(action, instance, done: () => void) => void} beforeClose
 * @property {Boolean} lockScroll
 * @property {Boolean} showCancelButton
 * @property {Boolean} showConfirmButton
 * @property {String} cancelButtonText
 * @property {String} confirmButtonText
 * @property {String} closeOnClickModal
 * @property {Boolean} closeOnPressEscape
 * @property {Boolean} showInput
 * @property {String} inputPlaceholder
 * @property {String} inputType
 * @property {String} inputValue
 * @property {RegExp} inputPattern
 * @property {(value: string) => boolean | string | undefined} inputValidator
 * @property {string} inputErrorMessage
 * @property {Boolean} center
 * @property {Boolean} draggable
 * @property {Boolean} roundButton
 * @property {'small' | 'default' | 'large'} buttonSize
 * @property {HTMLElement | string} appendTo
 */

/**
 * @param {MessageBoxOptions} options 
 * @param {'alert' | 'confirm' | 'prompt'} boxtype
 * @returns 
 */
export const EaMessageBox = (options, boxtype) => {
    const messageBox = document.createElement('ea-message-box');
    messageBox.visible = true;
    messageBox.boxtype = boxtype;

    document.body.appendChild(messageBox);

    return new Promise((resolve, reject) => {
        resolve()
    })
}

EaMessageBox.alert = (message, title, options) => EaMessageBox({
    message,
    title,
    type: 'alert',
    ...options,
});

EaMessageBox.confirm = (message, title, options) => EaMessageBox({
    message,
    title,
    type: 'alert',
    ...options,
});

EaMessageBox.prompt = (message, title, options) => EaMessageBox({
    message,
    title,
    type: 'alert',
    ...options,
});