# Easy Component UI

![Easy-ui](./logo.png)
[![NPM version](https://img.shields.io/npm/v/easy-component-ui.svg?color=red)](https://www.npmjs.com/package/easy-component-ui)
![npm](https://img.shields.io/npm/dw/easy-component-ui)
![npm](https://img.shields.io/npm/dt/easy-component-ui)
[![GitHub stars](https://img.shields.io/github/stars/LuminaQAQ/ea-ui-component.svg?color=#42b983)](https://github.com/LuminaQAQ/ea-ui-component/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/LuminaQAQ/ea-ui-component.svg)](https://github.com/LuminaQAQ/ea-ui-component/network/members)
[![License](https://img.shields.io/npm/l/easy-component-ui.svg)](https://github.com/LuminaQAQ/ea-ui-component/blob/main/LICENSE)

`Easy Component UI`（简称 `ea-ui`）是一套使用原生 `Web Components` 规范开发的跨框架 UI 组件库。该框架参考了[Element-ui](https://element.eleme.cn/#/zh-CN/component/installation)，所以不能说是很像吧，但可以说是一模一样 😂(打算有时间把所有的都模仿一遍)。[查看文档](https://luminaqaq.github.io/ea-ui-component/)

[GitHub 项目地址](https://github.com/LuminaQAQ/ea-ui-component) | [在线文档](https://luminaqaq.github.io/ea-ui-component/) | [NPM 包](https://www.npmjs.com/package/easy-component-ui)

## 安装

```bash
# npm
npm install easy-component-ui

# yarn
yarn add easy-component-ui

# pnpm
pnpm add easy-component-ui
```

## 快速开始

### 完整引入

```javascript
import "easy-component-ui";
```

### 按需引入

```javascript
import "easy-component-ui/ea-button";
import "easy-component-ui/ea-input";
```

### 在 HTML 中使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>Easy UI Demo</title>
    <script type="module">
      import "easy-component-ui/ea-button";
    </script>
  </head>
  <body>
    <ea-button type="primary">主要按钮</ea-button>
  </body>
</html>
```

## 组件列表

### Basic 基础组件

- [x] Button 按钮
- [x] Container 布局容器
- [x] Icon 图标
- [x] Layout 布局
- [x] Link 链接
- [x] Text 文本
- [x] Scrollbar 滚动条
- [x] Space 间距
- [x] Splitter 分隔面板

### Form 表单组件

- [x] Checkbox 多选框
- [x] Input 输入框
- [x] Input Number 数字输入框
- [x] Radio 单选框
- [x] Rate 评分
- [x] Switch 开关
- [x] Select 选择器
- [x] Slider 滑块
- [x] Form 表单组件
- [x] Date Picker 日期选择器
- [x] Time Picker 时间选择器
- [x] Color Picker 颜色选择器

### Data 数据展示

- [x] Avatar 头像
- [x] Badge 徽章
- [x] Calendar 日历
- [x] Card 卡片
- [x] Carousel 走马灯
- [x] Collapse 折叠面板
- [x] Descriptions 描述列表
- [x] Empty 空状态
- [x] Image 图片
- [x] Infinite Scroll 无限滚动
- [x] Pagination 分页
- [x] Progress 进度条
- [x] Result 结果
- [x] Skeleton 骨架屏
- [x] Statistic 统计组件
- [x] Segmented 分段控制器
- [x] Tag 标签
- [x] Timeline 时间线
- [x] Tour 漫游式引导
- [x] Table 表格
- [x] Tree 树形控件

### Navigation 导航

- [x] Backtop 回到顶部
- [x] Breadcrumb 面包屑
- [x] Dropdown 下拉菜单
- [x] Menu 菜单
- [x] Page Header 页头
- [x] Steps 步骤条
- [x] Tabs 标签页

### Feedback 反馈组件

- [x] Alert 提示
- [x] Dialog 对话框
- [x] Drawer 抽屉
- [x] Loading 加载
- [x] Message 消息提示
- [x] Message Box 消息弹出框
- [x] Notification 通知
- [x] Popconfirm 气泡确认框
- [x] Popover 弹出框
- [x] Tooltip 文字提示

## 开发

```bash
# 克隆项目
git clone https://github.com/LuminaQAQ/ea-ui-component.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建文档
npm run build:doc

# 预览文档
npm run preview:doc
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

[MIT](https://github.com/LuminaQAQ/ea-ui-component/blob/main/LICENSE) License © 2024 [LuminaQAQ](https://github.com/LuminaQAQ)
