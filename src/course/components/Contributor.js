import React, { Component } from 'react';

export default class Contributor extends Component {

    constructor (props) {
        super(props);

        this.handleCourseSelect = this.handleCourseSelect.bind(this);
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
