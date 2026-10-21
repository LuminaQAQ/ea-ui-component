import { describe, it, expect } from "vitest";

import {
  findClassNames,
  hasCustomElementDecorator,
  isThinBarrel,
  findBarrelMainClass,
  findComponentsImportLine,
  findLocalNamedExportLine,
  findDefaultObjectExportLine,
  findDynamicRelativeImports,
  rewriteRelativeSpecifierDepths,
} from "../lib/source";

describe("lib/source", () => {
  it("findClassNames 区分导出类与非导出类", () => {
    const src = [
      "class Internal {}",
      "export class EaFoo {}",
      "export default class EaBar {}",
    ].join("\n");
    expect(findClassNames(src)).toEqual(["Internal", "EaFoo", "EaBar"]);
    expect(findClassNames(src, true)).toEqual(["EaFoo", "EaBar"]);
  });

  it("hasCustomElementDecorator 只认装饰器，不被注释/字符串误判", () => {
    expect(
      hasCustomElementDecorator("@CustomElement('ea-x')\nexport class EaX {}")
    ).toBe(true);
    expect(
      hasCustomElementDecorator("// @CustomElement 示例\nexport class EaX {}")
    ).toBe(false);
    expect(
      hasCustomElementDecorator(
        "const s = '@CustomElement';\nexport class EaX {}"
      )
    ).toBe(false);
  });

  it("isThinBarrel / findBarrelMainClass", () => {
    const barrel =
      'import { EaFoo } from "./components/ea-foo";\nexport { EaFoo };';
    expect(isThinBarrel(barrel)).toBe(true);
    expect(findBarrelMainClass(barrel)).toBe("EaFoo");

    const impl = 'import "./a";\nexport class EaFoo {}';
    expect(isThinBarrel(impl)).toBe(false);
  });

  it("定位 import 插入点与出口行", () => {
    const src = [
      'import x from "x";',
      'import { A } from "./components/a";',
      'import "./components/b";',
      "export { A, B };",
      "export default { A, B };",
    ].join("\n");
    expect(findComponentsImportLine(src)).toBe(2);
    expect(findLocalNamedExportLine(src)).toBe(3);
    expect(findDefaultObjectExportLine(src)).toBe(4);
  });

  it("findDynamicRelativeImports 只收相对动态导入", () => {
    const src =
      'const a = import("./x"); const b = require("./y"); const c = require("z");';
    expect(findDynamicRelativeImports(src)).toHaveLength(2);
  });

  it("rewriteRelativeSpecifierDepths 只改真实说明符，不动注释/字符串/scss", () => {
    const src = [
      '// 示例 from "./commented"',
      'import a from "./a";',
      'import s from "./index.scss?inline";',
      'export * from "../b";',
      "const t = 'from \"./insideString\"';",
    ].join("\n");

    const { text, changed } = rewriteRelativeSpecifierDepths(src);

    expect(text).toContain('import a from "../../a";');
    expect(text).toContain('import s from "./index.scss?inline";');
    expect(text).toContain('export * from "../../../b";');
    expect(text).toContain('// 示例 from "./commented"');
    expect(text).toContain("'from \"./insideString\"'");
    expect(changed).toHaveLength(2);
  });
});
