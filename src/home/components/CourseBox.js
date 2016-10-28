import React, { Component } from 'react';

export default class CourseBox extends Component {

    constructor (props) {
        super(props);

        this.handleCourseClick = this.handleCourseClick.bind(this);
    }

    static defaultProps = {
        courseInfo: null
    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {

    }

    handleCourseClick()
    {
        const id = this.props.courseInfo.id;
        this.props.onCourseClick(id);
    }

    render()
    {
        const courseInfo = this.props.courseInfo;
        let authors = [];
        if (courseInfo.authors.length > 4)
        {
            authors = courseInfo.authors.splice(0, 4);
        }
        return (
            <div onClick={this.handleCourseClick} className="cp-home-course-box box">
                <div className="course-img">
                    <img src={courseInfo.cover} />
                </div>
                <div className="course-info">
                    <span className="title">{courseInfo.name}</span>
                    <div className="label-group">
                        <span className="school">{courseInfo.schoolName}</span>
                        <span className="major">{courseInfo.specialityName}</span>
                    </div>
                    <div className="count-group">
                        <span>知识点：{courseInfo.topicNum}</span>
                        <span>资料数量：{courseInfo.resourceNum}</span>
                    </div>
                    <span className="contributor">作者</span>
                    <div className="contributor-group">
                        {authors.map(item => {
                            return (
                                <div key={item.id} className="img">
                                    <img src={item.icon} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
