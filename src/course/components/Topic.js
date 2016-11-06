import React, { Component } from 'react';

import ServiceClient from "../../base/service/ServiceClient";

export default class Topic extends Component {

    constructor (props) {
        super(props);

        this.handleTopicSelect = this.handleTopicSelect.bind(this);
        this.handleTopicMove = this.handleTopicMove.bind(this);
        this.handleTopicPay = this.handleTopicPay.bind(this);
        this.handleCourseAuthorPay = this.handleCourseAuthorPay.bind(this);
    }

    static defaultProps = {
        topics: []
    }

    static propTypes = {

    }

    state = {
        topicInfo: null
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.selectedTopic)
        {
            const id = nextProps.selectedTopic.id;
            ServiceClient.getInstance().getTopicDetail(id).then(res => {
                this.setState({
                    topicInfo: res
                });
            });
        }
    }

    handleTopicSelect(item)
    {
        if (item.id !== this.props.selectedTopic.id)
        {
            this.props.onTopicChange(item);
        }
    }

    handleTopicMove(tag)
    {
        const curTopic = this.props.selectedTopic;
        this.props.onTopicMove(tag, curTopic);
    }

    handleTopicPay()
    {
        const topic = this.props.selectedTopic;
        const topicInfo = this.state.topicInfo;
        let cost = (topic.cost / 100);
        if (topicInfo.inviteCode)
        {
            swal({
                type: "success",
                title: "邀请码",
                customClass: "swal-inviteCode",
                text: `邀请码：${topicInfo.inviteCode} 加入QQ群：${topicInfo.qqGroupId}`
            });
        }
        else
        {
            swal({
                title: "课程报名",
                text: ` 您需要支付 ￥${cost} 来报名此次课程，支付完成后，我们将告知您课程的qq群以及您的专属邀请码。`,
                showCancelButton: true,
                confirmButtonColor: "#038574",
                confirmButtonText: "确认支付",
                cancelButtonText: "暂不支付",
                customClass: "swal-resource-dialog",
                closeOnConfirm: true,
                closeOnCancel: true
            },(isConfirm) => {
                if (isConfirm)
                {
                    this.props.onTopicPay();
                }
            });
        }
    }

    handleCourseAuthorPay()
    {
        const author = this.props.author;
        let cost = (author.courseCost / 100);
        if (author.inviteCode)
        {
            swal({
                type: "success",
                title: "邀请码",
                customClass: "swal-inviteCode",
                text: `邀请码：${author.inviteCode} 加入QQ群：${author.qqGroupId}`
            });
        }
        else
        {
            swal({
                title: "买断他的课程",
                text: `您需要支付 ￥${cost} 来买断该作者关于这门课的全部课程，买断后，您可以直接参加他的所有现有课程以及新开课程。 支付完成后，我们将告知您课程的qq群以及您的专属邀请码。请在加群的时候在验证信息中输入您的专属邀请码，管理员验证后即可通过。`,
                showCancelButton: true,
                confirmButtonColor: "#038574",
                confirmButtonText: "确认支付",
                cancelButtonText: "暂不支付",
                customClass: "swal-resource-dialog",
                closeOnConfirm: true,
                closeOnCancel: true
            },(isConfirm) => {
                if (isConfirm)
                {
                    this.props.onCourseAuthorPay();
                }
            });
        }
    }

    render()
    {
        const {topics, author, selectedTopic} = this.props;
        let topic = this.state.topicInfo;
        topic = topic ? topic : {};
        let content = null;
        if (topic &&　topic.type === 2)
        {
            content = (
                <div className="knowledge-content">
                    <div className="content-pay" dangerouslySetInnerHTML={{__html: topic.content}}>
                    </div>
                    <div className="pay-course-btns">
                        <div className="bar">
                            <div onClick={this.handleTopicPay} className="pay-this">
                                <span className="icon iconfont icon-people"></span>
                                {topic.inviteCode ? "报名信息" : "课程报名"}
                            </div>
                            <div onClick={this.handleCourseAuthorPay} className="pay-all">
                                <span className="icon iconfont icon-gouwuche"></span>
                                {author.inviteCode ? "课程买断信息" : "购买他的全部课时" }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            content = (
                <div className="knowledge-content">
                    <div className="content" dangerouslySetInnerHTML={{__html: topic.content}}>
                    </div>
                </div>
            );
        }
        return (
            <div className="cp-course-topic">
                {content}
                <div className="bottom-controls">
                    <div onClick={() => this.handleTopicMove(0)} className="previous">
                        <span>上一条</span>
                    </div>
                    <div className="category-dropdown dropdown">
                        <button className="btn-category btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                            {selectedTopic ? selectedTopic.name : ""}<span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            {topics.map(item => {
                                return (
                                    <li
                                        key={item.id}
                                        onClick={() => this.handleTopicSelect(item)}
                                    >
                                        <a>{item.name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div onClick={() => this.handleTopicMove(1)} className="next">
                        <span>下一条</span>
                    </div>
                </div>
            </div>
        );
    }
}
