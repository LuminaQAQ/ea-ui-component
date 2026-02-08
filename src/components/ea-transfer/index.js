import Base from "@components/Base.js";
import { namespace } from "@/directives/namespace";
import { i18nManager } from "@utils/I18nManager.js";
import stylesheet from "./index.scss?inline";
import "./components/panel/index.js";
import "@components/ea-checkbox/index.js";
import "@components/ea-button/index.js";
import "@components/ea-icon/index.js";
import "@components/ea-input/index.js";

export class EaTransfer extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #sourcePanel;
  /** @type {HTMLElement} */
  #targetPanel;
  /** @type {HTMLElement} */
  #moveToRightBtn;
  /** @type {HTMLElement} */
  #moveToLeftBtn;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #AbortControllerStates = {
    /** @type {AbortController|null} */
    sourceClickAbortController: null,
    /** @type {AbortController|null} */
    targetClickAbortController: null,
    /** @type {AbortController|null} */
    sourceDblClickAbortController: null,
    /** @type {AbortController|null} */
    targetDblClickAbortController: null,
    /** @type {AbortController|null} */
    buttonClickAbortController: null,
  };

  #states = {
    isPanelDefined: false,

    sourceSelectedKeys: new Set(),
    targetSelectedKeys: new Set(),
    dataMap: new Map(),
    // fieldMapping: {
    //   key: "key",
    //   label: "label",
    //   disabled: "disabled",
    // },
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "disabled"];
  }

  state = this.properties({
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
  });

  propStates = this.properties({
    data: {
      props: true,
      type: Array,
      default: [],
      observer: async newVal => {
        if (!this.#states.isPanelDefined) {
          await customElements.whenDefined("ea-transfer-panel");
          this.#states.isPanelDefined = true;
        }

        this.#handleDataUpdate(newVal);
      },
    },
    value: {
      props: true,
      type: Array,
      default: [],
      observer: async newVal => {
        if (!this.#states.isPanelDefined) {
          await customElements.whenDefined("ea-transfer-panel");
          this.#states.isPanelDefined = true;
        }

        this.#handleValueUpdate(newVal);

        this.emit("change", { detail: { value: newVal } });
      },
    },
    dataProps: {
      props: true,
      type: Object,
      default: () => ({
        key: "key",
        label: "label",
        disabled: "disabled",
      }),
      observer: newVal => {
        this.#updateFieldMapping(newVal);
      },
    },
    titles: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {
        this.#updateTitles(newVal);
      },
    },
    "button-texts": {
      props: true,
      type: Array,
      default: () => [],
      observer: newVal => {
        this.#updateButtonTexts(newVal);
      },
    },
    filterable: {
      props: true,
      type: Boolean,
      default: false,
      observer: async newVal => {
        this.#handleFilterableUpdate(newVal);
      },
    },
    "filter-placeholder": {
      props: true,
      type: String,
      default: "请输入搜索内容",
      observer: async newVal => {
        this.#updateFilterPlaceholder(newVal);
      },
    },
    "filter-method": {
      props: true,
      type: Function,
      rawFunction: true,
      default: null,
      observer: async newVal => {
        if (!this.#states.isPanelDefined) {
          await customElements.whenDefined("ea-transfer-panel");
          this.#states.isPanelDefined = true;
        }
      },
    },
    leftDefaultChecked: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {},
    },
    rightDefaultChecked: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-transfer",
      {},
      {
        disabled: this.disabled,
      }
    );

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    const ns = namespace("transfer");
    this.ns = ns;

    i18nManager.locale = this.locale;

    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b()}' part='container'>
        <ea-transfer-panel 
          class='${ns.e("panel")} ${ns.m("panel", "source")}' 
          part='panel source-panel'
          type="source"
          data-title="${this.#getDefaultTitle("source")}"
          filter-placeholder="${this["filter-placeholder"]}"
        ></ea-transfer-panel>

        <div class='${ns.e("buttons")}' part='buttons'>
          <ea-button 
            class='${ns.e("button")} ${ns.e("move-to-right-btn")}' 
            part='button move-to-right-btn'
            type="primary" 
            size="small" 
            disabled
          >
            <ea-icon icon="icon-angle-right"></ea-icon>
          </ea-button>
          <ea-button 
            class='${ns.e("button")} ${ns.e("move-to-left-btn")}' 
            part='button move-to-left-btn'
            type="primary" 
            size="small" 
            disabled
          >
            <ea-icon icon="icon-angle-left"></ea-icon>
          </ea-button>
        </div>

        <ea-transfer-panel 
          class='${ns.e("panel")} ${ns.m("panel", "target")}' 
          part='panel target-panel'
          type="target"
          data-title="${this.#getDefaultTitle("target")}"
          filter-placeholder="${this["filter-placeholder"]}"
        ></ea-transfer-panel>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#sourcePanel = this.shadowRoot.querySelector(
      `${ns.ce("panel")}${ns.cm("source")}`
    );
    this.#targetPanel = this.shadowRoot.querySelector(
      `${ns.ce("panel")}${ns.cm("target")}`
    );

    this.#moveToRightBtn = this.shadowRoot.querySelector(
      `${ns.ce("button")}${ns.ce("move-to-right-btn")}`
    );
    this.#moveToLeftBtn = this.shadowRoot.querySelector(
      `${ns.ce("button")}${ns.ce("move-to-left-btn")}`
    );
  }

  connectedCallback() {
    super.connectedCallback();

    this.#bindEvents();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
    }
  }

  /**
   * 绑定事件
   */
  #bindEvents() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#container.addEventListener(
      "ea-transfer-panel-item-change",
      e => {
        e.stopImmediatePropagation();

        const { type, selectedKey, isChecked } = e.detail;

        if (isChecked) {
          this.#states[`${type}SelectedKeys`].add(selectedKey);
        } else {
          this.#states[`${type}SelectedKeys`].delete(selectedKey);
        }

        if (this.#states.sourceSelectedKeys.size > 0) {
          this.#moveToRightBtn.disabled = false;
        } else {
          this.#moveToRightBtn.disabled = true;
        }

        if (this.#states.targetSelectedKeys.size > 0) {
          this.#moveToLeftBtn.disabled = false;
        } else {
          this.#moveToLeftBtn.disabled = true;
        }
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.#container.addEventListener(
      "ea-transfer-panel-select-all",
      e => {
        e.stopImmediatePropagation();

        const { type, selectedKeys, isChecked } = e.detail;

        if (isChecked) {
          selectedKeys.forEach(li => {
            this.#states[`${type}SelectedKeys`].add(li);
          });
        } else {
          selectedKeys.forEach(li => {
            this.#states[`${type}SelectedKeys`].delete(li);
          });
        }

        if (this.#states.sourceSelectedKeys.size > 0) {
          this.#moveToRightBtn.disabled = false;
        } else {
          this.#moveToRightBtn.disabled = true;
        }

        if (this.#states.targetSelectedKeys.size > 0) {
          this.#moveToLeftBtn.disabled = false;
        } else {
          this.#moveToLeftBtn.disabled = true;
        }
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.#moveToRightBtn.addEventListener(
      "click",
      e => {
        e.stopImmediatePropagation();

        const { key, label, disabled } = this.dataProps;
        const selectedKeys = [...this.#states.sourceSelectedKeys];

        selectedKeys.forEach(li => {
          const checkbox = li.querySelector(
            ".ea-transfer-panel__item-checkbox"
          );
          checkbox.checked = false;

          checkbox.dispatchEvent(
            new CustomEvent("change", {
              bubbles: true,
              composed: true,
              detail: {
                checkbox: false,
              },
            })
          );

          this.#states.sourceSelectedKeys.delete(li);
        });

        this.#targetPanel.data = [
          ...new Set(
            [...this.#targetPanel.data, ...selectedKeys].sort((a, b) => {
              const aData = this.#states.dataMap.get(a);
              const bData = this.#states.dataMap.get(b);

              return aData[key] - bData[key] || 0;
            })
          ),
        ];

        this.#sourcePanel.data = [
          ...this.#sourcePanel.data
            .filter(li => !selectedKeys.includes(li))
            .sort((a, b) => {
              const aData = this.#states.dataMap.get(a);
              const bData = this.#states.dataMap.get(b);

              return aData[key] - bData[key] || 0;
            }),
        ];

        const targetDataKeys = this.#targetPanel.data.map(li => {
          const data = this.#states.dataMap.get(li);
          return data[key];
        });
        this.value = targetDataKeys;

        if (this.#states.sourceSelectedKeys.size > 0) {
          this.#moveToRightBtn.disabled = false;
        } else {
          this.#moveToRightBtn.disabled = true;
        }

        if (this.#states.targetSelectedKeys.size > 0) {
          this.#moveToLeftBtn.disabled = false;
        } else {
          this.#moveToLeftBtn.disabled = true;
        }
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.#moveToLeftBtn.addEventListener(
      "click",
      e => {
        e.stopImmediatePropagation();

        const { key, label, disabled } = this.dataProps;
        const selectedKeys = [...this.#states.targetSelectedKeys];

        selectedKeys.forEach(li => {
          const checkbox = li.querySelector(
            ".ea-transfer-panel__item-checkbox"
          );
          checkbox.checked = false;

          checkbox.dispatchEvent(
            new CustomEvent("change", {
              bubbles: true,
              composed: true,
              detail: {
                checkbox: false,
              },
            })
          );

          this.#states.targetSelectedKeys.delete(li);
        });

        this.#sourcePanel.data = [
          ...new Set(
            [...this.#sourcePanel.data, ...selectedKeys].sort((a, b) => {
              const aData = this.#states.dataMap.get(a);
              const bData = this.#states.dataMap.get(b);

              return aData[key] - bData[key] || 0;
            })
          ),
        ];

        this.#targetPanel.data = [
          ...this.#targetPanel.data
            .filter(li => !selectedKeys.includes(li))
            .sort((a, b) => {
              const aData = this.#states.dataMap.get(a);
              const bData = this.#states.dataMap.get(b);

              return aData[key] - bData[key] || 0;
            }),
        ];

        const targetDataKeys = this.#targetPanel.data.map(li => {
          const data = this.#states.dataMap.get(li);
          return data[key];
        });
        this.value = targetDataKeys;

        if (this.#states.sourceSelectedKeys.size > 0) {
          this.#moveToRightBtn.disabled = false;
        } else {
          this.#moveToRightBtn.disabled = true;
        }

        if (this.#states.targetSelectedKeys.size > 0) {
          this.#moveToLeftBtn.disabled = false;
        } else {
          this.#moveToLeftBtn.disabled = true;
        }
      },
      {
        signal: this.#abortController.signal,
      }
    );
  }

  /**
   * 更新字段映射
   * @param {Object} newProps
   */
  #updateFieldMapping = newDataProps => {
    if (this.#sourcePanel) {
      this.#sourcePanel.dataProps = newDataProps;
    }

    if (this.#targetPanel) {
      this.#targetPanel.dataProps = newDataProps;
    }
  };

  /**
   * 处理数据更新
   * @param {Array} newData
   */
  #handleDataUpdate = newData => {
    const { key } = this.dataProps;

    if (this.#sourcePanel) {
      const sourceData = newData.filter(item => {
        const itemKey = item[key];
        return !this.value.includes(itemKey);
      });
      this.#sourcePanel.clearList();
      this.#sourcePanel.data = this.#createPanelData(
        sourceData,
        this.leftDefaultChecked
      );
      this.#sourcePanel.selected = this.leftDefaultChecked;
    }

    if (this.#targetPanel) {
      const targetData = newData.filter(item => {
        const itemKey = item[key];
        return this.value.includes(itemKey);
      });
      this.#targetPanel.clearList();
      this.#targetPanel.data = this.#createPanelData(
        targetData,
        this.rightDefaultChecked
      );
      this.#targetPanel.selected = this.rightDefaultChecked;
    }
  };

  /**
   * 处理 value 值更新，确保数据一致性
   * @param {Array} newValue - 新的 value 值
   */
  #handleValueUpdate = newValue => {
    const { key } = this.dataProps;

    if (!this.data || this.data.length === 0) {
      return;
    }

    if (this.#sourcePanel) {
      const sourceData = this.data.filter(item => {
        const itemKey = item[key];
        return !newValue.includes(itemKey);
      });

      this.#sourcePanel.clearList();
      this.#sourcePanel.data = this.#createPanelData(
        sourceData,
        this.leftDefaultChecked
      );
      this.#sourcePanel.selected = this.leftDefaultChecked;
    }

    if (this.#targetPanel) {
      const targetData = this.data
        .filter(item => {
          const itemKey = item[key];
          return newValue.includes(itemKey);
        })
        .sort((a, b) => {
          const aIndex = newValue.indexOf(a[key]);
          const bIndex = newValue.indexOf(b[key]);
          return aIndex - bIndex;
        });

      // 更新 targetPanel 的数据和选中状态
      this.#targetPanel.clearList();
      this.#targetPanel.data = this.#createPanelData(
        targetData,
        this.rightDefaultChecked
      );
      this.#targetPanel.selected = this.rightDefaultChecked;
    }
  };

  /**
   * 创建面板数据
   * @param {Array} data - 数据数组
   * @param {Array} defaultChecked - 默认选中项数组
   * @returns {Array} 列表项数组
   */
  #createPanelData = (data, defaultChecked) => {
    const { key, label, disabled } = this.dataProps;
    const ns = namespace("transfer-panel");

    return Array.from({ length: data.length }, (_, index) => {
      const li = document.createElement("li");
      const dataItem = data[index];
      const isDisabled = dataItem[disabled];
      const isChecked = defaultChecked.includes(dataItem[key]);

      li.className = this.computedClasslist(
        ns.e("item"),
        {},
        {
          disabled: isDisabled,
          checked: isChecked,
        }
      );

      li.innerHTML = this.html(`
        <ea-checkbox 
          class="${ns.e("item-checkbox")}"
          ${isDisabled ? "disabled" : ""}
          ${isChecked && !isDisabled ? "checked" : ""}
          part="item-checkbox"
        >
          <span class="${ns.e("item-label")}" part="item-label">${dataItem[label]}</span>
        </ea-checkbox>
      `);

      this.#states.dataMap.set(li, dataItem);

      return li;
    }).sort((a, b) => {
      const aKey = this.#states.dataMap.get(a)[key];
      const bKey = this.#states.dataMap.get(b)[key];
      return aKey - bKey;
    });
  };

  /**
   * 更新按钮文本
   * @param {Array} buttonTexts
   */
  #updateButtonTexts = buttonTexts => {};

  /**
   * 处理可过滤更新
   * @param {boolean} filterable
   */
  #handleFilterableUpdate = filterable => {
    if (!this.filterable) return;

    if (this.#sourcePanel) {
      this.#sourcePanel.toggleAttribute("filterable", filterable);
    }

    if (this.#targetPanel) {
      this.#targetPanel.toggleAttribute("filterable", filterable);
    }
  };

  /**
   * 更新过滤占位符
   * @param {string} placeholder
   */
  #updateFilterPlaceholder = placeholder => {
    if (!this.filterable) return;

    if (this.#sourcePanel) {
      this.#sourcePanel.setAttribute("filter-placeholder", placeholder);
    }

    if (this.#targetPanel) {
      this.#targetPanel.setAttribute("filter-placeholder", placeholder);
    }
  };

  /**
   * 获取默认标题
   * @param {"source" | "target"} type - 面板类型
   * @returns {string} 默认标题
   */
  #getDefaultTitle(type) {
    return type === "source"
      ? i18nManager.t("transfer.list1")
      : i18nManager.t("transfer.list2");
  }

  /**
   * 更新标题
   * @param {Array} titles
   */
  #updateTitles = titles => {
    if (Array.isArray(titles) && titles.length >= 2) {
      const [sourceTitle, targetTitle] = titles;

      if (this.#sourcePanel) {
        this.#sourcePanel.setAttribute("data-title", sourceTitle);
      }

      if (this.#targetPanel) {
        this.#targetPanel.setAttribute("data-title", targetTitle);
      }
    }
  };

  $updateLocalization(locale) {
    this.locale = locale;
    i18nManager.locale = locale;

    if (!this.titles || this.titles.length === 0) {
      this.#updateTitles([
        this.#getDefaultTitle("source"),
        this.#getDefaultTitle("target"),
      ]);
    }
  }
}

if (!customElements.get("ea-transfer")) {
  customElements.define("ea-transfer", EaTransfer);
}
