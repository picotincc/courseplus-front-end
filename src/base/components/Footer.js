import React, { Component } from 'react';

export default class Footer extends Component {

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
            <div className="cp-app-footer">
                <div className="footer-content">
                    <div className="copyright">Copyright © 2016 一可米互联网科技公司</div>
                    <a href="http://www.miibeian.gov.cn/" target="_blank"> 苏ICP备15062280号</a>
                    <div className="qq">客服QQ:2406964504</div>
                </div>
            </div>
        );
    }
}
