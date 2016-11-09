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
                    <div className="qq">客服QQ:3542317181</div>
                </div>
            </div>
        );
    }
}
