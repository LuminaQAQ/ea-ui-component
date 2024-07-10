import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
<<<<<<< HEAD

export default defineConfig({
  base: '/ea_ui_component/',
  title: "ea-ui",

  head: [
    ['link', { rel: 'icon', href: '/ea_ui_component/favicon.ico' }]
  ],
=======
export default defineConfig({
  base: '/ea_ui_component/',

  title: "ea-ui",
>>>>>>> master

  cleanUrls: true,
  lastUpdated: true,

  description: "基于 WebComponent 的 ui 库",

<<<<<<< HEAD
  appearance: false,

=======
>>>>>>> master
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '组件', link: '/install' },
      { text: '测试页', link: '/test' },
    ],

    sidebar: [
      {
        text: '开发指南',
        items: [
          { text: '安装', link: '/install' },
          { text: '快速上手', link: '/example' }
        ]
      },
      {
        text: '基础组件',
        items: [
          { text: 'Icon 图标', link: '/ea-icon' },
          { text: 'Button 按钮', link: '/ea-button' },
          { text: 'Link 文字链接', link: '/ea-link' },
        ]
      },
      {
        text: '表单组件',
        items: [
          { text: 'Radio 单选框', link: '/ea-radio' },
          { text: 'Checkbox 多选框', link: '/ea-checkbox' },
<<<<<<< HEAD
          { text: 'Input 输入框', link: '/ea-input' },
          { text: 'Textarea 文本域', link: '/ea-textarea' },
          { text: 'InputNumber 计数器', link: '/ea-input-number' },
          { text: 'Select 选择器', link: '/ea-select' },
          { text: 'Switch 开关', link: '/ea-switch' },
          { text: 'Rate 评分', link: '/ea-rate' },
        ]
      },
      {
        text: '数据组件',
        items: [
          { text: 'Tag 标签', link: '/ea-tag' },
          { text: 'Progress 进度条', link: '/ea-progress' },
          { text: 'Pagination 分页', link: '/ea-pagination' },
          { text: 'Badge 徽标数', link: '/ea-badge' },
          { text: 'Avatar 头像', link: '/ea-avatar' },
          { text: "Skeleton 骨架屏", link: '/ea-skeleton' },
          { text: "Empty 空状态", link: '/ea-empty' },
          { text: "Descriptions 描述列表", link: '/ea-descriptions' },
          { text: "Result 结果", link: '/ea-result' },
        ]
      },
      {
        text: '提示组件',
        items: [
          { text: 'Alert 警告', link: '/ea-alert' },
          { text: 'Loading 加载', link: '/ea-loading' },
          { text: 'Message 消息提示', link: '/ea-message' },
          { text: 'MessageBox 消息框', link: '/ea-message-box' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: 'Card 卡片', link: '/ea-card' },
          { text: 'Carousel 走马灯', link: '/ea-carousel' },
          { text: 'Timeline 时间轴', link: '/ea-timeline' },
          { text: 'BackTop 回到顶部', link: '/ea-backtop' },
          { text: 'Collapse 折叠面板', link: '/ea-collapse' },
          { text: "Calendar 日历", link: '/ea-calendar' },
          { text: "Image 图片", link: '/ea-image' },
          { text: "InfiniteScroll 无限滚动", link: '/ea-infinite-scroll' },
        ],
      },
=======
        ]
      },
>>>>>>> master
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LuminaQAQ' }
    ]
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('ea-')
      }
    }
  },

})
