# ToDoList

## Refactor

- 基础组件

  - [ ] Container 布局容器
    - [ ] Container 外层容器
    - [ ] Header 顶栏容器
    - [ ] Main 主体容器
    - [ ] Footer 底栏容器
    - [ ] Aside 侧边栏容器
  - [x] Icon 图标
  - [x] Button 按钮
    - [x] ButtonGroup 按钮组
  - [x] Link 文字链接

- 表单组件

  - [ ] Radio 单选框
  - [x] Checkbox 多选框
    - [x] CheckboxGroup 多选框组
  - [x] Input 输入框
  - [x] Select 选择器
    - [x] Option
    - [x] OptionGroup
  - [ ] Textarea 文本域
  - [x] InputNumber 计数器
  - [ ] Switch 开关
  - [ ] Rate 评分
  - [ ] TimePicker 时间选择器
  - [x] DatePicker 日期选择器
  - [x] Form 表单
    - [x] FormItem

- Data

  - [ ] Tag 标签
  - [ ] Progress 进度条
  - [ ] Pagination 分页
  - [x] Badge 标记
  - [x] Avatar 头像
  - [ ] Skeleton 骨架屏
  - [x] Empty 空状态
  - [x] Descriptions 描述列表
    - [x] DescriptionsItem
  - [ ] Result 结果
  - [x] Table 表格

- Notice

  - [x] Alert 警告
  - [x] Loading 加载
  - [x] Message 消息提示
  - [x] MessageBox 弹框

- Others

  - [x] Card 卡片
  - [x] Carousel 走马灯
    - [x] CarouselItem
  - [ ] TimeLine 时间线
  - [x] Backtop 回到顶部
  - [x] Collapse 折叠面板
    - [x] CollapseItem
  - [x] Calendar 日历
  - [x] Image 图片
  - [x] InfiniteScroll 无限滚动
    - [x] InfiniteScrollItem

- Navigation

  - [x] NavMenu 导航菜单
    - [x] NavMenuItem
    - [x] NavMenuItemGroup
    - [x] NavSubMenu
  - [ ] Tabs 标签页
  - [x] Breadcrumb 面包屑
    - [x] BreadcrumbItem
  - [ ] Tabs 标签页
  - [x] PageHeader 页头
  - [ ] Dropdown 下拉菜单
  - [ ] Steps 步骤条
  - [x] Drawer 抽屉

## 已知虫子

- 文档类

  - [ ] Container 布局容器, 开头描述中, 还是沿用的 `<el-container>`. `el` -> `ea`
  - [ ] Checkbox 多选框, 缺少 attr, slot, event 描述
  - [ ] Icon 图标, 缺少 图标来源
  - [ ] Message 调整了 引入方式及 使用方式,
        引入方式改为 `import 'ea-ui'`
        使用方式改为 `window.$message.open()`

- 脚本类

  - [ ] Descriptions 描述列表, span 值设置超过表格总 span 会导致元素消失
