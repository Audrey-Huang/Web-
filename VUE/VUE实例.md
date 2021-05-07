### VUE实例

| 选项名       | 说明                                                         | 类型                                                         |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `el`         | 通过 CSS 选择器或者 HTMLElement 实例的方式，提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标 | `string`/`Element`                                           |
| `template`   | 字符串模板，将会替换挂载的元素                               | `string`                                                     |
| `render`     | 字符串模板的代替方案，该渲染函数接收一个`createElement`方法作为第一个参数用来创建 VNode | `(createElement: () => VNode) => VNode`                      |
| `data`       | Vue 实例的数据对象，用于数据绑定                             | `Object`/`Function` 组件只支持`Function`                     |
| `props`      | 用于接收来自父组件的数据                                     | `Array<string>`/`Object`                                     |
| `methods`    | Vue 实例的事件，可用于事件绑定                               | `{ [key: string]: Function }`                                |
| `computed`   | 计算属性，用于简化模板的复杂数据计算                         | `{ [key: string]: Function or { get: Function, set: Function } }` |
| `watch`      | 观察 Vue 实例变化的一个表达式或计算属性函数                  | `{ [key: string]: string or Function or Object or Array }`   |
| `directives` | 自定义指令                                                   | `Object`                                                     |
| `filters`    | 过滤器                                                       | `Object`                                                     |
| `components` | 组件                                                         | `Object`                                                     |

#### el挂载

el选项提供页面中已存在的DOM元素作为实例的挂载目标，即在该目标处进行页面渲染。

选择方式如下：

```js
new Vue({
    //通过id获取该dom元素
    el:document.getElementById("app"),
    //通过标签名获取
    el:document.getElementByTagName("div")[0],
    //通过CSS选择器方式，可以是id名，class名，或者唯一的标签元素名
    el:"#app",
})
```

所谓挂载元素，在实例挂载之后，元素可以用`vm.$el`访问。当然，前面生命周期中我们讲了，需要在`mounted`之后才能获取到：

```js
new Vue({
    el:"#app",
    template:"<div>{{message}}</div>",
    data(){
        return{
            message:"欢迎来到Vue的世界"
        };
    },
    mounted(){
        console.log(this.$el);
    }
});
```

若在实例化前(即没有el前)，存在mount选项，则通过vm.$mount()手动开始编译

在beforemount声明周期前，vm.$el获取的是挂载的元素模板，在mounted后，则变成了template中真实的DOM元素。

几种提供模板的方式优先级如下：

render新建>template>outer html(即挂载目标中的html)



#### 数据绑定

数据绑定常用方式

| 语法                 | 说明                                             |
| -------------------- | ------------------------------------------------ |
| 插值语法`{{}}`       | 文本插值，可配合过 Javascript 表达式和过滤器使用 |
| `v-once`             | 一次性插值，数据改变时插值处的内容不会更新       |
| `v-html`             | 可输出真正的 HTML，不会被转义为普通文本          |
| `v-bind:`（简写`:`） | 可用于绑定 DOM 属性、或一个组件 prop 到表达式    |

```js
<template>
  <div>{{ message }}</div>
  <div v-once>{{ message }}</div>
  <div v-html="message"></div>

  <div>{{ msgHtml }}</div>
  <div v-html="msgHtml"></div>
</template>

<script>
  export default {
    data() {
      return {
        message: "欢迎来到Vue的世界",
        msgHtml: "<p style='color: red'>欢迎来到红色Vue的世界</p>"
      };
    },
    created() {
      this.message = "啦啦啦啦啦啦";
    },
    mounted() {
      this.message = "略略略略略";
    }
  };
</script>
/*
    输出：
    略略略略略
    啦啦啦啦啦啦
    略略略略略
    "<p style='color: red'>欢迎来到红色Vue的世界</p>"
    欢迎来到红色Vue的世界
*/
```

**注意点**:

(1)` v-once`在mounted生命周期后不可再提交更改；

(2) `v-html`请只对可信内容使用 HTML 插值，不要对用户提供的内容使用插值，因为它很容易导致

**v-bind**使用方式更多

```js
<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc" />
<!-- 缩写 -->
<img :src="imageSrc" />
<!-- 最终会生成 `<img src="${imageSrc}">` 这样的模板 -->

<!-- 动态特性名 (2.6.0+) -->
<button v-bind:[key]="value"></button>
<!-- 动态特性名缩写 (2.6.0+) -->
<button :[key]="value"></button>
<!-- 最终会生成 `<button ${key}="${value}">` 这样的模板 -->

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName" />

<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>//对象语法
<div :class="[classA, classB]"></div>//数组语法
<div :class="[classA, { classB: isB, classC: isC }]">
  <!-- style 绑定 -->
  <div :style="{ fontSize: size + 'px' }"></div>//对象语法
  <div :style="[styleObjectA, styleObjectB]"></div>//数组语法

  <!-- 绑定一个有属性的对象 -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
</div>
```

