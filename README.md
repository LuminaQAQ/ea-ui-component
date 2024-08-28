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
  - [x] Link 文字链接

- 表单组件

  - [ ] Radio 单选框
  - [x] Checkbox 多选框
  - [x] Input 输入框
  - [ ] Textarea 文本域
  - [x] InputNumber 计数器
  - [ ] Switch 开关
  - [ ] Rate 评分
  - [ ] TimePicker 时间选择器
  - [ ] DatePicker 日期选择器
  - [x] Form 表单

- Data

  - [ ] Tag 标签
  - [ ] Progress 进度条
  - [ ] Pagination 分页
  - [x] Badge 标记
  - [x] Avatar 头像
  - [ ] Skeleton 骨架屏
  - [x] Empty 空状态
  - [x] Descriptions 描述列表
  - [ ] Result 结果
  - [x] Table 表格

- Notice

  - [ ] Alert 警告
  - [x] Loading 加载
  - [ ] Message 消息提示
  - [ ] MessageBox 弹框

- Others

  - [x] Card 卡片
  - [x] Carousel 走马灯
  - [ ] TimeLine 时间线
  - [x] Backtop 回到顶部
  - [x] Collapse 折叠面板
  - [x] Calendar 日历
  - [x] Image 图片
  - [x] InfiniteScroll 无限滚动

- Navigation

  - [ ] NavMenu 导航菜单
  - [ ] Tabs 标签页
  - [x] Breadcrumb 面包屑
  - [ ] Tabs 标签页
  - [ ] PageHeader 页头
  - [ ] Dropdown 下拉菜单
  - [ ] Steps 步骤条
  - [x] Drawer 抽屉

## 已知虫子

- 文档类

  - [ ] Container 布局容器, 开头描述中, 还是沿用的 `<el-container>`. `el` -> `ea`
  - [ ] Checkbox 多选框, 缺少 attr, slot, event 描述
  - [ ] Icon 图标, 缺少 图标来源

- 脚本类

  - [ ] Descriptions 描述列表, span 值设置超过表格总 span 会导致元素消失
