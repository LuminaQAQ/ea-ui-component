import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** 参与 lockstep 版本同步的 package.json（mcp-server 版本独立，不参与） */
const TARGET_PACKAGE_JSONS = [
  "package.json",
  "packages/core/package.json",
  "packages/themes/package.json",
  "packages/components/package.json",
] as const;

type ReleaseType = "patch" | "minor" | "major";

/** 解析语义化版本号为 [major, minor, patch] */
const parseVersion = (version: string): [number, number, number] => {
  const parts = version.split(".").map(Number);
  if (
    parts.length !== 3 ||
    parts.some(num => !Number.isInteger(num) || num < 0)
  ) {
    throw new Error(`无效的版本号: ${version}`);
  }
  return [parts[0], parts[1], parts[2]];
};

/** 按发布类型递增版本号 */
const bumpVersion = (version: string, type: ReleaseType): string => {
  const [major, minor, patch] = parseVersion(version);
  if (type === "major") return `${major + 1}.0.0`;
  if (type === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
};

const main = (): void => {
  const type = process.argv[2] as ReleaseType | undefined;
  if (!type || !["patch", "minor", "major"].includes(type)) {
    console.error("用法: tsx scripts/bump-version.ts <patch|minor|major>");
    process.exit(1);
  }

  const rootPkgPath = path.resolve(ROOT, TARGET_PACKAGE_JSONS[0]);
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf-8"));
  const newVersion = bumpVersion(rootPkg.version, type);

  for (const relPath of TARGET_PACKAGE_JSONS) {
    const pkgPath = path.resolve(ROOT, relPath);
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    const oldVersion = pkg.version;
    pkg.version = newVersion;
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    console.log(`${relPath}: ${oldVersion} → ${newVersion}`);
  }

  console.log(`\n版本已同步为 ${newVersion}，请提交后打 tag 触发发布。`);
};

main();
