import React, { Component } from 'react';

export default class Header extends Component {

    constructor (props) {
        super(props);

        this.login = this.login.bind(this);
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

    }

    render()
    {
        let loginInfo = null;
        if (this.props.isLogin) {
            loginInfo = (
                <div className="user-info">
                    <div className="user-img">
                        <img src="http://i1.piimg.com/573251/970594a863d7aeb9.png" />
                    </div>
                    <span className="user-name">用户1</span>
                    <ul className="user-dropdown">
                        <li>
                            <div className="item user-center">
                                <span>个人中心</span>
                            </div>
                        </li>
                        <li>
                            <div className="item logout">
                                <span>退出登录</span>
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

    login()
    {
        this.props.showDialog();
    }
}
