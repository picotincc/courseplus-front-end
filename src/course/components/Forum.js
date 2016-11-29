import React, { Component } from 'react';

import ServiceClient from "../../base/service/ServiceClient";
import WebStorageUtil from "../../base/util/WebStorageUtil";

import Comment from "./Comment";

export default class Forum extends Component {

    constructor (props) {
        super(props);

        this.commentInput_onfocus = this.commentInput_onfocus.bind(this);
        this.commentInput_onblur = this.commentInput_onblur.bind(this);
        this.handleCommentPublish = this.handleCommentPublish.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
    }

    static defaultProps = {
        selectedTopic: null
    }

    static propTypes = {

    }

    state = {
        commentList: []
    }

    componentDidMount()
    {
        this.commentInput = this.refs["commentInput"];
        this.commentInput.onfocus = this.commentInput_onfocus;
        this.commentInput.onblur = this.commentInput_onblur;
    }

    componentWillReceiveProps(nextProps)
    {
        const topic = nextProps.selectedTopic;
        if (topic)
        {
            ServiceClient.getInstance().getCommentList(topic.id).then(res => {
                this.setState({
                    commentList: res
                });
            });
        }
    }

    commentInput_onfocus(e)
    {
        this.commentInput.style.height = "120px";
    }

    commentInput_onblur(e)
    {
        this.commentInput.style.height = "52px";
    }

    handleCommentPublish()
    {
        const text = this.commentInput.value;
        let commentList = this.state.commentList;
        if (text !== "")
        {
            const token = WebStorageUtil.getToken();
            const topic = this.props.selectedTopic;
            if (token)
            {
                ServiceClient.getInstance().postComment({
                    topicId: topic.id,
                    content: text
                }, token).then(res => {
                    if (res.textStatus === "success")
                    {
                        this.commentInput.value = "";
                        commentList.push(res);
                        swal({
                          title: "Good job!",
                          text: res.message,
                          type: "success"
                        });
                        this.setState({
                            commentList
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

    handleCommentDelete(commentId)
    {
        const commentList = this.state.commentList;
        ServiceClient.getInstance().deleteComment(commentId).then(res => {
            if (res.textStatus === "success")
            {
                const resList = commentList.reduce((pre, cur) => {
                    if (cur.id !== commentId)
                    {
                        pre.push(cur);
                    }
                    return pre;
                }, []);
                this.setState({
                    commentList: resList
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
        const topic = this.props.selectedTopic;
        const user = this.props.user;
        const commentList = this.state.commentList;
        return (
            <div className="cp-course-forum">
                <div className="title">讨论区</div>
                <div className="comment-input">
                    <textarea ref="commentInput" className="forum-textarea" placeholder="说点什么吧"/>
                </div>
                <div className="bar">
                    <div onMouseDown={this.handleCommentPublish} className="btn-publish">
                        <span>发布</span>
                    </div>
                </div>
                <ul className="comment-list">
                {commentList.map(item => {
                    return (
                        <li key={item.id}>
                            <Comment
                                user={user}
                                topic={topic}
                                rootComment={item}
                                onCommentDelete={this.handleCommentDelete}
                            />
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }


}
