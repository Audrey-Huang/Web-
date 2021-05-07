Function.prototype.myapply=function(context,args){
    var context=context||window;
    context.fn=this;
    var results=context.fn(...args);
    delete context.fn;
    return results;
}