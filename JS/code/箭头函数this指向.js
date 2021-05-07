// function User() {
//     this.name = 'John';
  
//     setTimeout(function greet() {
//       console.log(`Hello, my name is ${this.name}`); // Hello, my name is undefined
//       console.log(this); // window
//     }, 1000);
//   }
  
// const user = new User();
  
//使用闭包使得this指向User
// function User() {
//     const self=this;
//     this.name = 'John';
//     console.log(this.name);
//     setTimeout(function greet() {
//       console.log(`Hello, my name is ${self.name}`); // Hello, my name is John
//       console.log(self); // User {name:"John"}
//     }, 1000);
//   }
  
// const user=new User();

// //使用显示绑定.bind
// function User() {
//     this.name = 'John';
  
//     setTimeout(function greet() {
//       console.log(`Hello, my name is ${this.name}`); // Hello, my name is John
//       console.log(this); // User {name: "John"}
//     }.bind(this)(), 1000);
//   }
  
//   const user = new User();
  
//使用setTimeOut传递更多的参数
//   function User() {
//     this.name = 'John';
  
//     setTimeout(function greet() {
//       console.log(`Hello, my name is ${this.name}`); // Hello, my name is John
//       console.log(this); // User {name: "John"}
//     }.bind(this)(), 1000);
//   }
  
//   const user = new User();
  

// function User() {
//     this.name = 'John';
//     //箭头函数在自己作用域内不绑定this，他只会指向自己作用域内的this
//     setTimeout(() => {
//       console.log(`Hello, my name is ${this.name}`); // Hello, my name is John
//       console.log(this); // User {name: "John"}
//     }, 1000);
//   }
  
//   const user = new User();



// var x = 11;
// var obj = {
//   x: 22,
//   methods: {
//     x: 33,
//     say: function () { console.log(this.x) },
//     say2: () => { console.log(this.x) }
//   }
// }
// //区别普通函数和箭头函数的this指向
// obj.methods.say(); //33 this指向obj
// obj.methods.say2(); //11 this指向全局

// var age = 99;
// function PersonX() {
//   this.age = 0;
//   setTimeout(() => {
//     this.age++;
//     console.log(age)
//   }, 1000);
// }
// PersonX(); // 1 this指向PersonX中


var c=11;
 function test1(){
    this.c=22;
    let d=function(){                 //普通函数的this指向window
       console.log(this.c);
    };
    d();
 }
 var x=new test1();//输出11

var a=11;
function test2(){
    this.a=22;
    let b=()=>{console.log(this.a)} //this指向作用域内的a
    b();
 }
 var x2=new test2(); //输出22

 var a = 11;
function text3 () {
    this.a = 22;
    return () => {console.log(this.a)}
}
var x = new text3()();//22

