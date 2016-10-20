import React, { Component } from 'react';

import Comment from "./Comment";

export default class Forum extends Component {

    constructor (props) {
        super(props);

        this.commentInput_onfocus = this.commentInput_onfocus.bind(this);
        this.commentInput_onblur = this.commentInput_onblur.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isLogin: true
    }

    render()
    {
        return (
            <div className="cp-course-forum">
                <div className="title">讨论区</div>
                <div className="comment-input">
                    <textarea ref="commentInput" className="forum-textarea" placeholder="说点什么吧"/>
                </div>
                <div className="bar">
                    <div className="btn-publish">
                        <span>发布</span>
                    </div>
                </div>
                <ul className="comment-list">
                    <li><Comment /></li>
                </ul>
            </div>
        );
    }

    componentDidMount()
    {
        this.commentInput = this.refs["commentInput"];
        this.commentInput.onfocus = this.commentInput_onfocus;
        this.commentInput.onblur = this.commentInput_onblur;
    }

    commentInput_onfocus(e)
    {
        this.commentInput.style.height = "120px";
    }

    commentInput_onblur(e)
    {
        this.commentInput.style.height = "52px";
    }
}
