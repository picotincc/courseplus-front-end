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
        const courses = this.props.courses;
        return (
            <div className="cp-home-course-content">
                {courses.map(item => {
                    return (<CourseBox key={item.id} courseInfo={item} />)
                })}
            </div>
        );
    }
}
