import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config

export default defineConfig({
  base: '/ea_ui_component/',
  title: "ea-ui",

  head: [
    ['link', { rel: 'icon', href: '/ea_ui_component/favicon.ico' }]
  ],

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
