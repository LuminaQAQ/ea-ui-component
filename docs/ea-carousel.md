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
            <div>1</div>
        </ea-carousel-item>
        <ea-carousel-item>
            <div>2</div>
        </ea-carousel-item>
    </ea-carousel>
</div>
