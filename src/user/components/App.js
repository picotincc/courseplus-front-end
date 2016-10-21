import React, { Component } from 'react';

import Header from "../../base/components/Header";

import ChangePasswordPanel from "./ChangePasswordPanel";
import UserInfoPanel from "./UserInfoPanel";

export default class App extends Component {

    constructor (props) {
        super(props);
        console.log("Courseplus user is running......");
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        isLogin: true
    }

    render()
    {
        return (
            <div className="cp-user-app">
                <header><Header isLogin={this.state.isLogin} /></header>
                <div className="container">
                    <div className="content">
                        <section>
                            <div className="user-info-section">
                                <UserInfoPanel />
                            </div>
                            <div className="change-password-section">
                                <ChangePasswordPanel />
                            </div>
                        </section>
                        <aside>
                            <div className="tab-group">
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        );
    }
}
