import React, { Component } from 'react';

export default class CourseInfo extends Component {

    constructor (props) {
        super(props);

        this.togglePara = this.togglePara.bind(this);
    }

    static defaultProps = {
        courseInfo: ""
    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {

    }

    componentDidUpdate()
    {
        const $para = $(this.refs.para);
        const togglePara = this.refs.togglePara;
        const height = $para.height();
        if (height < 96.5) {
            togglePara.style.visibility = "hidden";
        }
    }

    togglePara()
    {
        const para = this.refs.para;
        const togglePara = this.refs.togglePara;

        if (togglePara.text === "查看全文") {
            para.style.maxHeight = "1000px";
            togglePara.text = "收起全文";
        }
        else
        {
            para.style.maxHeight = "97px";
            setTimeout(() => {
                togglePara.text = "查看全文";
            }, 750);
        }

    }

    render()
    {
        const info = this.props.courseInfo;

        return (
            <div className="cp-course-info">
                <div className="image">
                    <img src={info.cover} />
                </div>
                <div className="intro">
                    <div className="title">
                        <span className="name">{info.name}</span>
                        <span className="knowledge"></span>
                        <span className="knowledge-count">{info.topicNum}</span>
                        <span className="resource"></span>
                        <span className="resource-count">{info.resourceNum}</span>
                    </div>
                    <div className="label-group">
                        <div className="label school">
                            <span>{info.schoolName}</span>
                        </div>
                        <div className="label major">
                            <span>{info.specialityName}</span>
                        </div>
                    </div>
                    <div className="para" ref="para">
                        &nbsp;{info.desc}
                    </div>
                    <div className="bottom">
                        <a ref="togglePara" onClick={this.togglePara}>查看全文</a>
                    </div>
                </div>
            </div>
        );
    }

}
