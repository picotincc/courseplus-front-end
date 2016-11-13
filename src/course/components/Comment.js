import React, { Component } from 'react';

import { DEFAULT_AVATOR } from "../../base/util/ConstantUtil";
import FormatUtil from "../../base/util/FormatUtil";
import ServiceClient from "../../base/service/ServiceClient";
import WebStorageUtil from "../../base/util/WebStorageUtil";

import Reply from "./Reply";

export default class Comment extends Component {

    constructor (props) {
        super(props);

        this.updateReplyInput = this.updateReplyInput.bind(this);
        this.showReply = this.showReply.bind(this);
        this.handleCommentReply = this.handleCommentReply.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleReplyDelete = this.handleReplyDelete.bind(this);
    }

    static defaultProps = {
        rootComment: {
            authorName: "",
            content: "",
            replyTime: "",
            replyCount: "",
            authorIcon: null
        },
        topic: null
    }

    static propTypes = {

    }

    state = {
        isExpanded: false,
        replyList: []
    }

    componentDidMount()
    {
        this.replyInput = this.refs["replyInput"];
        this.replySection = this.refs["replySection"];

        $(this.replySection).on('hidden.bs.collapse', this.showReply);
        $(this.replySection).on('shown.bs.collapse', this.showReply);
    }

    replyInput_onfocus(e)
    {
        e.target.style.height = "120px";
    }

    replyInput_onblur(e)
    {
        e.target.style.height = "auto";
    }

    updateReplyInput(replyName)
    {
        this.replyInput.value = "回复 " + replyName + " : ";
    }

    showReply()
    {
        const btnShowReply = this.refs.btnShowReply;
        const replyList = this.state.replyList;
        const {rootComment, topic} = this.props;
        if (this.state.isExpanded) {
            btnShowReply.innerHTML = "回复 " + (replyList.length > 0 ? replyList.length : "");
            this.setState({
                isExpanded: false
            });
        }
        else
        {
            btnShowReply.innerHTML = "收起回复";

            ServiceClient.getInstance().getReplyList({
                topicId: topic.id,
                commentId: rootComment.id
            }).then(res => {
                this.setState({
                    isExpanded: true,
                    replyList: res
                });
            });

        }
    }

    handleCommentReply()
    {
        const text = this.replyInput.value;
        const replyId = this.props.rootComment.id;
        const replyList = this.state.replyList;
        if (text !== "")
        {
            const token = WebStorageUtil.getToken();
            const topic = this.props.topic;
            if (token)
            {
                ServiceClient.getInstance().replyComment({
                    topicId: topic.id,
                    replyId,
                    content: text
                }, token).then(res => {
                    if (res.textStatus === "success")
                    {
                        this.replyInput.value = "";
                        replyList.push(res);
                        swal({
                          title: "Good job!",
                          text: res.message,
                          type: "success"
                        });
                        this.setState({
                            replyList: replyList
                        });
                    }
                    else
                    {
                        swal({
                          title: "Something wrong!",
                          text: "请重新登录",
                          type: "error"
                        });
                    }
                });
            }
            else
            {
                swal({
                  title: "Something wrong!",
                  text: "请先登录",
                  type: "error"
                });
            }
        }
        else
        {
            swal({
              title: "Something wrong!",
              text: "请输入评论内容",
              type: "error"
            });
        }
    }

    handleCommentDelete()
    {
        if (this.props.user.id === this.props.rootComment.authorId)
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
                    this.props.onCommentDelete(this.props.rootComment.id);
                }
            });
        }
    }

    handleReplyDelete(replyId)
    {
        const replyList = this.state.replyList;
        ServiceClient.getInstance().deleteComment(replyId).then(res => {
            if (res.textStatus === "success")
            {
                const resList = replyList.reduce((pre, cur) => {
                    if (cur.id !== replyId)
                    {
                        pre.push(cur);
                    }
                    return pre;
                }, []);
                const count = resList.length;
                this.setState({
                    replyList: resList
                });
            }
            else
            {
                swal({
                    type: "error",
                    title: "Something wrong!",
                    text: res.message
                });
            }
        });
    }

    render()
    {
        const rootComment = this.props.rootComment;
        const replyList = this.state.replyList;
        let deleteBtn = null;
        if (this.props.user && this.props.user.id === rootComment.authorId)
        {
            deleteBtn = (
                <a ref="btnDelete"
                    onClick={this.handleCommentDelete}
                    className="show-reply"
                >删除</a>
            );
        }
        return (
            <div className="cp-course-comment">
                <div className="root-comment">
                    <div className="commenter-img">
                        <img src={rootComment.authorIcon ? rootComment.authorIcon : DEFAULT_AVATOR} />
                    </div>
                    <div className="right-section">
                        <div className="name">{rootComment.authorName}</div>
                        <div className="content">{rootComment.content}</div>
                        <div className="bottom-bar">
                            <div className="comment-date">{rootComment.replyTime}</div>
                            {deleteBtn}
                            <a ref="btnShowReply"
                               href={'#comment' + rootComment.id}
                               data-toggle="collapse"
                               className="show-reply"
                             >回复&nbsp;{rootComment.replyCount > 0 ? rootComment.replyCount : ""}</a>
                        </div>
                    </div>
                </div>
                <div id={'comment' + rootComment.id} ref="replySection" className="reply-section collapse">
                    <ul className="reply-list">
                        {replyList.map(item => {
                            return (
                                <li key={item.id}>
                                    <Reply
                                        user={this.props.user}
                                        onReplyClick={this.updateReplyInput}
                                        reply={item}
                                        onReplyDelete={this.handleReplyDelete}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    <div className="reply-input">
                        <textarea
                            ref="replyInput"
                            className="forum-textarea"
                            placeholder="我要评论"
                            onFocus={this.replyInput_onfocus}
                            onBlur={this.replyInput_onblur}
                        />
                    </div>
                    <div className="bar">
                        <div onMouseDown={this.handleCommentReply} className="btn-reply">
                            <span>回复</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
