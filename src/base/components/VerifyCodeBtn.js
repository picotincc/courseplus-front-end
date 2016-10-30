import React, { Component } from 'react';

export default class VerifyCodeBtn extends Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        disabled: false,
        text: "发送验证码",
        timer:60
    }

    componentDidMount()
    {
        this.sendCodeBtn = this.refs["sendCodeBtn"];
    }

    handleClick()
    {
        const disabled = this.state.disabled;

        if (!disabled)
        {
            this.props.onCodeSend(res => {
                if (res)
                {
                    this.sendCodeBtn.classList.add("disabled");
                    this.setState({
                        disabled: true,
                        text:"重新发送(" + 59 + ")",
                        timer:59
                    });
                    var self = this;
                    var tm = setInterval(() => {
                        var tt = self.state.timer - 1;
                        if(tt<=0)
                        {
                            self.setState({
                                disabled: false,
                                text: "发送验证码",
                                timer:60
                            });
                            this.sendCodeBtn.classList.remove("disabled");
                            clearInterval(tm);
                            return;
                        }
                        self.setState({
                            text:"重新发送(" + tt + ")",
                            timer:tt
                        });
                    }, 1000);
                }
            });

        }
        else
        {
            swal("请稍后再发");
        }
    }

    render()
    {
        return (
            <div
                ref="sendCodeBtn"
                className="send-codes"
                onClick={this.handleClick}
                disabled={this.state.disabled}
            >
                {this.state.text}
            </div>
        );
    }
}
