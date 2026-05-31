import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-tag/index";
import { waitForRender } from "./utils/waitForRender";

describe("EaTag", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-tag 组件", async () => {
      const tag = document.createElement("ea-tag");
      tag.textContent = "Test Tag";
      container.appendChild(tag);

      await waitForRender();

      expect(tag).toBeDefined();
      expect(tag.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 close-icon CSS Part", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.shadowRoot.querySelector('[part="close-icon"]')).toBeTruthy();
    });

    it("应该正确显示标签内容", async () => {
      const tag = document.createElement("ea-tag");
      tag.textContent = "Test Tag";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.textContent).toBe("Test Tag");
    });

    it("应该包含 content 元素", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.shadowRoot.querySelector(".ea-tag__content")).toBeTruthy();
    });
  });

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 info", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.variant).toBe("info");
    });

    it("应该支持 variant='primary'", async () => {
      const tag = document.createElement("ea-tag");
      tag.variant = "primary";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.variant).toBe("primary");
    });

    it("应该支持 variant='success'", async () => {
      const tag = document.createElement("ea-tag");
      tag.variant = "success";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.variant).toBe("success");
    });

    it("应该支持 variant='warning'", async () => {
      const tag = document.createElement("ea-tag");
      tag.variant = "warning";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.variant).toBe("warning");
    });

    it("应该支持 variant='danger'", async () => {
      const tag = document.createElement("ea-tag");
      tag.variant = "danger";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.variant).toBe("danger");
    });

    it("variant 变化时应该更新容器类名", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      tag.variant = "success";
      await waitForRender();

      const containerEl = tag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tag--success")).toBe(true);
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const tag = document.createElement("ea-tag");
      tag.size = "large";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.size).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const tag = document.createElement("ea-tag");
      tag.size = "small";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.size).toBe("small");
    });

    it("size 变化时应该更新容器类名", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      tag.size = "large";
      await waitForRender();

      const containerEl = tag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tag--large-size")).toBe(true);
    });
  });

  describe("Effect Attribute", () => {
    it("默认 effect 应该是 light", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.effect).toBe("light");
    });

    it("应该支持 effect='dark'", async () => {
      const tag = document.createElement("ea-tag");
      tag.effect = "dark";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.effect).toBe("dark");
    });

    it("应该支持 effect='plain'", async () => {
      const tag = document.createElement("ea-tag");
      tag.effect = "plain";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.effect).toBe("plain");
    });

    it("effect 变化时应该更新容器类名", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      tag.effect = "dark";
      await waitForRender();

      const containerEl = tag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tag--dark")).toBe(true);
    });
  });

  describe("Closable Attribute", () => {
    it("默认 closable 应该是 false", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.closable).toBe(false);
    });

    it("设置 closable 应该显示关闭图标并添加 is-closable 类", async () => {
      const tag = document.createElement("ea-tag");
      tag.closable = true;
      container.appendChild(tag);

      await waitForRender();

      expect(tag.closable).toBe(true);
      const containerEl = tag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-closable")).toBe(true);
    });

    it("应该触发 ea-remove 事件", async () => {
      const tag = document.createElement("ea-tag");
      tag.closable = true;
      tag.disableTransitions = true;
      tag.textContent = "Test Tag";
      container.appendChild(tag);

      await waitForRender();

      let removeDetail = null;
      tag.addEventListener("ea-remove", e => {
        removeDetail = e.detail;
      });

      const closeIcon = tag.shadowRoot.querySelector('[part="close-icon"]');
      closeIcon.click();

      await waitForRender();

      expect(removeDetail).not.toBeNull();
      expect(removeDetail.text).toBe("Test Tag");
    });

    it("closable 为 false 时关闭图标应该隐藏", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      const containerEl = tag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-closable")).toBe(false);
    });
  });

  describe("Round Attribute", () => {
    it("默认 round 应该是 false", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.round).toBe(false);
    });

    it("设置 round 应该添加 is-round 类", async () => {
      const tag = document.createElement("ea-tag");
      tag.round = true;
      container.appendChild(tag);

      await waitForRender();

      expect(tag.round).toBe(true);
      const containerEl = tag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-round")).toBe(true);
    });
  });

  describe("Color Attribute", () => {
    it("默认 color 应该是空字符串", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.color).toBe("");
    });

    it("应该支持 color 属性", async () => {
      const tag = document.createElement("ea-tag");
      tag.color = "#ff0000";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.color).toBe("#ff0000");
    });

    it("无效 color 值在支持 CSS.supports 的环境中应该输出警告", async () => {
      if (typeof CSS === "undefined" || !CSS.supports) return;

      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const tag = document.createElement("ea-tag");
      tag.color = "not-a-color";
      container.appendChild(tag);

      await waitForRender();

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe("Disable-transitions Attribute", () => {
    it("默认 disableTransitions 应该是 false", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.disableTransitions).toBe(false);
    });

    it("设置 disableTransitions 应该禁用过渡动画", async () => {
      const tag = document.createElement("ea-tag");
      tag.disableTransitions = true;
      container.appendChild(tag);

      await waitForRender();

      expect(tag.disableTransitions).toBe(true);
    });
  });

  describe("Combined Attributes", () => {
    it("应该同时支持 variant + effect + size 组合", async () => {
      const tag = document.createElement("ea-tag");
      tag.variant = "success";
      tag.effect = "dark";
      tag.size = "large";
      container.appendChild(tag);

      await waitForRender();

      const containerEl = tag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tag--success")).toBe(true);
      expect(containerEl.classList.contains("ea-tag--dark")).toBe(true);
      expect(containerEl.classList.contains("ea-tag--large-size")).toBe(true);
    });

    it("应该同时支持 variant + closable + round 组合", async () => {
      const tag = document.createElement("ea-tag");
      tag.variant = "danger";
      tag.closable = true;
      tag.round = true;
      container.appendChild(tag);

      await waitForRender();

      const containerEl = tag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tag--danger")).toBe(true);
      expect(containerEl.classList.contains("is-closable")).toBe(true);
      expect(containerEl.classList.contains("is-round")).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("空 ea-tag 应该正常渲染", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("ea-tag 使用无效 variant 应该保留原始值", async () => {
      const tag = document.createElement("ea-tag");
      tag.setAttribute("variant", "invalid");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.getAttribute("variant")).toBe("invalid");
    });
  });

  describe("Lifecycle", () => {
    it("ea-tag 组件连接后应该正确初始化", async () => {
      const tag = document.createElement("ea-tag");
      tag.textContent = "Test";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("ea-tag 组件断开连接后应该正常移除", () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      tag.remove();

      expect(container.contains(tag)).toBe(false);
    });

    it("动态修改 ea-tag variant 应该生效", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      tag.variant = "success";

      await waitForRender();

      expect(tag.variant).toBe("success");
    });
  });
});

describe("EaCheckTag", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-check-tag 组件", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.textContent = "Check Tag";
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag).toBeDefined();
      expect(checkTag.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      expect(
        checkTag.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该正确显示标签内容", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.textContent = "Check Tag";
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.textContent).toBe("Check Tag");
    });
  });

  describe("Checked Attribute", () => {
    it("默认 checked 应该是 false", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.checked).toBe(false);
    });

    it("设置 checked 应该启用选中状态", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.checked).toBe(true);
    });

    it("点击应该切换 checked 状态", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      containerEl.click();

      await waitForRender();

      expect(checkTag.checked).toBe(true);
    });

    it("应该触发 change 事件", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      let changeDetail = null;
      checkTag.addEventListener("change", e => {
        changeDetail = e.detail;
      });

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      containerEl.click();

      await waitForRender();

      expect(changeDetail).not.toBeNull();
      expect(changeDetail.checked).toBe(true);
    });

    it("再次点击应该取消选中", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      containerEl.click();

      await waitForRender();

      expect(checkTag.checked).toBe(false);
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.disabled).toBe(false);
    });

    it("设置 disabled 应该禁用交互", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.disabled = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.disabled).toBe(true);
    });

    it("disabled 状态下点击不应该切换 checked", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.disabled = true;
      container.appendChild(checkTag);

      await waitForRender();

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      containerEl.click();

      await waitForRender();

      expect(checkTag.checked).toBe(false);
    });

    it("disabled 状态下不应该触发 change 事件", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.disabled = true;
      container.appendChild(checkTag);

      await waitForRender();

      let changeFired = false;
      checkTag.addEventListener("change", () => {
        changeFired = true;
      });

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      containerEl.click();

      await waitForRender();

      expect(changeFired).toBe(false);
    });

    it("disabled 状态下应该添加 is-disabled 类", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.disabled = true;
      container.appendChild(checkTag);

      await waitForRender();

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 primary", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.variant).toBe("primary");
    });

    it("应该支持 variant='primary'", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.variant = "primary";
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.variant).toBe("primary");
    });

    it("应该支持 variant='success'", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.variant = "success";
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.variant).toBe("success");
    });

    it("应该支持 variant='warning'", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.variant = "warning";
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.variant).toBe("warning");
    });

    it("应该支持 variant='danger'", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.variant = "danger";
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.variant).toBe("danger");
    });

    it("checked 为 true 时 variant 应该添加对应修饰符类", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.variant = "success";
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-check-tag--success")).toBe(
        true
      );
    });

    it("checked 为 false 时不应该添加 variant 修饰符类", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.variant = "success";
      container.appendChild(checkTag);

      await waitForRender();

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-check-tag--success")).toBe(
        false
      );
    });
  });

  describe("Edge Cases", () => {
    it("空 ea-check-tag 应该正常渲染", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      expect(
        checkTag.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("ea-check-tag 使用无效 variant 应该保留原始值", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.setAttribute("variant", "invalid");
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.getAttribute("variant")).toBe("invalid");
    });
  });

  describe("Lifecycle", () => {
    it("ea-check-tag 组件连接后应该正确初始化", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.textContent = "Test";
      container.appendChild(checkTag);

      await waitForRender();

      expect(
        checkTag.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("ea-check-tag 组件断开连接后应该正常移除", () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      checkTag.remove();

      expect(container.contains(checkTag)).toBe(false);
    });

    it("动态修改 ea-check-tag checked 应该生效", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      checkTag.checked = true;

      await waitForRender();

      expect(checkTag.checked).toBe(true);
    });

    it("动态修改 ea-check-tag disabled 应该生效", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      checkTag.disabled = true;

      await waitForRender();

      expect(checkTag.disabled).toBe(true);
    });
  });
});

describe("Combined Tests", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it("应该同时渲染多个 ea-tag", async () => {
    const variants = ["primary", "success", "info", "warning", "danger"];

    variants.forEach(variant => {
      const tag = document.createElement("ea-tag");
      tag.variant = variant;
      tag.textContent = variant;
      container.appendChild(tag);
    });

    await waitForRender();

    const tags = container.querySelectorAll("ea-tag");
    expect(tags.length).toBe(5);
  });

  it("应该同时渲染多个 ea-check-tag", async () => {
    const variants = ["primary", "success", "info", "warning", "danger"];

    variants.forEach(variant => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.variant = variant;
      checkTag.checked = true;
      checkTag.textContent = variant;
      container.appendChild(checkTag);
    });

    await waitForRender();

    const checkTags = container.querySelectorAll("ea-check-tag");
    expect(checkTags.length).toBe(5);
  });
});
