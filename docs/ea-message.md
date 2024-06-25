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

# Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

<div class="demo">
    <ea-button id="messageTextBtn">文本类消息提示(info)</ea-button>
</div>

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

<div class="row left">
    <ea-button id="messageObjectBtn">对象类消息提示(info)</ea-button>
    <ea-button id="messageSuccessObjectBtn" type="success">对象类消息提示(success)</ea-button>
    <ea-button id="messageErrorObjectBtn" type="danger">对象类消息提示(error)</ea-button>
    <ea-button id="messageWarningObjectBtn" type="warning">对象类消息提示(warning)</ea-button>
</div>
