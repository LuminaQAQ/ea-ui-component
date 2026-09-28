import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

interface EntryConfigs {
  [key: string]: string;
}

/** 组件目录 → 公开类型导出名（用于生成类型入口；ea-container 无公开导出，跳过） */
const COMPONENT_TYPE_EXPORTS: Record<string, string[]> = {
  "ea-affix": ["EaAffix"],
  "ea-alert": ["EaAlert"],
  "ea-avatar": ["EaAvatar"],
  "ea-backtop": ["EaBacktop"],
  "ea-badge": ["EaBadge"],
  "ea-border-beam": ["EaBorderBeam"],
  "ea-breadcrumb": ["EaBreadcrumb", "EaBreadcrumbItem"],
  "ea-button": ["EaButton", "EaButtonGroup"],
  "ea-calendar": ["EaCalendar"],
  "ea-card": ["EaCard"],
  "ea-carousel": ["EaCarousel", "EaCarouselItem"],
  "ea-checkbox": ["EaCheckbox", "EaCheckboxGroup"],
  "ea-collapse": ["EaCollapse", "EaCollapseItem"],
  "ea-color-picker": ["EaColorPicker", "EaColorPickerPanel"],
  "ea-countdown": ["EaCountdown"],
  "ea-date-picker": ["EaDatePicker"],
  "ea-descriptions": ["EaDescriptions", "EaDescriptionsItem"],
  "ea-dialog": ["EaDialog"],
  "ea-divider": ["EaDivider"],
  "ea-drawer": ["EaDrawer"],
  "ea-dropdown": ["EaDropdown", "EaDropdownItem", "EaDropdownMenu"],
  "ea-effects": ["EaEffects"],
  "ea-empty": ["EaEmpty"],
  "ea-icon": ["EaIcon"],
  "ea-image": ["EaImage"],
  "ea-image-preview": ["EaImagePreview"],
  "ea-infinite-scroll": ["EaInfiniteScroll"],
  "ea-input": ["EaInput"],
  "ea-input-number": ["EaInputNumber"],
  "ea-layout": ["EaRow", "EaCol"],
  "ea-link": ["EaLink"],
  "ea-loading": ["EaLoading", "EaLoadingService"],
  "ea-menu": ["EaMenu", "EaMenuItem", "EaMenuItemGroup", "EaSubMenu"],
  "ea-message": ["EaMessageElement", "EaMessage"],
  "ea-message-box": ["EaMessageBox", "EaMessageBoxElement"],
  "ea-notification": ["EaNotificationElement", "EaNotification"],
  "ea-page-header": ["EaPageHeader"],
  "ea-pagination": ["EaPagination"],
  "ea-popconfirm": ["EaPopconfirm"],
  "ea-popover": ["EaPopover"],
  "ea-progress": ["EaProgress"],
  "ea-radio": ["EaRadio", "EaRadioGroup"],
  "ea-rate": ["EaRate"],
  "ea-result": ["EaResult"],
  "ea-scrollbar": ["EaScrollbar"],
  "ea-segmented": ["EaSegmented"],
  "ea-select": ["EaSelect", "EaOption"],
  "ea-skeleton": ["EaSkeleton", "EaSkeletonItem"],
  "ea-slider": ["EaSlider"],
  "ea-space": ["EaSpace"],
  "ea-splitter": ["EaSplitter", "EaSplitterPanel", "EaSplitterBar"],
  "ea-statistic": ["EaStatistic"],
  "ea-steps": ["EaStep", "EaSteps"],
  "ea-switch": ["EaSwitch"],
  "ea-table": ["EaTable", "EaTableColumn"],
  "ea-tabs": ["EaTab", "EaTabs", "EaTabPanel"],
  "ea-tag": ["EaTag", "EaCheckTag"],
  "ea-text": ["EaText"],
  "ea-theme-toggle": ["EaThemeToggle"],
  "ea-time-picker": ["EaTimePicker"],
  "ea-timeline": ["EaTimeline", "EaTimelineItem"],
  "ea-tooltip": ["EaTooltip"],
  "ea-tour": ["EaTour", "EaTourStep"],
  "ea-transfer": ["EaTransfer"],
  "ea-tree": ["EaTree"],
  "ea-upload": ["EaUpload"],
  "ea-watermark": ["EaWatermark"],
};

interface ExportsConfig {
  [key: string]:
    | string
    | { import?: string; require?: string; default?: string; types?: string };
}

export const handleImportModules = (): void => {
  const dir = path.join(ROOT, "packages/components/src/components");
  const entryPath = path.join(
    ROOT,
    "packages/components/src/components/index.ts"
  );
  fs.writeFileSync(entryPath, "");

  fs.readdirSync(dir).forEach((file: string) => {
    const filePath = path.join(dir, file);
    const isDir = fs.statSync(filePath).isDirectory();

    if (isDir) {
      const indexPath = path.join(filePath, "index.ts");
      if (fs.existsSync(indexPath)) {
        fs.appendFileSync(entryPath, `import './${file}/index';\n`);
      }
    }
  });

  fs.appendFileSync(entryPath, `import './ea-icon/index.scss';\n`);
  fs.appendFileSync(
    entryPath,
    `import { initTheme } from "@easy-component-ui/themes/controller";\n`
  );
  fs.appendFileSync(entryPath, `initTheme();\n`);

  for (const [dir, names] of Object.entries(COMPONENT_TYPE_EXPORTS)) {
    fs.appendFileSync(
      entryPath,
      `export type { ${names.join(", ")} } from "./${dir}";\n`
    );
  }
};

export const handlePackageExport = (): void => {
  const dir = path.resolve(ROOT, "packages/components/src/components");
  const themesDir = path.resolve(ROOT, "packages/themes/src");
  const entryConfigs: EntryConfigs = {
    index: path.resolve(ROOT, "packages/components/src/components/index.ts"),
  };

  const exportsConfig: ExportsConfig = {
    ".": {
      import: "./dist/components/index.js",
      types: "./dist/types/components/index.d.ts",
    },
    "./icon-assets": {
      import: "./dist/assets/icon.css",
      require: "./dist/assets/icon.css",
      default: "./dist/assets/icon.css",
    },
    "./themes/source": {
      import: "./dist/themes/source.js",
    },
    "./themes/light": {
      import: "./dist/themes/light.js",
    },
    "./themes/dark": {
      import: "./dist/themes/dark.js",
    },
    "./theme": {
      import: "./dist/themes/controller.js",
    },
  };

  fs.readdirSync(dir).forEach((file: string) => {
    const subPath = path.resolve(dir, file);
    const isDirectory = fs.statSync(subPath).isDirectory();

    if (isDirectory) {
      const entryPath = path.resolve(subPath, "index.ts");
      entryConfigs[file] = entryPath;

      exportsConfig[`./${file}`] = {
        import: `./dist/components/${file}.js`,
        types: `./dist/types/components/${file}/index.d.ts`,
      };
    }
  });

  entryConfigs["themes/source"] = path.resolve(themesDir, "source.entry.ts");
  entryConfigs["themes/light"] = path.resolve(themesDir, "light.entry.ts");
  entryConfigs["themes/dark"] = path.resolve(themesDir, "dark.entry.ts");
  entryConfigs["theme"] = path.resolve(themesDir, "controller.ts");

  const pkgPath = path.resolve(ROOT, "packages/components/package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.exports = exportsConfig;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
};

export const handleImportChildPages = (): void => {
  const dir = path.join(ROOT, "test");
  const entryPath = path.join(ROOT, "index.html");
  const files: string[] = [];

  fs.readdirSync(dir).forEach((file: string) => {
    files.push(`./test/${file}`);
  });

  fs.writeFileSync(
    entryPath,
    `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <script>
                (function() {
                    var s = localStorage.getItem('ea-theme');
                    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (s === 'dark' || (s !== 'light' && d)) {
                        document.documentElement.classList.add('dark');
                    }
                })();
            </script>
        </head>

        <body>
            <script type="module" src="main.ts"></script>
            ${files.map(file => `<p><ea-button type="primary" href="${file}" link size="large"> ${file.slice(7, files.length)}</ea-button></p>`).join("\n")}
        </body>

        </html>
    `
  );
};
