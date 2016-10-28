import FormatUtil from "../base/util/FormatUtil";
import WebStorageUtil from "../base/util/WebStorageUtil";
import ServiceClient from "../base/service/ServiceClient";

const HOST = "/public";
const btnFail = document.getElementById("fail");
btnFail.onclick = function(){
    alert("fail");
};

const btnSuccess = document.getElementById("success");
btnSuccess.onclick = function(){
    alert("success");
};

const url = location.href;
const orderId = FormatUtil.parseQuery(url.split("?")[1])["id"];

function checkOrderStatus()
{
    ServiceClient.getInstance().checkOrderStatus(orderId).then(res => {
        if (res.textStatus === "success")
        {
            WebStorageUtil.setReturnPayStorage(res);
            location.href = HOST + "/course.html";
        }
        else
        {
            setTimeout(checkOrderStatus, 500);
        }
    });
}

checkOrderStatus();
