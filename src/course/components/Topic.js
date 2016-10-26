import React, { Component } from 'react';

import ServiceClient from "../../base/service/ServiceClient";

export default class Knowledge extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {
        topics: []
    }

    static propTypes = {

    }

    state = {
        selectedTopic: null,
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
                    <div className="previous">
                        <span>上一条</span>
                    </div>
                    <div className="category-dropdown dropdown">
                        <button className="btn-category btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                            {selectedTopic ? selectedTopic.name : ""}<span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            {topics.map(item => {
                                return (
                                    <li key={item.id}><a>{item.name}</a></li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="next">
                        <span>下一条</span>
                    </div>
                </div>
            </div>
        );
    }
}
