import React, { Component } from 'react';
import ReactQiniu from "react-qiniu";

import ServiceClient from "../../base/service/ServiceClient";

export default class UserInfoPanel extends Component {

    constructor (props) {
        super(props);

        this.handleGenderSelect = this.handleGenderSelect.bind(this);
        this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    static defaultProps = {
        user: {}
    }

    static propTypes = {

    }

    state = {
        files: [],
        uploadKey: "",
        token: ""
    }

    componentDidMount()
    {
        this.maleGender = this.refs["maleGender"];
        this.femaleGender = this.refs["femaleGender"];
        this.genderInput = this.refs["genderInput"];
        this.nicknameInput = this.refs["nicknameInput"];
        this.imgPreview = this.refs["imgPreview"];

        const user = this.props.user;
        this.genderInput.value = user.gender;
        this.nicknameInput.value = user.nickname;

        if (user.gender !== 2)
        {
            this.maleGender.classList.add("selected");
        }
        else
        {
            this.maleGender.classList.remove("selected");
        }
    }

    componentDidUpdate()
    {
        const user = this.props.user;
        this.genderInput.value = user.gender;
        this.nicknameInput.value = user.nickname;

        this.changeGender(user.gender);
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.user)
        {
            const uploadKey = "user_avatar_" + nextProps.user.id;
            ServiceClient.getInstance().getFileToken(uploadKey).then(res => {
                if (res.code === 0)
                {
                    this.setState({
                        uploadKey,
                        token: res.message
                    });
                }
            });
        }
    }

    changeGender(gender)
    {
        if (gender !== 2 )
        {
            if (!this.maleGender.classList.contains("selected"))
            {
                this.maleGender.classList.add("selected");
                this.femaleGender.classList.remove("selected");
                this.genderInput.value = 1;
            }
        }
        else
        {
            if (!this.femaleGender.classList.contains("selected"))
            {
                this.femaleGender.classList.add("selected");
                this.maleGender.classList.remove("selected");
                this.genderInput.value = 2;
            }
        }
    }

    handleGenderSelect(gender)
    {
        this.changeGender(gender);
    }

    handleInfoUpdate()
    {
        const gender = this.genderInput.value;
        const nickname = this.nicknameInput.value;
        const files = this.state.files;
        if (files.length > 0)
        {
            files[0].request.promise().then(res => {
                this.props.onUserUpdate({
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
        //上传过程中的交互方法
        // files.map(function (f) {
        //     f.onprogress = function(e) {
        //         // console.log(e.percent);
        //     };
        // });
    }

    onDrop(files)
    {
        let newFiles = [files[0]];

        this.setState({
            files: newFiles
        });
        this.imgPreview.src = files[0].preview;
    }

    render()
    {
        const user = this.props.user;
        const icon = "http://i1.piimg.com/573251/970594a863d7aeb9.png";

        return (
            <div className="cp-user-userinfo">
                <div className="title"><span>基本资料</span></div>
                <div className="form-group">
                    <label>昵称</label>
                    <input ref="nicknameInput" type="text" placeholder="昵称" className="form-control"/>
                </div>
                <div className="form-group">
                    <input ref="genderInput" type="hidden" />
                    <label>性别</label>
                    <div className="gender-group">
                        <div ref="maleGender" onClick={() => this.handleGenderSelect(1)} className="tab male">
                            <span>男</span>
                        </div>
                        <div ref="femaleGender" onClick={() => this.handleGenderSelect(2)} className="tab female">
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
                    <img ref="imgPreview" width="144" height="144" src={user.icon ? user.icon : icon} />
                    </ReactQiniu>
                </div>
                <div onClick={this.handleInfoUpdate} className="btn-update">更新资料</div>
            </div>
        );
    }

}
