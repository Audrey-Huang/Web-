#### let和var区别

var声明范围是函数作用域

```javascript
function test(){
    var a=100;
    console.log(a);
}
test()//100
console.log(a)//报错
```

```js
if(true){
    var a=100;
    console.log(a);//100
}
console.log(a);//100
```

var声明提升

```javascript
function test(){
    console.log(a);
    var a=100;
    /*
        以上代码相当于
        var a;
        console.log(a);
        a=100;        
    */
}
test();//undefined
```

var声明

```javascript
var age;
var age;//不会报错
```



let声明的范围是块作用域

```javascript
if(true){
    let b=100;
    console.log(b)//100
}
console.log(b)//报错
```

let声明

```js
let b;
let b;//报错
```

let作用域不会提升

```js
console.log(b);//报错
let b=100;
```



#### const

基本和let一致，只是声明变量时不能够修改变量的值，但是若是引用一个对象，则可以修改对象内部属性。