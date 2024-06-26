<script setup>
import { onMounted } from 'vue'
import { EaMessage } from "../components/ea-message/MessageClass.js"

import { EaDialog } from "../components/ea-dialog/EaDialogClass.js"

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    const $dialog = new EaDialog();
    const $message = new EaMessage();

    document.querySelector("#openMessageBox").addEventListener("click", () => {
        $dialog
            .open("这是一段内容", "标题名称", {
                confirmButtonText: "确定",
            })
            .then(() => {
                $message.open("用户确认了该弹窗");
            })
            .catch(() => {
                $message.open("用户关闭了该弹窗");
            });
    });
})

</script>

<div class="demo">
    <!-- <ea-message-box></ea-message-box> -->
    <ea-button type="primary" id="openMessageBox">hello</ea-button>
</div>

```js
document.querySelector("#openMessageBox").addEventListener("click", () => {
  $dialog
    .open("这是一段内容", "标题名称", {})
    .then(() => {
      console.log(res);
    })
    .catch(() => {
      console.log(err);
    });
});
```
