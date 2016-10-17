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
                    <div className="title">数据结构</div>
                    <div className="para">
                        数据结构数数据结构数据结构数据结构数数据结构数据结构
                    </div>
                </div>
            </div>
        );
    }
}
