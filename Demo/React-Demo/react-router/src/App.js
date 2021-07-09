import './App.css';
import React, { Component } from 'react';
//导入路由依赖和组件
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import User from "./User";
import Detail from './Detail';
class App extends Component { 
    render() {
        return (
            <>
                <ul>
                    <li>
                        <Link to="/">首页</Link>
                    </li>
                    <li>
                        <Link to="/list">列表页</Link>
                    </li>
                    <li>
                        <Link to="/user">用户中心</Link>
                    </li>
                </ul>

                {/* 配置路由规则  exact表示精确匹配，防止匹配其他页面的时候匹配到/，也就是首页*/}
                <Route path='/' exact component={Home}></Route>
                <Route path='/list' component={List}></Route>
                <Route path='/user' component={User}></Route>
                <Route path='/detail/:id' component={Detail}></Route> {/* 动态路由配置*/}
            </>
        )
    }
}
export default App;
