import React, { Component } from 'react';

import Header from "../../base/components/Header";
import WebStorageUtil from "../../base/util/WebStorageUtil";

import CourseContent from "./CourseContent";
import Dialog from "./Dialog";
import SearchBar from "./SearchBar";
import ServiceClient from "../service/MockServiceClient";

export default class App extends Component {

    constructor (props) {
        super(props);
        console.log("Courseplus home is running......");

        this.handleDialogShow = this.handleDialogShow.bind(this);
        this.handleDialogHide = this.handleDialogHide.bind(this);
        this.handleMajorSelect = this.handleMajorSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.loadInitialData();


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

    loadInitialData()
    {
        const user = WebStorageUtil.getUserStorage();
        let isLogin = false;

        if (user)
        {
            ServiceClient.getInstance().login({
                phone: user.phone,
                password: user.password
            }).then(res => {
                if (res.code === 0)
                {
                    isLogin = true;
                    WebStorageUtil.setToken(res.message);
                }
                this.loadHomeData(isLogin, user);
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
            ServiceClient.getInstance().getCourseList(majors[0]).then(courses => {
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
        ServiceClient.getInstance().getCoursesByMajor(major.name).then(res => {
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
                        <div className="content"><CourseContent courses={state.content}/></div>
                    </main>
                </div>
            </div>
        );
    }



}
