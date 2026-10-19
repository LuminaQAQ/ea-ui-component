export {
  loadConfig,
  type EaConfig,
  type ResolvedEaConfig,
  type ResolvedComponentDir,
  type IgnoreEntry,
  type ComponentDirConfig,
} from "./lib/config";
export {
  regenerateAggregateEntry,
  diffAggregateEntry,
  type AggregateDiff,
} from "./lib/aggregate";
export {
  scanComponentDirs,
  scanTestRootFiles,
  type ComponentDirInfo,
} from "./lib/scan";
export {
  toPascalCase,
  createNameRe,
  normalizeName,
  validateWcFull,
  RESERVED_TAG_NAMES,
  type NormalizedName,
} from "./lib/naming";
export {
  renderTemplate,
  renderPlaceholders,
  renderCut,
  loadTemplate,
  resolveBuiltinTemplatesDir,
  BUILTIN_TEMPLATE_FILES,
  TEMPLATE_DOC_FILE,
  TPL_CUT_MARKER,
  type RenderContext,
} from "./lib/template";
export { runCheck, type CheckOptions } from "./commands/check";
export { runAdd, type AddOptions } from "./commands/add";
export { runInit, runInitTemplates, type InitOptions } from "./commands/init";
export { runSync, type SyncOptions } from "./commands/sync";
