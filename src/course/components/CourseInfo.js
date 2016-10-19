import React, { Component } from 'react';

export default class CourseInfo extends Component {

    constructor (props) {
        super(props);

        this.showAllPara = this.showAllPara.bind(this);
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
                    <div className="para overflow-hide" ref="para">
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
                        <a ref="showAll" onClick={this.showAllPara}><u>查看全部</u></a>
                    </div>
                </div>
            </div>
        );
    }

    showAllPara()
    {
        const $btnShow = $(this.refs.showAll);
        const para = this.refs.para;

        if ($btnShow.text() === "查看全部") {
            para.style.height = "auto";
            $btnShow.empty();
            let $addDom = $("<u>收起全文</u>");
            $btnShow.append($addDom);
        }
        else
        {
            para.style.height = "96px";
            $btnShow.empty();
            let $addDom = $("<u>查看全部</u>");
            $btnShow.append($addDom);
        }
    }
}
