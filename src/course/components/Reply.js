import React, { Component } from 'react';

import { DEFAULT_AVATOR } from "../../base/util/ConstantUtil";

export default class Reply extends Component {

    constructor (props) {
        super(props);

        this.reply = this.reply.bind(this);
    }

    static defaultProps = {
        reply: {
            authorIcon: null,
            authorName: "",
            content: "",
            replyTime: ""
        }
    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {

    }

    reply()
    {
        const reply = this.props.reply;
        this.props.onReplyClick(reply.authorName);
    }

    render()
    {
        const reply = this.props.reply;

        return (
            <div className="cp-course-reply">
                <div className="replyer-img">
                    <img src={reply.authorIcon ? reply.authorIcon : DEFAULT_AVATOR} />
                </div>
                <div className="right-section">
                    <div className="name">{reply.authorName}</div>
                    <div className="content">{reply.content}</div>
                    <div className="bottom-bar">
                        <div className="comment-date">{reply.replyTime}</div>
                        <div onMouseDown={this.reply} className="reply">回复</div>
                    </div>
                </div>
            </div>
        );

    }
}
