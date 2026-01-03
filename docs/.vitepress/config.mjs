import { resolve } from "path";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config

const base = process.env.NODE_ENV === "production" ? "/ea-ui-component/" : "";
const iconHref =
  process.env.NODE_ENV === "production" ? "/ea-ui-component/" : "";

export default defineConfig({
  base,
  title: "ea-ui",
  description: "基于 WebComponent 的 ui 库",

  head: [
    [
      "link",
      {
        rel: "shortcut icon",
        href: `${iconHref}/favicon.ico`,
        type: "image/x-icon",
      },
    ],
    ["link", { rel: "stylesheet", href: `${base}dist/assets/icon.css` }],
    ["link", { rel: "stylesheet", href: `${base}index.css` }],

    // ['link', { rel: 'stylesheet', href: '/ea-ui-component/ea-icon/css/fontello.css' }],
    // ['link', { rel: 'stylesheet', href: '/ea-ui-component/index.scss' }],
    // ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/easy-component-ui/components/ea-icon/css/fontello.min.css' }],
  ],

  cleanUrls: true,
  lastUpdated: true,
  // mpa: true,

  appearance: false,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "组件", link: "/install" }],
    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "开始",
        items: [
          // { text: "安装", link: "/guide/install" },
          // { text: "快速上手", link: "/guide/example" },
          { text: "使用", link: "/guide/Usage" },
          // { text: "如何改变图标链接？", link: "/guide/customIconFontHref" },
          // {
          //   text: "如何处理图标丢失的问题？",
          //   link: "/guide/HowDoIDealWithIconLoss",
          // },
        ],
      },
      {
        text: "Basic 基础组件",
        items: [
          { text: "Button 按钮", link: "/ea-button" },
          { text: "Container 布局容器", link: "/ea-container" },
          { text: "Icon 图标", link: "/ea-icon" },
          { text: "Layout 布局", link: "/ea-layout" },
          { text: "Link 链接", link: "/ea-link" },
          { text: "Text 文本", link: "/ea-text" },
          { text: "Scrollbar 滚动条", link: "/ea-scrollbar" },
          { text: "Space 间距", link: "/ea-space" },
          { text: "Splitter 分隔面板", link: "/ea-splitter" },
        ],
      },
      {
        text: "Form 表单组件",
        items: [
          // { text: "Autocomplete 自动补全输入框", link: "/ea-autocomplete" },
          // { text: "Cascader 级联选择器", link: "/ea-cascader" },
          // { text: "Checkbox 多选框", link: "/ea-checkbox" },
          // {
          //   text: "ColorPickerPanel 颜色选择器面板",
          //   link: "/ea-color-picker-panel",
          // },
          // { text: "Color Picker 颜色选择器", link: "/ea-color-picker" },
          // {
          //   text: "Date Picker Panel 日期选择器面板",
          //   link: "/ea-date-picker-panel",
          // },
          // { text: "Date Picker 日期选择器", link: "/ea-date-picker" },
          // {
          //   text: "DateTime Picker 日期时间选择器",
          //   link: "/ea-date-time-picker",
          // },
          // { text: "Form 表单组件", link: "/ea-form" },
          // { text: "Input 输入框", link: "/ea-input" },
          // { text: "Input Number 数字输入框", link: "/ea-input-number" },
          // { text: "Input Tag 标签输入框", link: "/ea-input-tag" },
          // { text: "Mention 提及", link: "/ea-mention" },
          // { text: "Radio 单选框", link: "/ea-radio" },
          // { text: "Rate 评分", link: "/ea-rate" },
          // { text: "Select 选择器", link: "/ea-select" },
          // { text: "Slider 滑块", link: "/ea-slider" },
          // { text: "Switch 开关", link: "/ea-switch" },
          // { text: "Time Picker 时间选择器", link: "/ea-time-picker" },
          // { text: "Time Select 时间选择", link: "/ea-time-select" },
          // { text: "Transfer 穿梭框", link: "/ea-transfer" },
          // { text: "TreeSelect 树形选择", link: "/ea-tree-select" },
          // { text: "Upload 上传器", link: "/ea-upload" },
        ],
      },
      {
        text: "Data 数据展示",
        items: [
          { text: "Avatar 头像", link: "/ea-avatar" },
          { text: "Badge 徽章", link: "/ea-badge" },
          // { text: 'Calendar 日历', link: '/ea-calendar' },
          { text: "Card 卡片", link: "/ea-card" },
          { text: "Carousel 走马灯", link: "/ea-carousel" },
          { text: "Collapse 折叠面板", link: "/ea-collapse" },
          { text: "Descriptions 描述列表", link: "/ea-descriptions" },
          { text: "Empty 空状态", link: "/ea-empty" },
          { text: "Image 图片", link: "/ea-image" },
          { text: "Infinite Scroll 无限滚动", link: "/ea-infinite-scroll" },
          { text: "Pagination 分页 [ ]", link: "/ea-pagination" },
          { text: "Progress 进度条", link: "/ea-progress" },
          { text: "Result 结果", link: "/ea-result" },
          { text: "Skeleton 骨架屏", link: "/ea-skeleton" },
          { text: "Table 表格 [ ]", link: "/ea-table" },
          { text: "Tag 标签", link: "/ea-tag" },
          { text: "Timeline 时间线", link: "/ea-timeline" },
          { text: "Tour 漫游式引导", link: "/ea-tour" },
          // { text: "Tree 树形控件", link: "/ea-tree" },
          { text: "Statistic 统计组件", link: "/ea-statistic" },
          { text: "Segmented 分段控制器", link: "/ea-segmented" },
        ],
      },
      {
        text: "Navigation 导航",
        items: [
          // { text: "Affix 固钉", link: "/ea-affix" },
          // { text: "Anchor 锚点", link: "/ea-anchor" },
          { text: "Backtop 回到顶部", link: "/ea-backtop" },
          { text: "Breadcrumb 面包屑", link: "/ea-breadcrumb" },
          { text: "Dropdown 下拉菜单", link: "/ea-dropdown" },
          { text: "Menu 菜单", link: "/ea-menu" },
          { text: "Page Header 页头", link: "/ea-page-header" },
          { text: "Steps 步骤条", link: "/ea-steps" },
          { text: "Tabs 标签页", link: "/ea-tabs" },
        ],
      },
      {
        text: "Feedback 反馈组件",
        items: [
          { text: "Alert 提示", link: "/ea-alert" },
          { text: "Dialog 对话框", link: "/ea-dialog" },
          { text: "Drawer 抽屉", link: "/ea-drawer" },
          { text: "Loading 加载", link: "/ea-loading" },
          { text: "Message 消息提示", link: "/ea-message" },
          { text: "Message Box 消息弹出框", link: "/ea-message-box" },
          { text: "Notification 通知", link: "/ea-notification" },
          { text: "Popconfirm 气泡确认框", link: "/ea-popconfirm" },
          { text: "Popover 弹出框", link: "/ea-popover" },
          { text: "Tooltip 文字提示", link: "/ea-tooltip" },
        ],
      },
      {
        text: "Foundation 基础元件",
        items: [
          { text: "Popper 气泡", link: "/ea-popper" },
          { text: "Overlay 遮罩层", link: "/ea-overlay" },
        ],
      },
      {
        text: "Others 其他",
        items: [
          { text: "Divider 分割线", link: "/ea-divider" },
          { text: "Watermark 水印", link: "/ea-watermark" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/LuminaQAQ" }],
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.includes("ea-"),
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @use "../index.scss" as *;
          `,
          includePaths: [resolve(__dirname)],
        },
      },
    },
  },
});
