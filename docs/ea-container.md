<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')

    import('../components/ea-container/index.js')
    import('../components/ea-header/index.js')
    import('../components/ea-footer/index.js')
    import('../components/ea-aside/index.js')
    import('../components/ea-main/index.js')
})
</script>

<style>
    ea-container::part(wrap) {
        min-height: 20rem;
    }
</style>

<ea-container>
    <ea-header>Header</ea-header>
    <ea-aside>Aside</ea-aside>
    <ea-main>Main</ea-main>
    <ea-footer>Footer</ea-footer>
</ea-container>
