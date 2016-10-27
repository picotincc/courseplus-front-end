import React, { Component } from 'react';

export default class ChangePasswordPanel extends Component {

    constructor (props) {
        super(props);

        this.changePassword = this.changePassword.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {
        this.oldPassword = this.refs["oldPassword"];
        this.newPassword = this.refs["newPassword"];
        this.repeatPassword = this.refs["repeatPassword"];
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.tag === 1)
        {
            this.oldPassword.value = "";
            this.newPassword.value = "";
            this.repeatPassword.value = "";
        }
    }

    changePassword()
    {
        const oldPassword = this.oldPassword.value;
        const newPassword = this.newPassword.value;
        const repeatPassword = this.repeatPassword.value;

        if (newPassword === repeatPassword && newPassword !== "")
        {
            this.props.onPasswordChange({
                newPassword,
                oldPassword
            });
        }
        else
        {
            alert("两次密码输入不一致");
        }
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
                    <input ref="oldPassword" type="text" placeholder="原密码" className="form-control" />
                </div>
                <div className="form-group">
                    <label>新密码</label>
                    <input ref="newPassword" type="password" placeholder="新密码" className="form-control" />
                </div>
                <div className="form-group">
                    <label>重复密码</label>
                    <input ref="repeatPassword" type="password" placeholder="重复密码" className="form-control" />
                </div>
                <div onClick={this.changePassword} className="btn-modify">
                    确定修改
                </div>
            </div>
        );
    }
}
