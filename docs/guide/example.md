---
outline: deep
---

# 快速上手

本节将介绍如何在项目中使用 Ea-ui

## 在 原生 项目中使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="./node_modules/easy-component-ui/components/ea-icon/index.css"
    />
  </head>

  <body>
    <script type="module">
      import "./node_modules/easy-component-ui/components/ea-button/index.js";
    </script>

    <ea-button type="primary" icon="icon-edit">1</ea-button>
  </body>
</html>
```

## 在 Vue 项目中使用

```vue
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  import("your/path/ea-button/index.js");
});
</script>

<template>
  <ea-button type="primary" icon="icon-edit">1</ea-button>
</template>
```
