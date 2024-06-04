<script setup>
import { onMounted, ref } from 'vue'

onMounted(() => {
  import('../index.js')
  import('./index.scss')
})
</script>

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

<div class="row left">
    <ea-textarea type="textarea" rows="2" placeholder="这不是空的"></ea-textarea>
</div>

```html
<div class="row left">
  <ea-textarea type="textarea" rows="2" placeholder="这不是空的"></ea-textarea>
</div>
```

## 可自适应文本高度的文本域

通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整。

<div class="col left">
  <ea-textarea type="textarea" placeholder="这不是空的" autosize></ea-textarea>
</div>

```html
<div class="col left">
  <ea-textarea type="textarea" placeholder="这不是空的" autosize></ea-textarea>
</div>
```

<!-- ## 设置高度的最值

可以指定最小行数和最大行数。

<div class="col left">
    <ea-input type="textarea" placeholder="这不是空的" min-rows="2" max-rows="10"></ea-input>
</div> -->
