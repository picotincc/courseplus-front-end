import React, { Component } from 'react';

export default class CourseInfo extends Component {

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
            <div className="cp-course-info">
                <div className="image">
                    <img src='http://i1.piimg.com/573251/65de634ba7719cf2.jpg' />
                </div>
                <div className="intro">
                    <div className="title">
                        <span className="name">数据结构</span>
                        <span className="knowledge"></span>
                        <span className="knowledge-count">20</span>
                        <span className="resource"></span>
                        <span className="resource-count">18</span>
                    </div>
                    <div className="label-group">
                        <div className="label school">
                            <span>南京大学</span>
                        </div>
                        <div className="label major">
                            <span>软件工程</span>
                        </div>
                    </div>
                    <div className="para">
                        数据结构数数据结构数据结构数据结构数数据结构数据结构
                    </div>
                    <div className="bottom">
                        <a>查看全部</a>
                    </div>
                </div>
            </div>
        );
    }
}
