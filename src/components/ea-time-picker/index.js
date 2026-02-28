import FormAssociatedBase from "@/core/FormBase";
import stylesheet from "./index.scss?inline";
import { namespace } from "@/directives/namespace";

import "@components/ea-icon/index.js";
import "@components/ea-input/index.js";
import { timeout } from "@/utils/timeout";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";
import { EaTimePickerVisibleChangeEvent } from "./events/EaTimePickerVisibleChangeEvent";

export class EaTimePicker extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #input;

  /** @type {HTMLElement} */
  #dropdown;
  /** @type {HTMLElement} */
  #hourWrap;
  /** @type {HTMLElement} */
  #minuteWrap;
  /** @type {HTMLElement} */
  #secondWrap;

  #abortController = new AbortController();

  #states = {
    hour: 0,
    minute: 0,
    second: 0,
    isScrolling: false,
    isAutoScrolling: false,
    scrollTimeout: null,
    isFirstOpen: true,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "label",
      "value",
      "width",
      "size",
      "disabled",
      "align",
      "limit-range-start",
      "limit-range-end",
    ];
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: async newVal => {
        await customElements.whenDefined("ea-input");
        this.#input.label = newVal;
      },
    },
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.setValue(newVal);
        if (newVal) {
          this.#parseValue(newVal);
          this.#updateInputValue();
          this.#updateSelectionState();
        }
      },
    },
    width: {
      type: String,
      default: "",
      observer: newVal => {
        if (this.#container) {
          this.#container.style.setProperty("--ea-time-picker-width", newVal);
        }
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        if (this.#input) {
          this.#input.toggleAttribute("disabled", newVal);
        }
        this.updateContainerClasslist();
      },
    },
    align: {
      type: ["left", "center", "right"],
      default: "left",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    size: {
      type: EA_COMPONENT_SIZES,
      default: "",
      observer: newVal => {
        this.#input.setAttribute("size", newVal);
      },
    },
    "limit-range-start": {
      type: String,
      default: "00:00:00",
    },
    "limit-range-end": {
      type: String,
      default: "23:59:59",
    },
    required: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        await customElements.whenDefined("ea-input");
        this.#input.toggleAttribute("required", newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-time-picker",
      {},
      {
        disabled: this.disabled,
        open: this.#container?.classList.contains("is-open"),
        [`align-${this.align}`]: this.align,
      }
    );

    if (this.#container) {
      this.#container.className = className;
    }

    return className;
  }

  constructor() {
    super();
    this.stylesheet = stylesheet;
    this.$render();
  }

  /**
   * 生成时间项HTML
   * @param {number} start
   * @param {number} end
   * @param {string} type
   * @return {string}
   */
  #generateTimeItems = (start, end, type) => {
    const ns = this.ns;
    const items = [];
    const max = type === "hour" ? 23 : 59;

    for (let i = 0; i <= max; i++) {
      const isDisabled = i < start || i > end;
      const formattedValue = this.#formatNumber(i);
      items.push(
        `<li class="${ns.e("dropdown-item")} ${isDisabled ? "is-disabled" : ""}" data-value="${i}" part="dropdown-item">${formattedValue}</li>`
      );
    }

    return items.join("");
  };

  $render() {
    const ns = namespace("time-picker");
    this.ns = ns;

    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b()}' part='container'>
        <ea-input 
          class="${ns.e("input")}"
          part='input' 
          autocomplete="off" 
          readonly 
          prefix-icon="icon-clock"
        ></ea-input>
        <div class="${ns.e("dropdown")}" part='dropdown'>
          <div class="${ns.e("dropdown-inner-wrap")}" part='dropdown-inner-wrap'>
            <ul class="${ns.e("dropdown-inner")} ${ns.m("hour")}" part='dropdown-time'>
              ${this.#generateTimeItems(0, 23, "hour")}
            </ul>
            <ul class="${ns.e("dropdown-inner")} ${ns.m("minute")}" part='dropdown-time'>
              ${this.#generateTimeItems(0, 59, "minute")}
            </ul>
            <ul class="${ns.e("dropdown-inner")} ${ns.m("second")}" part='dropdown-time'>
              ${this.#generateTimeItems(0, 59, "second")}
            </ul>
          </div>
        </div>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#input = this.shadowRoot.querySelector(ns.ce("input"));

    this.#dropdown = this.shadowRoot.querySelector(ns.ce("dropdown"));
    this.#hourWrap = this.shadowRoot.querySelector(ns.cm("hour"));
    this.#minuteWrap = this.shadowRoot.querySelector(ns.cm("minute"));
    this.#secondWrap = this.shadowRoot.querySelector(ns.cm("second"));
  }

  /**
   * 解析时间值
   * @param {string} value
   */
  #parseValue = value => {
    const [hour = 0, minute = 0, second = 0] = value.split(":").map(Number);
    this.#states.hour = hour;
    this.#states.minute = minute;
    this.#states.second = second;
  };

  /**
   * 获取当前时间值
   * @return {string}
   */
  get #timeValue() {
    return `${this.#formatNumber(this.#states.hour)}:${this.#formatNumber(this.#states.minute)}:${this.#formatNumber(this.#states.second)}`;
  }

  /**
   * 格式化数字
   * @param {number} num
   * @return {string}
   */
  #formatNumber = num => {
    return num < 10 ? `0${num}` : String(num);
  };

  /**
   * 更新输入框值
   */
  #updateInputValue = () => {
    if (this.#input) {
      this.#input.value = this.#timeValue;
    }
  };

  /**
   * 更新选中状态
   */
  #updateSelectionState = () => {
    this.#updateWrapSelection(this.#hourWrap, this.#states.hour);
    this.#updateWrapSelection(this.#minuteWrap, this.#states.minute);
    this.#updateWrapSelection(this.#secondWrap, this.#states.second);
  };

  /**
   * 更新单个容器的选中状态
   * @param {HTMLElement} wrap
   * @param {number} value
   */
  #updateWrapSelection = (wrap, value) => {
    if (!wrap) return;
    const items = wrap.querySelectorAll("li");
    items.forEach(item => {
      const itemValue = parseInt(item.dataset.value, 10);
      item.classList.toggle("is-active", itemValue === value);
    });
  };

  /**
   * 获取最接近目标值的可用选项
   * @param {HTMLElement} wrap
   * @param {number} targetValue
   * @return {number|null}
   */
  #getClosestAvailableValue = (wrap, targetValue) => {
    if (!wrap) return null;
    const enabledItems = wrap.querySelectorAll("li:not(.is-disabled)");
    if (!enabledItems.length) return null;

    let closestValue = null;
    let minDiff = Infinity;

    enabledItems.forEach(item => {
      const value = parseInt(item.dataset.value, 10);
      const diff = Math.abs(value - targetValue);
      if (diff < minDiff) {
        minDiff = diff;
        closestValue = value;
      }
    });

    return closestValue;
  };

  /**
   * 检查是否设置了 Limited Range
   * @return {boolean}
   */
  #hasLimitedRange = () => {
    return (
      this.hasAttribute("limit-range-start") ||
      this.hasAttribute("limit-range-end")
    );
  };

  /**
   * 根据 limit-range 设置时间项的禁用状态
   */
  #applyLimitRange = () => {
    const [startHour, startMinute, startSecond] = this["limit-range-start"]
      .split(":")
      .map(Number);
    const [endHour, endMinute, endSecond] = this["limit-range-end"]
      .split(":")
      .map(Number);

    this.#applyRangeToWrap(this.#hourWrap, startHour, endHour);
    this.#applyRangeToWrap(this.#minuteWrap, startMinute, endMinute);
    this.#applyRangeToWrap(this.#secondWrap, startSecond, endSecond);
  };

  /**
   * 应用范围到指定容器
   * @param {HTMLElement} wrap
   * @param {number} start
   * @param {number} end
   */
  #applyRangeToWrap = (wrap, start, end) => {
    if (!wrap) return;
    const items = wrap.querySelectorAll("li");
    items.forEach(item => {
      const value = parseInt(item.dataset.value, 10);
      const isDisabled = value < start || value > end;
      item.classList.toggle("is-disabled", isDisabled);
    });
  };

  /**
   * 打开下拉框
   */
  #openDropdown = () => {
    if (this.disabled) return;
    const wasOpen = this.#container.classList.contains("is-open");
    this.#container.classList.add("is-open");
    this.updateContainerClasslist();

    if (!wasOpen) {
      this.dispatchEvent(new EaTimePickerVisibleChangeEvent({ visible: true }));
    }

    if (this.#states.isFirstOpen) {
      const hasValue = this.value && this.value.trim() !== "";
      const hasLimitedRange = this.#hasLimitedRange();

      if (!hasValue && hasLimitedRange) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSecond = now.getSeconds();

        const closestHour = this.#getClosestAvailableValue(
          this.#hourWrap,
          currentHour
        );
        const closestMinute = this.#getClosestAvailableValue(
          this.#minuteWrap,
          currentMinute
        );
        const closestSecond = this.#getClosestAvailableValue(
          this.#secondWrap,
          currentSecond
        );

        if (closestHour !== null) {
          this.#states.hour = closestHour;
          this.#scrollToValue(this.#hourWrap, closestHour, false);
        }
        if (closestMinute !== null) {
          this.#states.minute = closestMinute;
          this.#scrollToValue(this.#minuteWrap, closestMinute, false);
        }
        if (closestSecond !== null) {
          this.#states.second = closestSecond;
          this.#scrollToValue(this.#secondWrap, closestSecond, false);
        }

        this.#updateSelectionState();
      } else {
        this.#scrollToValue(this.#hourWrap, this.#states.hour, false);
        this.#scrollToValue(this.#minuteWrap, this.#states.minute, false);
        this.#scrollToValue(this.#secondWrap, this.#states.second, false);
      }

      this.#states.isFirstOpen = false;
    }
  };

  /**
   * 关闭下拉框
   */
  #closeDropdown = () => {
    const wasOpen = this.#container.classList.contains("is-open");
    this.#container.classList.remove("is-open");
    this.updateContainerClasslist();

    if (wasOpen) {
      this.dispatchEvent(
        new EaTimePickerVisibleChangeEvent({ visible: false })
      );
    }
  };

  /**
   * 切换下拉框显示状态
   */
  #toggleDropdown = () => {
    if (this.disabled) return;
    if (this.#container.classList.contains("is-open")) {
      this.#closeDropdown();
    } else {
      this.#openDropdown();
    }
  };

  /**
   * 点击外部关闭下拉
   * @param {MouseEvent} e
   */
  #onWindowClick = e => {
    const path = e.composedPath();
    const isInsideTimePicker =
      path.includes(this) || path.includes(this.shadowRoot);
    if (!isInsideTimePicker) {
      this.#closeDropdown();
    }
  };

  /**
   * 输入框焦点事件
   */
  #onInputFocus = () => {
    this.emit("focus");
  };

  /**
   * 输入框失焦事件
   */
  #onInputBlur = () => {
    this.emit("blur");
  };

  /**
   * 滚动到指定值
   * @param {HTMLElement} wrap
   * @param {number} value
   * @param {boolean} smooth
   */
  #scrollToValue = (wrap, value, smooth = true) => {
    if (!wrap) return;
    const items = wrap.querySelectorAll("li:not(.is-disabled)");
    if (!items.length) return;

    const itemHeight = items[0].getBoundingClientRect().height;
    const targetItem = wrap.querySelector(`li[data-value="${value}"]`);

    if (targetItem && !targetItem.classList.contains("is-disabled")) {
      const top = itemHeight * value - 1;
      wrap.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
    }
  };

  /**
   * 处理时间列表滚动停止
   * @param {HTMLElement} wrap
   * @param {string} type
   */
  #handleScrollStop = (wrap, type) => {
    if (this.#states.scrollTimeout) {
      clearTimeout(this.#states.scrollTimeout);
    }

    this.#states.scrollTimeout = timeout(() => {
      if (this.#states.isAutoScrolling) return;

      const allItems = wrap.querySelectorAll("li");
      const enabledItems = wrap.querySelectorAll("li:not(.is-disabled)");
      if (!enabledItems.length) return;

      const itemHeight = enabledItems[0].getBoundingClientRect().height;
      const { scrollTop } = wrap;

      const index = Math.round(scrollTop / itemHeight);
      const clampedIndex = Math.max(0, Math.min(allItems.length - 1, index));
      let targetItem = allItems[clampedIndex];

      if (targetItem && targetItem.classList.contains("is-disabled")) {
        for (let i = clampedIndex; i < allItems.length; i++) {
          if (!allItems[i].classList.contains("is-disabled")) {
            targetItem = allItems[i];
            break;
          }
        }
        if (targetItem.classList.contains("is-disabled")) {
          for (let i = clampedIndex; i >= 0; i--) {
            if (!allItems[i].classList.contains("is-disabled")) {
              targetItem = allItems[i];
              break;
            }
          }
        }
      }

      if (targetItem && !targetItem.classList.contains("is-disabled")) {
        const value = parseInt(targetItem.dataset.value, 10);
        this.#setTimeValue(type, value);

        const top = itemHeight * value;
        this.#states.isAutoScrolling = true;
        wrap.scrollTo({ top, behavior: "smooth" });

        timeout(() => {
          this.#states.isAutoScrolling = false;
        }, 300);
      }

      this.#states.isScrolling = false;
    }, 150);
  };

  /**
   * 设置时间值
   * @param {string} type
   * @param {number} value
   */
  #setTimeValue = (type, value) => {
    switch (type) {
      case "hour":
        this.#states.hour = value;
        break;
      case "minute":
        this.#states.minute = value;
        break;
      case "second":
        this.#states.second = value;
        break;
    }

    const newValue = this.#timeValue;
    this.setAttribute("value", newValue);
    this.#updateInputValue();
    this.#updateSelectionState();

    this.emit("change", { detail: { value: newValue } });
  };

  /**
   * 处理时间项点击
   * @param {HTMLElement} wrap
   * @param {string} type
   */
  #handleTimeItemClick = (wrap, type) => {
    wrap.addEventListener(
      "click",
      e => {
        const item = e.target.closest("li");
        if (!item || item.classList.contains("is-disabled")) return;

        const value = parseInt(item.dataset.value, 10);
        this.#setTimeValue(type, value);

        const itemHeight = item.getBoundingClientRect().height;
        const top = itemHeight * value;

        this.#states.isAutoScrolling = true;
        if (this.#states.scrollTimeout) {
          clearTimeout(this.#states.scrollTimeout);
        }
        wrap.scrollTo({ top, behavior: "smooth" });

        timeout(() => {
          this.#states.isAutoScrolling = false;
        }, 1000);
      },
      { signal: this.#abortController.signal }
    );
  };

  /**
   * 处理时间列表滚动
   * @param {HTMLElement} wrap
   * @param {string} type
   */
  #handleTimeWrapScroll = (wrap, type) => {
    wrap.addEventListener(
      "scroll",
      () => {
        this.#states.isScrolling = true;
        this.#handleScrollStop(wrap, type);
      },
      { signal: this.#abortController.signal }
    );
  };

  /**
   * 绑定事件
   */
  #bindEvents = () => {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#input.addEventListener("click", this.#toggleDropdown, {
      signal: this.#abortController.signal,
    });

    this.#input.addEventListener("focus", this.#onInputFocus, {
      signal: this.#abortController.signal,
    });

    this.#input.addEventListener("blur", this.#onInputBlur, {
      signal: this.#abortController.signal,
    });

    window.addEventListener("click", this.#onWindowClick, {
      signal: this.#abortController.signal,
    });

    this.#handleTimeItemClick(this.#hourWrap, "hour");
    this.#handleTimeItemClick(this.#minuteWrap, "minute");
    this.#handleTimeItemClick(this.#secondWrap, "second");

    this.#handleTimeWrapScroll(this.#hourWrap, "hour");
    this.#handleTimeWrapScroll(this.#minuteWrap, "minute");
    this.#handleTimeWrapScroll(this.#secondWrap, "second");
  };

  /**
   * 使组件获取焦点
   * @return {void}
   */
  focus = () => {
    this.#input.focus();
  };

  /**
   * 使组件失去焦点
   * @return {void}
   */
  blur = () => {
    this.#input.blur();
  };

  /**
   * 打开时间选择器弹窗
   * @return {void}
   */
  handleOpen = () => {
    this.#openDropdown();
  };

  /**
   * 关闭时间选择器弹窗
   * @return {void}
   */
  handleClose = () => {
    this.#closeDropdown();
  };

  /**
   * 获取验证目标元素
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return this.#input;
  }

  /**
   * 更新表单验证状态
   */
  updateValidity() {
    const hasValue = this.value !== "" && this.value != null;

    if (this.required && !hasValue) {
      this.internals.setValidity(
        { valueMissing: true },
        "请选择时间",
        this
      );
    } else {
      this.internals.setValidity({}, "", this);
    }
  }

  /**
   * 检查表单字段的有效性
   * @returns {boolean}
   */
  checkValidity() {
    this.updateValidity();
    return this.internals.validity.valid;
  }

  /**
   * 报告表单字段的有效性（显示验证提示）
   * @returns {boolean}
   */
  reportValidity() {
    this.updateValidity();
    return this.internals.reportValidity();
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#applyLimitRange();

    this.#bindEvents();

    if (this.hasAttribute("value")) {
      this.#parseValue(this.value);
    }
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    if (this.#states.scrollTimeout) {
      clearTimeout(this.#states.scrollTimeout);
    }
  }
}

if (!customElements.get("ea-time-picker")) {
  customElements.define("ea-time-picker", EaTimePicker);
}
