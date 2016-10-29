import React, { Component } from 'react';

import FormatUtil from "../../base/util/FormatUtil";
import ServiceClient from "../../base/service/ServiceClient";

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
        this.handleAuthorResourceDownload = this.handleAuthorResourceDownload.bind(this);
        this.handleResourceDownload = this.handleResourceDownload.bind(this);
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
        if (nextProps.returnInfo)
        {
            const returnInfo = nextProps.returnInfo;
            const course = nextProps.course;
            const author = returnInfo.authorId ? course.authors.find(item => item.id === returnInfo.authorId) : course.authors[0];
            const topic = course.topics[author.id][0];
            const expandedTopics = FormatUtil.expandTopics(course.topics);
            this.setState({
                selectedContributor: author,
                selectedTopic: topic,
                expandedTopics: expandedTopics
            });
            if (returnInfo.attachmentUrl)
            {
                window.open(returnInfo.attachmentUrl);
            }
            else
            {
                nextProps.onQuestionShow(author);
            }
        }
        else
        {
            if (!this.state.selectedContributor && nextProps)
            {
                const course = nextProps.course;
                const author = course.authors[0];
                const topic = course.topics[author.id][0];
                const expandedTopics = FormatUtil.expandTopics(course.topics);
                this.setState({
                    selectedContributor: author,
                    selectedTopic: topic,
                    expandedTopics: expandedTopics
                });
            }

            if (this.state.selectedContributor && nextProps)
            {
                const course = nextProps.course;
                const author = this.state.selectedContributor;
                const topic = course.topics[author.id][0];
                const expandedTopics = FormatUtil.expandTopics(course.topics);
                this.setState({
                    selectedContributor: author,
                    selectedTopic: topic,
                    expandedTopics: expandedTopics
                });
            }
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

    handleAuthorResourceDownload(resourceId, cost)
    {
        const courseId = this.props.course.id;
        const authorId = this.state.selectedContributor.id;

        ServiceClient.getInstance().getCharge({
            channel: "alipay_pc_direct",
            amount: cost,
            resourceId: resourceId,
            courseId: courseId,
            authorId: authorId
        }).then(res => {
            console.log(res);
            pingpp.createPayment(res);
        });
    }

    handleResourceDownload(resourceId, cost)
    {
        const courseId = this.props.course.id;

        ServiceClient.getInstance().getCharge({
            channel: "alipay_pc_direct",
            amount: cost,
            resourceId: resourceId,
            courseId: courseId
        }).then(res => {
            pingpp.createPayment(res);
        });
    }

    render()
    {
        const {course, user, onCourseSelect} = this.props;
        const state = this.state;

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
                        <Contributor
                            info={state.selectedContributor}
                            onCourseSelect={onCourseSelect}
                            onResourceDownload={this.handleAuthorResourceDownload}
                            onQuestionShow={this.props.onQuestionShow}
                        />
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
                    <Forum
                        selectedTopic={state.selectedTopic}
                    />
                </div>
                <div className="related-resources">
                    <Resources
                        resources={resources}
                        onResourceDownload={this.handleResourceDownload}
                    />
                </div>
            </div>
        );
    }
}
