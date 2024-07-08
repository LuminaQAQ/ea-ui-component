<script setup>
import { onMounted } from 'vue'
import {EaCalendar} from '../components/ea-calendar/index.js'

onMounted(() => {
    // import('../index.js')
    import('./index.scss')
})
</script>

<!-- <ea-calendar></ea-calendar> -->

---

<ea-calendar date="2024-7"></ea-calendar>
