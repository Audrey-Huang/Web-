//懒加载，原始实现
function lazyload(){
    var imags=document.getElementsByTagNameNS('img');
    var len=imags.length;
    var n=0;
    return function(){
        var sheight=document.documentElement.clientHeight;
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        for(var i=n;i<len;i++){
            if(imags[i].offsetTop<sheight+scrollTop){
                if(imags[i].getAttribute('src')==='images/loading.gif'){
                    images[i].src=imags.getAttribute('data-src');
                }
            }
            n=n+1;
        }
    }
}
var loadimages=lazyload();
loadimages();//初始化页面
window.addEventListener('scroll',loadimages,false);

//函数节流，频繁调用的函数，每次只调用第一次
function cut(fn,delay){
    var pretime=0;
    return function(){
        var currenttime=Date.now();
        if(currenttime-pretime>delay){
            fn();
            pretime=currenttime;
        }
    }
}

//函数防抖，频繁调用函数时，每次只调用最后一次
function fun(fn,delay){
    var timer=null;
    return function(){
        clearTimeout(timer);
        timer=setTimeout(function(){
            fn();
        },delay);
    }
}