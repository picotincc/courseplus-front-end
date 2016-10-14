import React, { Component } from 'react';

import Header from "./Header";

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

    }

    render()
    {
        return (
            <div className="cp-course-app">
                <header><Header /></header>
                <div className="container"></div>
                <footer></footer>
            </div>
        );
    }
}
