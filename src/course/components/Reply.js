import React, { Component } from 'react';

import { DEFAULT_AVATOR } from "../../base/util/ConstantUtil";

export default class Reply extends Component {

    constructor (props) {
        super(props);

        this.reply = this.reply.bind(this);
        this.handleReplyDelete = this.handleReplyDelete.bind(this);
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

    handleReplyDelete()
    {
        if (this.props.user.id === this.props.reply.authorId)
        {
            swal({
                title: "删除评论",
                text: `你确定要删除此评论吗`,
                showCancelButton: true,
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                closeOnCancel: true
            },(isConfirm) => {
                if (isConfirm)
                {
                    this.props.onReplyDelete(this.props.reply.id);
                }
            });
        }
    }

    render()
    {
        const reply = this.props.reply;
        let deleteBtn = null;
        if (this.props.user && this.props.user.id === reply.authorId)
        {
            deleteBtn = (
                <div onMouseDown={this.handleReplyDelete} className="reply">删除</div>
            );
        }

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
                        {deleteBtn}
                        <div onMouseDown={this.reply} className="reply">回复</div>
                    </div>
                </div>
            </div>
        );

    }
}
