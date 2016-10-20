import React, { Component } from 'react';

import Reply from "./Reply";

export default class Comment extends Component {

    constructor (props) {
        super(props);

        this.showReply = this.showReply.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isExpanded: false,
        replyList: []
    }

    componentDidMount()
    {

    }

    render()
    {
        return (
            <div className="cp-course-comment">
                <div className="root-comment">
                    <div className="commenter-img">
                        <img src="http://uupaper.oss-cn-qingdao.aliyuncs.com/9c5b17a57bbf9c3279f9e2faf3b3e118.jpeg" />
                    </div>
                    <div className="right-section">
                        <div className="name">高扬最帅</div>
                        <div className="content">这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论这是一个很长的评论</div>
                        <div className="bottom-bar">
                            <div className="comment-date">2016.10.16 15:20</div>
                            <a ref="btnShowReply" href="#comment1" data-toggle="collapse" onClick={this.showReply} className="show-reply">回复&nbsp;2</a>
                        </div>
                    </div>
                </div>
                <div id="comment1" ref="replySection" className="reply-section collapse">
                    <ul className="reply-list">
                        <li><Reply /></li>
                        <li><Reply /></li>
                    </ul>
                    <div className="reply-input">
                        <textarea className="forum-textarea" placeholder="我要评论"/>
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

    showReply()
    {
        const replySection = this.refs.replySection;
        const btnShowReply = this.refs.btnShowReply;
        console.log(btnShowReply);
        // if (this.state.isExpanded) {
        //     replySection.style.display = "none";
        //     btnShowReply.innerHTML = "回复 2";
        //     this.setState({
        //         isExpanded: false
        //     });
        // }
        // else
        // {
        //     replySection.style.display = "flex";
        //     btnShowReply.innerHTML = "收起回复";
        //
        //     if (this.state.replyList.length === 0) {
        //         //请求此评论的回复列表
        //         this.setState({
        //             isExpanded: true,
        //             replyList: []
        //         });
        //     }
        // }
    }
}
