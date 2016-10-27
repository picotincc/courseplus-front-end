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
    }

    static defaultProps = {
        selectedTopic: null
    }

    static propTypes = {

    }

    state = {
        isLogin: true,
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
                        this.setState({
                            commentList
                        });
                        alert("发布成功");
                    }
                    else
                    {
                        alert("发布失败");
                    }
                });
            }
            else
            {
                alert("请先登录");
            }

        }
        else
        {
            alert("请输入评论内容");
        }
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
                                topic={topic}
                                rootComment={item}
                            />
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }


}
