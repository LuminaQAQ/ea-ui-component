<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../index.js')
  import('./index.scss')
})
</script>

# Radio 单选框

在一组备选项中进行单选

## 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

<div class="row left">
    <ea-radio name="gender" value="男" checked>男</ea-radio>
    <ea-radio name="gender" value="女">女</ea-radio>
</div>

```html
<div class="row left">
  <ea-radio name="gender" value="男" checked>男</ea-radio>
  <ea-radio name="gender" value="女">女</ea-radio>
</div>
```

## 禁用状态

单选框不可用的状态。

<div class="row left">
    <ea-radio name="gender" value="男" checked disabled>男</ea-radio>
    <ea-radio name="gender" value="女">女</ea-radio>
</div>

## 单选框组

适用于在多个互斥的选项中选择的场景

<div class="row left">
    <ea-radio name="gender" value="男" checked disabled>男</ea-radio>
    <ea-radio name="gender" value="女">女</ea-radio>
</div>
