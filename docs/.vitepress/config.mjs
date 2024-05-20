import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/ea_ui_component/',

  title: "ea-ui",

  cleanUrls: true,
  lastUpdated: true,

  description: "基于 WebComponent 的 ui 库",

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
          { text: 'Button 按钮', link: '/button' },
          { text: 'Link 文字链接', link: '/link' },
        ]
      },
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
