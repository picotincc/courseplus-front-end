import React, { Component } from 'react';

import Reply from "./Reply";

export default class Comment extends Component {

    constructor (props) {
        super(props);

        this.showReply = this.showReply.bind(this);
    }

    static defaultProps = {
        rootComment: {
            authorName: "",
            content: "",
            replyTime: "",
            replyCount: "",
            authorIcon: null
        }
    }

    static propTypes = {

    }

    state = {
        isExpanded: false,
        replyList: []
    }

    componentWillReceiveProps(nextProps)
    {

    }

    replyInput_onfocus(e)
    {
        e.target.style.height = "120px";
    }

    replyInput_onblur(e)
    {
        e.target.style.height = "auto";
    }

    showReply()
    {
        const btnShowReply = this.refs.btnShowReply;
        if (this.state.isExpanded) {
            btnShowReply.innerHTML = "回复 2";
            this.setState({
                isExpanded: false
            });
        }
        else
        {
            btnShowReply.innerHTML = "收起回复";

            if (this.state.replyList.length === 0) {
                //请求此评论的回复列表
                this.setState({
                    isExpanded: true,
                    replyList: []
                });
            }
        }
    }

    handleCommentReply()
    {
        const text = this.commentInput.value;
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
                    if (res.code === 0)
                    {
                        alert("发布成功");
                        this.commentInput.value = "";
                    }
                    else
                    {
                        alert("请重新登录");
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
        const rootComment = this.props.rootComment;
        let authorIcon1 = "http://blog.bzxxg.cn/wp-content/uploads/2013/07/guest.png";
        let authorIcon2 = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeiPB1slh_EwpLQzoRaYX7duYX4vVvPDqhVX2MReSVucJhUtEAo3s-UA";
        return (
            <div className="cp-course-comment">
                <div className="root-comment">
                    <div className="commenter-img">
                        <img src={rootComment.authorIcon ? rootComment.authorIcon : authorIcon2} />
                    </div>
                    <div className="right-section">
                        <div className="name">{rootComment.authorName}</div>
                        <div className="content">{rootComment.content}</div>
                        <div className="bottom-bar">
                            <div className="comment-date">{rootComment.replyTime}</div>
                            <a ref="btnShowReply"
                               href={"#comment" + rootComment.id}
                               data-toggle="collapse"
                               onClick={this.showReply}
                               className="show-reply"
                             >回复&nbsp;{rootComment.replyCount > 0 ? rootComment.replyCount : ""}</a>
                        </div>
                    </div>
                </div>
                <div id={"#comment" + rootComment.id} ref="replySection" className="reply-section collapse">
                    <ul className="reply-list">
                        <li><Reply /></li>
                        <li><Reply /></li>
                    </ul>
                    <div className="reply-input">
                        <textarea
                            className="forum-textarea"
                            placeholder="我要评论"
                            onFocus={this.replyInput_onfocus}
                            onBlur={this.replyInput_onblur}
                        />
                    </div>
                    <div className="bar">
                        <div className="btn-reply">
                            <span>回复</span>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
