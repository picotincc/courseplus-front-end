import React, { Component } from 'react';

export default class FundingDialog extends Component {

    constructor (props) {
        super(props);

        this.handleJoin = this.handleJoin.bind(this);
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

    handleJoin()
    {
        location.href = "http://www.mebox.wiki/activity/funding";
    }

    render()
    {
        return (
            <div className="cp-index-funding">

                <div className="content">
                    <div className="top-bar">
                        <span onClick={this.props.onFundingHide} className="icon iconfont icon-close"></span>
                    </div>
                    <div className="title-section">
                        <img src="/imgs/funding-title.png" />
                    </div>
                    <div className="line">
                    </div>
                    <div className="text">
                        <div className="first">
                            米盒百万资料众筹&nbsp;正在进行中
                        </div>
                        <div className="second">
                            点击立即参加&nbsp;共享百万资料
                        </div>
                    </div>
                    <div onClick={this.handleJoin} className="join">
                        <div className="join-btn">
                            我要参加
                        </div>
                        <img src="/imgs/pointer.png" />
                    </div>
                    <div className="buttom-bar">
                        *本次活动解释权归一可米互联网科技公司所有
                    </div>
                </div>
            </div>
        );
    }
}
