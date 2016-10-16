import React, { Component } from 'react';

import CourseContent from "./CourseContent";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ServiceClient from "../service/ServiceClient";

export default class App extends Component {

    constructor (props) {
        super(props);
        console.log("Courseplus home is running......");

        this.handleSearch = this.handleSearch.bind(this);

        this.loadInitialData();
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        selectedSchool: "",
        majors: [],
        selectedMajor: "",
        content: []
    }

    render()
    {
        const state = this.state;

        return (
            <div className="cp-home-app">
                <header><Header /></header>
                <main>
                    <div className="tool-bar">
                        <SearchBar
                            school={state.selectedSchool}
                            majors={state.majors}
                            selectedMajor={state.selectedMajor}
                        /></div>
                    <div className="content"><CourseContent courses={state.content}/></div>
                </main>
            </div>
        );
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

    handleSearch(key)
    {

    }
}
