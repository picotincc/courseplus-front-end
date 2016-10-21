import React, { Component } from 'react';

import Header from "../../base/components/Header";

import CourseContent from "./CourseContent";
import Dialog from "./Dialog";
import SearchBar from "./SearchBar";
import ServiceClient from "../service/ServiceClient";

export default class App extends Component {

    constructor (props) {
        super(props);
        console.log("Courseplus home is running......");

        this.showDialog = this.showDialog.bind(this);
        this.handleSelectMajor = this.handleSelectMajor.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.hideDialog = this.hideDialog.bind(this);

        this.loadInitialData();
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isLogin: false,
        selectedSchool: "",
        majors: [],
        selectedMajor: "",
        isSearched: false,
        content: []
    }

    render()
    {
        const state = this.state;
        return (
            <div className="cp-home-app">
                <div ref="dialogContainer" className="dialog-container">
                    <Dialog hideDialog={this.hideDialog}/>
                </div>
                <div ref="homeApp" className="app-container">
                    <header>
                        <Header
                            isLogin={state.isLogin}
                            showDialog={this.showDialog}
                        />
                    </header>
                    <main>
                        <div className="tool-bar">
                            <SearchBar
                                school={state.selectedSchool}
                                majors={state.majors}
                                selectedMajor={state.selectedMajor}
                                isSearched={state.isSearched}
                                handleSelect={this.handleSelectMajor}
                                handleSearch={this.handleSearch}
                            /></div>
                        <div className="content"><CourseContent courses={state.content}/></div>
                    </main>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        this.homeApp = this.refs["homeApp"];
        this.dialogContainer = this.refs["dialogContainer"];
    }

    loadInitialData()
    {
        ServiceClient.getInstance().getHomeData().then(data => {
            const school = data.school;
            const majors = data.majors;
            ServiceClient.getInstance().getCoursesByMajor(majors[0]).then(courses => {
                this.setState({
                    selectedSchool :school,
                    majors,
                    selectedMajor: majors[0],
                    content: courses
                });
            });
        });
    }

    showDialog()
    {
        this.homeApp.classList.add("app-blur");
        this.dialogContainer.style.zIndex = 20;
    }

    hideDialog()
    {
        this.homeApp.classList.remove("app-blur");
        this.dialogContainer.style.zIndex = 0;
    }

    handleSelectMajor(major)
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
}
