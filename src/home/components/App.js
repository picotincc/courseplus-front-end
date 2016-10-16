import React, { Component } from 'react';

import CourseContent from "./CourseContent";
import Header from "./Header";
import SearchBar from "./SearchBar";

export default class App extends Component {

    constructor (props) {
        super(props);
        console.log("Courseplus home is running......");
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    render()
    {
        return (
            <div className="cp-home-app">
                <header><Header /></header>
                <main>
                    <div className="tool-bar"><SearchBar /></div>
                    <div className="content"></div>
                </main>
            </div>
        );
    }
}
