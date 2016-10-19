import React, { Component } from 'react';

export default class ContributorInfo extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    render()
    {
        return (
            <div className="cp-course-contributor-info">
                <div className="image">
                    <img src="http://i1.piimg.com/573251/d05673fb35b70bd7.png" />
                </div>
                <div className="name">
                    王思议
                </div>
                <div className="intro">
                    南京大学软件学院2016级考研第一名，精通数据结构、操作系统、网络、软件工程。大神带你飞！
                </div>
                <div className="contact">
                    <span className="icon iconfont icon-message"></span>
                    大神直通车
                </div>
                <div className="resource">
                    <span className="icon iconfont icon-download"></span>
                    考研秘籍
                </div>
                <div className="others">
                    他的其他课程
                </div>
                <ul className="others-courses">
                    <li>微积分</li>
                    <li>软件工程</li>
                    <li>操作系统</li>
                </ul>
            </div>
        );
    }
}
