import React, { Component } from 'react';

export default class CourseBox extends Component {

    constructor (props) {
        super(props);
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

    render()
    {
        const courseInfo = this.props.courseInfo;
        return (
            <div className="cp-home-course-box box">
                <div className="course-img">
                    <img src="https://img3.doubanio.com/lpic/s1106991.jpg" />
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
                        <div className="img">
                            <img src="http://uupaper.oss-cn-qingdao.aliyuncs.com/b6eee5a620d6e14f4f8e5786f24244f7.jpeg" />
                        </div>
                        <div className="img">

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
