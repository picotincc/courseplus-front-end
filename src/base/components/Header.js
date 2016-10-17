import React, { Component } from 'react';

export default class Header extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {
        isLogin: false
    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {

    }

    render()
    {
        let loginInfo = null;
        if (this.props.isLogin) {
            loginInfo = (
                <div className="user-info">
                    <div className="user-img">
                        <img src="http://uupaper.oss-cn-qingdao.aliyuncs.com/b6eee5a620d6e14f4f8e5786f24244f7.jpeg" />
                    </div>
                    <span className="user-name">用户1</span>
                </div>
            );
        }
        else
        {
            loginInfo = (<span className="login">登录</span>);
        }

        return (
            <div className="cp-app-header">
                <div className="logo"><img src="/public/Logo.png" /></div>
                {loginInfo}
            </div>
        );
    }
}
