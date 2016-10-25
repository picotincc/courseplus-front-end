import React, { Component } from 'react';

import Contributor from "./Contributor";
import CourseInfo from "./CourseInfo";
import Forum from "./Forum";
import Resources from "./Resources";

export default class Course extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {
        course: null
    }

    static propTypes = {

    }

    state = {
        selectedContributor: "",
        selectedTopic: "",
        forumInfo: []
    }

    componentDidMount()
    {

    }

    render()
    {
        const course = this.props.course;
        console.log(course);

        let courseInfo = null;
        if (course)
        {
            courseInfo = {
                cover: course.cover,
                desc: course.description,
                name: course.name,
                topicNum: course.topicNum,
                resourceNum: course.resourceNum,
                schoolName: course.schoolName,
                specialityName: course.specialityName
            };
        }

        return (
            <div className="cp-course-course">
                <div className="course-info">
                    <CourseInfo courseInfo={courseInfo} />
                </div>
                <div className="course-contributor">
                    <Contributor />
                </div>
                <div className="discuss-area">
                    <Forum />
                </div>
                <div className="related-resources">
                    <Resources />
                </div>
            </div>
        );
    }
}
