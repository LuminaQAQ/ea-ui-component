<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

# Descriptions 描述列表

列表形式展示多个字段。

## 基础用法

<div class="demo">
    <ea-descriptions title="用户信息">
        <ea-descriptions-item label="姓名">张三</ea-descriptions-item>
        <ea-descriptions-item label="手机号">110</ea-descriptions-item>
        <ea-descriptions-item label="居住地">福建省</ea-descriptions-item>
        <ea-descriptions-item label="备注">
            <ea-tag>正确的</ea-tag>
        </ea-descriptions-item>
        <ea-descriptions-item span="2" label="联系地址">帝都东城区史家胡同123号</ea-descriptions-item>
    </ea-descriptions>
</div>

```html
<div class="demo">
  <ea-descriptions title="用户信息">
    <ea-descriptions-item label="姓名">张三</ea-descriptions-item>
    <ea-descriptions-item label="手机号">110</ea-descriptions-item>
    <ea-descriptions-item label="居住地">福建省</ea-descriptions-item>
    <ea-descriptions-item label="备注">
      <ea-tag>正确的</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item span="2" label="联系地址"
      >帝都东城区史家胡同123号</ea-descriptions-item
    >
  </ea-descriptions>
</div>
```

## 带边框列表

<div class="demo">
    <ea-descriptions title="带边框列表" border>
        <ea-descriptions-item label="姓名">张三</ea-descriptions-item>
        <ea-descriptions-item label="手机号">110</ea-descriptions-item>
        <ea-descriptions-item label="居住地">福建省</ea-descriptions-item>
        <ea-descriptions-item label="备注">
            <ea-tag>正确的</ea-tag>
        </ea-descriptions-item>
        <ea-descriptions-item span="3" label="联系地址">帝都东城区史家胡同123号</ea-descriptions-item>
    </ea-descriptions>
</div>

```html
<div class="demo">
  <ea-descriptions title="带边框列表" border>
    <ea-descriptions-item label="姓名">张三</ea-descriptions-item>
    <ea-descriptions-item label="手机号">110</ea-descriptions-item>
    <ea-descriptions-item label="居住地">福建省</ea-descriptions-item>
    <ea-descriptions-item label="备注">
      <ea-tag>正确的</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item span="3" label="联系地址"
      >帝都东城区史家胡同123号</ea-descriptions-item
    >
  </ea-descriptions>
</div>
```

## 自定义`label`

<div class="demo">
    <ea-descriptions title="带边框列表" border>
        <ea-descriptions-item>
          <template slot="label">
            <i class="icon-user"></i>用户名
          </template>
          张三
        </ea-descriptions-item>
        <ea-descriptions-item>
          <template slot="label">
            <i class="icon-tablet"></i>手机号
          </template>
          110
        </ea-descriptions-item>
        <ea-descriptions-item>
          <template slot="label">
            <i class="icon-location"></i>居住地
          </template>
          福建省
        </ea-descriptions-item>
        <ea-descriptions-item>
          <template slot="label">
            <i class="icon-tag"></i>备注
          </template>
          <ea-tag>正确的</ea-tag>
        </ea-descriptions-item>
        <ea-descriptions-item span="3">
          <template slot="label">
            <i class="icon-direction"></i>联系地址
          </template>
          帝都东城区史家胡同123号
        </ea-descriptions-item>
    </ea-descriptions>
</div>

```html
<div class="demo">
  <ea-descriptions title="带边框列表" border>
    <ea-descriptions-item>
      <template slot="label"> <i class="icon-user"></i>用户名 </template>
      张三
    </ea-descriptions-item>
    <ea-descriptions-item>
      <template slot="label"> <i class="icon-tablet"></i>手机号 </template>
      110
    </ea-descriptions-item>
    <ea-descriptions-item>
      <template slot="label"> <i class="icon-location"></i>居住地 </template>
      福建省
    </ea-descriptions-item>
    <ea-descriptions-item>
      <template slot="label"> <i class="icon-tag"></i>备注 </template>
      <ea-tag>正确的</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item span="3">
      <template slot="label"> <i class="icon-direction"></i>联系地址 </template>
      帝都东城区史家胡同123号
    </ea-descriptions-item>
  </ea-descriptions>
</div>
```

## 垂直列表

## 自定义样式
