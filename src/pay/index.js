import FormatUtil from "../base/util/FormatUtil";
import WebStorageUtil from "../base/util/WebStorageUtil";
import ServiceClient from "../base/service/ServiceClient";
import { HOST } from "../../base/util/ConstantUtil";


const fdContainer = document.getElementById("fdContainer");
const mainContainer = document.getElementById("mainContainer");
const btnFail = document.getElementById("fail");
const close = document.getElementById("close");
const submit = document.getElementById("submit");
const content = document.getElementById("content");
btnFail.onclick = () => {
    mainContainer.classList.add("app-blur");
    fdContainer.style.zIndex = 20;
};
close.onclick = () => {
    mainContainer.classList.remove("app-blur");
    fdContainer.style.zIndex = 0;
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
                    location.href = HOST + "/home.html";
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
            setTimeout(checkOrderStatus, 500);
        }
    });
}

checkOrderStatus();
