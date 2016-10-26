import React, { Component } from 'react';

import FormatUtil from "../../base/util/FormatUtil";

import Contributor from "./Contributor";
import CourseInfo from "./CourseInfo";
import Topic from "./Topic";
import Forum from "./Forum";
import Resources from "./Resources";

export default class Course extends Component {

    constructor (props) {
        super(props);

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleTopicMove = this.handleTopicMove.bind(this);
    }

    static defaultProps = {
        course: null
    }

    static propTypes = {

    }

    state = {
        selectedContributor: null,
        selectedTopic: null,
        expandedTopics: [],
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
            const author = course.authors[0];
            const topic = course.topics[author.id][0];
            const expandedTopics = FormatUtil.expandTopics(course.topics);
            this.setState({
                selectedContributor: course.authors[0],
                selectedTopic: topic,
                expandedTopics: expandedTopics
            });
        }
    }

    handleTabClick(item)
    {
        if (item.id !== this.state.selectedContributor.id)
        {
            const course = this.props.course;
            const topic = course.topics[item.id][0];
            this.setState({
                selectedContributor: item,
                selectedTopic: topic
            });
        }
    }

    handleTopicChange(topic)
    {
        const { selectedContributor } = this.state;
        if (topic.authorId === selectedContributor.id)
        {
            this.setState({
                selectedTopic: topic
            });
        }
        else
        {
            const authors = this.props.course.authors;
            const contributor = authors.find(item => item.id === topic.authorId);
            this.setState({
                selectedContributor: contributor,
                selectedTopic: topic
            });
        }
    }

    handleTopicMove(tag, curTopic)
    {
        const expandedTopics = this.state.expandedTopics;
        let index = expandedTopics.findIndex(item => item.id === curTopic.id);
        if (tag === 0)
        {
            index = (index - 1) < 0 ? expandedTopics.length - 1 : index - 1;
        }
        else
        {
            index = (index + 1) > expandedTopics.length - 1 ? 0 : index + 1;
        }
        const topic = expandedTopics[index];
        if (topic.authorId === curTopic.authorId)
        {
            this.setState({
                selectedTopic: topic
            });
        }
        else
        {
            const authors = this.props.course.authors;
            const contributor = authors.find(item => item.id === topic.authorId);
            this.setState({
                selectedContributor: contributor,
                selectedTopic: topic
            });
        }


    }

    render()
    {
        const course = this.props.course;
        const state = this.state;
        // console.log(course);

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
            topics = state.expandedTopics;
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
                        <Topic
                            topics={topics}
                            selectedTopic={state.selectedTopic}
                            onTopicChange={this.handleTopicChange}
                            onTopicMove={this.handleTopicMove}
                        />
                    </div>
                </div>
                <div className="discuss-area">
                    <Forum selectedTopic={state.selectedTopic} />
                </div>
                <div className="related-resources">
                    <Resources />
                </div>
            </div>
        );
    }
}
