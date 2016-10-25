import React, { Component } from 'react';

import Dialog from "../../base/components/Dialog";
import Header from "../../base/components/Header";
import ServiceClient from "../../base/service/ServiceClient";
import WebStorageUtil from "../../base/util/WebStorageUtil";

import CourseContent from "./CourseContent";
import SearchBar from "./SearchBar";


const HOST = "/public";

export default class App extends Component {

    constructor (props) {
        super(props);

        this.handleDialogShow = this.handleDialogShow.bind(this);
        this.handleDialogHide = this.handleDialogHide.bind(this);
        this.handleMajorSelect = this.handleMajorSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCourseClick = this.handleCourseClick.bind(this);
        this.autoLogin();


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
        this.homeApp = this.refs["homeApp"];
        this.dialogContainer = this.refs["dialogContainer"];
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
                this.loadHomeData(isLogin, res);
            }, error => {
                this.loadHomeData(isLogin);
            });
        }
        else
        {
            this.loadHomeData(isLogin);
        }
    }

    loadHomeData(isLogin, user = null)
    {
        ServiceClient.getInstance().getCourseSpeciality().then(data => {
            const school = data["南京大学"];
            const majors = school.specialities;
            ServiceClient.getInstance().getCourseList(majors[0].id).then(courses => {
                this.setState({
                    isLogin,
                    user,
                    selectedSchool :"南京大学",
                    majors,
                    selectedMajor: majors[0],
                    content: courses
                });
            });
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
        this.homeApp.classList.add("app-blur");
        this.dialogContainer.style.zIndex = 20;
    }

    handleDialogHide()
    {
        this.homeApp.classList.remove("app-blur");
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
        ServiceClient.getInstance().search(key, true).then(res => {
            this.setState({
                isSearched: true,
                content: res
            });
        });
    }

    handleCourseClick(courseId)
    {
        console.log("app got course click", courseId);

        location.href = `${HOST}/course.html?id=${courseId}`;

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
                <div ref="homeApp" className="app-container">
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
