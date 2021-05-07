//在触发n秒后再执行回调，如果n秒内又被触发，则重新计算
function debounce(fn,delay){
    var timer;
    return function(){
        var _this=this;
        var args=arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer=setTimeout(function(){
            fn.apply(_this,args);
        },delay);
    }
}