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
            <div className="cp-home-header">
                <div className="logo"><img src="/public/Logo.png" /></div>
                <span className="login">登录</span>
            </div>
        );
    }
}
