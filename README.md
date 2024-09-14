# Easy-ui

Easy-ui 是一个轻量级的 UI 框架，基于 `Web Components` 构建。[文档地址](https://luminaqaq.github.io/ea_ui_component/)

> 该框架参考了[Element-ui](https://element.eleme.cn/#/zh-CN/component/installation) , 所以不能说是很像吧, 但可以说是一模一样 😂(打算有时间把所有的都模仿一遍)。

> 独狼一个, 如果有大佬看到, 还请指点一下 😭 如果有一起学习的就更好了 😭

<p align="center" style="font-size: 5rem;">
    <img src="./public/logo.png">
</p>

## 框架进度

- 基础组件

  - [x] Icon 图标
  - [x] Button 按钮
  - [x] Link 文字链接

- Navigation

  - [x] NavMenu 导航菜单
  - [x] Tabs 标签页
  - [x] Breadcrumb 面包屑
  - [x] Tabs 标签页
  - [x] PageHeader 页头
  - [x] Dropdown 下拉菜单
  - [x] Steps 步骤条
  - [x] Drawer 抽屉

- 表单组件

  - [x] Radio 单选框
  - [x] Checkbox 多选框
  - [x] Input 输入框
  - [x] Textarea 文本域
  - [x] InputNumber 计数器
  - [x] Switch 开关
  - [x] Rate 评分
  - [x] Select 选择框
  - [x] TimePicker 时间选择器
  - [x] DatePicker 日期选择器
  - [ ] Upload 上传
  - [x] Form 表单

- Data

  - [x] Tag 标签
  - [x] Progress 进度条
  - [x] Pagination 分页
  - [x] Badge 标记
  - [x] Avatar 头像
  - [x] Skeleton 骨架屏
  - [x] Empty 空状态
  - [x] Descriptions 描述列表
  - [x] Result 结果
  - [x] Table 表格
  - [ ] Tree 树形控件
  - [ ] Statistic 统计数字

- Notice

  - [x] Alert 警告
  - [x] Loading 加载
  - [x] Message 消息提示
  - [x] MessageBox 弹框

- Others

  - [x] Card 卡片
  - [x] Carousel 走马灯
  - [x] TimeLine 时间线
  - [x] Backtop 回到顶部
  - [x] Collapse 折叠面板
  - [x] Calendar 日历
  - [x] Image 图片
  - [x] InfiniteScroll 无限滚动
  - [ ] Popconfirm 气泡确认框
  - [ ] Dialog 对话框
  - [ ] Tooltip 文字提示
  - [ ] Popover 弹出框
  - [ ] Divider 分割线

## 未来计划（~~bug~~）

- [ ] 完成剩余组件（一些是自我水平不够，没信心动手；一部分是没实习和就业过，不知道有什么场景会用，所以暂时不做。）
- [ ] 对主流框架进行全方位适配。
- [ ] Descriptions 描述列表, span 值设置超过表格总 span 会导致元素消失
- [ ] Table 表格, 复杂场景下可能会出现错位。
- [ ] NavMenu 导航菜单, 在 `vue` 框架下不够灵活。可能需要以下代码

  ```vue
  <script setup>
  import { defineComponent, onMounted, ref, watch } from "vue";
  import { RouterLink, useRoute } from "vue-router";
  import "easy-component-ui/components/ea-menu-item/index.js";

  const props = defineProps({ to: String });
  const route = useRoute();

  defineComponent({
    name: "MyRoute",
  });

  const navActive = {
    activeRoute: ref(route.path) || "",
  };

  watch(route, (newVal) => {
    navActive.activeRoute.value = newVal.path;
  });
  </script>

  <template>
    <ea-menu-item class="rl-item" :actived="navActive.activeRoute.value === to">
      <RouterLink :to="to" activeClass="active">
        <slot></slot>
      </RouterLink>
    </ea-menu-item>
  </template>
  ```

- [ ] Icon 图标, 可以在 `main.js` 中设置全局配置。无需像文档内在组件引入处设置。

  ```js
  window.addEventListener("DOMContentLoaded", () => {
    setConfig({
      fontelloCSS: new URL("/ea-icon/css/fontello.css", import.meta.url).href,
    });
  });
  ```

- [ ] Collapse 折叠面板, 组件上默认 `active` 值为空会导致报错。
