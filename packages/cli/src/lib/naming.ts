/** WC 全名格式：小写字母开头，至少一段连字符 */
const WC_NAME_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;

/** 全名长度上限：255 为同目录 <name>.test.ts 文件名段长上限 */
const MAX_TAG_NAME_LENGTH = 246;

/** WC 规范保留标签名（HTML 标准已占用，组件库不可注册） */
export const RESERVED_TAG_NAMES = new Set([
  "annotation-xml",
  "color-profile",
  "font-face",
  "font-face-src",
  "font-face-uri",
  "font-face-format",
  "font-face-name",
  "missing-glyph",
]);

/**
 * 组件名校验正则工厂：已配置 prefix ⇒ `${prefix}-` + kebab-case；
 * 未配置 ⇒ 退化为纯 WC 全名格式校验（check 读路径零 prefix 可运行）
 */
export function createNameRe(prefix?: string): RegExp {
  if (!prefix) return WC_NAME_RE;
  return new RegExp(`^${prefix}-[a-z0-9]+(?:-[a-z0-9]+)*$`);
}

/** kebab-case → PascalCase（ea-color-picker → EaColorPicker） */
export function toPascalCase(kebab: string): string {
  return kebab.replace(/(?:^|-)([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

export interface NormalizedName {
  /** 归一化后的裸 kebab 名（不含 prefix） */
  bare: string;
  /** 组件完整标签名 */
  full: string;
}

/**
 * 名称归一化（prefix 规则：写路径专用——已配置 prefix 时调用）：
 * 非 `${prefix}-` 开头一律拼接；以 `${prefix}-` 开头则剥离得裸名。
 * 边界输入拒绝：裸名含大写（归一化后仍非法）、输入恰等于 prefix 本身、
 * 剥出裸名为空（如输入 `ea-`）。返回 { error } 而非抛错，供 prompts validate 即时报因
 */
export function normalizeName(
  input: string,
  prefix: string
): NormalizedName | { error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { error: "名称不能为空" };

  if (/[A-Z]/.test(trimmed)) {
    return {
      error: `"${trimmed}" 含大写字母，请使用 kebab-case（如 color-picker）`,
    };
  }

  if (trimmed === prefix) {
    return { error: `请输入组件名而非前缀（"${prefix}" 是命名空间前缀）` };
  }

  const bare = trimmed.startsWith(`${prefix}-`)
    ? trimmed.slice(prefix.length + 1)
    : trimmed;
  if (!bare) {
    return { error: `"${trimmed}" 剥离前缀后裸名为空，请输入完整组件名` };
  }

  const full = `${prefix}-${bare}`;
  if (full.length > MAX_TAG_NAME_LENGTH) {
    return {
      error: `"${trimmed}" 归一化后全名 ${full.length} 字符超长（上限 ${MAX_TAG_NAME_LENGTH}，为同目录 ${full}.test.ts 文件名预留 255 段长）`,
    };
  }

  const wcError = validateWcFull(full);
  if (wcError) return { error: wcError };

  return { bare, full };
}

/**
 * 最终全名强校验（两种配置共用）：WC 格式 + 保留名黑名单。
 * 合法返回 null，违规返回具体原因
 */
export function validateWcFull(full: string): string | null {
  if (!WC_NAME_RE.test(full)) {
    return `"${full}" 不符合 Web Components 命名规范（小写字母/数字，至少一段连字符，不以连字符开头或结尾）`;
  }

  if (RESERVED_TAG_NAMES.has(full)) {
    return `"${full}" 是 HTML 规范保留标签名，不可作为组件名`;
  }

  return null;
}
