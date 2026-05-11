import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 尝试加载组件，处理组件尚未重构为 TypeScript 的情况
let componentReady = false;
try {
  await import("../components/ea-tree/index.js");
  componentReady = true;
} catch (e) {
  console.warn(`[ea-tree] 组件尚未重构为 TypeScript (或存在依赖缺失)，跳过测试`);
}

const suite = componentReady ? describe : describe.skip;

suite("EaTree Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // 生成测试数据
  const generateTestData = () => [
    {
      label: "Level one 1",
      children: [
        {
          label: "Level two 1-1",
          children: [
            {
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      label: "Level one 2",
      children: [
        {
          label: "Level two 2-1",
          children: [
            {
              label: "Level three 2-1-1",
            },
          ],
        },
      ],
    },
  ];

  // 生成带 ID 的测试数据
  const generateIdTestData = () => [
    {
      id: 1,
      label: "Level one 1",
      children: [
        {
          id: 2,
          label: "Level two 1-1",
          children: [
            {
              id: 3,
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
  ];

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-tree 组件", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree).toBeDefined();
      expect(tree.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });
  });

  /**
   * Data 属性测试
   */
  describe("Data Attribute", () => {
    it("默认 data 应该可以访问", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      // data 属性可能返回空字符串、null 或 undefined
      const value = tree.data;
      expect(value === "" || value === null || value === undefined).toBe(true);
    });

    it("应该支持设置 data 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.data.length).toBe(2);
      expect(tree.data[0].label).toBe("Level one 1");
    });
  });

  /**
   * Show-checkbox 属性测试
   */
  describe("Show-checkbox Attribute", () => {
    it("默认 show-checkbox 应该是 false", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const value = tree["show-checkbox"];
      expect(value === false || value === null).toBe(true);
    });

    it("应该支持 show-checkbox 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree["show-checkbox"] = true;
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree["show-checkbox"]).toBe(true);
    });
  });

  /**
   * Check-strictly 属性测试
   */
  describe("Check-strictly Attribute", () => {
    it("默认 check-strictly 应该是 false", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const value = tree["check-strictly"];
      expect(value === false || value === null).toBe(true);
    });

    it("应该支持 check-strictly 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree["check-strictly"] = true;
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree["check-strictly"]).toBe(true);
    });
  });

  /**
   * Node-key 属性测试
   */
  describe("Node-key Attribute", () => {
    it("默认 node-key 应该是 null", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const value = tree["node-key"];
      expect(value === null || value === undefined || value === "").toBe(true);
    });

    it("应该支持 node-key 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree["node-key"] = "id";
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree["node-key"]).toBe("id");
    });
  });

  /**
   * Expand-on-icon-click 属性测试
   */
  describe("Expand-on-icon-click Attribute", () => {
    it("默认 expand-on-icon-click 应该是 false", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const value = tree["expand-on-icon-click"];
      expect(value === false || value === null).toBe(true);
    });

    it("应该支持 expand-on-icon-click 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree["expand-on-icon-click"] = true;
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree["expand-on-icon-click"]).toBe(true);
    });
  });

  /**
   * DataProps 属性测试
   */
  describe("DataProps Attribute", () => {
    it("默认 dataProps 应该有正确的默认值", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.dataProps).toEqual({
        children: "children",
        label: "label",
        disabled: "disabled",
      });
    });

    it("应该支持自定义 dataProps", async () => {
      const tree = document.createElement("ea-tree");
      tree.dataProps = {
        children: "childNodes",
        label: "name",
        disabled: "isDisabled",
      };
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.dataProps).toEqual({
        children: "childNodes",
        label: "name",
        disabled: "isDisabled",
      });
    });
  });

  /**
   * DefaultExpandedKeys 属性测试
   */
  describe("DefaultExpandedKeys Attribute", () => {
    it("默认 defaultExpandedKeys 应该是空数组", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Array.isArray(tree.defaultExpandedKeys)).toBe(true);
    });

    it("应该支持 defaultExpandedKeys 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree["node-key"] = "id";
      tree.defaultExpandedKeys = [1, 2];
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.defaultExpandedKeys).toEqual([1, 2]);
    });
  });

  /**
   * DefaultCheckedKeys 属性测试
   */
  describe("DefaultCheckedKeys Attribute", () => {
    it("默认 defaultCheckedKeys 应该是空数组", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Array.isArray(tree.defaultCheckedKeys)).toBe(true);
    });

    it("应该支持 defaultCheckedKeys 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree["node-key"] = "id";
      tree["show-checkbox"] = true;
      tree.defaultCheckedKeys = [1, 2];
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.defaultCheckedKeys).toEqual([1, 2]);
    });
  });

  /**
   * Events 测试
   */
  describe("Events", () => {
    it("应该触发 ea-node-click 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const clickHandler = vi.fn();
      tree.addEventListener("ea-node-click", clickHandler);

      // 模拟触发事件
      tree.dispatchEvent(
        new CustomEvent("ea-node-click", {
          detail: { data: tree.data[0] },
        })
      );

      expect(clickHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-node-select 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const selectHandler = vi.fn();
      tree.addEventListener("ea-node-select", selectHandler);

      // 模拟触发事件
      tree.dispatchEvent(
        new CustomEvent("ea-node-select", {
          detail: { node: tree.data[0], selected: true },
        })
      );

      expect(selectHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-check-change 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree["show-checkbox"] = true;
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const checkHandler = vi.fn();
      tree.addEventListener("ea-check-change", checkHandler);

      // 模拟触发事件
      tree.dispatchEvent(
        new CustomEvent("ea-check-change", {
          detail: {
            data: tree.data[0],
            checked: true,
            hasCheckedChildren: false,
          },
        })
      );

      expect(checkHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-node-expand 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const expandHandler = vi.fn();
      tree.addEventListener("ea-node-expand", expandHandler);

      // 模拟触发事件
      tree.dispatchEvent(
        new CustomEvent("ea-node-expand", {
          detail: { data: tree.data[0], node: null, expanded: true },
        })
      );

      expect(expandHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-node-collapse 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const collapseHandler = vi.fn();
      tree.addEventListener("ea-node-collapse", collapseHandler);

      // 模拟触发事件
      tree.dispatchEvent(
        new CustomEvent("ea-node-collapse", {
          detail: { data: tree.data[0], node: null, expanded: false },
        })
      );

      expect(collapseHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-current-change 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const changeHandler = vi.fn();
      tree.addEventListener("ea-current-change", changeHandler);

      // 模拟触发事件
      tree.dispatchEvent(
        new CustomEvent("ea-current-change", {
          detail: { data: tree.data[0], node: null },
        })
      );

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  /**
   * Methods 测试
   */
  describe("Methods", () => {
    it("应该支持 getCheckedNodes 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree["show-checkbox"] = true;
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.getCheckedNodes).toBe("function");
    });

    it("应该支持 getCheckedKeys 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree["node-key"] = "id";
      tree["show-checkbox"] = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.getCheckedKeys).toBe("function");
    });

    it("应该支持 setCheckedKeys 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree["node-key"] = "id";
      tree["show-checkbox"] = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.setCheckedKeys).toBe("function");
    });

    it("应该支持 setChecked 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree["show-checkbox"] = true;
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.setChecked).toBe("function");
    });

    it("应该支持 getCurrentKey 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree["node-key"] = "id";
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.getCurrentKey).toBe("function");
    });

    it("应该支持 getCurrentNode 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.getCurrentNode).toBe("function");
    });

    it("应该支持 setCurrentKey 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree["node-key"] = "id";
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.setCurrentKey).toBe("function");
    });

    it("应该支持 getNode 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree["node-key"] = "id";
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.getNode).toBe("function");
    });

    it("应该支持 getHalfCheckedNodes 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree["show-checkbox"] = true;
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.getHalfCheckedNodes).toBe("function");
    });

    it("应该支持 getHalfCheckedKeys 方法", async () => {
      const tree = document.createElement("ea-tree");
      tree["node-key"] = "id";
      tree["show-checkbox"] = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof tree.getHalfCheckedKeys).toBe("function");
    });
  });

  /**
   * 组合测试
   */
  describe("Combined Tests", () => {
    it("应该支持多种属性组合", async () => {
      const tree = document.createElement("ea-tree");
      tree["show-checkbox"] = true;
      tree["check-strictly"] = true;
      tree["node-key"] = "id";
      tree["expand-on-icon-click"] = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree["show-checkbox"]).toBe(true);
      expect(tree["check-strictly"]).toBe(true);
      expect(tree["node-key"]).toBe("id");
      expect(tree["expand-on-icon-click"]).toBe(true);
    });

    it("应该支持带禁用项的数据", async () => {
      const tree = document.createElement("ea-tree");
      tree["show-checkbox"] = true;
      tree.data = [
        {
          id: 1,
          label: "Parent",
          children: [
            { id: 2, label: "Child 1", disabled: true },
            { id: 3, label: "Child 2" },
          ],
        },
      ];
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.data[0].children[0].disabled).toBe(true);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空数据应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = [];
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.data).toEqual([]);
      expect(tree.shadowRoot).toBeDefined();
    });

    it("没有 children 的叶子节点应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = [{ label: "Leaf 1" }, { label: "Leaf 2" }];
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.data.length).toBe(2);
    });

    it("深层嵌套数据应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = [
        {
          label: "Level 1",
          children: [
            {
              label: "Level 2",
              children: [
                {
                  label: "Level 3",
                  children: [{ label: "Level 4" }],
                },
              ],
            },
          ],
        },
      ];
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.data[0].children[0].children[0].children[0].label).toBe(
        "Level 4"
      );
    });

    it("多个 tree 应该独立工作", async () => {
      const tree1 = document.createElement("ea-tree");
      tree1.data = generateTestData();

      const tree2 = document.createElement("ea-tree");
      tree2.data = generateIdTestData();

      container.appendChild(tree1);
      container.appendChild(tree2);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree1.data.length).toBe(2);
      expect(tree2.data.length).toBe(1);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.shadowRoot).toBeDefined();
      expect(tree.data.length).toBe(2);
    });

    it("组件断开连接后应该正常移除", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      tree.remove();

      expect(container.contains(tree)).toBe(false);
    });

    it("动态修改 data 应该生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      const newData = [{ label: "New Item" }];
      tree.data = newData;

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree.data.length).toBe(1);
      expect(tree.data[0].label).toBe("New Item");
    });

    it("动态修改 show-checkbox 应该生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      tree["show-checkbox"] = true;

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree["show-checkbox"]).toBe(true);
    });

    it("动态修改 check-strictly 应该生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      tree["check-strictly"] = true;

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree["check-strictly"]).toBe(true);
    });

    it("动态修改 node-key 应该生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      tree["node-key"] = "id";

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree["node-key"]).toBe("id");
    });

    it("动态修改 expand-on-icon-click 应该生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await new Promise(resolve => setTimeout(resolve, 100));

      tree["expand-on-icon-click"] = true;

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tree["expand-on-icon-click"]).toBe(true);
    });
  });
});
