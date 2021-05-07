//函数节流，在规定时间内，只触发一次函数，如果有多次被触发，只执行一次
function throttle(fn,delay){
    var timer;
    return function(){
        var _this=this;
        var args=arguments;
        if(timer){
            return;
        }
        timer=setTimeout(function(){
            fn.apply(_this,args);
            clearTimeout(timer);
        })
    }
}