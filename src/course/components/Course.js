import React, { Component } from 'react';

import FormatUtil from "../../base/util/FormatUtil";
import ServiceClient from "../../base/service/ServiceClient";
import { ORDER_TYPE, PAY_CHANNEL, EVENT_NAME } from "../../base/util/ConstantUtil";

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
        this.handleResourceDownload = this.handleResourceDownload.bind(this);
        this.handleQuestionPublish = this.handleQuestionPublish.bind(this);
        this.handleQuestionShow = this.handleQuestionShow.bind(this);
        this.handleTopicPay = this.handleTopicPay.bind(this);
        this.handleCourseAuthorPay = this.handleCourseAuthorPay.bind(this);
    }

    static defaultProps = {
        course: null
    }

    static propTypes = {

    }

    state = {
        selectedContributor: null,
        selectedTopic: null,
        sortedAuthors: [],
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
            const result = FormatUtil.expandTopics(course.topics, course.authors);
            const author = returnInfo.authorId ? course.authors.find(item => item.id === returnInfo.authorId) : course.authors[0];
            const expandedTopics = result.topics;
            const topic = expandedTopics.find(item => item.id === returnInfo.topicId);
            this.setState({
                selectedContributor: author,
                selectedTopic: topic,
                sortedAuthors: result.authors,
                sortedTopics: result.sortedTopics,
                expandedTopics: expandedTopics
            });
            if (returnInfo.type === 1)
            {
                window.open(returnInfo.attachmentUrl);
            }
            else if (returnInfo.type === 2)
            {
                PubSub.publish(EVENT_NAME.ADD_QUESTION_INFO, {
                    authorId: returnInfo.authorId,
                    topicId: returnInfo.topicId
                });
                nextProps.onQuestionShow();
            }
            else
            {
                swal({
                    type: "success",
                    title: "邀请码",
                    customClass: "swal-inviteCode",
                    text: `邀请码：${returnInfo.inviteCode} 加入QQ群：${returnInfo.qqGroupId}`
                });
            }
        }
        else
        {
            if (!this.state.selectedContributor && nextProps.course)
            {
                const course = nextProps.course;
                const result = FormatUtil.expandTopics(course.topics, course.authors);
                const author = result.authors[0];
                const expandedTopics = result.topics;
                const topic = author? result.sortedTopics[author.id][0] : {};
                this.setState({
                    selectedContributor: author,
                    selectedTopic: topic,
                    sortedAuthors: result.authors,
                    sortedTopics: result.sortedTopics,
                    expandedTopics: expandedTopics
                });
            }

            if (this.state.selectedContributor && nextProps)
            {
                const course = nextProps.course;
                const result = FormatUtil.expandTopics(course.topics, course.authors);
                const expandedTopics = result.topics;
                const author = this.state.selectedContributor;
                const topic = result.sortedTopics[author.id][0];
                this.setState({
                    selectedContributor: author,
                    selectedTopic: topic,
                    sortedAuthors: result.authors,
                    sortedTopics: result.sortedTopics,
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
            const topic = this.state.sortedTopics[item.id][0];
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

    handleResourceDownload(resourceId, cost)
    {
        const courseId = this.props.course.id;
        const topicId = this.state.selectedTopic.id;
        ServiceClient.getInstance().getCharge({
            type: ORDER_TYPE.RESOURCE,
            channel: PAY_CHANNEL.ALIPAY,
            amount: cost,
            resourceId: resourceId,
            topicId: topicId
        }).then(res => {
            pingpp.createPayment(res);
        });
    }

    handleQuestionPublish(cost)
    {
        const topicId = this.state.selectedTopic.id;

        ServiceClient.getInstance().getCharge({
            type: ORDER_TYPE.QUESTION,
            channel: PAY_CHANNEL.ALIPAY,
            amount: cost,
            topicId: topicId
        }).then(res => {
            pingpp.createPayment(res);
        });
    }

    handleTopicPay()
    {
        const topic = this.state.selectedTopic;

        ServiceClient.getInstance().getCharge({
            type: ORDER_TYPE.SINGLE_COURSE,
            channel: PAY_CHANNEL.ALIPAY,
            amount: topic.cost,
            topicId: topic.id
        }).then(res => {
            pingpp.createPayment(res);
        });
    }

    handleCourseAuthorPay()
    {
        const topic = this.state.selectedTopic;
        const author = this.state.selectedContributor;

        ServiceClient.getInstance().getCharge({
            type: ORDER_TYPE.ALL_COURSE,
            channel: PAY_CHANNEL.ALIPAY,
            amount: author.courseCost,
            topicId: topic.id,
            authorCourseId: author.authorCourseId
        }).then(res => {
            pingpp.createPayment(res);
        });
    }

    handleQuestionShow(author)
    {
        let question = {};
        question.authorId = author.id;
        question.topicId = this.state.selectedTopic.id;
        PubSub.publish(EVENT_NAME.ADD_QUESTION_INFO, question);
        this.props.onQuestionShow();
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

            contributors = state.sortedAuthors;
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
                            onResourceDownload={this.handleResourceDownload}
                            onQuestionPublish={this.handleQuestionPublish}
                            onQuestionShow={this.handleQuestionShow}
                        />
                    </div>
                    <div className="topic">
                        <Topic
                            topics={topics}
                            author={state.selectedContributor}
                            selectedTopic={state.selectedTopic}
                            onTopicChange={this.handleTopicChange}
                            onTopicMove={this.handleTopicMove}
                            onTopicPay={this.handleTopicPay}
                            onCourseAuthorPay={this.handleCourseAuthorPay}
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
