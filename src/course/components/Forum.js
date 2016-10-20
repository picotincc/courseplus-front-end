import React, { Component } from 'react';

import Comment from "./Comment";

export default class Forum extends Component {

    constructor (props) {
        super(props);
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
                    <textarea className="forum-textarea" placeholder="说点什么吧"/>
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
}
