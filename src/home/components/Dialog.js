import React, { Component } from 'react';

export default class Dialog extends Component {

    constructor (props) {
        super(props);

        this.hide = this.hide.bind(this);
        this.navToRegister = this.navToRegister.bind(this);
        this.navToLogin = this.navToLogin.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {
        this.loginBox = this.refs["loginBox"];
        this.registerBox = this.refs["registerBox"];
    }

    render()
    {
        return (
            <div className="cp-home-dialog">
                <div ref="loginBox" className="login-box">
                    <div className="top-bar">
                        <div className="title">
                            登录
                        </div>
                        <span onClick={this.hide} className="icon iconfont icon-close"></span>
                    </div>
                    <div className="phone input-group">
                        <span className="input-group-addon">
                            <span className="icon iconfont icon-phone"></span>
                        </span>
                        <input type="text" className="form-control" placeholder="手机号" />
                    </div>
                    <div className="password input-group">
                        <span className="input-group-addon custom">
                            <span className="icon iconfont icon-password"></span>
                        </span>
                        <input type="password" className="form-control" placeholder="密码" />
                    </div>
                    <div className="save-bar">
                        <input className="save-checkbox" type="checkbox" />
                        <span className="remember-me">记住我</span>
                        <span className="forget-password">忘记密码？</span>
                    </div>
                    <div className="login-bar">
                        <div className="btn-login">
                            <span>登录</span>
                        </div>
                    </div>
                    <div className="bottom-bar">
                        <span onClick={this.navToRegister} className="nav-to-register">立即注册course+>></span>
                    </div>

                </div>
                <div ref="registerBox" className="register-box">
                    <div className="top-bar">
                        <span onClick={this.navToLogin} className="icon iconfont icon-return"></span>
                        <div className="title">
                            注册
                        </div>
                        <span onClick={this.hide} className="icon iconfont icon-close"></span>
                    </div>
                    <div className="phone input-group">
                        <span className="input-group-addon">
                            <span className="icon iconfont icon-phone"></span>
                        </span>
                        <input type="text" className="form-control" placeholder="手机号" />
                    </div>
                    <div className="code-bar">
                        <div className="code input-group">
                            <span className="input-group-addon">
                                <span className="icon iconfont icon-code"></span>
                            </span>
                            <input type="text" className="form-control" placeholder="验证码" />
                        </div>
                        <div className="send-codes">
                            <span>发送验证码</span>
                        </div>
                    </div>
                    <div className="password input-group">
                        <span className="input-group-addon custom">
                            <span className="icon iconfont icon-password"></span>
                        </span>
                        <input type="password" className="form-control" placeholder="密码" />
                    </div>
                    <div className="register-bar">
                        <div className="btn-register">
                            <span>注册</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    hide()
    {
        this.props.hideDialog();
        this.navToLogin();
    }

    navToRegister()
    {
        this.loginBox.classList.add("inactive");
        this.registerBox.classList.add("active");
    }

    navToLogin()
    {
        this.loginBox.classList.remove("inactive");
        this.registerBox.classList.remove("active");
    }
}
