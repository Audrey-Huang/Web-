### VUE生命周期

**生命周期是什么？**

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

##### vue渲染页面的过程

1. 解析语法生成 AST。
2. 根据 AST 结果，完成 data 数据初始化。
3. 根据 AST 结果和 data 数据绑定情况，生成虚拟 DOM。
4. 将虚拟 DOM 生成真正的 DOM 插入到页面中，此时页面会被渲染。

##### 绑定的数据进行更新的时

   5.框架接收到数据变更的事件，根据数据生成新的虚拟 DOM 树。比较新旧两棵虚拟 DOM 树，得到差异。 

   6.把差异应用到真正的 DOM 树上，即根据差异来更新页面内容。

##### 清空页面内容时

   7.注销实例，清空页面内容，移除绑定事件、监听器等。

| 生命周期钩子    | 说明                                                         | 对应上述步骤   |
| --------------- | ------------------------------------------------------------ | -------------- |
| `beforeCreate`  | 初始化实例前，`data`、`methods`等不可获取                    | 1 之后，2 之前 |
| `created`       | 实例初始化完成，此时可获取`data`里数据和`methods`事件，无法获取 DOM | 2 之后，3 之前 |
| `beforeMount`   | 虚拟 DOM 创建完成，此时未挂载到页面中，`vm.$el`可获取未挂载模板 | 3 之后，4 之前 |
| `mounted`       | 数据绑定完成，真实 DOM 已挂载到页面，`vm.$el`可获取真实 DOM  | 4 之后         |
| `beforeUpdate`  | 数据更新，DOM Diff 得到差异，未更新到页面                    | 5 之后，6 之前 |
| `updated`       | 数据更新，页面也已更新                                       | 6 之后         |
| `beforeDestroy` | 实例销毁前                                                   | 7 之前         |
| `destroyed`     | 实例销毁完成                                                 | 7 之后         |

1. 在beforeCreate和created钩子函数之间的生命周期

   > 这个生命周期之间，初始化时间，进行数据的观测，created的时候，数据已经和data属性进行绑定了，当data中的属性值变化时，视图也会变化
   >
   > 但还是没有el选项

2. created和beforeMount之间的生命周期

   > **1.首先判断是否有el选项**，如果有就继续向下编译，如果没有el选项，就停止编译，也就是生命周期停止，直到在该实例上调用了vm.$mount(el)
   >
   > 如果注释掉代码中的`el:'#app'`部分，那么在created状态就停止了。后面继续调用`vm.$mount(el)`，则可以继续执行。
   >
   > **2.判断是否有template参数**，如果有，则将其作为模板编译成render函数，如果没有则将外部html作为模板编译。其中在template中的模板优先级是高于外部html的。
   >
   > 因此可以看出为何el的判断要在template之前，因为vue需要通过el来找到对应的outer template。
   >
   > 同时，也可以通过Vue对象中的render函数来做渲染操作。
   >
   > 综合优先级：
   >
   > render函数 > template > outer HTML

   如下代码，页面中渲染的是this is createElement

   ```Vue
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>vue生命周期学习</title>
     <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
   </head>
   <body>
     <div id="app">
       <!--html中修改的-->
       <h1>{{message + '这是在outer HTML中的'}}</h1>
     </div>
   </body>
   <script>
     var vm = new Vue({
       el: '#app',
       template: "<h1>{{message +'这是在template中的'}}</h1>", //在vue配置项中修改的
       data: {
         message: 'Vue的生命周期'
       },
       render() {
           return createElement('h1', 'this is createElement')
       }
   </script>
   </html>
   ```

   

3. beforeMount和mounted之间的生命周期

   > 给Vue实例对象添加$el成员，并替换掉挂载的DOM元素

4. mounted

   > mouted之前， 对应的值还是{{}}语法占位的，以虚拟DOM的形式存在，mouted之后，内容被替换。

   ![clipboard.png](https://segmentfault.com/img/bVVUYC?w=424&h=274)

5. beforeUpdate和updated之间的生命周期

   > 当Vue发现data中的数据发生了改变，会触发对应组件的重新渲染。
   >
   > beforeUpdate，可以监听到data的变化，但是view层没有被重新渲染，view层数据没有变化。
   >
   > updated后，view层数据才被重新渲染，数据更新。

6. beforeDestroy和destroyed之间的生命周期

   > 当vm.$destroy()被调用时，beforeDestroy在实例销毁前调用，此时实例完全可用。
   >
   > destroyed在实例销毁后调用，调用后，所有Vue实例指示的东西都会解绑，所有的监听器被移除，子实例也被销毁。