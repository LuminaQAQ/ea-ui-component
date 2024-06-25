<script setup>
import { onMounted } from 'vue'
import { EaMessage } from '../components/ea-message/index.js'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    const message = new EaMessage();

    document.getElementById('messageTextBtn').addEventListener('click', () => {
        message.open("1");
    })

    document.getElementById('messageObjectBtn').addEventListener('click', () => {
        message.open({
            text: "2",
            showClose: true,
            type: "info",
        });
    })

    document.getElementById('messageSuccessObjectBtn').addEventListener('click', () => {
        message.open({
            text: "2",
            showClose: true,
            type: "success",
        });
    })

    document.getElementById('messageErrorObjectBtn').addEventListener('click', () => {
        message.open({
            text: "3",
            showClose: true,
            type: "error",
        });
    })

    document.getElementById('messageWarningObjectBtn').addEventListener('click', () => {
        message.open({
            text: "3",
            showClose: true,
            type: "warning",
        });
    })

})
</script>

<div class="demo">
    <ea-button id="messageTextBtn">文本类消息提示(info)</ea-button>
    &emsp;
    <ea-button id="messageObjectBtn">对象类消息提示(info)</ea-button>
    &emsp;
    <ea-button id="messageSuccessObjectBtn" type="success">对象类消息提示(success)</ea-button>
    &emsp;
    <ea-button id="messageErrorObjectBtn" type="danger">对象类消息提示(error)</ea-button>
    &emsp;
    <ea-button id="messageWarningObjectBtn" type="warning">对象类消息提示(warning)</ea-button>
</div>
