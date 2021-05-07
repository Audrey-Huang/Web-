### call,apply和bind

**作用：改变函数执行时的上下文，即改变this的指向**

**差别：**

1. call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数。
2. call和apply的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。

**作用**

**1.将伪数组转化成数组**

js中通过document.getElementsByTagName获得的元素，含有length属性，也可通过下标访问，但是没有push和pop方法，可以通过apply，call转换为真正的数组。

```js
case1: dom节点：

<div class="div1">1</div>
<div class="div1">2</div>
<div class="div1">3</div>

let div = document.getElementsByTagName('div');
console.log(div); // HTMLCollection(3) [div.div1, div.div1, div.div1] 里面包含length属性

let arr2 = Array.prototype.slice.call(div);
console.log(arr2); // 数组 [div.div1, div.div1, div.div1]
```

**2.数组的拼接，添加**

```js
let arr1=[1,2,3];
let arr2=[4,5,6];
[].push.apply(arr1,arr2);
console.log(arr1);//1 2 3 4 5 6
console.log(arr2);//不改变
```

**3.利用call和apply做继承**

```js
function Animal(name){      
    this.name = name;      
    this.showName = function(){      
        console.log(this.name);      
    }      
}      
function Cat(name){    
    Animal.call(this, name);    
}      

// Animal.call(this) 的意思就是使用this对象代替Animal对象，那么
// Cat中不就有Animal的所有属性和方法了吗，Cat对象就能够直接调用Animal的方法以及属性了
var cat = new Cat("TONY");     
cat.showName();   //TONY
```

**4.多继承**

```js
  function Class1(a,b) {
    this.showclass1 = function(a,b) {
      console.log(`class1: ${a},${b}`);
    }
  }

  function Class2(a,b) {
    this.showclass2 = function(a,b) {
      console.log(`class2: ${a},${b}`);
    }
  }

  function Class3(a,b,c) {
    Class1.call(this);
    Class2.call(this);
  }

  let arr10 = [2,2];
  let demo = new Class3();
  demo.showclass1.call(this,1); // class1: 1,undefined
  demo.showclass1.call(this,1,2); // class1: 1,1
  demo.showclass2.apply(this,arr10); // class2: 2,2
```

