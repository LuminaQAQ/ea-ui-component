import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaDescriptions extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #caption;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #extra;
  /** @type {HTMLElement} */
  #tbody;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "column",
      "title",
      "border",
      "direction",
      "size",
      "label-width",
    ];
  }

  state = this.properties({
    column: {
      type: Number,
      default: 3,
      observer: (newVal) => {},
    },
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#title.textContent = newVal;
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
    size: {
      type: ["large", "default", "small"],
      default: "default",
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    "label-width": {
      type: String,
      default: "",
      observer: (newVal) => {
        this.style.setProperty("--ea-descriptions-label-width", newVal);
      },
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
      ["--" + this.size]: this.size,
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
        <caption class='ea-descriptions__caption' part='caption'>
          <section class='ea-descriptions__title' part='title'>
            <slot name='title'></slot>
          </section>
          <section class='ea-descriptions__extra' part='extra'>
            <slot name='extra'></slot>
          </section>
        </caption>
        <tbody class='ea-descriptions__body' part='body'>
        </tbody>
      </table>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-descriptions");
    this.#caption = this.shadowRoot.querySelector(".ea-descriptions__caption");
    this.#title = this.shadowRoot.querySelector(".ea-descriptions__title");
    this.#extra = this.shadowRoot.querySelector(".ea-descriptions__extra");
    this.#tbody = this.shadowRoot.querySelector(".ea-descriptions__body");
  }

  #handleChildrenDivide = (children, column) => {
    const ary = [];

    children.forEach((item) => {
      const currentRow = ary.length;
      const currentCol = column % ary[currentRow]?.length || 0;
      const option = {
        label: item.label,
        content: item.innerHTML,
        colspan: item.colspan,
        rowspan: item.rowspan,
        align: item.align,
        "label-align": item["label-align"],
        width: item.width,
        "label-width": item["label-width"] || this["label-width"],
        "label-part": item["label-part"],
        "content-part": item["content-part"],
      };

      for (let i = currentRow; i < currentRow + option.rowspan; i++) {
        if (!ary[i]) ary[i] = [];

        if (option.rowspan > 1 && i !== currentRow) {
          ary[i][currentCol] = {
            colspan: 1,
            rowspan: 1,
            placeholder: true,
          };
        }

        for (let j = currentCol; j < currentCol + option.colspan; j++) {
          if (option.colspan > 1 && j !== currentCol) {
            ary[i][j] = {
              colspan: 1,
              rowspan: 1,
              placeholder: true,
            };
          }
        }
      }

      let row = ary.findIndex((item) => item.length < column);
      row = row === -1 ? currentRow : row;
      const col = ary[currentRow].reduce((acc, cur) => {
        return acc + cur.colspan;
      }, 0);

      if (col + option.colspan <= column) {
        ary[row].push(option);
      } else {
        ary[row][currentCol] = option;
      }
    });

    return ary
      .map((row) => row.filter((col) => !col.placeholder))
      .filter((row) => row.length);
  };

  #getVariant = () => {
    if (this.direction === "vertical") {
      return "vertical";
    } else if (this.border) {
      return "border";
    } else {
      return "normal";
    }
  };

  #variantRenderer = {
    normal: (row, index) =>
      EaUtils.EaElement.h(
        "tr",
        "ea-descriptions__tr",
        {
          part: "row",
          style: [
            row.align ? `--ea-descriptions-align: ${row.align};` : "",
          ].join(" "),
        },
        row.map((item, index) =>
          EaUtils.EaElement.h(
            "td",
            "ea-descriptions__td",
            {
              part: "col-cell",
              [item.rowspan > 1 ? "rowspan" : ""]: item.rowspan,
              [item.colspan > 1 ||
              (index === row.length - 1 && row.length < this.column)
                ? "colspan"
                : ""]:
                index === row.length - 1 &&
                row.length < this.column &&
                row.reduce((acc, cur) => {
                  return acc + cur.colspan;
                }, 0) < this.column
                  ? this.column -
                    row.reduce((acc, cur) => {
                      return acc + cur.colspan;
                    }, 0) +
                    (index < 1 ? 1 : index)
                  : item.colspan,
              style: [
                item.width ? `--ea-descriptions-item-width: ${item.width}` : "",
              ],
            },
            [
              EaUtils.EaElement.h(
                "span",
                "ea-descriptions__label",
                {
                  part: `label cell ${item["label-part"]}`,
                  tabindex: 1,
                  style: [
                    item["label-align"] || item.align
                      ? `--ea-descriptions-label-align: ${
                          item["label-align"] || item.align
                        };`
                      : "",
                    item["label-width"]
                      ? `--ea-descriptions-label-width: ${item["label-width"]}`
                      : "",
                  ].join(" "),
                },
                item.label
              ),
              EaUtils.EaElement.h(
                "span",
                "ea-descriptions__content",
                {
                  part: `content cell ${item["content-part"]}`,
                  tabindex: 1,
                  style: [
                    item.align ? `--ea-descriptions-align: ${item.align};` : "",
                  ]
                    .join(" ")
                    .trim(),
                },
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
          part: "row",
        },
        row.map((item, index) =>
          [
            EaUtils.EaElement.h(
              "td",
              "ea-descriptions__label",
              {
                part: `label cell ${item["label-part"]}`,
                tabindex: 1,
                colspan: 1,
                rowspan: item.rowspan,
                style: [
                  item.align ? `--ea-descriptions-align: ${item.align};` : "",
                  item["label-align"] || item.align
                    ? `--ea-descriptions-label-align: ${
                        item["label-align"] || item.align
                      };`
                    : "",
                  item.width
                    ? `--ea-descriptions-item-width: ${item.width}`
                    : "",
                  item["label-width"]
                    ? `--ea-descriptions-label-width: ${item["label-width"]}`
                    : "",
                ].join(" "),
              },
              item.label
            ),
            EaUtils.EaElement.h(
              "td",
              "ea-descriptions__content",
              {
                part: `content cell ${item["content-part"]}`,
                tabindex: 1,
                rowspan: item.rowspan,
                colspan:
                  row.length < 3 && index === row.length - 1
                    ? 6 - (index + 1)
                    : item.colspan || 1,
                style: [
                  item.align ? `--ea-descriptions-align: ${item.align};` : "",
                  item.width
                    ? `--ea-descriptions-item-width: ${item.width}`
                    : "",
                ].join(" "),
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
            part: "row row-label",
          },
          row.map((item, index) =>
            EaUtils.EaElement.h(
              "th",
              "ea-descriptions__label ea-descriptions__th",
              {
                part: `label cell ${item["label-part"]}`,
                tabindex: 1,
                rowspan: 1,
                colspan:
                  row.length < 3 && index === row.length - 1
                    ? 6 - (index + 1)
                    : item.colspan || 1,
                style: [
                  item.align ? `--ea-descriptions-align: ${item.align};` : "",
                  item["label-align"] || item.align
                    ? `--ea-descriptions-label-align: ${
                        item["label-align"] || item.align
                      };`
                    : "",
                  item.width
                    ? `--ea-descriptions-item-width: ${item.width}`
                    : "",
                  item["label-width"]
                    ? `--ea-descriptions-label-width: ${item["label-width"]}`
                    : "",
                ].join(" "),
              },
              item.label
            )
          )
        ),
        EaUtils.EaElement.h(
          "tr",
          "ea-descriptions__tr",
          {
            part: "row row-content",
          },
          row.map((item, index) =>
            EaUtils.EaElement.h(
              "td",
              "ea-descriptions__content ea-descriptions__td",
              {
                part: `content cell ${item["content-part"]}`,
                tabindex: 1,
                rowspan: item.rowspan * 2 - 1,
                colspan:
                  row.length < 3 && index === row.length - 1
                    ? 6 - (index + 1)
                    : item.colspan || 1,
                style: [
                  item.align ? `--ea-descriptions-align: ${item.align};` : "",
                  item.width
                    ? `--ea-descriptions-item-width: ${item.width}`
                    : "",
                ].join(" "),
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

    this.#tbody.innerHTML = this.#handleChildrenDivide(children, this.column)
      .map(this.#variantRenderer[this.#getVariant()])
      .join("");
  }
}

if (!window.customElements.get("ea-descriptions")) {
  window.customElements.define("ea-descriptions", EaDescriptions);
}
