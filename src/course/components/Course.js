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
        const state = this.state;
        console.log(course);

        let courseInfo = null;
        let contributors = [];
        let topics = [];
        let resources = [];
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

            contributors = course.authors;
            topics = course.topics;
            resources = course.resources;
        }

        return (
            <div className="cp-course-course">
                <div className="course-info">
                    <CourseInfo courseInfo={courseInfo} />
                </div>
                <div className="contributor-tabs">
                    <div className="tab selected">
                        <span>王思议</span>
                    </div>
                    <div className="tab">
                        <span>大神</span>
                    </div>
                </div>
                <div className="course-contributor">
                    <Contributor
                        contributors={contributors}
                        topics={topics}
                        selectedContributor={state.selectedContributor}
                    />
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
