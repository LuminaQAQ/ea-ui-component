<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    // import('../index.js')
    import('../components/ea-descriptions/index.js')
    import('../components/ea-descriptions-item/index.js')
    import('../components/ea-tag/index.js')
    import('./index.scss')
})
</script>

# Descriptions 描述列表

列表形式展示多个字段。

## 引入

`js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-descriptions/index.js";
</script>
```

> `css`

::: tip
需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 `link` 标签引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#css-part)。

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

::: details 查看代码

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

:::

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

::: details 查看代码

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

:::

## 自定义 label 属性插槽

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

::: details 查看代码

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

:::

## 垂直列表

<div class="demo">
  <ea-descriptions title="带边框垂直列表" direction="vertical" border>
      <ea-descriptions-item label="用户名">
        Lilyiro
      </ea-descriptions-item>
      <ea-descriptions-item label="身高">
        165cm
      </ea-descriptions-item>
      <ea-descriptions-item label="年龄">
        17岁
      </ea-descriptions-item>
      <ea-descriptions-item label="称号">
        <ea-tag>宿命背反</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="属性" span="1">
        <ea-tag type="warning" style="margin-right: 1rem;">雷电</ea-tag>
        <ea-tag type="info">物理</ea-tag>
      </ea-descriptions-item>
  </ea-descriptions>

  <br> 
  
  <ea-descriptions title="带边框垂直列表" direction="vertical">
      <ea-descriptions-item label="用户名">
        卡列尼娜
      </ea-descriptions-item>
      <ea-descriptions-item label="身高">
        163cm
      </ea-descriptions-item>
      <ea-descriptions-item label="年龄">
        16岁
      </ea-descriptions-item>
      <ea-descriptions-item label="机体">
        <ea-tag>辉晓</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="属性" span="1">
        <ea-tag type="info">暗 100%</ea-tag>
      </ea-descriptions-item>
  </ea-descriptions>
</div>

```html
<div class="demo">
  <ea-descriptions title="带边框垂直列表" direction="vertical" border>
    <ea-descriptions-item label="用户名"> Lilyiro </ea-descriptions-item>
    <ea-descriptions-item label="身高"> 165cm </ea-descriptions-item>
    <ea-descriptions-item label="年龄"> 17岁 </ea-descriptions-item>
    <ea-descriptions-item label="称号">
      <ea-tag>宿命背反</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="属性" span="1">
      <ea-tag type="warning" style="margin-right: 1rem;">雷电</ea-tag>
      <ea-tag type="info">物理</ea-tag>
    </ea-descriptions-item>
  </ea-descriptions>
  <ea-descriptions title="带边框垂直列表" direction="vertical">
    <ea-descriptions-item label="用户名"> 卡列尼娜 </ea-descriptions-item>
    <ea-descriptions-item label="身高"> 163cm </ea-descriptions-item>
    <ea-descriptions-item label="年龄"> 16岁 </ea-descriptions-item>
    <ea-descriptions-item label="机体">
      <ea-tag>辉晓</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="属性" span="1">
      <ea-tag type="info">暗 100%</ea-tag>
    </ea-descriptions-item>
  </ea-descriptions>
</div>
```

## Descriptions Attributes

| 参数      | 说明       | 类型    | 可选值                | 默认值     |
| --------- | ---------- | ------- | --------------------- | ---------- |
| title     | 标题       | string  | -                     | -          |
| direction | 列表方向   | string  | vertical / horizontal | horizontal |
| border    | 是否有边框 | boolean | -                     | false      |
| col       | 列表列数   | number  | -                     | 3          |

## Descriptions-Item Attributes

| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| label | 标题     | string | -      | -      |
| span  | 列表列数 | number | -      | 1      |

## Descriptions-Item Slots

| 名称  | 说明           |
| ----- | -------------- |
| label | 自定义标签文本 |
