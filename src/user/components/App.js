import React, { Component } from 'react';

import Header from "../../base/components/Header";

import ChangePasswordPanel from "./ChangePasswordPanel";
import UserInfoPanel from "./UserInfoPanel";

export default class App extends Component {

    constructor (props) {
        super(props);

        this.tabChange = this.tabChange.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isLogin: true,
        selectedTab: "info"
    }

    render()
    {
        const state = this.state;

        let sectionPanel = null;
        if (state.selectedTab === "info")
        {
            sectionPanel = (<UserInfoPanel />);
        }
        else
        {
            sectionPanel = (<ChangePasswordPanel />);
        }

        return (
            <div className="cp-user-app">
                <header><Header isLogin={this.state.isLogin} /></header>
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

    tabChange(tab)
    {
        if (this.state.selectedTab !== tab)
        {
            this.setState({
                selectedTab: tab
            });
        }
    }
}
