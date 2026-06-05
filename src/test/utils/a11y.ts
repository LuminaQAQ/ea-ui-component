import axe from "axe-core";

const DEFAULT_OPTIONS: axe.RunOptions = {
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
  },
  rules: {
    "color-contrast": { enabled: false },
    region: { enabled: false },
  },
};

/**
 * 对指定元素运行 axe-core 无障碍审计
 * @param element 目标元素
 * @param options axe-core 运行选项（与默认选项合并）
 * @returns axe-core 审计结果
 */
export async function runAxe(
  element: HTMLElement,
  options?: axe.RunOptions
): Promise<axe.AxeResults> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const results = await axe.run(element, mergedOptions);
  return results;
}

/**
 * 断言无障碍审计结果无违规
 * @param results axe-core 审计结果
 * @throws 当存在违规时抛出包含详细信息的错误
 */
export function assertNoA11yViolations(results: axe.AxeResults): void {
  const violations = results.violations;
  if (violations.length > 0) {
    const message = violations
      .map(
        v =>
          `${v.id}: ${v.description}\n  ${v.nodes.map(n => n.html).join("\n  ")}`
      )
      .join("\n");
    throw new Error(`Accessibility violations found:\n${message}`);
  }
}
