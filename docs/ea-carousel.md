<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

<div class="demo">
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
</div>
