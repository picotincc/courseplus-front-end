import React, { Component } from 'react';

import ServiceClient from "../../base/service/ServiceClient";
import WebStorageUtil from "../../base/util/WebStorageUtil";

export default class Resources extends Component {

    constructor (props) {
        super(props);

        this.handleResourceClick = this.handleResourceClick.bind(this);
    }

    static defaultProps = {
        resources: []
    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {

    }

    handleResourceClick(item)
    {
        const token = WebStorageUtil.getToken();
        if (token)
        {
            const cost = (item.cost / 100);
            const name = item.name;
            const onResourceDownload = this.props.onResourceDownload;
            ServiceClient.getInstance().getDownloadUrl(item.id).then(res => {
                if (res.code === 0)
                {
                    window.open(res.message);
                }
                else
                {
                    swal({
                        title: "课程资料",
                        text: `如果想要下载${name}需要支付￥${cost}获取此资料的下载资格！`,
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
                            onResourceDownload(item.id, item.cost);
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

    handleResourceDownload()
    {

    }

    render()
    {
        const resources = this.props.resources;

        return (
            <div className="cp-course-resources">
                <div className="top-bar">
                    <div className="title">往年试卷</div>
                    {/* <div className="package-download">
                        <span className="icon iconfont icon-download"></span>
                        打包下载
                    </div> */}
                </div>
                <div className="history-resources">
                    {resources.map(item => {
                        return (
                            <div key={item.id} className="box">
                                <span onClick={() => this.handleResourceClick(item)} className="icon iconfont icon-pdf"></span>
                                <span className="year">
                                    {item.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
