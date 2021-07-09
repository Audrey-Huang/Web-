import React from "react";
import {createBrowserHistory} from 'history';
let history=createBrowserHistory();
class Detail extends React.Component{
    componentDidMount(){
        console.log(this.props.match.params.id);
    }
    render(){
        return(
            <div>
                <h2>商品详情页面</h2>
                <h4>{"发送axios请求获取"+this.props.match.params.id+"号商品的数据"}</h4>
                <button onClick={()=>history.go(-1)}>返回</button>
            </div>

        )
    }
}
export default Detail;