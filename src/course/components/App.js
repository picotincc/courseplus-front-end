import React, { Component } from 'react';

import Dialog from "../../base/components/Dialog";
import Header from "../../base/components/Header";
import ServiceClient from "../../base/service/ServiceClient";
import WebStorageUtil from "../../base/util/WebStorageUtil";

import Course from "./Course";

const HOST = "/public";

export default class App extends Component {

    constructor (props) {
        super(props);
        console.log("Courseplus course is running......");

        this.handleDialogShow = this.handleDialogShow.bind(this);
        this.handleDialogHide = this.handleDialogHide.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isLogin: false,
        user: null
    }

    componentDidMount()
    {
        this.appContainer = this.refs["appContainer"];
        this.dialogContainer = this.refs["dialogContainer"];
        this.autoLogin();
    }

    autoLogin()
    {
        const user = WebStorageUtil.getUserStorage();
        let isLogin = false;

        if (user)
        {
            ServiceClient.getInstance().login({
                phone: user.phone,
                password: user.password
            }).then(res => {
                isLogin = true;
                WebStorageUtil.setToken(res.token);
                this.loadCourseData(isLogin, res);
            }, error => {
                this.loadCourseData(isLogin);
            });
        }
        else
        {
            this.loadCourseData(isLogin);
        }
    }

    loadCourseData(isLogin, user = null)
    {
        console.log(isLogin, user);
        this.setState({
            isLogin,
            user
        });
    }

    handleDialogShow()
    {
        this.appContainer.classList.add("app-blur");
        this.dialogContainer.style.zIndex = 20;
    }

    handleDialogHide()
    {
        this.appContainer.classList.remove("app-blur");
        this.dialogContainer.style.zIndex = 0;
    }


    handleLogin(user)
    {
        this.setState({
            isLogin: true,
            user: user
        });
    }


    render()
    {
        const state = this.state;

        return (
            <div className="cp-course-app">
                <div ref="dialogContainer" className="dialog-container">
                    <Dialog
                        onDialogHide={this.handleDialogHide}
                        onLogin={this.handleLogin}
                    />
                </div>
                <div ref="appContainer" className="app-container">
                    <header>
                        <Header
                            isLogin={state.isLogin}
                            user={state.user}
                            onDialogShow={this.handleDialogShow}
                        />
                    </header>
                    <div className="container"><Course /></div>
                </div>
            </div>
        );
    }
}
