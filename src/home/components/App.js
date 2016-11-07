import React, { Component } from 'react';

import Dialog from "../../base/components/Dialog";
import Header from "../../base/components/Header";
import ServiceClient from "../../base/service/ServiceClient";
import WebStorageUtil from "../../base/util/WebStorageUtil";
import { HOST } from "../../base/util/ConstantUtil";


import CourseContent from "./CourseContent";
import SearchBar from "./SearchBar";

export default class App extends Component {

    constructor (props) {
        super(props);

        this.handleDialogShow = this.handleDialogShow.bind(this);
        this.handleDialogHide = this.handleDialogHide.bind(this);
        this.handleMajorSelect = this.handleMajorSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCourseClick = this.handleCourseClick.bind(this);

    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        user: null,
        isLogin: false,
        selectedSchool: "",
        majors: [],
        selectedMajor: "",
        isSearched: false,
        content: []
    }

    componentDidMount()
    {
        this.appContainer = this.refs["appContainer"];
        this.dialogContainer = this.refs["dialogContainer"];
        this.loadHomeData();
        this.autoLogin();
    }

    loadHomeData(isLogin, user = null)
    {
        ServiceClient.getInstance().getCourseSpeciality().then(data => {
            const school = data["南京大学"];
            const majors = school.specialities;
            ServiceClient.getInstance().getAllCourseList().then(courses => {
                this.setState({
                    selectedSchool :"南京大学",
                    majors,
                    isSearched: true,
                    selectedMajor: majors[0],
                    content: courses
                });
            });
        });
    }

    autoLogin()
    {
        let isLogin = false;

        ServiceClient.getInstance().autoLogin().then(res => {
            if (res.status === 0)
            {
                isLogin = true;
                WebStorageUtil.setToken(res.token);
                this.setState({
                    isLogin,
                    user: res
                });
            }

        });
    }

    handleLogin(user)
    {
        this.setState({
            isLogin: true,
            user: user
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

    handleMajorSelect(major)
    {
        ServiceClient.getInstance().getCourseList(major.id).then(res => {
            this.setState({
                isSearched: false,
                selectedMajor: major,
                content: res
            });
        });
    }

    handleSearch(key)
    {
        ServiceClient.getInstance().search(key).then(res => {
            this.setState({
                isSearched: true,
                content: res
            });
        });
    }

    handleCourseClick(courseId)
    {
        WebStorageUtil.setCourseStorage(courseId);
        location.href = `${HOST}/course.html`;
    }

    render()
    {
        const state = this.state;
        return (
            <div className="cp-home-app">
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
                    <main>
                        <div className="tool-bar">
                            <SearchBar
                                school={state.selectedSchool}
                                majors={state.majors}
                                selectedMajor={state.selectedMajor}
                                isSearched={state.isSearched}
                                onMajorSelect={this.handleMajorSelect}
                                onSearch={this.handleSearch}
                            /></div>
                        <div className="content">
                            <CourseContent
                                courses={state.content}
                                onCourseClick={this.handleCourseClick}
                            />
                        </div>
                    </main>
                </div>
            </div>
        );
    }



}
