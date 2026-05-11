import stylesheet from "./index.css?inline";
import faStylesheet from "@fortawesome/fontawesome-free/css/all.min.css?inline";
import variable from "../../themes/variables.scss?inline";
import host from "./host.scss?inline";
import { StylesheetCache } from "@/stores/stylesheet-cache.js";

// 动态注入 Font Awesome 到 document head（只执行一次）
const injectFontAwesome = () => {
  if (document.querySelector("style[data-ea-icon-fontawesome]")) return;

  const style = document.createElement("style");
  style.textContent = faStylesheet;
  style.setAttribute("data-ea-icon-fontawesome", "");
  document.head.appendChild(style);
};

export class EaIcon extends HTMLElement {
  /** @type {HTMLElement} */
  #container;

  static observedAttributes = [
    "name",
    "family",
    "variant",
    "color",
    "size",
    "spin",
  ];

  constructor() {
    super();

    injectFontAwesome();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <i class="ea-icon" part="container">
        <slot></slot>
      </i>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-icon");
  }

  setAttr(attrName, value) {
    if (value) {
      this.setAttribute(attrName, value);
    } else {
      this.removeAttribute(attrName);
    }
  }

  // ------- name 图标名称 -------
  // #region
  get name() {
    return this.getAttribute("name") || "";
  }

  set name(value) {
    this.setAttr("name", value);
  }
  // #endregion
  // ------- end -------

  // ------- family 图标家族 -------
  // #region
  get family() {
    return this.getAttribute("family") || "classic";
  }

  set family(value) {
    this.setAttr("family", value);
  }
  // #endregion
  // ------- end -------

  // ------- variant 图标变体 -------
  // #region
  get variant() {
    return this.getAttribute("variant") || "solid";
  }

  set variant(value) {
    this.setAttr("variant", value);
  }
  // #endregion
  // ------- end -------

  // ------- color 颜色 -------
  // #region
  get color() {
    return this.getAttribute("color") || "";
  }

  set color(value) {
    this.setAttr("color", value);
  }
  // #endregion
  // ------- end -------

  // ------- size 大小 -------
  // #region
  get size() {
    return this.getAttribute("size") || "";
  }

  set size(value) {
    if (value !== "14" || value !== 14) this.setAttr("size", value);
  }
  // #endregion
  // ------- end -------

  // ------- spin 旋转动画 -------
  // #region
  get spin() {
    return this.getAttribute("spin") !== null;
  }

  set spin(value) {
    this.toggleAttribute("spin", value);
  }
  // #endregion
  // ------- end -------

  // 获取 Font Awesome 类名
  #getFontAwesomeClass(name, family, variant, spin) {
    if (!name) return "ea-icon";

    // 如果用户已经提供了完整的 Font Awesome 类名，直接使用
    if (name.startsWith("fa-")) {
      return `ea-icon ${name}${spin ? " fa-spin" : ""}`;
    }

    // family 映射
    const familyMap = {
      classic: "fa-classic",
      sharp: "fa-sharp",
      brands: "fa-brands",
    };

    // variant 映射
    const variantMap = {
      solid: "fa-solid",
      regular: "fa-regular",
      light: "fa-light",
      thin: "fa-thin",
      duotone: "fa-duotone",
    };

    const faFamily = familyMap[family];
    const faVariant = variantMap[variant] || "fa-solid";
    const spinClass = spin ? " fa-spin" : "";

    // 使用对象映射替代条件判断
    const classMap = {
      brands: `ea-icon fa-brands fa-${name}${spinClass}`,
      classic: `ea-icon ${faVariant} fa-${name}${spinClass}`,
      sharp: `ea-icon ${faFamily} ${faVariant} fa-${name}${spinClass}`,
    };

    return classMap[family] || classMap.classic;
  }

  connectedCallback() {
    const sheet = StylesheetCache.getOrCreate(stylesheet);
    const variableSheet = StylesheetCache.getOrCreate(variable);
    const hostSheet = StylesheetCache.getOrCreate(host);
    const faStylesSheet = StylesheetCache.getOrCreate(faStylesheet);

    this.shadowRoot.adoptedStyleSheets = [
      sheet,
      variableSheet,
      faStylesSheet,
      hostSheet,
    ];

    this.#updateIconClass();
  }

  /**
   * 更新图标类名
   */
  #updateIconClass() {
    const name = this.name;
    const family = this.family;
    const variant = this.variant;
    const spin = this.spin;
    this.#container.className = this.#getFontAwesomeClass(
      name,
      family,
      variant,
      spin
    );
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;

    if (name === "name" || name === "family" || name === "variant") {
      this.#updateIconClass();
    } else if (name === "color") {
      this.style.setProperty("--ea-icon-color", newVal);
    } else if (name === "size") {
      const sizeMap = {
        large: "14px",
        medium: "12px",
        small: "10px",
      };
      const sizeValue = sizeMap[newVal] || (newVal ? `${newVal}px` : "1rem");
      this.style.setProperty("--ea-icon-size", sizeValue);
    } else if (name === "spin") {
      this.#container.classList.toggle("fa-spin", newVal !== null);
    }
  }
}

if (!window.customElements.get("ea-icon")) {
  window.customElements.define("ea-icon", EaIcon);
}
