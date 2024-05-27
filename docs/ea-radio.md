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
    <ea-radio name="city" value="福州" checked>福州</ea-radio>
    <ea-radio name="city" value="厦门">厦门</ea-radio>
</div>

```html
<div class="row left">
  <ea-radio name="city" value="福州" checked>福州</ea-radio>
  <ea-radio name="city" value="厦门">厦门</ea-radio>
</div>
```

## 禁用状态

单选框不可用的状态。

<div class="row left">
  <ea-radio name="work" value="前端切图仔" checked disabled>前端切图仔</ea-radio>
  <ea-radio name="work" value="后端CRUD工程师" disabled>后端CRUD工程师</ea-radio>
</div>

```html
<div class="row left">
  <ea-radio name="work" value="前端切图工程师" checked disabled>
    前端切图仔
  </ea-radio>
  <ea-radio name="work" value="后端CRUD工程师" disabled>
    后端CRUD工程师
  </ea-radio>
</div>
```

## 单选框组

适用于在多个互斥的选项中选择的场景

<div class="row left">
  <ea-radio-group name="salary">
    <ea-radio value="月入3000笑哈哈" checked>月入3000笑哈哈</ea-radio>
    <ea-radio value="月薪过万不是梦">月薪过万不是梦</ea-radio>
  </ea-radio-group>
</div>
