import React, { Component } from 'react';

import Dialog from "../../base/components/Dialog";
import Header from "../../base/components/Header";

import Course from "./Course";

const HOST = "/public";

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
