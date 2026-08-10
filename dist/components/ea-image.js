import { E as g } from "../core/EaBase.ts.js";
import { a, C as m, q as l, p as v, l as u } from "../core/decorator.js";
import { E as d } from "../utils/Enum.ts.js";
import { s as _ } from "../css/ea-image.style.js";
import { c as b } from "../utils/bem.ts.js";
class f extends Event {
  constructor() {
    super("load", { bubbles: !0, composed: !0 });
  }
}
class w extends Event {
  constructor() {
    super("error", { bubbles: !0, composed: !0 });
  }
}
var P = Object.defineProperty, C = Object.getOwnPropertyDescriptor, r = (e, s, n, i) => {
  for (var o = i > 1 ? void 0 : i ? C(s, n) : s, p = e.length - 1, c; p >= 0; p--)
    (c = e[p]) && (o = (i ? c(s, n, o) : c(o)) || o);
  return i && o && P(s, n, o), o;
};
const y = "ea-image", h = b(y);
let t = class extends g {
  constructor() {
    super(...arguments), this._lazyObserver = null, this._states = {
      imageStatus: "error"
    }, this.src = "", this.width = "", this.height = "", this.fit = "", this.alt = "", this.loading = "eager", this.referrerpolicy = "", this.crossorigin = "", this.lazy = !1, this.preview = !1, this.hideOnClickModal = !1, this.zIndex = 2e3, this.initialIndex = 0, this.closeOnPressEscape = !0, this.infinite = !0, this.zoomRate = 1.2, this.scale = 1, this.minScale = 0.2, this.maxScale = 7, this.showProgress = !1, this.previewSrcList = [];
  }
  // ==================== 方法 ====================
  updateContainerClasslist() {
    const e = h({ [this._states.imageStatus]: !0 }, {});
    return this._container && (this._container.className = e), e;
  }
  /**
   * 处理插槽内容变化，有内容时添加 slot 属性以转发到 preview
   * @param slotElement - 插槽元素
   * @param slotName - 插槽名称
   */
  _handleSlotChange(e, s) {
    e.assignedNodes({ flatten: !0 }).some(
      (o) => {
        var p;
        return o.nodeType === Node.ELEMENT_NODE || o.nodeType === Node.TEXT_NODE && ((p = o.textContent) == null ? void 0 : p.trim());
      }
    ) ? e.setAttribute("slot", s) : e.removeAttribute("slot");
  }
  /**
   * 更新 preview 子组件的属性
   * @param prop - 属性名
   * @param value - 属性值
   */
  async _updatePreviewProperty(e, s) {
    this.preview && (await customElements.whenDefined("ea-image-preview"), this._imagePreview[e] = s);
  }
  /**
   * 加载图片
   * @param src - 图片地址
   */
  _loadImage(e) {
    this._states.imageStatus = "loading", this.updateContainerClasslist();
    const s = new Image();
    s.onload = () => {
      this._image.setAttribute("src", e), this._states.imageStatus = "success", this.updateContainerClasslist(), this.dispatchEvent(new f());
    }, s.onerror = () => {
      this._states.imageStatus = "error", this.updateContainerClasslist(), this.dispatchEvent(new w());
    }, this.lazy ? this._setupLazyLoad(s) : s.src = e;
  }
  /**
   * 设置懒加载观察器
   * @param img - 图片元素
   */
  _setupLazyLoad(e) {
    var s;
    (s = this._lazyObserver) == null || s.disconnect(), this._lazyObserver = new IntersectionObserver((n) => {
      var i;
      n[0].isIntersecting && ((i = this._lazyObserver) == null || i.disconnect(), this._lazyObserver = null, e.src = this.src);
    }), this._lazyObserver.observe(this);
  }
  /** 切换预览图片到指定索引 */
  setActiveItem(e) {
    this.preview && this._imagePreview.setActiveItem(e);
  }
  /** 重置图片预览状态 */
  reset() {
    this.preview && this._imagePreview.reset();
  }
  /** 显示图片预览 */
  showPreview() {
    this._imagePreview.visible = !0;
  }
  html() {
    return `
      <div class="${h()}" part="container">
        <img class="${h.e("image")}" part="image" />
        <section class="${h.e("error")}" part="error" role="alert">
          <slot name="error">FAILED</slot>
        </section>
        <section class="${h.e("placeholder")}" part="placeholder">
          <slot name="placeholder"></slot>
        </section>
      </div>
      <ea-image-preview class="ea-image-preview" part="preview">
        <slot name="progress"></slot>
        <slot name="toolbar"></slot>
      </ea-image-preview>
    `;
  }
  _handleImageClick() {
    this.preview && this.showPreview();
  }
  _handleProgressSlotChange() {
    this._handleSlotChange(this._progressSlot, "progress");
  }
  _handleToolbarSlotChange() {
    this._handleSlotChange(this._toolbarSlot, "toolbar");
  }
  // ==================== 生命周期 ====================
  $mount() {
    var e;
    (e = this._abortController) == null || e.abort(), this._abortController = new AbortController(), this._image.addEventListener(
      "load",
      (s) => {
        s.stopPropagation();
      },
      { signal: this._abortController.signal }
    ), this._image.addEventListener(
      "error",
      (s) => {
        s.stopPropagation();
      },
      { signal: this._abortController.signal }
    ), this.updateContainerClasslist();
  }
  $beforeUnmount() {
    var e, s;
    (e = this._abortController) == null || e.abort(), (s = this._lazyObserver) == null || s.disconnect(), this._lazyObserver = null;
  }
};
r([
  l(".ea-image")
], t.prototype, "_container", 2);
r([
  l(".ea-image__image")
], t.prototype, "_image", 2);
r([
  l(".ea-image__error")
], t.prototype, "_error", 2);
r([
  l(".ea-image__placeholder")
], t.prototype, "_placeholder", 2);
r([
  l(".ea-image-preview")
], t.prototype, "_imagePreview", 2);
r([
  l('slot[name="progress"]')
], t.prototype, "_progressSlot", 2);
r([
  l('slot[name="toolbar"]')
], t.prototype, "_toolbarSlot", 2);
r([
  a({
    type: String,
    default: "",
    async observer(e) {
      this._loadImage(e);
    }
  })
], t.prototype, "src", 2);
r([
  a({
    type: String,
    default: "",
    observer(e) {
      if (!CSS.supports("width", e))
        return console.warn(
          `[EaImage] The width value ${e} is not supported.`
        );
      this.style.setProperty("--ea-image-width", e);
    }
  })
], t.prototype, "width", 2);
r([
  a({
    type: String,
    default: "",
    observer(e) {
      if (!CSS.supports("height", e))
        return console.warn(
          `[EaImage] The height value ${e} is not supported.`
        );
      this.style.setProperty("--ea-image-height", e);
    }
  })
], t.prototype, "height", 2);
r([
  a({
    type: d(["", "fill", "contain", "cover", "none", "scale-down"]),
    default: "",
    observer(e) {
      if (!CSS.supports("object-fit", e))
        return console.warn(
          `[EaImage] The object-fit value ${e} is not supported.`
        );
      this.style.setProperty("--ea-image-fit", e);
    }
  })
], t.prototype, "fit", 2);
r([
  a({
    type: String,
    default: "",
    observer(e) {
      this._image.alt = e;
    }
  })
], t.prototype, "alt", 2);
r([
  a({
    type: d(["lazy", "eager"]),
    default: "eager",
    observer(e) {
      this._image.setAttribute("loading", e);
    }
  })
], t.prototype, "loading", 2);
r([
  a({
    type: String,
    default: "",
    observer(e) {
      this._image.setAttribute("referrerpolicy", e);
    }
  })
], t.prototype, "referrerpolicy", 2);
r([
  a({
    type: String,
    default: "",
    observer(e) {
      this._image.setAttribute("crossorigin", e);
    }
  })
], t.prototype, "crossorigin", 2);
r([
  a({
    type: Boolean,
    default: !1
  })
], t.prototype, "lazy", 2);
r([
  a({
    type: Boolean,
    default: !1,
    async observer(e) {
      e && await import("./ea-image-preview.js");
    }
  })
], t.prototype, "preview", 2);
r([
  a({
    type: Boolean,
    default: !1,
    async observer(e) {
      await this._updatePreviewProperty("closeOnClickModal", !e);
    }
  })
], t.prototype, "hideOnClickModal", 2);
r([
  a({
    type: Number,
    default: 2e3,
    async observer(e) {
      await this._updatePreviewProperty("zIndex", String(e));
    }
  })
], t.prototype, "zIndex", 2);
r([
  a({
    type: Number,
    default: 0,
    async observer(e) {
      await this._updatePreviewProperty("initialIndex", e);
    }
  })
], t.prototype, "initialIndex", 2);
r([
  a({
    type: Boolean,
    default: !0,
    async observer(e) {
      await this._updatePreviewProperty("closeOnPressEscape", e);
    }
  })
], t.prototype, "closeOnPressEscape", 2);
r([
  a({
    type: Boolean,
    default: !0,
    async observer(e) {
      await this._updatePreviewProperty("infinite", e);
    }
  })
], t.prototype, "infinite", 2);
r([
  a({
    type: Number,
    default: 1.2,
    async observer(e) {
      await this._updatePreviewProperty("zoomRate", e);
    }
  })
], t.prototype, "zoomRate", 2);
r([
  a({
    type: Number,
    default: 1,
    async observer(e) {
      await this._updatePreviewProperty("scale", e);
    }
  })
], t.prototype, "scale", 2);
r([
  a({
    type: Number,
    default: 0.2,
    async observer(e) {
      await this._updatePreviewProperty("minScale", e);
    }
  })
], t.prototype, "minScale", 2);
r([
  a({
    type: Number,
    default: 7,
    async observer(e) {
      await this._updatePreviewProperty("maxScale", e);
    }
  })
], t.prototype, "maxScale", 2);
r([
  a({
    type: Boolean,
    default: !1,
    async observer(e) {
      await this._updatePreviewProperty("showProgress", e);
    }
  })
], t.prototype, "showProgress", 2);
r([
  v({
    type: Array,
    default: [],
    async observer(e) {
      if (!this.preview)
        return console.warn("[EaImage] Preview is not enabled.");
      await customElements.whenDefined("ea-image-preview"), this._imagePreview.urlList = e;
    }
  })
], t.prototype, "previewSrcList", 2);
r([
  u("click", ".ea-image")
], t.prototype, "_handleImageClick", 1);
r([
  u("slotchange", 'slot[name="progress"]')
], t.prototype, "_handleProgressSlotChange", 1);
r([
  u("slotchange", 'slot[name="toolbar"]')
], t.prototype, "_handleToolbarSlotChange", 1);
t = r([
  m(y, { styles: [_] })
], t);
export {
  t as EaImage
};
