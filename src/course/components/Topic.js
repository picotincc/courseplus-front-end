import React, { Component } from 'react';

import ServiceClient from "../../base/service/ServiceClient";

export default class Knowledge extends Component {

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
        topicContent: ""
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.selectedTopic)
        {
            const id = nextProps.selectedTopic.id;
            ServiceClient.getInstance().getTopicDetail(id).then(res => {
                this.setState({
                    topicContent: res.content
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
        const content = this.state.topicContent;
        return (
            <div className="cp-course-topic">
                <div className="knowledge-content">
                    <div dangerouslySetInnerHTML={{__html: content}}>
                    </div>
                </div>
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
