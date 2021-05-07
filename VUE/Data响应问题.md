### Data响应问题

```js
var vm = new Vue({
  // 1. 接受返回对象的函数
  data() {
    return {
      message: "欢迎来到Vue的世界"
    };
  },
  // 2. 也可以直接棒对象
  data: {
    message: "欢迎来到Vue的世界"
  }
});
```

Vue 里数据的变更检测是来自于 getter/setter，从而让`data`的属性能够响应数据变化。前面我们也讲到，Vue 将遍历 data 选项的 JavaScript 对象所有的属性，并使用`Object.defineProperty`把这些属性全部转为 getter/setter。

Vue会在初始化实例时对属性执行getter和setter转化，所以属性必须在data对象上存在才能让value将它设置为响应式。因此Vue无法检测到对象属性的添加或者删除，也无法检测到一些特殊的数组的变动。

解决方法1：使用可触发变更检测的特殊方法

```js
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
```

解决方法2:通过vm.$set实例方法

`vm.$set`(`Vue.set`)用于向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新：

```js
// 更新数组
vm.$set(vm.items, indexOfItem, newValue);

// 更新对象
vm.$set(vm.someObject, keyOfObject, newValue);
```

vm.$set 的实现原理是：

- 如果目标是数组，直接使用数组的 splice 方法触发相应式；
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用   defineReactive 方法进行响应式处理（ defineReactive 方法就是  Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）



### 事件绑定

可以用`v-on`指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码，可用`@`缩写

```js
<template>
  <button v-on:click="addCounter">Add 1</button>
  <!-- 以下为缩写 -->
  <button @click="addCounter">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</template>

<script>
  export default {
    data() {
      return {
        counter: 0
      };
    },
    methods: {
      addCounter() {
        this.counter += 1;
      }
    }
  };
```

