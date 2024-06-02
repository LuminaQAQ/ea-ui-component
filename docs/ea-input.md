<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../index.js')
  import('./index.scss')
})
</script>

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

<div class="row left">
    <ea-input type="textarea"></ea-input>
</div>

## 禁用状态

## 可清空

## 密码框

## 带 icon 的输入框

带有图标标记输入类型

## 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。

## 可自适应文本高度的文本域

通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。

## 复合型输入框

可前置或后置元素，一般为标签或按钮

## 尺寸

## 带输入建议

根据输入内容提供对应的输入建议

## 远程搜索

从服务端搜索数据

## 输入长度限制
