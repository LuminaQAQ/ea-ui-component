<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    document.querySelector('#ea-progress-change-btn').addEventListener('click', function (e) {
        document.querySelector('#ea-progress').percentage = 100;
    })
})
</script>

<style lang="scss" scoped>
ea-progress {
    width: 20rem;
}
</style>

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 线形进度条

<div class="col left">
    <ea-progress id="ea-progress" percentage="50"></ea-progress>
    <ea-button id="ea-progress-change-btn" type="primary">修改值为 100</ea-button>
</div>

<div class="col left">
    <ea-progress id="ea-progress" percentage="50" status="success"></ea-progress>
    <ea-progress id="ea-progress" percentage="50" status="warning"></ea-progress>
    <ea-progress id="ea-progress" percentage="50" status="eception"></ea-progress>
</div>

## 百分比内显

百分比不占用额外控件，适用于文件上传等场景。

## 自定义颜色

可以通过 color 设置进度条的颜色，color 可以接受颜色字符串，函数和数组。

## 环形进度条

Progress 组件可通过 type 属性来指定使用环形进度条，在环形进度条中，还可以通过 width 属性来设置其大小。

## 仪表盘形进度条
