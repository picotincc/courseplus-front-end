import React, { Component } from 'react';

import FormatUtil from "../../base/util/FormatUtil";
import WebStorageUtil from "../../base/util/WebStorageUtil";

import ServiceClient from "../service/ServiceClient";

export default class Dialog extends Component {

    constructor (props) {
        super(props);

        this.hide = this.hide.bind(this);
        this.clear = this.clear.bind(this);
        this.navToRegister = this.navToRegister.bind(this);
        this.navToLogin = this.navToLogin.bind(this);
        this.navToReset = this.navToReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setUserInfoToStorage = this.setUserInfoToStorage.bind(this);

        this.sendAuthCode = this.sendAuthCode.bind(this);
        this.sendResetCode = this.sendResetCode.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.reset = this.reset.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isSave: true
    }

    componentDidMount()
    {
        this.loginBox = this.refs["loginBox"];
        this.registerBox = this.refs["registerBox"];
        this.resetBox = this.refs["resetBox"];

        this.r_phoneInput = this.refs["r_phoneInput"];
        this.r_codeInput = this.refs["r_codeInput"];
        this.r_passwordInput = this.refs["r_passwordInput"];
        this.l_phoneInput = this.refs["l_phoneInput"];
        this.l_passwordInput = this.refs["l_passwordInput"];
        this.l_isSave = this.refs["l_isSave"];
        this.re_phoneInput = this.refs["re_phoneInput"];
        this.re_codeInput = this.refs["re_codeInput"];
        this.re_passwordInput = this.refs["re_passwordInput"];

        // let wait=60;
        // const time = function (o) {
        //     if (wait == 0) {
        //         o.removeAttribute("disabled");
        //         o.value="免费获取验证码";
        //         wait = 60;
        //     } else {
        //         o.setAttribute("disabled", true);
        //         o.value="重新发送(" + wait + ")";
        //         wait--;
        //         setTimeout(function() {
        //             time(o)
        //         },
        //         1000)
        //     }
        // }
        // this.onclick=function(){time(this);}
    }

    //内部交互方法
    hide()
    {
        this.props.onDialogHide();
        this.navToLogin();
        this.clear();
    }

    navToRegister()
    {
        this.loginBox.classList.add("inactive");
        this.registerBox.classList.add("active");
    }

    navToReset()
    {
        this.loginBox.classList.add("inactive");
        this.resetBox.classList.add("active");
    }

    navToLogin()
    {
        this.loginBox.classList.remove("inactive");
        this.registerBox.classList.remove("active");
        this.resetBox.classList.remove("active");
    }

    handleChange(e)
    {
        let isSave = this.state.isSave;
        this.setState({
            isSave: !isSave
        });
    }

    setUserInfoToStorage(info, isSave)
    {
        let save = isSave ? "saved" : "unsaved";

        WebStorageUtil.setUserStorage({
            phone: info.phone,
            password: info.password
        });
        WebStorageUtil.setIsSaveStorage(save);
        this.hide();
        this.props.onLogin(info);
    }


    //api请求
    sendAuthCode()
    {
        const phone = this.r_phoneInput.value;
        const checked = FormatUtil.isPhoneNumber(phone);
        if (checked)
        {
            ServiceClient.getInstance().checkUserIsValid(phone).then(res => {
                if (res.textStatus === "success" )
                {
                    ServiceClient.getInstance().sendAuthCode(phone).then(res => {
                        if (res.textStatus === "success")
                        {
                            swal({
                              title: "Good job!",
                              text: "发送成功",
                              type: "success"
                            });
                        }
                        else
                        {
                            swal({
                              title: "Something wrong!",
                              text: res.message,
                              type: "error"
                            });
                        }
                    });
                }
                else
                {
                    swal({
                      title: "Something wrong!",
                      text: res.message,
                      type: "error"
                    });
                }
            });
        }
        else
        {
            swal({
              title: "Something wrong!",
              text: "请输入正确格式的手机号",
              type: "error"
            });
        }
    }

    sendResetCode()
    {
        const phone = this.re_phoneInput.value;
        const checked = FormatUtil.isPhoneNumber(phone);
        if (checked)
        {
            swal("正在发送......");
            ServiceClient.getInstance().sendAuthCode(phone).then(res => {
                if (res.textStatus === "success")
                {
                    swal({
                      title: "Good job!",
                      text: res.message,
                      type: "success"
                    });


                }
                else
                {
                    swal({
                      title: "Something wrong!",
                      text: res.message,
                      type: "error"
                    });
                }
            });
        }
        else
        {
            swal({
              title: "Something wrong!",
              text: "请输入正确格式的手机号",
              type: "error"
            });
        }
    }

    clear()
    {
        this.r_phoneInput.value = "";
        this.r_codeInput.value = "";
        this.r_passwordInput.value = "";
        this.l_phoneInput.value = "";
        this.l_passwordInput.value = "";
        this.l_isSave.checked = true;
        this.re_phoneInput.value = "";
        this.re_codeInput.value = "";
        this.re_passwordInput.value = "";
    }

    register()
    {
        const phone = this.r_phoneInput.value;
        const code = this.r_codeInput.value;
        const password = this.r_passwordInput.value;
        const p_checked = FormatUtil.isPhoneNumber(phone);
        const c_checked = FormatUtil.isCodeNumber(code);

        const self = this;
        if (p_checked)
        {
            if (c_checked)
            {
                ServiceClient.getInstance().register({
                    phone,
                    password,
                    code
                }).then(res => {
                    if (res.textStatus === "success")
                    {
                        const info = res;
                        info.phone = phone;
                        info.password = password;
                        self.setUserInfoToStorage(info, true);
                    }
                    else
                    {
                        swal({
                          title: "Something wrong!",
                          text: res.message,
                          type: "error"
                        });
                    }
                });
            }
            else
            {
                swal({
                  title: "Something wrong!",
                  text: "验证码格式不正确",
                  type: "error"
                });
            }
        }
        else
        {
            swal({
              title: "Something wrong!",
              text: "请输入正确格式的手机号码",
              type: "error"
            });
        }
    }

    login()
    {
        const phone = this.l_phoneInput.value;
        const password = this.l_passwordInput.value;
        const isSave = this.state.isSave;
        const p_checked = FormatUtil.isPhoneNumber(phone);

        const self = this;
        if (p_checked)
        {
            ServiceClient.getInstance().login({
                phone,
                password
            }).then(res => {
                if (res.textStatus === "success")
                {
                    const info = res;
                    info.phone = phone;
                    info.password = password;
                    self.setUserInfoToStorage(info, isSave);
                }
                else
                {
                    swal({
                      title: "Something wrong!",
                      text: res.message,
                      type: "error"
                    });
                }
            });
        }
        else
        {
            swal({
              title: "Something wrong!",
              text: "请输入正确格式的手机号码",
              type: "error"
            });
        }
    }

    reset()
    {
        const phone = this.re_phoneInput.value;
        const code = this.re_codeInput.value;
        const password = this.re_passwordInput.value;
        const p_checked = FormatUtil.isPhoneNumber(phone);
        const c_checked = FormatUtil.isCodeNumber(code);

        const self = this;
        if (p_checked)
        {
            if (c_checked)
            {
                ServiceClient.getInstance().resetPassword({
                    phone,
                    password,
                    code
                }).then(res => {
                    if (res.textStatus === "success")
                    {
                        swal({
                          title: "Good job!",
                          text: res.message,
                          type: "success"
                        });
                        this.navToLogin();
                        this.clear();
                    }
                    else
                    {
                        swal({
                          title: "Something wrong!",
                          text: res.message,
                          type: "error"
                        });
                    }
                });
            }
            else
            {
                swal({
                  title: "Something wrong!",
                  text: "请输入正确格式的验证码",
                  type: "error"
                });
            }
        }
        else
        {
            swal({
              title: "Something wrong!",
              text: "请输入正确格式的手机号码",
              type: "error"
            });
        }
    }


    render()
    {
        return (
            <div className="cp-app-dialog">
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
                        <input ref="l_phoneInput" type="text" className="form-control" placeholder="手机号" />
                    </div>
                    <div className="password input-group">
                        <span className="input-group-addon custom">
                            <span className="icon iconfont icon-password"></span>
                        </span>
                        <input ref="l_passwordInput" type="password" className="form-control" placeholder="密码" />
                    </div>
                    <div className="save-bar">
                        <input ref="l_isSave" checked={this.state.isSave} onChange={this.handleChange} className="save-checkbox" type="checkbox"/>
                        <span className="remember-me">记住我</span>
                        <span onClick={this.navToReset} className="forget-password">忘记密码？</span>
                    </div>
                    <div className="login-bar">
                        <div onClick={this.login} className="btn-login">
                            <span>登录</span>
                        </div>
                    </div>
                    <div className="bottom-bar">
                        <span onClick={this.navToRegister} className="nav-to-register">立即注册course+>></span>
                    </div>

                </div>
                <div ref="registerBox" className="register-box next-box">
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
                        <input ref="r_phoneInput" type="text" className="form-control" placeholder="手机号" />
                    </div>
                    <div className="code-bar">
                        <div className="code input-group">
                            <span className="input-group-addon">
                                <span className="icon iconfont icon-code"></span>
                            </span>
                            <input ref="r_codeInput" type="text" className="form-control" placeholder="验证码" />
                        </div>
                        <div onClick={this.sendAuthCode} className="send-codes">
                            <span>发送验证码</span>
                        </div>
                    </div>
                    <div className="password input-group">
                        <span className="input-group-addon custom">
                            <span className="icon iconfont icon-password"></span>
                        </span>
                        <input type="password" ref="r_passwordInput" className="form-control" placeholder="密码" />
                    </div>
                    <div className="register-bar">
                        <div onClick={this.register} className="btn-register">
                            <span>注册</span>
                        </div>
                    </div>
                </div>
                <div ref="resetBox" className="reset-box next-box">
                    <div className="top-bar">
                        <span onClick={this.navToLogin} className="icon iconfont icon-return"></span>
                        <div className="title">
                            找回密码
                        </div>
                        <span onClick={this.hide} className="icon iconfont icon-close"></span>
                    </div>
                    <div className="phone input-group">
                        <span className="input-group-addon">
                            <span className="icon iconfont icon-phone"></span>
                        </span>
                        <input ref="re_phoneInput" type="text" className="form-control" placeholder="手机号" />
                    </div>
                    <div className="code-bar">
                        <div className="code input-group">
                            <span className="input-group-addon">
                                <span className="icon iconfont icon-code"></span>
                            </span>
                            <input ref="re_codeInput" type="text" className="form-control" placeholder="验证码" />
                        </div>
                        <div onClick={this.sendResetCode} className="send-codes">
                            <span>发送验证码</span>
                        </div>
                    </div>
                    <div className="password input-group">
                        <span className="input-group-addon custom">
                            <span className="icon iconfont icon-password"></span>
                        </span>
                        <input type="password" ref="re_passwordInput" className="form-control" placeholder="重置密码" />
                    </div>
                    <div className="register-bar">
                        <div onClick={this.reset} className="btn-register">
                            <span>重置密码</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
