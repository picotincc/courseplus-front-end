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

    componentDidMount()
    {
        const topicContent = this.refs["topicContent"];
        Ps.initialize(topicContent, {
          wheelSpeed: 1,
          minScrollbarLength: 20
        });
    }

    componentDidUpdate()
    {
        const topicContent = this.refs["topicContent"];
        Ps.initialize(topicContent, {
          wheelSpeed: 1,
          minScrollbarLength: 20
        });
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
                text: `邀请码：${topicInfo.inviteCode} 添加QQ：${topicInfo.qqGroupId}`
            });
        }
        else
        {
            swal({
                title: "课程报名",
                text: ` 您需要支付 ￥${cost} 来报名此次课程，支付完成后，我们将告知您课程负责人的QQ号以及邀请码，添加QQ号在验证信息处输入邀请码，即可通过验证。选择购买他的全套课程【独家资料】和【向大神提问】的服务都会免费赠送哦，最低可省200元~邀请一名研友共同报名，您的报名费用更可以优惠到每小时66元！邀请到两名报名费低至每小时49元~`,
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
                text: `邀请码：${author.inviteCode} 添加QQ：${author.qqGroupId}`
            });
        }
        else
        {
            swal({
                title: "买断他的课程",
                text: `您需要支付 ￥${cost} 来买断该作者关于这门课的全部课程，买断后，您可以直接参加他的所有现有课程以及新开课程。 支付完成后，我们将告知您课程负责人的QQ号以及邀请码，添加QQ号在验证信息处输入邀请码，即可通过验证。`,
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
                    <div ref="topicContent" className="content-pay" dangerouslySetInnerHTML={{__html: topic.content}}>
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
                    <div ref="topicContent" className="content" dangerouslySetInnerHTML={{__html: topic.content}}>
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
                            <div className="btn-text">
                                {selectedTopic ? selectedTopic.name : ""}
                            </div>
                            <span className="caret"></span>
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
