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

/** @type {MessageBoxOptions} */
const defaultOptions = {
  title: "",
  dangerouslyUseHTMLString: false,
  message: "",
  icon: "",
  type: "primary",
  closeIcon: "icon-cancel",
  showClose: true,

  // lockScroll: true,

  showCancelButton: false,
  showConfirmButton: false,
  cancelButtonText: "Cancel",
  confirmButtonText: "OK",
  closeOnClickModal: false,
  closeOnPressEscape: false,

  showInput: false,
  //   inputPlaceholder: "",
  //   inputType: "text",
  //   inputValue: "",
  //   inputPattern: null,
  //   inputValidator: null,
  //   inputErrorMessage: "",

  center: false,
  // draggable: false,
  roundButton: false,
  buttonSize: "medium",
  appendTo: "body",
};

const appendToHandler = (el, appendTo) => {
  if (appendTo instanceof HTMLElement) {
    appendTo.appendChild(el);
  } else {
    const parent = document.querySelector(appendTo);
    parent ? parent.appendChild(el) : document.body.appendChild(el);
  }
};

const renderer = (options) => {
  const messageBox = document.createElement("ea-message-box");
  for (const k in options) {
    const key = k
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
      .toLowerCase();

    messageBox.setAttribute(key, options[k]);
  }

  appendToHandler(messageBox, options.appendTo);

  return messageBox;
};

/**
 * @param {MessageBoxOptions} options
 * @param {'alert' | 'confirm' | 'prompt'} boxType
 * @returns
 */
export const EaMessageBox = (options) => {
  options = Object.assign(
    { boxType: options.boxType },
    defaultOptions,
    options
  );

  const controller = new AbortController();
  const messageBox = renderer(options);
  messageBox.visible = true;
  messageBox.addEventListener(
    "closed",
    () => {
      controller.abort();
      messageBox.remove();
    },
    { signal: controller.signal }
  );

  return new Promise((resolve, reject) => {
    messageBox.addEventListener(
      "confirm",
      (e) => {
        resolve(e);
        messageBox.hide();
      },
      { signal: controller.signal }
    );

    messageBox.addEventListener(
      "cancel",
      (e) => {
        reject(e);
        messageBox.hide();
      },
      { signal: controller.signal }
    );
  });
};

EaMessageBox.alert = (message, title, options) =>
  EaMessageBox({
    message,
    title,
    showConfirmButton: true,
    boxType: "alert",
    ...options,
  });

EaMessageBox.confirm = (message, title, options) =>
  EaMessageBox({
    message,
    title,
    showConfirmButton: true,
    showCancelButton: true,
    closeOnClickModal: true,
    boxType: "confirm",
    ...options,
  });

EaMessageBox.prompt = (message, title, options) =>
  EaMessageBox({
    message,
    title,
    showConfirmButton: true,
    showCancelButton: true,
    closeOnClickModal: true,
    boxType: "prompt",
    ...options,
  });
