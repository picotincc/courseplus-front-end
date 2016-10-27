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
        this.handleCourseSelect = this.handleCourseSelect.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isLogin: false,
        user: null,
        courseInfo: null
    }

    componentDidMount()
    {
        this.appContainer = this.refs["appContainer"];
        this.dialogContainer = this.refs["dialogContainer"];
        this.autoLogin();
    }

    autoLogin()
    {
        let isLogin = false;
        const user = WebStorageUtil.getUserStorage();

        if (user)
        {
            ServiceClient.getInstance().login({
                phone: user.phone,
                password: user.password
            }).then(res => {
                if (res.textStatus === "success")
                {
                    isLogin = true;
                    WebStorageUtil.setToken(res.token);
                    this.loadCourseData(isLogin, res);
                }
                else
                {
                    this.loadCourseData(isLogin);
                }
            });
        }
        else
        {
            this.loadCourseData(isLogin);
        }
    }

    loadCourseData(isLogin, user = null,)
    {
        const courseId = WebStorageUtil.getCourseStorage();
        ServiceClient.getInstance().getCourseDetail(courseId).then(res => {
            this.setState({
                isLogin,
                user,
                courseInfo: res
            });
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

    handleCourseSelect(courseId)
    {
        const course = this.state.courseInfo;
        if (course.id !== courseId)
        {
            WebStorageUtil.setCourseStorage(courseId);
            ServiceClient.getInstance().getCourseDetail(courseId).then(res => {
                this.setState({
                    courseInfo: res
                });
            });
        }
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
                    <div className="container">
                        <Course
                            course={state.courseInfo}
                            onCourseSelect={this.handleCourseSelect}
                         />
                    </div>
                </div>
            </div>
        );
    }
}
