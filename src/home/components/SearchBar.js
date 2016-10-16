import React, { Component } from 'react';

export default class SearchBar extends Component {

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
            <div className="cp-home-search">
                <span className="school-tag">学校：</span>
                <div className="school-dropdown dropdown">
                    <button className="btn-school btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                        南京大学<span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a>南京大学</a></li>
                    </ul>
                </div>
                <span className="major-tag">专业:</span>
                <div className="major-dropdown dropdown">
                    <button className="btn-major btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                        软件工程<span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a>软件工程</a></li>
                    </ul>
                </div>
                <div className="empty"></div>
                <div className="search input-group">
                  <input type="text" className="form-control" placeholder="搜索" />
                  <span className="input-group-addon"><span className="iconfont icon-search"></span></span>
                </div>

            </div>
        );
    }
}
