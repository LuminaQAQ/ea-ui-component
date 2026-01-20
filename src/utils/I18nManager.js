class I18nManager {
  configs = {
    locale: "en-US",

    messages: {
      "zh-CN": {
        calendar: {
          selectYear: "年",
          selectMonth: "月",
          prevMonth: "上个月",
          currentMonth: "本月",
          nextMonth: "下个月",
          today: "今天",
          weekDays: ["一", "二", "三", "四", "五", "六", "日"],
          months: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        button: {
          ok: "确定",
          cancel: "取消",
          confirm: "确认",
        },
        pagination: {
          total: "共 {total} 条",
          itemsPerPage: "每页 {size} 条",
          goto: "前往",
          page: "页",
        },
        inputNumber: {
          increase: "增加数值",
          decrease: "减少数值",
        },
        select: {
          placeholder: "请选择",
          noData: "暂无数据",
          noMatch: "无匹配数据",
        },
        dialog: {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        },
        drawer: {
          close: "关闭",
        },
        empty: {
          description: "暂无数据",
        },
      },
      "en-US": {
        calendar: {
          selectYear: "Year",
          selectMonth: "Month",
          prevMonth: "Previous Month",
          currentMonth: "Current Month",
          nextMonth: "Next Month",
          today: "Today",

          weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        button: {
          ok: "OK",
          cancel: "Cancel",
          confirm: "Confirm",
        },
        pagination: {
          total: "Total {total}",
          itemsPerPage: "{size} per page",
          goto: "Goto",
          page: "",
        },
        inputNumber: {
          increase: "Increase value",
          decrease: "Decrease value",
        },
        select: {
          placeholder: "Please select",
          noData: "No Data",
          noMatch: "No Matching Data",
        },
        dialog: {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
        },
        drawer: {
          close: "Close",
        },
        empty: {
          description: "No Data",
        },
      },
    },
  };

  constructor() {}

  /**
   * 格式化成规范的 locale
   * @param {string} locale
   */
  #sanitizeLocale = locale => {
    const ary = locale.split("-") || [];

    return ary.length > 1 ? ary[0] + "-" + ary[1].toUpperCase() : ary[0];
  };

  /**
   * 获取当前语言
   * @returns {string} 当前语言标识符
   */
  get locale() {
    return this.configs.locale;
  }

  /**
   * 设置当前语言
   * @param {'zh-CN' | 'en-US'} locale - 语言标识符，如 'zh-CN', 'en-US'
   */
  set locale(locale) {
    this.configs.locale = this.#sanitizeLocale(locale);
  }

  /**
   * 获取当前语言的所有消息
   */
  get messages() {
    return this.configs.messages[this.locale] || {};
  }

  /**
   * 添加或更新语言包
   * @param {string} locale - 语言标识符
   * @param {object} messages - 语言消息对象
   */
  setMessages(locale, messages) {
    if (!this.configs.messages[locale]) {
      this.configs.messages[locale] = {};
    }

    this.configs.messages[locale] = {
      ...this.configs.messages[locale],
      ...messages,
    };
  }

  /**
   * 获取翻译文本
   * @param {string} key - 翻译键路径，例如 'calendar.prevMonth'
   * @param {object} params - 参数对象，用于替换模板字符串中的变量
   * @returns {string} 翻译后的文本
   */
  t(key, params) {
    const keys = key.split(".");
    let result = this.configs.messages[this.locale];

    for (const k of keys) {
      if (result && typeof result === "object") {
        result = result[k];
      } else {
        result = key;
        break;
      }
    }

    if (typeof result === "string" && params) {
      Object.keys(params).forEach(paramKey => {
        result = result.replace(
          new RegExp(`\\{${paramKey}\\}`, "g"),
          params[paramKey]
        );
      });
    }

    return result || key;
  }
}

const i18nManager = new I18nManager();

export { i18nManager, I18nManager };
