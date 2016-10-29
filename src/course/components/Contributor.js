import React, { Component } from 'react';

import ServiceClient from "../../base/service/ServiceClient";
import WebStorageUtil from "../../base/util/WebStorageUtil";

export default class Contributor extends Component {

    constructor (props) {
        super(props);

        this.handleCourseSelect = this.handleCourseSelect.bind(this);
        this.handleResourceDownload = this.handleResourceDownload.bind(this);
        this.handleQuestionPublish = this.handleQuestionPublish.bind(this);
    }

    static defaultProps = {
        info: null
    }

    static propTypes = {

    }

    state = {

    }

    handleCourseSelect(courseId)
    {
        this.props.onCourseSelect(courseId);
    }

    handleResourceDownload()
    {
        const token = WebStorageUtil.getToken();
        if (token)
        {
            const info = this.props.info;
            const cost = (info.resourceCost / 100);
            const name = info.name;
            const onResourceDownload = this.props.onResourceDownload;
            ServiceClient.getInstance().getDownloadUrl(info.attachmentId).then(res => {
                if (res.code === 0)
                {
                    window.open(res.message);
                }
                else
                {
                    swal({
                        title: "考研秘籍",
                        text: `考研秘籍是${name}亲自整理的知识点、题库、真题解析，向${name}支付￥${cost}获取整套秘籍下载资格！`,
                        showCancelButton: true,
                        confirmButtonColor: "#038574",
                        confirmButtonText: "确认支付",
                        cancelButtonText: "暂不支付",
                        customClass: "swal-resource-dialog",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },(isConfirm) => {
                        if (isConfirm)
                        {
                            onResourceDownload(info.attachmentId, info.resourceCost);
                        }
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

    handleQuestionPublish()
    {
        const author = this.props.info;
        console.log(author);
        this.props.onQuestionShow(author);
    }

    render()
    {
        const info = this.props.info;
        let relatedCourses = [];
        if (info)
        {
            relatedCourses = info.courses;
        }

        return (
            <div className="cp-course-contributor">
                <div className="image">
                    <img src={info ? info.avatar : null} />
                </div>
                <div className="name">
                    {info ? info.name : ""}
                </div>
                <div className="intro">
                    {info ? info.description : ""}
                </div>
                <div onClick={this.handleQuestionPublish} className="contact">
                    <span className="icon iconfont icon-message"></span>
                    大神直通车
                </div>
                <div onClick={this.handleResourceDownload} className="resource">
                    <span className="icon iconfont icon-download"></span>
                    考研秘籍
                </div>
                <div className="others">
                    他的其他课程
                </div>
                <ul className="others-courses">
                    {relatedCourses.map(item => {
                        return (
                            <li
                                key={item.id}
                                onClick={() => this.handleCourseSelect(item.id)}
                            >
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
