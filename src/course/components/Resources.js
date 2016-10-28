import React, { Component } from 'react';

export default class Resources extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {

    }

    render()
    {
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
                    <div className="box">
                        <span className="icon iconfont icon-pdf"></span>
                        <span className="year">
                            2016
                        </span>
                    </div>
                    <div className="box">
                        <span className="icon iconfont icon-pdf"></span>
                        <span className="year">
                            2015
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
