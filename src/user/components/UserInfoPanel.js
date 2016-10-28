import React, { Component } from 'react';

export default class UserInfoPanel extends Component {

    constructor (props) {
        super(props);

        this.handleGenderSelect = this.handleGenderSelect.bind(this);
        this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
    }

    static defaultProps = {
        user: {}
    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {
        this.maleGender = this.refs["maleGender"];
        this.femaleGender = this.refs["femaleGender"];
        this.genderInput = this.refs["genderInput"];
        this.imgInput = this.refs["imgInput"];
        this.nicknameInput = this.refs["nicknameInput"];
        this.userImg = this.refs["userImg"];

        this.imgInput.onchange = this.changeImg;
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
        const avatar = this.imgInput.value;
        this.props.onUserUpdate({
            gender,
            nickname,
            avatar
        });
    }

    uploadImg()
    {
        console.log("uploadImg");
        this.imgInput.click();
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
                    <img ref="userImg" onClick={this.uploadImg} src={user.icon ? user.icon : icon} />
                    <input ref="imgInput" type="file" />
                </div>
                <div onClick={this.handleInfoUpdate} className="btn-update">更新资料</div>
            </div>
        );
    }

}
