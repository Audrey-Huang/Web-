### Vue中网络请求

#### 1.配合vue-resource.js发送ajax请求

要实现异步加载，需要使用到vue-resource库

```js
<script src="/vue/vue.min.js"></script>
<script src="/vue/axios.min.js"></script>
<script src="/vue/vue-resource.js"></script>
```

**Get请求**

```js
methods:{
    get:function(){
        //发送get请求
        this.$http.get('try/ajax/ajax_info.txt').then(function(res){
            document.write(res.body);//获取到数据
        },function(){
            console.log("请求失败");
        });
    }
}
```

```js
methods:{
    get:function(){
        //params:{a:1,b:2}即为传递到后端的数据，是jsonData格式
        this.$http.get('get.php',{params:{a:1,b:2}}).then(function(res){
            document.write(res.body);//获取到数据
        },function(){
            console.log("请求失败");
        });
    }
}
```

**POST请求**

```js
methods:{
    post:function(){
        this.$http,post('/try/ajax/demo_text.php',{name:"Audrey",url:"www.baidu.com"},
                       {emulateJSON:true}).then(function(res){
            document.write(res.body);
        },function(res){
            console.log(res.status)''
        });
    }
}
```

#### 2.配合axios.min.js发送ajax请求

**axios特点：**

- 从浏览器中创建 XMLHttpRequest
- 从 node.js 发出 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防止 CSRF/XSRF

**引入方式**

```js
$ npm install axios
//使用淘宝源
$ cnpm install axios
//或者使用cdn：
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

安装其他插件的时候，可以直接在 main.js 中引入并使用 Vue.use()来注册，但是 axios并不是vue插件，所以不能 使用Vue.use()，所以只能在每个需要发送请求的组件中即时引入。为了解决这个问题，我们在引入 axios 之后，通过修改原型链，来更方便的使用。

```js
import axios from 'axios'
Vue.prototype.$http = axios
```

#### **可以直接在组件的methods中使用$http命令**

```js
methods: {
  postData () {
    this.$http({
      method: 'post',
      url: '/user',
      data: {
        name: 'Audrey',
        info: '23'
      }
   })
}
```

**执行get请求**

```js

// 向具有指定ID的用户发出请求，此时参数就在url中
$http.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// 也可以通过 params 对象传递参数
$http.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

**执行post请求**

```js
$http.post('/url',{
    firstname:"Yuting",
    lastname:"Huang"
    })
    .then(function(response){
    console.log(response);
    })
    .cathch(function(error){
    console.log(error);
    });
```

**执行多个请求**

```js
function getUserAccount(){
    return $http.get('/user/12345');
}
function getUserPermissions(){
    return $http.post('/user/12345/permissons');
}
axios.all([getUserAccount(),getUserPermissions()])
    .then($http.spread(function(acct,perms){
    console.log("两个请求已完成");
}));
```

#### **通过axios API来进行请求**

```js
//axios(config)
axios({
    method:'post',
    url:'/user/12345',
    data:{
    firstname:"Yuting",
    lastname:"Huang"
    }
});
//然后通过方法的别名来调用，不需要重复指定url，method，data属性
axios.request(config)
axios.get(url [，config])
axios.delete(url [，config])
axios.head(url [，config])
axios.post(url [，data [，config]])
axios.put(url [，data [，config]])
axios.patch(url [，data [，config]])

axios.all(iterable)
axios.spread(callback)
```

#### **可以使用自定义配置创建axios的新实例**

```js
var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
axios#request(config)
axios#get(url [，config])
axios#delete(url [，config])
axios#head(url [，config])
axios#post(url [，data [，config]])
axios#put(url [，data [，config]])
axios#patch(url [，data [，config]])
```

