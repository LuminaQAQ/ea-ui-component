import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-steps 组件及其子组件
import "../components/ea-steps/index.js";

describe("EaSteps Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaSteps 基本功能测试
   */
  describe("EaSteps Basic Functionality", () => {
    it("应该正确渲染 ea-steps 组件", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps).toBeDefined();
      expect(steps.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含默认 slot", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps.shadowRoot.querySelector("slot")).toBeTruthy();
    });
  });

  /**
   * EaStep 基本功能测试
   */
  describe("EaStep Basic Functionality", () => {
    it("应该正确渲染 ea-step 组件", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step).toBeDefined();
      expect(step.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 head CSS Part", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="head"]')).toBeTruthy();
    });

    it("应该包含 icon-wrapper CSS Part", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="icon-wrapper"]')).toBeTruthy();
    });

    it("应该包含 icon CSS Part", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="icon"]')).toBeTruthy();
    });

    it("应该包含 tail CSS Part", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="tail"]')).toBeTruthy();
    });

    it("应该包含 main CSS Part", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="main"]')).toBeTruthy();
    });

    it("应该包含 title CSS Part", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
    });

    it("应该包含 description CSS Part", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="description"]')).toBeTruthy();
    });

    it("应该包含 simple-arrow CSS Part", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="simple-arrow"]')).toBeTruthy();
    });
  });

  /**
   * EaSteps Space 属性测试
   */
  describe("EaSteps Space Attribute", () => {
    it("默认 space 应该是 50%", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps.space).toBe("50%");
    });

    it("应该支持 space 属性", async () => {
      const steps = document.createElement("ea-steps");
      steps.space = "200px";
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps.space).toBe("200px");
    });

    it("应该支持不同的 space 值", async () => {
      const spaces = ["100px", "200px", "50%", "100%"];

      for (const space of spaces) {
        const steps = document.createElement("ea-steps");
        steps.space = space;
        expect(steps.space).toBe(space);
      }
    });
  });

  /**
   * EaSteps Active 属性测试
   */
  describe("EaSteps Active Attribute", () => {
    it("默认 active 应该是 0", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps.active).toBe(0);
    });

    it("应该支持 active 属性", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 2;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps.active).toBe(2);
    });

    it("应该支持不同的 active 值", async () => {
      const actives = [0, 1, 2, 3, 4];

      for (const active of actives) {
        const steps = document.createElement("ea-steps");
        steps.active = active;
        expect(steps.active).toBe(active);
      }
    });
  });

  /**
   * EaSteps Process-status 属性测试
   */
  describe("EaSteps Process-status Attribute", () => {
    it("默认 process-status 应该是 process", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps["process-status"]).toBe("process");
    });

    it("应该支持 process-status='wait'", async () => {
      const steps = document.createElement("ea-steps");
      steps["process-status"] = "wait";
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps["process-status"]).toBe("wait");
    });

    it("应该支持 process-status='error'", async () => {
      const steps = document.createElement("ea-steps");
      steps["process-status"] = "error";
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps["process-status"]).toBe("error");
    });

    it("应该支持 process-status='success'", async () => {
      const steps = document.createElement("ea-steps");
      steps["process-status"] = "success";
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps["process-status"]).toBe("success");
    });
  });

  /**
   * EaSteps Finish-status 属性测试
   */
  describe("EaSteps Finish-status Attribute", () => {
    it("默认 finish-status 应该是 finish", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps["finish-status"]).toBe("finish");
    });

    it("应该支持 finish-status='success'", async () => {
      const steps = document.createElement("ea-steps");
      steps["finish-status"] = "success";
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps["finish-status"]).toBe("success");
    });

    it("应该支持 finish-status='error'", async () => {
      const steps = document.createElement("ea-steps");
      steps["finish-status"] = "error";
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps["finish-status"]).toBe("error");
    });
  });

  /**
   * EaSteps Align-center 属性测试
   */
  describe("EaSteps Align-center Attribute", () => {
    it("默认 align-center 应该是 false", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = steps["align-center"];
      expect(value === false || value === null).toBe(true);
    });

    it("设置 align-center 属性应该启用居中对齐", async () => {
      const steps = document.createElement("ea-steps");
      steps["align-center"] = true;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps["align-center"]).toBe(true);
    });
  });

  /**
   * EaSteps Simple 属性测试
   */
  describe("EaSteps Simple Attribute", () => {
    it("默认 simple 应该是 false", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = steps.simple;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 simple 属性应该启用简洁模式", async () => {
      const steps = document.createElement("ea-steps");
      steps.simple = true;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps.simple).toBe(true);
    });
  });

  /**
   * EaStep Title 属性测试
   */
  describe("EaStep Title Attribute", () => {
    it("默认 title 应该是空字符串", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.title).toBe("");
    });

    it("应该支持 title 属性", async () => {
      const step = document.createElement("ea-step");
      step.title = "Step 1";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.title).toBe("Step 1");
    });

    it("应该支持不同的 title 值", async () => {
      const titles = ["Step 1", "Step 2", "Done", "Processing"];

      for (const title of titles) {
        const step = document.createElement("ea-step");
        step.title = title;
        expect(step.title).toBe(title);
      }
    });
  });

  /**
   * EaStep Description 属性测试
   */
  describe("EaStep Description Attribute", () => {
    it("默认 description 应该是空字符串", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.description).toBe("");
    });

    it("应该支持 description 属性", async () => {
      const step = document.createElement("ea-step");
      step.description = "Some description";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.description).toBe("Some description");
    });
  });

  /**
   * EaStep Icon 属性测试
   */
  describe("EaStep Icon Attribute", () => {
    it("默认 icon 应该是空字符串", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.icon).toBe("");
    });

    it("应该支持 icon 属性", async () => {
      const step = document.createElement("ea-step");
      step.icon = "music";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.icon).toBe("music");
    });

    it("应该支持不同的 icon 值", async () => {
      const icons = ["music", "video", "camera", "check"];

      for (const icon of icons) {
        const step = document.createElement("ea-step");
        step.icon = icon;
        expect(step.icon).toBe(icon);
      }
    });
  });

  /**
   * EaStep Status 属性测试
   */
  describe("EaStep Status Attribute", () => {
    it("默认 status 应该是空字符串", async () => {
      const step = document.createElement("ea-step");
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.status).toBe("");
    });

    it("应该支持 status='wait'", async () => {
      const step = document.createElement("ea-step");
      step.status = "wait";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.status).toBe("wait");
    });

    it("应该支持 status='process'", async () => {
      const step = document.createElement("ea-step");
      step.status = "process";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.status).toBe("process");
    });

    it("应该支持 status='finish'", async () => {
      const step = document.createElement("ea-step");
      step.status = "finish";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.status).toBe("finish");
    });

    it("应该支持 status='error'", async () => {
      const step = document.createElement("ea-step");
      step.status = "error";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.status).toBe("error");
    });

    it("应该支持 status='success'", async () => {
      const step = document.createElement("ea-step");
      step.status = "success";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.status).toBe("success");
    });
  });

  /**
   * EaStep Index 属性测试
   */
  describe("EaStep Index Attribute", () => {
    it("应该支持 index 属性", async () => {
      const step = document.createElement("ea-step");
      step.index = 0;
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.index).toBe(0);
    });

    it("应该支持不同的 index 值", async () => {
      const indices = [0, 1, 2, 3, 4];

      for (const index of indices) {
        const step = document.createElement("ea-step");
        step.index = index;
        expect(step.index).toBe(index);
      }
    });
  });

  /**
   * 组合测试 - Steps + Step
   */
  describe("Combined Steps and Step", () => {
    it("应该正确渲染包含多个 step 的 steps", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step title="Step 1"></ea-step>
        <ea-step title="Step 2"></ea-step>
        <ea-step title="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements.length).toBe(3);
    });

    it("steps 应该正确设置子 step 的 index", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step title="Step 1"></ea-step>
        <ea-step title="Step 2"></ea-step>
        <ea-step title="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].index).toBe(0);
      expect(stepElements[1].index).toBe(1);
      expect(stepElements[2].index).toBe(2);
    });

    it("steps 应该正确设置子 step 的 first 和 last 属性", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step title="Step 1"></ea-step>
        <ea-step title="Step 2"></ea-step>
        <ea-step title="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].hasAttribute("first")).toBe(true);
      expect(stepElements[2].hasAttribute("last")).toBe(true);
    });

    it("steps 应该根据 active 设置子 step 的 status", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 1;
      steps["finish-status"] = "finish";
      steps["process-status"] = "process";
      steps.innerHTML = `
        <ea-step title="Step 1"></ea-step>
        <ea-step title="Step 2"></ea-step>
        <ea-step title="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      const stepElements = steps.querySelectorAll("ea-step");
      // active=1 时，step 0 应该是 finish，step 1 应该是 process，step 2 应该是 wait
      expect(stepElements[0].getAttribute("status")).toBe("finish");
      expect(stepElements[1].getAttribute("status")).toBe("process");
      expect(stepElements[2].getAttribute("status")).toBe("wait");
    });

    it("应该支持含描述的步骤条", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step title="Step 1" description="Description 1"></ea-step>
        <ea-step title="Step 2" description="Description 2"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].description).toBe("Description 1");
      expect(stepElements[1].description).toBe("Description 2");
    });

    it("应该支持带图标的步骤条", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step title="Step 1" icon="music"></ea-step>
        <ea-step title="Step 2" icon="video"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].icon).toBe("music");
      expect(stepElements[1].icon).toBe("video");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 steps 应该正常渲染", async () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(steps.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("单个 step 应该正常渲染", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `<ea-step title="Only Step"></ea-step>`;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements.length).toBe(1);
      expect(stepElements[0].hasAttribute("first")).toBe(true);
      expect(stepElements[0].hasAttribute("last")).toBe(true);
    });

    it("active 超出范围应该正确处理", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 10;
      steps.innerHTML = `
        <ea-step title="Step 1"></ea-step>
        <ea-step title="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 所有 step 应该都是 finish 状态（因为 active > step 数量）
      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("finish");
      expect(stepElements[1].getAttribute("status")).toBe("finish");
    });

    it("active 为负数应该正确处理", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = -1;
      steps.innerHTML = `
        <ea-step title="Step 1"></ea-step>
        <ea-step title="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 所有 step 应该都是 wait 状态（因为 active < 0）
      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("wait");
      expect(stepElements[1].getAttribute("status")).toBe("wait");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("steps 组件连接后应该正确初始化", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step title="Step 1"></ea-step>
        <ea-step title="Step 2"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(steps.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("step 组件连接后应该正确初始化", async () => {
      const step = document.createElement("ea-step");
      step.title = "Test Step";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const steps = document.createElement("ea-steps");
      container.appendChild(steps);

      steps.remove();

      expect(container.contains(steps)).toBe(false);
    });

    it("动态修改 active 应该更新子 step 的 status", async () => {
      const steps = document.createElement("ea-steps");
      steps.active = 0;
      steps.innerHTML = `
        <ea-step title="Step 1"></ea-step>
        <ea-step title="Step 2"></ea-step>
        <ea-step title="Step 3"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 修改 active
      steps.active = 2;

      await new Promise(resolve => setTimeout(resolve, 50));

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].getAttribute("status")).toBe("finish");
      expect(stepElements[1].getAttribute("status")).toBe("finish");
      expect(stepElements[2].getAttribute("status")).toBe("process");
    });

    it("动态添加 step 应该更新 index", async () => {
      const steps = document.createElement("ea-steps");
      steps.innerHTML = `
        <ea-step title="Step 1"></ea-step>
      `;
      container.appendChild(steps);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 动态添加 step
      const newStep = document.createElement("ea-step");
      newStep.title = "Step 2";
      steps.appendChild(newStep);

      await new Promise(resolve => setTimeout(resolve, 100));

      const stepElements = steps.querySelectorAll("ea-step");
      expect(stepElements[0].index).toBe(0);
      expect(stepElements[1].index).toBe(1);
    });

    it("动态修改 step 的 title 应该生效", async () => {
      const step = document.createElement("ea-step");
      step.title = "Original Title";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      step.title = "New Title";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.title).toBe("New Title");
    });

    it("动态修改 step 的 description 应该生效", async () => {
      const step = document.createElement("ea-step");
      step.description = "Original Description";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      step.description = "New Description";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.description).toBe("New Description");
    });

    it("动态修改 step 的 icon 应该生效", async () => {
      const step = document.createElement("ea-step");
      step.icon = "original";
      container.appendChild(step);

      await new Promise(resolve => setTimeout(resolve, 50));

      step.icon = "new-icon";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(step.icon).toBe("new-icon");
    });
  });
});
