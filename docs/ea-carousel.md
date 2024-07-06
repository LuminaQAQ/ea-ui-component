<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

# Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容

## 基础用法

适用广泛的基础用法

<div class="demo">
    <div class="title">默认 Hover 指示器触发</div>
    <ea-carousel>
        <ea-carousel-item>
            <img src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain" />
        </ea-carousel-item>
        <ea-carousel-item>
            <div>2</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>3</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>4</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>5</div>
        </ea-carousel-item>
    </ea-carousel>
    <hr/>
    <div class="title">Click 指示器触发</div>
    <ea-carousel trigger="click">
        <ea-carousel-item>
            <img src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain" />
        </ea-carousel-item>
        <ea-carousel-item>
            <div>2</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>3</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>4</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>5</div>
        </ea-carousel-item>
    </ea-carousel>
</div>
