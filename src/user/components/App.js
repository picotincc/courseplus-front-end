import React, { Component } from 'react';

import Header from "../../base/components/Header";
import ServiceClient from "../../base/service/ServiceClient";
import WebStorageUtil from "../../base/util/WebStorageUtil";

import ChangePasswordPanel from "./ChangePasswordPanel";
import UserInfoPanel from "./UserInfoPanel";

const HOST = "/public";

export default class App extends Component {

    constructor (props) {
        super(props);

        this.tabChange = this.tabChange.bind(this);

        this.autoLogin();
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isLogin: false,
        user: {
            nickname: "",
            gender: 1,
            icon: null
        },
        selectedTab: "info"
    }

    componentDidMount()
    {
        this.tabInfo = this.refs["tabInfo"];
        this.tabPassword = this.refs["tabPassword"];

        this.tabInfo.classList.add("selected");
    }

    componentDidUpdate()
    {
        const {selectedTab} = this.state;
        if (selectedTab === "info")
        {
            this.tabInfo.classList.add("selected");
            this.tabPassword.classList.remove("selected");
        }
        else
        {
            this.tabInfo.classList.remove("selected");
            this.tabPassword.classList.add("selected");
        }
    }

    autoLogin()
    {
        let isLogin = false;

        ServiceClient.getInstance().autoLogin().then(res => {
            if (res.status === 0)
            {
                isLogin = true;
                WebStorageUtil.setToken(res.token);
                this.setState({
                    isLogin,
                    user: res
                });
            }
            else
            {
                alert("请先登录");
                location.href = `${HOST}/home.html`;
            }
        });
    }

    tabChange(tab)
    {
        if (this.state.selectedTab !== tab)
        {
            this.setState({
                selectedTab: tab
            });
        }
    }

    render()
    {
        const state = this.state;
        let sectionPanel = null;
        if (state.selectedTab === "info")
        {
            sectionPanel = (<UserInfoPanel user={state.user} />);
        }
        else
        {
            sectionPanel = (<ChangePasswordPanel />);
        }

        return (
            <div className="cp-user-app">
                <header>
                    <Header
                        isLogin={state.isLogin}
                        user={state.user}
                    />
                </header>
                <div className="container">
                    <div className="content">
                        <section>
                            {sectionPanel}
                        </section>
                        <aside>
                            <div ref="tabInfo" className="tab tab-info">
                                <span onClick={() => this.tabChange("info")} >基本资料</span>
                            </div>
                            <div ref="tabPassword" className="tab tab-changepassword">
                                <span onClick={() => this.tabChange("password")} >修改密码</span>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        );
    }


}
