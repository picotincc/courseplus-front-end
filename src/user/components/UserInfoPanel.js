import React, { Component } from 'react';
import ReactQiniu from "react-qiniu";

import ServiceClient from "../../base/service/ServiceClient";
import FormatUtil from "../../base/util/FormatUtil";
import { DEFAULT_AVATOR } from "../../base/util/ConstantUtil";


export default class UserInfoPanel extends Component {

    constructor (props) {
        super(props);

        this.handleGenderSelect = this.handleGenderSelect.bind(this);
        this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    static defaultProps = {
        user: {}
    }

    static propTypes = {

    }

    state = {
        nickname: "",
        gender: 0,
        files: [],
        uploadKey: "",
        token: ""
    }

    componentDidMount()
    {
        this.nicknameInput = this.refs["nicknameInput"];
        this.imgPreview = this.refs["imgPreview"];

        this.nicknameInput.oninput = (e) => {
            this.setState({
                nickname: e.target.value
            });
        };
        const user = this.props.user;
        this.nicknameInput.value = user.nickname;
        if (user.gender)
        {
            this.refs[`gender_${user.gender}`].classList.add("selected");
        }
    }

    componentDidUpdate()
    {
        this.nicknameInput.value = this.state.nickname;
        if (this.state.gender != 0)
        {
            this.refs[`gender_${this.state.gender}`].classList.add("selected");
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.user)
        {
            const uploadKey = "user_avatar_" + nextProps.user.id + "_" + Date.now();
            ServiceClient.getInstance().getFileToken(uploadKey).then(res => {
                if (res.code === 0)
                {
                    this.setState({
                        uploadKey,
                        token: res.message,
                        gender: nextProps.user.gender,
                        nickname: nextProps.user.nickname
                    });
                }
            });
        }
    }

    handleGenderSelect(gender)
    {
        this.refs[`gender_${this.state.gender}`].classList.remove("selected");
        this.setState({
            gender
        });
    }

    handleInfoUpdate()
    {
        const gender = this.state.gender;
        const nickname = this.nicknameInput.value;
        const files = this.state.files;
        const self = this;
        if (files.length > 0)
        {
            files[0].request.promise().then(res => {
                self.props.onUserUpdate({
                    gender,
                    nickname,
                    avatar: res.body.key
                });
            });
        }
        else
        {
            this.props.onUserUpdate({
                gender,
                nickname
            });
        }

    }

    onUpload(files)
    {
        files[0].onprogress = function(e) {

                console.log(e.percent);

        };
    }

    onDrop(files)
    {
        let newFiles = [];
        if (!FormatUtil.isValidImage(files[0]))
        {
            swal({
                title: "Something wrong!",
                type: "error",
                text: "请上传正确格式的图片"
            });
        }
        else if (files[0].size > 2000000)
        {
            swal({
                title: "Something wrong!",
                type: "error",
                text: "上传的图片请不要超过2MB"
            });
        }
        else
        {
            this.imgPreview.src = files[0].preview;
            newFiles.push(files[0]);
        }
        this.setState({
            files: newFiles
        });
    }

    render()
    {
        const user = this.props.user;

        return (
            <div className="cp-user-userinfo">
                <div className="title"><span>基本资料</span></div>
                <div className="form-group">
                    <label>昵称</label>
                    <input ref="nicknameInput" type="text" placeholder="昵称" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>性别</label>
                    <div className="gender-group">
                        <div ref="gender_1" onClick={() => this.handleGenderSelect(1)} className="tab male">
                            <span>男</span>
                        </div>
                        <div ref="gender_3" onClick={() => this.handleGenderSelect(3)} className="tab secret">
                            <span>保密</span>
                        </div>
                        <div ref="gender_2" onClick={() => this.handleGenderSelect(2)} className="tab female">
                            <span>女</span>
                        </div>
                    </div>
                </div>
                <div className="head">头像</div>
                <div className="user-img">
                    <ReactQiniu
                        onDrop={this.onDrop}
                        size={150}
                        onUpload={this.onUpload}
                        token={this.state.token}
                        uploadKey={this.state.uploadKey}
                    >
                    <img ref="imgPreview" width="144" height="144" src={user.icon ? user.icon : DEFAULT_AVATOR} />
                    </ReactQiniu>
                </div>
                <div onClick={this.handleInfoUpdate} className="btn-update">更新资料</div>
            </div>
        );
    }

}
