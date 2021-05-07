/*this的指向和函数调用的方式有关系*/
//直接调用，通过函数名这种方式调用，this指向全局对象
function test(){
    var user="Audrey";
    console.log(this.user);//undefined
    console.log(this);//window
}
test();

function test(){
    this.user="Audrey";
    console.log(this.user);//Audrey
    console.log(this);//window
}
test();

//通过bind,apply,call改变this指向，指向()中的第一参数
function test(){
    user="Audrey";
    console.log(this.user);//Audrey
    console.log(this);//window
}
var obj={
    user:"Is me"
}
var fun=test.bind(obj);
fun();//Is me
test();//Audrey
test.apply(obj);//Is me
test.call(obj);//Is me

//作为对象方法调用,this指向调用的对象
var obj={
    name:"Audrey",
    sayName:function(){
        console.log(this.name);
    }
}
obj.sayName();//Audrey

//作为对象方法调用，this指向调用的对象，作为函数直接调用，则指向window
function fn(){
    console.log(this.name);
}
var obj={
    name:"Audrey",
    sayName:fn
}
obj.sayName();//Audrey
fn();//undefined

//在构造函数中调用时，this始终指向构建的新实例，即fn
this.name="lalal";
function test(){
    console.log(this.name);//undefined，指向test，所以接收不到window的name
    console.log(this);
    this.name="Audrey";
    console.log(this.name);//Audrey,指向test
    console.log(this);
}
var fn=new test();