import React, { Component } from 'react';

import CourseBox from "./CourseBox";

export default class CourseContent extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {

    }

    render()
    {
        return (
            <div className="cp-home-course-content">
                <CourseBox />
                <CourseBox />
                <CourseBox />
                <CourseBox />
            </div>
        );
    }
}
