import React, { Component } from 'react';

export default class CourseInfo extends Component {

    constructor (props) {
        super(props);

        this.togglePara = this.togglePara.bind(this);
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
            <div className="cp-course-info">
                <div className="image">
                    <img src='https://img3.doubanio.com/lpic/s1106991.jpg' />
                </div>
                <div className="intro">
                    <div className="title">
                        <span className="name">2天精通数据结构</span>
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
                    <div className="para" ref="para">
                        &nbsp;数据结构数数据结构数据结构数据结构数数据结构数据结构数据结
                        构数数据结构数据结构数据结构数数据结构数据结构数据结构数数据结构数
                        据结构数据结构数数据结构数据结构数据结构数数据结构数据结构
                        数据结构数数据结构数据结构数据结构数数据结构数据结构数据结构
                        数数据结构数据结构数据结构数数据结构数据结构数据结构数数据
                        结构数据结构数据结构数数据结构数据结构数据结构数数据结构数据结
                        构数据结构数数据结构数据结构数据结构数数据结构数据结构数据结
                        构数数据结构数据结构数据结构数数据结构数据结构数据结构数数据
                        结构数据结构数据结构数数据结构数据结构数据结构数数据结构
                        数据结构数据结构数数据结构数据结构数据结构数数据结构数据结
                    </div>
                    <div className="bottom">
                        <a ref="togglePara" onClick={this.togglePara}>查看全文</a>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        const $para = $(this.refs.para);
        const togglePara = this.refs.togglePara;
        const height = $para.height();
        if (height < 99) {
            togglePara.style.visibility = "hidden";
        }
        else
        {
            $para.addClass("overflow-hide");
        }
    }

    togglePara()
    {
        const $para = $(this.refs.para);
        const togglePara = this.refs.togglePara;

        if (togglePara.text === "查看全文") {
            $para.removeClass("overflow-hide");
            togglePara.text = "收起全文";
        }
        else
        {
            $para.addClass("overflow-hide");
            togglePara.text = "查看全文";
        }

    }

}
