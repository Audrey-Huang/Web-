### JS继承

#### 原型链继承

利用原型类，让一个引用类型继承另一个类型的属性和方法。利用prototye和构造函数实现，把父类添加到子类的继承链上去。

```js
function Parent(){
    this.name = 'web前端';
    this.type = ['JS','HTML','CSS'];
}
Parent.prototype.Say=function(){
    console.log(this.name);
}
function Son(){};
Son.prototype = new Parent();
son1 = new Son();
son1.Say();
```

**缺点：所有实例化对象都共享了原型对象的属性及方法；实例化对象无法进行参数的传递**



#### 构造函数继承

```js
function Parent(){
    this.name = 'web前端';
    this.type = ['JS','HTML','CSS'];
}
function Son(){
    Parent.call(this);
}
son1 = new Son();
son1.type.push('VUE');
console.log(son1.type);//['JS','HTML','CSS','VUE']
son2 = new Son();
console.log(son2.type);//['JS','HTML','CSS']
```

**优点：实现实例化对象的独立性；可以给实例化对象添加参数**

**缺点：无法继承父类构造函数原型对象方法**



#### 构造函数原型链组合继承

通过构造函数依赖于原型的继承，利用aplly或者call改变this的指向。

```js
function Parent(name,height) {
    this.name = name;
    this.height = height;
}
function Child(age) {
    this.age = age;
}
Child.prototype = new Parent('hahaha',171);
let ch = new Child(21)
console.log(ch.name)//'hahaha'
```

**优点：1.利用原型链实现原型对象方法的继承****

​            **2.利用构造函数继承，实现属性的继承，而且可以传参数**

**缺点：1. 每次都会调用两次父级构造函数：一次是在创建子级原型时，另一次是在子级构造函数内部。****



#### 原型式继承

创建一个函数，将参数作为一个对象的原型对象

```js
function fun(obj) {
    function Son(){};
    Son.prototype = obj;
    return new Son();
}        
var parent = {
    name:'张三'
}
var son1 = fun(parent);
var son2 = fun(parent);
console.log(son1.name);//张三
console.log(son2.name);//张三
```



#### 寄生继承

在原型式继承的基础上，在函数内部丰富对象

```js
function fun(obj) {
    function Son() { };
    Son.prototype = obj;
    return new Son();
}
function JiSheng(obj) {
    var clone = fun(obj);
    clone.Say = function () {
        console.log('我是新增的方法');
    }
    return clone;
}
var parent = {
    name: '张三'
}
var parent1 = JiSheng(parent);
var parent2 = JiSheng(parent);
console.log(parent2.Say==parent1.Say);// false
```

**优点：实现实例化对象的独立性；可以给实例化对象添加参数**

**缺点：无法实现函数复用**

#### 寄生组合继承

利用寄生继承的特性，继承父级构造函数的原型来创建子级原型

```js
function JiSheng(son,parent){
    var clone=object.create(parent.prototype);
    son.prototype=clone;
    clone.constructor=son;//增强对象
}
function parent{
    this.name=name;
    this.age=age;
}
parent.prototype.sayname=function(){
    console.log(this.name);
}
function son(name,age);{
    parent.call(this,name,age);
}
JiSheng(son,parent);
son1=new son('张三',12);
```

**优点：实现实例化对象的独立性；可以给实例化对象添加参数**



#### 类继承

使用extend将子类的原型链对象指向父类，必须通过super()来调用父类的构造函数。

类名无法重写，需要先声明类

```js
class Fruit {
    constructor (name,quantity){
        this.name = name;
        this.quantity = quantity;
    }
    static show() {
        return 'show'
    }
    getName() {
        return this.name;
    }
}

class Apple extends Fruit {
    constructor (name,quantity,area) {
        super(name,quantity);
        this.area = area;
    }
}

let apple = new Apple('apple',3,'shan');
console.log(Apple.show() +':'+ apple.getName()+'  ' + apple.quantity)
// show:apple  3
```

