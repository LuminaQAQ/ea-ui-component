import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaDescriptions extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #caption;
  /** @type {HTMLElement} */
  #tbody;

  static get observedAttributes() {
    return [...super.observedAttributes, "title", "border", "direction"];
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#caption.textContent = newVal;
      },
    },
    border: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    direction: {
      type: ["horizontal", "vertical"],
      default: "horizontal",
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-descriptions", {
      // ["--" + this.type]: this.type,
      "--border": this.border,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <table class='ea-descriptions' part='container'>
        <caption class='ea-descriptions__title' part='title'></caption>
        <tbody class='ea-descriptions__body' part='body'>
        </tbody>
      </table>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-descriptions");
    this.#caption = this.shadowRoot.querySelector(".ea-descriptions__title");
    this.#tbody = this.shadowRoot.querySelector(".ea-descriptions__body");
  }

  #variantRenderer = {
    normal: (row, index) =>
      EaUtils.EaElement.h(
        "tr",
        "ea-descriptions__tr",
        {
          part: "tr tr-label",
        },
        row.map((item, index) =>
          EaUtils.EaElement.h(
            "td",
            "ea-descriptions__td",
            {
              part: "td",
              rowspan: item.rowspan,
              colspan:
                row.length < 3 && index === row.length - 1
                  ? 3 - row.length + (index + 1)
                  : item.colspan || 1,
            },
            [
              EaUtils.EaElement.h(
                "span",
                "ea-descriptions__label",
                { part: "label" },
                item.label
              ),
              EaUtils.EaElement.h(
                "span",
                "ea-descriptions__content",
                { part: "content" },
                item.content
              ),
            ]
          )
        )
      ),
    border: (row, index) =>
      EaUtils.EaElement.h(
        "tr",
        "ea-descriptions__tr",
        {
          part: "tr tr-label",
        },
        row.map((item, index) =>
          [
            EaUtils.EaElement.h(
              "td",
              "ea-descriptions__label",
              {
                part: "label",
                colspan: 1,
                rowspan: item.rowspan,
              },
              item.label
            ),
            EaUtils.EaElement.h(
              "td",
              "ea-descriptions__content",
              {
                part: "content",
                rowspan: item.rowspan,
                colspan:
                  row.length < 3 && index === row.length - 1
                    ? 6 - (index + 1)
                    : item.colspan || 1,
              },
              item.content
            ),
          ].join("")
        )
      ),
    vertical: (row, i) =>
      [
        EaUtils.EaElement.h(
          "tr",
          "ea-descriptions__tr",
          {
            part: "tr tr-label",
          },
          row.map((item, index) =>
            EaUtils.EaElement.h(
              "th",
              "ea-descriptions__label ea-descriptions__th",
              {
                part: "th",
                rowspan: 1,
                colspan:
                  row.length < 3 && index === row.length - 1
                    ? 6 - (index + 1)
                    : item.colspan || 1,
              },
              item.label
            )
          )
        ),
        EaUtils.EaElement.h(
          "tr",
          "ea-descriptions__tr",
          {
            part: "tr tr-content",
          },
          row.map((item, index) =>
            EaUtils.EaElement.h(
              "td",
              "ea-descriptions__content ea-descriptions__td",
              {
                part: "td",
                rowspan: item.rowspan * 2 - 1,
                colspan:
                  row.length < 3 && index === row.length - 1
                    ? 6 - (index + 1)
                    : item.colspan || 1,
              },
              item.content
            )
          )
        ),
      ].join(""),
  };

  async connectedCallback() {
    super.connectedCallback();

    /** @type {HTMLElement[]} */
    const children = [...this.querySelectorAll("ea-descriptions-item")];
    await Promise.all([
      children.map((item) =>
        EaUtils.EaElement.addAsyncEventListener(
          item,
          "ea-descriptions-item-ready"
        )
      ),
    ]);

    const getVariant = () => {
      if (this.direction === "vertical") {
        return "vertical";
      } else if (this.border) {
        return "border";
      } else {
        return "normal";
      }
    };

    const splitChildren = children.reduce((acc, cur, index) => {
      const currentRow = Math.floor(index / 3);

      if (index % 3 === 0) {
        acc.push([]);
      }

      /**
       * @type {{rowspan: Number, colspan: Number}}
       * 用于获取当前单元格的跨行/跨列数
       */
      const rowspan = acc[acc.length - 2]?.reduce(
        (acc, cur) => {
          return {
            rowspan: Math.max(acc.rowspan, cur.rowspan),
            colspan: acc.rowspan > cur.rowspan ? acc.colspan : cur.colspan,
          };
        },
        {
          rowspan: 1,
          colspan: 1,
        }
      );

      /**
       * @type {Number}
       * 当前列的总列数
       */
      const col = acc[acc.length - 1].reduce((acc, cur) => {
        return acc + cur.colspan;
      }, 0);

      /**
       * 处理该行是否满列
       */
      if (currentRow <= rowspan?.rowspan - 1 && col + rowspan?.colspan >= 3) {
        acc.push([]);
      }

      acc[acc.length - 1].push({
        label: cur.label,
        content: cur.innerHTML,
        colspan: cur.colspan,
        rowspan: cur.rowspan,
      });

      return acc;
    }, []);

    this.#tbody.innerHTML = splitChildren
      .map(this.#variantRenderer[getVariant()])
      .join("");
  }
}

if (!window.customElements.get("ea-descriptions")) {
  window.customElements.define("ea-descriptions", EaDescriptions);
}
