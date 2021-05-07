Function.prototype.mycall=function(context,...args){
    var context=context||window;
    //给context一个属性
    context.fn=this;
    var results=context.fn(...args);
    delete context.fn;
    return results;
}