<script setup>
import { onMounted } from 'vue'

  onMounted(() => {
    import('../index.js')
    import('./css/index.css')
  })
</script>

<div class="row left">
    <ea-button type="primary" loading>文字按钮</ea-button>
</div>

```html
<div class="row left">
  <ea-button type="text">文字按钮</ea-button>
  <ea-button type="text" disabled>文字按钮</ea-button>
</div>
```
