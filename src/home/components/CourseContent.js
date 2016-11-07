import React, { Component } from 'react';

import FormatUtil from "../../base/util/FormatUtil";

import CourseBox from "./CourseBox";

export default class CourseContent extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {
        courses: []
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
        let { courses , onCourseClick } = this.props;

        return (
            <div className="cp-home-course-content">
                {courses.map(item => {
                    return (
                        <CourseBox
                            key={item.id}
                            courseInfo={item}
                            onCourseClick={onCourseClick}
                        />
                    )
                })}
            </div>
        );
    }
}
