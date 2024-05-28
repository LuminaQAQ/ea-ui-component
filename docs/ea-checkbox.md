<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../index.js')
  import('./index.scss')
})
</script>

# Checkbox 多选框

一组备选项中进行多选

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

<div class="row left">
    <ea-checkbox name="work" value="前端">前端</ea-checkbox>
    <ea-checkbox name="work" value="后端">后端</ea-checkbox>
</div>

## 禁用状态

多选框不可用状态。

## 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

## indeterminate 状态

indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

## 可选项目数量的限制

使用 min 和 max 属性能够限制可以被勾选的项目的数量。

## 带有边框
