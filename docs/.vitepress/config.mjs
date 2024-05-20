import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ea-ui",
  description: "基于 WebComponent 的 ui 库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '组件', link: '/markdown-examples' }
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
          { text: 'Button 按钮', link: '/button' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LuminaQAQ' }
    ]
  }
})
