import React, { Component } from 'react';

export default class Header extends Component {

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
            <div className="cp-course-header">
                <span className="icon iconfont icon-course-logo"></span>                
                <span className="index">首页</span>
                <span className="login">登录</span>
            </div>
        );
    }
}
