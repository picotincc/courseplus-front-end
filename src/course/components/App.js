import React, { Component } from 'react';

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
            <div className="cp-course-app"></div>
        );
    }
}
