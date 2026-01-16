import Base from "@components/Base.js";

export class EaTableColumn extends Base {
  static get observedAttributes() {
    return [...super.observedAttributes, "type"];
  }

  state = this.properties({
    type: {
      type: ["selection", "index"],
      default: "",
      /** @param {"selection" | "index"} newVal */
      observer: newVal => {
        if (newVal === "selection" && !customElements.get("ea-checkbox")) {
          import("@components/ea-checkbox/index.js");
        }
      },
    },
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
    colspan: {
      type: Number,
      default: () => this.querySelectorAll("ea-table-column").length || 1,
    },
    width: {
      type: String,
      default: "",
    },
    sortable: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: String,
      default: () =>
        this.hasAttribute("fixed")
          ? this.getAttribute("fixed") || "left"
          : null,
    },
  });

  propState = this.properties({
    option: {
      props: true,
      type: Object,
      default: {},
    },
  });

  funcStates = this.properties({
    getColumnTree: {
      props: true,
      type: Object,
      default: () => {
        const columns = [...this.querySelectorAll("& > ea-table-column")];
        const table = this.closest("ea-table");
        const exclude = ["prop", "label", "width", "fixed"];
        let template = null;

        const getDepth = (el, root) => {
          let depth = 0;

          if (el.parentElement === root) {
            depth = 0;
          } else {
            depth = getDepth(el.parentElement, root) + 1;
          }

          return depth;
        };

        if (columns.length) {
          template = columns.map(columns => columns.getColumnTree);
        } else if (this.innerHTML) {
          const tpl = document.createElement("template");
          tpl.innerHTML = this.innerHTML;
          template = tpl;
        } else {
          template = null;
        }

        return {
          label: this.label,
          prop: this.prop,
          type: this.type,
          colspan: this.colspan,
          width: this.width,
          sortable: this.sortable,
          fixed: this.fixed,

          depth: getDepth(this, table),

          props: [...this.attributes].filter(
            attr => !exclude.includes(attr.name)
          ),

          template,
        };
      },
    },
  });

  constructor() {
    super();
  }

  $render() {
    if (this.innerHTML) {
      const template = document.createElement("template");
      template.innerHTML = this.innerHTML;
      this.template = template;
    } else {
      this.template = null;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // console.log("ready");

    // const columns = [...this.querySelectorAll("& > ea-table-column")];
    // const exclude = ["prop", "label", "width", "fixed"];
    // let template = null;

    // if (columns.length) {
    //   template = columns.map(columns => columns.option);
    // } else if (this.innerHTML) {
    //   const tpl = document.createElement("template");
    //   tpl.innerHTML = this.innerHTML;
    //   template = tpl;
    // } else {
    //   template = null;
    // }

    // this.$render();

    // this.option = {
    //   label: this.label,
    //   prop: this.prop,
    //   type: this.type,
    //   colspan: this.colspan,
    //   width: this.width,
    //   sortable: this.sortable,
    //   fixed: this.fixed,

    //   props: [...this.attributes].filter(attr => !exclude.includes(attr.name)),

    //   template,
    // };
  }
}

if (!window.customElements.get("ea-table-column")) {
  window.customElements.define("ea-table-column", EaTableColumn);
}
