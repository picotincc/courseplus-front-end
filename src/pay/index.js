import FormatUtil from "../base/util/FormatUtil";
import WebStorageUtil from "../base/util/WebStorageUtil";
import ServiceClient from "../base/service/ServiceClient";
import { HOST } from "../base/util/ConstantUtil";


const fdContainer = document.getElementById("fdContainer");
const mainContainer = document.getElementById("mainContainer");
const lgContainer = document.getElementById("loginContainer");
const btnFail = document.getElementById("fail");
const close = document.getElementById("close");
const lgclose = document.getElementById("lgclose");
const submit = document.getElementById("submit");
const login = document.getElementById("login");
const content = document.getElementById("content");
const wordCount = document.getElementById("wordCount");

content.onkeydown = (e) => {
    if(e.keyCode !== 8 && e.target.value.length >= 200)
    {
        event.returnValue = false;
    }
};

content.oninput = (e) => {
    const length = e.target.value.length;
    let count = 200 - length;
    wordCount.textContent = count;
};

login.onclick = (e) => {
    let phone = $("input[name=phone]").val();
    let password = $("input[name=password]").val();

    if (phone !== "" && password !== "")
    {
        ServiceClient.getInstance().login({
            phone,
            password
        }).then(res => {
            if (res.textStatus === "success")
            {
                WebStorageUtil.setUserStorage({
                    phone,
                    password
                });
                swal({
                  title: "Good job!",
                  text: res.message,
                  type: "success"
                });
                lgclose.click();
            }
            else
            {
                swal({
                  title: "Something wrong!",
                  text: res.message,
                  type: "error"
                });
            }
        });
    }
    else
    {
        swal({
            type: "error",
            title: "Something wrong！",
            text: "输入不正确"
        });
    }
};

function showLoginDialog()
{
    mainContainer.classList.add("app-blur");
    lgContainer.style.zIndex = 20;
};

btnFail.onclick = () => {
    mainContainer.classList.add("app-blur");
    fdContainer.style.zIndex = 20;
};
close.onclick = () => {
    mainContainer.classList.remove("app-blur");
    fdContainer.style.zIndex = 0;
}
lgclose.onclick = () => {
    mainContainer.classList.remove("app-blur");
    lgContainer.style.zIndex = 0;
}

submit.onclick = () => {
    if (content.value !== "")
    {
        ServiceClient.getInstance().publishFeedBack({
            content: content.value,
            tradeId: orderId
        }).then(res => {
            if (res.code === 0)
            {
                swal({
                    type: "success",
                    title: "反馈成功",
                    text: "返回首页"
                }, () => {
                    location.href = HOST + "/index.html";
                });
            }
            else
            {
                swal({
                    type: "error",
                    title: "反馈失败",
                    message: res.message
                });
            }
        });
    }
    else
    {
        swal({
            type: "error",
            title: "Something wrong!",
            text: "请输入反馈内容"
        });
    }
}

const btnSuccess = document.getElementById("success");
btnSuccess.onclick = function(){
    ServiceClient.getInstance().checkOrderStatus(orderId).then(res => {
        if (res.textStatus === "success")
        {
            WebStorageUtil.setReturnPayStorage(res);
            swal({
                type: "success",
                title: "Course+支付成功",
                text: "正在跳转......"
            });
            location.href = HOST + "/course.html";
        }
        else
        {
            swal({
                type: "info",
                title: "Course+支付进展",
                text: "正在处理订单，如果长时间不跳转请点击遇到问题反馈信息"
            });
        }
    });
};

const url = location.href;
const orderId = FormatUtil.parseQuery(url.split("?")[1])["id"];

function checkOrderStatus()
{
    ServiceClient.getInstance().checkOrderStatus(orderId).then(res => {
        if (res.textStatus === "success")
        {
            WebStorageUtil.setReturnPayStorage(res);
            swal({
                type: "success",
                title: "Course+支付成功",
                text: "正在跳转"
            });
            location.href = HOST + "/course.html";
        }
        else
        {
            if (res.status === 403)
            {
                if (lgContainer.style.zIndex !== 20)
                {
                    showLoginDialog();
                }
            }
            setTimeout(checkOrderStatus, 800);
        }
    });
}

checkOrderStatus();
