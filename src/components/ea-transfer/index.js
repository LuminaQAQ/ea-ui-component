import FormAssociatedBase from "@/core/FormBase";
import { namespace } from "@/directives/namespace";
import { i18nManager } from "@utils/I18nManager.js";
import stylesheet from "./index.scss?inline";
import { EaTransferLeftCheckChangeEvent } from "./events/EaTransferLeftCheckChangeEvent";
import { EaTransferRightCheckChangeEvent } from "./events/EaTransferRightCheckChangeEvent";
import "./components/panel/index.js";
import "@components/ea-checkbox/index.js";
import "@components/ea-button/index.js";
import "@components/ea-icon/index.js";
import "@components/ea-input/index.js";

export class EaTransfer extends FormAssociatedBase {
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

  #AbortControllerStates = {};

  #states = {
    isPanelDefined: false,
    sourceSelectedKeys: new Set(),
    targetSelectedKeys: new Set(),
    dataMap: new Map(),
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "disabled",
      "filterable",
      "filter-placeholder",
      "required",
    ];
  }

  state = this.properties({
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    filterable: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        this.#handleFilterableUpdate(newVal);
      },
    },
    "filter-placeholder": {
      type: String,
      default: "请输入搜索内容",
      observer: async newVal => {
        this.#updateFilterPlaceholder(newVal);
      },
    },
    required: {
      type: Boolean,
      default: false,
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
        this.setValue(newVal);
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
    buttonTexts: {
      props: true,
      type: Array,
      default: () => [],
      observer: newVal => {
        this.#updateButtonTexts(newVal);
      },
    },
    filterMethod: {
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
        >
          <slot name="left-empty" slot="empty"></slot>
          <slot name="left-footer" slot="footer"></slot>
        </ea-transfer-panel>

        <div class='${ns.e("buttons")}' part='buttons'>
          <ea-button 
            class='${ns.e("button")} ${ns.e("move-to-right-btn")}' 
            part='button move-to-right-btn'
            type="primary" 
            size="small" 
            disabled
          >
            <ea-icon name="angle-right"></ea-icon>
            <span class="${ns.e("button-text")}"></span>
          </ea-button>
          <ea-button 
            class='${ns.e("button")} ${ns.e("move-to-left-btn")}' 
            part='button move-to-left-btn'
            type="primary" 
            size="small" 
            disabled
          >
            <ea-icon name="angle-left"></ea-icon>
            <span class="${ns.e("button-text")}"></span>
          </ea-button>
        </div>

        <ea-transfer-panel 
          class='${ns.e("panel")} ${ns.m("panel", "target")}' 
          part='panel target-panel'
          type="target"
          data-title="${this.#getDefaultTitle("target")}"
          filter-placeholder="${this["filter-placeholder"]}"
        >
          <slot name="right-empty" slot="empty"></slot>
          <slot name="right-footer" slot="footer"></slot>
        </ea-transfer-panel>
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

      this.#sourcePanel.originalData = newData;
      this.#sourcePanel.dataMap = this.#states.dataMap;
      this.#sourcePanel.dataProps = this.dataProps;
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

      this.#targetPanel.originalData = newData;
      this.#targetPanel.dataMap = this.#states.dataMap;
      this.#targetPanel.dataProps = this.dataProps;
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

      this.#sourcePanel.originalData = this.data;
      this.#sourcePanel.dataMap = this.#states.dataMap;
      this.#sourcePanel.dataProps = this.dataProps;
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

      this.#targetPanel.clearList();
      this.#targetPanel.data = this.#createPanelData(
        targetData,
        this.rightDefaultChecked
      );
      this.#targetPanel.selected = this.rightDefaultChecked;

      this.#targetPanel.originalData = this.data;
      this.#targetPanel.dataMap = this.#states.dataMap;
      this.#targetPanel.dataProps = this.dataProps;
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
  #updateButtonTexts = buttonTexts => {
    if (Array.isArray(buttonTexts) && buttonTexts.length >= 2) {
      const [rightText, leftText] = buttonTexts;

      if (this.#moveToRightBtn) {
        const buttonTextEl = this.#moveToRightBtn.querySelector(
          ".ea-transfer__button-text"
        );
        if (buttonTextEl) {
          buttonTextEl.textContent = rightText;
          buttonTextEl.style.display = "inline";
        }
      }

      if (this.#moveToLeftBtn) {
        const buttonTextEl = this.#moveToLeftBtn.querySelector(
          ".ea-transfer__button-text"
        );
        if (buttonTextEl) {
          buttonTextEl.textContent = leftText;
          buttonTextEl.style.display = "inline";
        }
      }
    }
  };

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

  /**
   * 更新按钮状态
   */
  #updateButtonStates() {
    this.#moveToRightBtn.disabled = this.#states.sourceSelectedKeys.size === 0;
    this.#moveToLeftBtn.disabled = this.#states.targetSelectedKeys.size === 0;
  }

  /**
   * 清空指定面板的搜索关键词
   * @param {'left' | 'right'} which - 面板类型
   */
  clearQuery(which) {
    if (which === "left" && this.#sourcePanel) {
      this.#sourcePanel.clearQuery();
    } else if (which === "right" && this.#targetPanel) {
      this.#targetPanel.clearQuery();
    }
  }

  /**
   * 触发check-change事件
   * @param {string} type 面板类型
   * @param {Node} selectedKey 选中项
   */
  #triggerCheckChangeEvent(type, selectedKey) {
    const selectedKeys = [...this.#states[`${type}SelectedKeys`]];
    const { key } = this.dataProps;

    const value = selectedKeys
      .map(li => {
        const data = this.#states.dataMap.get(li);
        return data ? data[key] : null;
      })
      .filter(Boolean);

    const dettail = {
      value,
      movedKeys: [this.#states.dataMap.get(selectedKey)[key]],
    };

    if (type === "source") {
      const event = new EaTransferLeftCheckChangeEvent(dettail);
      this.dispatchEvent(event);
    } else if (type === "target") {
      const event = new EaTransferRightCheckChangeEvent(dettail);
      this.dispatchEvent(event);
    }
  }

  /**
   * 触发check-all-change事件
   * @param {string} type 面板类型
   * @param {NodeList} selectedKeys 选中项
   */
  #triggerCheckAllChangeEvent(type, selectedKeys) {
    const { key } = this.dataProps;

    const movedKeys = selectedKeys
      .map(li => {
        const data = this.#states.dataMap.get(li);
        return data ? data[key] : null;
      })
      .filter(Boolean);

    const value = [...this.#states[`${type}SelectedKeys`]]
      .map(li => {
        const data = this.#states.dataMap.get(li);
        return data ? data[key] : null;
      })
      .filter(Boolean);

    if (type === "source") {
      this.dispatchEvent(
        new EaTransferLeftCheckChangeEvent({
          value,
          movedKeys,
        })
      );
    } else if (type === "target") {
      this.dispatchEvent(
        new EaTransferRightCheckChangeEvent({
          value,
          movedKeys,
        })
      );
    }
  }

  /**
   * 处理选中项变化
   * @param {string} type 面板类型
   * @param {NodeList} selectedKey 选中项
   * @param {boolean} isChecked 是否选中
   */
  #handleSelectionChange(type, selectedKey, isChecked) {
    if (isChecked) {
      this.#states[`${type}SelectedKeys`].add(selectedKey);
    } else {
      this.#states[`${type}SelectedKeys`].delete(selectedKey);
    }
    this.#updateButtonStates();

    this.#triggerCheckChangeEvent(type, selectedKey);
  }

  /**
   * 处理全选变化
   * @param {string} type 面板类型
   * @param {NodeList} selectedKeys 选中项
   * @param {boolean} isChecked 是否选中
   */
  #handleSelectAllChange(type, selectedKeys, isChecked) {
    if (isChecked) {
      selectedKeys.forEach(li => this.#states[`${type}SelectedKeys`].add(li));
    } else {
      selectedKeys.forEach(li =>
        this.#states[`${type}SelectedKeys`].delete(li)
      );
    }
    this.#updateButtonStates();

    this.#triggerCheckAllChangeEvent(type, selectedKeys);
  }

  /**
   * 获取可移动的选中项
   * @param {NodeList} selectedKeys 选中项
   * @param {string} disabledField 禁用字段
   * @returns {NodeList} 可移动的选中项
   */
  #getMovableKeys = (selectedKeys, disabledField) => {
    return selectedKeys.filter(li => {
      const data = this.#states.dataMap.get(li);
      return !data || !data[disabledField];
    });
  };

  /**
   * 处理可移动的选中项
   * @param {NodeList} movableKeys 可移动的选中项
   */
  #handleMovableKeys = movableKeys => {
    movableKeys.forEach(li => {
      const checkbox = li.querySelector(".ea-transfer-panel__item-checkbox");
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
  };

  /**
   * 处理面板数据排序
   * @param {string} keyField 排序字段
   * @returns {function} 排序函数
   */
  #handlePanelDataSort = keyField => {
    return (a, b) => {
      const aData = this.#states.dataMap.get(a);
      const bData = this.#states.dataMap.get(b);

      return aData[keyField] - bData[keyField] || 0;
    };
  };

  /**
   * 处理向右移动
   * @param {Event} e 事件对象
   */
  #onMoveToRight = e => {
    e.stopImmediatePropagation();

    const { key, label, disabled } = this.dataProps;
    const selectedKeys = [...this.#states.sourceSelectedKeys];
    const movableKeys = this.#getMovableKeys(selectedKeys, disabled);

    this.#handleMovableKeys(movableKeys);

    this.#targetPanel.data = [
      ...new Set(
        [...this.#targetPanel.data, ...movableKeys].sort(
          this.#handlePanelDataSort(key)
        )
      ),
    ];

    this.#sourcePanel.data = this.#sourcePanel.data
      .filter(li => !movableKeys.includes(li))
      .sort(this.#handlePanelDataSort(key));

    const targetDataKeys = this.#targetPanel.data.map(li => {
      const data = this.#states.dataMap.get(li);
      return data[key];
    });
    this.value = targetDataKeys;

    this.#updateButtonStates();
  };

  /**
   * 处理向左移动
   * @param {Event} e 事件对象
   */
  #onMoveToLeft = e => {
    e.stopImmediatePropagation();

    const { key, label, disabled } = this.dataProps;
    const selectedKeys = [...this.#states.targetSelectedKeys];
    const movableKeys = this.#getMovableKeys(selectedKeys, disabled);

    this.#handleMovableKeys(movableKeys);

    this.#sourcePanel.data = [
      ...new Set(
        [...this.#sourcePanel.data, ...movableKeys].sort(
          this.#handlePanelDataSort(key)
        )
      ),
    ];

    this.#targetPanel.data = this.#targetPanel.data
      .filter(li => !movableKeys.includes(li))
      .sort(this.#handlePanelDataSort(key));

    const targetDataKeys = this.#targetPanel.data.map(li => {
      const data = this.#states.dataMap.get(li);
      return data[key];
    });
    this.value = targetDataKeys;

    this.#updateButtonStates();
  };

  /**
   * 绑定事件
   */
  #bindEvents() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#container.addEventListener(
      "ea-transfer-panel-select-change",
      e => {
        e.stopImmediatePropagation();
        const { type, selectedKey, isChecked } = e.detail;
        this.#handleSelectionChange(type, selectedKey, isChecked);
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
        this.#handleSelectAllChange(type, selectedKeys, isChecked);
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.#moveToRightBtn.addEventListener("click", this.#onMoveToRight, {
      signal: this.#abortController.signal,
    });

    this.#moveToLeftBtn.addEventListener("click", this.#onMoveToLeft, {
      signal: this.#abortController.signal,
    });
  }

  /**
   * 获取验证目标元素
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return this;
  }

  /**
   * 更新表单验证状态
   */
  updateValidity() {
    const value = this.value;
    const isEmpty = !value || (Array.isArray(value) && value.length === 0);

    if (this.required && isEmpty) {
      this.internals.setValidity(
        { valueMissing: true },
        "请至少选择一项",
        this
      );
    } else {
      this.internals.setValidity({}, "", this);
    }
  }

  /**
   * 检查表单字段的有效性
   * @returns {boolean} 如果字段有效返回 true，否则返回 false
   */
  checkValidity() {
    this.updateValidity();
    return this.internals.checkValidity();
  }

  /**
   * 报告表单字段的有效性（显示验证提示）
   * @returns {boolean} 如果字段有效返回 true，否则返回 false
   */
  reportValidity() {
    this.updateValidity();
    return this.internals.reportValidity();
  }
}

if (!customElements.get("ea-transfer")) {
  customElements.define("ea-transfer", EaTransfer);
}
