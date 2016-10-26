import React, { Component } from 'react';

import Contributor from "./Contributor";
import CourseInfo from "./CourseInfo";
import Topic from "./Topic";
import Forum from "./Forum";
import Resources from "./Resources";

export default class Course extends Component {

    constructor (props) {
        super(props);

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    static defaultProps = {
        course: null
    }

    static propTypes = {

    }

    state = {
        selectedContributor: null,
        selectedTopic: "",
        forumInfo: []
    }

    componentDidMount()
    {

    }

    componentWillReceiveProps(nextProps)
    {
        if (!this.state.selectedContributor && nextProps)
        {
            const course = nextProps.course;
            this.setState({
                selectedContributor: course.authors[0]
            });
        }
    }

    handleTabClick(item)
    {
        if (item.id !== this.state.selectedContributor.id)
        {
            this.setState({
                selectedContributor: item
            });
        }
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
                    {contributors.map(item => {
                        if (state.selectedContributor && state.selectedContributor.id === item.id) {
                            return (
                                <div key={item.id} className="tab selected" onClick={() => this.handleTabClick(item)}>
                                    <span>{item.name}</span>
                                </div>
                            );
                        }
                        return (
                            <div key={item.id} className="tab" onClick={() => this.handleTabClick(item)}>
                                <span>{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="middle-content">
                    <div className="contributor">
                        <Contributor info={state.selectedContributor}/>
                    </div>
                    <div className="topic">
                        <Topic topics={topics} />
                    </div>
                    {/* <Contributor
                        contributor={state.selectedContributor}
                        topics={topics}
                    /> */}
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
