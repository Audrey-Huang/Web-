// this.name="The Window";
// var object={
//     name:"The Object",
//     getName:function(){
// 		console.log(this.name);   //The Object
//         return function(){
//             return this.name;//指向全局
//         }
//     }
// }
// console.log(object.getName()());  //The Window

// var name="The Window";
 
// var object={
//     name:"The Object",
//     getName:function(){
//         console.log(this.name);
//         var that=this;//将当前作用域this保存在that变量中
//         return function(){
//             return that.name;
//         }
//     }
// }
 
// console.log(object.getName()());//The Object

// function fn(){
//     console.log(this.name);
// }
// var obj={
//     name:"Audrey",
//     sayName:fn
// }
// function test(fn){
//     this.name="lalala";
//     fn;
// }
// test(obj.sayName());
// obj.sayName();//Audrey
// fn();//undefined



function foo() {
	console.log( this.a );
}
function doFoo(fn) {
	this.a = 4
	fn();
}
var obj = {
	a: 2,
	foo: foo
};
var a =3
doFoo( obj.foo ); // 因为foo和doFoo中的this都是指向window，而obj.foo并没有改变this指向，所以输出的是window的a值，最后输出4
obj.foo();//此时改变了this指向，指向obj中的a，则输出2

function foo() {
    this.a=1;
	console.log( this.a );
}
function doFoo(fn) {
	this.a = 4
	fn();
}
var obj = {
	a: 2,
	foo: foo
};
var a =3
doFoo( obj.foo ); // 因为foo和doFoo中的this都是指向window，而obj.foo并没有改变this指向，所以输出的是window的a值，最后输出2