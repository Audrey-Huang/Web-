import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';
let history=createBrowserHistory({
    forceRefresh:true
})
class List extends Component{
    render(){
        return(
          <div>
            <h1>列表页</h1>
            <ul>
                <li><Link to='/detail/1'>第一号商品</Link></li>
                <li><Link to='/detail/1'>第二号商品</Link></li>
                <li><Link to='/detail/1'>第三号商品</Link></li>
                <p>.........</p>
                <button onClick={()=>history.push('/detail/100')}>第一百号商品</button>
            </ul>
          </div>
        )
    }
}
export default List;