/**
 * @typedef {'cancel' | 'close' | 'confirm'} Action
 */

/**
 * @typedef {Object} MessageBoxOptions
 * @property {string} title
 * @property {string} message
 * @property {Boolean} dangerouslyUseHTMLString
 * @property {'primary' | 'success' | 'info' | 'warning' | 'error'} type
 * @property {String} icon
 * @property {String} closeIcon
 * @property {(value: string, action: Action) => any | (action: Action) => any} callback
 * @property {Boolean} showClose
 * @property {(action: Action, instance: HTMLElement, done: () => void) => void} beforeClose
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

import EaUtils from "@/utils/Utils";

class EaMessageBoxInstance {
  /** @type {MessageBoxOptions} */
  #defaultOptions = {
    boxType: "personalized",
    distinguishCancelAndClose: false,

    title: "",
    dangerouslyUseHTMLString: false,
    message: "",
    icon: "",
    type: "primary",
    closeIcon: "icon-cancel",
    showClose: true,

    // lockScroll: true,

    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonLoading: false,
    cancelButtonText: "Cancel",
    confirmButtonText: "OK",
    closeOnClickModal: true,
    closeOnPressEscape: false,

    showInput: false,
    inputPlaceholder: "",
    inputType: "text",
    inputValue: "",
    inputPattern: null,
    //   inputValidator: null,
    inputErrorMessage: "",

    center: false,
    draggable: false,
    roundButton: false,
    buttonSize: "medium",
    appendTo: "body",

    beforeClose: null,
  };
  #excluded = [
    "inputPattern",
    "inputValidator",
    "beforeClose",
    "confirmButtonLoading",
    "dangerouslyUseHTMLString",
    "distinguishCancelAndClose",
  ];

  /**
   *
   * @param {MessageBoxOptions} options
   */
  constructor(options) {
    options = Object.assign(
      { boxType: options.boxType },
      this.#defaultOptions,
      options
    );

    const messageBox = this.#renderer(options);
    this.instance = messageBox;
    this.#appendToHandler(messageBox, options.appendTo);
  }

  /**
   * 元素添加
   * @param {HTMLElement} el
   * @param {String | HTMLElement} appendTo
   */
  #appendToHandler = (el, appendTo) => {
    if (appendTo instanceof HTMLElement) {
      appendTo.appendChild(el);
    } else {
      const parent = document.querySelector(appendTo);
      parent ? parent.appendChild(el) : document.body.appendChild(el);
    }
  };

  /**
   * 元素渲染
   * @param {MessageBoxOptions} options
   * @returns
   */
  #renderer = (options) => {
    const messageBox = document.createElement("ea-message-box");

    for (const k in options) {
      if (this.#excluded.includes(k)) {
        messageBox[k] = options[k];
      } else {
        const key = EaUtils.String.toLowerCamelCase(k);
        messageBox.setAttribute(key, options[k]);
      }
    }

    return messageBox;
  };
}

/**
 * @param {MessageBoxOptions} options
 * @param {'alert' | 'confirm' | 'prompt'} boxType
 * @returns {Promise}
 */
export const EaMessageBox = (options) => {
  const controller = new AbortController();
  const messageBox = new EaMessageBoxInstance(options).instance;

  messageBox.visible = true;
  messageBox.addEventListener(
    "closed",
    () => {
      messageBox.remove();
      controller.abort();
    },
    { signal: controller.signal }
  );

  return new Promise((resolve, reject) => {
    messageBox.addEventListener(
      "confirm",
      async (e) => {
        if (options.beforeClose) {
          try {
            await options.beforeClose("confirm", messageBox, () =>
              messageBox.hide()
            );
          } catch (error) {}
        } else {
          messageBox.hide();
        }
        resolve("confirm");
      },
      { signal: controller.signal }
    );

    messageBox.addEventListener(
      "cancel",
      async (e) => {
        if (options.beforeClose) {
          try {
            await options.beforeClose("cancel", messageBox, () =>
              messageBox.hide()
            );
          } catch (error) {}
        } else {
          messageBox.hide();
        }
        reject("cancel");
      },
      { signal: controller.signal }
    );

    messageBox.addEventListener(
      "message-close",
      async (e) => {
        if (options.beforeClose) {
          try {
            await options.beforeClose("close", messageBox, () =>
              messageBox.hide()
            );
          } catch (error) {}
        } else {
          messageBox.hide();
        }
        reject("close");
      },
      {
        signal: controller.signal,
      }
    );
  });
};

EaMessageBox.alert = (message, title, options) =>
  EaMessageBox({
    message,
    title,
    closeOnClickModal: false,
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
    closeOnPressEscape: true,
    boxType: "confirm",
    ...options,
  });

EaMessageBox.prompt = (message, title, options) =>
  EaMessageBox({
    message,
    title,
    showConfirmButton: true,
    showCancelButton: true,
    showInput: true,
    closeOnPressEscape: true,
    boxType: "prompt",
    ...options,
  });
