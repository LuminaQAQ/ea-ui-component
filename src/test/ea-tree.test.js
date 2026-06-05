import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";
import "../components/ea-tree/index";
import { EaTreeCheckChangeEvent } from "../components/ea-tree/events/EaTreeCheckChangeEvent";
import { EaTreeCheckEvent } from "../components/ea-tree/events/EaTreeCheckEvent";
import { EaTreeCurrentChangeEvent } from "../components/ea-tree/events/EaTreeCurrentChangeEvent";
import { EaTreeNodeClickEvent } from "../components/ea-tree/events/EaTreeNodeClickEvent";
import { EaTreeNodeCollapseEvent } from "../components/ea-tree/events/EaTreeNodeCollapseEvent";
import { EaTreeNodeContextmenuEvent } from "../components/ea-tree/events/EaTreeNodeContextmenuEvent";
import { EaTreeNodeExpandEvent } from "../components/ea-tree/events/EaTreeNodeExpandEvent";
import { EaTreeNodeSelectEvent } from "../components/ea-tree/events/EaTreeNodeSelectEvent";

describe("EaTree", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

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

  const generateDisabledTestData = () => [
    {
      id: 1,
      label: "Level one 1",
      children: [
        {
          id: 2,
          label: "Level two 1-1",
          disabled: true,
          children: [
            { id: 3, label: "Level three 1-1-1" },
            { id: 4, label: "Level three 1-1-2", disabled: true },
          ],
        },
        {
          id: 5,
          label: "Level two 1-2",
          children: [{ id: 6, label: "Level three 1-2-1" }],
        },
      ],
    },
  ];

  const findNodeByPath = (tree, path) =>
    tree.shadowRoot.querySelector(`.ea-tree__node[data-path="${path}"]`);

  const findLabelByPath = (tree, path) =>
    tree.shadowRoot.querySelector(`.ea-tree__label[data-path="${path}"]`);

  const findCheckboxByPath = (tree, path) => {
    const label = findLabelByPath(tree, path);
    return label ? label.querySelector(".ea-tree__checkbox") : null;
  };

  const findChildrenByPath = (tree, path) => {
    const node = findNodeByPath(tree, path);
    if (!node) return null;
    for (const child of node.children) {
      if (child.classList && child.classList.contains("ea-tree__children")) {
        return child;
      }
    }
    return null;
  };

  const findToggleIconByPath = (tree, path) => {
    const label = findLabelByPath(tree, path);
    return label ? label.querySelector(".ea-tree__toggle-icon") : null;
  };

  describe("基础渲染", () => {
    it("应该正确渲染 ea-tree 组件", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(tree).toBeDefined();
      expect(tree.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(tree.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("空数据时应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = [];
      container.appendChild(tree);

      await waitForRender();

      expect(tree.shadowRoot).toBeDefined();
      expect(tree.data).toEqual([]);
    });
  });

  describe("DOM 结构", () => {
    it("应该正确渲染节点并设置 data-path 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const rootNode1 = findNodeByPath(tree, "1$");
      const rootNode2 = findNodeByPath(tree, "2$");

      expect(rootNode1).toBeTruthy();
      expect(rootNode2).toBeTruthy();
      expect(rootNode1.dataset.path).toBe("1$");
      expect(rootNode2.dataset.path).toBe("2$");
    });

    it("应该正确渲染子节点的 data-path", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(findNodeByPath(tree, "1$-1")).toBeTruthy();
      expect(findNodeByPath(tree, "1$-1-1")).toBeTruthy();
      expect(findNodeByPath(tree, "2$-1")).toBeTruthy();
      expect(findNodeByPath(tree, "2$-1-1")).toBeTruthy();
    });

    it("应该正确显示节点文本", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const text1 = tree.shadowRoot.querySelector(".ea-tree__text");
      expect(text1).toBeTruthy();
      expect(text1.textContent).toBe("Level one 1");
    });

    it("有子节点的节点应该包含 toggle icon", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const toggleIcon = findToggleIconByPath(tree, "1$");
      expect(toggleIcon).toBeTruthy();
    });

    it("叶子节点不应该包含 toggle icon", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const toggleIcon = findToggleIconByPath(tree, "1$-1-1");
      expect(toggleIcon).toBeFalsy();
    });

    it("有子节点的节点应该包含 children 容器", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const childrenEl = findChildrenByPath(tree, "1$");
      expect(childrenEl).toBeTruthy();
      expect(childrenEl.classList.contains("ea-tree__children")).toBe(true);
    });

    it("叶子节点不应该包含 children 容器", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const childrenEl = findChildrenByPath(tree, "1$-1-1");
      expect(childrenEl).toBeFalsy();
    });

    it("showCheckbox 时应该渲染 checkbox 元素", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const checkbox = findCheckboxByPath(tree, "1$");
      expect(checkbox).toBeTruthy();
    });

    it("默认不显示 checkbox", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const node = findNodeByPath(tree, "1$");
      expect(node.classList.contains("is-show-checkbox")).toBe(false);
    });

    it("showCheckbox 时节点应该有 is-show-checkbox 状态类", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const node = findNodeByPath(tree, "1$");
      expect(node.classList.contains("is-show-checkbox")).toBe(true);
    });

    it("label 元素应该有正确的 data-path", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const label = findLabelByPath(tree, "1$");
      expect(label).toBeTruthy();
      expect(label.dataset.path).toBe("1$");
    });
  });

  describe("属性默认值", () => {
    it("showCheckbox 默认为 false", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(tree.showCheckbox).toBe(false);
    });

    it("checkStrictly 默认为 false", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(tree.checkStrictly).toBe(false);
    });

    it("nodeKey 默认为空字符串", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(tree.nodeKey).toBe("");
    });

    it("expandOnIconClick 默认为 false", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(tree.expandOnIconClick).toBe(false);
    });

    it("data 默认为空数组", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(Array.isArray(tree.data)).toBe(true);
      expect(tree.data.length).toBe(0);
    });

    it("dataProps 默认值正确", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(tree.dataProps).toEqual({
        children: "children",
        label: "label",
        disabled: "disabled",
      });
    });

    it("defaultExpandedKeys 默认为空数组", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(Array.isArray(tree.defaultExpandedKeys)).toBe(true);
    });

    it("defaultCheckedKeys 默认为空数组", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      expect(Array.isArray(tree.defaultCheckedKeys)).toBe(true);
    });
  });

  describe("data 属性", () => {
    it("应该支持设置 data 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(tree.data.length).toBe(2);
      expect(tree.data[0].label).toBe("Level one 1");
      expect(tree.data[1].label).toBe("Level one 2");
    });

    it("动态修改 data 应该重新渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(tree.data.length).toBe(2);

      tree.data = [{ label: "New Item" }];

      await waitForRender();

      expect(tree.data.length).toBe(1);
      expect(tree.data[0].label).toBe("New Item");
    });

    it("设置空数组应该清空树", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(findNodeByPath(tree, "1$")).toBeTruthy();

      tree.data = [];

      await waitForRender();

      expect(findNodeByPath(tree, "1$")).toBeFalsy();
    });
  });

  describe("dataProps 属性", () => {
    it("应该支持自定义 dataProps", async () => {
      const tree = document.createElement("ea-tree");
      tree.dataProps = {
        children: "childNodes",
        label: "name",
        disabled: "isDisabled",
      };
      tree.data = [
        {
          name: "Custom Node",
          childNodes: [{ name: "Custom Child" }],
        },
      ];
      container.appendChild(tree);

      await waitForRender();

      expect(tree.dataProps).toEqual({
        children: "childNodes",
        label: "name",
        disabled: "isDisabled",
      });

      const text = tree.shadowRoot.querySelector(".ea-tree__text");
      expect(text.textContent).toBe("Custom Node");
    });

    it("自定义 dataProps 的子节点应该正确渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.dataProps = {
        children: "items",
        label: "title",
        disabled: "isDisabled",
      };
      tree.data = [
        {
          title: "Parent",
          items: [{ title: "Child 1" }, { title: "Child 2" }],
        },
      ];
      container.appendChild(tree);

      await waitForRender();

      const toggleIcon = findToggleIconByPath(tree, "1$");
      expect(toggleIcon).toBeTruthy();

      const childrenEl = findChildrenByPath(tree, "1$");
      expect(childrenEl).toBeTruthy();
    });
  });

  describe("展开/折叠行为", () => {
    it("展开节点应该添加 is-expanded 状态类", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._expandPath("1$");

      const node = findNodeByPath(tree, "1$");
      expect(node.classList.contains("is-expanded")).toBe(true);
    });

    it("折叠节点应该移除 is-expanded 状态类", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._expandPath("1$");
      expect(findNodeByPath(tree, "1$").classList.contains("is-expanded")).toBe(
        true
      );

      tree._collapsePath("1$");
      expect(findNodeByPath(tree, "1$").classList.contains("is-expanded")).toBe(
        false
      );
    });

    it("切换展开/折叠应该正确工作", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._toggleExpand("1$");
      expect(findNodeByPath(tree, "1$").classList.contains("is-expanded")).toBe(
        true
      );

      tree._toggleExpand("1$");
      expect(findNodeByPath(tree, "1$").classList.contains("is-expanded")).toBe(
        false
      );
    });

    it("展开节点应该触发 ea-node-expand 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-expand", handler);

      tree._expandPath("1$");

      expect(handler).toHaveBeenCalledOnce();
      expect(handler.mock.calls[0][0].detail.data.label).toBe("Level one 1");
      expect(handler.mock.calls[0][0].detail.expanded).toBe(true);
    });

    it("折叠节点应该触发 ea-node-collapse 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._expandPath("1$");

      const handler = vi.fn();
      tree.addEventListener("ea-node-collapse", handler);

      tree._collapsePath("1$");

      expect(handler).toHaveBeenCalledOnce();
      expect(handler.mock.calls[0][0].detail.data.label).toBe("Level one 1");
      expect(handler.mock.calls[0][0].detail.expanded).toBe(false);
    });

    it("叶子节点不应该展开/折叠", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-expand", handler);

      tree._expandPath("1$-1-1");

      expect(handler).not.toHaveBeenCalled();
    });

    it("defaultExpandedKeys 应该自动展开指定节点", async () => {
      const tree = document.createElement("ea-tree");
      tree.nodeKey = "id";
      tree.data = generateIdTestData();
      tree.defaultExpandedKeys = [1, 2];
      container.appendChild(tree);

      await waitForRender(50);

      const rootNode = findNodeByPath(tree, "1$");
      const childNode = findNodeByPath(tree, "1$-1");

      expect(rootNode.classList.contains("is-expanded")).toBe(true);
      expect(childNode.classList.contains("is-expanded")).toBe(true);
    });

    it("defaultExpandedKeys 不设置 nodeKey 时不生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateIdTestData();
      tree.defaultExpandedKeys = [1];
      container.appendChild(tree);

      await waitForRender(50);

      const rootNode = findNodeByPath(tree, "1$");
      expect(rootNode.classList.contains("is-expanded")).toBe(false);
    });

    it("展开祖先节点应该正确工作", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._expandAncestorPaths("1$-1-1");

      expect(findNodeByPath(tree, "1$").classList.contains("is-expanded")).toBe(
        true
      );
      expect(
        findNodeByPath(tree, "1$-1").classList.contains("is-expanded")
      ).toBe(true);
    });
  });

  describe("选中行为", () => {
    it("选中节点应该添加 is-selected 状态类", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._selectPath("1$");

      const node = findNodeByPath(tree, "1$");
      expect(node.classList.contains("is-selected")).toBe(true);
    });

    it("选中另一个节点时前一个应该取消选中", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._selectPath("1$");
      expect(findNodeByPath(tree, "1$").classList.contains("is-selected")).toBe(
        true
      );

      tree._selectPath("2$");
      expect(findNodeByPath(tree, "1$").classList.contains("is-selected")).toBe(
        false
      );
      expect(findNodeByPath(tree, "2$").classList.contains("is-selected")).toBe(
        true
      );
    });

    it("选中节点应该触发 ea-node-select 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-select", handler);

      tree._selectPath("1$");

      expect(handler).toHaveBeenCalledOnce();
      expect(handler.mock.calls[0][0].detail.node.label).toBe("Level one 1");
      expect(handler.mock.calls[0][0].detail.selected).toBe(true);
    });

    it("选中节点应该触发 ea-current-change 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-current-change", handler);

      tree._selectPath("1$");

      expect(handler).toHaveBeenCalledOnce();
      expect(handler.mock.calls[0][0].detail.data.label).toBe("Level one 1");
    });

    it("点击节点应该触发 ea-node-click 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-click", handler);

      const labelEl = findLabelByPath(tree, "1$");
      labelEl.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      expect(handler).toHaveBeenCalledOnce();
      expect(handler.mock.calls[0][0].detail.data.label).toBe("Level one 1");
    });

    it("点击节点应该同时选中该节点", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const labelEl = findLabelByPath(tree, "1$");
      labelEl.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      expect(findNodeByPath(tree, "1$").classList.contains("is-selected")).toBe(
        true
      );
    });

    it("点击有子节点的节点应该同时展开", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const labelEl = findLabelByPath(tree, "1$");
      labelEl.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      expect(findNodeByPath(tree, "1$").classList.contains("is-expanded")).toBe(
        true
      );
    });
  });

  describe("Checkbox 行为", () => {
    it("showCheckbox 控制 checkbox 可见性", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const node = findNodeByPath(tree, "1$");
      expect(node.classList.contains("is-show-checkbox")).toBe(true);

      tree.showCheckbox = false;

      await waitForRender();

      expect(
        findNodeByPath(tree, "1$").classList.contains("is-show-checkbox")
      ).toBe(false);
    });

    it("勾选叶子节点应该更新父节点为 indeterminate", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = [
        {
          id: 1,
          label: "Parent",
          children: [
            {
              id: 2,
              label: "Child",
              children: [
                { id: 3, label: "Grandchild 1" },
                { id: 4, label: "Grandchild 2" },
              ],
            },
          ],
        },
      ];
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$-1-1");

      const leafNode = findNodeByPath(tree, "1$-1-1");
      const parentNode = findNodeByPath(tree, "1$-1");
      const rootNode = findNodeByPath(tree, "1$");

      expect(leafNode.classList.contains("is-checked")).toBe(true);
      expect(parentNode.classList.contains("is-indeterminate")).toBe(true);
      expect(parentNode.classList.contains("is-checked")).toBe(false);
      expect(rootNode.classList.contains("is-indeterminate")).toBe(true);
      expect(rootNode.classList.contains("is-checked")).toBe(false);
    });

    it("勾选所有子节点应该更新父节点为 checked", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = [
        {
          id: 1,
          label: "Parent",
          children: [
            { id: 2, label: "Child 1" },
            { id: 3, label: "Child 2" },
          ],
        },
      ];
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$-1");
      tree._handleCheckboxToggle("1$-2");

      const parentNode = findNodeByPath(tree, "1$");
      expect(parentNode.classList.contains("is-checked")).toBe(true);
      expect(parentNode.classList.contains("is-indeterminate")).toBe(false);
    });

    it("取消勾选一个子节点应该将父节点从 checked 变为 indeterminate", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = [
        {
          id: 1,
          label: "Parent",
          children: [
            { id: 2, label: "Child 1" },
            { id: 3, label: "Child 2" },
          ],
        },
      ];
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$-1");
      tree._handleCheckboxToggle("1$-2");

      expect(findNodeByPath(tree, "1$").classList.contains("is-checked")).toBe(
        true
      );

      tree._handleCheckboxToggle("1$-1");

      const parentNode = findNodeByPath(tree, "1$");
      expect(parentNode.classList.contains("is-checked")).toBe(false);
      expect(parentNode.classList.contains("is-indeterminate")).toBe(true);
    });

    it("勾选父节点应该自动勾选所有子节点", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$");

      const rootNode = findNodeByPath(tree, "1$");
      const childNode = findNodeByPath(tree, "1$-1");
      const grandchildNode = findNodeByPath(tree, "1$-1-1");

      expect(rootNode.classList.contains("is-checked")).toBe(true);
      expect(childNode.classList.contains("is-checked")).toBe(true);
      expect(grandchildNode.classList.contains("is-checked")).toBe(true);
    });

    it("取消勾选父节点应该自动取消所有子节点", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$");
      expect(
        findNodeByPath(tree, "1$-1").classList.contains("is-checked")
      ).toBe(true);

      tree._handleCheckboxToggle("1$");

      expect(findNodeByPath(tree, "1$").classList.contains("is-checked")).toBe(
        false
      );
      expect(
        findNodeByPath(tree, "1$-1").classList.contains("is-checked")
      ).toBe(false);
      expect(
        findNodeByPath(tree, "1$-1-1").classList.contains("is-checked")
      ).toBe(false);
    });

    it("checkStrictly 模式下父子不联动", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.checkStrictly = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$");

      const rootNode = findNodeByPath(tree, "1$");
      const childNode = findNodeByPath(tree, "1$-1");
      const grandchildNode = findNodeByPath(tree, "1$-1-1");

      expect(rootNode.classList.contains("is-checked")).toBe(true);
      expect(childNode.classList.contains("is-checked")).toBe(false);
      expect(grandchildNode.classList.contains("is-checked")).toBe(false);
    });

    it("checkStrictly 模式下勾选子节点不影响父节点", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.checkStrictly = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$-1-1");

      const rootNode = findNodeByPath(tree, "1$");
      const childNode = findNodeByPath(tree, "1$-1");
      const grandchildNode = findNodeByPath(tree, "1$-1-1");

      expect(grandchildNode.classList.contains("is-checked")).toBe(true);
      expect(childNode.classList.contains("is-checked")).toBe(false);
      expect(childNode.classList.contains("is-indeterminate")).toBe(false);
      expect(rootNode.classList.contains("is-checked")).toBe(false);
      expect(rootNode.classList.contains("is-indeterminate")).toBe(false);
    });

    it("禁用节点不可勾选", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = [
        {
          id: 1,
          label: "Parent",
          children: [
            { id: 2, label: "Disabled Child", disabled: true },
            { id: 3, label: "Normal Child" },
          ],
        },
      ];
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$-1");

      const disabledNode = findNodeByPath(tree, "1$-1");
      expect(disabledNode.classList.contains("is-checked")).toBe(false);
    });

    it("勾选父节点时禁用子节点不被勾选", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = [
        {
          id: 1,
          label: "Parent",
          children: [
            { id: 2, label: "Disabled Child", disabled: true },
            { id: 3, label: "Normal Child" },
          ],
        },
      ];
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$");

      const disabledNode = findNodeByPath(tree, "1$-1");
      const normalNode = findNodeByPath(tree, "1$-2");

      expect(disabledNode.classList.contains("is-checked")).toBe(false);
      expect(normalNode.classList.contains("is-checked")).toBe(true);
    });

    it("defaultCheckedKeys 应该自动勾选指定节点", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.nodeKey = "id";
      tree.defaultCheckedKeys = [3];
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender(50);

      const grandchildNode = findNodeByPath(tree, "1$-1-1");
      expect(grandchildNode.classList.contains("is-checked")).toBe(true);
    });

    it("defaultCheckedKeys 不设置 nodeKey 时不生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.defaultCheckedKeys = [3];
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender(50);

      const grandchildNode = findNodeByPath(tree, "1$-1-1");
      expect(grandchildNode.classList.contains("is-checked")).toBe(false);
    });

    it("勾选应该触发 ea-check-change 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-check-change", handler);

      tree._handleCheckboxToggle("1$-1-1");

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0];
      expect(event.detail.checked).toBe(true);
      expect(event.detail.data.label).toBe("Level three 1-1-1");
    });

    it("勾选应该触发 ea-check 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.nodeKey = "id";
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-check", handler);

      tree._handleCheckboxToggle("1$-1-1");

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0];
      expect(event.detail.data).toBeDefined();
      expect(event.detail.checkedState).toBeDefined();
      expect(event.detail.checkedState.checkedNodes).toBeDefined();
      expect(event.detail.checkedState.checkedKeys).toBeDefined();
      expect(event.detail.checkedState.halfCheckedNodes).toBeDefined();
      expect(event.detail.checkedState.halfCheckedKeys).toBeDefined();
    });

    it("disabled 子树中多节点选中时父树状态应正确更新", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = [
        {
          id: 1,
          label: "Level one 1",
          children: [
            {
              id: 3,
              label: "Level two 2-1",
              children: [
                { id: 4, label: "Level three 3-1-1" },
                { id: 5, label: "Level three 3-1-2", disabled: true },
              ],
            },
            {
              id: 2,
              label: "Level two 2-2",
              disabled: true,
              children: [
                { id: 6, label: "Level three 3-2-1" },
                { id: 7, label: "Level three 3-2-2", disabled: true },
              ],
            },
          ],
        },
      ];
      container.appendChild(tree);

      await waitForRender();

      const grandchildA1 = findNodeByPath(tree, "1$-1-1");
      expect(grandchildA1).toBeTruthy();
      tree._handleCheckboxToggle("1$-1-1");

      await waitForRender();

      const rootNode = findNodeByPath(tree, "1$");
      const childA = findNodeByPath(tree, "1$-1");

      expect(grandchildA1.classList.contains("is-checked")).toBe(true);
      expect(childA.classList.contains("is-indeterminate")).toBe(true);
      expect(childA.classList.contains("is-checked")).toBe(false);
      expect(rootNode.classList.contains("is-indeterminate")).toBe(true);
      expect(rootNode.classList.contains("is-checked")).toBe(false);

      const grandchildB1 = findNodeByPath(tree, "1$-2-1");
      expect(grandchildB1).toBeTruthy();
      tree._handleCheckboxToggle("1$-2-1");

      await waitForRender();

      expect(grandchildB1.classList.contains("is-checked")).toBe(true);
      expect(rootNode.classList.contains("is-indeterminate")).toBe(true);
      expect(rootNode.classList.contains("is-checked")).toBe(false);
    });

    it("checkbox DOM 元素的 checked 状态应该同步更新", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$-1-1");

      const checkbox = findCheckboxByPath(tree, "1$-1-1");
      expect(checkbox.checked).toBe(true);
    });

    it("checkbox DOM 元素的 indeterminate 状态应该同步更新", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = [
        {
          id: 1,
          label: "Parent",
          children: [
            { id: 2, label: "Child 1" },
            { id: 3, label: "Child 2" },
          ],
        },
      ];
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$-1");

      const parentCheckbox = findCheckboxByPath(tree, "1$");
      expect(parentCheckbox.indeterminate).toBe(true);
    });
  });

  describe("expandOnIconClick 行为", () => {
    it("expandOnIconClick 为 false 时点击节点同时展开和选中", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const labelEl = findLabelByPath(tree, "1$");
      labelEl.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      expect(findNodeByPath(tree, "1$").classList.contains("is-expanded")).toBe(
        true
      );
      expect(findNodeByPath(tree, "1$").classList.contains("is-selected")).toBe(
        true
      );
    });

    it("expandOnIconClick 为 true 时点击 toggle icon 只展开不选中", async () => {
      const tree = document.createElement("ea-tree");
      tree.expandOnIconClick = true;
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const toggleIcon = findToggleIconByPath(tree, "1$");
      toggleIcon.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      expect(findNodeByPath(tree, "1$").classList.contains("is-expanded")).toBe(
        true
      );
      expect(findNodeByPath(tree, "1$").classList.contains("is-selected")).toBe(
        false
      );
    });

    it("expandOnIconClick 为 true 时点击非 icon 区域只选中不展开", async () => {
      const tree = document.createElement("ea-tree");
      tree.expandOnIconClick = true;
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const textEl = tree.shadowRoot.querySelector(".ea-tree__text");
      textEl.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      expect(findNodeByPath(tree, "1$").classList.contains("is-selected")).toBe(
        true
      );
    });
  });

  describe("右键菜单", () => {
    it("右键点击节点应该触发 ea-node-contextmenu 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-contextmenu", handler);

      const labelEl = findLabelByPath(tree, "1$");
      const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
      });
      labelEl.dispatchEvent(event);

      expect(handler).toHaveBeenCalledOnce();
      expect(handler.mock.calls[0][0].detail.data.label).toBe("Level one 1");
      expect(handler.mock.calls[0][0].detail.node).toBeDefined();
    });
  });

  describe("公共方法", () => {
    describe("getCheckedNodes", () => {
      it("showCheckbox 为 false 时返回空数组", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.getCheckedNodes()).toEqual([]);
      });

      it("应该返回所有选中的节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._handleCheckboxToggle("1$-1-1");

        const nodes = tree.getCheckedNodes();
        expect(nodes.length).toBeGreaterThan(0);
        expect(nodes.some(n => n.label === "Level three 1-1-1")).toBe(true);
      });

      it("leafOnly 为 true 时只返回叶子节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._handleCheckboxToggle("1$");

        const allNodes = tree.getCheckedNodes();
        const leafNodes = tree.getCheckedNodes(true);

        expect(leafNodes.length).toBeLessThanOrEqual(allNodes.length);
        leafNodes.forEach(node => {
          expect(node.children).toBeFalsy();
        });
      });

      it("includeHalfChecked 为 true 时包含半选节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._handleCheckboxToggle("1$-1-1");

        const nodesWithoutHalf = tree.getCheckedNodes(false, false);
        const nodesWithHalf = tree.getCheckedNodes(false, true);

        expect(nodesWithHalf.length).toBeGreaterThanOrEqual(
          nodesWithoutHalf.length
        );
      });
    });

    describe("getCheckedKeys", () => {
      it("showCheckbox 为 false 时返回空数组", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.getCheckedKeys()).toEqual([]);
      });

      it("nodeKey 为空时返回空数组", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._handleCheckboxToggle("1$-1-1");

        expect(tree.getCheckedKeys()).toEqual([]);
      });

      it("应该返回所有选中节点的 key", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._handleCheckboxToggle("1$-1-1");

        const keys = tree.getCheckedKeys();
        expect(keys).toContain(3);
      });

      it("leafOnly 为 true 时只返回叶子节点的 key", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._handleCheckboxToggle("1$");

        const allKeys = tree.getCheckedKeys();
        const leafKeys = tree.getCheckedKeys(true);

        expect(leafKeys.length).toBeLessThanOrEqual(allKeys.length);
        expect(leafKeys).toContain(3);
      });
    });

    describe("setCheckedKeys", () => {
      it("showCheckbox 为 false 时返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setCheckedKeys([3])).toBe(false);
      });

      it("nodeKey 为空时返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setCheckedKeys([3])).toBe(false);
      });

      it("应该勾选指定 key 的节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCheckedKeys([3]);

        const node = findNodeByPath(tree, "1$-1-1");
        expect(node.classList.contains("is-checked")).toBe(true);
      });

      it("leafOnly 为 true 时跳过非叶子节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCheckedKeys([1], true);

        const rootNode = findNodeByPath(tree, "1$");
        expect(rootNode.classList.contains("is-checked")).toBe(false);
      });
    });

    describe("setChecked", () => {
      it("showCheckbox 为 false 时返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setChecked(3, true)).toBe(false);
      });

      it("nodeKey 为空时返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setChecked(3, true)).toBe(false);
      });

      it("应该设置指定节点的勾选状态", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setChecked(3, true);

        expect(
          findNodeByPath(tree, "1$-1-1").classList.contains("is-checked")
        ).toBe(true);

        tree.setChecked(3, false);

        expect(
          findNodeByPath(tree, "1$-1-1").classList.contains("is-checked")
        ).toBe(false);
      });

      it("禁用节点返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = [
          {
            id: 1,
            label: "Disabled",
            disabled: true,
          },
        ];
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setChecked(1, true)).toBe(false);
      });

      it("不存在的节点返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setChecked(999, true)).toBe(false);
      });

      it("应该支持通过数据对象设置勾选状态", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        const result = tree.setChecked(tree.data[0], true);
        expect(result).toBe(true);
        expect(
          findNodeByPath(tree, "1$").classList.contains("is-checked")
        ).toBe(true);
      });
    });

    describe("setCheckedNodes", () => {
      it("showCheckbox 为 false 时返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setCheckedNodes([])).toBe(false);
      });

      it("nodeKey 为空时返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setCheckedNodes([])).toBe(false);
      });

      it("应该勾选指定节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCheckedNodes([tree.data[0]]);

        expect(
          findNodeByPath(tree, "1$").classList.contains("is-checked")
        ).toBe(true);
      });
    });

    describe("getCurrentKey", () => {
      it("nodeKey 为空时返回 null", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._selectPath("1$");

        expect(tree.getCurrentKey()).toBe(null);
      });

      it("没有选中节点时返回 null", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.getCurrentKey()).toBe(null);
      });

      it("应该返回当前选中节点的 key", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._selectPath("1$");

        expect(tree.getCurrentKey()).toBe(1);
      });
    });

    describe("getCurrentNode", () => {
      it("没有选中节点时返回 null", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.getCurrentNode()).toBe(null);
      });

      it("应该返回当前选中节点的数据", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._selectPath("1$");

        const node = tree.getCurrentNode();
        expect(node).toBeDefined();
        expect(node.label).toBe("Level one 1");
      });
    });

    describe("setCurrentKey", () => {
      it("nodeKey 为空时返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setCurrentKey(1)).toBe(false);
      });

      it("不存在的 key 返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setCurrentKey(999)).toBe(false);
      });

      it("禁用节点返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = [{ id: 1, label: "Disabled", disabled: true }];
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setCurrentKey(1)).toBe(false);
      });

      it("应该选中指定 key 的节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCurrentKey(1);

        expect(
          findNodeByPath(tree, "1$").classList.contains("is-selected")
        ).toBe(true);
        expect(tree.getCurrentKey()).toBe(1);
      });

      it("传入 null 应该取消选中", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCurrentKey(1);
        expect(
          findNodeByPath(tree, "1$").classList.contains("is-selected")
        ).toBe(true);

        tree.setCurrentKey(null);
        expect(
          findNodeByPath(tree, "1$").classList.contains("is-selected")
        ).toBe(false);
        expect(tree.getCurrentKey()).toBe(null);
      });

      it("shouldAutoExpandParent 为 true 时应该展开祖先节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCurrentKey(3, true);

        expect(
          findNodeByPath(tree, "1$").classList.contains("is-expanded")
        ).toBe(true);
        expect(
          findNodeByPath(tree, "1$-1").classList.contains("is-expanded")
        ).toBe(true);
      });

      it("shouldAutoExpandParent 为 false 时不展开祖先节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCurrentKey(3, false);

        expect(
          findNodeByPath(tree, "1$").classList.contains("is-expanded")
        ).toBe(false);
      });
    });

    describe("setCurrentNode", () => {
      it("nodeKey 为空时返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setCurrentNode(tree.data[0])).toBe(false);
      });

      it("不存在的节点返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.setCurrentNode({ id: 999, label: "Not exist" })).toBe(
          false
        );
      });

      it("应该选中指定节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCurrentNode(tree.data[0]);

        expect(
          findNodeByPath(tree, "1$").classList.contains("is-selected")
        ).toBe(true);
      });

      it("传入 null 应该取消选中", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCurrentNode(tree.data[0]);
        expect(
          findNodeByPath(tree, "1$").classList.contains("is-selected")
        ).toBe(true);

        tree.setCurrentNode(null);
        expect(
          findNodeByPath(tree, "1$").classList.contains("is-selected")
        ).toBe(false);
      });

      it("shouldAutoExpandParent 为 true 时应该展开祖先节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        tree.setCurrentNode(tree.data[0].children[0], true);

        expect(
          findNodeByPath(tree, "1$").classList.contains("is-expanded")
        ).toBe(true);
      });
    });

    describe("getNode", () => {
      it("nodeKey 为空时返回 null", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.getNode(1)).toBe(null);
      });

      it("不存在的节点返回 null", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.getNode(999)).toBe(null);
      });

      it("应该通过 key 返回节点信息", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        const nodeInfo = tree.getNode(1);
        expect(nodeInfo).toBeDefined();
        expect(nodeInfo.data).toBeDefined();
        expect(nodeInfo.data.id).toBe(1);
        expect(nodeInfo.data.label).toBe("Level one 1");
        expect(nodeInfo.label).toBeDefined();
      });

      it("应该通过数据对象返回节点信息", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        const nodeInfo = tree.getNode(tree.data[0]);
        expect(nodeInfo).toBeDefined();
        expect(nodeInfo.data.id).toBe(1);
      });

      it("有子节点的节点应该返回 child 元素", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        const nodeInfo = tree.getNode(1);
        expect(nodeInfo.child).toBeDefined();
      });

      it("叶子节点返回的 child 应该为 null", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        const nodeInfo = tree.getNode(3);
        expect(nodeInfo.child).toBeNull();
      });
    });

    describe("getHalfCheckedNodes", () => {
      it("showCheckbox 为 false 时返回空数组", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.getHalfCheckedNodes()).toEqual([]);
      });

      it("应该返回所有半选节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = [
          {
            id: 1,
            label: "Parent",
            children: [
              { id: 2, label: "Child 1" },
              { id: 3, label: "Child 2" },
            ],
          },
        ];
        container.appendChild(tree);

        await waitForRender();

        tree._handleCheckboxToggle("1$-1");

        const halfNodes = tree.getHalfCheckedNodes();
        expect(halfNodes.length).toBeGreaterThan(0);
      });
    });

    describe("getHalfCheckedKeys", () => {
      it("showCheckbox 为 false 时返回空数组", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.getHalfCheckedKeys()).toEqual([]);
      });

      it("nodeKey 为空时返回空数组", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateTestData();
        container.appendChild(tree);

        await waitForRender();

        tree._handleCheckboxToggle("1$-1-1");

        expect(tree.getHalfCheckedKeys()).toEqual([]);
      });

      it("应该返回所有半选节点的 key", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.nodeKey = "id";
        tree.data = [
          {
            id: 1,
            label: "Parent",
            children: [
              { id: 2, label: "Child 1" },
              { id: 3, label: "Child 2" },
            ],
          },
        ];
        container.appendChild(tree);

        await waitForRender();

        tree._handleCheckboxToggle("1$-1");

        const halfKeys = tree.getHalfCheckedKeys();
        expect(halfKeys.length).toBeGreaterThan(0);
        expect(halfKeys).toContain(1);
      });
    });

    describe("updateKeyChildren", () => {
      it("nodeKey 为空时返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.updateKeyChildren(1, [])).toBe(false);
      });

      it("不存在的 key 返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.updateKeyChildren(999, [])).toBe(false);
      });

      it("叶子节点返回 false", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(tree.updateKeyChildren(3, [])).toBe(false);
      });

      it("应该更新指定节点的子节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        const newChildren = [
          { id: 10, label: "New Child 1" },
          { id: 11, label: "New Child 2" },
        ];

        const result = tree.updateKeyChildren(1, newChildren);
        expect(result).toBe(true);

        await waitForRender(50);

        const nodeInfo = tree.getNode(10);
        expect(nodeInfo).toBeDefined();
        expect(nodeInfo.data.label).toBe("New Child 1");
      });

      it("更新子节点后旧子节点应该被移除", async () => {
        const tree = document.createElement("ea-tree");
        tree.nodeKey = "id";
        tree.data = generateIdTestData();
        container.appendChild(tree);

        await waitForRender();

        expect(findNodeByPath(tree, "1$-1")).toBeTruthy();

        tree.updateKeyChildren(1, [{ id: 10, label: "New Child" }]);

        await waitForRender();

        expect(findNodeByPath(tree, "1$-1")).toBeTruthy();
      });
    });
  });

  describe("边界情况", () => {
    it("叶子节点应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = [{ label: "Leaf 1" }, { label: "Leaf 2" }];
      container.appendChild(tree);

      await waitForRender();

      expect(tree.data.length).toBe(2);
      expect(findNodeByPath(tree, "1$")).toBeTruthy();
      expect(findNodeByPath(tree, "2$")).toBeTruthy();
      expect(findToggleIconByPath(tree, "1$")).toBeFalsy();
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

      await waitForRender();

      expect(findNodeByPath(tree, "1$")).toBeTruthy();
      expect(findNodeByPath(tree, "1$-1")).toBeTruthy();
      expect(findNodeByPath(tree, "1$-1-1")).toBeTruthy();
      expect(findNodeByPath(tree, "1$-1-1-1")).toBeTruthy();
    });

    it("多个 tree 应该独立工作", async () => {
      const tree1 = document.createElement("ea-tree");
      tree1.data = generateTestData();

      const tree2 = document.createElement("ea-tree");
      tree2.data = generateIdTestData();

      container.appendChild(tree1);
      container.appendChild(tree2);

      await waitForRender();

      expect(tree1.data.length).toBe(2);
      expect(tree2.data.length).toBe(1);

      tree1._selectPath("1$");
      expect(tree1.getCurrentNode()).toBeDefined();
      expect(tree2.getCurrentNode()).toBe(null);
    });

    it("动态修改 showCheckbox 应该更新 checkbox 可见性", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(
        findNodeByPath(tree, "1$").classList.contains("is-show-checkbox")
      ).toBe(false);

      tree.showCheckbox = true;

      await waitForRender();

      expect(
        findNodeByPath(tree, "1$").classList.contains("is-show-checkbox")
      ).toBe(true);
    });

    it("动态修改 checkStrictly 应该生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(tree.checkStrictly).toBe(false);

      tree.checkStrictly = true;

      await waitForRender();

      expect(tree.checkStrictly).toBe(true);
    });

    it("动态修改 nodeKey 应该生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(tree.nodeKey).toBe("");

      tree.nodeKey = "id";

      await waitForRender();

      expect(tree.nodeKey).toBe("id");
    });

    it("动态修改 expandOnIconClick 应该生效", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(tree.expandOnIconClick).toBe(false);

      tree.expandOnIconClick = true;

      await waitForRender();

      expect(tree.expandOnIconClick).toBe(true);
    });

    it("带禁用项的数据应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateDisabledTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(tree.data[0].children[0].disabled).toBe(true);
    });

    it("重复勾选同一节点为相同状态不应触发多余事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$-1-1", true);

      const handler = vi.fn();
      tree.addEventListener("ea-check-change", handler);

      tree._handleCheckboxToggle("1$-1-1", true);

      expect(handler).not.toHaveBeenCalled();
    });

    it("多种属性组合应该正常工作", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.checkStrictly = true;
      tree.nodeKey = "id";
      tree.expandOnIconClick = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(tree.showCheckbox).toBe(true);
      expect(tree.checkStrictly).toBe(true);
      expect(tree.nodeKey).toBe("id");
      expect(tree.expandOnIconClick).toBe(true);
      expect(tree.data.length).toBe(1);
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      expect(tree.shadowRoot).toBeDefined();
      expect(tree.data.length).toBe(2);
    });

    it("组件断开连接后应该正常移除", async () => {
      const tree = document.createElement("ea-tree");
      container.appendChild(tree);

      await waitForRender();

      tree.remove();

      expect(container.contains(tree)).toBe(false);
    });
  });

  describe("自定义事件类", () => {
    it("ea-node-expand 应该是 EaTreeNodeExpandEvent 实例", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-expand", handler);

      tree._expandPath("1$");

      expect(handler).toHaveBeenCalledOnce();
      const event = handler.mock.calls[0][0];
      expect(event).toBeInstanceOf(EaTreeNodeExpandEvent);
      expect(event.type).toBe("ea-node-expand");
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("ea-node-collapse 应该是 EaTreeNodeCollapseEvent 实例", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._expandPath("1$");

      const handler = vi.fn();
      tree.addEventListener("ea-node-collapse", handler);

      tree._collapsePath("1$");

      expect(handler).toHaveBeenCalledOnce();
      const event = handler.mock.calls[0][0];
      expect(event).toBeInstanceOf(EaTreeNodeCollapseEvent);
      expect(event.type).toBe("ea-node-collapse");
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("ea-node-select 应该是 EaTreeNodeSelectEvent 实例", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-select", handler);

      tree._selectPath("1$");

      expect(handler).toHaveBeenCalledOnce();
      const event = handler.mock.calls[0][0];
      expect(event).toBeInstanceOf(EaTreeNodeSelectEvent);
      expect(event.type).toBe("ea-node-select");
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("ea-node-click 应该是 EaTreeNodeClickEvent 实例", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-click", handler);

      const labelEl = findLabelByPath(tree, "1$");
      labelEl.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      expect(handler).toHaveBeenCalledOnce();
      const event = handler.mock.calls[0][0];
      expect(event).toBeInstanceOf(EaTreeNodeClickEvent);
      expect(event.type).toBe("ea-node-click");
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("ea-check-change 应该是 EaTreeCheckChangeEvent 实例", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-check-change", handler);

      tree._handleCheckboxToggle("1$-1-1");

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0];
      expect(event).toBeInstanceOf(EaTreeCheckChangeEvent);
      expect(event.type).toBe("ea-check-change");
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("ea-check 应该是 EaTreeCheckEvent 实例", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.nodeKey = "id";
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-check", handler);

      tree._handleCheckboxToggle("1$-1-1");

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0];
      expect(event).toBeInstanceOf(EaTreeCheckEvent);
      expect(event.type).toBe("ea-check");
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("ea-current-change 应该是 EaTreeCurrentChangeEvent 实例", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-current-change", handler);

      tree._selectPath("1$");

      expect(handler).toHaveBeenCalledOnce();
      const event = handler.mock.calls[0][0];
      expect(event).toBeInstanceOf(EaTreeCurrentChangeEvent);
      expect(event.type).toBe("ea-current-change");
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("ea-node-contextmenu 应该是 EaTreeNodeContextmenuEvent 实例", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-contextmenu", handler);

      const labelEl = findLabelByPath(tree, "1$");
      const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
      });
      labelEl.dispatchEvent(event);

      expect(handler).toHaveBeenCalledOnce();
      const firedEvent = handler.mock.calls[0][0];
      expect(firedEvent).toBeInstanceOf(EaTreeNodeContextmenuEvent);
      expect(firedEvent.type).toBe("ea-node-contextmenu");
      expect(firedEvent.bubbles).toBe(true);
      expect(firedEvent.composed).toBe(true);
    });
  });

  describe("事件 detail 完整性", () => {
    it("ea-node-expand detail 应包含 node 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-expand", handler);

      tree._expandPath("1$");

      const event = handler.mock.calls[0][0];
      expect(event.detail.node).toBeDefined();
      expect(event.detail.node.path).toBe("1$");
      expect(event.detail.node.expanded).toBe(true);
      expect(event.detail.node.hasChildren).toBe(true);
    });

    it("ea-node-collapse detail 应包含 node 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._expandPath("1$");

      const handler = vi.fn();
      tree.addEventListener("ea-node-collapse", handler);

      tree._collapsePath("1$");

      const event = handler.mock.calls[0][0];
      expect(event.detail.node).toBeDefined();
      expect(event.detail.node.path).toBe("1$");
      expect(event.detail.node.expanded).toBe(false);
    });

    it("ea-check-change detail 应包含 hasCheckedChildren 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-check-change", handler);

      tree._handleCheckboxToggle("1$-1-1");

      const event = handler.mock.calls[0][0];
      expect(event.detail.hasCheckedChildren).toBeDefined();
      expect(typeof event.detail.hasCheckedChildren).toBe("boolean");
    });

    it("ea-current-change detail 应包含 node 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-current-change", handler);

      tree._selectPath("1$");

      const event = handler.mock.calls[0][0];
      expect(event.detail.node).toBeDefined();
      expect(event.detail.node.path).toBe("1$");
      expect(event.detail.node.selected).toBe(true);
    });

    it("ea-node-click detail 应包含 data 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-click", handler);

      const labelEl = findLabelByPath(tree, "1$");
      labelEl.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      const event = handler.mock.calls[0][0];
      expect(event.detail.data).toBeDefined();
      expect(event.detail.data.label).toBe("Level one 1");
    });

    it("ea-check detail.checkedState 应包含完整结构", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.nodeKey = "id";
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-check", handler);

      tree._handleCheckboxToggle("1$-1-1");

      const event = handler.mock.calls[0][0];
      expect(event.detail.checkedState).toBeDefined();
      expect(Array.isArray(event.detail.checkedState.checkedNodes)).toBe(true);
      expect(Array.isArray(event.detail.checkedState.checkedKeys)).toBe(true);
      expect(
        Array.isArray(event.detail.checkedState.halfCheckedNodes)
      ).toBe(true);
      expect(Array.isArray(event.detail.checkedState.halfCheckedKeys)).toBe(
        true
      );
    });
  });

  describe("禁用节点行为", () => {
    it("点击禁用节点应该触发 ea-node-click 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateDisabledTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-node-click", handler);

      const labelEl = findLabelByPath(tree, "1$-1");
      labelEl.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      expect(handler).toHaveBeenCalledOnce();
    });

    it("点击禁用节点应该选中该节点", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = generateDisabledTestData();
      container.appendChild(tree);

      await waitForRender();

      const labelEl = findLabelByPath(tree, "1$-1");
      labelEl.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true })
      );

      expect(
        findNodeByPath(tree, "1$-1").classList.contains("is-selected")
      ).toBe(true);
    });

    it("禁用节点不可通过 checkbox 点击切换勾选", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateDisabledTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$-1");

      const disabledNode = findNodeByPath(tree, "1$-1");
      expect(disabledNode.classList.contains("is-checked")).toBe(false);
    });

    it("禁用节点的 checkbox DOM 应有 disabled 属性", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateDisabledTestData();
      container.appendChild(tree);

      await waitForRender();

      const checkbox = findCheckboxByPath(tree, "1$-1");
      expect(checkbox).toBeTruthy();
      expect(checkbox.disabled).toBe(true);
    });
  });

  describe("Checkbox DOM 交互", () => {
    it("checkbox change 事件应该触发勾选切换", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      const checkbox = findCheckboxByPath(tree, "1$-1-1");
      checkbox.dispatchEvent(
        new CustomEvent("change", {
          detail: { checked: true },
          bubbles: true,
          composed: true,
        })
      );

      await waitForRender();

      const node = findNodeByPath(tree, "1$-1-1");
      expect(node.classList.contains("is-checked")).toBe(true);
    });

    it("checkbox change 事件应该触发 ea-check-change 事件", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      const handler = vi.fn();
      tree.addEventListener("ea-check-change", handler);

      const checkbox = findCheckboxByPath(tree, "1$-1-1");
      checkbox.dispatchEvent(
        new CustomEvent("change", {
          detail: { checked: true },
          bubbles: true,
          composed: true,
        })
      );

      expect(handler).toHaveBeenCalled();
    });

    it("禁用节点 checkbox change 事件不应触发勾选", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.data = generateDisabledTestData();
      container.appendChild(tree);

      await waitForRender();

      const checkbox = findCheckboxByPath(tree, "1$-1");
      checkbox.dispatchEvent(
        new CustomEvent("change", {
          detail: { checked: true },
          bubbles: true,
          composed: true,
        })
      );

      const node = findNodeByPath(tree, "1$-1");
      expect(node.classList.contains("is-checked")).toBe(false);
    });
  });

  describe("数据边界条件", () => {
    it("空 children 数组应该渲染为叶子节点", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = [{ label: "Empty Children", children: [] }];
      container.appendChild(tree);

      await waitForRender();

      const toggleIcon = findToggleIconByPath(tree, "1$");
      expect(toggleIcon).toBeFalsy();

      const childrenEl = findChildrenByPath(tree, "1$");
      expect(childrenEl).toBeFalsy();
    });

    it("仅有 label 属性的节点应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = [{ label: "Simple" }];
      container.appendChild(tree);

      await waitForRender();

      const text = tree.shadowRoot.querySelector(".ea-tree__text");
      expect(text).toBeTruthy();
      expect(text.textContent).toBe("Simple");
    });

    it("data 为 null 时应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = null;
      container.appendChild(tree);

      await waitForRender();

      expect(tree.shadowRoot).toBeDefined();
    });

    it("data 为 undefined 时应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = undefined;
      container.appendChild(tree);

      await waitForRender();

      expect(tree.shadowRoot).toBeDefined();
    });

    it("节点 label 为空字符串时应该正常渲染", async () => {
      const tree = document.createElement("ea-tree");
      tree.data = [{ label: "" }];
      container.appendChild(tree);

      await waitForRender();

      const text = tree.shadowRoot.querySelector(".ea-tree__text");
      expect(text).toBeTruthy();
      expect(text.textContent).toBe("");
    });

    it("updateKeyChildren 更新子节点后应该更新节点状态", async () => {
      const tree = document.createElement("ea-tree");
      tree.nodeKey = "id";
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      const newChildren = [
        { id: 10, label: "New Child 1" },
        { id: 11, label: "New Child 2" },
      ];

      tree.updateKeyChildren(1, newChildren);

      await waitForRender(50);

      const nodeInfo = tree.getNode(10);
      expect(nodeInfo).toBeDefined();
      expect(nodeInfo.data.label).toBe("New Child 1");

      const oldNodeInfo = tree.getNode(2);
      expect(oldNodeInfo).toBeNull();
    });

    it("updateKeyChildren 更新子节点后 checkbox 状态应该正确传播", async () => {
      const tree = document.createElement("ea-tree");
      tree.showCheckbox = true;
      tree.nodeKey = "id";
      tree.data = generateIdTestData();
      container.appendChild(tree);

      await waitForRender();

      tree._handleCheckboxToggle("1$");
      expect(findNodeByPath(tree, "1$").classList.contains("is-checked")).toBe(
        true
      );

      const newChildren = [
        { id: 10, label: "New Child 1" },
        { id: 11, label: "New Child 2" },
      ];

      tree.updateKeyChildren(1, newChildren);

      await waitForRender(50);

      const rootNode = findNodeByPath(tree, "1$");
      expect(rootNode.classList.contains("is-checked")).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-tree");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("容器应该有 role=tree", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const containerEl = tree.shadowRoot.querySelector(".ea-tree");
        expect(containerEl.getAttribute("role")).toBe("tree");
      });

      it("设置 label 属性时容器应该有 aria-label", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        tree.setAttribute("label", "File Tree");
        container.appendChild(tree);
        await waitForRender();
        const containerEl = tree.shadowRoot.querySelector(".ea-tree");
        expect(containerEl.getAttribute("aria-label")).toBe("File Tree");
      });

      it("showCheckbox 时容器应该有 aria-multiselectable=true", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const containerEl = tree.shadowRoot.querySelector(".ea-tree");
        expect(containerEl.getAttribute("aria-multiselectable")).toBe("true");
      });

      it("不设置 showCheckbox 时容器不应该有 aria-multiselectable", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const containerEl = tree.shadowRoot.querySelector(".ea-tree");
        expect(containerEl.hasAttribute("aria-multiselectable")).toBe(false);
      });

      it("节点应该有 role=treeitem", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const node = findNodeByPath(tree, "1$");
        expect(node.getAttribute("role")).toBe("treeitem");
      });

      it("节点应该有 aria-label 属性", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const node = findNodeByPath(tree, "1$");
        expect(node.getAttribute("aria-label")).toBe("Level one 1");
      });

      it("有子节点的节点展开时应该有 aria-expanded=true", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        tree._expandPath("1$");
        const node = findNodeByPath(tree, "1$");
        expect(node.getAttribute("aria-expanded")).toBe("true");
      });

      it("有子节点的节点折叠时应该有 aria-expanded=false", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const node = findNodeByPath(tree, "1$");
        expect(node.getAttribute("aria-expanded")).toBe("false");
      });

      it("选中节点应该有 aria-selected=true", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        tree._selectPath("1$");
        const node = findNodeByPath(tree, "1$");
        expect(node.getAttribute("aria-selected")).toBe("true");
      });

      it("未选中节点应该有 aria-selected=false", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const node = findNodeByPath(tree, "1$");
        expect(node.getAttribute("aria-selected")).toBe("false");
      });

      it("showCheckbox 时勾选节点应该有 aria-checked=true", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = generateIdTestData();
        container.appendChild(tree);
        await waitForRender();
        tree._handleCheckboxToggle("1$-1-1");
        const node = findNodeByPath(tree, "1$-1-1");
        expect(node.getAttribute("aria-checked")).toBe("true");
      });

      it("showCheckbox 时半选节点应该有 aria-checked=mixed", async () => {
        const tree = document.createElement("ea-tree");
        tree.showCheckbox = true;
        tree.data = [
          { id: 1, label: "Parent", children: [{ id: 2, label: "Child 1" }, { id: 3, label: "Child 2" }] },
        ];
        container.appendChild(tree);
        await waitForRender();
        tree._handleCheckboxToggle("1$-1");
        const parentNode = findNodeByPath(tree, "1$");
        expect(parentNode.getAttribute("aria-checked")).toBe("mixed");
      });

      it("子节点容器应该有 role=group", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        tree._expandPath("1$");
        const childrenEl = findChildrenByPath(tree, "1$");
        expect(childrenEl.getAttribute("role")).toBe("group");
      });
    });

    describe("Keyboard Interaction", () => {
      it("ArrowDown 应该将焦点移到下一个节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const firstLabel = findLabelByPath(tree, "1$");
        firstLabel.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
        await waitForRender();
        const secondLabel = findLabelByPath(tree, "2$");
        expect(secondLabel.getAttribute("tabindex")).toBe("0");
      });

      it("ArrowUp 应该将焦点移到上一个节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const secondLabel = findLabelByPath(tree, "2$");
        secondLabel.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
        await waitForRender();
        const firstLabel = findLabelByPath(tree, "1$");
        expect(firstLabel.getAttribute("tabindex")).toBe("0");
      });

      it("Enter 应该选中叶子节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = [{ label: "Leaf 1" }, { label: "Leaf 2" }];
        container.appendChild(tree);
        await waitForRender();
        const labelEl = findLabelByPath(tree, "1$");
        labelEl.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        await waitForRender();
        expect(findNodeByPath(tree, "1$").classList.contains("is-selected")).toBe(true);
      });

      it("Space 应该选中节点", async () => {
        const tree = document.createElement("ea-tree");
        tree.data = generateTestData();
        container.appendChild(tree);
        await waitForRender();
        const labelEl = findLabelByPath(tree, "1$");
        labelEl.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
        await waitForRender();
        expect(findNodeByPath(tree, "1$").classList.contains("is-selected")).toBe(true);
      });
    });
  });
});
