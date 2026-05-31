import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-steps/index.ts";

describe("EaSteps Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // ==================== EaSteps 基础功能 ====================

  describe("EaSteps 基础功能", () => {
    it("应该正确渲染 ea-steps 组件", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps).toBeDefined();
      expect(steps.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含默认 slot", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.shadowRoot.querySelector("slot")).toBeTruthy();
    });

    it("默认容器不应该有 is-simple 和 is-align-center CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      const stepsContainer =
        steps.shadowRoot.querySelector('[part="container"]');
      expect(stepsContainer.classList.contains("is-simple")).toBe(false);
      expect(stepsContainer.classList.contains("is-align-center")).toBe(false);
    });
  });

  // ==================== EaStep 基础功能 ====================

  describe("EaStep 基础功能", () => {
    it("应该正确渲染 ea-step 组件", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      expect(step).toBeDefined();
      expect(step.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      const parts = [
        "container",
        "head",
        "icon-wrapper",
        "icon",
        "tail",
        "main",
        "heading",
        "description",
        "simple-arrow",
      ];

      for (const part of parts) {
        expect(step.shadowRoot.querySelector(`[part="${part}"]`)).toBeTruthy();
      }
    });

    it("应该包含所有命名 slot", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      const slots = step.shadowRoot.querySelectorAll("slot");
      const slotNames = [...slots].map(s => s.name || "default");

      expect(slotNames).toContain("heading");
      expect(slotNames).toContain("description");
      expect(slotNames).toContain("icon");
      expect(slotNames).toContain("simple-arrow");
    });

    it("默认容器应该有 ea-step 基础类名", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      const stepContainer = step.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("ea-step")).toBe(true);
    });
  });

  // ==================== EaSteps space 属性 ====================

  describe("EaSteps space 属性", () => {
    it("默认 space 应该是 50%", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.space).toBe("50%");
    });

    it("设置 space 属性应该更新 CSS 变量 --ea-step-tail-spacing", async () => {
      const steps = document.createElement("ea-steps");
      steps.space = "200px";
      container.appendChild(steps);

      await waitForRender();

      expect(steps.style.getPropertyValue("--ea-step-tail-spacing")).toBe(
        "200px"
      );
    });

    it("动态修改 space 应该更新 CSS 变量", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      steps.space = "100px";
      await waitForRender();

      expect(steps.style.getPropertyValue("--ea-step-tail-spacing")).toBe(
        "100px"
      );
    });
  });

  // ==================== EaSteps active 属性 ====================

  describe("EaSteps active 属性", () => {
    it("默认 active 应该是 0", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.active).toBe(0);
    });

    it("设置 active 属性应该生效", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 2;
      container.appendChild(steps);

      await waitForRender();

      expect(steps.active).toBe(2);
    });

    it("动态修改 active 应该更新子 step 状态", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
        <ea-step heading="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      steps.active = 1;
      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("finish");
      expect(stepElements[1].getAttribute("status")).toBe("process");
      expect(stepElements[2].getAttribute("status")).toBe("wait");
    });

    it("active=0 时第一个 step 应该是 process 状态", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("process");
      expect(stepElements[1].getAttribute("status")).toBe("wait");
    });

    it("active 超出范围时所有 step 应该是 finish 状态", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 10;
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("finish");
      expect(stepElements[1].getAttribute("status")).toBe("finish");
    });
  });

  // ==================== EaSteps processStatus 属性 ====================

  describe("EaSteps processStatus 属性", () => {
    it("默认 processStatus 应该是 process", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.processStatus).toBe("process");
    });

    it("processStatus 应该影响当前激活 step 的状态", async () => {
      const steps = document.createElement("ea-steps");
      steps.processStatus = "error";
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("error");
    });
  });

  // ==================== EaSteps finishStatus 属性 ====================

  describe("EaSteps finishStatus 属性", () => {
    it("默认 finishStatus 应该是 finish", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.finishStatus).toBe("finish");
    });

    it("finishStatus 应该影响已完成 step 的状态", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 1;
      steps.finishStatus = "success";
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("success");
    });
  });

  // ==================== EaSteps alignCenter 属性 ====================

  describe("EaSteps alignCenter 属性", () => {
    it("默认 alignCenter 应该是 false", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.alignCenter).toBe(false);
    });

    it("设置 alignCenter 应该在容器上添加 is-align-center CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.alignCenter = true;
      container.appendChild(steps);

      await waitForRender();

      const stepsContainer =
        steps.shadowRoot.querySelector('[part="container"]');
      expect(stepsContainer.classList.contains("is-align-center")).toBe(true);
    });

    it("设置 alignCenter 应该在子 step 上设置 align-center attribute", async () => {
      const steps = document.createElement("ea-steps");
      steps.alignCenter = true;
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].hasAttribute("align-center")).toBe(true);
      expect(stepElements[1].hasAttribute("align-center")).toBe(true);
    });

    it("子 step 的容器应该有 is-align-center CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.alignCenter = true;
      steps.innerHTML = `<ea-step heading="Step 1"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      const stepContainer =
        stepElement.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("is-align-center")).toBe(true);
    });

    it("动态关闭 alignCenter 应该移除 CSS 类和 attribute", async () => {
      const steps = document.createElement("ea-steps");
      steps.alignCenter = true;
      steps.innerHTML = `<ea-step heading="Step 1"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      steps.alignCenter = false;
      await waitForRender();

      const stepsContainer =
        steps.shadowRoot.querySelector('[part="container"]');
      expect(stepsContainer.classList.contains("is-align-center")).toBe(false);

      const stepElement = steps.querySelector("ea-step");
      expect(stepElement.hasAttribute("align-center")).toBe(false);
    });
  });

  // ==================== EaSteps simple 属性 ====================

  describe("EaSteps simple 属性", () => {
    it("默认 simple 应该是 false", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.simple).toBe(false);
    });

    it("设置 simple 应该在容器上添加 is-simple CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      container.appendChild(steps);

      await waitForRender();

      const stepsContainer =
        steps.shadowRoot.querySelector('[part="container"]');
      expect(stepsContainer.classList.contains("is-simple")).toBe(true);
    });

    it("设置 simple 应该在子 step 上设置 simple attribute", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].hasAttribute("simple")).toBe(true);
      expect(stepElements[1].hasAttribute("simple")).toBe(true);
    });

    it("simple 模式下子 step 容器应该有 is-simple CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      steps.innerHTML = `<ea-step heading="Step 1"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      const stepContainer =
        stepElement.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("is-simple")).toBe(true);
    });

    it("simple 模式下应该为子 step 添加箭头图标", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      const arrow1 = stepElements[0].querySelector('[slot="simple-arrow"]');
      expect(arrow1).toBeTruthy();
      expect(arrow1.tagName.toLowerCase()).toBe("ea-icon");
      expect(arrow1.getAttribute("name")).toBe("angle-right");
    });

    it("simple 模式下最后一个 step 仍有箭头元素（CSS 控制显隐）", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      const lastArrow = stepElements[1].querySelector('[slot="simple-arrow"]');
      expect(lastArrow).toBeTruthy();
    });

    it("simple 模式下最后一个 step 的容器应该有 is-last CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      const lastContainer =
        stepElements[1].shadowRoot.querySelector('[part="container"]');
      expect(lastContainer.classList.contains("is-last")).toBe(true);
    });

    it("动态关闭 simple 应该移除箭头图标", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      steps.innerHTML = `<ea-step heading="Step 1"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      steps.simple = false;
      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      const arrow = stepElement.querySelector('[slot="simple-arrow"]');
      expect(arrow).toBeFalsy();
    });

    it("动态关闭 simple 应该移除子 step 的 simple attribute 和 CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      steps.innerHTML = `<ea-step heading="Step 1"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      steps.simple = false;
      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      expect(stepElement.hasAttribute("simple")).toBe(false);

      const stepContainer =
        stepElement.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("is-simple")).toBe(false);
    });
  });

  // ==================== EaSteps direction 属性 ====================

  describe("EaSteps direction 属性", () => {
    it("默认 direction 应该是 horizontal", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.direction).toBe("horizontal");
    });

    it("设置 direction=vertical 应该在子 step 上设置 direction attribute", async () => {
      const steps = document.createElement("ea-steps");
      steps.direction = "vertical";
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("direction")).toBe("vertical");
      expect(stepElements[1].getAttribute("direction")).toBe("vertical");
    });

    it("子 step 的容器应该有对应方向的 CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.direction = "vertical";
      steps.innerHTML = `<ea-step heading="Step 1"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      const stepContainer =
        stepElement.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("ea-step--vertical")).toBe(true);
    });

    it("动态修改 direction 应该更新子 step", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `<ea-step heading="Step 1"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      steps.direction = "vertical";
      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      expect(stepElement.getAttribute("direction")).toBe("vertical");

      const stepContainer =
        stepElement.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("ea-step--vertical")).toBe(true);
    });
  });

  // ==================== EaStep heading 属性 ====================

  describe("EaStep heading 属性", () => {
    it("默认 heading 应该是空字符串", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      expect(step.heading).toBe("");
    });

    it("设置 heading 应该更新 heading slot 的文本内容", async () => {
      const step = document.createElement("ea-step");
      step.heading = "Step 1";
      container.appendChild(step);

      await waitForRender();

      const headingSlot = step.shadowRoot.querySelector('slot[name="heading"]');
      expect(headingSlot.textContent).toBe("Step 1");
    });

    it("动态修改 heading 应该更新文本内容", async () => {
      const step = document.createElement("ea-step");
      step.heading = "Step 1";
      container.appendChild(step);

      await waitForRender();

      step.heading = "Updated Step";
      await waitForRender();

      const headingSlot = step.shadowRoot.querySelector('slot[name="heading"]');
      expect(headingSlot.textContent).toBe("Updated Step");
    });
  });

  // ==================== EaStep description 属性 ====================

  describe("EaStep description 属性", () => {
    it("默认 description 应该是空字符串", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      expect(step.description).toBe("");
    });

    it("设置 description 应该更新 description slot 的文本内容", async () => {
      const step = document.createElement("ea-step");
      step.description = "Some description";
      container.appendChild(step);

      await waitForRender();

      const descriptionSlot = step.shadowRoot.querySelector(
        'slot[name="description"]'
      );
      expect(descriptionSlot.textContent).toBe("Some description");
    });

    it("动态修改 description 应该更新文本内容", async () => {
      const step = document.createElement("ea-step");
      step.description = "Old description";
      container.appendChild(step);

      await waitForRender();

      step.description = "New description";
      await waitForRender();

      const descriptionSlot = step.shadowRoot.querySelector(
        'slot[name="description"]'
      );
      expect(descriptionSlot.textContent).toBe("New description");
    });
  });

  // ==================== EaStep icon 属性 ====================

  describe("EaStep icon 属性", () => {
    it("默认 icon 应该是空字符串", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      expect(step.icon).toBe("");
    });

    it("设置 icon 应该更新 ea-icon 的 name 属性", async () => {
      const step = document.createElement("ea-step");
      step.icon = "music";
      container.appendChild(step);

      await waitForRender();

      const iconElement = step.shadowRoot.querySelector('[part="icon"]');
      expect(iconElement.getAttribute("name")).toBe("music");
    });

    it("设置 icon 后容器应该有 is-icon CSS 类", async () => {
      const step = document.createElement("ea-step");
      step.icon = "music";
      container.appendChild(step);

      await waitForRender();

      const stepContainer = step.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("is-icon")).toBe(true);
    });

    it("动态修改 icon 应该更新 ea-icon 的 name", async () => {
      const step = document.createElement("ea-step");
      step.icon = "music";
      container.appendChild(step);

      await waitForRender();

      step.icon = "video";
      await waitForRender();

      const iconElement = step.shadowRoot.querySelector('[part="icon"]');
      expect(iconElement.getAttribute("name")).toBe("video");
    });
  });

  // ==================== EaStep status 属性 ====================

  describe("EaStep status 属性", () => {
    it("默认 status 应该是空字符串", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      expect(step.status).toBe("");
    });

    it("设置 status 应该在容器上添加对应的状态 CSS 类", async () => {
      const statuses = ["wait", "process", "finish", "error", "success"];

      for (const status of statuses) {
        const step = document.createElement("ea-step");
        step.status = status;
        container.appendChild(step);

        await waitForRender();

        const stepContainer =
          step.shadowRoot.querySelector('[part="container"]');
        expect(stepContainer.classList.contains(`is-${status}`)).toBe(true);

        step.remove();
      }
    });

    it("无 icon 时 status=wait 应该显示序号", async () => {
      const step = document.createElement("ea-step");
      step.status = "wait";
      step.index = 2;
      container.appendChild(step);

      await waitForRender();

      const iconElement = step.shadowRoot.querySelector('[part="icon"]');
      expect(iconElement.textContent).toBe("3");
    });

    it("有 icon 时设置 status 不应该覆盖 icon", async () => {
      const step = document.createElement("ea-step");
      step.icon = "music";
      step.status = "finish";
      container.appendChild(step);

      await waitForRender();

      const iconElement = step.shadowRoot.querySelector('[part="icon"]');
      expect(iconElement.getAttribute("name")).toBe("music");
    });
  });

  // ==================== EaStep index 属性 ====================

  describe("EaStep index 属性", () => {
    it("默认 index 应该是 0", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      expect(step.index).toBe(0);
    });

    it("index=0 时容器应该有 is-first CSS 类", async () => {
      const step = document.createElement("ea-step");
      step.index = 0;
      container.appendChild(step);

      await waitForRender();

      const stepContainer = step.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("is-first")).toBe(true);
    });
  });

  // ==================== EaStep direction 属性 ====================

  describe("EaStep direction 属性", () => {
    it("默认 direction 应该是 horizontal", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      expect(step.direction).toBe("horizontal");
    });

    it("设置 direction=vertical 应该在容器上添加 ea-step--vertical CSS 类", async () => {
      const step = document.createElement("ea-step");
      step.direction = "vertical";
      container.appendChild(step);

      await waitForRender();

      const stepContainer = step.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("ea-step--vertical")).toBe(true);
    });

    it("设置 direction=horizontal 应该在容器上添加 ea-step--horizontal CSS 类", async () => {
      const step = document.createElement("ea-step");
      step.direction = "horizontal";
      container.appendChild(step);

      await waitForRender();

      const stepContainer = step.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("ea-step--horizontal")).toBe(
        true
      );
    });
  });

  // ==================== 父子组件联动 ====================

  describe("父子组件联动", () => {
    it("steps 应该正确设置子 step 的 index", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
        <ea-step heading="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].index).toBe(0);
      expect(stepElements[1].index).toBe(1);
      expect(stepElements[2].index).toBe(2);
    });

    it("steps 应该正确设置子 step 的 first 和 last attribute", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
        <ea-step heading="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].hasAttribute("first")).toBe(true);
      expect(stepElements[0].hasAttribute("last")).toBe(false);
      expect(stepElements[1].hasAttribute("first")).toBe(false);
      expect(stepElements[1].hasAttribute("last")).toBe(false);
      expect(stepElements[2].hasAttribute("first")).toBe(false);
      expect(stepElements[2].hasAttribute("last")).toBe(true);
    });

    it("最后一个 step 的容器应该有 is-last CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      const lastContainer =
        stepElements[1].shadowRoot.querySelector('[part="container"]');
      expect(lastContainer.classList.contains("is-last")).toBe(true);

      const firstContainer =
        stepElements[0].shadowRoot.querySelector('[part="container"]');
      expect(firstContainer.classList.contains("is-last")).toBe(false);
    });

    it("steps 应该根据 active 设置子 step 的 status", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 1;
      steps.finishStatus = "finish";
      steps.processStatus = "process";
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
        <ea-step heading="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("finish");
      expect(stepElements[1].getAttribute("status")).toBe("process");
      expect(stepElements[2].getAttribute("status")).toBe("wait");
    });

    it("子 step 的 status 应该在容器上生成对应 CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 1;
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
        <ea-step heading="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      const container0 =
        stepElements[0].shadowRoot.querySelector('[part="container"]');
      const container1 =
        stepElements[1].shadowRoot.querySelector('[part="container"]');
      const container2 =
        stepElements[2].shadowRoot.querySelector('[part="container"]');

      expect(container0.classList.contains("is-finish")).toBe(true);
      expect(container1.classList.contains("is-process")).toBe(true);
      expect(container2.classList.contains("is-wait")).toBe(true);
    });

    it("动态修改 active 应该更新所有子 step 状态和 CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
        <ea-step heading="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      steps.active = 2;
      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("finish");
      expect(stepElements[1].getAttribute("status")).toBe("finish");
      expect(stepElements[2].getAttribute("status")).toBe("process");

      const container2 =
        stepElements[2].shadowRoot.querySelector('[part="container"]');
      expect(container2.classList.contains("is-process")).toBe(true);
    });
  });

  // ==================== step 图标状态更新 ====================

  describe("step 图标状态更新", () => {
    it("无 icon 且 status 非 finishStatus 时应该显示序号", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      const iconElement =
        stepElements[0].shadowRoot.querySelector('[part="icon"]');
      expect(iconElement.textContent).toBe("1");
    });

    it("finishStatus=success 且 step 已完成时应该显示 check 图标", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 1;
      steps.finishStatus = "success";
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      const iconElement =
        stepElements[0].shadowRoot.querySelector('[part="icon"]');
      expect(iconElement.getAttribute("name")).toBe("check");
      expect(iconElement.textContent).toBe("");
    });

    it("finishStatus=finish 且 step 已完成时应该显示 check 图标", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 1;
      steps.finishStatus = "finish";
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      const iconElement =
        stepElements[0].shadowRoot.querySelector('[part="icon"]');
      expect(iconElement.getAttribute("name")).toBe("check");
    });

    it("有自定义 icon 时不应该被 status 覆盖", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 1;
      steps.finishStatus = "finish";
      steps.innerHTML = `
        <ea-step heading="Step 1" icon="star"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      const iconElement = stepElement.shadowRoot.querySelector('[part="icon"]');
      expect(iconElement.getAttribute("name")).toBe("star");
    });
  });

  // ==================== 边界情况 ====================

  describe("边界情况", () => {
    it("空 steps 应该正常渲染", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      expect(steps.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("单个 step 应该同时有 first 和 last attribute", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `<ea-step heading="Only Step"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      expect(stepElement.hasAttribute("first")).toBe(true);
      expect(stepElement.hasAttribute("last")).toBe(true);
    });

    it("单个 step 的容器应该同时有 is-first 和 is-last CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `<ea-step heading="Only Step"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      const stepContainer =
        stepElement.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("is-first")).toBe(true);
      expect(stepContainer.classList.contains("is-last")).toBe(true);
    });

    it("两个 step 时第一个有 first，第二个有 last", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].hasAttribute("first")).toBe(true);
      expect(stepElements[0].hasAttribute("last")).toBe(false);
      expect(stepElements[1].hasAttribute("first")).toBe(false);
      expect(stepElements[1].hasAttribute("last")).toBe(true);
    });

    it("动态添加 step 应该更新所有 step 的 index 和 first/last", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const newStep = document.createElement("ea-step");
      newStep.heading = "Step 3";
      steps.appendChild(newStep);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements.length).toBe(3);
      expect(stepElements[0].index).toBe(0);
      expect(stepElements[1].index).toBe(1);
      expect(stepElements[2].index).toBe(2);
      expect(stepElements[2].hasAttribute("last")).toBe(true);
      expect(stepElements[1].hasAttribute("last")).toBe(false);
    });

    it("动态移除 step 应该更新剩余 step 的 index 和 first/last", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
        <ea-step heading="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      stepElements[1].remove();

      await waitForRender();

      const remainingSteps = steps.querySelectorAll("ea-step");
      expect(remainingSteps.length).toBe(2);
      expect(remainingSteps[0].index).toBe(0);
      expect(remainingSteps[1].index).toBe(1);
      expect(remainingSteps[0].hasAttribute("first")).toBe(true);
      expect(remainingSteps[1].hasAttribute("last")).toBe(true);
    });

    it("active 为负数时所有 step 应该是 wait 状态", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = -1;
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("wait");
      expect(stepElements[1].getAttribute("status")).toBe("wait");
    });

    it("ea-step 不在 ea-steps 内时应该正常渲染", async () => {
      const step = document.createElement("ea-step");
      step.heading = "Standalone Step";
      container.appendChild(step);

      await waitForRender();

      expect(step.shadowRoot).toBeDefined();
      expect(step.heading).toBe("Standalone Step");
    });
  });

  // ==================== 属性动态响应测试 ====================

  describe("属性动态响应", () => {
    it("动态设置 alignCenter 后再添加 step，新 step 也应该有 align-center", async () => {
      const steps = document.createElement("ea-steps");
      steps.alignCenter = true;
      container.appendChild(steps);

      await waitForRender();

      const step = document.createElement("ea-step");
      step.heading = "New Step";
      steps.appendChild(step);

      await waitForRender();

      expect(step.hasAttribute("align-center")).toBe(true);
    });

    it("动态设置 direction 后再添加 step，新 step 也应该有对应 direction", async () => {
      const steps = document.createElement("ea-steps");
      steps.direction = "vertical";
      container.appendChild(steps);

      await waitForRender();

      const step = document.createElement("ea-step");
      step.heading = "New Step";
      steps.appendChild(step);

      await waitForRender();

      expect(step.getAttribute("direction")).toBe("vertical");
    });

    it("从 horizontal 切换到 vertical 再切回 horizontal 应该正确更新", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `<ea-step heading="Step 1"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      steps.direction = "vertical";
      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      expect(stepElement.getAttribute("direction")).toBe("vertical");

      steps.direction = "horizontal";
      await waitForRender();

      expect(stepElement.getAttribute("direction")).toBe("horizontal");
    });

    it("active 从 0 逐步增加到 2 应该正确更新所有 step 状态", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
        <ea-step heading="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      steps.active = 0;
      await waitForRender();

      let stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("process");
      expect(stepElements[1].getAttribute("status")).toBe("wait");
      expect(stepElements[2].getAttribute("status")).toBe("wait");

      steps.active = 1;
      await waitForRender();

      stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("finish");
      expect(stepElements[1].getAttribute("status")).toBe("process");
      expect(stepElements[2].getAttribute("status")).toBe("wait");

      steps.active = 2;
      await waitForRender();

      stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("finish");
      expect(stepElements[1].getAttribute("status")).toBe("finish");
      expect(stepElements[2].getAttribute("status")).toBe("process");
    });
  });

  // ==================== EaSteps 容器 CSS 类测试 ====================

  describe("EaSteps 容器 CSS 类", () => {
    it("默认容器只有 ea-steps 基础类名", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      const stepsContainer =
        steps.shadowRoot.querySelector('[part="container"]');
      expect(stepsContainer.classList.contains("ea-steps")).toBe(true);
      expect(stepsContainer.classList.contains("is-simple")).toBe(false);
      expect(stepsContainer.classList.contains("is-align-center")).toBe(false);
    });

    it("simple=true 时容器应该有 is-simple CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      container.appendChild(steps);

      await waitForRender();

      const stepsContainer =
        steps.shadowRoot.querySelector('[part="container"]');
      expect(stepsContainer.classList.contains("is-simple")).toBe(true);
    });

    it("alignCenter=true 时容器应该有 is-align-center CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.alignCenter = true;
      container.appendChild(steps);

      await waitForRender();

      const stepsContainer =
        steps.shadowRoot.querySelector('[part="container"]');
      expect(stepsContainer.classList.contains("is-align-center")).toBe(true);
    });

    it("simple 和 alignCenter 同时设置时容器应该同时有两个 CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      steps.alignCenter = true;
      container.appendChild(steps);

      await waitForRender();

      const stepsContainer =
        steps.shadowRoot.querySelector('[part="container"]');
      expect(stepsContainer.classList.contains("is-simple")).toBe(true);
      expect(stepsContainer.classList.contains("is-align-center")).toBe(true);
    });
  });

  // ==================== EaStep 容器 CSS 类组合测试 ====================

  describe("EaStep 容器 CSS 类组合", () => {
    it("step 应该同时包含方向、状态、位置等多个 CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 0;
      steps.innerHTML = `
        <ea-step heading="Step 1"></ea-step>
        <ea-step heading="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await waitForRender();

      const stepElements = steps.querySelectorAll("ea-step");
      const container0 =
        stepElements[0].shadowRoot.querySelector('[part="container"]');

      expect(container0.classList.contains("ea-step")).toBe(true);
      expect(container0.classList.contains("ea-step--horizontal")).toBe(true);
      expect(container0.classList.contains("is-process")).toBe(true);
      expect(container0.classList.contains("is-first")).toBe(true);
    });

    it("有 icon 的 step 应该有 is-icon CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `<ea-step heading="Step 1" icon="star"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      const stepContainer =
        stepElement.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("is-icon")).toBe(true);
    });

    it("simple 和 alignCenter 同时设置时 step 应该同时有两个 CSS 类", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      steps.alignCenter = true;
      steps.innerHTML = `<ea-step heading="Step 1"></ea-step>`;
      container.appendChild(steps);

      await waitForRender();

      const stepElement = steps.querySelector("ea-step");
      const stepContainer =
        stepElement.shadowRoot.querySelector('[part="container"]');
      expect(stepContainer.classList.contains("is-simple")).toBe(true);
      expect(stepContainer.classList.contains("is-align-center")).toBe(true);
    });
  });

  // ==================== updateContainerClasslist 方法测试 ====================

  describe("updateContainerClasslist 方法", () => {
    it("EaSteps 的 updateContainerClasslist 应该返回正确的类名字符串", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await waitForRender();

      const result = steps.updateContainerClasslist();
      expect(result).toContain("ea-steps");
    });

    it("EaStep 的 updateContainerClasslist 应该返回正确的类名字符串", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await waitForRender();

      const result = step.updateContainerClasslist();
      expect(result).toContain("ea-step");
      expect(result).toContain("ea-step--horizontal");
    });
  });
});
