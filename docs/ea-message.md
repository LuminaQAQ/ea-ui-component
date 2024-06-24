<script setup>
import { onMounted } from 'vue'
import { EaMessage } from '../components/ea-message/index.js'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    const message = new EaMessage();

    document.getElementById('messageBtn').addEventListener('click', () => {
        message.open("1")
    })

})
</script>

<div class="demo">
    <ea-button id="messageBtn">打开消息提示</ea-button>
</div>
