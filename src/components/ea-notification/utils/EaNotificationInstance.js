/**
 * @typedef {Object} EaNotificationOptions
 * @property {Boolean} dangerouslyUseHTMLString
 * @property {String} title
 * @property {String} message
 * @property {String} type
 * @property {String} icon
 * @property {Number} duration
 * @property {String} placement
 * @property {Boolean} showClose
 * @property {Number} zIndex
 * @property {String} closeIcon
 * @property {HTMLElement | String} appendTo
 */

import { timeout } from "@/utils/timeout";
import EaUtils from "@/utils/Utils";

class EaNotificationInstance {
  #field = ["dangerouslyUseHTMLString", "message"];
  #priviteTypes = ["appendTo"];

  #defaultOptions = {
    title: "",
    dangerouslyUseHTMLString: false,
    message: "",
    icon: "",
    type: "info",
    duration: 3000,
    placement: "top-right",
    showClose: true,
    zIndex: 2000,
    closeIcon: true,
    appendTo: "body",
  };

  /**
   * @param {EaNotificationOptions} options
   */
  constructor(options) {
    options = Object.assign({}, this.#defaultOptions, options);

    const el = this.#renderer(options);
    this.#appendTo(el, options.appendTo);
    this.#handleDisplay(el, options.duration);
  }

  /**
   *
   * @param {HTMLElement} el
   * @param {EaNotificationOptions} options
   * @returns
   */
  #renderer = (options) => {
    const el = document.createElement("ea-notification");

    for (const k in options) {
      if (this.#priviteTypes.includes(k)) continue;

      const option = options[k];

      if (this.#field.includes(k)) {
        el[k] = option;
      }
      //   else if (this.#events.includes(k)) {
      //     el.addEventListener(k, option);
      //   }
      else {
        const attribute = EaUtils.String.toLowerCamelCase(k);
        el.setAttribute(attribute, option);
      }
    }

    return el;
  };

  /**
   *
   * @param {HTMLElement} el
   * @param {HTMLElement | String} appendTo
   * @returns
   */
  #appendTo = (el, appendTo) => {
    if (!appendTo) return document.body.appendChild(el);

    if (appendTo instanceof HTMLElement) {
      appendTo.appendChild(el);
    } else if (typeof appendTo === "string") {
      const parent = document.querySelector(appendTo);
      parent ? parent.appendChild(el) : document.body.appendChild(el);
    } else {
      console.warn(
        `[EaNotification] TypeError: ${appendTo} is not a valid element or selector.`
      );
    }
  };

  /**
   *
   * @param {HTMLElement} el
   * @param {number} duration
   * @returns
   */
  #handleDisplay = (el, duration = 3000) => {
    el.visible = true;
    el.addEventListener("hidden", () => el.remove());

    if (duration > 0)
      timeout(() => {
        el.visible = false;
      }, duration);
  };
}

export const EaNotification = (options) => {
  new EaNotificationInstance(options);
};
