<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    document.querySelector("#collapse").addEventListener('click', () => {
        document.querySelector("#normalCollapse").active = "1, 2, 3";
    })

    document.querySelector("#normalCollapse").addEventListener('change', (e) => {
        console.log(e.detail)
    })

    document.querySelector("#closeAll").addEventListener('click', () => {
        document.querySelector("#normalCollapse").active = "";
    })

    document.querySelector("#accordion").addEventListener('click', () => {
        document.querySelector("#accordionCollapse").active = 2;
    })
})
</script>

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

<div class="demo">
    <ea-button-group>
        <ea-button id="collapse" type="primary">设置 active 为 1, 2, 3</ea-button>
        <ea-button id="closeAll" type="primary">设置 active 为 ""</ea-button>
    </ea-button-group>
    <ea-collapse id="normalCollapse" active="1, 2">
        <ea-collapse-item class="" title="标题1" name="1">
            <div>内容1</div>
        </ea-collapse-item>
        <ea-collapse-item class="" title="标题2" name="2">
            <div>内容2</div>
        </ea-collapse-item>
        <ea-collapse-item class="" title="标题3" name="3">
            <div>内容3</div>
        </ea-collapse-item>
    </ea-collapse>
</div>

```html
<div class="demo">
  <ea-button-group>
    <ea-button id="collapse" type="primary">设置 active 为 1, 2, 3</ea-button>
    <ea-button id="closeAll" type="primary">设置 active 为 ""</ea-button>
  </ea-button-group>
  <ea-collapse id="normalCollapse" active="1, 2">
    <ea-collapse-item class="" title="标题1" name="1">
      <div>内容1</div>
    </ea-collapse-item>
    <ea-collapse-item class="" title="标题2" name="2">
      <div>内容2</div>
    </ea-collapse-item>
    <ea-collapse-item class="" title="标题3" name="3">
      <div>内容3</div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

```js
document.querySelector("#collapse").addEventListener("click", () => {
  document.querySelector("#normalCollapse").active = "1, 2, 3";
});
```

## 手风琴效果

每次只能展开一个面板

<div class="demo">
    <ea-button id="accordion" type="primary">设置 active 为 2</ea-button>
    <ea-collapse id="accordionCollapse" active="1" accordion>
        <ea-collapse-item class="" title="标题1" name="1">
            <div>内容1</div>
        </ea-collapse-item>
        <ea-collapse-item class="" title="标题2" name="2">
            <div>内容2</div>
        </ea-collapse-item>
    </ea-collapse>
</div>

```html
<div class="demo">
  <ea-button id="accordion" type="primary">设置 active 为 2</ea-button>
  <ea-collapse id="accordionCollapse" active="1" accordion>
    <ea-collapse-item class="" title="标题1" name="1">
      <div>内容1</div>
    </ea-collapse-item>
    <ea-collapse-item class="" title="标题2" name="2">
      <div>内容2</div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

```js
document.querySelector("#closeAll").addEventListener("click", () => {
  document.querySelector("#normalCollapse").active = "";
});

document.querySelector("#accordion").addEventListener("click", () => {
  document.querySelector("#accordionCollapse").active = 2;
});
```

## Collapse Attributes

| 参数      | 说明                                                   | 类型    | 可选值 | 默认值 |
| --------- | ------------------------------------------------------ | ------- | ------ | ------ |
| active    | 当前激活面板的 name. 当展开元素为多项时, 需用逗号分隔. | string  | —      | —      |
| accordion | 是否开启手风琴模式                                     | boolean | —      | false  |

## Collapse Events

| 事件名称 | 说明                                       | 回调参数 |
| -------- | ------------------------------------------ | -------- |
| change   | 手动展开面板变化时触发（对应 active 属性） | -        |

## CollapseItem Attributes

| 参数  | 说明                                                          | 类型   | 可选值 | 默认值 |
| ----- | ------------------------------------------------------------- | ------ | ------ | ------ |
| title | 面板标题                                                      | string | —      | —      |
| name  | 当前面板的 name. 可选, 若不设置, 则会根据子组件的顺序自动生成 | string | —      | —      |
