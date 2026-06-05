type Locale = "zh-CN" | "en-US" | string;

type MessageValue = string | string[] | ((params?: Record<string, string | number>) => string);

interface CalendarMessages {
  selectYear: string;
  selectMonth: string;
  prevMonth: string;
  currentMonth: string;
  nextMonth: string;
  today: string;
  weekDays: string[];
  weekDaysFull?: string[];
  months: string[];
  monthsShort?: string[];
}

interface ButtonMessages {
  ok: string;
  cancel: string;
  confirm: string;
}

interface PaginationMessages {
  total: (params?: Record<string, string | number>) => string;
  itemsPerPage: (params?: Record<string, string | number>) => string;
  goto: string;
  page: string;
}

interface InputNumberMessages {
  increase: string;
  decrease: string;
}

interface SelectMessages {
  placeholder: string;
  noData: string;
  noMatch: string;
}

interface DialogMessages {
  confirmButtonText: string;
  cancelButtonText: string;
}

interface DrawerMessages {
  close: string;
}

interface EmptyMessages {
  description: string;
}

interface TransferMessages {
  list1: string;
  list2: string;
  filterPlaceholder: string;
}

interface RateMessages {
  star: (params?: Record<string, string | number>) => string;
}

interface LocaleMessages {
  calendar: CalendarMessages;
  button: ButtonMessages;
  pagination: PaginationMessages;
  inputNumber: InputNumberMessages;
  select: SelectMessages;
  dialog: DialogMessages;
  drawer: DrawerMessages;
  empty: EmptyMessages;
  transfer: TransferMessages;
  rate: RateMessages;
  [key: string]: any;
}

interface I18nConfigs {
  locale: Locale;
  messages: Record<string, LocaleMessages>;
}

class I18nManager {
  configs: I18nConfigs = {
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
          weekDaysFull: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
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
          total: (p) => `共 ${p!.total} 条`,
          itemsPerPage: (p) => `每页 ${p!.size} 条`,
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
        transfer: {
          list1: "列表 1",
          list2: "列表 2",
          filterPlaceholder: "输入关键词",
        },
        rate: {
          star: (p) => `${p!.n} 星`,
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
          weekDaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
          monthsShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        button: {
          ok: "OK",
          cancel: "Cancel",
          confirm: "Confirm",
        },
        pagination: {
          total: (p) => `Total ${p!.total}`,
          itemsPerPage: (p) => `${p!.size} per page`,
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
        transfer: {
          list1: "List 1",
          list2: "List 2",
          filterPlaceholder: "Enter keyword",
        },
        rate: {
          star: (p) => `${p!.n} star(s)`,
        },
      },
    },
  };

  /**
   * 格式化成规范的 locale
   * @param locale
   * @returns 规范化后的 locale 字符串
   */
  #sanitizeLocale = (locale: string): string => {
    if (!locale) return "en-US";

    const ary = locale.split("-") || [];

    return ary.length > 1 ? ary[0] + "-" + ary[1].toUpperCase() : ary[0];
  };

  get locale(): string {
    return this.configs.locale;
  }

  set locale(locale: string) {
    this.configs.locale = this.#sanitizeLocale(locale);
  }

  get messages(): LocaleMessages {
    return this.configs.messages[this.locale] || ({} as LocaleMessages);
  }

  /**
   * 添加或更新语言包
   * @param locale - 语言标识符
   * @param messages - 语言消息对象
   */
  setMessages(locale: string, messages: Partial<LocaleMessages>): void {
    if (!this.configs.messages[locale]) {
      this.configs.messages[locale] = {} as LocaleMessages;
    }

    this.configs.messages[locale] = {
      ...this.configs.messages[locale],
      ...messages,
    };
  }

  /**
   * 获取翻译文本
   * @param key - 翻译键路径，例如 'calendar.prevMonth'
   * @param params - 参数对象，传递给函数模板
   * @returns 翻译后的文本
   */
  t(key: string, params?: Record<string, string | number>): any {
    const keys = key.split(".");
    let result: any = this.configs.messages[this.locale];

    for (const k of keys) {
      if (result && typeof result === "object") {
        result = result[k];
      } else {
        result = key;
        break;
      }
    }

    if (typeof result === "function") {
      return result(params);
    }

    return result || key;
  }
}

const i18nManager = new I18nManager();

export { i18nManager, I18nManager };
export type {
  Locale,
  LocaleMessages,
  CalendarMessages,
  ButtonMessages,
  PaginationMessages,
  InputNumberMessages,
  SelectMessages,
  DialogMessages,
  DrawerMessages,
  EmptyMessages,
  TransferMessages,
  RateMessages,
};
