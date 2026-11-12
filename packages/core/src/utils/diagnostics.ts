/** 诊断输出级别 */
export type EaDiagnosticsLevel = "off" | "error" | "warn";

/** 诊断配置 */
export interface EaDiagnosticsOptions {
  /** 输出级别；默认 `warn` */
  level?: EaDiagnosticsLevel;
  /** 按 key 过滤，返回 false 时静默 */
  filter?: (key: string) => boolean;
}

/** 全局注入配置的键名 */
const GLOBAL_DIAGNOSTICS_KEY = "__EA_DIAGNOSTICS__";

/** 输出前缀 */
const PREFIX = "[ea-ui]";

/** 级别权重，数值越大输出越多 */
const LEVEL_WEIGHT: Record<EaDiagnosticsLevel, number> = {
  off: 0,
  error: 1,
  warn: 2,
};

const state: {
  level: EaDiagnosticsLevel;
  filter: ((key: string) => boolean) | null;
} = {
  level: "warn",
  filter: null,
};

/** 已输出过的 key，用于 `*Once` 系列去重 */
const reported = new Set<string>();

/**
 * 配置诊断输出
 * @param options 级别与过滤器
 */
export function configureDiagnostics(options: EaDiagnosticsOptions = {}): void {
  if (options.level) state.level = options.level;
  if ("filter" in options) state.filter = options.filter ?? null;
  reported.clear();
}

/** 恢复默认配置并清空去重记录 */
export function resetDiagnostics(): void {
  state.level = "warn";
  state.filter = null;
  reported.clear();
}

/**
 * 读取全局注入的配置
 * 只读取一次，之后由 configureDiagnostics 接管
 */
function syncGlobal(): void {
  const options = (globalThis as Record<string, unknown>)[
    GLOBAL_DIAGNOSTICS_KEY
  ] as EaDiagnosticsOptions | undefined;

  if (!options) return;

  delete (globalThis as Record<string, unknown>)[GLOBAL_DIAGNOSTICS_KEY];
  configureDiagnostics(options);
}

/**
 * 判断本条消息是否需要输出
 * @param level 本条消息级别
 * @param key 去重与过滤用的键
 * @param once 是否按 key 去重
 */
function shouldReport(
  level: "error" | "warn",
  key: string,
  once: boolean
): boolean {
  if (LEVEL_WEIGHT[state.level] < LEVEL_WEIGHT[level]) return false;
  if (state.filter && !state.filter(key)) return false;
  if (once && reported.has(key)) return false;

  if (once) reported.add(key);

  return true;
}

/**
 * 输出错误
 * @param key 去重与过滤用的键，通常为模块名
 * @param args 透传给 console.error 的参数
 */
export function reportError(key: string, ...args: unknown[]): void {
  syncGlobal();

  if (!shouldReport("error", key, false)) return;

  console.error(`${PREFIX} ${key}`, ...args);
}

/**
 * 输出错误，同一个 key 只输出一次
 * @param key 去重与过滤用的键
 * @param args 透传给 console.error 的参数
 */
export function reportErrorOnce(key: string, ...args: unknown[]): void {
  syncGlobal();

  if (!shouldReport("error", key, true)) return;

  console.error(`${PREFIX} ${key}`, ...args);
}

/**
 * 输出警告
 * @param key 去重与过滤用的键，通常为模块名
 * @param args 透传给 console.warn 的参数
 */
export function reportWarn(key: string, ...args: unknown[]): void {
  syncGlobal();

  if (!shouldReport("warn", key, false)) return;

  console.warn(`${PREFIX} ${key}`, ...args);
}

/**
 * 输出警告，同一个 key 只输出一次
 * @param key 去重与过滤用的键
 * @param args 透传给 console.warn 的参数
 */
export function reportWarnOnce(key: string, ...args: unknown[]): void {
  syncGlobal();

  if (!shouldReport("warn", key, true)) return;

  console.warn(`${PREFIX} ${key}`, ...args);
}
