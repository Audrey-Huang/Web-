import React,{Component} from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './user/Login';
import Reg from "./user/Reg";
class User extends Component{
    render(){
        return(
            <>
              <h1>用户中心</h1>
              <ul>
                  <li>
                      <Link to="/user/reg">注册</Link>
                  </li>
                  <li>
                      <Link to="/user/login">登录</Link>
                  </li>
              </ul>
              {/*配置路由*/}
              <Route path="/user/reg" component={Reg}></Route>
              <Route path="/user/login" component={Login}></Route>
            </>
        )
    }
}
export default User;