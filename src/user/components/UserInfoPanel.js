import React, { Component } from 'react';

export default class UserInfoPanel extends Component {

    constructor (props) {
        super(props);

        this.changeGender = this.changeGender.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    render()
    {
        return (
            <div className="cp-user-userinfo">
                <div className="title">
                    <span>基本资料</span>
                </div>
                <div className="form-group">
                    <label>昵称</label>
                    <input type="text" placeholder="昵称" className="form-control" />
                </div>
                <div className="form-group">
                    <input ref="genderInput" type="hidden" />
                    <label>性别</label>
                    <div className="gender-group">
                        <div ref="maleGender" onClick={() => this.changeGender("male")} className="tab selected male">
                            <span>男</span>
                        </div>
                        <div ref="femaleGender" onClick={() => this.changeGender("female")} className="tab female">
                            <span>女</span>
                        </div>
                    </div>
                </div>
                <div className="head">
                    头像
                </div>

                <div className="user-img">

                </div>

                <div className="btn-update">
                    更新资料
                </div>


            </div>
        );
    }

    componentDidMount()
    {
        this.maleGender = this.refs["maleGender"];
        this.femaleGender = this.refs["femaleGender"];
        this.genderInput = this.refs["genderInput"];
    }

    changeGender(gender)
    {
        if (gender === "male")
        {
            if (!this.maleGender.classList.contains("selected"))
            {
                this.maleGender.classList.add("selected");
                this.femaleGender.classList.remove("selected");
                this.genderInput.value = "male";
            }
        }
        else
        {
            if (!this.femaleGender.classList.contains("selected"))
            {
                this.femaleGender.classList.add("selected");
                this.maleGender.classList.remove("selected");
                this.genderInput.value = "female";
            }
        }
    }
}
