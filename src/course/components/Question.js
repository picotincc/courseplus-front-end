import React, { Component } from 'react';

import FormatUtil from "../../base//util/FormatUtil";

import ServiceClient from "../../base/service/ServiceClient";

export default class Question extends Component {

    constructor (props) {
        super(props);

        this.hide = this.hide.bind(this);
        this.clear = this.clear.bind(this);
        this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    }

    static defaultProps = {
        questionInfo: null
    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {
        this.questionContent = this.refs["questionContent"];
        this.wordCount = this.refs["wordCount"];
        this.emailInput = this.refs["emailInput"];

        this.questionContent.onkeydown = (e) => {
            if(e.keyCode !== 8 && e.target.value.length >= 140)
            {
                event.returnValue = false;
            }
        };

        this.questionContent.oninput = (e) => {
            const length = e.target.value.length;
            let count = 140 - length;
            this.wordCount.textContent = count;
        };
    }

    //内部交互方法
    hide()
    {
        this.props.onQuestionHide();
        this.clear();
    }

    clear()
    {
        this.questionContent.value = "";
        this.emailInput.value = "";
        this.wordCount.textContent = 140;
    }

    handleQuestionSubmit()
    {
        const content = this.questionContent.value;
        const email = this.emailInput.value;
        const authorId = this.props.questionInfo.authorId;
        const topicId = this.props.questionInfo.topicId;

        let eChecked = FormatUtil.isValidEmail(email);
        if (eChecked)
        {
            if (content !== "")
            {
                ServiceClient.getInstance().publishQuestion({
                    content,
                    email,
                    authorId,
                    topicId
                }).then(res => {
                    if (res.textStatus === "success")
                    {
                        swal({
                            type: "success",
                            title: "Good job！",
                            text: "提问成功，请注意查收邮件！"
                        }, () => {
                            this.hide();
                        });
                    }
                    else
                    {
                        swal({
                            type: "error",
                            title: "Something wrong！",
                            text: res.message
                        });
                    }
                });
            }
            else
            {
                swal({
                    type: "error",
                    title: "Something wrong！",
                    text: "请输入提问内容"
                });
            }
        }
        else
        {
            swal({
                type: "error",
                title: "Something wrong！",
                text: "电子邮箱格式不正确"
            });
        }
    }

    render()
    {
        const author = this.props.author;
        return (
            <div className="cp-course-question">
                <div className="top-bar">
                    <div className="empty"></div>
                    <div className="title">
                        大神直通车
                    </div>
                    <span onClick={this.hide} className="icon iconfont icon-close"></span>
                </div>
                <textarea ref="questionContent" maxLength="140" className="form-control question-content" placeholder="最多输入140字" />
                <div className="bar">
                    <div className="rest">
                        还剩<span ref="wordCount" className="word-count">140</span>字
                    </div>
                </div>
                <div className="email input-group">
                    <span className="input-group-addon">
                        <span className="icon iconfont icon-email"></span>
                    </span>
                    <input ref="emailInput" type="text" className="form-control" placeholder="邮箱" />
                </div>

                <div className="submit-bar">
                    <div onClick={this.handleQuestionSubmit} className="btn-submit">
                        <span>提交</span>
                    </div>
                </div>
            </div>
        );
    }
}
