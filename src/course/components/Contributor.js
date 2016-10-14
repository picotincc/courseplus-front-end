import React, { Component } from 'react';

export default class Contributor extends Component {

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
            <div className="cp-course-contributor">
                <div className="contributor-info">
                    <div className="image"></div>
                    <div className="intro">复习资料作者个人简介</div>
                    <span className="contact">联系他</span>
                    <span className="download">下载他的复习资料</span>
                    <span className="other">他的其他课程</span>
                    <ul className="other-courses">
                        <li>数据库</li>
                        <li>软件工程</li>
                    </ul>
                </div>
                <ul className="course-content-list">

                </ul>
            </div>
        );
    }
}
