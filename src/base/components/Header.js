import React, { Component } from 'react';

import WebStorageUtil from "../../base/util/WebStorageUtil";

export default class Header extends Component {

    constructor (props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.initUserCenter = this.initUserCenter.bind(this);
        this.dropdownUserCenter = this.dropdownUserCenter.bind(this);
        this.collapseUserCenter = this.collapseUserCenter.bind(this);
    }

    static defaultProps = {
        isLogin: false
    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {
        if (this.props.isLogin) {
            this.initUserCenter();
        }
    }

    componentDidUpdate()
    {
        if (this.props.isLogin) {
            this.initUserCenter();
        }
    }

    login()
    {
        this.props.onDialogShow();
    }

    logout()
    {
        WebStorageUtil.removeUserStorage();
        location.href = "/public/home.html";
    }

    initUserCenter()
    {
        this.userInfo = this.refs["userInfo"];
        this.userDropdown = this.refs["userDropdown"];

        this.userInfo.onmouseover = this.dropdownUserCenter;
        this.userDropdown.onmouseover = this.dropdownUserCenter;
        this.userDropdown.onmouseout = this.collapseUserCenter;
    }

    dropdownUserCenter()
    {
        this.userDropdown.style.display = "block";
    }

    collapseUserCenter()
    {
        this.userDropdown.style.display = "none";
    }

    render()
    {
        let loginInfo = null;
        if (this.props.isLogin) {
            const user = this.props.user;
            loginInfo = (
                <div className="user-info" ref="userInfo">
                    <div className="user-img">
                        <img src="http://i1.piimg.com/573251/970594a863d7aeb9.png" />
                    </div>
                    <span className="user-name">{user.phone}</span>
                    <ul ref="userDropdown" className="user-dropdown">
                        <li>
                            <div className="item user-center">
                                <span><a href="/public/user.html">个人中心</a></span>
                            </div>
                        </li>
                        <li>
                            <div className="item logout">
                                <span onClick={this.logout}>退出登录</span>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        }
        else
        {
            loginInfo = (<span onClick={this.login} className="login">登录</span>);
        }

        return (
            <div className="cp-app-header">
                <div className="logo">
                    <a href="/public/home.html">
                        <img src="/public/Logo.png" />
                    </a>
                </div>
                {loginInfo}
            </div>
        );
    }

}
