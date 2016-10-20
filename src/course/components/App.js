import React, { Component } from 'react';

import Header from "../../base/components/Header";

import Course from "./Course";

export default class App extends Component {

    constructor (props) {
        super(props);
        console.log("Courseplus course is running......");
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isLogin: true
    }

    render()
    {
        return (
            <div className="cp-course-app">
                <header><Header isLogin={this.state.isLogin} /></header>
                <div className="container"><Course /></div>
            </div>
        );
    }
}
