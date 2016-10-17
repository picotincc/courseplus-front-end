import React, { Component } from 'react';

import Contributor from "./Contributor";
import CourseInfo from "./CourseInfo";

export default class Course extends Component {

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
            <div className="cp-course-course">
                <div className="course-info">
                    <CourseInfo />
                </div>
                <div className="course-contributor">

                </div>
            </div>
        );
    }
}
