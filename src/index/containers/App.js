import React, { Component } from 'react';

export default class App extends Component {

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
            <div className="cp-app-index">
                <div className="section first">
                    <div className="mebox">
                        <img src="/imgs/mebox.png"></img>
                    </div>
                    <div className="title">
                        <div className="logo">
                            <img src="/imgs/course-logo-v.png"></img>
                        </div>
                        <div className="slogen">
                            最后<span className="days">50</span>天让考研更容易
                        </div>
                    </div>
                </div>
                <div className="section second">
                    <div className="top-bar">
                        <span className="text">南京大学本校考研大神零距离定制辅导＋经验传授</span>
                        <span className="text">免费备考心理辅导</span>
                        <span className="text">首节课不满意，无条件全额退款</span>
                    </div>
                    <div className="middle-line"></div>
                    <div className="bottom-bar"></div>
                </div>
                <div className="section third"></div>
                <div className="section fourth"></div>
                <div className="section fifth"></div>
                <div className="section sixth"></div>
                <div className="section seventh"></div>
            </div>
        );
    }
}
