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
              [item.rowspan > 1 ? "rowspan" : ""]: item.rowspan,
              [item.colspan > 1 ? "colspan" : ""]: item.colspan,
              // rowspan: item.rowspan,
              // colspan:
              //   row.length < 3 && index === row.length - 1
              //     ? 3 - row.length + (index + 1)
              //     : item.colspan || 1,
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

    const splitChildren = (children) => {
      const ary = [];

      children.forEach((item, i) => {
        const currentRow = ary.length;
        const currentCol = 3 % ary[currentRow]?.length || 0;
        const option = {
          label: item.label,
          content: item.innerHTML,
          colspan: item.colspan,
          rowspan: item.rowspan,
        };

        // TODO: 可能是这个循环有问题，会导致多填充占位符
        for (let i = currentRow; i < currentRow + option.rowspan; i++) {
          if (!ary[i]) ary[i] = [];

          ary[i][currentCol] = {
            colspan: 1,
            rowspan: 1,
            placeholder: true,
          };

          for (let j = currentCol; j < currentCol + option.colspan; j++) {
            ary[i][j] = {
              colspan: 1,
              rowspan: 1,
              placeholder: true,
            };
          }
        }

        let row = ary.findIndex((item) => item.length < 3);
        row = row === -1 ? currentRow : row;
        const col = ary[currentRow].reduce((acc, cur) => {
          return acc + cur.colspan;
        }, 0);

        if (this.title === "Without border") {
          // console.log(currentRow, currentCol, row, col);
        }

        if (col + option.colspan <= 3) {
          ary[row].push(option);
        } else {
          ary[row][currentCol] = option;
        }
      });

      return ary;
    };

    if (this.title === "Without border") {
      // console.log(
      //   splitChildren(children)
      //     .map((row) => row.filter((col) => !col.placeholder))
      //     .filter((row) => row.length)
      // );
      console.log(splitChildren(children));
      // console.log(
      //   splitChildren(children)
      //     .map((row) => row.filter((col) => !col.placeholder))
      //     .filter((row) => row.length)
      // );
    }

    this.#tbody.innerHTML = splitChildren(children)
      .map((row) => row.filter((col) => !col.placeholder))
      .filter((row) => row.length)
      .map(this.#variantRenderer[getVariant()])
      .join("");
  }
}

if (!window.customElements.get("ea-descriptions")) {
  window.customElements.define("ea-descriptions", EaDescriptions);
}
