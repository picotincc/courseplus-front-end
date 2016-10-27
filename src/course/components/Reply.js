import React, { Component } from 'react';

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
        let authorIcon = "http://uupaper.oss-cn-qingdao.aliyuncs.com/9c5b17a57bbf9c3279f9e2faf3b3e118.jpeg";

        return (
            <div className="cp-course-reply">
                <div className="replyer-img">
                    <img src={reply.authorIcon ? reply.authorIcon : authorIcon} />
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
