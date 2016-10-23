import React, { Component } from 'react';

export default class ChangePasswordPanel extends Component {

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
            <div className="cp-user-changepassword">
                <div className="title">
                    <span>修改密码</span>
                </div>
                <div className="form-group">
                    <label>原密码</label>
                    <input type="text" placeholder="原密码" className="form-control" />
                </div>
                <div className="form-group">
                    <label>新密码</label>
                    <input type="text" placeholder="新密码" className="form-control" />
                </div>
                <div className="form-group">
                    <label>重复密码</label>
                    <input type="text" placeholder="重复密码" className="form-control" />
                </div>
                <div className="btn-modify">
                    确定修改
                </div>
            </div>
        );
    }
}
