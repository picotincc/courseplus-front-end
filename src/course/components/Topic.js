import React, { Component } from 'react';

import ServiceClient from "../../base/service/ServiceClient";

export default class Topic extends Component {

    constructor (props) {
        super(props);

        this.handleTopicSelect = this.handleTopicSelect.bind(this);
        this.handleTopicMove = this.handleTopicMove.bind(this);
    }

    static defaultProps = {
        topics: []
    }

    static propTypes = {

    }

    state = {
        topic: null
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.selectedTopic)
        {
            const id = nextProps.selectedTopic.id;
            ServiceClient.getInstance().getTopicDetail(id).then(res => {
                this.setState({
                    topic: res
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

    render()
    {
        const {topics, selectedTopic} = this.props;
        let topic = this.state.topic;
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
                            <div className="pay-this">
                                <span className="icon iconfont icon-people"></span>
                                {topic.inviteCode ? "报名信息" : "课程报名"}
                            </div>
                            <div className="pay-all">
                                <span className="icon iconfont icon-gouwuche"></span>
                                购买他的全部课时
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
